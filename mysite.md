# Mahir Velizade Portfolio — Project Changes

## 📁 Files
- `index.html` — Main portfolio (single-page: Home, Work, About, Contact)
- `mahir_qa.js` — 50+ Q&A pairs for AI chat (EN/AZ/RU)
- `3D.glb` — 3D model rendered with THREE.js on homepage

## 🔧 Changes Made

### 1. Music Player — Next/Prev Fix
- **Problem**: `player.nextVideo()` / `player.previousVideo()` only work with YouTube playlists, not single videos.
- **Fix**: Changed player initialization to use `listType:'playlist'` with `list:'RDBPTR5-FHn9w'` (radio mix). Restored native `nextVideo()`/`previousVideo()` which now work because a playlist is loaded.
- **Lines**: 1908-1940

### 2. Music Player — Mobile Playback
- **Problem**: YouTube iframe was 1x1px — iOS blocks audio from invisible elements.
- **Fix**: On mobile, `#player` is now 200x200px positioned off-screen (`bottom: -200px; left: -200px`). Proper dimensions allow iOS audio playback.
- **Lines**: 718-721

### 3. Music Player — Mobile Touch Events
- **Problem**: `#music-player` was nested inside `.footer-bar` which has `pointer-events: none` — broke touch events on mobile.
- **Fix**: Moved `#music-player` out of `.footer-bar` to be a standalone `position: fixed` element. Added `z-index: 9999` to desktop CSS.
- **Lines**: 784-794 (desktop CSS), 716 (mobile CSS), 1157-1171 (HTML structure)

### 4. Play/Pause Icons — Orange on Mobile
- **Problem**: Unicode characters ⏸/▶ rendered as native emoji (orange) on mobile, ignoring CSS `color`.
- **Fix**: Added Unicode variation selector `\uFE0E` (VS15) to force text presentation in both HTML and JavaScript `textContent` assignments.
- **Lines**: 1165 (HTML), 2022, 2029 (JS)

### 5. Equalizer — Size & Visibility
- **Problem**: Equalizer was too small and bars were invisible in some quadrants.
- **Fixes**:
  - CSS size: `90vmin` → `100vmin`
  - Internal resolution: `1300×1300` → `2000×2000`
  - `baseR`: `2px` → `Math.min(w,h) * 0.05` (scales with canvas)
  - `maxL`: `0.35` → `0.50` of canvas (taller bars)
  - Bar target heights increased (short bars `15`→`15`, tall bars `25`→`25`)
  - Peak distribution: 2 zones → 6 alternating zones for full-circle coverage
  - `lineWidth`: `max(2, baseR*0.025)` → `max(2, baseR*0.06)`
  - Hidden on mobile (`display: none`)
- **Lines**: 636-647 (CSS), 1945-2008 (JS), 722 (mobile)

### 6. YouTube Playlist URL
- **Problem**: User requested a specific radio mix playlist.
- **Fix**: Changed from single `videoId` to `listType:'playlist', list:'RDBPTR5-FHn9w'`.
- **Lines**: 1919-1920

### 7. 3D Model Swap (REVERTED)
- **Problem**: User requested `ME.glb` swap on play/pause with dance animation.
- **Attempted**: Dual model loading, `swapModel()`, `AnimationMixer`, procedural dance bob/sway.
- **Result**: Reverted — user didn't like it. `ME.glb` deleted, code restored to original single-model (`3D.glb`) setup.

### 8. AI Chat — Language Selection Removed
- **Problem**: User wanted AI to auto-detect language from input instead of manual AZ/EN/RU selection.
- **Fix**: Removed language buttons and `switchLang()`. Added `detectLang(text)` that detects language by character patterns (`əğııöüşç` → AZ, `а-яё` → RU, default → EN). TTS, speech recognition, and fallback messages all use auto-detected language.
- **Files**: `index.html` (lines 1462-1480, 1537-1556), `mahir_qa.js` (line 543-558)
