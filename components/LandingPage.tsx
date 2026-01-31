import React from "react";
import { Cover } from "./ui/cover";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { HowItWorks } from "./ui/how-it-works";
import { Features } from "./blocks/features-8";

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10">
        <BackgroundRippleEffect />

      </div>
      
      

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center w-full text-center px-4 sm:px-6 lg:px-8 min-h-[85vh] sm:min-h-[90vh] pt-[8vh] sm:pt-[12vh]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-6xl mx-auto z-20 py-4 sm:py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-100 dark:via-white dark:to-white">
          Unlock Your Potential <br className="hidden sm:block" /> with <Cover>Personalised AI</Cover>
        </h1>

        <p className="mt-4 sm:mt-6 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl px-4">
          Create your own AI companion to master any subject through one-on-one
          interactive sessions.
        </p>
      </section>

      {/* How It Works Section */}
      <section>
        <HowItWorks />
      </section>
      <section>
        <Features/>
      </section>
    </div>
  );
};

export default LandingPage;