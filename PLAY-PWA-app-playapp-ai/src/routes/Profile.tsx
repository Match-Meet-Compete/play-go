import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { getMeId, getUser, setMeId, upsertUser } from "../lib/playData";

export default function Profile() {
  const nav = useNavigate();
  const meId = getMeId()!;
  const me = getUser(meId)!;

  const [name, setName] = React.useState(me.name);
  const [handle, setHandle] = React.useState(me.handle);
  const [bio, setBio] = React.useState(me.bio);
  const [uni, setUni] = React.useState(me.university);
  const [city, setCity] = React.useState(me.city);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-2xl font-black">Your profile</div>
      <div className="text-sm text-muted mt-2">Keep it simple. Make it easy to invite you.</div>

      <div className="mt-4 space-y-3">
        <Card>
          <label className="text-xs text-muted">Name</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-xs text-muted mt-3 block">Handle</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={handle}
            onChange={(e) =>
              setHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase().slice(0, 16))
            }
          />
        </Card>

        <Card>
          <label className="text-xs text-muted">University</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={uni}
            onChange={(e) => setUni(e.target.value)}
          />
          <label className="text-xs text-muted mt-3 block">City</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Card>

        <Card>
          <label className="text-xs text-muted">Bio</label>
          <textarea
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25 min-h-[110px]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Card>

        <Button
          onClick={() => {
            upsertUser({
              ...me,
              name: name.trim(),
              handle: handle.trim(),
              bio: bio.trim(),
              university: uni.trim(),
              city: city.trim(),
            });
            nav("/swipe");
          }}
        >
          Save
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            setMeId(null);
            nav("/go");
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
