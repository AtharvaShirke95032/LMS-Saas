import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import React from 'react'

const Page = async () => {
  const companions = await getAllCompanions({limit:3});
  const recentSessionCompanions = await getRecentSessions(10);
  return (
    <main>
      <h1  className='text-2xl'>Popular companions</h1>
      <section className='home-section'> 
        {companions.map((companion)=>(
          <CompanionCard
          key={companion.id}
           {...companion}
          
        />
        ))}
        
      </section>
      <section className='home-section'>
        <CompanionsList
        title="Recently completed sessions"
        companions={recentSessionCompanions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page