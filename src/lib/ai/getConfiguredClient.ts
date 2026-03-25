import { createAiClient } from "@/lib/ai/aiClientFactory";
import { AiNotConfiguredError } from "@/lib/ai/errors";
import { useAiConfigStore, isAiConfigured } from "@/stores/aiConfigStore";
import type { AiClient } from "@/lib/ai/types";

export const getConfiguredAiClient = (): AiClient => {
  const { config } = useAiConfigStore.getState();
  if (!isAiConfigured(config) || !config.provider) {
    throw new AiNotConfiguredError(
      "Configura proveedor, modelo y API key para usar funciones de IA."
    );
  }

  return createAiClient({
    provider: config.provider,
    apiKey: config.apiKey,
    model: config.model,
    baseUrl: config.provider === "openai_compatible" ? config.baseUrl : undefined,
  });
};
