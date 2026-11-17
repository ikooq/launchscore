#!/usr/bin/env node
// jsonpeek — print the shape of a JSON file as a tree.
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: jsonpeek <file.json>");
  process.exit(1);
}

const data = JSON.parse(readFileSync(file, "utf8"));

function typeOf(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return `array[${v.length}]`;
  return typeof v;
}

function walk(value, prefix = "", depth = 0) {
  if (depth > 4 || value === null || typeof value !== "object") return;
  const entries = Array.isArray(value) ? (value.length ? [["[0]", value[0]]] : []) : Object.entries(value);
  entries.forEach(([key, v], i) => {
    const last = i === entries.length - 1;
    console.log(`${prefix}${last ? "└─" : "├─"} ${key}: ${typeOf(v)}`);
    walk(v, prefix + (last ? "   " : "│  "), depth + 1);
  });
}

console.log(`${file}: ${typeOf(data)}`);
walk(data);
