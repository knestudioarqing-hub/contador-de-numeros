import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate crash, handle runtime check later
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getNumberFunFact = async (number: number): Promise<string> => {
  if (!ai) {
    throw new Error("API Key not found. Please set a valid API key to use AI features.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tell me a short, interesting, and unique fun fact about the number ${number}. Keep it under 2 sentences. If the number has no specific historical or mathematical significance, make a clever joke about it using its digits. Answer in Spanish.`,
      config: {
        temperature: 0.7,
        topK: 40,
      }
    });

    return response.text || "No se pudo generar un dato curioso en este momento.";
  } catch (error) {
    console.error("Error fetching fact:", error);
    throw new Error("Error al conectar con Gemini.");
  }
};