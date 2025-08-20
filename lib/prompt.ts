
import { GoogleGenAI } from "@google/genai";
import { createSupabaseClient } from "./supabase";
export async function generateEmbeddingFromGemini(
  text: string
): Promise<number[]> {
  const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY as string,
  });
  const response = await genAI.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });
  const result = response.embeddings?.[0]?.values;
  return result as number[];
}

export async function generateNote(companionId: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("content")
    .eq("companion_id", companionId)
    .order("created_at", { ascending: false })
    .limit(1);
  // console.log("converssationnnnnnnnnnnnnnnnnnnnData",data);
  if (!data || data.length === 0) {
    throw new Error("No conversation data found");
  }
//   console.log("notes hai kya", notes);
  const contentreturn = data[0].content;
  if (error) throw new Error(error);

  const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY as string,
  });
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
  You are an AI tutor assistant that generates helpful, well-structured academic notes from student–tutor conversations.
  Task:
  Based on the given input, generate concise, readable, and well-formatted academic notes that can be used for studying.

  Formatting Requirements:
  Use plain text formatting only (no markdown symbols such as *, **, or #).
  Clearly separate sections with blank lines between titles and their content.
  Structure the output using the following template:
  Subject: [Insert subject here]

  Topic: [Insert topic here]

  Key Concepts:
  - [Bullet point of first key concept]
  - [Bullet point of second key concept]
    • [Sub-point if needed]
    • [Another sub-point]

  [Optional: Use numbered lists if examples are needed]
  1. [Example 1]
  2. [Example 2]

  Summary:
  [Write a brief summary of the key points covered above.]

  Input:
  conversation: ${contentreturn}

  Example (for reference):

  Subject: Operating Systems

  Topic: Process Scheduling Algorithms

  Key Concepts:
  - Process scheduling determines the order in which processes run on the CPU.
  - Types of schedulers:
    • Long-term scheduler: selects which processes to admit to the ready queue.
    • Short-term scheduler: chooses which ready process to run next.
    • Medium-term scheduler: suspends/resumes processes to manage load.
  - Common scheduling algorithms:
  1. FCFS (First Come First Serve)
    - Non-preemptive
    - Simple but results in poor average waiting time
  2. SJF (Shortest Job First)
    - Can be preemptive or non-preemptive
    - Optimal waiting time but needs job length prediction
  3. Round Robin (RR)
    - Preemptive with time slicing
    - Fair but high turnaround time for long jobs
  4. Priority Scheduling
    - Can be preemptive or non-preemptive
    - Starvation possible (solved using aging)
  Summary:
  Each scheduling algorithm offers different tradeoffs. SJF minimizes waiting time but needs estimates. RR is fair for time-sharing. Priority scheduling needs aging to prevent starvation.`,
  });
  // console.log(response.text);
  const notesResponse = response.text;
  const { error: err } = await supabase
    .from("notes")
    .insert({
        notesContent: notesResponse,
        companion_id: companionId
    })
  if (err) {
    console.log("errrrrrrrrrrrrrrr aa gayaaaaaa", err);
  }
}



