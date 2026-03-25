---
name: tech-stack
description: Stack tecnológico completo del proyecto iCV-Lite - React, TypeScript, Vite, Tailwind, Zustand, Zod, Radix UI
---

# Tech Stack iCV-Lite

## Visión General

iCV-Lite es una aplicación web para gestión de CVs con integración de IA. Construida con tecnologías modernas de React.

## Dependencias Principales

### Core

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | ^19.1.0 | Framework UI |
| react-dom | ^19.1.0 | DOM rendering |
| typescript | ~5.8.3 | Tipado estático |
| vite | ^7.0.3 | Build tool |

### Estado y Datos

| Paquete | Versión | Uso |
|---------|---------|-----|
| zustand | ^5.0.6 | Gestión de estado global |
| zod | ^3.25.76 | Validación de datos |
| react-hook-form | ^7.60.0 | Gestión de formularios |

### UI y Estilos

| Paquete | Versión | Uso |
|---------|---------|-----|
| tailwindcss | ^4.1.11 | Estilos utility-first |
| @tailwindcss/vite | ^4.1.11 | Plugin Tailwind para Vite |
| class-variance-authority | ^0.7.1 | Variantes de componentes |
| tailwind-merge | ^3.3.1 | Utility para merge de clases |
| clsx | ^2.1.1 | Constructor de clases condicional |

### Componentes UI (Radix)

| Paquete | Versión | Uso |
|---------|---------|-----|
| @radix-ui/react-dialog | ^1.1.15 | Modal/dialog |
| @radix-ui/react-dropdown-menu | ^2.1.15 | Menú dropdown |
| @radix-ui/react-select | ^2.2.5 | Selector |
| @radix-ui/react-tabs | ^1.1.12 | Tabs |
| @radix-ui/react-accordion | ^1.2.11 | Acordeón |
| @radix-ui/react-alert-dialog | ^1.1.14 | Dialog de confirmación |
| @radix-ui/react-label | ^2.1.7 | Labels |
| @radix-ui/react-separator | ^1.1.7 | Separador |
| @radix-ui/react-slot | ^1.2.3 | Slot para componentes |

### Icons y Animaciones

| Paquete | Versión | Uso |
|---------|---------|-----|
| lucide-react | ^0.525.0 | Iconos |
| framer-motion | ^12.23.6 | Animaciones |

### AI y ML

| Paquete | Versión | Uso |
|---------|---------|-----|
| @google/generative-ai | ^0.24.1 | Google Gemini API |

### Utilities

| Paquete | Versión | Uso |
|---------|---------|-----|
| react-router-dom | ^7.6.3 | Routing |
| sonner | ^2.0.6 | Notificaciones toast |
| recharts | 2.15.4 | Gráficos |
| uuid | ^11.1.0 | Generación de IDs |
| next-themes | ^0.4.6 | Theming |

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor Vite

# Build
npm run build       # Build producción (TypeScript + Vite)
npm run preview     # Preview del build

# Calidad
npm run lint        # ESLint
```

## Herramientas de Desarrollo

| Herramienta | Uso |
|-------------|-----|
| ESLint | Linting de código |
| TypeScript | Type checking |
| Vite | Bundling y HMR |
| Tailwind CSS | Estilos |

## Notas

- El proyecto usa **Tailwind CSS v4** (no v3)
- **React 19** con Server Components disabled (modo cliente)
- **Zustand** para estado global (no Redux)
- **Zod** para validación runtime de datos
- **Radix UI** como base para componentes accesibles
