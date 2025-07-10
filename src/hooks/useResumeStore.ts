import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResumeData, CVProfile, Template } from "../types/resume";

interface ResumeStore {
  profiles: CVProfile[];
  activeProfileId: string | null;
  activeTemplate: Template | null;

  // Getters
  getActiveProfile: () => CVProfile | null;
  getProfileById: (id: string) => CVProfile | null;

  // Actions
  createProfile: (name: string, template: Template, data: ResumeData) => string;
  updateProfile: (id: string, updates: Partial<CVProfile>) => void;
  deleteProfile: (id: string) => void;
  setActiveProfile: (id: string | null) => void;
  setActiveTemplate: (template: Template | null) => void;
  duplicateProfile: (id: string, newName: string) => string;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,
      activeTemplate: null,

      getActiveProfile: () => {
        const { profiles, activeProfileId } = get();
        return profiles.find((p) => p.id === activeProfileId) || null;
      },

      getProfileById: (id: string) => {
        const { profiles } = get();
        return profiles.find((p) => p.id === id) || null;
      },

      createProfile: (name: string, template: Template, data: ResumeData) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        const newProfile: CVProfile = {
          id,
          name,
          template,
          data,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          profiles: [...state.profiles, newProfile],
          activeProfileId: id,
        }));

        return id;
      },

      updateProfile: (id: string, updates: Partial<CVProfile>) => {
        set((state) => ({
          profiles: state.profiles.map((profile) =>
            profile.id === id
              ? { ...profile, ...updates, updatedAt: new Date().toISOString() }
              : profile
          ),
        }));
      },

      deleteProfile: (id: string) => {
        set((state) => ({
          profiles: state.profiles.filter((p) => p.id !== id),
          activeProfileId:
            state.activeProfileId === id ? null : state.activeProfileId,
        }));
      },

      setActiveProfile: (id: string | null) => {
        set({ activeProfileId: id });
      },

      setActiveTemplate: (template: Template | null) => {
        set({ activeTemplate: template });
      },

      duplicateProfile: (id: string, newName: string) => {
        const profile = get().getProfileById(id);
        if (!profile) return "";

        const newId = crypto.randomUUID();
        const now = new Date().toISOString();

        const duplicatedProfile: CVProfile = {
          ...profile,
          id: newId,
          name: newName,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          profiles: [...state.profiles, duplicatedProfile],
        }));

        return newId;
      },
    }),
    {
      name: "icv-resume-storage",
      partialize: (state) => ({
        profiles: state.profiles,
        activeProfileId: state.activeProfileId,
        activeTemplate: state.activeTemplate,
      }),
    }
  )
);
