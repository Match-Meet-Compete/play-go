import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { getMeId, setMeId, upsertUser } from "../lib/playData";
import { uid } from "../lib/storage";

export default function Auth() {
  const nav = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const me = getMeId();
    if (me) nav("/swipe", { replace: true });
  }, [nav]);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-2xl font-black">Create your PLAY</div>
      <div className="text-sm text-muted mt-2">
        This is a working demo auth. Swap for Supabase/Twilio OTP later.
      </div>

      <div className="mt-4">
        <Card>
          <label className="text-xs text-muted">Email or phone</label>
          <input
            className="mt-2 w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/25"
            placeholder="name@uni.ac.uk or +44..."
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />

          <div className="mt-3 text-xs text-muted">
            We'll create a local account so the prototype works instantly.
          </div>

          <div className="mt-4">
            <Button
              variant="neon"
              disabled={loading || emailOrPhone.trim().length < 3}
              onClick={async () => {
                setLoading(true);
                const id = uid("me");
                setMeId(id);

                upsertUser({
                  id,
                  name: "",
                  handle: (emailOrPhone.split("@")[0] || "player")
                    .replace(/[^a-zA-Z0-9_]/g, "")
                    .toLowerCase()
                    .slice(0, 14),
                  bio: "",
                  university: "",
                  city: "",
                  sports: [],
                });

                setLoading(false);
                nav("/onboarding");
              }}
            >
              Continue
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-4 text-xs text-muted">
        Already in?{" "}
        <button className="underline" onClick={() => nav("/swipe")}>
          Open
        </button>
      </div>
    </div>
  );
}
