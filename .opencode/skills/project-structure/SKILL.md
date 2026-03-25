---
name: project-structure
description: Estructura de directorios y organización del código fuente en src/
---

# Project Structure

## Estructura General

```
src/
├── components/           # Componentes React reutilizables
├── features/            # Funcionalidades por dominio
├── hooks/              # Custom hooks
├── lib/                # Utilidades y lógica de negocio
├── stores/             # Zustand stores
├── templates           # Plantillas de CV
├── types/              # TypeScript interfaces
├── utils/              # Funciones utilitarias
├── assets/             # Recursos estáticos
├── data/               # Datos estáticos (ejemplos, defaults)
├── App.tsx             # Componente raíz
├── main.tsx            # Entry point
└── index.css           # Estilos globales
```

## Detailed Structure

### components/

```
components/
├── ResumeEditor.tsx      # Editor principal de CV
├── ResumeForm.tsx        # Formulario de edición
├── ProfileList.tsx      # Lista de perfiles
├── ResumeRenderer.tsx    # Renderizador de plantillas
├── ai/
│   └── AiSettingsDialog.tsx  # Configuración de IA
├── form/                 # Componentes de formulario
│   ├── WorkHighlights.tsx
│   ├── ProjectHighlights.tsx
│   ├── EducationCourses.tsx
│   └── InterestKeywords.tsx
├── layout/
│   ├── MainLayout.tsx   # Layout principal
│   └── layoutContext.tsx # Contexto de layout
└── ui/                   # Componentes base (Radix)
    ├── button.tsx
    ├── dialog.tsx
    ├── form.tsx
    ├── input.tsx
    ├── select.tsx
    ├── tabs.tsx
    ├── card.tsx
    ├── accordion.tsx
    ├── dropdown-menu.tsx
    ├── alert-dialog.tsx
    ├── separator.tsx
    ├── label.tsx
    ├── textarea.tsx
    ├── sonner.tsx
    └── ...
```

### features/

```
features/
└── evaluation/           # Funcionalidad de evaluación
    ├── EvaluationView.tsx
    ├── services/
    │   └── evaluationService.ts
    ├── hooks/
    │   └── useCvEvaluation.ts
    └── components/
        ├── Step1_SelectProfile.tsx
        ├── Step2_JobOffer.tsx
        ├── Step3_EvaluationReport.tsx
        ├── EvaluationError.tsx
        ├── EvaluationLoader.tsx
        ├── ScorePieChart.tsx
        ├── ats/
        │   └── AtsReport.tsx
        ├── cv/
        │   ├── CvReport.tsx
        │   └── CvSectionCard.tsx
        └── feedback/
            └── FeedbackList.tsx
```

### hooks/

```
hooks/
├── useResumeStore.ts    # Store Zustand de perfiles
├── useEditorState.ts    # Estado del editor
├── useFormManager.ts    # Gestión de formulario
├── useDynamicStyles.ts  # Estilos dinámicos para plantillas
└── ...
```

### lib/

```
lib/
├── ai/                   # Clientes y servicios de IA
│   ├── analyzeCvWithAi.ts    # Extracción de CV via IA
│   ├── getConfiguredClient.ts # Factory de cliente IA
│   ├── aiClientFactory.ts
│   ├── types.ts
│   ├── errors.ts
│   └── clients/
│       ├── geminiClient.ts
│       └── openAiCompatibleClient.ts
├── importers/            # Importadores de archivos
│   ├── jsonImporter.ts
│   ├── pdfAiImporter.ts
│   ├── imageAiImporter.ts
│   ├── fileImporterService.ts
│   ├── types.ts
│   └── index.ts
├── validation/           # Schemas de validación Zod
│   └── resumeSchema.ts
└── utils.ts             # Utilidades generales (cn)
```

### stores/

```
stores/
└── aiConfigStore.ts     # Configuración de API keys
```

### templates/

```
templates/
├── templates.tsx        # Catálogo de plantillas
├── HarvardMinimal.tsx   # Template Harvard Minimal
├── HarvardMinimal.css
├── HarvardMostMinimal.tsx
└── HarvardMostMinimal.css
```

### types/

```
types/
├── resume.ts            # Tipos de datos del CV
└── evaluation.ts        # Tipos de evaluación CV/ATS
```

## Alias de Imports

El proyecto usa el alias `@` que apunta a `src/`:

```typescript
// ✅ Correcto
import { Button } from "@/components/ui/button"
import { ResumeData } from "@/types/resume"
import { useResumeStore } from "@/hooks/useResumeStore"

// ❌ Evitar
import { Button } from "../../components/ui/button"
```

## Archivos de Configuración

```
├── vite.config.ts       # Config Vite
├── tsconfig.json        # Config TypeScript
├── eslint.config.js     # Config ESLint
├── tailwind.config.js   # (no existe - usa CSS)
├── components.json      # shadcn/ui
├── package.json
└── index.html
```

## Docs

```
.docs/
├── sdd/                 # Specification Design Documents
├── guides/              # Guías
└── *.md                # Documentación varia
```
