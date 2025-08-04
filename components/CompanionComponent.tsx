"use client";

import { subjects } from "@/constants";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory, getCompanionDetails, storingEmbed } from "@/lib/actions/companion.actions";
import { generateEmbeddingFromGemini, generateNote } from "@/lib/prompt";

export let reverse : string[] = [] ;

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);
 
  
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
  
    }

    const onMessage = (message:Message) => {
        if(message.type === "transcript" && message.transcriptType ==="final") {
            const newMessage= {role:message.role,content:message.transcript};
            setMessages((prev) =>[newMessage,...prev])
        }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async()=>{
    const companion = await getCompanionDetails(companionId);
    setCallStatus(CallStatus.CONNECTING);
    const query = `Summarize the important facts the assistant learned about the user in this conversation. 
      Include their name, interests, background, goals, preferences, and any questions they asked. 
      Only include clear and confirmed facts, avoid assumptions.`;
    const embedRes = await fetch("/api/embed",{
      method: "POST",
      body:JSON.stringify({text:query}),
      headers:{"Content-Type": "application/json"},
    }) 
    const embedData = await embedRes.json();
    const queryEmbedding = embedData.embedding;
    // console.log("queryEmbedding",queryEmbedding)
    const matchRes = await fetch("/api/match",{
      method:"POST",
      body:JSON.stringify({
      embedding: queryEmbedding,
      companionId,  
      matchThreshold: 0.3,
      matchCount: 3,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const matches = await matchRes.json();
    // console.log("Matches returned:", matches);
    const memorySnippet = matches.map((m: any) => m.content).join("\n");
    // console.log(" Memory :", memorySnippet);
    const assistantOverrides = { 
      variableValues:{
          subject,
          topic,
          style,
          name:companion.name,
          memory: memorySnippet, 
      },
      clientMessages:["transcript"],
      serverMessages:[]
    }
    //@ts-expect-error
    vapi.start(configureAssistant(voice,style),assistantOverrides)
  }
         
  const handleDisconnect = async()=>{
    setCallStatus(CallStatus.FINISHED);  
    vapi.stop();
    // const assistantContents = messages
    //   .filter((msg) => msg.role === "assistant")
    //   .map((msg) => msg.content);
    //   reverse = assistantContents.reverse();
  const assistantContents = messages.map((msg)=>({
    role: msg.role,
    content: msg.content
  }))
  const reverse = assistantContents.reverse();
    // console.log("reverse",reverse);    
  const combinedText = reverse.map(m => `${m.role}: ${m.content}`).join("\n");
  console.log("Combined text to embed:", combinedText);
    const res = await fetch("/api/embed",{
      method: "POST",
       body: JSON.stringify({text:combinedText}),
        headers: { "Content-Type": "application/json" },
    })
    const data = await res.json();
    const embedding = data.embedding;
    // console.log("embedded",embedding)
   await storingEmbed(
    combinedText,
    companionId,
    embedding
   )
  //  generateNote(combinedText,companionId);
   const res1 = await fetch("/api/notesGen",{
    method:"POST",
    body:JSON.stringify({combinedText,companionId}),
    headers: { "Content-Type": "application/json" },
   })
   const data1 = await res1.json();
   console.log(data1);
  //  console.log("Storing to Supabase:", { combinedText, companionId, embeddingLength: embedding.length });
  //  console.log("storingEmbed finished");
  }
  return (
    <section className="flex flex-col h-[70vh] bg-transparent">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000 ",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl text-white">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-white">{userName}</p>
          </div>
          <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden text-white">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary", callStatus === CallStatus.CONNECTING && "animate-pulse"
            )} onClick={callStatus===CallStatus.ACTIVE ? handleDisconnect : handleCall}
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting"
              : "Start Session "}
          </button>
        </div>
      </section>

      <section className="transcript">
        <div className="transcript-message no-scrollbar">
            {messages.map((message,index)=>{
                if(message.role === "assistant") {
                    return(
                        <p key={index} className="max-sm:text-sm text-white">{name.split(' ')[0].replace('/[.,]/g,','')}:{message.content}</p>
                    )
                }else{
                   return <p key={index} className="text-white max-sm:text-sm ">{userName}:{message.content}</p>
                }
            })
            }
        </div>
        <div className="transcript-fade"/>
      </section>
    </section>
  );
};

export default CompanionComponent;
