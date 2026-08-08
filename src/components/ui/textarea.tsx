import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-lg border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-base md:text-sm font-medium transition-all outline-none placeholder:text-zinc-400 focus:shadow-[4px_4px_0px_0px_#000] dark:focus:shadow-[4px_4px_0px_0px_#b5ff6d] focus:border-black dark:focus:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
