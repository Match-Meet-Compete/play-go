import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addMessage, getMatches, getMeId, getMessages, getUser } from "../lib/playData";

export default function Chat() {
  const nav = useNavigate();
  const { matchId } = useParams();
  const meId = getMeId()!;
  const match = getMatches().find((m) => m.id === matchId);

  React.useEffect(() => {
    if (!match) nav("/matches", { replace: true });
  }, [match, nav]);

  const otherId = match ? (match.a === meId ? match.b : match.a) : null;
  const other = otherId ? getUser(otherId) : null;

  const [text, setText] = React.useState("");
  const [, bump] = React.useState(0);

  const msgs = getMessages()
    .filter((m) => m.matchId === matchId)
    .sort((a, b) => a.createdAt - b.createdAt);

  function send() {
    if (!matchId) return;
    const t = text.trim();
    if (!t) return;

    addMessage(matchId, meId, t);
    setText("");
    bump((x) => x + 1);

    // simple auto-reply for demo
    setTimeout(() => {
      if (!otherId) return;
      const replies = ["Keen. When you free?", "Yeah let's do it. Where you based?", "Sweet — this week?", "I'm down. What time works?"];
      addMessage(matchId, otherId, replies[Math.floor(Math.random() * replies.length)]);
      bump((x) => x + 1);
    }, 700);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted">Chat with</div>
          <div className="text-lg font-black">{other?.name || "Match"}</div>
        </div>
        <Link to="/matches" className="text-xs text-muted underline">
          Back
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {msgs.length ? (
          msgs.map((m) => (
            <div key={m.id} className={`flex ${m.from === meId ? "justify-end" : "justify-start"}`}>
              <div
                className={`${
                  m.from === meId ? "bg-coral text-black" : "bg-card border border-white/10"
                } max-w-[85%] rounded-3xl px-4 py-3 text-sm`}
              >
                {m.text}
                <div className="mt-1 text-[10px] opacity-70">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card border border-white/10 rounded-3xl p-4">
            <div className="text-sm font-semibold">Say hey</div>
            <div className="text-xs text-muted mt-1">Set the plan in 3 messages.</div>
          </div>
        )}
      </div>

      <div className="safe fixed bottom-0 left-0 right-0 bg-bg/90 backdrop-blur border-t border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex gap-2">
          <input
            className="flex-1 rounded-2xl bg-card border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <button className="px-4 py-3 rounded-2xl bg-neon text-black font-semibold neon" onClick={send}>
            Send
          </button>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
