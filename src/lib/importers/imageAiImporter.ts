import type { Importer } from "./types";
import type { ResumeData } from "@/types/resume";
import { analyzeCVWithAI } from "@/lib/ai/geminiService";

// Lista de tipos MIME de imagen soportados
const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
];

export const imageAiImporter: Importer = {
  import: async (file: File): Promise<ResumeData> => {
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      throw new Error(`Unsupported image file type: ${file.type}.`);
    }

    try {
      const resumeData = await analyzeCVWithAI(file);
      return resumeData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Image analysis failed: ${error.message}`);
      }
      throw new Error("An unknown error occurred during image analysis.");
    }
  },
};