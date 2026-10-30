import { describe, expect, it } from "vitest";
import { parseSegment, readDelimiters, splitSegments, tokenize } from "./tokenize.ts";
import { DEFAULT_DELIMITERS } from "./types/delimiters.ts";

const ISA_00501 = "ISA*00*          *00*          *ZZ*SUBMITTER      *ZZ*RECEIVER       *241030*1200*^*00501*000000001*0*T*:~";

describe("readDelimiters", () => {
  it("reads the delimiters of a 00501 ISA", () => {
    expect(readDelimiters(ISA_00501)).toEqual({ ok: true, val: DEFAULT_DELIMITERS });
  });

  it("reads other delimiters", () => {
    const isa = ISA_00501.replaceAll("*", "|").replace("^", "}").replace(":~", ">\n");
    expect(readDelimiters(isa)).toEqual({ ok: true, val: { element: "|", repetition: "}", component: ">", segment: "\n" } });
  });

  it("has no repetition separator in 00401, whose ISA11 is the standards identifier", () => {
    const isa = ISA_00501.replace("*^*00501*", "*U*00401*");
    expect(readDelimiters(isa)).toEqual({ ok: true, val: { ...DEFAULT_DELIMITERS, repetition: "" } });
  });

  it("counts elements instead of trusting offsets", () => {
    const unpadded = "ISA*00**00**ZZ*SUB*ZZ*REC*241030*1200*^*00501*1*0*T*:~";
    expect(readDelimiters(unpadded)).toEqual({ ok: true, val: DEFAULT_DELIMITERS });
  });

  it("skips a byte order mark and leading whitespace", () => {
    expect(readDelimiters(`\uFEFF\r\n${ISA_00501}`).ok).toBe(true);
  });

  it("fails without an ISA", () => {
    expect(readDelimiters("GS*HS*A*B~").ok).toBe(false);
  });

  it("fails for a truncated ISA", () => {
    const r = readDelimiters("ISA*00*          *00");
    expect(r.ok).toBe(false);
    expect(r.err?.message).toContain("ISA04");
  });

  it("fails when two delimiters are the same character", () => {
    expect(readDelimiters(ISA_00501.replace("*:~", "*:*")).ok).toBe(false);
  });
});

describe("splitSegments", () => {
  it("drops line breaks around terminators and empty segments", () => {
    expect(splitSegments("ST*270*0001~\r\nBHT*0022~\n\nSE*3*0001~\n", DEFAULT_DELIMITERS)).toEqual([
      "ST*270*0001",
      "BHT*0022",
      "SE*3*0001",
    ]);
  });
});

describe("parseSegment", () => {
  it("splits elements, components and repetitions", () => {
    const seg = parseSegment("HI*ABK:J450*ABF:R05^ABF:R509", DEFAULT_DELIMITERS);
    expect(seg.id).toBe("HI");
    expect(seg.getComponent(1, 2)).toBe("J450");
    expect(seg.getRepetitions(2).map((e) => e.components)).toEqual([["ABF", "R05"], ["ABF", "R509"]]);
  });

  it("keeps ISA elements whole", () => {
    const isa = parseSegment(ISA_00501.slice(0, -1), DEFAULT_DELIMITERS);
    expect(isa.elements).toHaveLength(16);
    expect(isa.get(11)).toBe("^");
    expect(isa.get(16)).toBe(":");
  });

  it("does not split repetitions when there is no repetition separator", () => {
    const seg = parseSegment("REF*EJ*A^B", { ...DEFAULT_DELIMITERS, repetition: "" });
    expect(seg.get(2)).toBe("A^B");
  });

  it("round-trips", () => {
    const raw = "NM1*IL*1*DOE*JOHN****MI*123456789";
    expect(parseSegment(raw, DEFAULT_DELIMITERS).encode()).toBe(raw);
  });
});

describe("tokenize", () => {
  it("returns the delimiters and every segment", () => {
    const r = tokenize(`${ISA_00501}\nGS*HS*SUB*REC*20241030*1200*1*X*005010X279A1~`);
    expect(r.ok).toBe(true);
    expect(r.val?.segments.map((s) => s.id)).toEqual(["ISA", "GS"]);
  });
});
