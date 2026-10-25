/**
 * Fixture tests: every message of the generated fixtures (fixtures/generated, from hl7apy's
 * structures) and of the external sample collections (fixtures/external, fetched by
 * `pnpm fixtures:fetch`) goes through the root `parse()` and must come out as the same wire
 * text, except where fixtures/expectations.json records why it cannot (see fixtures/README.md).
 */
import { beforeAll, describe, expect, test } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { parse } from "./parse.ts";
import expectations from "../fixtures/expectations.json" with { type: "json" };

const FIXTURES = join(import.meta.dirname, "..", "fixtures");
const GENERATED = join(FIXTURES, "generated");
const EXTERNAL = join(FIXTURES, "external");

interface Expectation {
  /** MSH-9 of the messages (generated files) or their 1-based position (external files); absent for a one-message file. */
  messages?: (string | number)[];
  /** A substring of the expected parse error. */
  error?: string;
  /** The segments the structure does not know, in wire order, which the round trip loses. */
  dropped?: string[];
  /** What else the round trip loses (the message parses, but encodes differently). */
  lossy?: string;
  reason: keyof typeof expectations.reasons;
  why?: string;
}

/** The expectation for one message of a file, marking it used. */
function expectationFor(records: Expectation[] | undefined, key: string | number, used: Set<Expectation>): Expectation | undefined {
  const record = records?.find((r) => (r.messages ? r.messages.includes(key) : true));
  if (record) used.add(record);
  return record;
}

/** Parses one message and checks it against its expectation (none: it parses and round-trips exactly). */
function check(wire: string, expectation: Expectation | undefined) {
  const warnings: string[] = [];
  const warn = console.warn;
  console.warn = (m: string) => warnings.push(m);
  let result;
  try {
    result = parse(wire);
  } finally {
    console.warn = warn;
  }
  if (expectation?.error !== undefined) {
    expect(result.ok, `expected a parse error containing "${expectation.error}"`).toBe(false);
    if (!result.ok) expect(result.err.message).toContain(expectation.error);
    return;
  }
  expect(result.ok ? undefined : result.err.message).toBeUndefined();
  if (!result.ok) return;
  expect(result.val.kind).toBe("message");
  if (result.val.kind !== "message") return;
  const dropped = expectation?.dropped ?? [];
  expect(warnings.map((w) => /Skipping unsupported segment type '(\w+)'/.exec(w)?.[1] ?? w)).toEqual(dropped);
  const kept = dropped.length ? wire.split("\r").filter((s) => !dropped.includes(s.substring(0, 3))).join("\r") : wire;
  if (expectation?.lossy !== undefined) expect(result.val.parsed.message.encode(), `expected the round trip to lose: ${expectation.lossy}`).not.toBe(kept);
  else expect(result.val.parsed.message.encode()).toBe(kept);
}

describe("generated fixtures (hl7apy structures)", () => {
  const used = new Set<Expectation>();
  const files = readdirSync(GENERATED).filter((f) => f.endsWith(".hl7")).sort();
  expect(files.length).toBeGreaterThan(0);

  for (const file of files) {
    const records = (expectations.generated as Record<string, Expectation[]>)[file];
    const messages = readFileSync(join(GENERATED, file), "utf8").split("\r\r").map((m) => m.replace(/\r+$/, "")).filter(Boolean);
    describe(file, () => {
      test.each(messages.map((m, i) => [`#${i + 1} ${m.split("\r")[0].split("|")[8]}`, m] as const))("%s", (label, wire) => {
        check(wire, expectationFor(records, label.slice(label.indexOf(" ") + 1), used));
      });
    });
  }

  test("every expectation matched a message", () => {
    const stale = Object.entries(expectations.generated).flatMap(([file, records]) => (records as Expectation[]).filter((r) => !used.has(r)).map((r) => `${file}: ${r.messages?.join(", ")}`));
    expect(stale).toEqual([]);
  });
});

/** Every file under dir, recursively, skipping .git. */
function filesUnder(dir: string): string[] {
  return readdirSync(dir)
    .filter((e) => e !== ".git")
    .flatMap((e) => (statSync(join(dir, e)).isDirectory() ? filesUnder(join(dir, e)) : [join(dir, e)]));
}

/**
 * The messages of a sample file, split at every MSH: MLLP framing removed, line endings
 * normalised to CR and blank lines dropped (as the parser does), the bytes otherwise untouched.
 */
function readSamples(path: string): string[] | undefined {
  if (/\.(pdf|docx|xlsx|zip|md)$/i.test(path)) return undefined;
  const raw = readFileSync(path, "latin1");
  if (!raw.includes("MSH|")) return undefined;
  const text = raw
    .replaceAll("\v", "")
    .replaceAll("\x1c", "")
    .split(/\r\n|\n|\r/)
    .filter((line) => line.trim().length > 0)
    .join("\r");
  return text.split(/\r(?=MSH\|)/);
}

for (const [source, files] of Object.entries(expectations.external)) {
  const dir = join(EXTERNAL, source);
  const present = existsSync(dir);
  if (!present && process.env.CI) throw new Error(`${dir} is missing: run \`pnpm fixtures:fetch\` before the tests`);

  describe.skipIf(!present)(`external fixtures (${source})`, () => {
    const used = new Set<Expectation>();
    const seen = new Set<string>();
    let count = 0;

    for (const path of present ? filesUnder(dir).sort() : []) {
      const messages = readSamples(path);
      if (!messages) continue;
      const name = relative(dir, path).split("\\").join("/");
      seen.add(name);
      const records = (files as Record<string, Expectation[]>)[name];
      describe(name, () => {
        test.each(messages.map((m, i) => [`#${i + 1} ${m.split("\r")[0].split("|")[8]}`, i + 1, m] as const))("%s", (_label, index, wire) => {
          count++;
          check(wire, expectationFor(records, index, used));
        });
      });
    }

    test("every expectation matched a message", () => {
      const stale = Object.entries(files as Record<string, Expectation[]>).flatMap(([name, records]) =>
        !seen.has(name) ? [`${name}: no such file`] : records.filter((r) => !used.has(r)).map((r) => `${name}: ${r.messages?.join(", ") ?? "the message"}`),
      );
      expect(stale).toEqual([]);
      expect(count).toBeGreaterThan(0);
    });
  });

  if (!present) {
    beforeAll(() => console.warn(`fixtures/external/${source} is missing, the external fixture tests are skipped: run \`pnpm fixtures:fetch\``));
  }
}
