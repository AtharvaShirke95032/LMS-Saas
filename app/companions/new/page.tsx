import React from 'react'
import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { newCompanionPermissions } from '@/lib/actions/companion.actions';
import Image from 'next/image';
import Link from 'next/link';
const NewCompanion = async() => {
  const {userId} = await auth();
  if(!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-cente bg-transparent'>
      {canCreateCompanion? (<article className='w-full gap-4 flex flex-col'>

      
      <h1>companion builder</h1>
      <CompanionForm/>
      </article>
      ):
      (
      <article className='companion-limit'>
          <Link href={"/subscription"}><button className='btn-primary'>update your plan</button></Link>
        
      </article>
      )}
    </main>
  )
}

export default NewCompanion
