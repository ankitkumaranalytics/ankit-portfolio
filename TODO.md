# Live Location Map Task

Goal: Make live location tracking automatic, persistent, and reliable.

## Implemented
- [x] Add `location` table + API endpoints to `backend/server.js` (POST /api/location, GET /api/location/latest)
- [x] Add Leaflet CDN links + Live Location section to `frontend/index.html`
- [x] Add map + location status styling to `frontend/css/components.css`
- [x] Initial broadcast (?owner=1) + visitor tracking logic in `frontend/script.js`

## New work — automatic + persistent broadcasting  ✅ DONE
- [x] `frontend/script.js`:
  - [x] Persist owner mode in `localStorage` (auto-broadcast on later visits)
  - [x] Add in-page "Share my live location" / "Stop sharing" toggle button
  - [x] Keep `?owner=1` as manual override / force flag
  - [x] Detect HTTPS/secure-context and show a clear error when geolocation is blocked
  - [x] Visitor fallback: if no broadcast location exists, show the visitor's own location (with a note)
  - [x] Visitor polling updates the live marker as the broadcast moves
- [x] `frontend/index.html`: added the broadcast control button + hint
- [x] `frontend/css/components.css`: styled the new toggle + hint (dark/light theming)
- [x] Syntax verified with `node --check` (script.js + server.js)

## Test tracking in browser (pending user)
1. Start server: `npm start`
2. Open `http://localhost:3000` → tap "Share my live location" → allow location
3. Re-open / another tab → marker auto-updates; no `?owner=1` needed after first share

