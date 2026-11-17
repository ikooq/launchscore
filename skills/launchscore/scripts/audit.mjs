#!/usr/bin/env node
// Launchscore launch-readiness audit. Zero dependencies, Node >= 18.
// Usage: node audit.mjs [repo-path] [--json] [--no-write]

import { readFileSync, existsSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname, basename, relative } from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const repo = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const asJson = flags.has("--json");
const write = !flags.has("--no-write");

if (!existsSync(repo)) {
  console.error(`Path not found: ${repo}`);
  process.exit(1);
}

// ---------- helpers ----------
const files = safe(() => readdirSync(repo), []);
const findFile = (re) => files.find((f) => re.test(f));

function safe(fn, fallback) {
  try { return fn(); } catch { return fallback; }
}
function run(cmd, cmdArgs) {
  return execFileSync(cmd, cmdArgs, { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 20000 }).trim();
}

const readmeName = findFile(/^readme(\.(md|markdown|mdx|rst|txt))?$/i);
const readme = readmeName ? readFileSync(join(repo, readmeName), "utf8") : "";
const lines = readme.split(/\r?\n/);
const head = (n) => lines.slice(0, n).join("\n");

// Strip code blocks / html comments for prose analysis
const prose = readme.replace(/```[\s\S]*?```/g, "").replace(/<!--[\s\S]*?-->/g, "");
const words = prose.split(/\s+/).filter((w) => /\w/.test(w)).length;
const headings = [...readme.matchAll(/^#{1,4}\s+(.+)$/gm)].map((m) => m[1].toLowerCase());
const hasHeading = (re) => headings.some((h) => re.test(h));

// ---------- checks ----------
const checks = [];
function check(id, weight, label, fn) {
  let res;
  try { res = fn(); } catch (e) { res = { status: "skipped", note: String(e.message || e) }; }
  if (typeof res === "boolean") res = { status: res ? "pass" : "fail" };
  checks.push({ id, weight, label, ...res });
}

check("readme", 5, "README exists", () =>
  readmeName ? { status: "pass", note: readmeName } : { status: "fail", fix: "Add a README.md — it is your landing page." });

check("one_liner", 8, "Clear one-liner near the top", () => {
  if (!readme) return { status: "fail", fix: "Write a one-line pitch under the title." };
  // first prose line in the first 30 lines that is not a heading/badge/image/html
  const candidate = lines.slice(0, 30).map((l) => l.trim()).find((l) =>
    l && !l.startsWith("#") && !/^(\[!\[|!\[|<|\||```|---|===)/.test(l) && /[a-zа-я]{3,}/i.test(l));
  if (!candidate) return { status: "fail", fix: "Add a bold one-liner (≤ 12 words) right under the title." };
  const plain = candidate.replace(/<[^>]*>/g, "").replace(/[*_`>]/g, "").replace(/\s+/g, " ").trim();
  const n = plain.split(/\s+/).length;
  if (n > 25) return { status: "warn", score: 0.5, note: `${n} words: "${plain.slice(0, 80)}…"`, fix: "Cut the one-liner to ≤ 12–15 words." };
  return { status: "pass", note: `"${plain.slice(0, 100)}"` };
});

check("visual", 15, "Demo GIF / image / video above the fold", () => {
  const top = head(40);
  const media = /!\[[^\]]*\]\([^)]+\)|<img\s|<video\s|user-attachments\/assets|\.(gif|png|jpe?g|webp|svg|mp4|webm)\b/i;
  // ignore badge-only images (shields etc.)
  const imgs = [...top.matchAll(/(?:!\[[^\]]*\]\(([^)]+)\)|<img[^>]+src=["']([^"']+)["']|<video[^>]+src=["']([^"']+)["'])/gi)]
    .map((m) => m[1] || m[2] || m[3] || "")
    .filter((u) => !/shields\.io|badge|badgen|img\.shields|actions\/workflows|codecov|npmjs\.com\/badge/i.test(u));
  const demos = imgs.filter((u) => !/logo|icon|banner|header|wordmark/i.test(u));
  if (demos.length) return { status: "pass", note: demos[0] };
  if (imgs.length) return { status: "warn", score: 0.5, note: imgs[0], fix: "A logo isn't a demo — add a GIF/screenshot of the tool in action under the logo." };
  if (media.test(top) && /user-attachments/.test(top)) return { status: "pass" };
  const anyLater = /!\[[^\]]*\]\((?![^)]*shields)[^)]+\)|<img\s/i.test(readme);
  return anyLater
    ? { status: "warn", score: 0.4, fix: "Move the demo GIF/screenshot into the first screen (top ~25 lines)." }
    : { status: "fail", fix: "Add a 10–20 s demo GIF or hero screenshot right under the one-liner." };
});

check("quickstart", 12, "Copy-paste quick start near the top", () => {
  const top = head(90);
  const blocks = [...top.matchAll(/```[\w-]*\n([\s\S]*?)```/g)].map((m) => m[1]);
  const cmd = /(^|\n)\s*(\$\s*)?(npx|npm (i|install)|pnpm|yarn|bunx?|pip3? install|pipx|uvx?|cargo (install|add)|go (install|get)|brew install|docker (run|compose)|curl\s|git clone|deno|gem install|composer require|dotnet add|claude plugin|\/plugin|winget|scoop)/i;
  const hit = blocks.find((b) => cmd.test(b));
  if (hit) {
    const n = hit.split(/\n/).filter((l) => l.trim() && !l.trim().startsWith("#")).length;
    return n <= 4 ? { status: "pass", note: `${n} command line(s)` }
      : { status: "warn", score: 0.6, note: `${n} lines`, fix: "Shrink the quick start to ≤ 3 lines; move the rest to a <details> block." };
  }
  if (blocks.length) return { status: "warn", score: 0.4, fix: "Make the first code block an install/run command." };
  return { status: "fail", fix: "Add a ```bash block with a 1–3 line install + run command near the top." };
});

check("substance", 5, "README has enough substance", () =>
  words >= 250 ? { status: "pass", note: `${words} words` }
    : words >= 100 ? { status: "warn", score: 0.5, note: `${words} words`, fix: "Add a Why / Examples / How it works section." }
    : { status: "fail", note: `${words} words`, fix: "README is too thin — add why, examples and how it works." });

check("examples", 5, "Usage / examples section", () =>
  hasHeading(/usage|example|how to|how it works|what it does|getting started|quick ?start|demo|tutorial|использ|пример/)
    ? true : { status: "fail", fix: "Add an ## Examples section with 2–4 real use cases." });

check("comparison", 4, "Why / comparison with alternatives", () =>
  hasHeading(/why|compar|vs\.?|alternative|motivation|features|зачем|почему|сравн/)
    ? true : { status: "fail", fix: "Add ## Why (3–5 benefit bullets) or a comparison table vs alternatives." });

check("license", 8, "License file", () =>
  findFile(/^(license|licence|copying)([._-]|$)/i) ? true : { status: "fail", fix: "Add a LICENSE (MIT is the most star-friendly)." });

check("contributing", 3, "Contributing guide", () =>
  findFile(/^contributing/i) || existsSync(join(repo, ".github", "CONTRIBUTING.md")) || hasHeading(/contribut/)
    ? true : { status: "fail", fix: "Add CONTRIBUTING.md (short is fine) so people know how to help." });

check("links", 6, "No broken relative links/images in README", () => {
  if (!readme) return { status: "skipped" };
  const refs = [...readme.matchAll(/(?:\]\(|src=["'])(?!https?:|mailto:|#|data:|\/\/)([^)"'\s#?]+)/g)].map((m) => m[1]);
  const broken = [...new Set(refs)].filter((r) => !existsSync(join(repo, decodeURIComponent(r))));
  return broken.length ? { status: "fail", note: broken.slice(0, 5).join(", "), fix: `Fix ${broken.length} broken relative link(s).` } : { status: "pass", note: `${refs.length} checked` };
});

// ---------- GitHub checks (need gh + GitHub remote) ----------
let gh = null;
let ghReason = "";
const remote = safe(() => run("git", ["remote", "get-url", "origin"]), "");
const slug = (remote.match(/github\.com[:/]([^/]+\/[^/.\s]+?)(\.git)?$/) || [])[1];
if (!slug) ghReason = "no GitHub remote";
else {
  gh = safe(() => JSON.parse(run("gh", ["repo", "view", slug, "--json",
    "description,homepageUrl,repositoryTopics,stargazerCount,hasIssuesEnabled,latestRelease,usesCustomOpenGraphImage,isPrivate"])), null);
  if (!gh) ghReason = "gh not installed/authenticated or repo not accessible";
}
const ghCheck = (id, weight, label, fn) =>
  check(id, weight, label, () => (gh ? fn(gh) : { status: "skipped", note: ghReason }));

ghCheck("description", 5, "GitHub description set", (g) =>
  g.description ? { status: "pass", note: g.description } : { status: "fail", fix: `gh repo edit ${slug} --description "<one-liner>"` });

ghCheck("topics", 6, "≥ 5 GitHub topics", (g) => {
  const t = (g.repositoryTopics || []).map((x) => x.name ?? x.topic?.name ?? x);
  return t.length >= 5 ? { status: "pass", note: t.join(", ") }
    : { status: t.length ? "warn" : "fail", score: t.length / 5, note: `${t.length} topic(s)`, fix: `gh repo edit ${slug} --add-topic a,b,c,d,e` };
});

ghCheck("homepage", 3, "Homepage / demo URL set", (g) =>
  g.homepageUrl ? { status: "pass", note: g.homepageUrl } : { status: "fail", fix: `gh repo edit ${slug} --homepage <demo-or-docs-url>` });

ghCheck("social_preview", 6, "Custom social preview image", (g) =>
  g.usesCustomOpenGraphImage ? true : { status: "fail", fix: "Upload a 1280×640 image: repo Settings → General → Social preview." });

ghCheck("release", 5, "Tagged release", (g) =>
  g.latestRelease ? { status: "pass", note: g.latestRelease.tagName } : { status: "fail", fix: `gh release create v0.1.0 -R ${slug} --generate-notes` });

ghCheck("good_first_issues", 4, "'good first issue' issues open", (g) => {
  if (!g.hasIssuesEnabled) return { status: "fail", fix: "Enable Issues in repo settings." };
  const n = safe(() => JSON.parse(run("gh", ["issue", "list", "-R", slug, "--label", "good first issue", "--state", "open", "--json", "number"])).length, 0);
  return n >= 3 ? { status: "pass", note: `${n} open` }
    : { status: n ? "warn" : "fail", score: n / 3, note: `${n} open`, fix: "Open 3–5 small issues labeled 'good first issue'." };
});

// ---------- score ----------
const scoreOf = (c) => (c.status === "pass" ? 1 : c.status === "warn" ? (c.score ?? 0.5) : 0);
const scored = checks.filter((c) => c.status !== "skipped");
const maxW = scored.reduce((s, c) => s + c.weight, 0);
const got = scored.reduce((s, c) => s + c.weight * scoreOf(c), 0);
const score = maxW ? Math.round((got / maxW) * 100) : 0;
const fixes = checks
  .filter((c) => c.status === "fail" || c.status === "warn")
  .sort((a, b) => b.weight * (1 - scoreOf(b)) - a.weight * (1 - scoreOf(a)))
  .map((c) => ({ id: c.id, impact: Math.round(c.weight * (1 - scoreOf(c))), fix: c.fix }));

const grade = score >= 90 ? "Ready to launch" : score >= 75 ? "Almost ready" : score >= 50 ? "Needs work" : "Not launch-ready";
const result = {
  // basename only: audit.json may be committed, so never store absolute local paths
  repo: basename(repo), github: slug ?? null, stars: gh?.stargazerCount ?? null, score, grade,
  skipped: checks.filter((c) => c.status === "skipped").map((c) => c.id),
  checks, topFixes: fixes.slice(0, 5), generatedAt: new Date().toISOString(),
};

if (write) {
  const out = join(repo, "launch", "audit.json");
  safe(() => { mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, JSON.stringify(result, null, 2)); }, null);
}

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  const tty = process.stdout.isTTY;
  const c = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
  const icon = { pass: c(32, "✔"), warn: c(33, "▲"), fail: c(31, "✘"), skipped: c(90, "–") };
  const bar = (p) => "█".repeat(Math.round(p / 5)) + "░".repeat(20 - Math.round(p / 5));
  console.log(`\n  🚀 Launch Score\n`);
  console.log(`  ${c(1, `${score}/100`)}  ${bar(score)}  ${grade}`);
  console.log(`  ${relative(process.cwd(), repo) || basename(repo)}${slug ? `  (github.com/${slug}${gh ? `, ★ ${gh.stargazerCount}` : ""})` : ""}\n`);
  for (const ch of checks) {
    const note = ch.note ? c(90, `  ${ch.note}`) : "";
    console.log(`  ${icon[ch.status]} ${ch.label.padEnd(44)} ${String(ch.weight).padStart(2)}pt${note}`);
  }
  if (fixes.length) {
    console.log(`\n  Top fixes:`);
    fixes.slice(0, 5).forEach((f, i) => console.log(`  ${i + 1}. [+${f.impact}] ${f.fix}`));
  }
  if (result.skipped.length) console.log(c(90, `\n  Skipped GitHub checks (${ghReason}). Score is out of the checks that ran.`));
  console.log("");
}
