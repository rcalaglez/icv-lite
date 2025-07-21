import type { Importer } from "./types";
import type { ResumeData } from "@/types/resume";
import { analyzeCVWithAI } from "@/lib/ai/geminiService";

export const pdfAiImporter: Importer = {
  import: async (file: File): Promise<ResumeData> => {
    if (file.type !== "application/pdf") {
      throw new Error("Invalid file type. Expected PDF.");
    }

    try {
      const resumeData = await analyzeCVWithAI(file);
      console.log("resultado", resumeData);
      return resumeData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`PDF analysis failed: ${error.message}`);
      }
      throw new Error("An unknown error occurred during PDF analysis.");
    }
  },
};
