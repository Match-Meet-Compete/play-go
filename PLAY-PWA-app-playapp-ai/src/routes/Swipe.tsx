import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { addLike, ensureMatch, getLikes, getMeId, getUser, getUsers } from "../lib/playData";
import type { User } from "../lib/playData";

function pickNext(meId: string): User | null {
  const me = getUser(meId);
  const users = getUsers().filter((u) => u.id !== meId);

  const likes = getLikes().filter((l) => l.from === meId).map((l) => l.to);
  const remaining = users.filter((u) => !likes.includes(u.id));

  const scored = remaining
    .map((u) => {
      let score = 0;
      if (me?.city && u.city && me.city.toLowerCase() === u.city.toLowerCase()) score += 3;
      if (me?.university && u.university && me.university.toLowerCase() === u.university.toLowerCase()) score += 2;
      const shared = (me?.sports ?? []).filter((s) => u.sports.includes(s)).length;
      score += shared;
      return { u, score: score + Math.random() };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.u ?? null;
}

export default function Swipe() {
  const nav = useNavigate();
  const meId = getMeId()!;
  const me = getUser(meId);
  const [current, setCurrent] = React.useState<User | null>(() => pickNext(meId));
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!me?.name) nav("/onboarding", { replace: true });
  }, [me?.name, nav]);

  function next() {
    setCurrent(pickNext(meId));
  }

  function act(like: boolean) {
    if (!current) return;

    // For demo: record as seen by adding like either way
    addLike(meId, current.id);

    if (like) {
      // simulate mutual like sometimes to create a match
      const mutualChance = 0.55;
      if (Math.random() < mutualChance) {
        addLike(current.id, meId);
        ensureMatch(meId, current.id);
        setToast(`It's a match with ${current.name}!`);
        setTimeout(() => setToast(null), 2200);
        setTimeout(() => nav(`/matches`), 800);
      }
    }

    next();
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted">You</div>
          <div className="text-lg font-bold">{me?.name || "Player"}</div>
        </div>
        <button className="text-xs text-muted underline" onClick={() => nav("/profile")}>
          Edit profile
        </button>
      </div>

      {toast ? (
        <div className="mt-4 bg-neon text-black rounded-2xl px-4 py-3 neon text-sm font-semibold">{toast}</div>
      ) : null}

      <div className="mt-4">
        {current ? (
          <div className="bg-card border border-white/10 rounded-3xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-black">{current.name}</div>
                <div className="text-sm text-muted">@{current.handle}</div>
              </div>
              <div className="px-3 py-2 rounded-2xl bg-bg border border-white/10 text-xs">
                {current.university || "—"} · {current.city || "—"}
              </div>
            </div>

            <div className="mt-4 text-sm">{current.bio || "No bio yet."}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {current.sports.map((s) => (
                <span key={s} className="px-3 py-2 rounded-2xl bg-bg border border-white/10 text-xs">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="ghost" onClick={() => act(false)}>
                Nope
              </Button>
              <Button variant="neon" onClick={() => act(true)}>
                Like
              </Button>
            </div>

            <div className="mt-3 text-xs text-muted">Demo logic: likes sometimes become matches so you can test chat.</div>
          </div>
        ) : (
          <Card>
            <div className="text-lg font-bold">No more players (demo)</div>
            <div className="text-sm text-muted mt-1">
              You’ve swiped everyone in the sample pool. Reset to try again.
            </div>
            <div className="mt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.removeItem("play.likes");
                  localStorage.removeItem("play.matches");
                  localStorage.removeItem("play.messages");
                  window.location.reload();
                }}
              >
                Reset demo
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
