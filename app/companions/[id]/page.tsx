import CompanionComponent from '@/components/CompanionComponent';
import { getCompanion } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import React from 'react'
interface companionSessionPageProps{
  params:Promise<{id:string}>
}
const ComapionSession = async ({params}:companionSessionPageProps) => {
  const {id} =await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  
  const {name,subject,titile,topic,duration} =companion;

  if(!user) redirect("/sign-in");

  if(!name) redirect("/companions")
  return (
    <main className='bg-neutral-900'>
      <article className='flex rounded-border border-white justify-between p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{backgroundColor:getSubjectColor(subject)}}>
            <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 '>
              <p className='font-bold text-2xl text-white'>
                 {name}
              </p>
              <div className='subject-badge max-sm:hidden text-white'>
                {subject}
              </div>
            </div>
            <p className='text-lg text-white'> {topic}</p>
          </div>
        </div>
        <div className='items-start text-2xl max-md:hidden text-white'>{duration} minutes</div>
      </article>
      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage ={user.imageUrl!}
      />
    </main>
  )
}

export default ComapionSession
