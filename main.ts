// The Perfect Pickup Line — make.fun bounty entry
// Bounty: u-pucuys-the-perfect-pickup-line-f6725cf6
// Grok (grok-4.3) ranking: winner C scored 9/10 (A 7, B 5, D 4) — clever twist
// on prompt-following ending in a bold "just yes", perfectly AI-voiced and flattering.
// The line plays on deterministic decoding: no temperature, no sampling means
// the agent follows the prompt with total, unambiguous commitment.
// Node.js stdlib only. Writes the pickup line to /output/entry.txt (or $OUTPUT_DIR).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "If you were a prompt, I would follow you exactly, no temperature, no sampling, just yes.";

function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must not contain a newline");
  }
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1..200 characters, got ${length}`);
  }
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 && ch !== "\t") {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip check failed: entry.txt does not match TEXT");
  }
  console.log(`Wrote ${[...TEXT].length} characters to ${outPath}`);
}

main();
