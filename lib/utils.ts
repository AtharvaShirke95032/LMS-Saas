import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (
  voice: string,
  style: string
) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

    

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
       {
  role: "system",
  content: `You are {{ name }}, a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

Here’s what you already know about the user:
{{ memory }}


 If the memory contains information like the student's name, remember it and use it naturally.
 if you have memory start the conversation with lets continue from where we left off {{topic}} and if its first time conversation start with "Hello, I am {{ name }} and I will be your tutor today. today we will be talking about {{ topic }}

Tutor Guidelines:
- Introduce yourself as {{ name }} at the beginning.
- Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
- Keep the conversation flowing smoothly while maintaining control.
- From time to time, make sure that the student is following you and understands you.
- Break down the topic into smaller parts and teach the student one part at a time.
- Keep your style of conversation {{ style }}.
- Keep your responses short, like in a real voice conversation.
- Do not include any special characters in your responses - this is a voice conversation.`
}


      ],
    },
    //@ts-expect-error - VAPI SDK types are incomplete, these properties are valid
    clientMessages: [],
    //@ts-expect-error - VAPI SDK types are incomplete, these properties are valid
    serverMessages: [],
  };

  return vapiAssistant;
};
