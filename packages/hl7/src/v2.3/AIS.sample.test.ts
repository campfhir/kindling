/** AIS appointment service segment: composites, dates and a round trip. */
import { test, expect, describe } from "vitest";
import { AIS } from "./AIS.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("AIS", () => {
  test("encodes a realistic service", () => {
    const ais = new AIS()
      .setId("1")
      .segmentActionCode("A")
      .universalServiceId({ code: "71020", text: "Chest X-ray", codingSystem: "C4" })
      .startDateTime("20231016080000")
      .startDateTimeOffset("15")
      .startDateTimeOffsetUnits({ code: "MIN", text: "minutes" })
      .duration("30")
      .durationUnits({ code: "MIN" })
      .allowSubstitutionCode("N")
      .fillerStatusCode({ code: "BOOKED", text: "Booked" });
    expect(ais.encode()).toBe("AIS|1|A|71020^Chest X-ray^C4|20231016080000|15|MIN^minutes|30|MIN|N|BOOKED^Booked");
  });

  test("formats a Date for AIS-4", () => {
    expect(new AIS().startDateTime(new Date(2023, 9, 16, 8, 0, 0)).encode()).toBe("AIS||||20231016080000");
  });

  test("round-trips", () => {
    const wire = "AIS|1|A|71020^Chest X-ray^C4|20231016080000|15|MIN|30|MIN|N|BOOKED";
    const parsed = AIS.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 3, 2)).toBe("Chest X-ray");
  });
});
