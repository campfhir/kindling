import { describe, expect, it } from "vitest";
import { GenericSegment } from "./segment.ts";

describe("GenericSegment", () => {
  it("sets elements by position and fills the gaps", () => {
    expect(new GenericSegment("NM1").element(1, "IL").element(3, "DOE").encode()).toBe("NM1*IL**DOE");
  });

  it("keeps interior empty components and trims trailing ones", () => {
    expect(new GenericSegment("SV1").element(1, ["HC", undefined, "25", "", null]).encode()).toBe("SV1*HC::25");
  });

  it("writes one repetition per argument", () => {
    expect(new GenericSegment("HI").repeating(1, ["ABK", "J450"], ["ABF", "R05"]).encode()).toBe("HI*ABK:J450^ABF:R05");
  });

  it("leaves out trailing empty elements", () => {
    expect(new GenericSegment("REF").element(1, "EJ").element(3, "").encode()).toBe("REF*EJ");
  });

  it("encodes with other delimiters", () => {
    const seg = new GenericSegment("HI").repeating(1, ["ABK", "J450"], ["ABF", "R05"]);
    expect(seg.encode({ element: "|", component: ">", repetition: "}", segment: "\n" })).toBe("HI|ABK>J450}ABF>R05");
  });

  it("reads absent positions as empty", () => {
    const seg = new GenericSegment("REF").element(1, "EJ");
    expect(seg.get(5)).toBe("");
    expect(seg.getComponent(1, 3)).toBe("");
    expect(seg.getRepetitions(5)).toEqual([]);
  });
});
