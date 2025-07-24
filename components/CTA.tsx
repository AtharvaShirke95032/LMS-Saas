import React from 'react'

const constant = [
  "Build a personalized learning experience",
  " with our LMS."
]
const CTA = () => {
  return (
    <div className="cta-section bg-[#1f1f1f]">
      <div className="text-sm text-center text-black font-medium bg-yellow-400 px-3 py-2 rounded-full w-fit mx-auto">
        Start learning your way.
      </div>

      <h2 className="text-xl font-semibold text-center">
        Build a Personalize Learning Companion
      </h2>

      <p className="text-sm text-center text-gray-300 px-2">
        Pick a name, subject, voice, & personality — and start learning through voice
        conversations that feel natural and fun.
      </p>

      <div className="grid grid-cols-3 gap-4 justify-items-center py-2">
        {/* <img src="/icons/flask.png" alt="Science" className="w-8 h-8" />
        <img src="/icons/code.png" alt="Code" className="w-8 h-8" />
        <img src="/icons/math.png" alt="Math" className="w-8 h-8" />
        <img src="/icons/cap.png" alt="Learning" className="w-8 h-8" />
        <img src="/icons/group.png" alt="Group" className="w-8 h-8" />
        <img src="/icons/chat.png" alt="Chat" className="w-8 h-8" /> */}
      </div>
    </div>
  );
}

export default CTA
