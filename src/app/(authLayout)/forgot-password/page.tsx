
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "forget-password",
      });

      if (error) {
        toast.error(error.message || "Failed to send reset code");
        return;
      }

      toast.success("Reset code sent to your email!");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
            ★ PASSWORD RECOVERY
          </div>
          <h2 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-none">
            FORGOT PASSWORD?
          </h2>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-2 border-l-4 border-black pl-2">
            Enter your registered email address to receive a 6-digit verification code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
              EMAIL ADDRESS
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-9 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full bg-[#00f0ff] text-black hover:bg-[#00d0df] font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer"
            >
              {isLoading ? "SENDING CODE..." : "SEND RESET CODE ★"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-black">
          <Link
            href="/login"
            className="flex items-center justify-center text-xs font-black uppercase tracking-wider text-black dark:text-white hover:underline"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 stroke-[3]" />
            BACK TO LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
