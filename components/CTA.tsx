import Link from "next/link";
import React from "react";

const constant = ["Build a personalized learning experience", " with our LMS."];
const CTA = () => {
  return (
    <div className="cta-section bg-[#1f1f1f]">
      <div className="cta-badge">Start learning your way.</div>

      <h2 className="text-3xl font-bold">
        Build a Personalize Learning Companion
      </h2>

      <p className="text-sm text-center text-gray-300 px-2">
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>

      <div className="grid grid-cols-3 gap-4 justify-items-center py-2">
        {/* <img src="/icons/flask.png" alt="Science" className="w-8 h-8" />
        <img src="/icons/code.png" alt="Code" className="w-8 h-8" />
        <img src="/icons/math.png" alt="Math" className="w-8 h-8" />
        <img src="/icons/cap.png" alt="Learning" className="w-8 h-8" />
        <img src="/icons/group.png" alt="Group" className="w-8 h-8" />
        <img src="/icons/chat.png" alt="Chat" className="w-8 h-8" /> */}
      </div>
      <button className="btn-primary">
        <Link href={"/companions/new"}>
          <p>+ Build a new Companion</p>
        </Link>
      </button>
    </div>
  );
};

export default CTA;
