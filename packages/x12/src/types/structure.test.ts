import { describe, expect, expectTypeOf, it } from "vitest";
import { loop, segment, type InputOf, type ParsedOf } from "./schema.ts";
import { encodeStructure, parseStructure, verifyStructure } from "./structure.ts";
import { parseSegment } from "../tokenize.ts";
import { DEFAULT_DELIMITERS } from "./delimiters.ts";
import { GenericSegment } from "./segment.ts";

// A made-up structure with the shapes X12 uses: qualified segments, nested repeating loops, and a
// loop wrapped in LS/LE. It is not any guide's structure.
const STRUCTURE = [
  segment("BHT", "beginning", "Beginning", { required: true }),
  loop(
    "1000",
    "sources",
    "Source",
    [
      segment("HL", "level", "Source Level", { required: true, qualifier: [3, "20"] }),
      segment("NM1", "name", "Source Name", { required: true, qualifier: [1, "PR"] }),
      loop(
        "2000",
        "subscribers",
        "Subscriber",
        [
          segment("HL", "level", "Subscriber Level", { required: true, qualifier: [3, "22"] }),
          segment("NM1", "name", "Subscriber Name", { required: true, qualifier: [1, "IL"] }),
          segment("REF", "references", "Subscriber Reference", { repeating: true, max: 2 }),
          segment("LS", "loopHeader", "Loop Header"),
          loop("2100", "contacts", "Contact", [segment("NM1", "name", "Contact Name", { required: true, qualifier: [1, "1P", "FA"] })], { repeating: true }),
          segment("LE", "loopTrailer", "Loop Trailer"),
        ],
        { required: true, repeating: true },
      ),
    ],
    { required: true, repeating: true },
  ),
] as const;

const parse = (lines: string[]) =>
  parseStructure<ParsedOf<typeof STRUCTURE>>(
    "TEST",
    STRUCTURE,
    lines.map((l) => parseSegment(l, DEFAULT_DELIMITERS)),
  );

const BODY = [
  "BHT*0022",
  "HL*1**20*1",
  "NM1*PR*2*PAYER",
  "HL*2*1*22*0",
  "NM1*IL*1*DOE",
  "REF*SY*1",
  "LS*2120",
  "NM1*1P*1*SMITH",
  "NM1*FA*2*CLINIC",
  "LE*2120",
  "HL*3*1*22*0",
  "NM1*IL*1*ROE",
  "HL*4**20*1",
  "NM1*PR*2*OTHER",
  "HL*5*4*22*0",
  "NM1*IL*1*POE",
];

describe("parseStructure", () => {
  it("walks qualified segments and nested loops", () => {
    const r = parse(BODY);
    expect(r.err?.message).toBeUndefined();
    const value = r.val!.value;
    expect(value.sources).toHaveLength(2);
    const [doe, roe] = value.sources[0].subscribers;
    expect(doe.name.get(3)).toBe("DOE");
    expect(doe.references.map((s) => s.get(2))).toEqual(["1"]);
    expect(doe.contacts.map((c) => c.name.get(3))).toEqual(["SMITH", "CLINIC"]);
    expect(doe.loopTrailer?.get(1)).toBe("2120");
    expect(roe.references).toEqual([]);
    expect(roe.loopHeader).toBeUndefined();
    expect(value.sources[1].subscribers[0].name.get(3)).toBe("POE");
  });

  it("types the parsed value from the structure", () => {
    const value = parse(BODY).val!.value;
    expectTypeOf(value.sources[0].subscribers[0].name).toEqualTypeOf<GenericSegment>();
    expectTypeOf(value.sources[0].subscribers[0].loopHeader).toEqualTypeOf<GenericSegment | undefined>();
    expectTypeOf(value.sources[0].subscribers[0].references).toEqualTypeOf<GenericSegment[]>();
  });

  it("fails for a missing required item, at its position in the transaction set", () => {
    const r = parse(BODY.filter((l) => l !== "NM1*IL*1*DOE"));
    expect(r.err?.message).toBe("TEST loop 2000 must contain NM1 (NM101 IL) (Subscriber Name)");
    expect(r.err?.meta).toEqual({ problem: "missing", segmentPosition: 6, segment: "NM1", loop: "2000" });
  });

  it("fails for a segment that fits nowhere", () => {
    const r = parse([...BODY.slice(0, 5), "DMG*D8*19800101", ...BODY.slice(5)]);
    expect(r.err?.message).toBe("DMG segment at position 7 of the TEST transaction set is not allowed there");
    expect(r.err?.meta).toEqual({ problem: "unexpected", segmentPosition: 7, segment: "DMG" });
  });

  it("names a segment the structure never mentions where a required item belongs", () => {
    const r = parse(BODY.map((l) => (l === "NM1*IL*1*DOE" ? "ZZZ*1" : l)));
    expect(r.err?.message).toBe("ZZZ segment at position 6 of the TEST transaction set is not in the guide");
    expect(r.err?.meta).toEqual({ problem: "unexpected", segmentPosition: 6, segment: "ZZZ", loop: "2000" });
  });

  it("does not take a segment with another qualifier", () => {
    const r = parse(BODY.map((l) => (l === "NM1*PR*2*PAYER" ? "NM1*XX*2*PAYER" : l)));
    expect(r.err?.message).toContain("must contain NM1 (NM101 PR)");
  });

  it("warns past the guide's maximum", () => {
    const r = parse([...BODY.slice(0, 6), "REF*SY*2", "REF*SY*3", ...BODY.slice(6)]);
    expect(r.val!.warnings).toEqual(["REF in loop 2000 occurs 3 times, the guide allows 2"]);
  });
});

describe("encodeStructure and verifyStructure", () => {
  it("round-trips a parsed value", () => {
    const value = parse(BODY).val!.value;
    expect(encodeStructure(STRUCTURE, value).map((s) => s.encode())).toEqual(BODY);
  });

  it("builds from input and lists what is missing", () => {
    const input: InputOf<typeof STRUCTURE> = {
      beginning: new GenericSegment("BHT").element(1, "0022"),
      sources: [{ level: new GenericSegment("HL").element(1, "1").element(3, "20"), name: new GenericSegment("NM1").element(1, "PR"), subscribers: [] }],
    };
    expect(verifyStructure("TEST", STRUCTURE, input)).toEqual(["TEST sources[0].subscribers is required (loop 2000)"]);
    expect(encodeStructure(STRUCTURE, input).map((s) => s.encode())).toEqual(["BHT*0022", "HL*1**20", "NM1*PR"]);
  });
});
