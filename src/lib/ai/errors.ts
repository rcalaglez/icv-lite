export class AiNotConfiguredError extends Error {
  name = "AiNotConfiguredError";
  constructor(message = "IA no configurada") {
    super(message);
  }
}

export class AiProviderError extends Error {
  name = "AiProviderError";
  constructor(message: string) {
    super(message);
  }
}
