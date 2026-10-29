/**
 * Parse/encode round trips for every v2.3.1 segment class: a line with components, sub-components,
 * repetitions, escaped delimiters and empty fields must come back byte for byte, and a line of
 * another segment type must be rejected. MSH, BHS and FHS carry the delimiters in their first two
 * fields and are parsed without an encoding argument.
 */
import { describe, test, expect } from "vitest";
import * as segments from "./index.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import { BaseSegment } from "../types/segment.ts";

type Parsed = { ok: boolean; val?: BaseSegment };
type SegmentClass = { parse(s: string, e?: typeof DEFAULT_ENCODING): Parsed };
const HEADER = new Set(["MSH", "BHS", "FHS"]);
const CODES = Object.keys(segments).filter((k) => /^[A-Z][A-Z0-9]{2}$/.test(k) && typeof (segments as Record<string, unknown>)[k] === "function").sort();
const classOf = (code: string) => (segments as unknown as Record<string, SegmentClass>)[code];
const parse = (code: string, wire: string) => (HEADER.has(code) ? classOf(code).parse(wire) : classOf(code).parse(wire, DEFAULT_ENCODING));

const FIELDS = [
  "plain", "comp1^comp2^comp3", "sub1&sub2^comp2", "rep1~rep2~rep3", "r1c1^r1c2~r2c1^r2c2", "", "esc\\F\\aped\\S\\text",
  "20231015120000", "", "^second", "first^", "a&b&c~d&e", "last",
];

describe("v2.3 segment classes", () => {
  test("every segment of the barrel is covered", () => {
    expect(CODES.length).toBe(110);
  });

  test.each(CODES)("%s parses and re-encodes a full line unchanged", (code) => {
    const wire = HEADER.has(code) ? `${code}|^~\\&|${FIELDS.join("|")}` : `${code}|${FIELDS.join("|")}`;
    const parsed = parse(code, wire);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    // Parsing what we encoded is stable too.
    expect(parse(code, parsed.val!.encode()).val!.encode()).toBe(wire);
  });

  test.each(CODES)("%s parses an empty segment and rejects another segment type", (code) => {
    const empty = HEADER.has(code) ? `${code}|^~\\&|` : `${code}|`;
    const parsed = parse(code, empty);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(empty);
    expect(parse(code, `${code === "ZZZ" ? "ZZY" : "ZZZ"}|x`).ok).toBe(false);
  });
});

describe("repetitions", () => {
  test("a parsed field exposes its repetitions", () => {
    const parsed = segments.PID.parse("PID|1||MRN1^^^HOSP~MRN2^^^CLINIC", DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    const field = parsed.val!.fields[2];
    expect(field.components[0].subComponents[0]).toBe("MRN1");
    expect(field.repetitions).toHaveLength(1);
    expect(field.repetitions![0].components[3].subComponents[0]).toBe("CLINIC");
  });

  test("MSH, BHS and FHS encode repeating fields", () => {
    expect(new segments.MSH().characterSet("UNICODE UTF-8", "8859/1").encode()).toBe("MSH|^~\\&||||||||||||||||UNICODE UTF-8~8859/1");
    expect(segments.BHS.parse("BHS|^~\\&|APP|FAC~FAC2").val!.encode()).toBe("BHS|^~\\&|APP|FAC~FAC2");
    expect(segments.FHS.parse("FHS|^~\\&|APP|FAC~FAC2").val!.encode()).toBe("FHS|^~\\&|APP|FAC~FAC2");
  });
});
