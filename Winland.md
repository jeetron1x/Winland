# Windows Dynamic Island: Build Prompt for Antigravity

*Hand-off prompt · working name \<APP\_NAME> (keep it in one constant) · Windows 10 (2004+) and Windows 11 · prepared for Jeet, 13 Nov 2026*

## How to use this document

Paste Sections 1 to 12 into Antigravity as one task. If it stalls or drifts, feed it one phase at a time from Section 10 and keep Sections 1 to 9 as standing context. Phase 0 is the riskiest part, so do not let it skip that phase.

## 1. Mission

Build a Windows 10/11 desktop app that turns the top-centre edge of the screen into a live, useful hub, like the iPhone’s Dynamic Island or a MacBook notch. It stays out of the way when nothing is happening, then expands to show music playback, timers, calls (mic in use), the next calendar event, charging and volume status, downloads, clipboard history, quick notes, a file shelf and a simple camera mirror, plus widgets and quick controls.

Windows has no hardware notch, so the app draws its own, in two user-selectable shapes: **Notch** (hangs from the top edge with concave top corners, like a MacBook) and **Island** (a floating pill with a small gap above it). Expanded sizes: small, medium, large.

It must feel polished and native on Windows 11 and degrade gracefully on Windows 10 2004+, with a tray icon for settings and a dark, glassy look. Free for everyone, with no account, no tracking and no paid dependency (Section 13). Everything stays on the PC unless a feature really needs the network (lyrics, weather, calendar feed, update check), and each of those is opt-in.

**References.** (a) A macOS notch-hub prompt with the same feature set, adapted here for Windows. (b) A screen recording of an existing commercial Windows app, NotchPixel, whose UI is the visual benchmark: clean, glassy, calm, very well animated. Use it for inspiration only. Do not copy its name, logo, icons, artwork, wording or pixel-exact layouts. “Dynamic Island” is Apple’s trademark, so do not use it in the app name.

## 2. Non-negotiables

| Area | Requirement |
| --- | --- |
| Focus | Never steals focus (WS\_EX\_NOACTIVATE). No taskbar button, no Alt-Tab entry. |
| Input | Never blocks clicks outside the visible shape. |
| Idle cost | Under 1% CPU and under 150 MB RAM while resting. Nothing polls or animates while the island is still, unless a feature needs it. |
| Motion | Spring-based, at the display’s refresh rate in Fluid mode, capped at 60 fps in Balanced. If Windows “Animation effects” is off, use instant crossfades. |
| Privacy | No telemetry, no analytics, no accounts, no crash uploads. Network only for opt-in features (Section 8). |
| Accessibility | Global hotkey opens it, arrow keys move between tabs, Esc closes. UI Automation names on every control, high-contrast support, text contrast at least 4.5:1. |
| Compatibility | Windows 10 build 19041+ and Windows 11, x64 (ARM64 if it costs nothing). Per-monitor DPI v2, 100 to 250% scaling, multi-monitor. |
| Localization | All strings in .resw files. Ship English first. |

## 3. Stack and architecture

**Recommended stack:** C# on the current .NET LTS supported by the Windows App SDK version you pick (verify), WinUI 3 on Windows App SDK 2.x (the stable 2.x line was at 2.4 in Aug 2026; check learn.microsoft.com for the current stable), packaged as MSIX, with Win32 interop through the CsWin32 source generator. MVVM with CommunityToolkit.Mvvm, DI with Microsoft.Extensions.DependencyInjection, settings as versioned JSON in %LOCALAPPDATA%. If Phase 0 proves WinUI 3 cannot deliver the window shell in Section 4, fall back to WPF with a layered window and tell me why.

**Core pieces**

- **IslandStateMachine**: Hidden, Resting, Peek (auto-dismissing live activity), Expanded(tab), Pinned, FullscreenStrip. Unit-test it.
- **ActivityArbiter**: decides what the resting pill shows when several live activities exist. Priority: active call, timer finishing, download, music, charging. Lower-priority ones show as small dots. Unit-test it.
- **IIslandModule**: id, icon, resting view, peek view, expanded view, settings page, permissions needed. Every tab is a module, so a disabled feature costs nothing.
- **Services**, one per OS capability, each behind an interface so it can be mocked: Media, Audio, Power, Clipboard, FileShelf, Downloads, Calendar, Weather, SystemStats, Notifications, Hotkeys, Settings, Display (monitors, DPI, fullscreen detection).
- **IIslandWindowHost**: abstraction over whichever window technique wins Phase 0, so it can be swapped later.

## 4. The window shell (hardest part, do this first)

Goal: a borderless, topmost, non-activating, shaped, blurred window that morphs between sizes smoothly.

| Requirement | Detail |
| --- | --- |
| Window styles | WS\_EX\_TOOLWINDOW, WS\_EX\_NOACTIVATE, topmost. Hidden from Alt-Tab and Task View. |
| Shape | Pill and notch silhouettes with anti-aliased edges. No jagged SetWindowRgn edges at 150% DPI and above. |
| Backdrop | Live blur that follows the silhouette. Windows 11: DWM system backdrop. Windows 10: acrylic accent via SetWindowCompositionAttribute (undocumented, so isolate it behind an interface) or a solid Graphite fallback. |
| Hit-testing | Only the visible silhouette (plus the hot zone) receives pointer input. The rest of the monitor is untouched. |
| Resizing | Animate composition visuals and clips rather than resizing the HWND every frame. If the HWND must resize, avoid flicker. |
| Capture | Optional setting to hide the island from screen recording and sharing (SetWindowDisplayAffinity with WDA\_EXCLUDEFROMCAPTURE). Off by default. |

**Prototype these candidates and pick by measurement, not opinion:**

- **A.** WinUI 3 window with system backdrop plus a region or DWM rounded corners.
- **B.** WinUI 3 with Composition visuals and a geometric clip inside a fixed host window.
- **C.** WPF layered window (AllowsTransparency) plus SetWindowCompositionAttribute blur.
- **D.** Win32 with DirectComposition and Direct2D (most control, most work).

**Acceptance:** frame time during 100 open/close cycles stays within budget (about 8.3 ms at 120 Hz, 16.6 ms at 60 Hz) with under 2% dropped frames; typing in Notepad is never interrupted while hovering the island; edges look smooth at 100, 150 and 200% scaling; blur follows the shape; idle GPU is about 0%; works across two monitors with different DPI. Write a one-page report naming the winner and why.

## 5. Visual design language

The numbers below were estimated from a compressed screen recording, so treat them as starting values and tune by eye. Put the final values in docs/DESIGN.md as design tokens.

### 5.1 States and sizes (device-independent px)

| State | Notch shape | Island shape | Shows |
| --- | --- | --- | --- |
| Resting | 168 × 32 | 132 × 30, 8 px gap from the edge | Plain black pill when idle. With music: tiny artwork on the left, 3 to 5 visualizer bars on the right. |
| Peek | 360 × 68 | 360 × 68 | One live activity for 2.5 to 4 seconds. |
| Small | 380 × 150 | same | Expanded card |
| Medium | 440 × 200 | same | Expanded card |
| Large | 520 × 280 | same | Expanded card with extra controls |

Expanded card corner radius up to 34 px. A Corners setting (0 to 100%, from square to fully round) controls the pill, card and drawers together. In Notch mode the top corners are concave fillets (about 12 px) that merge into the screen edge, with no outer shadow. In Island mode use a soft shadow (0 8 24, black 35%).

### 5.2 Motion

- Springs: response about 0.40 s, damping 0.72 on open and 0.80 on close. Morph width, height and corner radius together as one motion.
- Content cross-fades in with a short blur-in (about 120 ms) once the container passes roughly 60% of its target size. Tab icons stagger in 15 ms apart.
- Interrupting an animation mid-way must retarget smoothly, never restart or jump.
- Modes: **Fluid** (display refresh rate), **Balanced** (60 fps on battery), **Battery saver** (30 fps or less, no blur transitions). Draw nothing while still.

### 5.3 Surfaces and colour

- **Surfaces (user setting):** Glass (default), Graphite, Acrylic, Black (true #000 for OLED), plus soft glass tints: Rosé, Lavender, Peach, Sakura, Candy.
- **Glass:** blurred backdrop, a white 6 to 10% tint, a 1 px gradient edge stroke (white 24% fading to 6%) and a faint top highlight. **Graphite:** opaque #1B1B1E with the same stroke. **Acrylic:** the desktop shows through, blurred.
- **Artwork-driven colour:** on the music card, extract 2 or 3 dominant colours from a 64 × 64 downsample of the artwork (median cut or k-means), build a diagonal gradient, and darken it until white text keeps at least 4.5:1 contrast. Add 2 to 3% fine grain to avoid banding. The resting pill and visualizer take the same tint, so a red album turns the island crimson and a sunset album goes orange to purple.
- **Type:** Segoe UI Variable (Display for titles, Text for body). Title 15 px semibold, artist 13 px at white 60%, times 11 px with tabular figures.
- **Icons:** Fluent UI System Icons (MIT), 16 px, bundled so Windows 10 looks identical to Windows 11.

### 5.4 Layouts to match

**Tab strip.** A slim row of 16 px icons centred at the top of the expanded card, 12 px apart, with a small dot under the active one, then a thin divider and the settings gear at the far end. Order: Music, Notifications, Shelf, Clipboard, Notes, Widgets, Quick controls, Camera, Audio devices, then Settings. It fades in about 80 ms after the card opens and collapses into an overflow chevron when narrow. An optional small circular button in the top-right corner switches theme quickly.

**Music.** A large rounded-square artwork (64 to 72 px, radius 14) on the left with a tiny source-app badge on its bottom-right corner. Title and artist sit beside it. Previous, a larger play/pause, and next sit on the right. Below that, a wavy (sine) progress line whose phase animates while playing and flattens to a straight line when paused, with elapsed time on the left and negative remaining time on the right. Dragging scrubs. In Large, a volume slider appears on hover. Visualizer options: Pixels (square blocks), Bars (rounded), Wave.

**Widgets** (a bento grid of glass tiles, radius 18):

- Calendar tile: big day number, weekday and month, week number, a week strip S M T W T F S with today in a rounded highlight, and the next event line when a calendar feed is enabled.
- Focus timer tile: progress ring showing 25:00, a ‘25 + 5 min’ label, play, minus and plus.
- Weather tile: large temperature, condition icon, high/low, condition text.
- System stats tile: CPU, GPU and RAM as mini bars with percentages, GPU temperature if available, network up/down.
- A small circular bell button sits at the centre of the grid as the notification / do-not-disturb toggle, with an unread dot.

**Quick controls.** Two tall vertical sliders (brightness and volume, each with icon and percentage) on the left. On the right, a 2 × 3 grid of toggle tiles: Wi-Fi, Night light, Focus, Mute, Sound output, Mic. Active tiles fill with the accent colour and show a one-word state under the title. Along the bottom, a segmented control for Battery saver / Balanced / Performance, where the selected segment is a white pill with dark text.

**Clipboard.** Filters All / Text / Links / Images / Files, a pinned row on top, search. Click copies; paste-on-click is optional.

**Shelf.** A drop zone with a dashed outline that pulses while a drag hovers the island, an icon/thumbnail grid, drag-out, per-item remove and Clear.

**Notes.** A list with a 3-line preview per note and a simple editor with autosave.

**Camera.** A rounded, mirrored live preview with a small ‘camera on’ indicator. The camera is released the moment the tab changes or the island collapses.

**Peeks (live activities).** Track change (artwork and title), charging (battery ring and percent), low battery, volume (slider and speaker icon), timer done (ring pulse), download done (checkmark and filename), call (app icon, call timer and a mute button).

## 6. Features and Windows feasibility

Tier A means solid, build it fully. Tier B means best-effort: label it honestly in the UI and design a fallback. Tier C means out of scope for v1.

| Feature | How to build it on Windows | Tier |
| --- | --- | --- |
| Music from any app | GlobalSystemMediaTransportControlsSessionManager (Windows.Media.Control): title, artist, artwork, play/pause/skip, seek, timeline. Extrapolate position between updates. Some apps report poor timelines, so disable controls they do not support. | A |
| Lyrics | Opt-in. Synced lyrics from LRCLIB (lrclib.net) by title, artist and duration, cached locally. | B |
| Timers | Focus timer (25 + 5), countdown, stopwatch. Live activity, toast and sound on finish. | A |
| Reminders | Local reminders with optional repeat rules, stored on the PC. Set one in seconds; Snooze and Done from the island or the toast. Scheduled with Windows toast notifications and re-armed on every launch so a restart never loses one. | A |
| Next calendar event | ICS feed URL or a local .ics file. No account sign-in. Refresh about every 15 minutes when enabled. | A |
| Calls | Detect microphone-in-use (capture audio sessions, or the CapabilityAccessManager registry keys) and show a call pill with the app name and call timer. Global mic-mute hotkey (default Ctrl+Alt+M) via Core Audio capture endpoints. | A |
| Incoming-call peek | No reliable cross-app API. Only via the notification mirror for known apps (Teams, WhatsApp, Discord, Zoom, Phone Link). | B |
| Charging | Windows.Devices.Power.Battery or GetSystemPowerStatus. Peek on plug/unplug, ring with percent, low-battery warning. | A |
| Volume | Core Audio endpoint volume events and a peek with a slider. Do not try to suppress the OS volume flyout in v1. | A |
| Brightness | WMI for built-in displays, DDC/CI for external monitors. Varies by hardware. | B |
| Wi-Fi and Bluetooth | Windows.Devices.Radios toggles (needs a consent prompt). | B |
| Night light, Focus | No stable API. Tiles deep-link to ms-settings:nightlight and ms-settings:quiethours. | B |
| Power mode | PowerSetActiveOverlayScheme (powrprof), with a deep-link fallback. | B |
| Downloads | FileSystemWatcher on the real Downloads known folder. Detect in-progress temp extensions (.crdownload, .part, .tmp, .download, .opdownload). Show size and speed, and percent only when the total is known. Done state offers Open, Show in folder, drag out. | A |
| Clipboard history | AddClipboardFormatListener for text, links, images, files. Pin, search, clear. Skip content flagged by password managers (the ExcludeClipboardContentFromMonitorProcessing and CanIncludeInClipboardHistory formats). Encrypt at rest with DPAPI, auto-expire unpinned items (default 24 h), pause toggle. | A |
| Quick notes | Local plain text or markdown, autosave, multiple notes, pin, search. | A |
| File shelf | Drag in (store references by default, copy optional), drag out to any app via standard OLE drag-and-drop, auto-clear after N days. | A |
| Send to phone | Small local web server (Kestrel or HttpListener) on the LAN adapter, random port, random one-time key, QR code shown on the island. The phone downloads from its browser, no app needed. Alive only while the code is on screen. Refuse on networks Windows marks Public. First use triggers a Windows Firewall prompt. | B |
| Camera mirror | Windows.Media.Capture (MediaCapture and MediaFrameReader). Mirrored preview, released immediately on close. No recording and no screenshots in v1. | A |
| Notification mirror | UserNotificationListener. Needs MSIX package identity and user permission. Event support differs for desktop apps, so poll lightly if needed (verify in the docs). | B |
| System stats | PDH counters for CPU, memory, network and GPU Engine. | A for CPU, RAM, network; B for GPU %; C for temperatures |
| Game strip | A slim CPU/GPU/RAM strip over borderless or windowed fullscreen games. Real FPS needs ETW present events (PresentMon-style) and elevation, so make it an opt-in extra. | B |
| Fullscreen behaviour | SHQueryUserNotificationState plus foreground-window versus monitor-bounds checks. Options: hide, strip, or normal. | A |
| Weather | Opt-in, Open-Meteo, city chosen by search (no IP geolocation). | A |
| Liquid-glass refraction | Needs live capture of what is behind the island plus a shader (Windows.Graphics.Capture, borderless capture only on Windows 11) and conflicts with hide-from-capture. Phase 5 stretch, off by default. | C |
| Phone remote, web drawer, taskbar replacement, AI-agent status, stream chat | Post-v1 backlog. | C |

## 7. Behaviour rules

- **Opening:** pointer rests on the island, or on an invisible hot zone along the top-centre edge (default 220 px wide), for 120 ms. Also a configurable global hotkey (default Ctrl+Alt+Space). Click pins it open. Esc, a click outside, or the pointer leaving for 300 ms closes it unless pinned.
- **Hot zone:** use a thin transparent hot-zone window, not a global low-level mouse hook. Hooks add overhead and look suspicious to antivirus tools.
- **No accidental triggers:** ignore the pointer while a mouse button is held (window drags), except when the drag carries files. A file drag entering the hot zone opens the island straight onto the Shelf.
- **Multi-monitor:** primary monitor by default with a setting to choose another. Rebuild on display change, DPI change, sleep/wake and RDP reconnect.
- **Taskbar at the top:** detect it (ABM\_GETTASKBARPOS) and offset below it.
- **Fullscreen:** hide or shrink to the strip. Exclusive fullscreen cannot be drawn over, so say so in the setting’s helper text.
- **Lock and idle:** stop all rendering when the screen is locked or the display is off.
- **Lifecycle:** single instance, optional start with Windows, and crash-safe. A crash must never leave an invisible topmost window eating clicks.

## 8. Privacy and security

- No account, no telemetry, no analytics, no remote logging. Local log file only, no content from the clipboard, notes or files in it.
- All data lives under %LOCALAPPDATA%. Clipboard history is encrypted with DPAPI. A ‘Delete all my data’ button wipes everything.
- Network calls only when the user turns the feature on: lyrics (LRCLIB), weather (Open-Meteo), calendar feed (the user’s own ICS URL), update check (off by default; via the Store or GitHub Releases). Send to phone uses the local network only and never touches the internet.
- Windows permissions are requested at the moment a feature is enabled, with a plain-language explanation.
- Ship a Privacy page in Settings and a docs/PRIVACY.md with a table of every feature, what it reads, what is stored, and any network call. Generate it from the real code paths.
- Keep dependencies minimal and permissively licensed, and list them in THIRD\_PARTY.md.

## 9. Settings and onboarding

**Settings window:** a normal window of about 860 × 600, Mica or acrylic, radius 16, with a left sidebar (search box plus sections) and content on the right. v1 sections: General, Appearance, Island, Panels, Widgets, Calls, Gaming, Privacy, Shortcuts, About. Every setting gets one line of plain-language helper text.

**Appearance page** opens with a live preview of the island with a Resting / Open toggle that reacts instantly to every control: Surface, Corners slider, Motion mode, Visualizer, Size, Shape (Notch or Island), and Accent (follow artwork or fixed colour).

**Island page:** monitor choice, hover or click to open, hover delay, hot-zone width, fullscreen behaviour, hide from screen recording, auto-hide when idle.

**First-run welcome dialog:** language, then ‘Move your pointer to the top of the screen to try it’, then Next.

**Tray icon:** Open settings, Pause (1 hour, until tomorrow), Quit.

## 10. Build phases

Do not start a phase until the previous one passes its acceptance list.

**Phase 0: window shell spike.** Tiny runnable demo: resting pill, hover opens a mock Medium card, tab-strip placeholder, Glass / Graphite / Black switch, plus the one-page report. *Acceptance:* the Section 4 list.

**Phase 1: core and music.** Tray icon, single instance, settings store, state machine, hot zone, hotkey, Resting / Peek / Expanded, Music module, artwork-driven colour, wavy progress, visualizer, track-change peek. *Acceptance:* works with Spotify, YouTube in Chrome and Edge, and VLC. Scrubbing works where the app supports it. Unsupported controls are disabled. ‘Nothing playing’ state is designed.

**Phase 2: widgets and quick controls.** Widgets tab (calendar with ICS next event, weather, system stats, focus timer and stopwatch), timer as a live activity, Reminders, Quick controls tab, Notifications tab. *Acceptance:* every tile works or shows a clear unsupported state. A timer survives collapsing the island and finishes with a toast and sound. A reminder set before an app restart still fires on time, and Snooze and Done work from the island.

**Phase 3: productivity.** Clipboard, Shelf (drag in and out, auto-open on file drag, Send to phone with a QR code), Notes, Downloads live activity. *Acceptance:* copies from Notepad, Chrome and Explorer are captured. Password-manager entries are skipped. Dragging from the Shelf into Explorer, Discord and Chrome works. Download-done peek works for Chrome and Edge. Send to phone works from a phone camera on the same Wi-Fi, the link stops working once the code is dismissed, and it refuses on networks Windows marks Public.

**Phase 4: system awareness.** Charging and low-battery peeks, volume and brightness peeks, mic-in-use call pill with timer, global mic-mute hotkey, camera mirror, fullscreen strip and game strip. *Acceptance:* mute toggles every capture device. The camera light goes off when the tab closes. The strip appears over borderless fullscreen games and hides in exclusive fullscreen as documented.

**Phase 5: polish and ship.** Full settings window with live preview, all themes, onboarding, accessibility pass (UIA, high contrast, reduced motion), performance pass against Section 2 budgets, MSIX build plus a portable zip, README with screenshots and the privacy table. *Stretch:* liquid-glass refraction (Windows 11 only, off by default).

**Post-v1 backlog:** web drawer, phone-as-trackpad remote, taskbar replacement, AI-agent status, stream chat, per-monitor islands.

## 11. Quality bar and testing

- Unit tests for the state machine, activity arbiter, settings migration and colour extraction.
- Manual matrix: Windows 10 22H2 and Windows 11 current; DPI 100, 125, 150, 200%; one and two monitors; YouTube in fullscreen (F11); a borderless-fullscreen game; Spotify, Chrome, Edge, VLC and Apple Music; sleep/wake; RDP; screen lock.
- Record real measurements (CPU, RAM, frame time) in docs/PERF.md. Do not invent numbers.
- Every empty, error and permission-denied state is designed, never a blank card.

## 12. Working agreement

1. Before coding Phase 1, produce docs/PLAN.md (architecture, phase plan, risks) and docs/DESIGN.md (colour, radius, spacing, type and motion tokens) and show them to me.
2. Run Phase 0 first and report which window technique won, with measurements.
3. Verify every OS API against current Microsoft documentation (learn.microsoft.com). Do not guess signatures or behaviour, and link the doc page in a code comment for any non-obvious interop.
4. At the end of each phase, run the app, walk the acceptance list and report pass or fail honestly. Never claim a feature works unless you ran it.
5. No mock data in shipped code paths. Mark Tier B features as best-effort in the UI.
6. If something in this prompt is infeasible or contradicts the docs, say so and propose the closest alternative instead of silently dropping or faking it.
7. Ask me only when genuinely blocked. Otherwise make a sensible choice and record it in docs/DECISIONS.md.
8. Use an OSI-approved open-source licence (MIT unless I say otherwise). See Section 13.

## 13. Cost and licensing: free by design

Nothing in this app needs a paid product, a paid API or a paid certificate, and no feature is gated, trial-limited or ad-supported. The paid apps in NotchPixel’s pricing table are what it replaces, not what we depend on: every feature below is built on free Windows APIs and free libraries.

| Paid app it replaces | Our free implementation | Cost | Limit to know |
| --- | --- | --- | --- |
| Clipboard history (ClipboardFusion Pro) | Clipboard module (Section 6), built on the Windows clipboard listener | $0 | None |
| Lyrics and now playing (Lyricify Fusion) | Windows media session API plus LRCLIB synced lyrics | $0 | LRCLIB is a free, keyless, volunteer-run service with no uptime guarantee. Cache every lyric locally and show a calm ‘No lyrics’ state if it is down. |
| FPS and hardware overlay (FPS Monitor) | PDH counters for CPU, RAM and GPU; FPS from ETW present events (the approach open-source PresentMon uses) | $0 | Real FPS and temperatures need admin rights or a driver, so they are opt-in extras. |
| Desktop widgets (Widget Pro Premium) | Widgets tab with optional pin-to-desktop | $0 | Weather comes from Open-Meteo: free for non-commercial and open-source use, no key, fair-use limit of 10,000 calls a day, and its CC BY 4.0 licence requires a visible ‘Weather data by Open-Meteo.com’ credit. |
| File shelf (Dropshelf Pro) | Shelf module | $0 | None |
| Files to your phone (AirDroid Personal Premium) | Local web server and QR code on the same Wi-Fi, no cloud, no app on the phone | $0 | First use triggers a Windows Firewall prompt. |
| Reminders and focus timer (TickTick Premium) | Reminders and Timer modules, stored on the PC | $0 | No cross-device sync, by design. |
| Mic mute key (Talk Toggle) | Core Audio capture-endpoint mute plus a global hotkey | $0 | None |

### What building and shipping costs

- **Tools:** Visual Studio Community (or the .NET SDK with VS Code), the Windows App SDK and WinUI are free. Use only MIT, Apache-2.0, BSD or MPL-2.0 libraries and list them in THIRD\_PARTY.md.
- **Store:** individual Microsoft Store developer registration has been free since September 2025, and Microsoft re-signs MSIX packages after certification, so a Store release needs no paid certificate and shows no SmartScreen warning.
- **Outside the Store:** an unsigned GitHub or portable build triggers a SmartScreen warning. The free fix is SignPath Foundation, which signs open-source projects at no cost but requires an OSI-approved licence, a public repository, an automated build and a code-signing policy page, and does not approve every project. Until then, publish through the Store and explain in the README why direct downloads show a warning.
- **Services:** only LRCLIB and Open-Meteo, both opt-in and both behind interfaces so a provider can be swapped. Cache their results.
- **Licence:** publish under an OSI-approved licence such as MIT. Open-Meteo’s free tier is for non-commercial use, so adding ads, a paid tier or paid features would mean paying Open-Meteo or switching weather providers first.
