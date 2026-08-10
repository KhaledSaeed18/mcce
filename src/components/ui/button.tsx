import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "group/button inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded font-head font-medium transition-all duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 aria-invalid:border-destructive",
    // Icons keep their own size; we only set a default when none is given so
    // Neobrutalism's h-4/size-4 icons aren't overridden.
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
  ),
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "px-4 py-1.5 text-base",
        icon: "p-2",
        "icon-lg": "p-3",
        "icon-sm": "p-1.5",
        "icon-xs": "p-1",
        lg: "px-6 py-2 text-base lg:px-8 lg:py-3 lg:text-lg",
        sm: "px-3 py-1 text-sm",
        xs: "px-2 py-0.5 text-xs",
      },
      variant: {
        default:
          "border-2 border-black bg-primary text-primary-foreground shadow-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
        destructive:
          "border-2 border-black bg-destructive text-destructive-foreground shadow-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
        ghost: "bg-transparent hover:bg-accent",
        link: "bg-transparent hover:underline",
        outline:
          "border-2 bg-transparent shadow-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
        secondary:
          "border-2 border-black bg-secondary text-secondary-foreground shadow-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary-hover hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
      },
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ className, size, variant }))}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      {...props}
    />
  );
}

export { Button, buttonVariants };
