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
    <div className='flex flex-col gap-7 items-center justify-center bg-neutral-900'>
      {formattedData.map((note, index) => (
      <div
        key={index}
        className="max-w-3xl w-full text-white bg-neutral-800 p-4 rounded-md whitespace-pre-line"
      >
        {note}
      </div>
    ))}
    </div>
  )
}

export default page
