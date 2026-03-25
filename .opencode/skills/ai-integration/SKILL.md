---
name: ai-integration
description: Integración de IA en aplicaciones: prompts, extracción de datos, validación, patrones de API
---

# AI Integration

## Visión General

iCV-Lite usa IA para:
1. **Extracción**: Parsear CVs de PDF/imágenes
2. **Evaluación**: Score de CVs y análisis ATS

---

## Clientes AI

### Gemini Client

**Ubicación**: `src/lib/ai/clients/geminiClient.ts`

```typescript
import { createGeminiClient } from "@/lib/ai/clients/geminiClient";

const client = createGeminiClient({
  apiKey: "gemini-api-key",
  model: "gemini-2.0-flash",
});
```

### OpenAI Compatible Client

**Ubicación**: `src/lib/ai/clients/openAiCompatibleClient.ts`

```typescript
import { createOpenAiCompatibleClient } from "@/lib/ai/clients/openAiCompatibleClient";

const client = createOpenAiCompatibleClient({
  baseUrl: "http://localhost:11434/v1",  // Ollama
  apiKey: "ollama",
  model: "llama3",
});
```

---

## API Común

### Interfaz AiClient

```typescript
interface AiClient {
  // Generación de JSON
  generateJson<T>(params: { prompt: string }): Promise<T>;
  
  // Generación de JSON con archivo
  generateJsonWithFile<T>(params: { 
    prompt: string; 
    file: File; 
  }): Promise<T>;
  
  // Capabilities
  capabilities: {
    json: boolean;
    multimodal: boolean;
  };
}
```

### Uso

```typescript
const client = getConfiguredAiClient();

const result = await client.generateJson<ResumeData>({
  prompt: "Extract resume data from...",
});
```

---

## Prompts de Extracción

### Estructura del Prompt

```typescript
const prompt = `
Analiza el CV y extrae la información en formato JSON.

Interface requerida:
interface ResumeData {
  basics: {
    name: string;
    // ...
  };
  work?: Work[];
  // ...
}

Tu respuesta debe ser SOLO el objeto JSON, sin markdown ni texto adicional.

CV:
${documentContent}
`;
```

### Mejores Prácticas

1. **Schema claro**: Definir interfaces TypeScript exactas
2. **Ejemplos**: Incluir ejemplos cuando sea necesario
3. **Instrucciones claras**: Exactamente lo que se espera
4. **Errores**: Definir qué hacer si no hay datos suficientes

---

## Extracción de CV

### analyzeCVWithAI

**Ubicación**: `src/lib/ai/analyzeCvWithAi.ts`

```typescript
import { analyzeCVWithAI } from "@/lib/ai/analyzeCvWithAi";

const resumeData = await analyzeCVWithAI(client, pdfFile);
```

**Proceso**:
1. Validar que el cliente soporta multimodal
2. Construir prompt con schema
3. Enviar archivo + prompt
4. Validar respuesta con Zod
5. Retornar ResumeData

### Validación de Respuesta

```typescript
import { ResumeDataSchema } from "@/lib/validation/resumeSchema";

const validatedData = ResumeDataSchema.parse(aiResponse);
```

---

## Evaluación de CV

### evaluateCvOnly

```typescript
import { evaluateCvOnly } from "@/features/evaluation/services/evaluationService";

const cvScore = await evaluateCvOnly(resumeData);
// {
//   overallScore: 85,
//   summary: "...",
//   sections: { ... },
//   strengths: [...],
//   areasForImprovement: [...]
// }
```

### evaluateAts

```typescript
import { evaluateAts } from "@/features/evaluation/services/evaluationService";

const atsResult = await evaluateAts(resumeData, jobDescription);
// {
//   alignmentScore: 72,
//   atsReadinessScore: 88,
//   suggestions: [...],
//   keywordAnalysis: { ... }
// }
```

---

## Manejo de Errores

### Tipos de Error

```typescript
// Error de proveedor
throw new AiProviderError("El modelo no soporta archivos PDF");

// Error de parsing
throw new Error("La respuesta no es JSON válido");

// Error de validación
// ZodError con detalles de validación

// Error de API
// Error de red, timeout, etc.
```

### Manejo en Componente

```typescript
try {
  const data = await analyzeCVWithAI(client, file);
} catch (error) {
  if (error instanceof AiProviderError) {
    toast.error("El modelo seleccionado no soporta PDF");
  } else if (error instanceof Error) {
    toast.error(error.message);
  }
}
```

---

## Configuración de Usuario

### AI Config Store

```typescript
interface AiConfig {
  provider: "gemini" | "openai_compatible";
  apiKey: string;
  model: string;
}

const { config, setConfig } = useAiConfigStore();

// Verificar si está configurado
import { isAiConfigured } from "@/stores/aiConfigStore";

if (!isAiConfigured(config)) {
  // Mostrar configuración
}
```

---

## Rate Limiting y Costes

### Consideraciones

1. **Rate limits**: Los modelos tienen límites
2. **Tokens**: Contar tokens para estimar costes
3. **Caching**: Considerar caché para requests repetidos
4. **Timeouts**: Manejar timeouts apropiadamente

---

## Seguridad

### No Exponer Keys

```typescript
// ✅ En servidor o client-side con restricciones
const client = createGeminiClient({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

// ❌ Nunca en código
const client = createGeminiClient({
  apiKey: "sk-actual-key-here"  // NUNCA
});
```

### Validación de Input

```typescript
// ✅ Siempre validar antes de enviar
const validatedFile = validateFile(file);
if (!validatedFile.valid) {
  throw new Error("Archivo inválido");
}
```

---

## Testing

### Mock de Cliente

```typescript
const mockClient = {
  generateJson: vi.fn().mockResolvedValue({
    basics: { name: "Test User" },
  }),
  generateJsonWithFile: vi.fn(),
  capabilities: { json: true, multimodal: true },
};
```
