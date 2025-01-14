import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  onValueChange?: (value: string) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onValueChange, ...props }, ref) => {
    const [value, setValue] = React.useState(props.defaultValue || "");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      requestAnimationFrame(() => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      });
      const newValue = e.target.value;
      setValue(newValue);
      onValueChange?.(newValue);
    };
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full resize-none overflow-hidden rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        value={value}
        onInput={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
