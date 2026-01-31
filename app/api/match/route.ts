import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      embedding,
      companionId,
      matchThreshold = 0.3,
      matchCount = 3,
    } = await req.json();
    if (!embedding || !companionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc("match_conversations", {
      query_embedding: embedding,
      companion: companionId,
      match_threshold: matchThreshold,
      match_count: matchCount,
    });
    // console.log("Embedding for match:", embedding.slice(0, 5)); 
    // console.log("Matches from Supabase:", data);

     if (error) {
      console.error("Error calling match_conversations:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

     return NextResponse.json(data);
     

  } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Server error in /api/match:", errorMessage);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
