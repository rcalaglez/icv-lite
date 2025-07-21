import { useState } from "react";
import { evaluateCv } from "../services/evaluationService";
import type { CVScore } from "@/types/evaluation";
import type { ResumeData } from "@/types/resume";

export const useCvEvaluation = () => {
  const [cvScore, setCvScore] = useState<CVScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performEvaluation = async (
    resumeData: ResumeData,
    jobOfferText?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const score = await evaluateCv(resumeData, jobOfferText);
      setCvScore(score);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocurrió un error desconocido";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cvScore,
    isLoading,
    error,
    performEvaluation,
  };
};
