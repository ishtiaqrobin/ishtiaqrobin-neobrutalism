import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  UserPlus,
  CreditCard,
  Scale,
  AlertCircle,
  RefreshCcw,
  Handshake,
  Zap,
  Shield,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Comprehensive terms and conditions for using Ishtiaq Robin's software engineering services.",
  keywords: [
    "Ishtiaq Robin",
    "Terms of Service",
    "Terms and Conditions",
    "AI-Driven Software Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/terms-of-service",
    title: "Terms of Service — Ishtiaq Robin",
    description:
      "Comprehensive terms and conditions for using Ishtiaq Robin's software engineering services.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of Service — Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Ishtiaq Robin",
    description:
      "Comprehensive terms and conditions for using Ishtiaq Robin's software engineering services.",
    images: ["/twitter-image.jpg"],
  },
};

const TermsOfServicePage = () => {
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
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#b5ff6d] text-black border-2 border-black p-3 shadow-[3px_3px_0px_0px_#000]">
            <FileText className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h1 className="mb-4 text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
            TERMS OF SERVICE ★
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg font-bold text-zinc-700 dark:text-zinc-300">
            Please read these terms carefully before engaging with our software
            engineering services. They outline your rights and obligations as a
            client of Ishtiaq Robin.
          </p>
          <div className="mt-6 inline-block rounded-full bg-[#00f0ff] text-black border-2 border-black px-4 py-1.5 font-mono font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
            EFFECTIVE DATE: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-12">
            {/* 1. Acceptance of Terms */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Handshake className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    1. ACCEPTANCE OF TERMS
                  </h2>
                  <p className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    By accessing this portfolio or engaging Ishtiaq Robin for
                    software engineering services, you agree to be bound by
                    these Terms of Service. If you are representing a company,
                    you warrant that you have the authority to bind that company
                    to these terms. If you do not agree, you must not use our
                    services.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 2. User Accounts */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <UserPlus className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    2. ACCOUNT REGISTRATION & SECURITY
                  </h2>
                  <p className="mb-4 leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    To access certain features, you must create an account. You
                    agree to provide accurate, current, and complete information
                    and to keep your login credentials confidential. You are
                    responsible for all activity under your account.
                  </p>
                  <ul className="space-y-2.5 text-xs font-bold text-black dark:text-white">
                    {[
                      "Clients must provide accurate project requirements and feedback.",
                      "Source code ownership is transferred only upon full payment.",
                      "We reserve the right to showcase completed work in our portfolio unless an NDA is signed.",
                      "You may delete your account at any time; data will be handled per our Privacy Policy.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2.5 rounded-lg border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-3 shadow-[2px_2px_0px_0px_#000]"
                      >
                        <Zap className="h-4 w-4 shrink-0 text-[#ff597b] stroke-[2.5]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 3. Platform Conduct */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <AlertCircle className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    3. CONDUCT & SAFETY
                  </h2>
                  <p className="mb-4 font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Ishtiaq Robin maintains a professional environment. Users
                    are prohibited from:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      "Harassing or abusing other users",
                      "Sharing inappropriate content",
                      "Bypassing platform payments",
                      "Spamming or automated scraping",
                      "Impersonating another person",
                      "Violating IP rights",
                      "Submitting false reviews",
                      "Compromising site security",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-bold text-black dark:text-white shadow-[2px_2px_0px_0px_#000]"
                      >
                        <div className="h-2 w-2 rounded-sm bg-red-500 border border-black shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 4. Intellectual Property */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b5ff6d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Scale className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    4. INTELLECTUAL PROPERTY
                  </h2>
                  <p className="mb-4 font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    All source code, designs, and deliverables created by
                    Ishtiaq Robin remain the property of Ishtiaq Robin until
                    full payment is received. Upon full payment, the client
                    receives full ownership of the final deliverables.
                  </p>
                  <div className="rounded-xl border-2.5 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000]">
                    <h3 className="mb-2 flex items-center gap-2 font-black uppercase text-xs text-black dark:text-white">
                      <RefreshCcw className="h-4 w-4 text-[#00f0ff] stroke-[2.5]" />
                      LICENSE & OWNERSHIP ★
                    </h3>
                    <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      Ishtiaq Robin retains the right to reuse generalized
                      code, libraries, and frameworks developed prior to or
                      outside of the engagement. Confidential business logic and
                      proprietary client code are not reused. Portfolio
                      showcase rights are retained unless a separate NDA
                      prohibits it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 5. Payments & Refunds */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <CreditCard className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    5. FINANCIAL TERMS
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-black uppercase text-xs text-black dark:text-white">
                        PAYMENTS
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        All payments for software engineering services are
                        processed securely. Clients agree to pay the agreed
                        project rate plus any applicable taxes at the time of
                        booking or milestone completion. Payment terms are
                        specified in the individual project agreement.
                      </p>
                    </div>
                    <div className="rounded-xl border-2.5 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-5 shadow-[4px_4px_0px_0px_#000]">
                      <h3 className="mb-2 flex items-center gap-2 font-black uppercase text-xs text-black dark:text-white">
                        <RefreshCcw className="h-4 w-4 text-[#ff597b] stroke-[2.5]" />
                        REFUND & CANCELLATION POLICY ★
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Cancellations made before work commences are eligible
                        for a full refund of any deposit. Once development work
                        has started, deposits are non-refundable to compensate
                        for time and resources spent. Partial refunds may be
                        considered on a case-by-case basis for incomplete
                        milestone deliverables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 6. Limitation of Liability */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Scale className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    6. DISCLAIMERS & LIABILITY
                  </h2>
                  <p className="mb-4 leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Ishtiaq Robin provides software engineering and development
                    services. While we strive for excellence, we do not
                    guarantee specific business results, revenue, or ROI from
                    our work. All services are provided on an &quot;as is&quot;
                    and &quot;as available&quot; basis.
                  </p>
                  <div className="rounded-xl border-2 border-black dark:border-zinc-300 bg-[#FFFDF5] dark:bg-zinc-900 p-4 shadow-[3px_3px_0px_0px_#000]">
                    <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 italic">
                      &quot;In no event shall Ishtiaq Robin be liable for any
                      indirect, incidental, special, consequential, or punitive
                      damages, including loss of profits, data, or business
                      opportunity.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 7. Confidentiality */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b5ff6d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Shield className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    7. CONFIDENTIALITY
                  </h2>
                  <p className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Ishtiaq Robin agrees to keep confidential all proprietary
                    information shared by the client for the purpose of project
                    delivery. This includes business logic, trade secrets,
                    source code, and strategic plans. Confidential information
                    will not be disclosed to third parties without prior
                    consent, except as required by law. A separate
                    non-disclosure agreement (NDA) can be signed upon request.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 8. AI & Chatbot Services */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Zap className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-clash font-black uppercase text-black dark:text-white">
                    8. AI CHATBOT & AUTOMATED SERVICES
                  </h2>
                  <p className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">
                    Our platform includes an AI-powered chatbot for informational
                    and support purposes. Conversations with the chatbot are not
                    logged or stored. The chatbot may provide inaccurate or
                    incomplete information and should not be relied upon for
                    critical decisions. Ishtiaq Robin disclaims all liability
                    arising from the use of AI-generated responses.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-black/20 dark:bg-zinc-800" />

            {/* 9. Governing Law */}
            <div className="rounded-2xl bg-[#00f0ff] text-black border-3 border-black p-8 text-center shadow-[6px_6px_0px_0px_#000]">
              <h2 className="mb-2 text-2xl font-clash font-black uppercase">
                QUESTIONS ABOUT THESE TERMS? ★
              </h2>
              <p className="mb-6 font-bold text-xs uppercase max-w-md mx-auto text-black/80">
                These terms are governed by the laws of Bangladesh. Any disputes
                shall be resolved through negotiation in good faith.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3">
                <a
                  href="mailto:ishtiaqrobin.me@gmail.com"
                  className="font-mono font-black text-xs uppercase underline bg-black text-white px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                >
                  ishtiaqrobin.me@gmail.com
                </a>
                <span className="font-black text-xs uppercase bg-white text-black px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  DHAKA, BANGLADESH
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
