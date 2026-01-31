import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { filterComponents } from '@/lib/actions/companion.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const CompanionsLibrary = async ({searchParams}:SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject:'';
  const topic = filters.topic ? filters.topic: '';

  // const companions = await getAllCompanions({subject,topic});
  const userId = await currentUser();
  if(!userId) redirect("/sign-in")
  const companions = await filterComponents({subject,topic,userId:userId.id})
  
  return (
    <main className='bg-transparent'>
      <section className='flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl text-white'> 🧠 Companion Library </h1>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'>
          <SearchInput/>
          <SubjectFilter/>
        </div>
      </section>
      {companions.length == 0 ? "create a companion to see" 
        :<section className='companions-grid'>
           {companions.map((companion)=>(
            
          <CompanionCard
            key={companion.id}
            id={companion.id}
            name={companion.name}
            topic={companion.topic}
            subject={companion.subject}
            duration={companion.duration}
          />
           ))}
        </section>
      } 
    </main>
  )
}

export default CompanionsLibrary
