
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { availableTemplates } from "@/templates/templates";
import type { CVProfile, ResumeData } from "../types/resume";
import { sampleResumes } from "@/data/resumeExample";

interface ResumeStore {
  profiles: CVProfile[];
  getProfileById: (id: string) => CVProfile | undefined;
  updateProfileData: (id: string, data: ResumeData) => void;
  createProfile: () => string; // Devuelve el ID del nuevo perfil
  deleteProfile: (id: string) => void;
}

const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      profiles: sampleResumes, // Inicializamos directamente con los datos de ejemplo

      getProfileById: (id: string) => {
        return get().profiles.find((p) => p.id === id);
      },

      updateProfileData: (id: string, data: ResumeData) => {
        set((state) => ({
          profiles: state.profiles.map((profile) =>
            profile.id === id
              ? { ...profile, data, updatedAt: new Date().toISOString() }
              : profile
          ),
        }));
      },

      createProfile: () => {
        const newId = crypto.randomUUID();
        const now = new Date().toISOString();
        const defaultTemplate = availableTemplates[0];

        const newProfile: CVProfile = {
          id: newId,
          name: "Nuevo Perfil",
          template: defaultTemplate,
          createdAt: now,
          updatedAt: now,
          data: {
            basics: {
              name: "Tu Nombre",
              label: "Tu Profesión",
            },
            work: [],
            education: [],
            skills: [],
            languages: [],
            interests: [],
            certificates: [],
          },
        };

        set((state) => ({
          profiles: [...state.profiles, newProfile],
        }));

        return newId;
      },

      deleteProfile: (id: string) => {
        set((state) => ({
          profiles: state.profiles.filter((profile) => profile.id !== id),
        }));
      },
    }),
    {
      name: "icv-resume-storage",
      
    }
  )
);

export default useResumeStore;
