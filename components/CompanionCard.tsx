"use client";

import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  authorName?: string;
  authorAvatar?: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
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

            <h2 className="text-lg sm:text-xl font-bold text-white line-clamp-2">{name}</h2>

            <p className="text-xs sm:text-sm text-white border border-white/20 rounded-xl w-fit px-2 sm:px-3 py-1 truncate max-w-full sm:max-w-[280px]">
              {topic}
            </p>

            <Link href={`/companions/${id}`} prefetch={true}>
              {/* === UPDATED BUTTON STYLE === */}
              <button className="flex w-full items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:shadow-lg mt-4">
                Launch Session
              </button>
            </Link>
            <Link href={`/companions/${id}/notes`} prefetch={true}>
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