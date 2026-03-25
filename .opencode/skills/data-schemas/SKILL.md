---
name: data-schemas
description: Esquemas de datos Zod y TypeScript interfaces del proyecto
---

# Data Schemas

## Esquemas Zod (Validación)

### ResumeDataSchema

**Ubicación**: `src/lib/validation/resumeSchema.ts`

```typescript
import { ResumeDataSchema } from "@/lib/validation/resumeSchema";

const validData = ResumeDataSchema.parse(inputData);
// Throws ZodError si inválido
```

### Esquemas Individuales

```typescript
const ResumeBasicsSchema = z.object({ ... });
const ResumeWorkSchema = z.object({ ... });
const ResumeEducationSchema = z.object({ ... });
const ResumeCertificateSchema = z.object({ ... });
// etc.
```

---

## Interfaces TypeScript

### ResumeBasics

```typescript
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
```

### ResumeWork

```typescript
interface ResumeWork {
  name: string;         // Empresa
  position: string;     // Puesto
  url?: string;         // Website empresa
  startDate: string;    // YYYY-MM-DD
  endDate?: string;    // YYYY-MM-DD o "Presente"
  summary?: string;     // Descripción
  highlights?: string[]; // Puntos destacados
}
```

### ResumeEducation

```typescript
interface ResumeEducation {
  institution: string;
  url?: string;
  area: string;         // ej. Ingeniería Informática
  studyType: string;    // ej. Grado, Máster
  startDate?: string;
  endDate?: string;
  score?: string;      // ej. "8.5/10"
  courses?: string[];  // Cursos relevantes
}
```

### ResumeProject

```typescript
interface ResumeProject {
  name: string;
  description?: string;
  highlights?: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}
```

### ResumeCertificate

```typescript
interface ResumeCertificate {
  name: string;        // ej. AWS Solutions Architect
  date: string;        // YYYY-MM-DD
  issuer: string;     // ej. Amazon Web Services
  url?: string;        // Link al certificado
  keywords?: string;   // Tecnologías/conceptos (texto libre)
}
```

### ResumeSkill

```typescript
interface ResumeSkill {
  name: string;        // ej. JavaScript
  level?: string;      // ej. Avanzado
  keywords?: string[]; // ej. ["ES6", "TypeScript"]
}
```

### ResumeLanguage

```typescript
interface ResumeLanguage {
  language: string;    // ej. Inglés
  fluency: string;    // ej. C1, Nativo
}
```

### ResumeInterest

```typescript
interface ResumeInterest {
  name: string;
  keywords?: string[];
}
```

### ResumeVolunteer

```typescript
interface ResumeVolunteer {
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}
```

### ResumeAward

```typescript
interface ResumeAward {
  title: string;
  date: string;
  awarder: string;
  summary?: string;
}
```

### ResumePublication

```typescript
interface ResumePublication {
  name: string;
  publisher: string;
  releaseDate: string;
  url?: string;
  summary?: string;
}
```

### ResumeReference

```typescript
interface ResumeReference {
  name: string;
  reference: string;   // Recomendación
}
```

---

## Tipos Compuestos

### ResumeData

```typescript
interface ResumeData {
  basics: ResumeBasics;
  work?: ResumeWork[];
  volunteer?: ResumeVolunteer[];
  education?: ResumeEducation[];
  projects?: ResumeProject[];
  awards?: ResumeAward[];
  certificates?: ResumeCertificate[];
  publications?: ResumePublication[];
  skills?: ResumeSkill[];
  languages?: ResumeLanguage[];
  interests?: ResumeInterest[];
  references?: ResumeReference[];
}
```

### CVProfile

```typescript
interface CVProfile {
  id: string;
  name: string;
  template: Template;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
}
```

### Template

```typescript
type TemplateType = "harvard-minimal" | "harvard-most-minimal";

interface Template {
  id: TemplateType;
  name: string;
  description: string;
}
```

---

## Tipos de Evaluación

### CVScore

```typescript
interface CVScore {
  overallScore: number;       // 0-100
  summary: string;
  sections: {
    contactInfo: SectionEvaluation;
    summaryProfile: SectionEvaluation;
    experience: SectionEvaluation;
    education: SectionEvaluation;
    skills: SectionEvaluation;
    projects?: SectionEvaluation;
  };
  strengths: string[];
  areasForImprovement: string[];
  missingInformation: string[];
  jobMatch?: JobMatchAnalysis;
}
```

### AtsEvaluation

```typescript
interface AtsEvaluation {
  alignmentScore: number;
  atsReadinessScore: number;
  overallScore: number;
  summary: string;
  overallFit: string;
  keywordAnalysis: {
    matchedKeywords: string[];
    missingKeywords: string[];
    recommendedVariants: string[];
  };
  breakdown: {
    requirementsCoverageScore: number;
    evidenceScore: number;
    roleTargetingScore: number;
    formattingScore: number;
  };
  strengths: string[];
  gaps: string[];
  suggestions: AtsSuggestion[];
}
```

---

## Validación en Runtime

### Usar Zod Schema

```typescript
import { ResumeDataSchema } from "@/lib/validation/resumeSchema";

try {
  const validData = ResumeDataSchema.parse(inputData);
  // proceed with validData
} catch (error) {
  if (error instanceof ZodError) {
    console.log(error.errors);
  }
}
```

### Validación con Safe Parse

```typescript
const result = ResumeDataSchema.safeParse(inputData);

if (result.success) {
  const validData = result.data;
} else {
  const errors = result.error.errors;
}
```

---

## Form Schema (React Hook Form)

El form schema en `src/hooks/useFormManager.ts` es similar pero con validaciones adicionales específicas para UI (ej. emails).
