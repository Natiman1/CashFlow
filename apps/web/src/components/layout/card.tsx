import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* --------------------------------------------
   Card Variants
--------------------------------------------- */

const cardVariants = cva(
  "relative rounded-xl bg-white text-gray-900 transition-shadow hover:shadow-lg cursor-pointer focus-within:shadow-md",
  {
    variants: {
      variant: {
        feature: "p-6 flex items-start flex-col",
        step: "p-6 flex gap-4 items-center md:items-start flex-col ",
      },
      elevation: {
        flat: "border border-gray-200",
        raised: "shadow-md border border-gray-200",
      },
    },
    defaultVariants: {
      variant: "feature",
      elevation: "flat",
    },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, elevation, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, elevation }), className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";

/* --------------------------------------------
   Card Elements
--------------------------------------------- */

export const CardIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 text-primary-500">{children}</div>
);

export const CardBadge = ({ children }: { children: React.ReactNode }) => (
  <div className=" flex h-12 w-12 text-500 items-center justify-center rounded-full border border-primary-500 text-primary-500 font-medium">
    {children}
  </div>
);

export const CardLabel = ({ children }: { children: React.ReactNode }) => (
  <span className=" text-xs font-medium text-gray-500 uppercase">
    {children}
  </span>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-2 text-lg font-semibold">{children}</h3>
);

export const CardDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <p className="mt-2 text-sm text-gray-600 leading-relaxed">{children}</p>;

export const CardAction = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 text-sm font-medium text-primary-500 hover:underline cursor-pointer">
    {children}
  </div>
);
