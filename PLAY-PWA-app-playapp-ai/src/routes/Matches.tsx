import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { getMatches, getMeId, getUser } from "../lib/playData";

export default function Matches() {
  const nav = useNavigate();
  const meId = getMeId()!;
  const matches = getMatches();
  const me = getUser(meId);

  const myMatches = matches
    .filter((m) => m.a === meId || m.b === meId)
    .map((m) => ({ m, otherId: m.a === meId ? m.b : m.a }))
    .map((x) => ({ ...x, other: getUser(x.otherId) }))
    .filter((x) => Boolean(x.other));

  const inviteCode = (me?.handle || "player") + "_" + meId.slice(-6);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <Card>
        <div className="text-sm font-semibold">Invite a mate</div>
        <div className="text-xs text-muted mt-1">Use this link to bring players in fast:</div>
        <div className="mt-3 flex items-center gap-2">
          <input
            className="flex-1 rounded-2xl bg-bg border border-white/10 px-3 py-2 text-xs"
            readOnly
            value={`${window.location.origin}/invite/${inviteCode}`}
          />
          <button
            className="px-3 py-2 rounded-2xl bg-neon text-black text-xs font-semibold neon"
            onClick={async () => {
              const text = `${window.location.origin}/invite/${inviteCode}`;
              try {
                await navigator.clipboard.writeText(text);
              } catch {}
            }}
          >
            Copy
          </button>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-black">Your matches</div>
        <button className="text-xs text-muted underline" onClick={() => nav("/swipe")}>
          Swipe more
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {myMatches.length ? (
          myMatches.map(({ m, other }) => (
            <Link key={m.id} to={`/chat/${m.id}`} className="block">
              <div className="bg-card border border-white/10 rounded-3xl p-4 hover:border-white/20 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{other!.name}</div>
                    <div className="text-xs text-muted">@{other!.handle} · {other!.university || "—"}</div>
                  </div>
                  <div className="text-xs px-3 py-2 rounded-2xl bg-bg border border-white/10">Chat</div>
                </div>
                <div className="mt-2 text-xs text-muted">Tap to message and set the game.</div>
              </div>
            </Link>
          ))
        ) : (
          <Card>
            <div className="text-sm font-semibold">No matches yet</div>
            <div className="text-xs text-muted mt-1">Go swipe a few and you’ll see chats appear.</div>
            <div className="mt-4">
              <Button variant="neon" onClick={() => nav("/swipe")}>
                Start swiping
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
