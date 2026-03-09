"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export default function CTAButton({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
}: CTAButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-300 ${
    fullWidth ? "w-full" : ""
  }`;

  const variantClasses = {
    primary:
      "bg-gold text-background hover:bg-gold-light disabled:bg-gold/50 disabled:cursor-not-allowed",
    secondary:
      "border-2 border-gold text-gold hover:bg-gold/10 disabled:border-gold/50 disabled:text-gold/50 disabled:cursor-not-allowed",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.15 },
  };

  const hoverGlow =
    variant === "primary"
      ? { boxShadow: "0 0 25px rgba(201, 169, 110, 0.3)" }
      : {};

  if (href) {
    return (
      <Link href={href}>
        <motion.button
          className={combinedClasses}
          disabled={disabled}
          {...motionProps}
          whileHover={{ ...motionProps.whileHover, ...hoverGlow }}
        >
          {children}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...motionProps}
      whileHover={{ ...motionProps.whileHover, ...hoverGlow }}
    >
      {children}
    </motion.button>
  );
}
