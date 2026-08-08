"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthButton } from "./GoogleAuthButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HoverButton from "../shared/HoverButton";
import ShimmerText from "../shared/ShimmerText";

export function LoginForm({ ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // better-auth throws this specific code (status 403) when
        // requireEmailVerification is true and the user hasn't verified yet.
        // It also auto-sends a fresh OTP via sendOnSignIn, so we just need
        // to send the user to the verify page to consume it.

        if (error.code === "EMAIL_NOT_VERIFIED") {
          toast.info("Please verify your email.");
          router.push(
            `/verify-email?email=${encodeURIComponent(values.email)}`,
          );
          return;
        }

        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful!");

      const userRole = (data?.user as User)?.role;

      if (userRole === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-8 sm:p-10 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]"
      {...props}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
          ★ MEMBER PORTAL
        </div>
        <h2 className="text-3xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-tight">
          LOGIN TO YOUR ACCOUNT
        </h2>
        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">
          Enter your credentials below to access your dashboard
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white block">
                  EMAIL ADDRESS
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Input
                      placeholder="your@email.com"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-11 rounded-lg text-sm font-medium pl-9 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                    PASSWORD
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-black dark:text-white hover:underline font-extrabold uppercase decoration-2 decoration-[#ff597b]"
                  >
                    FORGOT PASSWORD?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-11 rounded-lg text-sm font-medium pl-9 pr-10 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-black dark:text-white hover:opacity-70 transition-opacity"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        <Eye className="h-4 w-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 font-bold" />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              {isLoading ? "LOGGING IN..." : "LOGIN TO DASHBOARD ★"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Google Auth */}
      <GoogleAuthButton className="mt-6 w-full" mode="login" />

      {/* Footer */}
      <p className="text-xs font-extrabold text-center text-zinc-900 dark:text-zinc-100 uppercase mt-6">
        DON'T HAVE AN ACCOUNT?{" "}
        <Link
          href="/register"
          className="text-black dark:text-white underline decoration-2 decoration-[#00f0ff] hover:bg-[#00f0ff] hover:text-black px-1 rounded transition-colors"
        >
          REGISTER HERE
        </Link>
      </p>
    </div>
  );
}
