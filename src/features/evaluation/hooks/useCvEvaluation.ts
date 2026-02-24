import { useState } from "react";
import { evaluateAts, evaluateCvOnly } from "../services/evaluationService";
import type { EvaluationResult } from "@/types/evaluation";
import type { ResumeData } from "@/types/resume";

export const useCvEvaluation = () => {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performEvaluation = async (
    resumeData: ResumeData,
    jobOfferText?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (jobOfferText && jobOfferText.trim().length > 0) {
        const ats = await evaluateAts(resumeData, jobOfferText);
        setResult({ kind: "ats", data: ats });
      } else {
        const cv = await evaluateCvOnly(resumeData);
        setResult({ kind: "cv", data: cv });
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ocurrió un error desconocido";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    error,
    performEvaluation,
  };
};
