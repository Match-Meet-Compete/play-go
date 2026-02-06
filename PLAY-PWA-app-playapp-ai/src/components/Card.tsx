import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-white/10 rounded-3xl p-4 ${className}`}>
      {children}
    </div>
  );
}
