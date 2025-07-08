import type { Template, TemplateType } from "../types/resume";
import { HarvardMinimal } from "./HarvardMinimal";

export const availableTemplates: Template[] = [
  {
    id: "harvard-minimal",
    name: "Harvard Minimal",
    description:
      "Plantilla clásica y profesional con diseño limpio y tipografía clara. Ideal para sectores tradicionales y posiciones ejecutivas.",
  },
];

export const getTemplateById = (id: TemplateType): Template | undefined => {
  return availableTemplates.find((template) => template.id === id);
};

export const getTemplateComponent = async (templateId: TemplateType) => {
  switch (templateId) {
    case "harvard-minimal":
      return HarvardMinimal;
    default:
      throw new Error(`Template ${templateId} not found`);
  }
};

export const isValidTemplate = (
  templateId: string
): templateId is TemplateType => {
  return availableTemplates.some((template) => template.id === templateId);
};

export const getDefaultTemplate = (): Template => {
  return availableTemplates[0];
};
