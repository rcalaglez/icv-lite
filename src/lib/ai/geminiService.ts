import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import type { ResumeData } from "@/types/resume";
import { ResumeDataSchema } from "@/lib/validation/resumeSchema";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = import.meta.env.VITE_AI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_AI_API_KEY is not defined in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.4,
  topK: 32,
  topP: 1,
  maxOutputTokens: 8192,
  response_mime_type: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function fileToGenerativePart(file: File) {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: base64EncodedData, mimeType: file.type },
  };
}

export async function analyzeCVWithAI(file: File): Promise<ResumeData> {
  const parts = [
    await fileToGenerativePart(file),
    {
      text: `Analyze the provided CV (in image or PDF format) and extract the information to generate a complete resume profile in JSON format. The JSON output must strictly follow this TypeScript interface:

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
      
      Crucially, if the document provided is NOT a resume or curriculum vitae, or if it does not contain the essential components of a CV (such as a clear name, work experience, and educational background), or if you cannot extract sufficient information to populate the required fields of the ResumeData structure, your response MUST be a JSON object with an "error" property, like this: { "error": "The provided document does not appear to be a valid CV or lacks essential information." }`,
    },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const responseText = result.response.text();
    const jsonResponse = JSON.parse(responseText);

    if (jsonResponse.error) {
      throw new Error(jsonResponse.error);
    }

    const validatedData = ResumeDataSchema.parse(jsonResponse);
    return validatedData as ResumeData;
  } catch (error) {
    console.error("Error analyzing CV with AI:", error);
    if (error instanceof Error) {
      throw new Error(`AI analysis failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during AI analysis.");
  }
}
