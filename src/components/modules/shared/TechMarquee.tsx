import Link from "next/link";
import React from "react";
import { DiCss3 } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiPrisma,
  SiRedux,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiGo,
  SiFigma,
  SiFirebase,
  SiNginx,
  SiJavascript,
  SiVercel,
  SiPython,
  SiDjango,
  SiShadcnui,
  SiLaravel,
  SiPhp,
  SiCpanel,
  SiGit,
  SiGithub,
  SiGraphql,
  SiSupabase,
  SiBetterauth,
  SiHtml5,
  SiFramer,
  SiGsap,
} from "react-icons/si";

// Type definitions
interface TechLogo {
  node: React.ReactNode;
  title: string;
  href: string;
  color: string;
}

const techLogos: TechLogo[] = [
  {
    node: <SiHtml5 />,
    title: "HTML5",
    href: "https://html.spec.whatwg.org",
    color: "text-[#E34F26]",
  },
  {
    node: <DiCss3 />,
    title: "CSS3",
    href: "https://www.w3.org/Style/CSS",
    color: "text-[#1572B6]",
  },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    color: "text-[#F7DF1E]",
  },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
    color: "text-[#3178C6]",
  },
  {
    node: <SiReact />,
    title: "React",
    href: "https://react.dev",
    color: "text-[#61DAFB]",
  },
  {
    node: <SiNextdotjs />,
    title: "Next.js",
    href: "https://nextjs.org",
    color: "text-black dark:text-white",
  },
  {
    node: <SiRedux />,
    title: "Redux",
    href: "https://redux.js.org",
    color: "text-[#764ABC]",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
    color: "text-[#06B6D4]",
  },
  {
    node: <SiShadcnui />,
    title: "shadcn/ui",
    href: "https://ui.shadcn.com",
    color: "text-black dark:text-white",
  },
  {
    node: <SiFramer />,
    title: "Framer Motion",
    href: "https://framer.com/motion",
    color: "text-[#0055FF]",
  },
  {
    node: <SiGsap />,
    title: "GSAP",
    href: "https://gsap.com",
    color: "text-[#88CE02]",
  },
  {
    node: <SiNodedotjs />,
    title: "Node.js",
    href: "https://nodejs.org",
    color: "text-[#339933]",
  },
  {
    node: <SiExpress />,
    title: "Express",
    href: "https://expressjs.com",
    color: "text-neutral-500 dark:text-neutral-300",
  },
  {
    node: <SiMongodb />,
    title: "MongoDB",
    href: "https://mongodb.com",
    color: "text-[#47A248]",
  },
  {
    node: <SiMysql />,
    title: "MySQL",
    href: "https://mysql.com",
    color: "text-[#4479A1]",
  },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://postgresql.org",
    color: "text-[#4169E1]",
  },
  {
    node: <SiPrisma />,
    title: "Prisma",
    href: "https://prisma.io",
    color: "text-[#2D3748] dark:text-white",
  },
  {
    node: <SiGraphql />,
    title: "GraphQL",
    href: "https://graphql.org",
    color: "text-[#E10098]",
  },
  {
    node: <SiFirebase />,
    title: "Firebase",
    href: "https://firebase.google.com",
    color: "text-[#FFCA28]",
  },
  {
    node: <SiSupabase />,
    title: "Supabase",
    href: "https://supabase.com",
    color: "text-[#3ECF8E]",
  },
  {
    node: <SiBetterauth />,
    title: "BetterAuth",
    href: "https://better-auth.com",
    color: "text-[#6C47FF]",
  },
  {
    node: <SiDocker />,
    title: "Docker",
    href: "https://docker.com",
    color: "text-[#2496ED]",
  },
  {
    node: <SiNginx />,
    title: "Nginx",
    href: "https://nginx.org",
    color: "text-[#009639]",
  },
  {
    node: <FaAws />,
    title: "AWS",
    href: "https://aws.amazon.com",
    color: "text-[#FF9900]",
  },
  {
    node: <SiGo />,
    title: "Golang",
    href: "https://go.dev",
    color: "text-[#00ADD8]",
  },
  {
    node: <SiPython />,
    title: "Python",
    href: "https://python.org",
    color: "text-[#3776AB]",
  },
  {
    node: <SiDjango />,
    title: "Django",
    href: "https://djangoproject.com",
    color: "text-[#092E20] dark:text-[#44B78B]",
  },
  {
    node: <SiLaravel />,
    title: "Laravel",
    href: "https://laravel.com",
    color: "text-[#FF2D20]",
  },
  {
    node: <SiPhp />,
    title: "PHP",
    href: "https://php.net",
    color: "text-[#777BB4]",
  },
  {
    node: <SiCpanel />,
    title: "cPanel",
    href: "https://cpanel.net",
    color: "text-[#FF6600]",
  },
  {
    node: <SiFigma />,
    title: "Figma",
    href: "https://figma.com",
    color: "text-[#F24E1E]",
  },
  {
    node: <SiGit />,
    title: "Git",
    href: "https://git-scm.com",
    color: "text-[#F05032]",
  },
  {
    node: <SiGithub />,
    title: "GitHub",
    href: "https://github.com",
    color: "text-black dark:text-white",
  },
  {
    node: <SiVercel />,
    title: "Vercel",
    href: "https://vercel.com",
    color: "text-black dark:text-white",
  },
];

export default function TechMarquee() {
  //   Infinite loop trick: duplicate the array and push it twice
  const doubledLogos = [...techLogos, ...techLogos];

  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="marquee-container relative w-full flex overflow-hidden">
        <div className="animate-marquee flex flex-row items-center gap-4 whitespace-nowrap pr-12 will-change-transform">
          {doubledLogos.map((logo, index) => (
            <Link
              key={index}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-300 shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all group"
            >
              <div
                className={`${logo.color} transition-transform duration-200 group-hover:scale-110 text-xl`}
              >
                {logo.node}
              </div>

              {/* Brand Title */}
              <span className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                {logo.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
