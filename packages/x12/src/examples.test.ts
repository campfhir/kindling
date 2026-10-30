/**
 * Parses X12's published examples (https://x12.org/examples), fetched into
 * fixtures/external/x12org by `pnpm fixtures:fetch` and not committed: X12's terms do not allow
 * reproducing them (scripts/fetch-examples.mjs). Without them the tests are skipped.
 *
 * Every example must parse, read typed against its implementation guide without a structure error
 * or a warning, and encode back to what was read. The 270/271 examples print the transaction set
 * alone; they are wrapped in an envelope with the delimiters of X12's 999 example (`>` repetition,
 * `:` component), which their repeating elements use.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parse } from "./parse.ts";
import { encodeInterchange } from "./interchange.ts";

const EXTERNAL = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures", "external", "x12org");

/** GS01 of a transaction set, for the envelope of an example that prints the transaction set alone. */
const FUNCTIONAL_GROUP: Record<string, string> = { "270": "HS", "271": "HB", "999": "FA" };

function envelope(text: string, guide: string): string {
  if (text.startsWith("ISA")) return text;
  const st01 = text.substring(3, 6);
  return [
    "ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *060501*1319*>*00501*000000001*0*T*:~",
    `GS*${FUNCTIONAL_GROUP[st01]}*SENDER*RECEIVER*20060501*1319*1*X*${guide}~`,
    text.trimEnd(),
    "GE*1*1~",
    "IEA*1*000000001~",
  ].join("\n");
}

const guides = existsSync(EXTERNAL) ? readdirSync(EXTERNAL) : [];

describe.skipIf(guides.length === 0)("X12's examples", () => {
  for (const guide of guides) {
    for (const file of readdirSync(join(EXTERNAL, guide))) {
      it(`${guide} ${file}`, async () => {
        const input = envelope(readFileSync(join(EXTERNAL, guide, file), "utf8"), guide);
        const r = await parse(input);
        expect(r.err?.message).toBeUndefined();
        expect(r.val!.warnings).toEqual([]);
        for (const group of r.val!.functionalGroups) {
          for (const set of group.transactionSets) {
            expect(set.parsed, `${set.header.getTransactionSetIdentifierCode()} is typed`).toBeDefined();
            expect(set.parsed!.err?.message).toBeUndefined();
            expect(set.parsed!.val!.warnings).toEqual([]);
          }
        }
        expect(encodeInterchange(r.val!, { delimiters: r.val!.delimiters, lineBreak: "\n" })).toBe(`${input.trimEnd()}\n`);
      });
    }
  }
});
