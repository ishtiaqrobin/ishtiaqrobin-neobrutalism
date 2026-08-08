import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-2 border-black dark:border-zinc-200 px-2.5 py-0.5 text-xs font-black uppercase tracking-wide w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 gap-1 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition-all",
  {
    variants: {
      variant: {
        default: "bg-[#b5ff6d] text-black",
        secondary: "bg-[#00f0ff] text-black",
        destructive: "bg-[#ff597b] text-black",
        outline: "bg-white dark:bg-zinc-900 text-black dark:text-white",
        ghost: "border-transparent shadow-none bg-transparent text-foreground",
        link: "border-0 shadow-none text-primary underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
