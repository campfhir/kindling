/** RQD requisition detail segment: the five coded composites, the date needed and a round trip. */
import { test, expect, describe } from "vitest";
import { RQD } from "./RQD.ts";
import { DEFAULT_ENCODING } from "../../types/encoding.ts";
import type { BaseSegment } from "../../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("RQD", () => {
  test("encodes a realistic requisition line", () => {
    const rqd = new RQD()
      .requisitionLineNumber("1")
      .itemCodeInternal({ identifier: "INT1", text: "Gauze 4x4", nameOfCodingSystem: "L" })
      .itemCodeExternal({ identifier: "EXT1", text: "Gauze", nameOfCodingSystem: "SUP" })
      .hospitalItemCode({ identifier: "HOSP1" })
      .requisitionQuantity("20")
      .requisitionUnitOfMeasure({ identifier: "BX", text: "Box" })
      .departmentCostCenter("CC100")
      .itemNaturalAccountCode("NA200")
      .deliverToId({ identifier: "OR3", text: "Operating room 3" })
      .dateNeeded("20231020");
    expect(rqd.encode()).toBe("RQD|1|INT1^Gauze 4x4^L|EXT1^Gauze^SUP|HOSP1|20|BX^Box|CC100|NA200|OR3^Operating room 3|20231020");
  });

  test("formats a Date for RQD-10", () => {
    expect(new RQD().dateNeeded(new Date(2023, 9, 20)).encode()).toBe("RQD||||||||||20231020");
  });

  test("round-trips", () => {
    const wire = "RQD|1|INT1^Gauze 4x4^L|EXT1^Gauze^SUP|HOSP1|20|BX^Box|CC100|NA200|OR3^Operating room 3|20231020";
    const parsed = RQD.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 9, 2)).toBe("Operating room 3");
  });
});
