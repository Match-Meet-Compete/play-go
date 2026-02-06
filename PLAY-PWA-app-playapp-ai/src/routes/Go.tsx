import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InstallBanner from "../components/InstallBanner";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { getMeId, getReferral } from "../lib/playData";

export default function Go() {
  const nav = useNavigate();
  const me = getMeId();
  const referral = getReferral();

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mt-2 text-3xl font-black tracking-tight">
        Find your people.
        <span className="text-coral"> Play</span> this week.
      </div>

      <div className="mt-3 text-sm text-muted">
        Swipe to match with players at your uni/city. Then DM and set the game.
      </div>

      {referral ? (
        <div className="mt-3 text-xs text-muted">
          Invite code applied: <span className="text-white font-semibold">{referral}</span>
        </div>
      ) : null}

      <InstallBanner />

      <div className="mt-6 space-y-3">
        <Button onClick={() => (me ? nav("/swipe") : nav("/auth"))}>
          {me ? "Open PLAY" : "Start (30 sec)"}
        </Button>

        <Link to="/swipe" className="block">
          <button className="w-full px-4 py-3 rounded-2xl bg-card border border-white/10 hover:border-white/20 text-sm">
            Just browse (demo)
          </button>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <Card>
          <div className="text-sm font-semibold">On-campus onboarding</div>
          <div className="text-xs text-muted mt-1">
            This page is your QR destination. Send people here → install → signup → swipe.
          </div>
        </Card>
        <Card>
          <div className="text-sm font-semibold">Invite loop</div>
          <div className="text-xs text-muted mt-1">
            Every user gets a personal invite link you can share to build density fast.
          </div>
        </Card>
      </div>

      <div className="mt-6 text-xs text-muted">
        Tip: for iPhone installs, open in Safari (not Instagram/FB in-app browser).
      </div>
    </div>
  );
}
