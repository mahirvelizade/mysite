# AI Image Generator — Bug Fix Log

## Problems & Fixes

### 1. API URL dead
- **Problem**: `api-inference.huggingface.co` DNS no longer resolves
- **Fix**: Changed to `router.huggingface.co/hf-inference/models/`
- **Files**: `tools.js:3180`

### 2. Missing `prompt` variable
- **Problem**: `generateAigImages()` never read textarea value → `prompt` was undefined → request body broken
- **Fix**: Added `var prompt = document.getElementById('aig-prompt').value.trim();`
- **Files**: `tools.js:3170`

### 3. Chip click not working
- **Problem**: `initAigChips` IIFE ran before DOM ready → container not found → chips never got click listeners
- **Fix**: Replaced IIFE with inline `onclick="window.selectAigStyle(this)"` on each chip
- **Files**: `index.html` (chips), `tools.js` (`selectAigStyle` function)

### 4. Batch count mismatch (select 2 → get 3)
- **Problem**: `next()` inside retry loop could schedule extra requests when one request 503-retried while another completed early
- **Fix**: Replaced `next()` with `pending` counter + `maybeFinish()`. Only `count` requests start, no extras.
- **Files**: `tools.js:3272-3306`

### 5. Preview images not showing
- **Problem**: COEP `require-corp` blocks `blob:` URLs from `URL.createObjectURL()`
- **Fix**: Convert blob to base64 data URL via `FileReader.readAsDataURL()` before rendering
- **Files**: `tools.js:3309-3385`

### 6. HF token exposed + auto-expired
- **Problem**: GitHub push protection blocks hardcoded tokens; HF auto-expires leaked tokens. Every commit exposed the key.
- **Fix**: Replaced `hf_xxx` with `__HF_TOKEN__` placeholder. Created GitHub Actions workflow that injects token from `${{ secrets.HF_TOKEN }}` at deploy time.
- **Files**: `tools.js:3134`, `.github/workflows/deploy.yml`

### 7. Workflow YAML indentation
- **Problem**: Literal block scalar (`|`) put Python at column 0 inside YAML block → syntax error
- **Fix**: Used explicit `python3 -c "..."` on one line inside a normal block
- **Files**: `.github/workflows/deploy.yml`

### 8. `GITHUB_TOKEN` permissions
- **Problem**: Default token can't deploy pages
- **Fix**: Added `permissions: contents: write` and explicit `pages: write`, `id-token: write`
- **Files**: `.github/workflows/deploy.yml`

### 9. `_headers` not applied with new deployment
- **Problem**: `actions/deploy-pages` may not process `_headers` file
- **Fix**: N/A — not yet resolved. COEP `require-corp` header missing from live site.
- **Impact**: PDF compressor (Ghostscript WASM) may also lack SharedArrayBuffer support

## Current Status
- `_aigKey = '__HF_TOKEN__'` placeholder in repo
- Token stored as GitHub Secret `HF_TOKEN`
- Current token: `<redacted>`
- Site live at **mahirvelizade.space** (version bumped v4.6 → v4.7)
- **Preview still not showing** — data URL conversion deployed but still broken. Maybe `_headers` COEP/COOP missing from live site.

## Next Steps
1. Fix AI preview (investigate `_headers` not applied by GH Pages deployment)
2. When HF credits deplete → create new account → update `HF_TOKEN` secret

---

# Session 2026-06-10 — Player SVGs & Playlist Modal

## Changes Made

### 1. Player SVG Icons (Tabler)
- **What**: Replaced unicode chars (`‹‹`, `▸`, `››`) with inline Tabler SVG icons
- **Icons used**:
  - `#prev` → `tabler:player-skip-back` (triangle + bar)
  - `#play-pause` → `tabler:player-play` / `tabler:player-pause` (toggle)
  - `#next` → `tabler:player-skip-forward` (triangle + bar)
- **Files**: `index.html:406-416`, `app.js:489-496`, `style.css:1013-1020`
- **Details**:
  - SVGs use `currentColor` → inherit green (#39FF14) from CSS
  - `fill="none" stroke="currentColor" stroke-width="2"`
  - Button CSS: `display:inline-flex; align-items:center; justify-content:center` (SVG centering)
  - Removed `font-family:Times New Roman` (was for unicode chars)
  - Play/pause toggle: show/hide via `#pp-play` / `#pp-pause` style.display

### 2. Bug: SVG icons overwritten by unicode
- **Problem**: Two `onPlayerStateChange` functions existed — app.js (SVG toggle) and index.html (`.textContent` with unicode). Index.html loaded after app.js, so its version ran and overwrote SVGs with `▌▌` / `▸`.
- **Fix**: Updated index.html's `onPlayerStateChange` to toggle SVG visibility instead of setting textContent.
- **Files**: `index.html:1183-1199`, `app.js:486-499`

### 3. Playlist Modal — Attempted & Reverted
- **Goal**: Click song title → open small modal with playlist
- **Approach**: 
  1. Get playlist via `player.getPlaylist()` (fails for RD mixes — returns undefined)
  2. Track videos as they play via `onPlayerStateChange` into `window._plAllIds[]`
  3. Fetch titles via YouTube oEmbed API (no key needed)
  4. Show in dynamically created modal overlay
- **Problems encountered**:
  1. `player.getPlaylist()` returns undefined for RD (radio mix) playlists
  2. **Root cause of "doesn't open"**: Two `let player` declarations — one in app.js IIFE (never initialized, but closed over by `showPlaylistModal`), one in index.html (actually initialized). `let` doesn't create `window.player`. `showPlaylistModal` always saw the IIFE's undefined `player` → early return.
  3. Fix attempts: `var player` + `window.player`, inline HTML modal, inline onclick — still didn't work (unclear why)
- **Status**: **REVERTED** — all modal code removed. Feature abandoned for now.
- **Lesson**: Növbəti dəfə minimal başla — bir static HTML div + bir toggle funksiyası. Mürəkkəb scope/IIFE problemlərindən qaç.

### Files Changed (this session)
| File | Changes |
|------|---------|
| `index.html` | SVG buttons, inline onclick, removed modal HTML |
| `app.js` | SVG toggle, removed showPlaylistModal |
| `style.css` | SVG button styles, removed modal CSS |

