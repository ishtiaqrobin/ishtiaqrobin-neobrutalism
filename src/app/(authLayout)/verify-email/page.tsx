"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (error) {
        toast.error(error.message || "Verification failed");
        return;
      }

      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (error) {
        toast.error(error.message || "Failed to resend OTP");
        return;
      }

      toast.success("OTP resent to your email");
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
          ★ ALMOST THERE
        </div>
        <h2 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-none">
          VERIFY YOUR EMAIL
        </h2>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-2 border-l-4 border-black pl-2">
          We&apos;ve sent a 6-digit verification code to <span className="font-mono text-black dark:text-white font-black">{email}</span>.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="space-y-1">
          <Input
            type="text"
            placeholder="000000"
            className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-12 rounded-lg text-2xl tracking-[1em] font-mono font-black text-center transition-all focus:shadow-[3px_3px_0px_0px_#000]"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            disabled={isLoading}
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer"
          >
            {isLoading ? "VERIFYING..." : "VERIFY EMAIL ★"}
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t-2 border-black flex flex-col items-center gap-3">
        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResendOtp}
            disabled={isResending || isLoading}
            className="text-black dark:text-white underline decoration-2 decoration-[#00f0ff] font-black uppercase cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
          >
            {isResending ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                RESENDING...
              </>
            ) : (
              "RESEND CODE ★"
            )}
          </button>
        </p>
        <Link
          href="/login"
          className="text-xs font-black uppercase tracking-wider text-black dark:text-white hover:underline"
        >
          BACK TO LOGIN
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Suspense
        fallback={
          <Card className="w-full max-w-lg mx-auto border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000]">
            <CardContent className="flex items-center justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-black" />
            </CardContent>
          </Card>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
