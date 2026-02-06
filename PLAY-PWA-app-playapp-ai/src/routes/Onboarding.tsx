import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sport, getMeId, getUser, upsertUser } from "../lib/playData";

const SPORTS: Sport[] = ["Football", "Rugby", "Gym", "Tennis", "Basketball", "Padel"];

export default function Onboarding() {
  const nav = useNavigate();
  const meId = getMeId();
  const me = meId ? getUser(meId) : undefined;

  const [name, setName] = React.useState(me?.name ?? "");
  const [uni, setUni] = React.useState(me?.university ?? "");
  const [city, setCity] = React.useState(me?.city ?? "");
  const [bio, setBio] = React.useState(me?.bio ?? "");
  const [sports, setSports] = React.useState<Sport[]>(me?.sports ?? []);

  React.useEffect(() => {
    if (!meId) nav("/auth", { replace: true });
  }, [meId, nav]);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-2xl font-black">Set up your profile</div>
      <div className="text-sm text-muted mt-2">Make it easy to say “yes” to playing with you.</div>

      <div className="mt-4 space-y-3">
        <Card>
          <label className="text-xs text-muted">Name</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Iain"
          />
        </Card>

        <Card>
          <label className="text-xs text-muted">University</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={uni}
            onChange={(e) => setUni(e.target.value)}
            placeholder="Cardiff Met"
          />
          <label className="text-xs text-muted mt-3 block">City</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Cardiff"
          />
        </Card>

        <Card>
          <div className="text-xs text-muted">Sports</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SPORTS.map((s) => {
              const on = sports.includes(s);
              return (
                <button
                  key={s}
                  className={`px-3 py-2 rounded-2xl text-sm border transition ${
                    on ? "bg-neon text-black border-transparent neon" : "bg-bg border-white/10 hover:border-white/25"
                  }`}
                  onClick={() =>
                    setSports((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
                  }
                >
                  {s}
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <label className="text-xs text-muted">Bio</label>
          <textarea
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25 min-h-[96px]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="What are you down to play? Times? vibe?"
          />
        </Card>

        <Button
          onClick={() => {
            if (!meId) return;
            const handleBase = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12) || "player";
            upsertUser({
              id: meId,
              name: name.trim(),
              handle: me?.handle || handleBase,
              bio: bio.trim(),
              university: uni.trim(),
              city: city.trim(),
              sports,
            });
            nav("/swipe");
          }}
        >
          Enter PLAY
        </Button>
      </div>
    </div>
  );
}
