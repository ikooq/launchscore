# README playbook

A README is a landing page. Visitors decide in ~10 seconds, mostly from the first screen (≈ the first 25 rendered lines on a laptop).

## Structure

```markdown
<div align="center">

# name

**One-liner that says what it does and for whom.**

[badges: license · version · downloads/CI — max 4]

<img src="launch/demo.gif" alt="demo" width="760">

</div>

## Quick start

​```bash
npx name init          # ≤ 3 lines, copy-paste, works on a clean machine
​```

## Why

- **Benefit 1** — concrete, ideally a number
- **Benefit 2**
- **Benefit 3**

## How it works        (diagram or 5-line explanation)
## Examples            (2–4 real use cases, each with code/output)
## Comparison          (table vs alternatives — honest, with ✅/➖)
## Configuration / API (the reference material, below the fold)
## Roadmap             (3–6 items; signals the project is alive)
## Contributing        (link to CONTRIBUTING.md + good first issues)
## License
```

## Rules

- **Show, then tell.** Demo before any paragraph of prose.
- **The quick start must work.** Broken first command = closed tab. Test it from a fresh clone if at all possible.
- **One install path up front.** Put brew/pip/docker alternatives in a collapsed `<details>` block.
- **Benefits, not features.** "Finds the bug before your reviewer does" beats "AST-based static analysis".
- **Numbers beat adjectives.** "Cuts tokens by 38% on our benchmark (reproduce: `npm run bench`)".
- **Short paragraphs, scannable bullets, real code.** No wall of text above the fold.
- **Images need `width` and `alt`.** GIF ≤ ~8 MB, so it loads on GitHub quickly.
- **No emoji confetti** in every heading; one or two max.
- **Relative links** for files in the repo so they work in forks.
- **Translations** go in `README.<lang>.md`, linked in one line under the badges. Keep English as the main README for global reach.

## Anti-patterns to remove

- "This project is a ..." opening sentences
- Table of contents above the demo
- Long "Background / Motivation" essays at the top (move to a blog post or docs)
- Screenshots of a terminal instead of copy-pasteable code
- "Coming soon" sections with nothing in them
- Stale badges (failing CI badge is worse than none)
