import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-center gap-y-8 border-y bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)] px-4 py-12">
      {/* Corner Plus Icons from Design 1 */}
      <PlusIcon
        className="absolute top-[-12.5px] left-[-11.5px] z-10 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute top-[-12.5px] right-[-11.5px] z-10 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute bottom-[-12.5px] left-[-11.5px] z-10 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute right-[-11.5px] bottom-[-12.5px] z-10 size-6"
        strokeWidth={1}
      />

      {/* Border Lines from Design 1 */}
      <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l" />
      <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r" />
      <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />

      {/* Glow Effect from Design 2 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[40%] bg-[#93cf2f]/20 blur-2xl rounded-full pointer-events-none z-0" />

      {/* Text Content from Design 2, styled like Design 1 */}
      <div className="space-y-4 z-10">
        <div className="text-center">
          <div className="inline-block text-sm font-semibold text-[#93cf2f] px-4 py-1 rounded-full border border-[#93cf2f]/50 bg-black/10">
            "Start learning your way"
          </div>
        </div>
        <h2 className="text-center font-bold text-2xl">
          Build and Personalize Your Learning Companion
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Pick a name, subject, voice, & personality — and start learning through
          voice conversations that feel natural and fun.
        </p>
      </div>

      {/* Button from Design 2 (Action) using Design 1 (Component) */}
      <div className="flex items-center justify-center gap-2 z-10">
        <Button
          asChild
          className="bg-[#93cf2f] hover:bg-[#addb53] text-black font-semibold px-6 py-3 rounded-full transition shadow-lg shadow-[#93cf2f]/20 hover:shadow-xl hover:shadow-[#93cf2f]/30"
        >
          <a href="/companions/new">
            <PlusIcon className="size-4 mr-2" />
            <span>Build a New Companion</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

