
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { toast } from "sonner";
import Image from "next/image";
import GoogleLogo from "@/assets/images/icon/google_icon.png";
import { Button } from "@/components/ui/button";

interface GoogleAuthButtonProps {
  mode?: "login" | "signup";
  className?: string;
  callbackURL?: string;
}

export function GoogleAuthButton({
  mode = "login",
  className,
  callbackURL,
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:
          callbackURL || `${env.NEXT_PUBLIC_APP_URL}/user-dashboard`,
      });
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error(`Google ${mode} failed`);
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      size="lg"
      className={className || "w-full justify-center bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] hover:bg-[#b5ff6d] hover:text-black transition-all cursor-pointer"}
    >
      <span className="flex items-center justify-center gap-2">
        <Image
          alt="Google"
          src={GoogleLogo}
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
        />
        {isLoading
          ? "CONNECTING..."
          : `${mode === "login" ? "LOGIN" : "SIGN UP"} WITH GOOGLE ★`}
      </span>
    </Button>
  );
}
