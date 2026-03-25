import type { AiClient, AiClientConfig } from "@/lib/ai/types";
import { createGeminiClient } from "@/lib/ai/clients/geminiClient";
import { createOpenAiCompatibleClient } from "@/lib/ai/clients/openAiCompatibleClient";

export const createAiClient = (config: AiClientConfig): AiClient => {
  if (config.provider === "gemini") {
    return createGeminiClient(config);
  }

  return createOpenAiCompatibleClient(config);
};
