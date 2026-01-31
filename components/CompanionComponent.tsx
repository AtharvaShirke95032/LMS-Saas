"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import soundwaves from "@/constants/soundwaves.json";
import {
  addToSessionHistory,
  getCompanionDetails,
  storingEmbed,
} from "@/lib/actions/companion.actions";


export let reverse: string[] = [];

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
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
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

  const handleCall = async () => {
    const companion = await getCompanionDetails(companionId);
    setCallStatus(CallStatus.CONNECTING);
    const query = `Summarize the important facts the assistant learned about the user in this conversation. 
      Include their name, interests, background, goals, preferences, and any questions they asked. 
      Only include clear and confirmed facts, avoid assumptions.`;
    const embedRes = await fetch("/api/embed", {
      method: "POST",
      body: JSON.stringify({ text: query }),
      headers: { "Content-Type": "application/json" },
    });
    const embedData = await embedRes.json();
    const queryEmbedding = embedData.embedding;
    // console.log("queryEmbedding",queryEmbedding)
    const matchRes = await fetch("/api/match", {
      method: "POST",
      body: JSON.stringify({
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
      variableValues: {
        subject,
        topic,
        style,
        name: companion.name,
        memory: memorySnippet,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    //@ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    // const assistantContents = messages
    //   .filter((msg) => msg.role === "assistant")
    //   .map((msg) => msg.content);
    //   reverse = assistantContents.reverse();
    const assistantContents = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    const reverse = assistantContents.reverse();
    // console.log("reverse",reverse);
    const combinedText = reverse
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    console.log("Combined text to embed:", combinedText);
    const res = await fetch("/api/embed", {
      method: "POST",
      body: JSON.stringify({ text: combinedText }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const embedding = data.embedding;
    await storingEmbed(combinedText, companionId, embedding);
    //fetch notes

    //  generateNote(combinedText,companionId);
    const res1 = await fetch("/api/notesGen", {
      method: "POST",
      body: JSON.stringify({ companionId }),
      headers: { "Content-Type": "application/json" },
    });
    const data1 = await res1.json();
    console.log(data1);
    //  console.log("Storing to Supabase:", { combinedText, companionId, embeddingLength: embedding.length });
    //  console.log("storingEmbed finished");
  };
  return (
  <section
  // Main Container:
  // - Using h-[80vh] for a taller viewport.
  // - Added p-4 or p-6 for spacing.
  // - Switched to a mobile-first 'flex-col' that becomes 'flex-row' on large screens.
  className="flex flex-col lg:flex-row w-full h-auto min-h-[70vh] lg:h-[80vh] gap-4 sm:gap-6 p-3 sm:p-4 lg:p-6 text-white"
>
  {/* --- COLUMN 1: PARTICIPANTS & CONTROLS --- */}
  <section
    // This column holds the companion and user.
    // Stacks vertically on mobile, goes side-by-side on tablet, and re-stacks
    // vertically on large screens when next to the transcript.
    className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:w-full lg:max-w-xs"
  >
    {/* --- Companion Card --- */}
    <div
      // A "card" look with bg-neutral-800, rounded-2xl, and padding.
      // 'flex-1' makes it share space equally with the user card on sm/md screens.
      className="flex flex-col items-center justify-center gap-3 p-6 bg-neutral-800 rounded-2xl flex-1 shadow-lg"
    >
      <div
        // Avatar container: relative, rounded-full, and shadow.
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center rounded-full overflow-hidden shadow-xl"
        style={{ backgroundColor: getSubjectColor(subject) }}
      >
        <div
          className={cn(
            "absolute transition-opacity duration-1000",
            callStatus === CallStatus.FINISHED ||
              callStatus === CallStatus.INACTIVE
              ? "opacity-100"
              : "opacity-0",
            callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
          )}
        >
          <Image
            src={`/icons/${subject}.svg`}
            alt={subject}
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
        </div>
        <div
          className={cn(
            "absolute transition-opacity duration-1000",
            callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
          )}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={soundwaves}
            autoPlay={false}
            // Scaled the Lottie to better fill the avatar circle
            className="w-full h-full scale-150"
          />
        </div>
      </div>
      <p className="font-bold text-lg sm:text-xl text-neutral-100 tracking-wide text-center px-2">{name}</p>
    </div>

    {/* --- User Card & Controls --- */}
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-neutral-800 rounded-2xl flex-1 shadow-lg">
      {/* User Avatar */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={userImage}
          alt={userName}
          width={130}
          height={130}
          // Avatars look better as 'rounded-full'
          className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-neutral-600"
        />
        <p className="font-semibold text-base sm:text-lg text-neutral-100 text-center px-2">{userName}</p>
      </div>

      {/* Mic Button */}
      <button
        // Styled as a proper button with hover/disabled states
        className="flex items-center justify-center gap-2.5 rounded-lg px-4 py-2 w-full bg-neutral-700 hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={toggleMicrophone}
        disabled={callStatus !== CallStatus.ACTIVE}
      >
        <Image
          src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
          alt="mic"
          width={28}
          height={28}
        />
        <p className="hidden sm:block text-white font-medium text-sm sm:text-base">
          {isMuted ? "Turn on" : "Turn off"} microphone
        </p>
      </button>

      {/* Call/End Button */}
      <button
        className={cn(
          // Base button styles
          "w-full rounded-lg py-2.5 sm:py-3 px-4 sm:px-5 font-semibold text-base sm:text-lg text-white transition-all duration-200 shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800",
          // Logic-based styles
          callStatus === CallStatus.ACTIVE
            ? "bg-red-700 hover:bg-red-600 focus:ring-red-500"
            : "bg-primary hover:opacity-90 focus:ring-primary", // Respects your 'bg-primary'
          callStatus === CallStatus.CONNECTING &&
            "animate-pulse bg-primary/70 cursor-not-allowed" // Dims 'bg-primary'
        )}
        onClick={
          callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
        }
      >
        {callStatus === CallStatus.ACTIVE
          ? "End Session"
          : callStatus === CallStatus.CONNECTING
          ? "Connecting..."
          : "Start Session"}
      </button>
    </div>
  </section>

  {/* --- COLUMN 2: TRANSCRIPT --- */}
  <section
    // A card for the transcript. 'flex-col' to layout the list and the fade.
    // 'overflow-hidden' is ESSENTIAL for the fade effect to work.
    className="flex flex-col flex-1 h-full bg-neutral-800 rounded-2xl shadow-lg overflow-hidden"
  >
    <div
      // This is the scrolling message list
      // 'flex-1' makes it take all available space.
      // 'overflow-y-auto' makes it scroll.
      // 'no-scrollbar' is a custom utility you'll need (see note below).
      className="flex-1 flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 overflow-y-auto no-scrollbar"
    >
      {messages.map((message, index) => {
        if (message.role === "assistant") {
          return (
            <p key={index} className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              <span className="font-medium text-neutral-100">
                {name.split(" ")[0].replace("/[.,]/g,", "")}:
              </span>{" "}
              {message.content}
            </p>
          );
        } else {
          return (
            <p key={index} className="text-sm sm:text-base text-white leading-relaxed">
              <span className="font-medium text-blue-300">
                {userName}:
              </span>{" "}
              {message.content}
            </p>
          );
        }
      })}
    </div>

    {/* Transcript Fade Effect */}
    <div
      // This gradient overlays the bottom of the list, fading it out.
      // '-mt-20' pulls it up. 'pointer-events-none' lets you click/scroll through it.
      className="w-full h-20 bg-gradient-to-t from-neutral-800 to-transparent -mt-20 pointer-events-none"
    />
  </section>
  
</section>
  );
};

export default CompanionComponent;
