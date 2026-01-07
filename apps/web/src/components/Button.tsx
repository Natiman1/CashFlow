import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: () => void;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = ({
  text,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const base = `rounded-full font-medium transition-colors ${fullWidth ? "w-full" : ""}`;
  return (
    <button className={`${base} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`} onClick={onClick}>
      {text}
    </button>
  );
};
