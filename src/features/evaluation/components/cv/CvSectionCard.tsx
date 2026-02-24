import type { SectionEvaluation } from "@/types/evaluation";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { ScorePieChart } from "../ScorePieChart";
import { FeedbackList } from "../feedback/FeedbackList";

export const CvSectionCard = ({
  title,
  data,
}: {
  title: string;
  data: SectionEvaluation;
}) => (
  <AccordionItem value={title}>
    <AccordionTrigger className="text-lg font-semibold flex justify-between items-center w-full">
      <span>{title}</span>
      <ScorePieChart score={data.score} size={60} />
    </AccordionTrigger>
    <AccordionContent className="space-y-4">
      <p>{data.feedback}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 text-green-500" /> Puntos Fuertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackList items={data.strengths} type="strength" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <XCircle className="mr-2 text-red-500" /> Áreas de Mejora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackList items={data.areasForImprovement} type="improvement" />
          </CardContent>
        </Card>
      </div>
    </AccordionContent>
  </AccordionItem>
);
