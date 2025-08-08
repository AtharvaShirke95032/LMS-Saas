import { generateNote } from "@/lib/prompt";
import {NextResponse } from "next/server"
export async function POST(req:Request){
    const { companionId } = await req.json();
    if(!companionId) return NextResponse.json({ error: "Text is required" }, { status: 400 });
    try {
        const notesGen = generateNote(companionId);
        return NextResponse.json({notesGen})
    } catch (error) {
        console.error("notes generatiing api error:", error);
        return NextResponse.json({ error: "Failed to generate notes in api" }, { status: 500 });
    }
}
