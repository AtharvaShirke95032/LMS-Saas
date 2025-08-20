"use client";

import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
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
//"str":"{}"
  useEffect(() => {
  try {
    const savedVote = localStorage.getItem(`vote_${id}`);
    if (savedVote !== null) {
      const parsedVote = JSON.parse(savedVote);
      setUserVote(parsedVote);
    }
  } catch (error) {
    console.error('Error loading saved vote:', error);
  }
}, [id,authorName]);
useEffect(() => {
  try {
    localStorage.setItem(`vote_${id}`, JSON.stringify(userVote));
  } catch (error) {
    console.error('Error saving vote:', error);
  }
}, [userVote, id,authorName]);
  const handleVote = async (vote: VoteLogic) => {
    await supbaseRealtime();
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
    <div className="relative flex flex-col rounded-4xl transition-transform duration-300 ease-in-out transform-gpu bg-black border-white shadow-[0_0_10px_15px_#000000] w-full justify-between ">
      <div className="group relative h-full overflow-hidden rounded-2xl border-t border-white/10 bg-white/5 transition duration-200 hover:shadow-xl">
        <div className="p-4 space-y-4">
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
              {duration} minutes
            </div>
          </div>

          <h2 className="text-xl font-bold text-white">{name}</h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p
                className="text-sm text-white border border-white/20 rounded-xl w-fit px-3 py-1
             truncate 
             max-w-[120px]          /* default for very small screens */
             sm:max-w-[280px]       /* small screens */
             md:max-w-[380px]       /* tablets/small desktops */
             lg:max-w-[180px]" /* large desktops */
              >
                {topic}
              </p>
              <p className="overflow-x-hidden w-20 text-sm font-light">
                {authorName}
              </p>
            </div>
            <div className="flex flex-col items-center text-white">
              <button
                onClick={() => handleVote(true)}
                className={`p-1 hover:text-orange-500 ${
                  userVote === true ? "text-orange-500" : ""
                }`}
              >
                <div className="border rounded-sm">
                  <ArrowUp size={20} />
                </div>
              </button>

              <span className="text-sm font-bold">{voteCount} </span>

              <button
                onClick={() => handleVote(false)}
                className={`p-1 hover:text-blue-500 ${
                  userVote === false ? "text-blue-500" : ""
                }`}
              >
                <div className="border rounded-sm">
                  <ArrowDown size={20} />
                </div>
              </button>
            </div>
          </div>

          {/* <p className="text-white text-xs">by {authorName}</p> */}
        </div>
      </div>
      <div className="border-b-1  border-white/10 p-4 rounded-2xl ">
        <p>desctiption</p>
      </div>
    </div>
  );
};

export default MarketPlace;
