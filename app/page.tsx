import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import LandingPage from "@/components/LandingPage";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
const user = await currentUser();

const companions = await getAllCompanions({ limit: 3 });
const userId = companions.map((companion)=>companion.author)
console.log("userId",userId)
// console.log("companions:page",companions);
  return (
    <main className="bg-transparent ">
      <SignedOut>
        
        <LandingPage/>
      </SignedOut>

      <SignedIn>
        {/* Dashboard (shown when logged in) */}
        <h1 className="text-3xl text-white">🚀 Trending Buddies</h1>
        <section className="home-section">
          {companions.map((companion) => (
            <CompanionCard
  key={companion.id}
  id={companion.id}
  name={companion.name}
  topic={companion.topic}
  subject={companion.subject}
  duration={companion.duration}
  // authorName={`${user?.firstName ?? "Unknown"} ${user?.lastName ?? ""}`}
  authorName={companion.author}
  
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
