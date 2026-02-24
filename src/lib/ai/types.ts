export type AiProvider = "gemini" | "openai_compatible";

export type JsonSchemaHint = {
  typeName: string;
  typescript: string;
};

export type AiModelCapability = "json" | "multimodal";

export type AiClientConfig = {
  provider: AiProvider;
  apiKey: string;
  model: string;
  baseUrl?: string;
};

export type AiGenerateJsonParams = {
  prompt: string;
  schemaHint?: JsonSchemaHint;
  temperature?: number;
  maxOutputTokens?: number;
};

export type AiGenerateJsonWithFileParams = AiGenerateJsonParams & {
  file: File;
};

export interface AiClient {
  provider: AiProvider;
  model: string;
  capabilities: AiModelCapability[];

  generateJson<T>(params: AiGenerateJsonParams): Promise<T>;
  generateJsonWithFile?<T>(params: AiGenerateJsonWithFileParams): Promise<T>;
}
