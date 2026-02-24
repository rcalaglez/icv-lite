import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import type {
  AiClient,
  AiClientConfig,
  AiGenerateJsonParams,
  AiGenerateJsonWithFileParams,
} from "@/lib/ai/types";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function fileToGenerativePart(file: File) {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: base64EncodedData, mimeType: file.type },
  };
}

export const createGeminiClient = (config: AiClientConfig): AiClient => {
  const genAI = new GoogleGenerativeAI(config.apiKey);
  const model = genAI.getGenerativeModel({ model: config.model });

  const generationConfig = {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192,
    response_mime_type: "application/json",
  };

  const generateJson = async <T>({
    prompt,
    temperature,
    maxOutputTokens,
  }: AiGenerateJsonParams): Promise<T> => {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        ...generationConfig,
        ...(temperature !== undefined ? { temperature } : null),
        ...(maxOutputTokens !== undefined ? { maxOutputTokens } : null),
      },
      safetySettings,
    });

    const responseText = result.response.text();
    return JSON.parse(responseText) as T;
  };

  const generateJsonWithFile = async <T>({
    prompt,
    file,
    temperature,
    maxOutputTokens,
  }: AiGenerateJsonWithFileParams): Promise<T> => {
    const parts = [await fileToGenerativePart(file), { text: prompt }];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: {
        ...generationConfig,
        ...(temperature !== undefined ? { temperature } : null),
        ...(maxOutputTokens !== undefined ? { maxOutputTokens } : null),
      },
      safetySettings,
    });

    const responseText = result.response.text();
    return JSON.parse(responseText) as T;
  };

  return {
    provider: "gemini",
    model: config.model,
    capabilities: ["json", "multimodal"],
    generateJson,
    generateJsonWithFile,
  };
};
