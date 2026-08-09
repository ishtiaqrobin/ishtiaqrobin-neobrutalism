import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Eye,
  Lock,
  Share2,
  UserCheck,
  Mail,
  Clock,
  Globe,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Ishtiaq Robin's portfolio, detailing how we protect and manage your data.",
  keywords: [
    "Ishtiaq Robin",
    "Privacy Policy",
    "Data Protection",
    "AI-Driven Software Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/privacy-policy",
    title: "Privacy Policy — Ishtiaq Robin",
    description:
      "Privacy policy for Ishtiaq Robin's portfolio, detailing how we protect and manage your data.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Ishtiaq Robin",
    description:
      "Privacy policy for Ishtiaq Robin's portfolio, detailing how we protect and manage your data.",
    images: ["/twitter-image.jpg"],
  },
};

const PrivacyPolicyPage = () => {
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
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black p-3 shadow-[3px_3px_0px_0px_#000]">
            <Shield className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h1 className="mb-4 text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
            PRIVACY POLICY ★
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg font-bold text-zinc-700 dark:text-zinc-300">
            At Ishtiaq Robin Portfolio, we value your privacy. This policy
            explains how we handle your personal data when you interact with our
            platform.
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
            {/* 1. Overview */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Globe className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    1. INTRODUCTION & SCOPE
                  </h2>
                  <p className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Ishtiaq Robin (&quot;we,&quot; &quot;us,&quot; or
                    &quot;our&quot;) is an AI-Driven Software Engineer. This
                    Privacy Policy outlines our commitment to protecting the
                    personal information of our clients, users, and website
                    visitors (&quot;you&quot;). By using our services or
                    browsing our portfolio, you consent to the data practices
                    described in this statement.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 2. Information Collection */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Eye className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    2. INFORMATION WE COLLECT
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-2 font-black uppercase text-xs text-black dark:text-white">
                        A. INFORMATION PROVIDED BY YOU
                      </h3>
                      <p className="mb-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        We collect information you provide directly to us when
                        creating an account, submitting a contact form, leaving
                        a review, or communicating with us:
                      </p>
                      <ul className="grid grid-cols-1 gap-2 text-xs font-bold text-black dark:text-white sm:grid-cols-2">
                        {[
                          "Full name and email address",
                          "Account credentials (email, password)",
                          "Project requirements and messages",
                          "Testimonials and review submissions",
                          "Profile information and preferences",
                          "Communication history via contact form",
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 rounded-lg border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 px-3 py-2 shadow-[2px_2px_0px_0px_#000]"
                          >
                            <span className="w-2 h-2 rounded-sm bg-[#00f0ff]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-black uppercase text-xs text-black dark:text-white">
                        B. AUTOMATICALLY COLLECTED INFORMATION
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        When you access our platform, we automatically collect
                        certain technical information, including your IP
                        address, browser type, device information, referring
                        URLs, and usage patterns through cookies and similar
                        tracking technologies. We use Vercel Analytics and
                        Vercel Speed Insights for anonymous performance and
                        usage monitoring.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-black uppercase text-xs text-black dark:text-white">
                        C. RESUME DOWNLOAD TRACKING
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        When you download our resume, we log your IP address,
                        country of origin, and user agent for analytics
                        purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 3. Use of Information */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b5ff6d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <UserCheck className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    3. HOW WE USE YOUR DATA
                  </h2>
                  <p className="mb-4 font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Your information allows us to provide a safe and effective
                    experience. Specifically, we use it to:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Respond to your inquiries and project requests",
                      "Deliver software development services",
                      "Manage user accounts and authentication",
                      "Improve our portfolio and user experience",
                      "Analyze site traffic and performance",
                      "Provide dedicated client support",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 rounded-xl border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-3 text-xs font-black uppercase text-black dark:text-white shadow-[2px_2px_0px_0px_#000]"
                      >
                        <div className="h-2 w-2 rounded-sm bg-[#b5ff6d] border border-black shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 4. Data Sharing */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Share2 className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    4. INFORMATION SHARING
                  </h2>
                  <p className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    We do not sell your personal data. We share your information
                    only with your consent or as necessary to provide our
                    services. This includes sharing data with trusted
                    third-party service providers:
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {[
                      "Vercel (hosting and analytics)",
                      "Cloudinary (image storage)",
                      "Better Auth (authentication)",
                      "PostgreSQL database (data storage)",
                    ].map((provider, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border-2 border-black dark:border-zinc-300 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-mono font-bold text-black dark:text-white shadow-[2px_2px_0px_0px_#000]"
                      >
                        ★ {provider}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 5. Data Security */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Lock className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    5. DATA SECURITY & RETENTION
                  </h2>
                  <p className="mb-4 leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    We implement industry-standard security measures, including
                    SSL encryption, secure server protocols, and password
                    hashing (bcrypt), to protect your data. We retain your
                    personal information only as long as necessary to fulfill
                    the purposes outlined in this policy or as required by law.
                  </p>
                  <div className="rounded-xl border-2.5 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000]">
                    <p className="flex items-center gap-2 font-black uppercase text-xs text-black dark:text-white">
                      <Clock className="h-4 w-4 text-[#ff597b] stroke-[2.5]" />
                      RETENTION POLICY ★
                    </p>
                    <p className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                      Active account data is kept as long as the account is
                      active. Deleted account data is anonymized or purged
                      within 30 days, except where legal obligations require
                      longer retention. Contact form submissions are retained
                      for service history and may be deleted upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 6. Your Rights */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Shield className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    6. YOUR DATA RIGHTS
                  </h2>
                  <p className="mb-4 font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Depending on your jurisdiction (e.g., GDPR in the EU, CCPA
                    in California), you may have the following rights regarding
                    your personal data:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      "Right to access your personal data",
                      "Right to rectification of inaccurate data",
                      "Right to erasure (right to be forgotten)",
                      "Right to restrict processing",
                      "Right to data portability",
                      "Right to object to processing",
                      "Right to withdraw consent at any time",
                      "Right to lodge a complaint with authority",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-bold text-black dark:text-white shadow-[2px_2px_0px_0px_#000]"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] border border-black shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs font-bold text-zinc-500">
                    To exercise any of these rights, please contact us using the
                    information below.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 7. Contact */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b5ff6d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Mail className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="w-full">
                  <h2 className="mb-4 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    7. CONTACT OUR PRIVACY TEAM
                  </h2>
                  <p className="mb-6 leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    If you have any questions about this Privacy Policy or wish
                    to exercise your data rights (access, correction, or
                    deletion), please reach out to us:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border-2 border-black dark:border-zinc-300 bg-[#FFFDF5] dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000]">
                      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        EMAIL SUPPORT
                      </p>
                      <a
                        href="mailto:ishtiaqrobin.me@gmail.com"
                        className="mt-1 font-mono font-black text-sm text-black dark:text-white hover:underline block"
                      >
                        ishtiaqrobin.me@gmail.com
                      </a>
                    </div>
                    <div className="rounded-xl border-2 border-black dark:border-zinc-300 bg-[#FFFDF5] dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000]">
                      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        LOCATION
                      </p>
                      <p className="mt-1 font-black text-sm text-black dark:text-white uppercase">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
