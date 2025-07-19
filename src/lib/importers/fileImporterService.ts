import {
  type Importer,
  jsonImporter,
  pdfAiImporter,
  imageAiImporter,
} from "./";
import type { ResumeData } from "@/types/resume";

const importers: { [key: string]: Importer } = {
  "application/json": jsonImporter,
  "application/pdf": pdfAiImporter,
  "image/jpeg": imageAiImporter,
  "image/png": imageAiImporter,
  "image/webp": imageAiImporter,
  "image/gif": imageAiImporter,
  "image/bmp": imageAiImporter,
};

export const FileImporterService = {
  importFile: async (file: File): Promise<ResumeData> => {
    const importer = importers[file.type];

    if (!importer) {
      throw new Error(
        `No hay un importador disponible para el tipo de archivo: ${file.type}`
      );
    }

    return importer.import(file);
  },
};
