import MarketPlace from "@/components/marketplaceCard";
import { getAllCompanions, getVoteScore } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const companions = await getAllCompanions({ limit: 20 });
  const voteScore =  await getVoteScore();
  


// console.log(updatedCompanions);  
  return (
    <main className="">
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
            // score = {voteScore[companion.id]}
            // score = {await getVoteScore(companion.id)}
            score = {voteScore[companion.id]}
            authorName={user?.fullName ||companion.author}
          />
        ))}
      </section>
    </main>
  );
};

export default page;
