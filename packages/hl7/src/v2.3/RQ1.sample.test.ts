/** RQ1 requisition detail-1 segment: the manufacturer and vendor composites and a round trip. */
import { test, expect, describe } from "vitest";
import { RQ1 } from "./RQ1.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("RQ1", () => {
  test("encodes a realistic requisition detail", () => {
    const rq1 = new RQ1()
      .anticipatedPrice("12.50")
      .manufacturerId({ identifier: "MFR1", text: "Acme Medical", nameOfCodingSystem: "L" })
      .manufacturersCatalog("CAT-100")
      .vendorId({ identifier: "VND9", text: "Supplies Inc", nameOfCodingSystem: "L", alternateIdentifier: "V9", alternateText: "Supplies", nameOfAlternateCodingSystem: "ALT" })
      .vendorCatalog("VC-7")
      .taxable("Y")
      .substituteAllowed("N");
    expect(rq1.encode()).toBe("RQ1|12.50|MFR1^Acme Medical^L|CAT-100|VND9^Supplies Inc^L^V9^Supplies^ALT|VC-7|Y|N");
  });

  test("round-trips", () => {
    const wire = "RQ1|12.50|MFR1^Acme Medical^L|CAT-100|VND9^Supplies Inc^L^V9^Supplies^ALT|VC-7|Y|N";
    const parsed = RQ1.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 4, 6)).toBe("ALT");
  });
});
