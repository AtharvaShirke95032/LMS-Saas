"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { Filter } from "lucide-react";
import { relative } from "path";

export const createCompanion = async (FormData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...FormData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "failed to create a companion");
  return data[0];
};

export const getAllCompanions = async ({limit = 10,page = 1,subject,topic}: GetAllCompanions) => {
  const supabase = createSupabaseClient();
  
  let query = supabase.from("companions").select();
  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);
  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);
  // console.log("companions:",companions)
  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);
  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data: exist, error: error1 } = await supabase
    .from("session_history")
    .select("companion_id")
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error1) throw new Error(error1.message);

  const existId = exist.map((ex) => ex.companion_id); // Make sure ex.id exists!
  let flag = false;
  //   console.log("companionid",companionId);
  //   console.log("Existid",existId[0])
  for (let i = 0; i < existId.length; i++) {
    if (existId[i] === companionId) {
      flag = true; // ✅ actually update flag
      break;
    }
  }
  //   console.log(flag);
  if (flag) {
    console.log("already exists in db");
  } else {
    const { data, error } = await supabase.from("session_history").insert({
      companion_id: companionId,
      user_id: userId,
    });
    if (error) throw new Error(error.message);
    return data;
  }
};
export const getRecentSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  // console.log("data:",data);
  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);
  if (error) throw new Error(error.message);
  return data;
};

export const filterComponents = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
  userId,
}: filterComponents) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select().eq("author", userId);

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);

  return companions;
};

export const newCompanionPermissions = async()=>{
  const {userId,has} = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if(has({plan:"pro"})){
    return true;
  }else if(has({feature:"3_companion_limit"})){
    limit = 3;
  }else if(has({feature:"10_companion_limit"})){
    limit= 10;
  }

  const {data,error} = await supabase
    .from("companions")
    .select("id",{count:"exact"})
    .eq("author",userId)
  
    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount>= limit){
      return false;
    }else{ 
      return true;
    }
}

export const getCompanionDetails = async (companionId:string)=>{
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select("name") // or specify: "id, name, subject, topic"
    .eq("id", companionId) // filter by name
    .single(); // get exactly one match
  if (error) throw new Error(error.message);
  return data;
}


//embbeding 

export const storingEmbed = async (
  content: string,
  companionId: string,
  embedding: number[]
) => {
  const supabase = createSupabaseClient();

  const { error } = await supabase.from("conversations").insert({
    content,
    companion_id: companionId,
    embedding,
  });

  if (error) {
    console.error("Error storing embedding:", error.message);
  } else {
    console.log("Embedding stored successfully.");
  }
};