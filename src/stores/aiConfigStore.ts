import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AiProvider } from "@/lib/ai/types";

export type AiUserConfig = {
  provider: AiProvider | null;
  apiKey: string;
  model: string;
  baseUrl: string;
};

type AiConfigState = {
  config: AiUserConfig;
  setProvider: (provider: AiProvider) => void;
  setApiKey: (apiKey: string) => void;
  setModel: (model: string) => void;
  setBaseUrl: (baseUrl: string) => void;
  reset: () => void;
};

const defaultConfig: AiUserConfig = {
  provider: null,
  apiKey: "",
  model: "",
  baseUrl: "https://api.openai.com/v1",
};

export const useAiConfigStore = create<AiConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setProvider: (provider) =>
        set((state) => ({
          config: {
            ...state.config,
            provider,
            // Defaults razonables por proveedor
            model:
              state.config.model ||
              (provider === "gemini" ? "gemini-2.5-flash-lite" : "gpt-4o-mini"),
          },
        })),
      setApiKey: (apiKey) =>
        set((state) => ({ config: { ...state.config, apiKey } })),
      setModel: (model) => set((state) => ({ config: { ...state.config, model } })),
      setBaseUrl: (baseUrl) =>
        set((state) => ({ config: { ...state.config, baseUrl } })),
      reset: () => set({ config: defaultConfig }),
    }),
    {
      name: "icv.ai.config",
      partialize: (state) => ({ config: state.config }),
    }
  )
);

export const isAiConfigured = (config: AiUserConfig) => {
  if (!config.provider) return false;
  if (!config.apiKey || config.apiKey.trim().length === 0) return false;
  if (!config.model || config.model.trim().length === 0) return false;
  if (config.provider === "openai_compatible") {
    if (!config.baseUrl || config.baseUrl.trim().length === 0) return false;
  }
  return true;
};
