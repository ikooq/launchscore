# Launch plan

GitHub Trending ranks by star velocity relative to the repo's usual activity. Concentrating attention into ~24–48 hours is what gets a repo onto Trending, and Trending then brings a second, larger wave on its own. Spread-out posting rarely trends.

Write `launch/plan.md` with concrete dates and times in the user's timezone.

## T-7 → T-1: prepare

- [ ] Launch Score ≥ 80 (`scripts/audit.mjs`)
- [ ] Quick start tested from a clean clone by 3–5 other people; fix every stumble
- [ ] v0.1.0 (or v1.0.0) release tagged with notes
- [ ] Demo GIF + social preview uploaded
- [ ] All posts drafted in `launch/posts/`, FAQ in `launch/faq.md`
- [ ] 3–5 `good first issue`s open
- [ ] Tell friends/colleagues *the day and time* so they can look at it and leave genuine feedback (not votes)
- [ ] Pick the slot: Tue–Thu, aligned with the HN window (≈ 8–10 am US Eastern)

## Launch day

| Time (relative) | Action |
|---|---|
| H-1 | Final check: README renders, quick start works, links work, no secrets in repo |
| H0 | Post Show HN + immediately post the first comment |
| H0 + 15 min | Post X thread |
| H0 + 1 h | First Reddit post (best-fit subreddit) |
| H0 – H+4 | **Answer every comment fast**, fix small bugs live, push fixes, say thanks |
| H+3 | Telegram channels / Discords outreach (personal messages) |
| H+6 | Second Reddit post (different sub, adapted text) |
| Evening | Post a short update on X: what you learned / fixed from feedback |

## Day 2–7

- Habr article (if Russian-speaking audience) — day 2 or 3, separate wave
- dev.to / Medium tutorial cross-post
- Product Hunt (if it fits) — separate day, not the HN day
- PRs to awesome-lists, newsletter submissions
- Turn top feedback into issues; ship v0.2 within a week — **each meaningful release is a new launch moment**

## Metrics to watch

- Stars/hour on launch day (star-history.com for the chart)
- README → star conversion: GitHub *Insights → Traffic* (unique visitors vs. new stars). Healthy: 5–15%. Below 3% → the first screen isn't convincing; iterate on the README and demo.
- Referrers in *Insights → Traffic* show which channel actually worked — double down there next time.

## If it flops

Normal. Most launches are small. Look at traffic vs. conversion:
- **Low traffic, good conversion** → distribution problem: try other channels, a different time, a Habr/dev.to article.
- **Good traffic, low conversion** → positioning/README problem: rewrite one-liner and demo, relaunch with the next version.
