import type { ResumeData } from "@/types/resume";

export const defaultResumeAdvice: ResumeData = {
  basics: {
    name: "Tu Nombre Completo (Ej: Juan Pérez)",
    label: "Tu Título Profesional (Ej: Desarrollador Frontend, Diseñador UX)",
    email: "tu.email@ejemplo.com",
    phone: "+34 123 456 789",
    url: "https://tuportfolio.com",
    summary:
      "Un resumen conciso de tu experiencia, habilidades clave y objetivos profesionales. Destaca tus logros y lo que puedes aportar. (Ej: Desarrollador web con 5 años de experiencia en React y Node.js, buscando aplicar mis habilidades en un entorno dinámico para crear soluciones innovadoras.)",
    location: {
      city: "Tu Ciudad",
      countryCode: "ES",
      region: "Tu Región",
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "tu-linkedin",
        url: "https://linkedin.com/in/tu-perfil",
      },
      {
        network: "GitHub",
        username: "tu-github",
        url: "https://github.com/tu-perfil",
      },
    ],
  },
  work: [
    {
      name: "Nombre de la Empresa (Ej: Google, Startup X)",
      position: "Tu Puesto (Ej: Ingeniero de Software, Gerente de Proyecto)",
      startDate: "AAAA-MM-DD (Ej: 2020-01-01)",
      endDate: "AAAA-MM-DD o 'Presente' (Ej: 2023-12-31 o Presente)",
      summary:
        "Describe tus responsabilidades principales y, lo más importante, tus logros cuantificables. Usa verbos de acción. (Ej: Desarrollé y mantuve la interfaz de usuario de la aplicación principal, resultando en una mejora del 15% en la satisfacción del usuario.)",
      highlights: [
        "Logro 1: Cuantifica tus resultados (Ej: Reduje el tiempo de carga en un 20%)",
        "Logro 2: Describe el impacto de tus acciones (Ej: Lideré un equipo de 3 desarrolladores)",
      ],
    },
  ],
  education: [
    {
      institution: "Nombre de la Institución (Ej: Universidad de Madrid)",
      area: "Tu Área de Estudio (Ej: Ingeniería Informática, Diseño Gráfico)",
      studyType: "Tipo de Título (Ej: Grado, Máster, Bootcamp)",
      startDate: "AAAA-MM-DD (Ej: 2016-09-01)",
      endDate: "AAAA-MM-DD (Ej: 2020-06-30)",
      score: "Tu Calificación (Ej: 8.5/10, Cum Laude)",
      courses: ["Curso Relevante 1", "Curso Relevante 2"],
    },
  ],
  skills: [
    {
      name: "Habilidad Clave (Ej: JavaScript, Figma, Gestión de Proyectos)",
      level: "Nivel (Ej: Avanzado, Intermedio)",
      keywords: ["Tecnología/Herramienta 1", "Tecnología/Herramienta 2"],
    },
  ],
  languages: [
    {
      language: "Idioma (Ej: Español)",
      fluency: "Fluidez (Ej: Nativo, Bilingüe, Profesional)",
    },
  ],
  interests: [
    {
      name: "Interés (Ej: Fotografía, Voluntariado)",
      keywords: ["Palabra clave de interés 1", "Palabra clave de interés 2"],
    },
  ],
  certificates: [
    {
      name: "Nombre del Certificado (Ej: Certificación AWS)",
      date: "AAAA-MM-DD (Ej: 2023-03-15)",
      issuer: "Emisor (Ej: Amazon Web Services)",
      url: "https://url-del-certificado.com",
    },
  ],
  awards: [
    {
      title: "Título del Premio (Ej: Premio a la Innovación)",
      date: "AAAA-MM-DD (Ej: 2022-10-20)",
      awarder: "Otorgante (Ej: Conferencia Anual de Tecnología)",
      summary: "Breve descripción del premio y su significado.",
    },
  ],
  publications: [
    {
      name: "Título de la Publicación (Ej: Artículo sobre IA)",
      publisher: "Editor (Ej: Revista Científica)",
      releaseDate: "AAAA-MM-DD (Ej: 2021-07-01)",
      url: "https://url-de-la-publicacion.com",
      summary: "Resumen de la publicación.",
    },
  ],
  references: [
    {
      name: "Nombre del Contacto (Ej: Dr. Ana García)",
      reference: "Información de contacto o 'Disponible bajo petición'.",
    },
  ],
};
