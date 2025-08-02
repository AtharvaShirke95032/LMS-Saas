import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const SessionHistory = await getUserSessions(user.id);
  return (
    <main className="min-lg:w-3/4 bg-transparent">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image 
          className="rounded-2xl"
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-white rounded-lg gap-2 p-3 flex flex-col h-fit ">
            <div className="flex gap-2 items-center">
              <Image src="/icons/check.svg" alt="checkmark" height={22} width={22}/>
              <p className="text-2xl font-bold text-white">
                {SessionHistory.length}
              </p>
            </div>
            <div className="text-white">Lessons Completed</div>
          </div>
          <div className="border border-white rounded-lg gap-2 p-3 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" height={22} width={22}/>
              <p className="text-2xl font-bold text-white">
                {companions.length}
              </p>
            </div>
            <div className="text-white">Companions Created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold text-white">Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="Recent Sessions" companions={SessionHistory}/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
           <AccordionTrigger className="text-2xl font-bold text-white">My Companions {`(${companions.length})`}</AccordionTrigger>
           <AccordionContent>
            <CompanionsList title="My Companions" companions={companions}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
