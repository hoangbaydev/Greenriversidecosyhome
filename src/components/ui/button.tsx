import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-center font-sans text-sm font-semibold leading-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border border-primary bg-primary text-white shadow-[0_10px_22px_rgba(96,121,59,0.18)] hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_14px_28px_rgba(96,121,59,0.24)] active:translate-y-0",
        secondary: "border border-primary/20 bg-white text-primary shadow-sm hover:-translate-y-0.5 hover:border-primary/35 hover:bg-soft hover:shadow-[var(--shadow-soft)] active:translate-y-0",
        outline: "border border-border bg-white text-text shadow-sm hover:-translate-y-0.5 hover:border-primary/30 hover:bg-soft hover:text-primary hover:shadow-[var(--shadow-soft)] active:translate-y-0",
        accent: "border border-accent bg-accent text-white shadow-[0_10px_22px_rgba(207,100,10,0.2)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_28px_rgba(207,100,10,0.26)] active:translate-y-0",
        ghost: "text-primary hover:bg-soft",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-5",
        sm: "min-h-10 px-4",
        lg: "min-h-12 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
