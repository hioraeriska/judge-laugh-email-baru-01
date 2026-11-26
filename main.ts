// Make the Judge Laugh in One Line — make.fun bounty entry.
// Writes one original funny line (1-200 chars) to /output/entry.txt.
// Deterministic: same line, same output, every run. No timestamps, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I waved back at someone who was waving at the person behind me, so now I live in a different city.";

function checkLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function resolveOutputDir(): string {
  const fromArg = process.argv[2];
  if (fromArg !== undefined && fromArg.length > 0) {
    return fromArg;
  }
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/output";
}

function run(): void {
  checkLine(LINE);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

run();
