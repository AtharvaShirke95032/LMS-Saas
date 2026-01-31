// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState } from "react";

import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { subjectsColors } from "@/constants";
type SubjectType = keyof typeof subjectsColors;

export const FollowerPointerCard = ({
  children,
  className,
  title,
  subject
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  subject?:string
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState<boolean>(false); // Add this line

  useEffect(() => {
    if (ref.current) {
      ref.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (ref.current) {
  const currentRect = ref.current.getBoundingClientRect();
  x.set(e.clientX - currentRect.left);
  y.set(e.clientY - currentRect.top);
}
  };
  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };
  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{
        cursor: "none",
      }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title}  subject={(subject as SubjectType) ?? "default"} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  subject
}: {
  x: number;
  y: number;
  title?: string | React.ReactNode;
  subject:string
}) => {

  
  const colors = [
    "#0ea5e9",
    "#737373",
    "#14b8a6",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#eab308",
  ];
  return (
    
    <motion.div
      className="absolute z-[9999] h-4 w-4 rounded-full"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>

     
     {title?(
        <motion.div
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],

          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="min-w-max rounded-full px-2 py-2 text-xs whitespace-nowrap text-white"
        >
          {title}
        </motion.div>
      ):(<motion.div
          style={{
            backgroundColor: subjectsColors[subject as keyof typeof subjectsColors] ??
            subjectsColors.default,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="min-w-max rounded-full px-2 py-2 text-xs whitespace-nowrap text-black"
        >
          {subject}
        </motion.div>)}
      
    </motion.div>
  );
};
