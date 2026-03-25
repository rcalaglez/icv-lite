# iCV-Lite - Agentes y Conocimiento

Este documento sirve como referencia rápida para OpenCode. Los agentes y skills detallados están en `.opencode/`.

## Proyecto

**iCV-Lite** - Gestor de CVs con integración de IA
- Stack: React 19, TypeScript, Vite, Tailwind, Zustand, Zod, Radix UI
- AI: Google Gemini + OpenAI Compatible (Ollama)

## Rama Actual

```
feature/opencode-setup
```

## Agentes Disponibles

### @sprint-manager
**Propósito**: Orquestador del flujo de trabajo completo
- Planificación → Desarrollo → Integración
- Coordina otros agentes

### @developer  
**Propósito**: Implementación de código
- Features, bugfixes, mejoras
- Sigue las convenciones del proyecto

### @documenter
**Propósito**: Documentación técnica
- SDDs, guías, arquitectura

### @reviewer
**Propósito**: Calidad de código
- Revisiones antes de merge

## Skills Disponibles

Carga skills con `@Skill{name="skill-name"}`:

| Skill | Descripción |
|-------|-------------|
| `@Skill{name="tech-stack"}` | Stack tecnológico |
| `@Skill{name="project-structure"}` | Estructura de directorios |
| `@Skill{name="conventions"}` | Convenciones de código |
| `@Skill{name="api-knowledge"}` | APIs y servicios |
| `@Skill{name="data-schemas"}` | Esquemas de datos |
| `@Skill{name="react-hooks"}` | Patrones de React |
| `@Skill{name="typescript"}` | TypeScript |
| `@Skill{name="zustand"}` | Gestión de estado |
| `@Skill{name="git-workflow"}` | Git y ramas |
| `@Skill{name="technical-writing"}` | Documentación técnica |
| `@Skill{name="frontend-development"}` | Desarrollo frontend |
| `@Skill{name="uiux-expert"}` | UI/UX |
| `@Skill{name="ai-integration"}` | Integración IA |

## Flujo de Trabajo

```
1. Usuario propone feature
2. @sprint-manager crea SDD
3. Usuario aprueba
4. @developer implementa
5. @reviewer revisa
6. Merge a main
```

## Comandos Útiles

```bash
npm run dev      # Desarrollo
npm run build   # Build producción
npm run lint    # ESLint
```

## Convenciones

- Commits: `feat(area): descripción`
- Ramas: `feature/[nombre]`, `bugfix/[nombre]`
- Docs: `.docs/sdd/sdd-[nombre].md`

## Información de Contacto

- Rama principal: `main`
- Rama de desarrollo: `feature/cv-evaluation`
