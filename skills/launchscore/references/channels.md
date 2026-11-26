# Launch channels

Write for the channel, not for yourself. Each channel has its own norms; the same text pasted everywhere reads as spam. **Always check the current rules of the specific community before the user posts** — they change.

Universal rules: say you're the author · link the repo/demo · never ask for upvotes or stars · be online to reply for the first 3–4 hours.

---

## Hacker News — Show HN

- **Title:** `Show HN: Name – what it does in plain words` (≤ 80 chars). No superlatives, no emoji, no "I built", no ALL CAPS.
- **URL:** the GitHub repo (or the live demo if it's the better first impression).
- **It must be something people can try now** — no waitlists, no signup walls for the core demo.
- **First comment (post it immediately):** 150–300 words, first person, humble and specific:
  1. why you made it (the personal pain),
  2. how it works technically (HN loves the interesting implementation detail),
  3. what's rough / not done yet,
  4. what feedback you want.
- **Timing:** weekdays, roughly 8–10 am US Eastern tends to work well.
- **Never** share the HN link asking for upvotes; HN detects voting rings and buries the post. You can share the *repo* with friends.
- If it doesn't take off, HN allows a repost after some time if the first one got little attention; a major new version is a legit new Show HN.

## Reddit

- Read each subreddit's rules and self-promotion policy first; many require a flair, a specific weekday thread, or a minimum account history.
- **Title:** problem/result-first, conversational. "I got tired of X, so I made Y that does Z" works on many subs.
- **Body:** native text post with the GIF/image uploaded directly (not just a link), a short story, how it works, what's next, and the link at the end. Disclose you're the author.
- Post to 2–4 relevant subs spread over 1–2 days, each text adapted. Don't cross-post the same text simultaneously.
- Good fits by audience: r/programming (strict, link posts, technical depth), r/opensource, r/selfhosted, r/commandline, r/webdev, r/SideProject, r/ClaudeAI, r/LocalLLaMA, r/ChatGPTCoding, language subs (r/rust, r/golang, r/Python, r/javascript…).

## Lobsters

A small, invite-only link site focused narrowly on computing. Source: [lobste.rs/about](https://lobste.rs/about), [the `show` tag](https://lobste.rs/t/show).

- **Invite-only.** Accounts come from invitations (spam control). Ask someone you recognise from the site, or the chat; the inviter is public in the user tree.
- **New accounts can't launch.** For the first 70 days a user can't submit self-promo, can't use the `show` tag and can't submit links to domains the site hasn't seen. Only post your project from an account that has been taking part.
- **Self-promo is a minority of your activity.** Rule of thumb from the about page: less than a quarter of your stories and comments in the last year. Authors are welcome, but not as "a write-only tool for product announcements".
- **Tag it `show`** ("Show Lobsters / Projects"), plus the technical tags that fit. Tags come from a fixed list.
- **Topic test:** "Will this improve the reader's next program?" Link the repo or a technical write-up; business news, careers and marketing are off-topic.
- **Clean link:** tracking parameters are stripped and marketing-analytics domains are banned.
- **Title:** there is no written rule, but members can suggest edits (e.g. dropping the site name), so use a plain descriptive title like on HN.
- **Tone:** "more of a garden party than a debate club". Answer comments; don't argue with flags.

## X (Twitter)

- **Tweet 1:** the hook + the demo video/GIF attached natively (native video gets far more reach than links). Link in the first reply or at the end, not necessarily tweet 1.
- **Thread (4–7 tweets):** problem → demo → how it works → one surprising detail → link + "it's MIT, PRs welcome".
- Tag (sparingly) the maintainers of tools you integrate with *only if relevant to them*.
- Reply to people who share it; quote-tweet good feedback.

## Product Hunt

- Best for products with a UI or a broad audience; weaker for pure dev libraries.
- Launch day starts 12:01 am Pacific; prepare gallery images (1270×760), a 260-char description, and a maker first comment.
- Never ask for upvotes — say "would love your feedback" and share the PH link.

## Habr (Russian-speaking developers)

- Format: an article, not an ad. "How I built X: architecture, problems, numbers" — 1 500–4 000 words, code, diagrams, honest failures.
- The repo link appears naturally in the intro and at the end.
- New accounts go through the sandbox (pre-moderation) — the first article must be genuinely useful to pass.
- Add the "Я пиарюсь" hub only if the article is primarily promotional; better to make it not promotional.
- Good time: weekday mornings Moscow time.

## Telegram channels

- Find 5–15 channels in the niche (AI tools, dev, open source). Many admins post interesting projects for free.
- Message: 3–4 lines — what it is, one-liner, GIF, link. Personal, not a mass mailing. Respect a "no".

## Zenn / Qiita (Japanese-speaking developers)

Article platforms for technical knowledge, not link boards. Sources: [Qiita community guideline](https://help.qiita.com/ja/articles/qiita-community-guideline), [Qiita article guideline](https://help.qiita.com/ja/articles/qiita-article-guideline), [Zenn guideline](https://zenn.dev/guideline), [Zenn Tech or Idea](https://zenn.dev/tech-or-idea), [Zenn terms](https://zenn.dev/terms).

- **An announcement alone counts as advertising.** Qiita: no articles whose main purpose is promotion or sales, but a technical explanation of your own product is not promotion. Zenn: avoid posts whose main purpose is promoting a product; keep promotion to a fixed message at the end of the article.
- **Zenn category:** pick **Tech** for architecture and internals, **Idea** for introducing a service ("○○というサービスを作りました"). A Tech deep-dive that happens to be about your tool is the strongest launch post.
- **What readers expect:** first-hand experience, the target reader, versions and prerequisites, honest limits. A specific title; both sites warn against clickbait or sensational (煽り) titles.
- **AI-written text:** allowed on both, but verify it before posting; Zenn asks not to mass-produce articles, and its terms list machine-generated text and repeated identical posts as spam. Write the article in Japanese for these readers (or have a native speaker review it) rather than pasting a translated README.
- **Tags (Qiita):** tags make articles findable; you can add versions, e.g. `Ruby:2.2`.

## dev.to / Medium / Hashnode / LinkedIn

- Cross-post a tutorial-style article ("How to do X with Y") a few days after the main launch to extend the tail.
- LinkedIn: story format, short lines, one image/video, link in the post text.

## Newsletters & awesome-lists (long tail, do in week 2)

- Submit to relevant newsletters (language weeklies, AI tool roundups) via their submission forms.
- Open PRs to 3–5 relevant `awesome-*` lists, following each list's contribution format exactly.

---

## Post templates

### Show HN first comment

```
Hi HN — I'm the author. I built <name> because <specific personal pain, 1–2 sentences>.

It works by <the interesting technical idea, 2–4 sentences>.

What it's good at today: <2–3 bullets>.
What's rough: <honest 1–2 bullets>.

It's MIT-licensed. I'd especially love feedback on <specific question>.
```

### Reddit post

```
Title: <I got tired of X, so I made Y — Z>

<GIF/image>

<2–3 sentence story of the problem.>

What it does:
- ...
- ...

How it works: <2–3 sentences>

It's free and open source (MIT): <link>
I'm the author — happy to answer anything, and criticism is very welcome.
```

### X thread

```
1/ <Hook: the result in one line.> [demo video]
2/ The problem: <...>
3/ How it works: <...>
4/ The part I'm proudest of: <surprising detail>
5/ It's open source (MIT). Try it: <one command>
   <link>
```

### Zenn Tech / Qiita article outline (Japanese)

Fill in every `<…>`; keep the technical part the longest section.

```
タイトル: <ツール名>の仕組み: <技術的な工夫を一言で>

## この記事について
対象読者: <誰向けか>。検証環境: <OS、言語やランタイムのバージョン>。

## 作ったきっかけ
<自分が困っていたこと、1〜2文>

## 仕組み
<アーキテクチャや内部実装。コードや図を添える>

## 使ってみる
    <1〜3行のインストールと実行コマンド>

## まだできないこと
<正直な制限を1〜2点>

---
<ツール名>はMITライセンスで公開しています: <リポジトリのURL>
```
