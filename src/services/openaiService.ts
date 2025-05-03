import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI("AIzaSyBE76zuIMUjHXCHYetiOWCA1hirVIBprb0");
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async getAIResponse(prompt: string): Promise<string> {
    try {
      const contextPrompt = "As a maternal health specialist, provide evidence-based information for the following question: " + prompt;
      const result = await this.model.generateContent(contextPrompt);
      const response = await result.response;
      return response.text() || "I apologize, but I couldn't generate a response.";
    } catch (error) {
      console.error('Gemini AI Error:', error);
      throw new Error('Failed to get AI response');
    }
  }
}

export const openaiService = new GeminiService();
