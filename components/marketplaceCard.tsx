"use client";

import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// Import PlusIcon
import { ArrowUp, ArrowDown, PlusIcon } from "lucide-react";
import { supbaseRealtime } from "@/lib/actions/companion.actions";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  authorName?: string;
  authorAvatar?: string;
  score?: number;
}

type SCORELOGIC = number;
type VoteLogic = true | false | null;

// This component was in your original code but not used.
// I'm leaving it here in case you need it.
const TitleComponent = ({
  title,
  avatar,
  subject,
}: {
  title?: string;
  avatar?: string;
  subject?: string;
}) => (
  <div className="flex items-center space-x-2">
    {avatar && (
      <img
        src={avatar}
        height="20"
        width="20"
        alt="avatar"
        className="rounded-full border-2 border-white"
      />
    )}
    <p>{title}</p>
  </div>
);

const MarketPlace = ({
  name,
  topic,
  subject,
  duration,
  authorName,
  authorAvatar,
  id,
  score,
}: CompanionCardProps) => {
  const [userVote, setUserVote] = useState<VoteLogic>(null);
  const [voteCount, setVoteCount] = useState<SCORELOGIC>(score ?? 0);

  useEffect(() => {
    try {
      const savedVote = localStorage.getItem(`vote_${id}`);
      if (savedVote !== null) {
        const parsedVote = JSON.parse(savedVote);
        setUserVote(parsedVote);
      }
    } catch (error) {
      console.error("Error loading saved vote:", error);
    }
  }, [id, authorName]);

  useEffect(() => {
    try {
      localStorage.setItem(`vote_${id}`, JSON.stringify(userVote));
    } catch (error) {
      console.error("Error saving vote:", error);
    }
  }, [userVote, id, authorName]);

  const handleVote = async (vote: VoteLogic) => {
    // await supbaseRealtime(); // Assuming this is for realtime updates
    const newVote = userVote === vote ? null : vote;
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        body: JSON.stringify({
          companion_id: id,
          voteType: newVote,
        }),
      });
      if (!res.ok) throw new Error("Failed to vote");

      console.log("vote value", userVote);
      const delta =
        userVote === vote
          ? -(vote ? 1 : -1)
          : userVote === null
          ? vote
            ? 1
            : -1
          : vote
          ? 2
          : -2;

      setVoteCount((prev) => prev + delta);
      setUserVote(newVote);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="relative flex flex-col rounded-2xl transition-all duration-300 transform-gpu 
      bg-neutral-950 border border-white/10 w-full justify-between h-80 overflow-hidden 
      hover:scale-[1.01] 
      
      /* --- STYLES FROM CTA --- */
      bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]
      shadow-lg shadow-[#93cf2f]/20 
      hover:shadow-[#93cf2f]/30"
    >
      {/* --- STYLES FROM CTA: Corner Plus Icons --- */}
      {/* Positioned inside the card padding for a cleaner look in a grid */}
      <PlusIcon
        className="absolute top-3 left-3 z-10 size-4 text-white/20"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute top-3 right-3 z-10 size-4 text-white/20"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute bottom-3 left-3 z-10 size-4 text-white/20"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute bottom-3 right-3 z-10 size-4 text-white/20"
        strokeWidth={1}
      />

      {/* --- STYLES FROM CTA: Glow Effect --- */}
      {/* Scaled down to fit the card */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-20 w-[60%] bg-[#93cf2f]/10 blur-xl rounded-full pointer-events-none z-0" />

      {/* Main Content Area (Added z-10) */}
      <div className="flex-1 p-4 space-y-4 flex flex-col justify-between z-10">
        {/* Top Section: Badges */}
        <div>
          <div className="flex justify-between items-center">
            <div
              className="subject-badge text-xs font-bold uppercase px-2 py-1 rounded"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              {subject}
            </div>

            <div className="flex items-center gap-2 text-white text-sm">
              <Image
                src="/icons/clock.svg"
                alt="clock"
                width={13.5}
                height={13.5}
              />
              {/* {duration} minutes */}
            </div>
          </div>

          {/* Title - Clamped to 2 lines */}
          <h2 className="mt-4 text-xl font-bold text-white h-14 leading-tight line-clamp-2">
            {name}
          </h2>
        </div>

        {/* Bottom Section: Topic & Votes */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 overflow-hidden">
            {/* Topic - Truncated */}
            <p
              className="text-sm text-white border border-white/20 rounded-xl w-fit px-3 py-1
             truncate max-w-full"
            >
              {topic}
            </p>
            {/* Author - Truncated */}
            <p className="text-md font-light text-neutral-400 truncate">
              Owner:{authorName}
            </p>
          </div>

          {/* Vote Controls */}
          <div className="flex flex-col items-center text-white flex-shrink-0 ml-2">
            <button
              onClick={() => handleVote(true)}
              className={`p-1 hover:text-orange-500 transition-colors ${
                userVote === true ? "text-orange-500" : ""
              }`}
            >
              <div className="border border-white/20 rounded-md p-0.5">
                <ArrowUp size={20} />
              </div>
            </button>

            <span className="text-sm font-bold w-8 text-center">
              {voteCount}
            </span>

            <button
              onClick={() => handleVote(false)}
              className={`p-1 hover:text-blue-500 transition-colors ${
                userVote === false ? "text-blue-500" : ""
              }`}
            >
              <div className="border border-white/20 rounded-md p-0.5">
                <ArrowDown size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Area (Added z-10) */}
      <div className="border-t border-white/10 p-4 bg-black/30 backdrop-blur-sm z-10">
        <p className="text-sm text-neutral-300">Description...</p>
      </div>
    </div>
  );
};

export default MarketPlace;