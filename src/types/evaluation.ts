/**
 * Representa la evaluación detallada de una sección específica del CV.
 * Cada apartado principal (Experiencia, Educación, etc.) tendrá su propia evaluación.
 */
export type SectionEvaluation = {
  /** Puntuación de la sección (0-100). */
  score: number;
  /** Feedback general sobre esta sección. */
  feedback: string;
  /** Puntos fuertes específicos detectados en esta sección. */
  strengths: string[];
  /** Areas de mejora concretas para esta sección. */
  areasForImprovement: string[];
};

/**
 * Contiene el análisis de alineación del CV con una oferta de trabajo específica.
 * Este objeto solo estará presente si la evaluación se realiza en el contexto de una oferta.
 */
export type JobMatchAnalysis = {
  /** Puntuación global de adecuación del CV a la oferta (0-100). */
  relevanceScore: number;
  /** Resumen del grado de ajuste (ej. "Ajuste Fuerte", "Potencialmente Apto", "Bajo Ajuste"). */
  overallFit: string;
  /** Análisis de palabras clave. */
  keywordAnalysis: {
    /** Palabras clave de la oferta encontradas en el CV. */
    matchedKeywords: string[];
    /** Palabras clave importantes de la oferta que no se encontraron en el CV. */
    missingKeywords: string[];
  };
  /** Alineación de la experiencia laboral con los requisitos de la oferta. */
  experienceAlignment: {
    score: number;
    feedback: string;
  };
  /** Alineación de las habilidades con las requeridas en la oferta. */
  skillsAlignment: {
    score: number;
    feedback: string;
  };
};

/**
 * El objeto principal que representa la puntuación y evaluación completa de un CV Profile.
 * Puede ser una evaluación general o una evaluación contra una oferta de trabajo específica.
 */
export type CVScore = {
  /** Identificador único para esta evaluación. */
  id: string;
  /** Fecha en que se generó la evaluación. */
  evaluationDate: string;
  /** Puntuación global del CV (0-100), calculada a partir de las puntuaciones de las secciones. */
  overallScore: number;
  /** Un resumen ejecutivo de la evaluación completa del CV. */
  summary: string;

  /** Desglose de la puntuación y feedback para cada sección principal del CV. */
  sections: {
    contactInfo: SectionEvaluation;
    summaryProfile: SectionEvaluation;
    experience: SectionEvaluation;
    education: SectionEvaluation;
    skills: SectionEvaluation;
    projects?: SectionEvaluation; // Opcional, no todos los CVs tienen proyectos.
    // Se podrían añadir más secciones como Certificaciones, Idiomas, etc.
  };

  /**
   * Aspectos que están muy bien (Fortalezas Globales):
   * Un resumen de los puntos más destacados del CV en general.
   */
  strengths: string[];

  /**
   * Aspectos por mejorar (Debilidades Globales):
   * Sugerencias generales para mejorar el impacto del CV.
   */
  areasForImprovement: string[];

  /**
   * Aspectos que faltan (Omisiones Clave):
   * Información importante que se echa en falta en el CV (ej. "Falta un perfil profesional", "La experiencia no está cuantificada").
   */
  missingInformation: string[];

  /**
   * Análisis opcional de la adecuación del CV a una oferta de trabajo.
   * Si este objeto existe, la evaluación se ha realizado comparando el CV con una oferta.
   */
  jobMatch?: JobMatchAnalysis;
};
