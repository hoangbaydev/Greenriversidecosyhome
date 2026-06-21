import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-sans text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-soft text-primary hover:bg-soft-deep border border-border hover:border-primary/25",
        outline: "border border-border bg-white text-text hover:border-primary/25 hover:bg-soft",
        accent: "bg-accent text-primary-dark hover:brightness-95",
        ghost: "text-primary hover:bg-soft",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
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
