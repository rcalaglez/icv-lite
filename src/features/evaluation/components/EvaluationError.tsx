import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EvaluationError = ({
  error,
  onConfigureAi,
  onBack,
}: {
  error: string;
  onConfigureAi: () => void;
  onBack: () => void;
}) => {
  const isNotConfigured = error === "AI_NOT_CONFIGURED";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {isNotConfigured ? "IA no configurada" : "Error en la evaluación"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {isNotConfigured
              ? "Necesitas configurar proveedor, modelo y API key para usar la evaluación."
              : error}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button variant="outline" onClick={onBack}>
              Volver
            </Button>
            {isNotConfigured && (
              <Button onClick={onConfigureAi}>Configurar IA</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
