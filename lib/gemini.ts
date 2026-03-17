import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined in environment variables.");
}

export const genAI = new GoogleGenAI({ apiKey });

export const getModel = (modelName: string = "gemini-3-flash-preview") => {
  return {
    generateContent: (params: any) => genAI.models.generateContent({ model: modelName, ...params }),
    generateContentStream: (params: any) => genAI.models.generateContentStream({ model: modelName, ...params }),
  };
};
