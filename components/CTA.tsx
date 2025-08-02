
import Image from "next/image";
import Link from "next/link";
// import Spline from '@splinetool/react-spline/next';

const Cta = () => {

  return (
    <section className="w-full px-6 py-12 bg-black text-white relative rounded-3xl overflow-hidden max-w-lg mx-auto flex flex-col items-center text-center gap-6">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[80%] bg-[#93cf2f]/20 blur-2xl rounded-full pointer-events-none z-0" />
            {/* <Spline
        scene="https://prod.spline.design/ba0AuQwcNra-raCd/scene.splinecode" 
      /> */}
      {/* <Spline
        scene="https://prod.spline.design/uNKlMIrv7BOh2izZ/scene.splinecode" 
      /> */}
      <div className="text-xl font-semibold text-[#93cf2f] px-4 py-1 rounded-full z-10">
        "Start learning your way"
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold leading-snug z-10">
        Build and Personalize Your Learning Companion
      </h2>

      {/* Subtext */}
      <p className="text-gray-300 max-w-xl z-10">
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>

      {/* CTA Button */}
      <Link href="/companions/new" className="z-10">
        <button className="flex items-center gap-2 bg-[#93cf2f] hover:bg-[#addb53] text-black font-semibold px-5 py-3 rounded-full transition">
          <Image src="/icons/plus.svg" alt="plus" width={14} height={14} />
          <span>Build a New Companion</span>
        </button>
      </Link>
    </section>
  );
};
export default Cta;
