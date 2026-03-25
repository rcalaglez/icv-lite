import type { AtsEvaluation, AtsSuggestion } from "@/types/evaluation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Target, XCircle } from "lucide-react";
import { ScorePieChart } from "../ScorePieChart";
import { FeedbackList } from "../feedback/FeedbackList";

const impactLabel: Record<NonNullable<AtsSuggestion["impact"]>, string> = {
  high: "Alto impacto",
  medium: "Impacto medio",
  low: "Impacto bajo",
};

const actionLabel: Record<NonNullable<AtsSuggestion["action"]>, string> = {
  replace: "Sustituye",
  remove: "Quita",
  include: "Incluye",
  reorder: "Reordena",
};

const evidenceLabel: Record<NonNullable<AtsSuggestion["evidence"]>, string> = {
  supported: "Con evidencia",
  needs_user_input: "Requiere datos",
  not_supported: "No soportado",
};

const AtsSuggestionCard = ({ suggestion }: { suggestion: AtsSuggestion }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-4">
          <span>
            {actionLabel[suggestion.action]} ({impactLabel[suggestion.impact]})
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            {evidenceLabel[suggestion.evidence]}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{suggestion.rationale}</p>

        {suggestion.beforeText && (
          <div>
            <p className="text-sm font-semibold">Antes</p>
            <div className="mt-1 rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
              {suggestion.beforeText}
            </div>
          </div>
        )}

        {suggestion.afterText && (
          <div>
            <p className="text-sm font-semibold">Después</p>
            <div className="mt-1 rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
              {suggestion.afterText}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const AtsReport = ({ ats }: { ats: AtsEvaluation }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">Informe ATS</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Alineación</h2>
            <ScorePieChart score={ats.alignmentScore} size={90} />
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">ATS</h2>
            <ScorePieChart score={ats.atsReadinessScore} size={90} />
          </div>
        </div>
        <p className="text-xl text-muted-foreground">{ats.summary}</p>
      </header>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">Sugerencias</TabsTrigger>
          <TabsTrigger value="match">Alineación</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Ajuste</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">{ats.overallFit}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {(ats.suggestions ?? []).map((s) => (
              <AtsSuggestionCard key={s.id} suggestion={s} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="match" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Desglose</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Cobertura de requisitos</span>
                  <ScorePieChart
                    score={ats.breakdown.requirementsCoverageScore}
                    size={60}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Evidencia</span>
                  <ScorePieChart score={ats.breakdown.evidenceScore} size={60} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Enfoque al rol</span>
                  <ScorePieChart
                    score={ats.breakdown.roleTargetingScore}
                    size={60}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Formato / Parseabilidad</span>
                  <ScorePieChart
                    score={ats.breakdown.formattingScore}
                    size={60}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fortalezas y Gaps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <CheckCircle className="mr-2 text-green-500" /> Fortalezas
                  </h3>
                  <FeedbackList items={ats.strengths} type="strength" />
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <XCircle className="mr-2 text-red-500" /> Gaps
                  </h3>
                  <FeedbackList items={ats.gaps} type="improvement" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold flex items-center">
                  <CheckCircle className="mr-2 text-green-500" /> Encontradas
                </h3>
                <FeedbackList
                  items={ats.keywordAnalysis.matchedKeywords}
                  type="strength"
                />
              </div>
              <div>
                <h3 className="font-semibold flex items-center">
                  <XCircle className="mr-2 text-red-500" /> Faltantes
                </h3>
                <FeedbackList
                  items={ats.keywordAnalysis.missingKeywords}
                  type="improvement"
                />
              </div>
              <div>
                <h3 className="font-semibold flex items-center">
                  <Target className="mr-2" /> Variantes recomendadas
                </h3>
                <FeedbackList
                  items={ats.keywordAnalysis.recommendedVariants}
                  type="strength"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
