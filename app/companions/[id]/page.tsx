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
  
  const {name,subject,topic,duration} =companion;

  if(!user) redirect("/sign-in");

  if(!name) redirect("/companions")
  return (
    <main className='bg-transparent'>
<div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-8 lg:p-20 shadow-lg">       
 <article className='flex rounded-border border-white justify-between p-4 sm:p-6 flex-col sm:flex-row gap-4 sm:gap-0 mb-8 sm:mb-12 lg:mb-20'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <div className='size-12 sm:size-16 md:size-[72px] flex items-center justify-center rounded-lg' style={{backgroundColor:getSubjectColor(subject)}}>
            <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} className="w-6 h-6 sm:w-8 sm:h-8 md:w-[35px] md:h-[35px]" />
          </div>
          <div className='flex flex-col gap-1 sm:gap-2 flex-1 min-w-0'>
            <div className='flex items-center gap-2 flex-wrap'>
              <p className='font-bold text-lg sm:text-xl lg:text-2xl text-white'>
                 {name}
              </p>
              <div className='subject-badge text-xs sm:text-sm text-white'>
                {subject}
              </div>
            </div>
            <p className='text-sm sm:text-base lg:text-lg text-white truncate sm:line-clamp-2'> {topic}</p>
          </div>
        </div>
        <div className='flex items-center sm:items-start text-lg sm:text-xl lg:text-2xl text-white'>{duration} minutes</div>
        </article>
        
        <CompanionComponent
          {...companion}
          companionId={id}
          userName={user.firstName!}
          userImage ={user.imageUrl!}
        />
      </div>
     
    </main>
  )
}

export default ComapionSession
