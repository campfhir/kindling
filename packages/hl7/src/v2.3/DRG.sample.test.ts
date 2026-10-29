/** DRG diagnosis related group segment: all ten v2.3 fields and a round trip. */
import { test, expect, describe } from "vitest";
import { DRG } from "./DRG.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("DRG", () => {
  test("encodes a realistic DRG", () => {
    const drg = new DRG()
      .diagnosticRelatedGroup({ code: "470", text: "Major joint replacement", codingSystem: "HCFA" })
      .drgAssignedDateTime("20231020120000")
      .drgApprovalIndicator("Y")
      .drgGrouperReviewCode("A")
      .outlierType({ code: "D", text: "Day outlier" })
      .outlierDays("3")
      .outlierCost("1500.00")
      .drgPayor("M")
      .outlierReimbursement("1200.00")
      .confidentialIndicator("N");
    expect(drg.encode()).toBe("DRG|470^Major joint replacement^HCFA|20231020120000|Y|A|D^Day outlier|3|1500.00|M|1200.00|N");
  });

  test("formats a Date for DRG-2", () => {
    expect(new DRG().drgAssignedDateTime(new Date(2023, 9, 20, 12, 0, 0)).encode()).toBe("DRG||20231020120000");
  });

  test("round-trips", () => {
    const wire = "DRG|470^Major joint replacement^HCFA|20231020120000|Y|A|D^Day outlier|3|1500.00|M|1200.00|N";
    const parsed = DRG.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 1, 1)).toBe("470");
  });
});
