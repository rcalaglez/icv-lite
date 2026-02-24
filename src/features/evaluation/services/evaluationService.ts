import type { ResumeData } from "@/types/resume";
import type { AtsEvaluation, CVScore } from "@/types/evaluation";
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

const atsSuggestionType = `
export type AtsSuggestionAction = "replace" | "remove" | "include" | "reorder";
export type AtsSuggestionImpact = "high" | "medium" | "low";
export type AtsSuggestionEvidence = "supported" | "needs_user_input" | "not_supported";

export type AtsSuggestion = {
  id: string;
  action: AtsSuggestionAction;
  impact: AtsSuggestionImpact;
  evidence: AtsSuggestionEvidence;
  targetSection: "summaryProfile" | "experience" | "projects" | "skills" | "education" | "contactInfo" | "general";
  rationale: string;
  beforeText?: string;
  afterText?: string;
};
`;

const atsEvaluationType = `
export type AtsEvaluation = {
  alignmentScore: number; // Entero 0-100
  atsReadinessScore: number; // Entero 0-100
  overallScore: number; // Entero 0-100
  summary: string;
  overallFit: string;
  keywordAnalysis: {
    matchedKeywords: string[];
    missingKeywords: string[];
    recommendedVariants: string[];
  };
  breakdown: {
    requirementsCoverageScore: number; // Entero 0-100
    evidenceScore: number; // Entero 0-100
    roleTargetingScore: number; // Entero 0-100
    formattingScore: number; // Entero 0-100
  };
  strengths: string[];
  gaps: string[];
  suggestions: AtsSuggestion[];
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
const buildCvOnlyPrompt = (resumeData: ResumeData): string => {
  const resumeJson = JSON.stringify(resumeData, null, 2);

  return `Analiza el siguiente perfil de CV en formato JSON y genera un análisis de "CVScore" detallado en formato JSON.
El análisis debe ser riguroso, objetivo y constructivo, identificando fortalezas, debilidades y áreas de mejora.
Sigue estrictamente la estructura de los siguientes tipos de TypeScript para la respuesta JSON.
**IMPORTANTE: Todas las puntuaciones (score, relevanceScore) deben ser un número entero entre 0 y 100.**

${sectionEvaluationType}
${jobMatchAnalysisType}
${cvScoreType}

CV:
\`\`\`json
${resumeJson}
\`\`\`

Proporciona únicamente el objeto JSON del CVScore, sin texto adicional antes o después.
Asegúrate de que TODO el contenido textual generado (resúmenes, feedback, fortalezas, áreas de mejora, etc.) esté **EXCLUSIVAMENTE en español**.`;
};

const buildAtsPrompt = (resumeData: ResumeData, jobOfferText: string): string => {
  const resumeJson = JSON.stringify(resumeData, null, 2);

  return `Eres un evaluador ATS (Applicant Tracking System) y reclutador técnico. Evalúa el CV contra la oferta.
Tu objetivo es maximizar la alineación REAL y la parseabilidad ATS sin inventar experiencia.

Reglas:
- NO inventes experiencia ni herramientas no demostradas. Si una mejora requiere datos, usa evidence="needs_user_input" y redacta una plantilla para que el usuario la complete.
- Evita consejos genéricos. Cada sugerencia debe ser accionable y, cuando aplique, con "beforeText" y "afterText".
- Prioriza requisitos MUST-HAVE, y después NICE-TO-HAVE.
- Se explícito con variantes de keywords (sinónimos) y recomienda incluir las variantes útiles.
- Todas las puntuaciones deben ser enteros 0-100.

Devuelve únicamente JSON que cumpla estos tipos de TypeScript:

${atsSuggestionType}
${atsEvaluationType}

CV:
\`\`\`json
${resumeJson}
\`\`\`\

Oferta de Trabajo:
\`\`\`
${jobOfferText}
\`\`\`

Genera un objeto JSON AtsEvaluation (sin texto adicional). Todo el texto en español.`;
};

/**
 * Llama al servicio de IA para evaluar un perfil de CV.
 * @param resumeData - Los datos del perfil del CV.
 * @param jobOfferText - El texto de la oferta de trabajo (opcional).
 * @returns Una promesa que se resuelve con el objeto CVScore.
 */
export const evaluateCvOnly = async (resumeData: ResumeData): Promise<CVScore> => {
  const prompt = buildCvOnlyPrompt(resumeData);

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

export const evaluateAts = async (
  resumeData: ResumeData,
  jobOfferText: string
): Promise<AtsEvaluation> => {
  const prompt = buildAtsPrompt(resumeData, jobOfferText);

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response.text();
    const rawAts = JSON.parse(responseText) as AtsEvaluation;

    return {
      ...rawAts,
      id: uuidv4(),
      evaluationDate: new Date().toISOString(),
      suggestions: (rawAts.suggestions ?? []).map((s) => ({
        ...s,
        id: s.id || uuidv4(),
      })),
    };
  } catch (error) {
    console.error("Error al evaluar ATS con el servicio de IA:", error);
    throw new Error(
      "La evaluación ATS ha fallado. Por favor, revisa la oferta e inténtalo de nuevo."
    );
  }
};
