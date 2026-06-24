import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[52px] w-full rounded-lg border bg-card px-4 py-3 text-[15px] font-[var(--font-body)] shadow-sm transition-all duration-200",
          "border-input placeholder:text-muted-foreground",
          "hover:border-[var(--gold)]/40",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] focus-visible:border-[var(--gold)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          error && "border-destructive focus-visible:outline-destructive",
          className,
        )}
        ref={ref}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
