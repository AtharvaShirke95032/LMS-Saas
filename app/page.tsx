import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import LandingPage from "@/components/LandingPage";
import MarketPlace from "@/components/marketplaceCard";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
  getVoteScore,
} from "@/lib/actions/companion.actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();

  const companions = await getAllCompanions({ limit: 3 });
  // const userId = companions.map((companion) => companion.author);
  // console.log("userId", userId);
  // console.log("companions:page",companions);
   const voteScore =  await getVoteScore();
    
  return (
    <main className="bg-transparent ">
     <SignedOut>
      <LandingPage/>
     </SignedOut>

     <SignedIn>

      
        {/* Dashboard (shown when logged in) */}
        <h1 className="text-3xl text-white">🚀 Trending Buddies</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {companions.map((companion) => (
            <MarketPlace
              key={companion.id}
              // notesId={}
              id={companion.id}
              name={companion.name}
              topic={companion.topic}
              subject={companion.subject}
              duration={companion.duration}
              // authorName={`${user?.firstName ?? "Unknown"} ${user?.lastName ?? ""}`}
              authorName={companion.author}
              score = {voteScore[companion.id]}
            />
          ))}
        </section>
        {user && (
          <section className="home-section">
            <CompanionsList
              title="🎯 Recently completed sessions "
              companions={await getRecentSessions(user.id, 10)}
              classNames="w-2/3 max-lg:w-full"
            />
            <CTA />
          </section>
        )}
      </SignedIn>
    </main>
  );
};

export default Page;
