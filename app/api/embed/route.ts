import { generateEmbeddingFromGemini } from "@/lib/prompt";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {text} = await req.json();

    if(!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });

    try{
        const embedding = await generateEmbeddingFromGemini(text);
        
        return NextResponse.json({embedding});
    }catch(err){
         console.error("Embedding error:", err);
    return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
    }
}