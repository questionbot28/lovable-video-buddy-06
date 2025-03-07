
export interface AIModel {
  id: string;
  name: string;
  description: string;
  apiKey?: string;
  modelId: string;
}

export const availableModels: AIModel[] = [
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Generates human-like responses to a wide range of queries",
    apiKey: "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",
    modelId: "deepseek/deepseek-r1-zero:free"
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "A powerful and versatile AI model for conversational tasks",
    apiKey: "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",
    modelId: "qwen/qwq-32b"
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Process and analyze both text and images",
    apiKey: "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",
    modelId: "google/gemini-2.0-flash-thinking-exp:free"
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Flexible conversational model with detailed responses",
    apiKey: "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",
    modelId: "mistralai/mistral-7b-instruct:free"
  },
  {
    id: "rogue",
    name: "Rogue Rose",
    description: "Advanced model for creative conversational abilities",
    apiKey: "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",
    modelId: "sophosympatheia/rogue-rose-103b-v0.2:free"
  }
];
