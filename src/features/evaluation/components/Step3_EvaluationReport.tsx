import type { EvaluationResult } from "@/types/evaluation";
import { AtsReport } from "./ats/AtsReport";
import { CvReport } from "./cv/CvReport";

export const Step3_EvaluationReport = ({
  result,
}: {
  result: EvaluationResult;
}) => {
  if (result.kind === "ats") {
    return <AtsReport ats={result.data} />;
  }

  return <CvReport cvScore={result.data} />;
};
