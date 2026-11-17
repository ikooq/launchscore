# Contributing

Thanks for helping! Most useful contributions, in order:

1. **Channel knowledge** — rules, timing and formats for communities in `skills/launchscore/references/channels.md`. Cite the community's rules page where possible.
2. **Audit checks** — new checks in `skills/launchscore/scripts/audit.mjs`. Keep it zero-dependency and explain the weight you chose.
3. **Real launch results** — before/after Launch Score and what happened. Open an issue with the `launch-report` label.

## Dev

```bash
node skills/launchscore/scripts/audit.mjs .            # run on this repo
node skills/launchscore/scripts/audit.mjs ../other --json --no-write
```

Keep the skill honest: no features that automate posting, voting, or star exchanges.
