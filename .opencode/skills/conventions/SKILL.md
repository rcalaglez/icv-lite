---
name: conventions
description: Convenciones de código: commits, ramas, naming, imports y patrones de desarrollo
---

# Conventions

## Convenciones de Commits

### Formato

```
<tipo>(<ámbito>): <descripción>

Tipos:
  feat     Nueva funcionalidad
  fix      Corrección de bug
  refactor Refactorización sin cambio funcional
  chore    Tareas de mantenimiento
  docs     Documentación
  style    Estilos (CSS, Tailwind)
  test     Tests (si aplica)
  perf     Mejora de rendimiento
  ci       Cambios en CI/CD
```

### Ejemplos

```
feat(evaluation): add ATS evaluator service
fix(ui): restore Form export and resolve module imports
refactor(ai): gate evaluation behind configured client
docs(sdd): add sdd-cv-evaluation document
style(template): adjust spacing in Harvard Minimal
chore(deps): update react-router-dom to v7.6.3
```

### Reglas

- Usar tiempo presente: "add" no "added"
-Primera línea máximo 72 caracteres
- cuerpo separado por línea en blanco
- referenciar issues si aplica: "Closes #123"

---

## Convenciones de Ramas

### Tipos de Rama

```
main                    # Producción
feature/[titulo]       # Nueva funcionalidad
bugfix/[titulo]        # Corrección
hotfix/[titulo]        # Corrección urgente
refactor/[titulo]      # Refactorización
sprint/[nombre]        # Trabajo de sprint
```

### Ejemplos

```
feature/add-certificate-keywords
bugfix/export-title-correction
hotfix/security-vulnerability
refactor/evaluation-service
```

### Flujo

1. Crear desde `main`
2. Trabajar en la rama
3. Merge via PR o directo a main
4. Eliminar rama después de merge

---

## Naming Conventions

### Archivos

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `ResumeEditor.tsx` |
| Hooks | camelCase con `use` | `useResumeStore.ts` |
| Utilidades | camelCase | `formatters.ts` |
| Types/Interfaces | PascalCase | `ResumeData` |
| Constantes | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| CSS Modules | kebab-case | `harvard-minimal.css` |

### Variables y Funciones

```typescript
// ✅ Correcto
const profileList = [];
const getActiveProfile = () => {};
const handleSaveClick = () => {};

// ❌ Evitar
const pl = [];
const get = () => {};
const save = () => {};
```

### Componentes React

```tsx
// ✅ Correcto
export const ResumeEditor = () => { ... };
export default function ResumeForm() { ... }

// ❌ Evitar
export default () => { ... };
const resumeEditor = () => { ... };
```

---

## Import Conventions

### Orden de Imports

1. Imports externos (React, librerías)
2. Imports internos (@/...)
3. Imports relativos (../)
4. Imports de tipo (import type)

```typescript
// 1. Externos
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// 2. Internos (@/)
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/hooks/useResumeStore";
import { ResumeData } from "@/types/resume";

// 3. Relativos (si necesario)
import { cn } from "../../lib/utils";

// 4. Tipos
import type { ResumeData } from "@/types/resume";
```

### Alias @

```typescript
// ✅ Usar alias
import { Button } from "@/components/ui/button"

// ❌ Evitar paths relativos largos
import { Button } from "../../../../components/ui/button"
```

---

## Patrones de Código

### Componentes Funcionales

```tsx
// ✅ Patrón preferido
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // hooks al inicio
  const [state, setState] = useState("");
  
  // lógica
  const handleAction = () => { ... };
  
  // render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Custom Hooks

```typescript
// ✅ Nomenclatura con "use"
export const useResumeStore = create<ResumeState>()((set) => ({
  // ...
}));

//使用时
const { profiles } = useResumeStore();
```

### Zod Schemas

```typescript
// ✅ Nomenclatura con Schema
export const ResumeDataSchema = z.object({ ... });
export const ResumeWorkSchema = z.object({ ... });

// ✅ Uso con resolver
const resolver = zodResolver(ResumeDataSchema);
```

---

## Estilos

### Tailwind CSS

```tsx
// ✅ Clases Tailwind directamente
<div className="flex items-center justify-between p-4">

// ✅ Con variables de entorno
<div className={cn("p-4", isActive && "bg-primary")}>
```

### CSS Modules

```typescript
// ✅ Import nombrado
import styles from "./Component.module.css";

// ✅ Uso con prefijo de clase
<div className={styles.container}>
```

---

## Comentarios

**NO agregar comentarios** a menos que:

1. Expliquen lógica de negocio compleja
2. Documenten "workarounds" o "hacks"
3. El usuario lo pida explícitamente

```typescript
// ✅ Aceptable: lógica compleja
// Calculate discount based on tenure (1 year = 5%)
const discount = basePrice * (tenureYears >= 1 ? 0.05 : 0);

// ❌ Evitar: comentarios obvios
// Increment counter
counter++;

// ❌ Evitar: código comentado
// const oldValue = value;
```
