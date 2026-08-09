"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useOptimistic,
  useTransition,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chatbotService } from "@/services/chatbot.service";
import type { IChatMessage } from "@/types/chatbot.type";
import ChatbotIcon from "./ChatbotIcon";
import { IoArrowUpOutline } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

// ── Session ID — persistent per browser tab ───────────────
const getSessionId = (): string => {
  const key = "chatbot_session_id";
  if (typeof window === "undefined") return crypto.randomUUID();
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
};

const WELCOME_MESSAGE: IChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Ishtiaq's assistant. Ask me anything about his skills, projects, or how to hire him!",
  timestamp: new Date(),
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, optimisticMessage: IChatMessage) => [
      ...currentMessages,
      optimisticMessage,
    ],
  );
  const [sessionId] = useState(getSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isPending) return;

    const userMsg: IChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setInput("");

    startTransition(async () => {
      addOptimisticMessage(userMsg);

      try {
        const { data, error } = await chatbotService.sendMessage({
          message: text,
          sessionId,
        });
        const assistantMessage: IChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: error
            ? error.message.includes("Too many requests")
              ? `⏳ ${error.message}`
              : "Sorry, something went wrong. Please try again."
            : data?.reply || "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        };

        setMessages((previousMessages) => [
          ...previousMessages,
          userMsg,
          assistantMessage,
        ]);
      } catch {
        setMessages((previousMessages) => [
          ...previousMessages,
          userMsg,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
            timestamp: new Date(),
          },
        ]);
      }
    });
  }, [addOptimisticMessage, input, isPending, sessionId, startTransition]);

  useEffect(() => {
    if (!isPending && isOpen) {
      inputRef.current?.focus();
    }
  }, [isPending, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    sessionStorage.removeItem("chatbot_session_id");
  };

  return (
    <>
      {/* ── Floating Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-40 sm:bottom-24 right-4 sm:right-7 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[600px] flex flex-col rounded-xl border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black dark:border-zinc-700 bg-[#b5ff6d] text-black font-black">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-1 rounded border border-black">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wide">
                    ROBIN'S AI BOT
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-white text-black hover:bg-zinc-100 border border-black"
                  onClick={handleReset}
                  title="Reset conversation"
                >
                  <RiDeleteBinLine className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-white text-black hover:bg-zinc-100 border border-black"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[400px] bg-[#FFFDF5] dark:bg-zinc-950">
              {optimisticMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2 items-end",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-md border-2 border-black flex items-center justify-center font-bold text-xs shrink-0 shadow-[1px_1px_0px_0px_#000]",
                      msg.role === "user"
                        ? "bg-[#00f0ff] text-black"
                        : "bg-[#ff597b] text-black",
                    )}
                  >
                    {msg.role === "user" ? "U" : "AI"}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      "max-w-[78%] px-3.5 py-2.5 rounded-lg border-2 border-black text-sm font-semibold leading-relaxed shadow-[2px_2px_0px_0px_#000]",
                      msg.role === "user"
                        ? "bg-[#00f0ff] text-black"
                        : "bg-white dark:bg-zinc-800 text-black dark:text-white",
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isPending && (
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 rounded-md border-2 border-black bg-[#ff597b] flex items-center justify-center font-bold text-xs text-black shadow-[1px_1px_0px_0px_#000]">
                    AI
                  </div>
                  <div className="bg-white dark:bg-zinc-800 border-2 border-black px-3.5 py-3 rounded-lg shadow-[2px_2px_0px_0px_#000]">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 rounded-sm bg-black dark:bg-white animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-sm bg-black dark:bg-white animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-sm bg-black dark:bg-white animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <div className="relative flex gap-2 items-center">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Ishtiaq..."
                  className="h-11 rounded-lg bg-zinc-50 dark:bg-zinc-950 border-2 border-black text-sm font-medium focus:shadow-[2px_2px_0px_0px_#000] pr-10"
                  disabled={isPending}
                  maxLength={500}
                />
                <Button
                  size="icon"
                  className={`absolute right-1 w-8 h-8 bg-[#b5ff6d] text-black border-2 border-black rounded shadow-[1px_1px_0px_0px_#000] hover:bg-[#a0f050]
                    ${!input.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  onClick={handleSend}
                  disabled={!input.trim() || isPending}
                >
                  {isPending ? (
                    <MdCheckBoxOutlineBlank className="h-4 w-4" />
                  ) : (
                    <IoArrowUpOutline className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Toggle Button ── */}
      <TooltipProvider delayDuration={300}>
        <Tooltip open={isOpen ? false : undefined}>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsOpen((prev) => !prev)}
              className={cn(
                "fixed bottom-24 sm:bottom-6 right-4 sm:right-7 z-50 transition-colors duration-200",
              )}
              aria-label={isOpen ? "Close chat" : "Open chat"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChatbotIcon />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Open Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Unread dot — show when closed and messages > 1 */}
      // #b5ff6d, #00f0ff, #ff597b
      {!isOpen && optimisticMessages.length > 1 && (
        <span className="fixed bottom-34 sm:bottom-17 right-4 sm:right-7 z-50 w-3 h-3 rounded-full bg-[#ff597b] border-2 border-background pointer-events-none" />
      )}
    </>
  );
}
