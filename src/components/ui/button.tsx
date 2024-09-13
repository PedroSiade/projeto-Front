import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import Spinner from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vendiz-light-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-vendiz-dark-950 dark:focus-visible:ring-offwhite",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        "destructive-outline":
          "text-destructive hover:text-destructive border border-transparent hover:border-destructive hover:opacity-70",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-primary-muted hover:text-primary-muted-foreground",
        "on-secondary":
          " bg-primary-muted text-primary-muted-foreground hover:bg-primary-muted/80 shadow-sm dark:bg-input dark:text-secondary-foreground dark:hover:bg-input/80",
        // ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: "text-foreground underline-offset-4 hover:underline",
        "primary-outline":
          "border text-primary border-primary bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        "animated-outline":
          "border border-input hover:border-primary transition-colors duration-500 [&_svg]:transition-colors [&_svg]:duration-500 [&_svg]:hover:text-primary",
        input:
          "bg-input text-input-foreground hover:bg-primary-muted hover:text-primary-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground text-sm  ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        xs: "h-7 px-2 rounded-md",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 shrink-0 rounded-full",
        "icon-small": "h-8 w-8 shrink-0 rounded-full",
        "icon-on-small-screen":
          "h-10 w-10 shrink-0 rounded-full md:w-auto md:px-4 md:py-2 md:rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
      >
        {loading ? (
          <Spinner className="mx-auto text-inherit" />
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
