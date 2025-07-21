import type { ResumeData } from "@/types/resume";
import type {
  CVScore,
  SectionEvaluation,
  JobMatchAnalysis,
} from "@/types/evaluation";
import { model, generationConfig } from "@/lib/ai/geminiService";
import { v4 as uuidv4 } from "uuid";

// Definiciones de tipos para inyectar en el prompt
const sectionEvaluationType = `
export type SectionEvaluation = {
  score: number; // Debe ser un número entero entre 0 y 100.
  feedback: string;
  strengths: string[];
  areasForImprovement: string[];
};
`;

const jobMatchAnalysisType = `
export type JobMatchAnalysis = {
  relevanceScore: number; // Debe ser un número entero entre 0 y 100.
  overallFit: string;
  keywordAnalysis: {
    matchedKeywords: string[];
    missingKeywords: string[];
  };
  experienceAlignment: {
    score: number; // Debe ser un número entero entre 0 y 100.
    feedback: string;
  };
  skillsAlignment: {
    score: number; // Debe ser un número entero entre 0 y 100.
    feedback: string;
  };
};
`;

const cvScoreType = `
export type CVScore = {
  overallScore: number; // Debe ser un número entero entre 0 y 100.
  summary: string;
  sections: {
    contactInfo: SectionEvaluation;
    summaryProfile: SectionEvaluation;
    experience: SectionEvaluation;
    education: SectionEvaluation;
    skills: SectionEvaluation;
    projects?: SectionEvaluation;
  };
  strengths: string[];
  areasForImprovement: string[];
  missingInformation: string[];
  jobMatch?: JobMatchAnalysis;
};
`;

/**
 * Construye el prompt para la IA basado en el perfil del CV y una oferta de trabajo opcional.
 * @param resumeData - Los datos del perfil del CV.
 * @param jobOfferText - El texto de la oferta de trabajo (opcional).
 * @returns El prompt para enviar al modelo de lenguaje.
 */
const buildPrompt = (resumeData: ResumeData, jobOfferText?: string): string => {
  const resumeJson = JSON.stringify(resumeData, null, 2);

  const basePrompt = `Analiza el siguiente perfil de CV en formato JSON y genera un análisis de "CVScore" detallado en formato JSON.
El análisis debe ser riguroso, objetivo y constructivo, identificando fortalezas, debilidades y áreas de mejora.
Sigue estrictamente la estructura de los siguientes tipos de TypeScript para la respuesta JSON.
**IMPORTANTE: Todas las puntuaciones (score, relevanceScore) deben ser un número entero entre 0 y 100.**

${sectionEvaluationType}
${jobMatchAnalysisType}
${cvScoreType}

CV:
\`\`\`json
${resumeJson}
\`\`\``;

  if (jobOfferText) {
    return `${basePrompt}

Compara el CV con la siguiente oferta de trabajo y rellena el campo 'jobMatch'.

Oferta de Trabajo:
\`\`\`
${jobOfferText}
\`\`\`

Proporciona únicamente el objeto JSON del CVScore, sin texto adicional antes o después.
Asegúrate de que TODO el contenido textual generado (resúmenes, feedback, fortalezas, áreas de mejora, etc.) esté **EXCLUSIVAMENTE en español**.`;
  } else {
    return `${basePrompt}

Proporciona únicamente el objeto JSON del CVScore, sin texto adicional antes o después.
Asegúrate de que TODO el contenido textual generado (resúmenes, feedback, fortalezas, áreas de mejora, etc.) esté **EXCLUSIVAMENTE en español**.`;
  }
};

/**
 * Llama al servicio de IA para evaluar un perfil de CV.
 * @param resumeData - Los datos del perfil del CV.
 * @param jobOfferText - El texto de la oferta de trabajo (opcional).
 * @returns Una promesa que se resuelve con el objeto CVScore.
 */
export const evaluateCv = async (
  resumeData: ResumeData,
  jobOfferText?: string
): Promise<CVScore> => {
  const prompt = buildPrompt(resumeData, jobOfferText);

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response.text();
    const rawCvScore = JSON.parse(responseText) as CVScore;

    // Añadir id y evaluationDate en el cliente
    const finalCvScore: CVScore = {
      ...rawCvScore,
      id: uuidv4(),
      evaluationDate: new Date().toISOString(),
    };

    return finalCvScore;
  } catch (error) {
    console.error("Error al evaluar el CV con el servicio de IA:", error);
    throw new Error(
      "La evaluación del CV ha fallado. Por favor, inténtalo de nuevo."
    );
  }
};
