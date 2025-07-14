import type { ResumeData } from "@/types/resume";

export interface Importer {
  import: (file: File) => Promise<ResumeData>;
}
