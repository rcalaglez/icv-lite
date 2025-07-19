import { z } from "zod";

const ResumeBasicsSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  label: z.string().optional(),
  image: z.string().url().optional(),
  email: z.string().email("Formato de email inválido.").optional(),
  phone: z.string().optional(),
  url: z.string().url("Formato de URL inválido.").optional(),
  summary: z.string().optional(),
  location: z.object({
    address: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    countryCode: z.string().optional(),
    region: z.string().optional(),
  }).optional(),
  profiles: z.array(z.object({
    network: z.string(),
    username: z.string(),
    url: z.string().url("Formato de URL inválido."),
  })).optional(),
});

const ResumeWorkSchema = z.object({
  name: z.string().min(1, "El nombre de la empresa es requerido."),
  position: z.string().min(1, "El puesto es requerido."),
  url: z.string().url("Formato de URL inválido.").optional(),
  startDate: z.string().min(1, "La fecha de inicio es requerida."),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const ResumeEducationSchema = z.object({
  institution: z.string().min(1, "La institución es requerida."),
  url: z.string().url("Formato de URL inválido.").optional(),
  area: z.string().min(1, "El área de estudio es requerida."),
  studyType: z.string().min(1, "El tipo de estudio es requerido."),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  score: z.string().optional(),
  courses: z.array(z.string()).optional(),
});

const ResumeVolunteerSchema = z.object({
  organization: z.string().min(1, "La organización es requerida."),
  position: z.string().min(1, "El puesto es requerido."),
  url: z.string().url().optional(),
  startDate: z.string().min(1, "La fecha de inicio es requerida."),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const ResumeAwardSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  date: z.string().min(1, "La fecha es requerida."),
  awarder: z.string().min(1, "El otorgante es requerido."),
  summary: z.string().optional(),
});

const ResumeCertificateSchema = z.object({
  name: z.string().min(1, "El nombre del certificado es requerido."),
  date: z.string().min(1, "La fecha es requerida."),
  issuer: z.string().min(1, "El emisor es requerido."),
  url: z.string().url().optional(),
});

const ResumePublicationSchema = z.object({
  name: z.string().min(1, "El nombre de la publicación es requerido."),
  publisher: z.string().min(1, "El editor es requerido."),
  releaseDate: z.string().min(1, "La fecha de publicación es requerida."),
  url: z.string().url().optional(),
  summary: z.string().optional(),
});

const ResumeSkillSchema = z.object({
  name: z.string().min(1, "El nombre de la habilidad es requerido."),
  level: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const ResumeLanguageSchema = z.object({
  language: z.string().min(1, "El idioma es requerido."),
  fluency: z.string().min(1, "La fluidez es requerida."),
});

const ResumeInterestSchema = z.object({
  name: z.string().min(1, "El nombre del interés es requerido."),
  keywords: z.array(z.string()).optional(),
});

const ResumeReferenceSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  reference: z.string().min(1, "La referencia es requerida."),
});

export const ResumeDataSchema = z.object({
  basics: ResumeBasicsSchema,
  work: z.array(ResumeWorkSchema).optional(),
  volunteer: z.array(ResumeVolunteerSchema).optional(),
  education: z.array(ResumeEducationSchema).optional(),
  awards: z.array(ResumeAwardSchema).optional(),
  certificates: z.array(ResumeCertificateSchema).optional(),
  publications: z.array(ResumePublicationSchema).optional(),
  skills: z.array(ResumeSkillSchema).optional(),
  languages: z.array(ResumeLanguageSchema).optional(),
  interests: z.array(ResumeInterestSchema).optional(),
  references: z.array(ResumeReferenceSchema).optional(),
});
