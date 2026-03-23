import type { ResumeData } from "@/types/resume";
import { ResumeDataSchema } from "@/lib/validation/resumeSchema";
import type { AiClient } from "@/lib/ai/types";
import { AiProviderError } from "@/lib/ai/errors";

export async function analyzeCVWithAI(
  client: AiClient,
  file: File
): Promise<ResumeData> {
  if (!client.generateJsonWithFile) {
    throw new AiProviderError(
      "El proveedor/modelo seleccionado no soporta importar PDF/imagen."
    );
  }

  const prompt = `Analyze the provided CV (in image or PDF format) and extract the information to generate a complete resume profile in JSON format. The JSON output must strictly follow this TypeScript interface:

interface ResumeBasics {
  name: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: {
    address?: string;
    postalCode?: string;
    city?: string;
    countryCode?: string;
    region?: string;
  };
  profiles?: Array<{
    network: string;
    username: string;
    url: string;
  }>;
}

interface ResumeWork {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface ResumeVolunteer {
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface ResumeEducation {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate?: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

interface ResumeProject {
  name: string;
  description?: string;
  highlights?: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

interface ResumeAward {
  title: string;
  date: string;
  awarder: string;
  summary?: string;
}

interface ResumeCertificate {
  name: string;
  date: string;
  issuer: string;
  url?: string;
}

interface ResumePublication {
  name: string;
  publisher: string;
  releaseDate: string;
  url?: string;
  summary?: string;
}

interface ResumeSkill {
  name: string;
  level?: string;
  keywords?: string[];
}

interface ResumeLanguage {
  language: string;
  fluency: string;
}

interface ResumeInterest {
  name: string;
  keywords?: string[];
}

interface ResumeReference {
  name: string;
  reference: string;
}

interface ResumeData {
  basics: ResumeBasics;
  work?: ResumeWork[];
  volunteer?: ResumeVolunteer[];
  education?: ResumeEducation[];
  projects?: ResumeProject[];
  awards?: ResumeAward[];
  certificates?: ResumeCertificate[];
  publications?: ResumePublication[];
  skills?: ResumeSkill[];
  languages?: ResumeLanguage[];
  interests?: ResumeInterest[];
  references?: ResumeReference[];
}

Your response must be only the JSON object, without any markdown formatting, comments or other text.

Crucially, if the document provided is NOT a resume or curriculum vitae, or if it does not contain the essential components of a CV (such as a clear name, work experience, and educational background), or if you cannot extract sufficient information to populate the required fields of the ResumeData structure, your response MUST be a JSON object with an "error" property, like this: { "error": "The provided document does not appear to be a valid CV or lacks essential information." }`;

  const jsonResponse = await client.generateJsonWithFile<{ error?: string }>({
    prompt,
    file,
  });

  if (jsonResponse.error) {
    throw new Error(jsonResponse.error);
  }

  const validatedData = ResumeDataSchema.parse(jsonResponse);
  return validatedData as ResumeData;
}
