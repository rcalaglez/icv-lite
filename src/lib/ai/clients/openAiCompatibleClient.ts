import type {
  AiClient,
  AiClientConfig,
  AiGenerateJsonParams,
} from "@/lib/ai/types";
import { AiProviderError } from "@/lib/ai/errors";

type ChatCompletionResponse = {
  choices: Array<{
    message: { role: string; content: string | null };
  }>;
};

export const createOpenAiCompatibleClient = (config: AiClientConfig): AiClient => {
  const baseUrl = config.baseUrl?.replace(/\/$/, "") || "https://api.openai.com/v1";

  const generateJson = async <T>({
    prompt,
    temperature,
  }: AiGenerateJsonParams): Promise<T> => {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        temperature: temperature ?? 0.4,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new AiProviderError(
        `Error del proveedor (HTTP ${res.status}). ${body || ""}`.trim()
      );
    }

    const data = (await res.json()) as ChatCompletionResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new AiProviderError("Respuesta vacía del proveedor.");
    }
    return JSON.parse(content) as T;
  };

  return {
    provider: "openai_compatible",
    model: config.model,
    capabilities: ["json"],
    generateJson,
  };
};
