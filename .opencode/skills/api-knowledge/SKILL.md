---
name: api-knowledge
description: APIs y servicios del proyecto: AI clients, importadores, stores, evaluación
---

# API Knowledge

## AI Clients

### getConfiguredClient.ts

**Ubicación**: `src/lib/ai/getConfiguredClient.ts`

**Función**: Factory que retorna el cliente AI configurado según la preference del usuario.

```typescript
import { getConfiguredAiClient } from "@/lib/ai/getConfiguredClient";

const client = getConfiguredAiClient();
// client puede ser gemini o openai-compatible
```

### analyzeCvWithAi.ts

**Ubicación**: `src/lib/ai/analyzeCvWithAi.ts`

**Función**: Extrae datos de un CV (PDF/imagen) usando IA.

```typescript
import { analyzeCVWithAI } from "@/lib/ai/analyzeCvWithAi";

const resumeData = await analyzeCVWithAI(client, file);
// Retorna ResumeData validado contra Zod schema
```

**Prompt**: Contiene schema completo de ResumeData para extracción.

### Clientes Disponibles

#### Gemini Client
- **Archivo**: `src/lib/ai/clients/geminiClient.ts`
- **Proveedor**: Google Gemini
- **Capacidad**: Multimodal (PDF, imágenes)

#### OpenAI Compatible Client
- **Archivo**: `src/lib/ai/clients/openAiCompatibleClient.ts`
- **Proveedores**: Ollama, LM Studio, cualquier API OpenAI-compatible
- **Capacidad**: Según modelo

---

## Importadores

### fileImporterService.ts

**Ubicación**: `src/lib/importers/fileImporterService.ts`

**Función**: Punto de entrada para importar archivos.

```typescript
import { FileImporterService } from "@/lib/importers";

const resumeData = await FileImporterService.importFile(file);
// Auto-detecta tipo: JSON, PDF, imagen
```

### Importadores Específicos

#### jsonImporter
- **Archivo**: `src/lib/importers/jsonImporter.ts`
- **Input**: Archivo .json válido
- **Validación**: ResumeDataSchema

#### pdfAiImporter
- **Archivo**: `src/lib/importers/pdfAiImporter.ts`
- **Input**: PDF
- **Proceso**: analyzeCVWithAI()

#### imageAiImporter
- **Archivo**: `src/lib/importers/imageAiImporter.ts`
- **Input**: PNG, JPG, etc.
- **Proceso**: analyzeCVWithAI()

---

## Stores (Zustand)

### useResumeStore

**Ubicación**: `src/hooks/useResumeStore.ts`

**Función**: Gestión de perfiles de CV.

```typescript
import useResumeStore from "@/hooks/useResumeStore";

const { profiles, createProfile, updateProfile, deleteProfile } = useResumeStore();
```

**Estado**:
- `profiles`: Array de CVProfile
- `createProfile()`: Crea nuevo perfil
- `updateProfile(id, data)`: Actualiza perfil
- `deleteProfile(id)`: Elimina perfil
- `duplicateProfile(id)`: Duplica perfil
- `getProfile(id)`: Obtiene perfil por ID

### useAiConfigStore

**Ubicación**: `src/stores/aiConfigStore.ts`

**Función**: Configuración de API keys.

```typescript
import { useAiConfigStore } from "@/stores/aiConfigStore";

const { config, setConfig, isAiConfigured } = useAiConfigStore();
```

**Estado**:
- `config`: { provider, apiKey, model }
- `isAiConfigured(config)`: Boolean

---

## Servicios de Evaluación

### evaluationService

**Ubicación**: `src/features/evaluation/services/evaluationService.ts`

#### evaluateCvOnly

```typescript
import { evaluateCvOnly } from "@/features/evaluation/services/evaluationService";

const cvScore = await evaluateCvOnly(resumeData);
// Retorna CVScore con evaluación general
```

#### evaluateAts

```typescript
import { evaluateAts } from "@/features/evaluation/services/evaluationService";

const atsResult = await evaluateAts(resumeData, jobOfferText);
// Retorna AtsEvaluation con sugerencias
```

---

## Hooks de Evaluación

### useCvEvaluation

**Ubicación**: `src/features/evaluation/hooks/useCvEvaluation.ts`

**Función**: Hook para proceso completo de evaluación.

```typescript
import { useCvEvaluation } from "@/features/evaluation/hooks/useCvEvaluation";

const { evaluate, isLoading, error } = useCvEvaluation();
const result = await evaluate(profileId, jobOfferText?);
```

---

## Componentes Principales

### ResumeEditor

**Ubicación**: `src/components/ResumeEditor.tsx`

**Funciones**:
- Edición de perfil
- Cambio de plantilla
- Export JSON / PDF
- Duplicar/Eliminar perfil

### ResumeForm

**Ubicación**: `src/components/ResumeForm.tsx`

**Funciones**:
- Formulario de edición de datos
- Secciones: Básicos, Experiencia, Educación, Proyectos, Habilidades, Certificaciones, Intereses

### ProfileList

**Ubicación**: `src/components/ProfileList.tsx**

**Funciones**:
- Lista de perfiles
- Crear nuevo perfil
- Importar CV

---

## Utilidades

### cn (classNames)

**Ubicación**: `src/lib/utils.ts`

```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")}>
```

### formatters

**Ubicación**: `src/utils/formatters.ts`

```typescript
import { formatDate, formatDateRange } from "@/utils/formatters";

formatDate("2024-01-15");      // "15/01/2024"
formatDateRange("2024-01", ""); // "Enero 2024 - Actual"
```

---

## Tipos Principales

### ResumeData

```typescript
import type { ResumeData } from "@/types/resume";

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
