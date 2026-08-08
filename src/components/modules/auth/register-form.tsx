"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthButton } from "./GoogleAuthButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export function RegisterForm({ ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: process.env.FRONTEND_URL,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");

      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]"
      {...props}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
          ★ GET STARTED
        </div>
        <h2 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-none">
          CREATE AN ACCOUNT
        </h2>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-2 border-l-4 border-black pl-2">
          Enter your details below to create your portfolio member account
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  FULL NAME
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Input
                      placeholder="e.g. John Doe"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-9 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  EMAIL ADDRESS
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Input
                      placeholder="name@example.com"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-9 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
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
                <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  PASSWORD
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-9 pr-10 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
                      disabled={isLoading}
                      {...field}
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
              className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer"
            >
              {isLoading ? "REGISTERING..." : "REGISTER NOW ★"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Google Auth */}
      <GoogleAuthButton className="mt-4 w-full" mode="signup" />

      {/* Footer */}
      <p className="text-xs font-bold text-center text-black dark:text-white mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black dark:text-white underline decoration-2 decoration-[#00f0ff] font-black uppercase"
        >
          LOGIN HERE
        </Link>
      </p>
    </div>
  );
}
