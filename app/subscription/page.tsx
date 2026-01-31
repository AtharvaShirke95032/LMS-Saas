import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Subscription = () => {
  return (
    <main className='bg-transparent w-full py-6 sm:py-8 lg:py-10'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8 sm:mb-12 text-center px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4'>
            Choose Your Plan
          </h1>
          <p className='text-sm sm:text-base text-white/70 max-w-2xl mx-auto'>
            Select the perfect plan for your learning journey
          </p>
        </div>
        <div className='w-full overflow-x-auto overflow-y-visible'>
          <div className='min-w-max px-4 sm:px-6 lg:px-8 pb-4'>
            <div className='pricing-table-wrapper w-full'>
              <PricingTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Subscription
