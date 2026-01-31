import { motion } from "framer-motion";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { Cta } from "@/components/CTA";
import LandingPage from "@/components/LandingPage";
import MarketPlace from "@/components/marketplaceCard";
import {
  getAllCompanions,
  getRecentSessions,
  getVoteScore,
} from "@/lib/actions/companion.actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const user = await currentUser();

  // ✅ Fetch all companions (remove limit)
  const companions = await getAllCompanions({});
  const voteScore = await getVoteScore();
  console.log("Vote scores:", voteScore);

  // ✅ Sort by score descending
  const sortedCompanions = [...companions].sort((a, b) => {
    const scoreA = voteScore[a.id] ?? 0;
    const scoreB = voteScore[b.id] ?? 0;
    return scoreB - scoreA;
  });

  // ✅ Take top 3
  const topCompanions = sortedCompanions.slice(0, 3);

  return (
    <div className="bg-transparent">
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <h1 className="text-2xl sm:text-3xl text-white pb-4 sm:pb-5">🚀 Top 3 Trending Buddies</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full justify-items-center lg:justify-items-stretch">
          {topCompanions.map((companion) => (
            <MarketPlace
              key={companion.id}
              id={companion.id}
              name={companion.name}
              topic={companion.topic}
              subject={companion.subject}
              duration={companion.duration}
              authorName={user?.fullName || companion.author}
              score={voteScore[companion.id] ?? 0}
            />
          ))}
        </section>

        {user && (
          <section className="home-section pt-5">
            <CompanionsList
              title="🎯 Recently completed sessions"
              companions={await getRecentSessions(user.id, 10)}
              classNames="w-2/3 max-lg:w-full"
            />
            <Cta />
          </section>
        )}
      </SignedIn>
    </div>
  );
};

export default Page;