import React from 'react';
import CompanionForm from '@/components/CompanionForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { newCompanionPermissions } from '@/lib/actions/companion.actions';
import Link from 'next/link';
// Optional: Import an icon for the "limit" card for extra visual polish
// import { LockIcon } from 'lucide-react'; // Example using lucide-react

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions();

  return (
    // Main container: Provides padding and centers content.
    <main className="flex-grow container mx-auto px-4 py-12">
      {canCreateCompanion ? (
        // "Success" State: The form for creating a companion
        <article className="w-full max-w-2xl mx-auto">
          <div className="space-y-3 mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-100">
              Companion Builder
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Fill out the form below to bring your new companion to life.
            </p>
          </div>
          
          {/* Form is rendered in a clean, padded container */}
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700">
            <CompanionForm />
          </div>
        </article>
      ) : (
        // "Limit" State: A clear call-to-action card
        <article className="w-full max-w-md mx-auto flex flex-col items-center text-center p-8 sm:p-10 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700">
          
          {/* Visual cue (Icon or Emoji) */}
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            {/* Using an emoji as a dependency-free icon */}
            <span className="text-3xl" role="img" aria-label="Lock">
              🔒
            </span>
            {/* Or use an icon library: <LockIcon className="w-6 h-6 text-red-600 dark:text-red-400" /> */}
          </div>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Companion Limit Reached
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            You have reached the maximum number of companions for your current
            plan. Please upgrade to create more.
          </p>

          {/* Styled CTA Button */}
          <Link
            href="/subscription"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 transition-colors"
          >
            View Subscription Plans
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;