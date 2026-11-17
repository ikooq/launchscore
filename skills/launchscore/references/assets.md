# Visual assets

## Demo

The demo shows **the aha moment** from `launch/positioning.md` — nothing else. 10–20 seconds, loops cleanly, readable at 760 px wide.

### CLI → VHS

[VHS](https://github.com/charmbracelet/vhs) renders a scripted terminal session to GIF/MP4 deterministically.

1. Copy `assets/demo.tape` to `launch/demo.tape`, replace the commands.
2. Render: `vhs launch/demo.tape` (outputs `launch/demo.gif`).
3. Install if missing: `brew install vhs` · `go install github.com/charmbracelet/vhs@latest` · or `docker run --rm -v $PWD:/vhs ghcr.io/charmbracelet/vhs launch/demo.tape`.

Tips: font size 20–24, width 1200, hide setup with `Hide`/`Show`, `Sleep` 2–3 s on the final result so viewers can read it.

### Web app / UI

- Preferred: record a 10–20 s screen capture with a scripted browser (Playwright `recordVideo`), convert with `ffmpeg -i in.webm -vf "fps=15,scale=1200:-1:flags=lanczos" -loop 0 launch/demo.gif`.
- Fallback: 3–5 screenshots of the key steps stitched into a GIF, or a single annotated hero screenshot.
- For a big file, upload an MP4 by dragging it into a GitHub issue/README editor; GitHub gives a `user-attachments` URL that plays inline.

### Library / API

A side-by-side "before / after" code image, or a GIF of the editor showing the API in use. Keep code ≤ 15 lines per side.

### Agent skill / prompt project

Before/after outputs of the agent on the same prompt, with and without the skill. Two screenshots side by side are often stronger than a GIF.

## Social preview (1280×640)

Shown when the repo link is shared on X, Slack, Telegram, Discord, LinkedIn. Without it, GitHub shows a generic card.

1. Copy `assets/social-preview.html` to `launch/social-preview.html`; fill `{{NAME}}`, `{{ONE_LINER}}`, `{{COMMAND}}`, colors.
2. Render at exactly 1280×640:
   - Playwright: `npx playwright screenshot --viewport-size=1280,640 launch/social-preview.html launch/social-preview.png`
   - Chrome: `chrome --headless --screenshot=launch/social-preview.png --window-size=1280,640 launch/social-preview.html`
   - Or the agent's built-in browser at a 1280×640 viewport.
3. User uploads it: **repo Settings → General → Social preview → Edit**. (No API exists for this.)

Keep the important content inside the central ~1100×540 area; some platforms crop edges.
