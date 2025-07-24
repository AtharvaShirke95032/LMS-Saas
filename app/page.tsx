import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1  className='text-2xl'>Popular companions</h1>
      <section className='home-section'> 
        <CompanionCard
          id="123"
          name="Name one"
          topic="topic one"
          subject="science"
          duration={50}
          
        />
        <CompanionCard
          id="123"
          name="Name two"
          topic="topic two"
          subject="maths"
          duration={45}
          
        />
          <CompanionCard
          id="123"
          name="Name three"
          topic="topic three"
          subject="coding"
          duration={30}
          
        />
      </section>
      <section className='home-section'>
        <CompanionsList
        title="Recently completed sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page