import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { AiProvider } from "@/lib/ai/types";
import { useAiConfigStore, isAiConfigured } from "@/stores/aiConfigStore";
import { createAiClient } from "@/lib/ai/aiClientFactory";

const providerOptions: Array<{ value: AiProvider; label: string }> = [
  { value: "gemini", label: "Google Gemini" },
  { value: "openai_compatible", label: "OpenAI-compatible" },
];

const geminiModels = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

const openAiCompatibleModels = ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4o"];

export function AiSettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { config, setProvider, setApiKey, setModel, setBaseUrl } =
    useAiConfigStore();

  const [isTesting, setIsTesting] = React.useState(false);
  const [showKey, setShowKey] = React.useState(false);
  const [customModel, setCustomModel] = React.useState("");

  const models =
    config.provider === "gemini" ? geminiModels : openAiCompatibleModels;

  const handleTest = async () => {
    if (!isAiConfigured(config) || !config.provider) {
      toast.error("Completa proveedor, API key y modelo antes de probar.");
      return;
    }

    setIsTesting(true);
    try {
      const client = createAiClient({
        provider: config.provider,
        apiKey: config.apiKey,
        model: config.model,
        baseUrl:
          config.provider === "openai_compatible" ? config.baseUrl : undefined,
      });

      await client.generateJson<{ ok: boolean }>({
        prompt:
          'Devuelve exclusivamente el JSON {"ok": true}. Sin texto adicional.',
        temperature: 0,
      });

      toast.success("Conexion OK. Configuracion valida.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      toast.error(`No se pudo validar: ${msg}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (!isAiConfigured(config)) {
      toast.error("Completa proveedor, API key y modelo.");
      return;
    }
    onOpenChange(false);
    toast.success("IA configurada.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configuracion de IA</DialogTitle>
          <DialogDescription>
            La API key se guarda localmente en tu navegador. No se envia a
            servidores.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Proveedor</Label>
            <Select
              value={config.provider ?? ""}
              onValueChange={(v) => setProvider(v as AiProvider)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona proveedor" />
              </SelectTrigger>
              <SelectContent>
                {providerOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {config.provider === "openai_compatible" && (
            <div className="grid gap-2">
              <Label>Base URL</Label>
              <Input
                value={config.baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.openai.com/v1"
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label>API key</Label>
            <div className="flex gap-2">
              <Input
                value={config.apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type={showKey ? "text" : "password"}
                placeholder="Pega tu API key"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowKey((s) => !s)}
              >
                {showKey ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Modelo</Label>
            <Select
              value={config.model}
              onValueChange={(v) => {
                if (v === "__custom") {
                  setModel("__custom");
                  return;
                }
                setModel(v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona modelo" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
                <SelectItem value="__custom">Custom...</SelectItem>
              </SelectContent>
            </Select>
            {config.model === "__custom" && (
              <div className="flex gap-2">
                <Input
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="Escribe el model id"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    if (customModel.trim()) {
                      setModel(customModel.trim());
                      setCustomModel("");
                    }
                  }}
                >
                  Usar
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleTest}
            disabled={isTesting}
          >
            {isTesting ? "Probando..." : "Probar conexion"}
          </Button>
          <Button type="button" onClick={handleSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
