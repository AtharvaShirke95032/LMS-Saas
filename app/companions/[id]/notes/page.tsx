import { createSupabaseClient } from '@/lib/supabase';
import React from 'react'
interface notesbabe{
  params:Promise<{id:string}>
}

function formatDatabaseNotes(text:string) {
  const sectionHeaders = ["Subject", "Topic", "Key Concepts", "Summary"];
  sectionHeaders.forEach(header => {
    // Add two newlines before each header (except if it's at the start)
    const regex = new RegExp(`\\s*${header}`, 'g');
    text = text.replace(regex, `\n\n${header}`);
  });
  // Trim leading and trailing spaces/newlines
  return text.trim();
}

const page = async({params}:notesbabe) => {
  const {id} = await params;
  const supabase = createSupabaseClient()
  const {data,error} = await supabase.from("notes").select("notesContent").eq("companion_id",id);
  if(!data || error) throw new Error(error.message)
  const formatedData = data.map((note)=>(
    formatDatabaseNotes(note.notesContent)
  ))
  const formattedData = data.map((note) => formatDatabaseNotes(note.notesContent));

  // console.log("dataaaaaaaaaaaaaaaaaaaaaaa",formatedData)
  return (
  // Container: We'll use a darker background (like neutral-950 or black)
// to make the notes pop. We'll also add more vertical padding.
<div className='flex flex-col gap-7 items-center min-h-screen bg-neutral-950 py-12 px-4'>
  {formattedData.map((note, index) => (
    <div
      key={index}
      // Note Card:
      // - bg-neutral-800: Slightly lighter card
      // - shadow-lg shadow-blue-500/10: Adds depth and a subtle blue "glow"
      // - border border-neutral-700: Defines the card edge
      // - border-l-4 border-l-blue-500: The AI accent!
      // - text-neutral-200: Softer white for easier reading
      // - leading-relaxed: More space between lines
      className="max-w-3xl w-full text-neutral-200 bg-neutral-800 p-5 rounded-lg shadow-lg shadow-blue-500/10 border border-neutral-700 border-l-4 border-l-blue-500 whitespace-pre-line leading-relaxed"
    >
      {note}
    </div>
  ))}
</div>
  )
}

export default page
