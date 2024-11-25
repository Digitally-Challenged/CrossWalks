import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from "../../lib/utils";

// Define a type that resolves conflicts between MotionProps and HTMLAttributes
type MergedMotionProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> & MotionProps;

interface CardProps extends MergedMotionProps {
  className?: string;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "glassmorphism rounded-lg border bg-card text-card-foreground shadow-sm p-6 smooth-transition",
        className
      )}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      {...props}
    />
  )
);
Card.displayName = "Card";

interface CardTitleProps extends MergedMotionProps {
  className?: string;
  children?: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <motion.h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-primary",
        className
      )}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
    </motion.h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };