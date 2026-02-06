import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import Go from "./Go";
import Auth from "./Auth";
import Onboarding from "./Onboarding";
import Swipe from "./Swipe";
import Matches from "./Matches";
import Chat from "./Chat";
import Profile from "./Profile";
import { getMeId, seedUsersIfEmpty, setReferral } from "../lib/playData";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const me = getMeId();
  if (!me) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function InviteCapture() {
  const { code } = useParams();
  React.useEffect(() => {
    if (code) setReferral(code);
  }, [code]);
  return <Navigate to="/go" replace />;
}

export default function App() {
  React.useEffect(() => {
    seedUsersIfEmpty();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <Topbar />
      <Routes>
        <Route path="/" element={<Navigate to="/go" replace />} />
        <Route path="/invite/:code" element={<InviteCapture />} />
        <Route path="/go" element={<Go />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/swipe" element={<RequireAuth><Swipe /></RequireAuth>} />
        <Route path="/matches" element={<RequireAuth><Matches /></RequireAuth>} />
        <Route path="/chat/:matchId" element={<RequireAuth><Chat /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

        <Route path="*" element={<Navigate to="/go" replace />} />
      </Routes>
    </div>
  );
}
