
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CVProfile, ResumeData } from "../types/resume";
import { sampleResumes } from "@/data/resumeExample";

interface ResumeStore {
  profiles: CVProfile[];
  getProfileById: (id: string) => CVProfile | undefined;
  updateProfileData: (id: string, data: ResumeData) => void;
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
    }),
    {
      name: "icv-resume-storage",
      // La inicialización se maneja arriba, pero mantenemos la persistencia
      onRehydrateStorage: (state) => {
        // Opcional: Lógica para migrar o limpiar datos viejos si es necesario
        console.log("Hydrating from storage...");
        if (state && state.profiles.length === 0) {
            state.profiles = sampleResumes;
        }
      },
    }
  )
);

export default useResumeStore;
