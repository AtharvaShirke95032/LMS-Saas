import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.log(userId)
    const {companion_id,voteType} = await req.json();
    const supabase = createSupabaseClient();
    const {data:existingVote} = await supabase
        .from("votes")
        .select("*")
        .eq("user_id",userId)
        .eq("companion_id",companion_id)
        .single()
        // console.log(existingVote);
        if(existingVote){
            if(voteType === null){
                await supabase
                    .from("votes")
                    .delete()
                    .eq("id",existingVote.id)
            }else {
                await supabase
                    .from("votes")
                    .update({vote_type : voteType})
                    .eq("id",existingVote.id)
            }
        }else{
            console.log("ghusla")
            await supabase.from("votes").insert({
                user_id:userId,
                companion_id:companion_id,
                vote_type:voteType
            })
        }
        return NextResponse.json({ message: "success" })
}



//nit kar sagla
