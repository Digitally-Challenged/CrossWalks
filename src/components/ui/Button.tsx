import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { motion, HTMLMotionProps } from 'framer-motion';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90 neon-glow',
        secondary: 'bg-secondary text-white hover:bg-secondary/80 neon-glow',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'hover:bg-primary/20 hover:text-primary',
        accent: 'bg-accent text-white hover:bg-accent/90 neon-glow',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md text-xs',
        lg: 'h-11 px-8 rounded-md text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & HTMLMotionProps<"button">>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? motion.span : motion.button;
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;