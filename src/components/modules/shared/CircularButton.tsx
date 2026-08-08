import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function CircularButton() {
  // "LET'S TALK ★ " repeated 3 times to perfectly align text within SVG
  const text = "LET'S TALK ★ LET'S TALK ★ LET'S TALK ★ ";

  return (
    <div className="relative bg-[#FFFDF5] dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-full w-36 h-36 flex items-center justify-center group shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] transition-all duration-200">
      {/* 
        ─── Rotating text layer ───
      */}
      <div className="absolute p-1.5 inset-0 animate-spin-slow group-hover:animation-duration-[5s] transition-all ease-in-out">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-[8px] font-clash font-black tracking-[2.5px] fill-black dark:fill-white uppercase">
            <textPath href="#circlePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* 
        ─── Center CTA Arrow Button ───
      */}
      <Link
        href="/contact"
        className="relative flex items-center justify-center w-14 h-14 bg-[#b5ff6d] hover:bg-[#00f0ff] border-2.5 border-black rounded-full shadow-[2px_2px_0px_0px_#000] transition-all duration-300 group-hover:scale-110 cursor-pointer"
        title="Let's Talk"
      >
        <FiArrowUpRight className="w-5 h-5 text-black stroke-[3] transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </div>
  );
}
