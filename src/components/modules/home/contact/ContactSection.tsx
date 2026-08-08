"use client";

import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn UI Components Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import { contactSchema, ContactFormValues } from "@/lib/validation";
import { toast } from "sonner";
import { PERSONAL_INFO } from "@/utils/constants";
import SocialIcons from "../../shared/SocialIcons";
import { useInView } from "react-intersection-observer";
import {
  initialContactFormState,
  submitContactAction,
} from "@/actions/contact.action";

function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
    >
      {pending ? "SENDING MESSAGE..." : "SEND MESSAGE ★"}
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(
    submitContactAction,
    initialContactFormState,
  );

  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      reset();
      return;
    }

    toast.error(state.message);
  }, [reset, state.message, state.success]);

  const validateBeforeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (form.formState.isValid) return;

    event.preventDefault();
    void form.trigger();
  };

  return (
    <section ref={ref} className="container-custom pt-28 pb-24 sm:pt-36 sm:pb-28 border-b-3 border-black dark:border-zinc-700">
      <div className="mb-10">
        <div className="inline-block bg-[#ff597b] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
          ★ GET IN TOUCH
        </div>
        <h2 className="text-4xl sm:text-6xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-none max-w-2xl">
          LET'S START A <span className="inline-block bg-[#00f0ff] text-black px-2.5 py-0.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] -rotate-1">PROJECT TOGETHER</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ─── Left Column (Form) ─── */}
        <div className="lg:col-span-7 w-full bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
          <Form {...form}>
            <form
              action={formAction}
              onSubmit={validateBeforeSubmit}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                      YOUR FULL NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                      />
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
                      YOUR EMAIL ADDRESS
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="hello@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                      YOUR MESSAGE
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your amazing project..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-bold" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <ContactSubmitButton />
              </div>
            </form>
          </Form>
        </div>

        {/* ─── Right Column (Profile Info Card) ─── */}
        <div className="lg:col-span-5 w-full">
          <div className="w-full bg-[#FFFDF5] dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-6 sm:p-8 flex flex-col items-start shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#00f0ff]">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b5ff6d] text-black border-2 border-black rounded-md shadow-[2px_2px_0px_0px_#000] mb-6 -rotate-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
              </span>

              <span className="text-xs font-black uppercase tracking-wider">
                AVAILABLE FOR NEW PROJECTS
              </span>
            </div>

            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-3 border-black bg-zinc-100 shadow-[3px_3px_0px_0px_#000] mb-4">
              <Image
                src={PERSONAL_INFO?.profileImage}
                alt="Ishtiaq Robin"
                width={100}
                height={100}
                priority
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-black font-clash uppercase tracking-tight text-black dark:text-white mb-2">
              ISHTIAQ ROBIN
            </h3>

            <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-bold mb-6 border-l-3 border-black dark:border-zinc-400 pl-3">
              My inbox is always open. Whether you have a breakthrough project idea or just want to connect, feel free to drop a message!
            </p>

            <div className="w-full pt-4 border-t-2 border-dashed border-black dark:border-zinc-700">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
