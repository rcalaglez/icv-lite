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
import { Eye, EyeOff } from "lucide-react";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>Configuración de IA</DialogTitle>
          <DialogDescription>
            La API key se guarda localmente en tu navegador. No se envía a servidores.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <div className="grid gap-2">
            <Label className="text-sm font-medium">Proveedor</Label>
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
              <Label className="text-sm font-medium">Base URL</Label>
              <Input
                value={config.baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.openai.com/v1"
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label className="text-sm font-medium">API Key</Label>
            <div className="relative">
              <Input
                value={config.apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type={showKey ? "text" : "password"}
                placeholder="Pega tu API key"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowKey((s) => !s)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Modelo</Label>
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
              <Input
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="Escribe el model id y presiona Enter"
                className="mt-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customModel.trim()) {
                    setModel(customModel.trim());
                    setCustomModel("");
                  }
                }}
              />
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleTest}
            disabled={isTesting}
            className="w-full sm:w-auto"
          >
            {isTesting ? "Probando..." : "Probar conexión"}
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
