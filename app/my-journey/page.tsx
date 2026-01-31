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
    <main className=" bg-transparent w-full">
      <section className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 items-start sm:items-center">
        <div className="flex gap-3 sm:gap-4 items-center w-full sm:w-auto">
          <Image 
          className="rounded-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-[110px] md:h-[110px]"
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-white truncate">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="border border-white rounded-lg gap-1.5 sm:gap-2 p-2.5 sm:p-3 flex flex-col h-fit flex-1 sm:flex-initial">
            <div className="flex gap-2 items-center">
              <Image src="/icons/check.svg" alt="checkmark" height={18} width={18} className="sm:h-[22px] sm:w-[22px]"/>
              <p className="text-xl sm:text-2xl font-bold text-white">
                {SessionHistory.length}
              </p>
            </div>
            <div className="text-xs sm:text-sm text-white">Lessons Completed</div>
          </div>
          <div className="border border-white rounded-lg gap-1.5 sm:gap-2 p-2.5 sm:p-3 flex flex-col h-fit flex-1 sm:flex-initial">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" height={18} width={18} className="sm:h-[22px] sm:w-[22px]"/>
              <p className="text-xl sm:text-2xl font-bold text-white">
                {companions.length}
              </p>
            </div>
            <div className="text-xs sm:text-sm text-white">Companions Created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple" className="mt-6 sm:mt-8">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="Recent Sessions" companions={SessionHistory}/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
           <AccordionTrigger className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My Companions {`(${companions.length})`}</AccordionTrigger>
           <AccordionContent>
            <CompanionsList title="My Companions" companions={companions}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
