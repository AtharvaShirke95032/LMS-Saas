import { GoogleGenAI } from "@google/genai";

export async function generateEmbeddingFromGemini(text: string): Promise<number[]>{
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })
    const response = await genAI.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
    })
    const result = response.embeddings?.[0]?.values;
    return result as number[];
}