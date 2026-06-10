# Mahir Velizade Portfolio — Project Changes

## 🗺️ Session Summary (08 Jun 2026) — Bug fixes + 26th tool
- **HTML Viewer tool** (26th tool): Split HTML textarea / iframe live preview, auto-render with debounce, Render/Clear buttons
- **QR Code Generator rewritten**: Proper QR spec (GF(256), Reed-Solomon EC, module placement, mask evaluation, format info BCH) — produces scannable codes
- **Image to PDF rewritten**: Real PDF generation (catalog, pages, page object, JPEG image stream, xref table) via Uint8Array — fixes binary corruption
- **Image Compressor fix**: Uses actual quality slider value instead of hardcoded constant
- **All image tools fix**: Cache key prefix now matches toolId — all 8 image tools work again
- **Tool detail fix**: `openTool()` always sets `detail.className = 'tool-detail active'` — detail reappears after close
- **Hash recursion fix**: Guard added to prevent infinite hash change loop
- **AI widget overlap fix**: `.tool-detail` gets `pointer-events: auto`, FAB keeps `pointer-events: auto`, chats container gets `pointer-events: none`
- **HTML Viewer widened**: `max-width: 800px` removed from `.tool-detail` CSS, added "↗ Open in New Tab" button
- **Version**: v4.6, commit `8c088c5`

## 🗺️ Session Summary (05 Jun 2026)
- **English-only chat**: `detectLang` always returns `'en'`, SYSTEM prompt AZ/RU təlimatları silindi
- **Male TTS voice**: English üçün qadın səsləri (Samantha, Karen, Moira...) xaric edilir, kişi adlı səslər axtarılır (David, Mark, Daniel, Alex, Google...)
- **Cloud TTS removed**: Google Cloud TTS API kodu tam çıxarıldı (ödənişli olduğu üçün)
- **Cleanup**: `QUALITY_VOICES` / `pickVoice` / `[LANG: xx]` / AZ/RU fallback-lər təmizləndi
- **Version bump**: v4.4 → v4.5
- **Commit**: `2702e84`

## 🗺️ Session Summary (03 Jun 2026)
- **Equalizer performance optimization**: Canvas resolution `2000×2000` → dinamik `min(innerWidth, innerHeight)`, bar sayı 120 → 60, shadow blur 20/6 → 10/3. Cursor/3D model frame rate yaxşılaşdı.
- **Version bump**: v4.3 → v4.4
- **Commit**: `b328680`

## 🗺️ Session Summary (30 May 2026)
- **Mobile nav click fix**: 3D canvas `pointer-events:none` when menu opens — fixes About/Contact unclickable on iOS
- **Nav reverted to v4.1**: `<a data-page>` + delegated listener, no body-move, no inline onclick
- **Menu visual**: full-height overlay, `1.2rem` links, `rgba(5,5,5,0.98)` bg, centered
- **Music player emoji**: all Unicode replaced with safe non-emoji chars + serif font fallback for Xiaomi/Android
- **Commit**: `7dc2757` (latest)

## 🗺️ Session Summary (02 Jun 2026)
- **Equalizer positioning**: `.eq-right` class added — Work/About/Contact səhifələrində equalizer sağ tərəfə keçir (`left: 106%`, `150vmin × 200vmin`), Home-da mərkəzdə qalır
- **switchPage** updates: `#eq-canvas.classList.toggle('eq-right', ...)` Work/About/Contact-da əlavə olunur, Home-da silinir
- **Version bump**: v4.2 → v4.3
- **Commit**: `7dc2757`

## 📁 Files
- `index.html` — Main portfolio (single-page: Home, Work, About, Contact)
- `style.css` — All styles
- `mahir_qa.js` — 50+ Q&A pairs for AI chat (EN/AZ/RU)
- `3D.glb` — 3D model rendered with THREE.js on homepage

## 🔧 Changes Made

### 17. Mobile Nav — Click Fix (iOS WebGL Canvas Intercepting Touches)
- **Problem**: About/Contact nav links unclickable on mobile. Three.js WebGL canvas sits on separate compositing layer and intercepts touch events through the mobile menu overlay. Clicking button text didn't work, but hitting button edges did.
- **Fix 1** (reverted): Replaced `<a href="#">` with `<button type="button">` — didn't fix root cause, changed visual.
- **Fix 2** (final): Menu açıldıqda `#canvas-3d`-yə `pointer-events: none` tətbiq olunur (`c3d.style.pointerEvents = 'none'`), bağlananda geri qayıdır. Bu iOS WebGL canvas-in touch event-lərini ələ keçirməsinin qarşısını alır.
- **Nav design**: Reverted to original v4.1 style:
  - `<a href="#" data-page="..." class="nav-link">` (no inline onclick — `[data-page]` delegated listener handles all)
  - Single `document.addEventListener('click', closest('[data-page]'))` with `e.preventDefault()`
  - Simple class toggle (no body-move). Links stay in `<nav>` always.
  - Visual: `rgba(5,5,5,0.98)` bg, `32px 24px` padding, `border-bottom`, centered full-height overlay
  - Links: `1.2rem` font-size, `12px 0` padding, natural (non-centered) position
- **Events**: `animate3D`, `mousemove`, `touchstart`, gyro handlers all guard with `nav-links.classList.contains('open')` check — no interaction when menu open
- **Lines**: `index.html:415-416,427-428,430-436` (pointer-events logic), `style.css:608-619` (menu CSS)

### 18. Music Player Emoji — Orange on Xiaomi/Android
- **Problem**: Unicode `▶ ⏸ ⏮ ⏭` rendered as colorful (orange) emoji on Xiaomi Redmi 9, ignoring CSS `color`. `font-variant-emoji: text` not supported on that Android version.
- **Fix**: Replaced all emoji characters with safe Unicode alternatives that have no emoji presentation on any platform:
  - Play `▶` → `▸` (U+25B8, small black right-pointing triangle)
  - Pause `⏸` → `▌▌` (U+258C, left half block)
  - Previous `⏮` → `‹‹` (U+2039, single left-pointing angle quotation mark)
  - Next `⏭` → `››` (U+203A, single right-pointing angle quotation mark)
  - Added `font-family: "Times New Roman", Times, Georgia, serif` to force text rendering (serif fonts don't include emoji glyphs)
  - Mobile button size: `24px` → `28px` (since serif chars are slightly smaller)
- **Lines**: `style.css:770`, `index.html:387-389,1193,1200`

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

### 9. GitHub Repo & Auto-Deploy
- **Problem**: Site wasn't version-controlled or auto-deployed.
- **Fix**: Initialized git, pushed to [github.com/mahirvelizade/mysite](https://github.com/mahirvelizade/mysite), enabled GitHub Pages. Site auto-deploys on every push to `main`.
- **URL**: [https://mahirvelizade.github.io/mysite/](https://mahirvelizade.github.io/mysite/)

### 10. Custom Domain — mahirvelizade.space
- **Problem**: Wanted custom domain instead of GitHub Pages subdomain.
- **Fix**: Set CNAME in repo, changed Namecheap DNS to BasicDNS, added 4 A records (`185.199.108.153` etc.) for root and CNAME for www. GitHub Pages configured with custom domain.
- **Status**: ✅ Complete — SSL issued, HTTPS enforced

### 13. Site Optimization v1 — CSS/JS/Font Refactoring
- **Problem**: 2046-line bloated index.html, inline CSS not cacheable, fonts blocking render, images eager-loaded.
- **Changes**:
  - All CSS extracted → `style.css` (now cacheable across visits)
  - AI chat DOM moved from hardcoded HTML → generated by `mahir_qa.js` (`createChatWidget()`)
  - Google Fonts switched to async load (`media="print"` swap technique)
  - Added `preconnect` hints for `fonts.gstatic.com`
  - All 5 work images: `loading="lazy"` added
  - Matrix canvas: `setInterval(40ms)` → `requestAnimationFrame` (pauses when tab hidden)
  - Footer version: `v4.0` → `v4.1`
  - Inline critical CSS kept for loading screen only
- **Result**: `index.html` 2046 → 1235 lines (~40% smaller), better caching, faster perceived load
- **Files**: `style.css` (new), `index.html`, `mahir_qa.js`, `mysite.md`

### 12. Version Bump — v4.0 → v4.1
- **Change**: Updated version display from `v4.0` to `v4.1` in home-meta and footer.
- **File**: `index.html`

### 11. SSL Certificate & HTTPS Enforcement
- **Problem**: SSL cert not yet issued for custom domain; browser showed insecure warning.
- **Fix**: DNS propagated to GitHub Pages IPs → Let's Encrypt SSL auto-issued → **Enforce HTTPS** enabled.
- **URL**: [https://mahirvelizade.space/](https://mahirvelizade.space/) — fully secure, HTTP/2 from GitHub.com

### 16. Page Navigation & Loading Screen — Moved out of Module Script
- **Problem**: Page navigation and loading screen progress were inside `<script type="module">` with Three.js imports. If module imports fail, nav breaks and loading screen never hides.
- **Fix**: Moved switchPage, nav handlers, AND fake loading progress to a standalone regular `<script>` before the module. Module script now only handles Three.js/3D/cursor/matrix — if it fails, site still works. Added 15s fallback timeout.
- **Files**: `index.html`

### 15. Mobile Nav — Modern Full-Screen Overlay
- **Problem**: Mobile nav menu was narrow, text too small (0.7rem), left-aligned, unstyled.
- **Fix**: Redesigned as full-screen overlay with backdrop blur, centered layout, 1.4rem font, 60px tap targets, smooth appearance.
- **Files**: `style.css`

### 14. Mobile UX Audit & Fixes
- **Problem**: Multiple mobile usability issues — tiny tap targets, missing `-webkit-backdrop-filter`, 300ms tap delay, wasteful rAF loops when hidden, Skypack CDN unreliable.
- **Changes**:
  - `#ai-x` close button: `padding: 0` → `padding: 12px` (44px tap target)
  - `.nav-toggle` hamburger: added `min-width:44px; min-height:44px; padding:8px`
  - Chat row buttons (`#ai-mic`, `#ai-listen-toggle`, `#ai-send`): added `min-height:44px; touch-action:manipulation`
  - Music player buttons on mobile: `padding:6px 10px` → `padding:12px 14px; min-height:44px`
  - Added `-webkit-backdrop-filter` to `nav.scrolled`, `#ai-bubble`, `#ai-fab` (iOS Safari)
  - Added `html { touch-action: manipulation }` — removes 300ms tap delay
  - Footer font on mobile: `0.45rem` → `0.55rem` (more readable)
  - Equalizer rAF loop: added `getComputedStyle().display==='none'` guard — stops when hidden (saves battery on mobile)
  - Scroll listener: added `{passive:true}` — prevents scroll jank
  - Chat `openChat()`: added `visualViewport` scrollIntoView for mobile keyboard
  - Skypack CDN → esm.sh via unpkg then esm.sh (unpkg doesn't resolve bare imports like `from 'three'` in GLTFLoader; esm.sh rewrites all internal imports)
 - **Files**: `style.css`, `index.html`, `app.js`, `mysite.md`

## 🗺️ Session Summary (09 Jun 2026) — TinyWow-style tools + Color Converter + QR bug
- **PDF Compressor rewritten**: Ghostscript WASM client-side (was server XHR). Removed `_pdfcServerUrl`, server scripts (`update-url.sh`, `server.sh`, `tunnel.sh`, launchd plists)
- **Tool tabs**: 4 categories (PDF, Image, Dev, Converter) with tab bar UI (`buildTabs`, `filterTools`, CSS `.tools-tabs`). Old 3 categories collapsed into new 4.
- **New PDF tools** (all client-side via pdf-lib, pdf.js):
  - Merge PDF, Split PDF, Create PDF, PDF to JPG, Unlock PDF, Protect PDF, Extract Text
- **New Image tools** (all client-side via Canvas):
  - Add Border, Make Round, Image Splitter, Pixelate, Combine Images, Add Text, Blur Background, Profile Photo
- **New Dev/Converter tools**:
  - Epoch Converter, CSV↔JSON, XML↔JSON, Split CSV, Create ZIP
- **Color Converter** (added later): HEX / RGB / HSL / HSV / CMYK bidirectional inputs, all editable, color preview, color name lookup, W3Schools link
- **QR Code bug** (unresolved): Hand-written QR generator produces unscannable codes. Two fixes attempted:
  1. Fixed data placement column traversal (was processing 2 cols per loop stepping 1 → overlapping pairs). Changed to 1 col per loop.
  2. Fixed direction alternation (was using `(n-1-col)%2` parity → breaks when col 6 skipped). Changed to boolean toggle.
  3. Fixed quiet zone (was ~0.7 modules → 4 modules).
  - **Still broken** after both fixes — needs deeper debugging (suspect: RS encoding, format info BCH, or mask application logic)
- **Key deps**: pdf-lib (CDN dynamic import), pdf.js, JSZip, Ghostscript WASM
- **Headers**: `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` in `_headers` for WASM SharedArrayBuffer
- **Version**: commit `02d4c09`
- **Commits**: `0e41afb` → `554a4bf` → `1a499e5` → `b05c54f` → `2c5b5f2` → `02d4c09`
- **Files**: `tools.js` (new all tool definitions, templates, JS logic), `style.css` (tool tabs CSS)

## 🗺️ Session Summary (10 Jun 2026) — AI Image Generator + Player SVGs + Playlist Modal (reverted)
- **AI Image Generator**: New 27th tool — FLUX.1-schnell via HuggingFace Inference API
  - API URL fixed: `api-inference.huggingface.co` (dead DNS) → `router.huggingface.co/hf-inference/models/`
  - Missing `prompt` variable fixed (was never read from textarea)
  - Chip click fixed: IIFE → inline `onclick` (DOM wasn't ready)
  - Batch count fixed: replaced `next()` with `pending` counter (prevented extra requests when 503 retries overlapped)
  - Preview fixed: blob → base64 data URL via FileReader (COEP `require-corp` blocks blob: URLs)
- **Token security**: Hardcoded HF token replaced with `__HF_TOKEN__` placeholder + GitHub Actions + Secret
- **Workflow**: Created `.github/workflows/deploy.yml` — checkout → Python token injection → deploy-pages
  - Fixed YAML indentation (literal block scalar issue)
  - Added `contents: write` + `pages: write` + `id-token: write` permissions
- **`_headers` not deployed**: `actions/deploy-pages` may not process `_headers` file — COEP/COOP headers missing from live site, may affect PDF compressor (SharedArrayBuffer) and AI preview
- **Version**: v4.6 → v4.7
- **Commits**: `7838080` → `96e35d6` → `5058c85` → `d4e237e` → `274ebc3` → `9e92c42` → `a050128` → `5541f8d` → `be087e6` → `918abed` → `b2c9fe5`

### 19. Player SVG Icons (Tabler)
- **What**: Replaced unicode chars (`‹‹`, `▸`, `››`, `▌▌`) with inline Tabler SVG icons
- **Icons**: `player-skip-back`, `player-play`/`player-pause` (toggle), `player-skip-forward`
- **Files**: `index.html:406-416`, `app.js:489-496`, `style.css:1013-1020`
- **Details**: SVGs use `currentColor`, `fill="none" stroke-width="2"`, buttons get `display:inline-flex` for centering
- **Bug**: Two `onPlayerStateChange` existed — app.js (SVG toggle) overridden by index.html (`.textContent` with unicode). Fixed index.html to use SVG toggle.
- **Files**: `index.html:1183-1199`

### 20. Playlist Modal — Attempted & Reverted
- **Goal**: Click song title → open modal showing playlist with titles
- **Problems**:
  1. `player.getPlaylist()` returns undefined for RD (radio mix) playlists
  2. Two `let player` declarations: app.js IIFE (never initialized, used by `showPlaylistModal` via closure) vs index.html (actually works). `let` doesn't set `window.player` → function always saw undefined `player` → early return
- **Fixes attempted**: `var player` + `window.player`, inline HTML modal, inline `onclick` — still didn't work
- **Lesson**: Next time start minimal — one static HTML div + one toggle function. Avoid IIFE scope complexity.
- **Status**: **REVERTED** (commit `b2c9fe5`)
