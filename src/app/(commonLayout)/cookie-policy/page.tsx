import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Cookie,
  Settings,
  Info,
  ShieldCheck,
  MousePointer2,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
  keywords: [
    "Ishtiaq Robin",
    "Cookie Policy",
    "Cookie Usage",
    "AI-Driven Software Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/cookie-policy",
    title: "Cookie Policy — Ishtiaq Robin",
    description:
      "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cookie Policy — Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy — Ishtiaq Robin",
    description:
      "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
    images: ["/twitter-image.jpg"],
  },
};

const CookiePolicyPage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FFFDF5] dark:bg-zinc-950 border-b-3 border-black dark:border-zinc-700 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#ff597b] text-black border-2 border-black p-3 shadow-[3px_3px_0px_0px_#000]">
            <Cookie className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h1 className="mb-4 text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
            COOKIE POLICY ★
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg font-bold text-zinc-700 dark:text-zinc-300">
            We use cookies to enhance your browsing experience, provide
            personalized features, and analyze our traffic.
          </p>
          <div className="mt-6 inline-block rounded-full bg-[#b5ff6d] text-black border-2 border-black px-4 py-1.5 font-mono font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
            LAST UPDATED: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-12">
            {/* 1. What are Cookies */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Info className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    1. WHAT ARE COOKIES?
                  </h2>
                  <p className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Cookies are small data files that are placed on your
                    computer or mobile device when you visit a website. Cookies
                    are widely used by website owners in order to make their
                    websites work, or to work more efficiently, as well as to
                    provide reporting information.
                  </p>
                  <p className="mt-3 leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Cookies set by the website owner (in this case, Ishtiaq
                    Robin) are called &quot;first-party cookies.&quot; Cookies
                    set by parties other than the website owner are called
                    &quot;third-party cookies.&quot;
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 2. Why we use them */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    2. WHY DO WE USE COOKIES?
                  </h2>
                  <p className="mb-6 font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    We use only essential and analytical cookies. Some cookies
                    are required for technical reasons for our Website to
                    operate, and we refer to these as &quot;essential&quot; or
                    &quot;strictly necessary&quot; cookies. We do not use
                    marketing or advertising cookies.
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border-2.5 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
                      <h3 className="mb-2 font-black uppercase text-sm text-black dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-[#00f0ff]" />
                        ESSENTIAL COOKIES
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Required for core features like secure login, session
                        management, and account security. The platform cannot
                        function correctly without them. No consent is needed
                        for these cookies.
                      </p>
                    </div>
                    <div className="rounded-xl border-2.5 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
                      <h3 className="mb-2 font-black uppercase text-sm text-black dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-[#ff597b]" />
                        ANALYTICAL COOKIES
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Help us understand how users interact with our platform
                        by collecting anonymous usage data. This allows us to
                        improve site performance and user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 3. Detailed Cookie List */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b5ff6d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <MousePointer2 className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="w-full min-w-0">
                  <h2 className="mb-4 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    3. SPECIFIC COOKIES WE USE
                  </h2>
                  <div className="rounded-xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                    <Table>
                      <TableHeader className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black">
                        <TableRow className="border-b-2 border-black">
                          <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">COOKIE NAME</TableHead>
                          <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">PROVIDER</TableHead>
                          <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">PURPOSE</TableHead>
                          <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">DURATION</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y-2 divide-black/10 dark:divide-zinc-800 font-medium text-xs">
                        <TableRow className="hover:bg-[#00f0ff]/10">
                          <TableCell className="font-mono font-black text-black dark:text-white">
                            better-auth.session_token
                          </TableCell>
                          <TableCell className="font-bold">Ishtiaq Robin</TableCell>
                          <TableCell className="text-zinc-600 dark:text-zinc-300">
                            Authentication session management
                          </TableCell>
                          <TableCell className="font-mono font-bold">Session</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-[#00f0ff]/10">
                          <TableCell className="font-mono font-black text-black dark:text-white">
                            _vercel_analytics_*
                          </TableCell>
                          <TableCell className="font-bold">Vercel Analytics</TableCell>
                          <TableCell className="text-zinc-600 dark:text-zinc-300">
                            Anonymous page view and usage analytics
                          </TableCell>
                          <TableCell className="font-mono font-bold">Session</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <p className="mt-4 text-xs font-bold text-zinc-500">
                    We do not use marketing, advertising, or third-party
                    tracking cookies. No personal data is sold or shared with
                    advertisers.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 4. How to control cookies */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Settings className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    4. HOW TO MANAGE COOKIES?
                  </h2>
                  <p className="mb-6 leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Most web browsers allow you to control cookies through their
                    settings. However, if you limit the ability of websites to
                    set essential cookies, some features of our platform may not
                    function properly.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        name: "Google Chrome",
                        url: "https://support.google.com/chrome/answer/95647",
                      },
                      {
                        name: "Apple Safari",
                        url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471",
                      },
                      {
                        name: "Mozilla Firefox",
                        url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
                      },
                      {
                        name: "Microsoft Edge",
                        url: "https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd",
                      },
                    ].map((browser, index) => (
                      <a
                        key={index}
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 px-4 py-3 shadow-[2px_2px_0px_0px_#000] hover:bg-[#00f0ff] hover:text-black transition-colors group cursor-pointer"
                      >
                        <span className="text-xs font-black uppercase text-black dark:text-white group-hover:text-black">
                          {browser.name}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 5. Contact */}
            <div className="rounded-2xl bg-[#b5ff6d] text-black border-3 border-black p-8 text-center shadow-[6px_6px_0px_0px_#000]">
              <HelpCircle className="mx-auto mb-3 h-10 w-10 stroke-[2.5]" />
              <h2 className="mb-2 text-2xl font-clash font-black uppercase">
                NEED MORE CLARITY? ★
              </h2>
              <p className="mb-6 font-bold text-xs uppercase max-w-md mx-auto text-black/80">
                If you have any questions about our use of cookies or other
                technologies, please email us directly.
              </p>
              <a
                href="mailto:ishtiaqrobin.me@gmail.com"
                className="inline-flex items-center justify-center rounded-xl bg-black text-white hover:bg-zinc-800 border-2 border-black px-8 py-3 text-xs font-black uppercase shadow-[3px_3px_0px_0px_#000] transition-all cursor-pointer"
              >
                CONTACT SUPPORT ★
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicyPage;
