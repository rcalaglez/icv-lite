import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useAiConfigStore, isAiConfigured } from "@/stores/aiConfigStore";
import { AiSettingsDialog } from "@/components/ai/AiSettingsDialog";

interface Step2_JobOfferProps {
  onEvaluate: (jobOfferText?: string) => void;
}

export const Step2_JobOffer = ({ onEvaluate }: Step2_JobOfferProps) => {
  const [jobOffer, setJobOffer] = useState("");
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const aiConfig = useAiConfigStore((s) => s.config);

  const handleEvaluate = (jobOfferText?: string) => {
    if (!isAiConfigured(aiConfig)) {
      toast.error("Configura tu proveedor/modelo y API key para evaluar.");
      setAiDialogOpen(true);
      return;
    }
    onEvaluate(jobOfferText);
  };

  return (
    <div className="flex flex-col gap-6">
      <AiSettingsDialog open={aiDialogOpen} onOpenChange={setAiDialogOpen} />
      <div>
        <h2 className="text-2xl font-bold">Paso 2 (Opcional): Añade una oferta de trabajo</h2>
        <p className="text-muted-foreground">Para un análisis más preciso, pega la descripción del puesto al que aspiras.</p>
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="job-offer">Descripción de la oferta</Label>
        <Textarea 
          id="job-offer"
          placeholder="Pega aquí el texto completo de la oferta de trabajo..."
          value={jobOffer}
          onChange={(e) => setJobOffer(e.target.value)}
          className="min-h-[250px]"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => handleEvaluate(jobOffer)}
          disabled={!jobOffer.trim()}
          className="w-full sm:w-auto"
        >
          Evaluar con Oferta
        </Button>
        <Button 
          variant="secondary"
          onClick={() => handleEvaluate()}
          className="w-full sm:w-auto"
        >
          Omitir y Evaluar Perfil
        </Button>
      </div>
    </div>
  );
};
