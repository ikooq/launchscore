---
name: launchscore
description: Prepare and launch an open-source repository so people actually discover and star it. Use when the user wants to launch, promote, publish, "get stars", go viral, post to Hacker News / Reddit / X / Product Hunt / Habr, improve a README for conversion, make a demo GIF or social preview image, or asks "why does nobody star my repo?". Scores launch readiness, rewrites the README, produces visual assets, sets repo metadata, and writes channel-native launch posts plus a launch-day plan.
---

# Launchscore — launch a repo so it gets discovered

Stars are bookmarks. A repo gets them when two things are true:
1. **A stranger understands the value in under 10 seconds** (positioning + README first screen + demo).
2. **Enough strangers see it in a short window** (a coordinated launch that can reach GitHub Trending).

Your job is to fix both — honestly. You never fake traction.

## Hard rules

- **Never post, comment, vote, or submit anything on the user's behalf.** You write drafts into files; the user publishes them.
- **Never suggest buying stars, star-for-star exchanges, voting rings, or asking people to upvote.** These violate GitHub, Hacker News and Reddit rules, get detected, and can get the account or domain banned. Asking friends to *look at* a project is fine; asking them to *upvote* is not.
- **No claims the code can't back up.** If the README says "10x faster", there must be a benchmark in the repo. Overclaiming kills HN threads.
- Changing the GitHub repo's description, topics or homepage is outward-facing: show the exact `gh` command and ask before running it.

## Workflow

Work through the phases in order. Write every deliverable into a `launch/` folder at the repo root (create it), except README changes, which go into the real README. Keep the user in the loop with one short line per phase.

### Phase 1 — Audit (always first)

Run the readiness audit from this skill's directory:

```bash
node <this-skill-dir>/scripts/audit.mjs <repo-path>
```

It prints a **Launch Score /100** with a per-check breakdown and writes `launch/audit.json`. Show the user the score and the top 3 fixes. Re-run it at the end to show the improvement — the before/after is motivating and shareable.

If `gh` is authenticated and the repo has a GitHub remote, the script also checks description, topics, homepage, social preview, releases, good first issues and whether a GitHub Actions badge in the README is red. If not, those checks are marked `skipped`, not failed.

`--badge` prints only a Markdown shields.io badge with the score; offer it once the score is 75 or higher.

### Phase 2 — Positioning

Read the code, the existing README and package metadata until you can answer these. Ask the user only what you truly cannot infer (max 3 questions, in one message):

| Question | Output |
|---|---|
| Who exactly is this for? | One audience, named concretely ("people running Claude Code daily", not "developers") |
| What painful thing does it replace? | The "before" in one sentence |
| What's the aha moment? | The 10–20 seconds of usage that make someone go "oh, nice" — this becomes the demo |
| What are the alternatives and why is this different? | 2–4 alternatives, one honest differentiator each |
| What's the hook category? | One of the patterns in `references/positioning.md` |

Write `launch/positioning.md` with: **one-liner** (≤ 12 words, no buzzwords), **tagline variants** (3), audience, before/after, differentiators, and the hook category. Load `references/positioning.md` for one-liner formulas and the hook catalog.

### Phase 3 — README rewrite

Load `references/readme-playbook.md` and rewrite the README to its structure. The non-negotiables for the first screen (what's visible without scrolling on GitHub):

1. Name + one-liner
2. Demo GIF/video (placeholder path `launch/demo.gif` until Phase 4 produces it)
3. Install/run in ≤ 3 lines, copy-pasteable, that **actually works from a clean machine** — verify it if you can
4. 3–5 bullet "why" list

Preserve all existing factual content the user still needs (API docs, config) below the fold. Show a diff summary before/after.

### Phase 4 — Visual assets

Load `references/assets.md`. Produce:

- **Demo** — for a CLI: a VHS tape (`launch/demo.tape`) from `assets/demo.tape`, rendered to `launch/demo.gif` if `vhs` is installed; otherwise give the one-line install + render command. For a web app/UI: a scripted browser recording or a 3–5 frame GIF from screenshots. For a library: a short side-by-side "before/after code" image.
- **Social preview** (1280×640) — fill `assets/social-preview.html` with the one-liner and render it to `launch/social-preview.png` with whatever headless browser is available (Playwright, Chrome `--headless --screenshot`, or the agent's own browser tool). Tell the user to upload it at *Settings → General → Social preview* (GitHub has no API for it).

### Phase 5 — Repo metadata

Propose, then (with approval) apply:

```bash
gh repo edit --description "<one-liner>" --homepage "<demo or docs url>" --add-topic a,b,c
```

Topics: 6–12, mixing broad (`cli`, `ai`, `developer-tools`) and specific (`claude-code`, `mcp`). Also check: LICENSE present, a tagged release exists (`gh release create v0.1.0 --generate-notes`), issues enabled, 3–5 issues labeled `good first issue`.

### Phase 6 — Launch posts

Load `references/channels.md`. For each channel that fits the project's audience (not all of them — pick 3–6), write `launch/posts/<channel>.md` in that channel's native format, length and tone. Every post must:

- Lead with the problem or the result, not with "I built"
- Link the repo (or the demo), never ask for upvotes or stars
- Disclose that the poster is the author
- Include a prepared **first comment** where the channel expects one (HN, Product Hunt, Reddit)

Also write `launch/faq.md`: the 8–10 skeptical questions commenters will ask ("why not just use X?", "is this secure?", "what's the license?", "does it phone home?") with honest short answers. Answering fast in the first hours matters more than the post itself.

### Phase 7 — Launch plan

Load `references/launch-plan.md` and write `launch/plan.md`: T-7 days → launch day hour by hour (in the user's timezone — ask or infer) → T+7 days, including the second-wave plan (next release = next launch). Finish by re-running the audit and showing before → after score.

## Final message to the user

End with: the before → after Launch Score, the list of files in `launch/`, the 3 things only the user can do (upload social preview, publish posts, be online to answer comments), and the recommended launch slot.
