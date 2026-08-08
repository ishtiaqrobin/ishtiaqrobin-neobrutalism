
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { toast } from "sonner";
import Image from "next/image";
import GoogleLogo from "@/assets/images/icon/google_icon.png";
import HoverButton from "../shared/HoverButton";

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
    <HoverButton
      type="button"
      onClick={handleGoogleAuth}
      loading={isLoading}
      className={className || "w-full justify-center"}
    >
      <span className="flex items-center justify-center gap-2">
        <Image
          alt="Google"
          src={GoogleLogo}
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
        />
        {mode === "login" ? "Login" : "Sign up"} with Google
      </span>
    </HoverButton>
  );
}
