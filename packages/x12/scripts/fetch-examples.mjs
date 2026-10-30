// Fetches X12's published examples (https://x12.org/examples) that the example tests read
// (src/examples.test.ts) into fixtures/external/x12org/, which is not committed. X12's terms say the
// examples "are the intellectual property of X12 and cannot be reproduced or recreated without the
// express consent of ASC X12. Properly cited links to this site may be used"
// (https://x12.org/examples/disclaimers), so this repository holds only the links below, never the
// examples themselves or fixtures recreated from them.
//
//   pnpm fixtures:fetch
//
// Each page prints its transmission one segment per `<p class="data">`; the script keeps those lines,
// turns the non-breaking spaces of the ISA padding back into spaces and rejoins segments the page
// wraps. Needs network access to x12.org.
/* global console, fetch, process */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "fixtures", "external", "x12org");
const BASE = "https://x12.org/examples";

/** The examples of the implementation guides this package types, by guide. */
export const EXAMPLES = {
  "005010X279A1": [
    "005010x279/example-1a-generic-request-clinic-patients-subscriber-eligibility",
    "005010x279/example-1b-response-generic-request-clinic-patients-subscriber-eligibility",
    "005010x279/example-1c-error-response-payer-clinic-not-eligible-inquiries-payer",
    "005010x279/example-2a-generic-request-physician-patients-dependent-eligibility",
    "005010x279/example-2b-response-generic-request-physician-patients-dependent-eligibility",
  ],
  "005010X231A1": ["005010x231/example-01-response-functional-group-containing-three-837s"],
  "005010X221A1": [
    "005010x221/example-01-dollars-and-data-sent-separately",
    "005010x221/example-02-multiple-claims-single-check",
    "005010x221/example-03-claim-specific-negotiated-discount",
    "005010x221/example-04-claim-adjustment-reason-code-45",
    "005010x221/example-5a",
    "005010x221/example-5b",
    "005010x221/example-5c",
    "005010x221/example-06-not-coverednot-authorized-inpatient-facility-claim-days",
    // Examples 07 (coordination of benefits) and 08 (correcting the subscriber) are prose, without a transmission.
  ],
};

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(\w+);/g, (m, name) => ENTITIES[name] ?? m);

/** The transmission printed on an example page, one segment per line. */
export function transmission(page) {
  const lines = [...page.matchAll(/<p class="data">([\s\S]*?)<\/p>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, "")));
  return lines
    .join("\n")
    .replace(/\u00a0/g, " ")
    .replace(/(?<!~)\s*\n\s*/g, "") // a segment the page wraps
    .split("~")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${s}~`)
    .join("\n");
}

let failed = 0;
for (const [guide, pages] of Object.entries(EXAMPLES)) {
  mkdirSync(join(OUT, guide), { recursive: true });
  for (const path of pages) {
    const url = `${BASE}/${path}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`${url}: HTTP ${response.status}`);
      failed++;
      continue;
    }
    const text = transmission(await response.text());
    if (!text) {
      console.error(`${url}: no transmission found on the page`);
      failed++;
      continue;
    }
    const file = join(OUT, guide, `${path.split("/").pop()}.x12`);
    writeFileSync(file, `${text}\n`);
    console.log(`${guide}: ${text.split("\n").length} segments from ${url}`);
  }
}
if (failed) process.exitCode = 1;
