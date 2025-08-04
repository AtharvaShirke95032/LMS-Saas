import { GoogleGenAI } from "@google/genai";
import { createSupabaseClient } from "./supabase";
export async function generateEmbeddingFromGemini(text: string): Promise<number[]>{
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })
    const response = await genAI.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
    })
    const result = response.embeddings?.[0]?.values;
    return result as number[];
}

export async function generateNote(combinedText:string,companionId:string){
    const supabase = createSupabaseClient();  
    const {data,error} = await supabase.from("conversations").select("content").eq("companion_id",companionId).order("created_at",{ascending:false}).limit(1);
    // console.log("converssationnnnnnnnnnnnnnnnnnnnData",data);
    if (!data || data.length === 0) {
        throw new Error("No conversation data found");
    }
    const contentreturn = data[0].content;
    if(error) throw new Error(error)
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an intelligent note-taking assistant. Your task is to convert a conversation between a student and a tutor into clear, concise, and organized study notes.

            Instructions:
                - Focus only on educational content (ignore greetings or small talk).
                - Extract key points, definitions, examples, and explanations.
                - Group related points under subheadings if possible.
                - Use simple language for easier revision.
                - Remove repeated or redundant info.
                - If the tutor answers questions, format it as "Q: ... A: ..."

                Conversation:${contentreturn}`,
    })
    console.log(response.text);
}
