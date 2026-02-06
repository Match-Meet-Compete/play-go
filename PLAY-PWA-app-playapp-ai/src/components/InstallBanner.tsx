import React from "react";
import { isIOS, isStandalone } from "../lib/platform";
import { Button } from "./Button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallBanner() {
  const [deferred, setDeferred] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [showIOS, setShowIOS] = React.useState(false);

  React.useEffect(() => {
    if (isStandalone()) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    if (isIOS()) setShowIOS(true);

    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  if (isStandalone()) return null;

  const canPrompt = Boolean(deferred);

  return (
    <div className="max-w-md mx-auto px-4 mt-4">
      <div className="bg-card border border-white/10 rounded-3xl p-4 flex flex-col gap-3">
        <div className="text-sm font-semibold">Install PLAY</div>
        <div className="text-xs text-muted">
          Get it on your home screen — faster open, full-screen, and ready for swipes.
        </div>

        {canPrompt ? (
          <Button
            variant="neon"
            onClick={async () => {
              if (!deferred) return;
              await deferred.prompt();
              await deferred.userChoice.catch(() => null);
              setDeferred(null);
            }}
          >
            Install now
          </Button>
        ) : showIOS ? (
          <div className="text-xs text-muted leading-relaxed">
            <div className="mb-2">On iPhone:</div>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Tap the <span className="text-white">Share</span> button in Safari</li>
              <li>Tap <span className="text-white">Add to Home Screen</span></li>
              <li>Open PLAY from your home screen</li>
            </ol>
          </div>
        ) : (
          <div className="text-xs text-muted">
            Your browser will show an install option soon (or use the browser menu → Install app).
          </div>
        )}
      </div>
    </div>
  );
}
