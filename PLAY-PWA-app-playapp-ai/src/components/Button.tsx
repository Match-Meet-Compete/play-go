import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "coral" | "neon" | "ghost";
};

export function Button({ variant = "coral", className = "", ...props }: Props) {
  const base = "w-full px-4 py-3 rounded-2xl font-semibold transition active:scale-[.99]";
  const v =
    variant === "coral"
      ? "bg-coral text-black hover:opacity-95 glow"
      : variant === "neon"
      ? "bg-neon text-black hover:opacity-95 neon"
      : "bg-card border border-white/10 hover:border-white/20";
  return <button className={`${base} ${v} ${className}`} {...props} />;
}
