import type { CVScore } from "@/types/evaluation";
import {
  Accordion,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Target, TrendingUp, XCircle } from "lucide-react";
import { ScorePieChart } from "../ScorePieChart";
import { FeedbackList } from "../feedback/FeedbackList";
import { CvSectionCard } from "./CvSectionCard";

export const CvReport = ({ cvScore }: { cvScore: CVScore }) => {
  const hasJobMatch = !!cvScore.jobMatch;

  const sectionTitles: { [key: string]: string } = {
    contactInfo: "Información de Contacto",
    summaryProfile: "Resumen y Perfil",
    experience: "Experiencia Profesional",
    education: "Educación",
    skills: "Habilidades",
    projects: "Proyectos",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Informe de Evaluación de CV
        </h1>
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">Puntuación Global:</h2>
          <ScorePieChart score={cvScore.overallScore} size={100} />
        </div>
        <p className="text-xl text-muted-foreground">{cvScore.summary}</p>
      </header>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="report">Informe Detallado</TabsTrigger>
          <TabsTrigger value="jobMatch" disabled={!hasJobMatch}>
            Ajuste con Oferta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2" /> Fortalezas Globales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FeedbackList items={cvScore.strengths} type="strength" />
              </CardContent>
            </Card>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2" /> Mejoras Sugeridas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FeedbackList
                  items={cvScore.areasForImprovement}
                  type="improvement"
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2" /> Omisiones Clave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FeedbackList
                  items={cvScore.missingInformation}
                  type="improvement"
                />
              </CardContent>
            </Card>
          </div>

          <Accordion type="single" collapsible className="w-full mt-6">
            {Object.entries(cvScore.sections).map(([key, value]) => (
              <CvSectionCard
                key={key}
                title={sectionTitles[key] || key}
                data={value}
              />
            ))}
          </Accordion>
        </TabsContent>

        {hasJobMatch && cvScore.jobMatch && (
          <TabsContent value="jobMatch" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Adecuación con la Oferta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <h3 className="text-xl font-bold">Puntuación de Relevancia:</h3>
                  <ScorePieChart
                    score={cvScore.jobMatch.relevanceScore}
                    size={80}
                  />
                </div>
                <p className="text-lg text-muted-foreground text-center">
                  {cvScore.jobMatch.overallFit}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Palabras Clave</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <CheckCircle className="mr-2 text-green-500" /> Encontradas
                  </h3>
                  <FeedbackList
                    items={cvScore.jobMatch.keywordAnalysis.matchedKeywords}
                    type="strength"
                  />
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <XCircle className="mr-2 text-red-500" /> Faltantes
                  </h3>
                  <FeedbackList
                    items={cvScore.jobMatch.keywordAnalysis.missingKeywords}
                    type="improvement"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alineación de Experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-2">
                  <ScorePieChart
                    score={cvScore.jobMatch.experienceAlignment.score}
                    size={60}
                  />
                  <p>{cvScore.jobMatch.experienceAlignment.feedback}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alineación de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-2">
                  <ScorePieChart
                    score={cvScore.jobMatch.skillsAlignment.score}
                    size={60}
                  />
                  <p>{cvScore.jobMatch.skillsAlignment.feedback}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
