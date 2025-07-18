import type { CVProfile } from "../types/resume";
import { availableTemplates } from "@/templates/templates";

const defaultTemplate = availableTemplates[0];
const now = new Date().toISOString();

export const sampleResumes: CVProfile[] = [
  {
    id: "1",
    name: "Perfil de María García",
    template: defaultTemplate,
    createdAt: now,
    updatedAt: now,
    data: {
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
          courses: ["Algoritmos y Estructuras de Datos"],
        },
      ],
      skills: [
        {
          name: "Frontend",
          level: "Avanzado",
          keywords: ["React", "TypeScript", "Next.js"],
        },
      ],
      languages: [{ language: "Español", fluency: "Nativo" }],
      certificates: [
        {
          name: "AWS Certified Solutions Architect",
          date: "2023-05-15",
          issuer: "Amazon Web Services",
          url: "https://aws.amazon.com/certification/",
        },
      ],
      interests: [{ name: "Tecnología", keywords: ["Open Source"] }],
    },
  },
  {
    id: "2",
    name: "Portafolio de Alexandre Dubois",
    template: availableTemplates[1] || defaultTemplate,
    createdAt: now,
    updatedAt: now,
    data: {
      basics: {
        name: "Alexandre Dubois",
        label: "Diseñador UX/UI Senior",
        image: "https://via.placeholder.com/150/0000FF/808080?Text=A",
        email: "alex.dubois@email.fr",
        phone: "+33 6 12 34 56 78",
        url: "https://alexandredubois.design",
        summary:
          "Diseñador UX/UI con 8 años de experiencia en la creación de interfaces intuitivas y atractivas para aplicaciones móviles y web. Enfocado en la investigación de usuario y el diseño centrado en las personas.",
        location: {
          address: "123 Rue de la République",
          postalCode: "75001",
          city: "París",
          countryCode: "FR",
          region: "Île-de-France",
        },
        profiles: [
          {
            network: "LinkedIn",
            username: "alexandredubois",
            url: "https://linkedin.com/in/alexandredubois",
          },
          {
            network: "Dribbble",
            username: "alexdubois",
            url: "https://dribbble.com/alexdubois",
          },
        ],
      },
      work: [
        {
          name: "Creative Agency",
          position: "Lead UX/UI Designer",
          url: "https://creativeagency.fr",
          startDate: "2021-01-01",
          summary:
            "Lideré el equipo de diseño en proyectos para clientes internacionales, desde la conceptualización hasta la entrega final.",
          highlights: [
            "Rediseñé la aplicación móvil de un banco, mejorando la satisfacción del usuario en un 25%.",
            "Creé un sistema de diseño escalable que aceleró el proceso de desarrollo en un 40%.",
          ],
        },
      ],
      education: [
        {
          institution: "Gobelins, l'école de l'image",
          url: "https://www.gobelins.fr",
          area: "Diseño Interactivo",
          studyType: "Máster",
          startDate: "2014-09-01",
          endDate: "2016-06-30",
          score: "Mención de Honor",
          courses: ["Diseño de Experiencia de Usuario", "Diseño de Interfaces"],
        },
      ],
      skills: [
        {
          name: "Diseño UX/UI",
          level: "Experto",
          keywords: ["Figma", "Sketch", "Adobe XD", "Investigación de Usuario"],
        },
      ],
      languages: [
        { language: "Francés", fluency: "Nativo" },
        { language: "Inglés", fluency: "Profesional" },
      ],
      certificates: [],
      interests: [{ name: "Arte y Cultura", keywords: ["Museos", "Cine"] }],
    },
  },
];
