# Estudio de Implementación: Módulo de Evaluación de CV (v2)

**Autor:** Gemini
**Fecha:** 2024-07-21
**Versión:** 2.0

## 1. Resumen Ejecutivo

Este documento detalla la estrategia para implementar un nuevo módulo de **Evaluación de CV** como una sección principal de la aplicación. Esta nueva versión del plan responde a un flujo de usuario más estructurado y guiado, mejorando la claridad y la experiencia de usuario.

El módulo permitirá a los usuarios analizar sus perfiles de CV a través de un proceso de 3 pasos:
1.  **Seleccionar el perfil de CV** a evaluar de su lista existente.
2.  **(Opcional) Añadir una oferta de trabajo** para un análisis de adecuación.
3.  **Recibir y visualizar un informe de evaluación detallado (`CVScore`)**, generado por IA (Gemini), tras una pantalla de carga amigable.

El diseño se integrará de forma nativa en la aplicación, utilizando los componentes `shadcn/ui` existentes y siguiendo la identidad visual establecida para garantizar la cohesión.

## 2. Lógica y Arquitectura del Módulo

### 2.1. Ubicación del Nuevo Módulo

La funcionalidad se encapsulará en su propio directorio, como se propuso anteriormente, para una máxima cohesión y separación de responsabilidades.

**Directorio principal:** `src/features/evaluation`

La estructura de ficheros se adaptará al nuevo flujo por pasos:

```
src/
└── features/
    └── evaluation/
        ├── components/
        │   ├── Step1_SelectProfile.tsx   // UI para elegir un perfil de CV
        │   ├── Step2_JobOffer.tsx        // UI para introducir la oferta
        │   └── Step3_EvaluationReport.tsx  // UI para visualizar el CVScore
        ├── hooks/
        │   └── useCvEvaluation.ts      // Hook para manejar el estado y la lógica de la API
        ├── services/
        │   └── evaluationService.ts    // Lógica para llamar a la API de Gemini
        └── EvaluationView.tsx          // Componente principal que gestiona el flujo de pasos
```

### 2.2. Flujo de Datos y Lógica

El componente `EvaluationView.tsx` actuará como un orquestador o máquina de estados para el flujo.

1.  **Estado Inicial:** `EvaluationView` renderiza `Step1_SelectProfile.tsx`.
2.  **Paso 1: Selección de CV (`Step1_SelectProfile.tsx`):**
    *   Este componente leerá la lista de perfiles disponibles del `useResumeStore`.
    *   Mostrará los perfiles en una lista o cuadrícula de tarjetas (`Card`).
    *   Al seleccionar un perfil, se notificará al padre (`EvaluationView`), que almacenará el `ResumeData` seleccionado y avanzará al paso 2.
3.  **Paso 2: Oferta de Trabajo (`Step2_JobOffer.tsx`):**
    *   `EvaluationView` renderiza `Step2_JobOffer.tsx`.
    *   Este componente presentará un `Textarea` para la oferta y dos botones de acción:
        *   **"Evaluar sin oferta"**: Llama a la función de evaluación sin texto de oferta.
        *   **"Evaluar con oferta"**: Llama a la función de evaluación con el texto de la oferta.
    *   Ambos botones activarán la función de evaluación en el hook `useCvEvaluation` y harán que `EvaluationView` avance al estado de "cargando".
4.  **Paso 3: Carga y Visualización del Resultado:**
    *   **Estado de Carga:** `EvaluationView` mostrará una interfaz de carga amigable mientras el hook `useCvEvaluation` está en estado `isLoading`.
    *   **Visualización:** Una vez que la llamada a la API finaliza y el `cvScore` está disponible, `EvaluationView` renderiza `Step3_EvaluationReport.tsx`, pasándole los datos del informe.

## 3. Diseño de Interfaz y Experiencia de Usuario (UI/UX)

La interfaz será minimalista, guiada y totalmente integrada con el resto de la aplicación.

### 3.1. Punto de Entrada (Menú Lateral)

*   **Navegación:** Se añadirá un nuevo enlace en el menú de navegación principal (`src/components/layout/MainLayout.tsx`).
*   **Elemento:** El enlace tendrá un icono apropiado (ej. `FileCheck`, `Sparkles`) y el texto **"Evaluar CV"**. Esto lo establece como una funcionalidad principal de la aplicación.

### 3.2. Paso 1: Selección de Perfil (`Step1_SelectProfile.tsx`)

*   **Layout:** Un título claro como "Paso 1: Elige el perfil que quieres evaluar".
*   **Visualización:** Una cuadrícula (`grid`) de componentes `Card`. Cada `Card` representa un perfil de CV.
*   **Contenido de la Tarjeta:** Mostrará el nombre del perfil (`resume.basics.name`) y quizás su titular (`resume.basics.label`).
*   **Interacción:** Al hacer clic en una `Card`, esta quedará visualmente seleccionada (ej. con un borde de color primario o un icono de check). Un botón "Siguiente" se activará para pasar al paso 2.

### 3.3. Paso 2: Oferta de Trabajo (`Step2_JobOffer.tsx`)

*   **Layout:** Título "Paso 2 (Opcional): Añade una oferta de trabajo".
*   **Componentes:**
    *   Un `Label` claro: "Pega aquí la descripción completa de la oferta".
    *   Un `Textarea` de gran tamaño con un `placeholder` descriptivo.
    *   Un `Separator` para dividir visualmente las acciones.
    *   Dos botones `Button` al final:
        1.  `variant="secondary"`: **"Omitir y Evaluar Perfil"**.
        2.  `variant="default"`: **"Evaluar con Oferta"** (se activa solo si hay texto en el `Textarea`).

### 3.4. Estado de Carga

*   **Diseño:** En lugar de un simple spinner, se mostrará una pantalla completa y atractiva.
*   **Contenido:**
    *   Un icono animado relacionado con la IA o el análisis.
    *   Un texto principal que cambia dinámicamente para mantener al usuario informado y entretenido: `"Analizando tu experiencia..."`, `"Contrastando tus habilidades..."`, `"Generando tu informe personalizado..."`.
    *   Esto mejora la percepción del tiempo de espera.

### 3.5. Paso 3: Visualización del Informe (`Step3_EvaluationReport.tsx`)

*   El diseño propuesto en la v1 de este documento sigue siendo idóneo y se reutilizará aquí.
*   **Layout General:** Una vista limpia con el informe como elemento central.
*   **Header:** Puntuación `overallScore` muy visible, junto al `summary`.
*   **Pestañas (`Tabs`):**
    *   **"Informe Detallado"**: Con `Card` para fortalezas/debilidades globales y un `Accordion` para el desglose por secciones.
    *   **"Ajuste con la Oferta"**: Visible solo si `jobMatch` existe, con `Card` para el análisis de keywords y alineación de experiencia/habilidades.
*   **Acciones Post-Evaluación:** Incluir un botón "Evaluar otro CV" para reiniciar el flujo.

## 4. Plan de Implementación (Pasos Sugeridos)

1.  **Añadir el enlace "Evaluar CV"** a la navegación principal en `MainLayout.tsx` y configurar su ruta.
2.  **Crear el componente orquestador `EvaluationView.tsx`** para gestionar los pasos del flujo.
3.  **Desarrollar `Step1_SelectProfile.tsx`**, conectándolo al `useResumeStore`.
4.  **Desarrollar `Step2_JobOffer.tsx`**.
5.  **Implementar `evaluationService.ts`** y el hook **`useCvEvaluation.ts`**.
6.  **Diseñar y construir el componente de estado de carga**.
7.  **Desarrollar `Step3_EvaluationReport.tsx`** para visualizar los resultados.
8.  **Integrar todo el flujo de principio a fin**, asegurando que el estado se gestiona correctamente.
9.  **Realizar pruebas y refinar la UX**.