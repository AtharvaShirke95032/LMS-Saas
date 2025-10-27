import React from "react";
import { Cover } from "./ui/cover";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { HowItWorks } from "./ui/how-it-works";
import { Features } from "./blocks/features-8";
import { DotScreenShader } from "./ui/dot-shader-background";

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10">
        <BackgroundRippleEffect />

      </div>
      
      

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center w-full text-center px-4 min-h-[90vh] pt-[12vh]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-6xl mx-auto z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-100 dark:via-white dark:to-white">
          Unlock Your Potential <br /> with <Cover>Personalised AI</Cover>
        </h1>

        <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-base md:text-lg max-w-2xl">
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