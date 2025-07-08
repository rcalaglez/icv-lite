import type { ResumeData } from "../types/resume";

export const sampleResumeData: ResumeData = {
  basics: {
    name: "María García López",
    label: "Desarrolladora Full Stack",
    image: "https://via.placeholder.com/150",
    email: "maria.garcia@email.com",
    phone: "+34 600 123 456",
    url: "https://mariagarcia.dev",
    summary:
      "Desarrolladora Full Stack con más de 5 años de experiencia en tecnologías web modernas. Especializada en React, Node.js y arquitecturas escalables. Apasionada por crear soluciones innovadoras y trabajar en equipos colaborativos.",
    location: {
      address: "Calle Mayor 123",
      postalCode: "28001",
      city: "Madrid",
      countryCode: "ES",
      region: "Comunidad de Madrid",
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "mariagarcia",
        url: "https://linkedin.com/in/mariagarcia",
      },
      {
        network: "GitHub",
        username: "mariagarcia",
        url: "https://github.com/mariagarcia",
      },
      {
        network: "Twitter",
        username: "mariagarcia_dev",
        url: "https://twitter.com/mariagarcia_dev",
      },
    ],
  },
  work: [
    {
      name: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      url: "https://techcorp.com",
      startDate: "2022-03-01",
      summary:
        "Liderazgo técnico en el desarrollo de aplicaciones web escalables para clientes enterprise.",
      highlights: [
        "Desarrollé una plataforma de e-commerce que incrementó las ventas en un 40%",
        "Implementé arquitectura de microservicios reduciendo el tiempo de respuesta en 60%",
        "Mentoricé a 3 desarrolladores junior en tecnologías React y Node.js",
      ],
    },
    {
      name: "StartupXYZ",
      position: "Full Stack Developer",
      url: "https://startupxyz.com",
      startDate: "2020-01-15",
      endDate: "2022-02-28",
      summary:
        "Desarrollo de MVP y escalado de producto en startup de tecnología financiera.",
      highlights: [
        "Construí desde cero una aplicación de gestión financiera con React y Express",
        "Integré APIs de terceros para procesamiento de pagos y análisis de datos",
        "Optimicé la base de datos mejorando el rendimiento en un 50%",
      ],
    },
    {
      name: "WebAgency Pro",
      position: "Frontend Developer",
      url: "https://webagency.com",
      startDate: "2019-06-01",
      endDate: "2019-12-31",
      summary:
        "Desarrollo de sitios web corporativos y aplicaciones web para diversos clientes.",
      highlights: [
        "Desarrollé más de 15 sitios web responsivos con HTML5, CSS3 y JavaScript",
        "Implementé sistemas de gestión de contenido personalizados",
        "Colaboré estrechamente con diseñadores UX/UI para crear experiencias excepcionales",
      ],
    },
  ],
  education: [
    {
      institution: "Universidad Politécnica de Madrid",
      url: "https://upm.es",
      area: "Ingeniería Informática",
      studyType: "Grado",
      startDate: "2015-09-01",
      endDate: "2019-06-30",
      score: "8.2/10",
      courses: [
        "Algoritmos y Estructuras de Datos",
        "Desarrollo de Software",
        "Bases de Datos",
        "Redes de Computadores",
      ],
    },
  ],
  skills: [
    {
      name: "Frontend",
      level: "Avanzado",
      keywords: [
        "React",
        "TypeScript",
        "Next.js",
        "Vue.js",
        "HTML5",
        "CSS3",
        "Sass",
      ],
    },
    {
      name: "Backend",
      level: "Avanzado",
      keywords: [
        "Node.js",
        "Express",
        "Python",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      name: "DevOps",
      level: "Intermedio",
      keywords: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Nginx"],
    },
    {
      name: "Herramientas",
      level: "Avanzado",
      keywords: ["Git", "VS Code", "Figma", "Postman", "Jest", "Cypress"],
    },
  ],
  languages: [
    {
      language: "Español",
      fluency: "Nativo",
    },
    {
      language: "Inglés",
      fluency: "Profesional",
    },
    {
      language: "Francés",
      fluency: "Básico",
    },
  ],
  certificates: [
    {
      name: "AWS Certified Solutions Architect",
      date: "2023-05-15",
      issuer: "Amazon Web Services",
      url: "https://aws.amazon.com/certification/",
    },
    {
      name: "React Professional Certificate",
      date: "2022-11-20",
      issuer: "Meta",
      url: "https://www.coursera.org/professional-certificates/meta-react-native",
    },
  ],
  interests: [
    {
      name: "Tecnología",
      keywords: ["Open Source", "Machine Learning", "Blockchain"],
    },
    {
      name: "Deportes",
      keywords: ["Running", "Yoga", "Escalada"],
    },
    {
      name: "Creatividad",
      keywords: ["Fotografía", "Diseño", "Escritura"],
    },
  ],
};
