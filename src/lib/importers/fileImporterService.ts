import { type Importer, jsonImporter } from "./";
import type { ResumeData } from "@/types/resume";

const importers: { [key: string]: Importer } = {
  "application/json": jsonImporter,
  // Aquí se añadirían otros importadores en el futuro: "application/pdf": pdfImporter, etc.
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
