interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  author: string;
}

import { getSubjectColor } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const CompanionCard = async ({
  id,
  name,
  topic,
  subject,
  duration,
  author,
}: CompanionCardProps) => {
  const client = await clerkClient();
  const userinfo = await client.users.getUser(author);
  return (
    <article className="companion-card custom-dash" >
      <div className="flex justify-between items-center">
        <div
          className="subject-badge"
          style={{ backgroundColor: getSubjectColor(subject) }}
        >
          {subject}
        </div>
        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <div className="flex gap-2 flex-col">
        <h2 className="text-2xl text-white font-bold flex items-center justify-start">
          {name}
        </h2>
        <p className="text-sm text-white border-2 rounded-xl border-white/15 w-fit p-4 flex items-center justify-center">
          {topic}
        </p>
        <Image src="/icons/clock.svg" alt="clock" width={13.5} height={13.5} />
        <p className="textsm text-white ">{duration} minutes</p>
        <p className="text-white">
          {userinfo.firstName}
          {userinfo.lastName}
        </p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button
          className="btn-primary w-full justify-center"
          // style={{
          //   background:
          //     "linear-gradient(155deg, rgba(10, 76, 242, 1) 0%, rgba(242, 247, 247, 1) 67%, rgba(47, 179, 245, 1) 100%)",
          // }}
        >
          
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
