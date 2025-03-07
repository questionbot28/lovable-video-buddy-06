
export interface AIModel {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  modelId: string;
  personality?: string;
}

export const availableModels: AIModel[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Advanced model with enhanced OCR for image analysis",
    apiKey: "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",
    modelId: "google/gemini-pro",
    personality: "I am an AI assistant from Chota GPT, created by Rohanpreet Singh Pathania. As a Gemini model, I specialize in image analysis and text processing to provide helpful responses."
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Flexible conversational model with detailed responses",
    apiKey: "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",
    modelId: "mistralai/mistral-7b-instruct",
    personality: "I am an AI assistant from Chota GPT, created by Rohanpreet Singh Pathania. As a Mistral model, I focus on providing detailed and conversational responses to your questions."
  },
  {
    id: "rogue",
    name: "Rogue Rose",
    description: "Advanced model for creative conversational abilities",
    apiKey: "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",
    modelId: "anthropic/claude-3-haiku",
    personality: "I am an AI assistant from Chota GPT, created by Rohanpreet Singh Pathania. As Claude, I excel at creative and nuanced conversations while maintaining helpfulness and accuracy."
  }
];
