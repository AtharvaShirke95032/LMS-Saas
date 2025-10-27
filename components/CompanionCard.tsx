"use client";

import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FollowerPointerCard } from "@/components/aceternity/following-pointer";

// Assuming AuroraBackground is in this file or imported if you want it *inside* the card
// import { AuroraBackground } from "@/components/aceternity/aurora-background";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  authorName?: string;
  authorAvatar?: string;
}

const TitleComponent = ({
  title,
  avatar,
}: {
  title?: string;
  avatar?: string;
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

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  authorName,
  authorAvatar,
}: CompanionCardProps) => {
  return (
    <div className="relative companion-card">
  
        {/* This is the card itself. 
          It has a semi-transparent background to allow the Aurora effect to show through.
        */}
        <div className="group relative h-full overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm transition duration-200 hover:shadow-xl">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div
                className="subject-badge text-xs font-bold uppercase px-2 py-1 rounded text-black"
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
                  className="invert" // Added invert to make the icon white
                />
                {/* {duration} minutes */}
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">{name}</h2>

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

            <Link href={`/companions/${id}`}>
              {/* === UPDATED BUTTON STYLE === */}
              <button className="flex w-full items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:shadow-lg mt-4">
                Launch Session
              </button>
            </Link>
            <Link href={`/companions/${id}/notes`}>
              {/* === UPDATED BUTTON STYLE === */}
              <button className="flex w-full items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:shadow-lg mt-2">
                View Notes
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default CompanionCard;