import type { Importer } from "./types";
import type { ResumeData } from "@/types/resume";

export const jsonImporter: Importer = {
  import: (file: File): Promise<ResumeData> => {
    return new Promise((resolve, reject) => {
      if (file.type !== "application/json") {
        reject(new Error("Tipo de archivo no válido. Se esperaba JSON."));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          // TODO añadir validación de esquema para ResumeData
          resolve(data as ResumeData);
        } catch (error) {
          reject(new Error("Error al parsear el archivo JSON: " + error));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error al leer el archivo."));
      };

      reader.readAsText(file);
    });
  },
};
