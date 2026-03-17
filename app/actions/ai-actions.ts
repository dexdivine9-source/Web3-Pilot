'use server';

import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({ apiKey });

export async function auditTokenomics(input: string) {
  const model = "gemini-1.5-flash";
  
  const systemInstruction = `
    You are a Senior Web3 Tokenomics Auditor. 
    Analyze the provided project data (vesting, supply, utility, etc.) for risk.
    Detect 5 specific red flags: Concentration, Vesting, Utility, Compliance, Liquidity.
    Return a JSON object with:
    - score: number (1-10, where 1 is low risk and 10 is high risk)
    - flags: array of objects { type: string, status: 'red' | 'green', description: string }
    - summary: string (brief overview)
    
    CRITICAL: Do not provide financial advice. This is a technical audit only.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: input,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            flags: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ['red', 'green'] },
                  description: { type: Type.STRING }
                },
                required: ['type', 'status', 'description']
              }
            },
            summary: { type: Type.STRING }
          },
          required: ['score', 'flags', 'summary']
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Audit Error:", error);
    throw new Error("Failed to audit tokenomics");
  }
}

export async function generateWeb3Content(topic: string, projectContext: string) {
  const model = "gemini-1.5-flash";
  
  const systemInstruction = `
    You are a Web3 Social Media Strategist.
    Convert project milestones into viral X threads and Discord announcements.
    Tone: Native, high-energy, non-financial advice.
    Return a JSON object with:
    - xThread: array of strings (each string is a tweet)
    - discordPost: string (formatted for Discord)
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Topic: ${topic}\nContext: ${projectContext}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            xThread: { type: Type.ARRAY, items: { type: Type.STRING } },
            discordPost: { type: Type.STRING }
          },
          required: ['xThread', 'discordPost']
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Content Gen Error:", error);
    throw new Error("Failed to generate content");
  }
}

export async function groundedChat(query: string, projectContext: string) {
  const model = "gemini-1.5-flash";
  
  const systemInstruction = `
    You are a Web3 Project Support Bot.
    Answer technical questions strictly based on the provided project context.
    If the answer is not in the context, say "I don't have enough information on that specific detail."
    Do not hallucinate generic crypto info.
    Context: ${projectContext}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw new Error("Failed to process chat");
  }
}

export async function summarizeValueProp(technicalDocs: string) {
  const model = "gemini-1.5-flash";
  
  const systemInstruction = `
    You are a Web3 Copywriter.
    Condense dense technical documentation into 3 high-impact selling points for mobile reading.
    Return a JSON object with:
    - valueProps: array of strings (max 3)
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: technicalDocs,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            valueProps: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['valueProps']
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Summary Error:", error);
    throw new Error("Failed to summarize value prop");
  }
}
