"use client";

import { cn } from "@/lib/utils";
import { Brain, MessageSquare, BookText } from "lucide-react";
import type React from "react";

type HowItWorksProps = React.HTMLAttributes<HTMLElement>;

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border bg-card p-6 text-card-foreground transition-all duration-300 ease-in-out",
      "hover:scale-[1.03] hover:shadow-lg hover:border-primary/50 hover:bg-muted/40"
    )}
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
          <span className="text-muted-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Create Your AI Companion",
      description:
        "Start by choosing your subject, topic, and learning style. Your personalized AI tutor is built to match how you think and learn.",
      benefits: [
        "Custom-built for your chosen subject",
        "Understands your pace and tone",
        "Adapts as you grow",
      ],
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Learn Through One-on-One Interaction",
      description:
        "Talk, ask questions, and explore ideas in natural conversation. The AI listens, responds, and remembers everything you discuss.",
      benefits: [
        "Voice or chat-based interactive learning",
        "Continuous memory and context retention",
        "Personalized explanations every time",
      ],
    },
    {
      icon: <BookText className="h-6 w-6" />,
      title: "Get Notes & Insights Automatically",
      description:
        "After each session, your AI generates clean, structured notes that summarize your discussion and highlight key learnings.",
      benefits: [
        "Automatic note generation",
        "Summarized key concepts and takeaways",
        "Available anytime for revision",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn(
        "w-full bg-background py-20 sm:py-28 border-t border-border/40",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From creating your own AI companion to learning together and
            generating notes — your entire journey is seamless and personal.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="relative mx-auto mb-8 w-full max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-border"
          ></div>
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-muted font-semibold text-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};