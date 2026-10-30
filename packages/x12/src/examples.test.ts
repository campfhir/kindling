/**
 * Parses X12's published examples (https://x12.org/examples), fetched into
 * fixtures/external/x12org by `pnpm fixtures:fetch` and not committed: X12's terms do not allow
 * reproducing them (scripts/fetch-examples.mjs). Without them the tests are skipped.
 *
 * Examples that print the transaction sets alone are wrapped in an envelope whose GS08 repeats their
 * ST03. Every example must parse, read typed against its implementation guide without a structure error
 * or a warning, and encode back to what was read; fixtures/x12org-expectations.json lists the ones
 * that depart from the guide as the public sources give it, with the error and warnings each must
 * produce instead and why. The envelope given to the examples that print transaction sets alone uses
 * the delimiters of X12's 999 example (`>` repetition, `:` component), which their repeating
 * elements use.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parse } from "./parse.ts";
import { encodeInterchange } from "./interchange.ts";

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures");
const EXTERNAL = join(FIXTURES, "external", "x12org");

/** What an example that departs from its guide produces instead. */
interface Expectation {
  /** The structure error of its transaction set. */
  error?: string;
  /** The interchange's warnings. */
  warnings?: string[];
  reason: string;
}
const EXPECTATIONS = JSON.parse(readFileSync(join(FIXTURES, "x12org-expectations.json"), "utf8")) as Record<string, Record<string, Expectation>>;

/** GS01 of a transaction set, for the envelope of an example that prints the transaction set alone. */
const FUNCTIONAL_GROUP: Record<string, string> = { "270": "HS", "271": "HB", "999": "FA", "835": "HP", "837": "HC" };

function envelope(text: string, guide: string): string {
  if (text.startsWith("ISA")) return text;
  const st01 = text.substring(3, 6);
  // GS08 repeats the example's own ST03 (several carry the guide before its errata, 005010X222).
  const version = /^ST\*\d{3}\*[^*~]*\*([^*~]+)~/m.exec(text)?.[1] ?? guide;
  const sets = text.match(/^ST\*/gm)?.length ?? 1;
  return [
    "ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *060501*1319*>*00501*000000001*0*T*:~",
    `GS*${FUNCTIONAL_GROUP[st01]}*SENDER*RECEIVER*20060501*1319*1*X*${version}~`,
    text.trimEnd(),
    `GE*${sets}*1~`,
    "IEA*1*000000001~",
  ].join("\n");
}

const guides = existsSync(EXTERNAL) ? readdirSync(EXTERNAL) : [];

describe.skipIf(guides.length === 0)("X12's examples", () => {
  for (const guide of guides) {
    for (const file of readdirSync(join(EXTERNAL, guide))) {
      const expected = EXPECTATIONS[guide]?.[file];
      it(`${guide} ${file}${expected ? " (departs from the guide)" : ""}`, async () => {
        const input = envelope(readFileSync(join(EXTERNAL, guide, file), "utf8"), guide);
        const r = await parse(input);
        expect(r.err?.message).toBeUndefined();
        expect(r.val!.warnings).toEqual(expected?.warnings ?? []);
        for (const group of r.val!.functionalGroups) {
          for (const set of group.transactionSets) {
            expect(set.parsed, `${set.header.getTransactionSetIdentifierCode()} is typed`).toBeDefined();
            expect(set.parsed!.err?.message).toBe(expected?.error);
            if (set.parsed!.ok) expect(set.parsed!.val.warnings).toEqual([]);
          }
        }
        expect(encodeInterchange(r.val!, { delimiters: r.val!.delimiters, lineBreak: "\n" })).toBe(`${input.trimEnd()}\n`);
      });
    }
  }
});
