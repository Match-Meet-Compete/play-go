# PLAY PWA (working prototype)

This is a **working** Progressive Web App scaffold for PLAY:
- Installable (manifest + service worker)
- Mobile-first UI (dark mode, PLAY-ish coral + neon)
- Routes: `/go` (QR landing), `/auth`, `/onboarding`, `/swipe`, `/matches`, `/chat/:matchId`, `/profile`
- Demo logic: likes sometimes create matches so you can test chat
- LocalStorage persistence (swap for Supabase later)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## Notes
- iOS install = Share → Add to Home Screen (shown on `/go`).
- Replace demo auth with SMS OTP (Supabase / Twilio / Firebase) when ready.
