import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Topbar() {
  const loc = useLocation();
  const title =
    loc.pathname.startsWith("/swipe") ? "PLAY" :
    loc.pathname.startsWith("/matches") ? "Matches" :
    loc.pathname.startsWith("/chat") ? "Chat" :
    loc.pathname.startsWith("/profile") ? "Profile" :
    "PLAY";

  return (
    <div className="safe sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-white/10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-card glow flex items-center justify-center">
            <span className="font-black text-coral">P</span>
          </div>
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-muted">Find players. Get games.</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Link className="px-3 py-2 rounded-xl bg-card border border-white/10 hover:border-white/20" to="/swipe">Swipe</Link>
          <Link className="px-3 py-2 rounded-xl bg-card border border-white/10 hover:border-white/20" to="/matches">Matches</Link>
          <Link className="px-3 py-2 rounded-xl bg-card border border-white/10 hover:border-white/20" to="/profile">Me</Link>
        </div>
      </div>
    </div>
  );
}
