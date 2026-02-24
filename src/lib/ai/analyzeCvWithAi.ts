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
  startDate: string; // Use YYYY-MM-DD format if possible, otherwise, a string is fine.
  endDate?: string; // Use YYYY-MM-DD format. Can be "Present".
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

// Other interfaces like ResumeVolunteer, ResumeAward, etc., are omitted for brevity but you should populate them if you find relevant information.

interface ResumeData {
  basics: ResumeBasics;
  work?: ResumeWork[];
  volunteer?: any[]; // Populate if found
  education?: ResumeEducation[];
  awards?: any[]; // Populate if found
  certificates?: any[]; // Populate if found
  publications?: any[]; // Populate if found
  skills?: { name: string; level?: string; keywords?: string[] }[];
  languages?: { language: string; fluency: string }[];
  interests?: { name: string; keywords?: string[] }[];
  references?: any[]; // Populate if found
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
