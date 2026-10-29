/** AIL appointment location segment: composites, dates and a round trip. */
import { test, expect, describe } from "vitest";
import { AIL } from "./AIL.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("AIL", () => {
  test("encodes a realistic location resource", () => {
    const ail = new AIL()
      .setId("1")
      .segmentActionCode("A")
      .locationResourceId({ pointOfCare: "OR", room: "3", bed: "A", facility: "MAIN" })
      .locationType({ code: "OR", text: "Operating room" })
      .locationGroup({ code: "SURG" })
      .startDateTime("20231016080000")
      .startDateTimeOffset("0")
      .startDateTimeOffsetUnits({ code: "MIN", text: "minutes" })
      .duration("90")
      .durationUnits({ code: "MIN" })
      .allowSubstitutionCode("N")
      .fillerStatusCode({ code: "BOOKED", text: "Booked" });
    expect(ail.encode()).toBe("AIL|1|A|OR^3^A^MAIN|OR^Operating room|SURG|20231016080000|0|MIN^minutes|90|MIN|N|BOOKED^Booked");
  });

  test("formats a Date for AIL-6", () => {
    expect(new AIL().startDateTime(new Date(2023, 9, 16, 8, 0, 0)).encode()).toBe("AIL||||||20231016080000");
  });

  test("round-trips", () => {
    const wire = "AIL|1|A|OR^3^A^MAIN|OR^Operating room||20231016080000|0|MIN|90|MIN|N|BOOKED";
    const parsed = AIL.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect([1, 2, 3, 4].map((c) => comp(parsed.val!, 3, c))).toEqual(["OR", "3", "A", "MAIN"]);
  });
});
