
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to reset password");
        return;
      }

      toast.success("Password reset successful!");
      router.push("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("An error occurred during password reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
          ★ SECURE RESET
        </div>
        <h2 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-none">
          RESET PASSWORD
        </h2>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-2 border-l-4 border-black pl-2">
          Enter the 6-digit code sent to <span className="font-mono text-black dark:text-white font-black">{email}</span> and your new password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleReset} className="space-y-4">
        {/* OTP Field */}
        <div className="space-y-1">
          <Label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
            VERIFICATION CODE (OTP)
          </Label>
          <Input
            id="otp"
            type="text"
            placeholder="000000"
            className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-12 rounded-lg text-xl tracking-[0.5em] font-mono font-black text-center transition-all focus:shadow-[3px_3px_0px_0px_#000]"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            disabled={isLoading}
            required
          />
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <Label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
            NEW PASSWORD
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-9 pr-10 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-black dark:text-white cursor-pointer"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 stroke-[2.5]" />
              ) : (
                <Eye className="h-4 w-4 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <Label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
            CONFIRM NEW PASSWORD
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-9 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer"
          >
            {isLoading ? "RESETTING..." : "RESET PASSWORD ★"}
          </Button>
        </div>
      </form>

      {/* Footer */}
      <p className="text-xs font-bold text-center mt-6 pt-4 border-t-2 border-black">
        <Link
          href="/login"
          className="text-black dark:text-white underline decoration-2 decoration-[#00f0ff] font-black uppercase"
        >
          BACK TO LOGIN
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
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
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
