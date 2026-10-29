/** AIP appointment personnel segment: composites, the repeating resource group and a round trip. */
import { test, expect, describe } from "vitest";
import { AIP } from "./AIP.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("AIP", () => {
  test("encodes a realistic personnel resource", () => {
    const aip = new AIP()
      .setId("1")
      .segmentActionCode("A")
      .personnelResourceId({ id: "1234", familyName: "Smith", givenName: "Jane" })
      .resourceType({ code: "SURG", text: "Surgeon", codingSystem: "L" })
      .resourceGroup({ code: "ORTHO", text: "Orthopaedics" })
      .startDateTime("20231016080000")
      .startDateTimeOffset("0")
      .startDateTimeOffsetUnits({ code: "MIN" })
      .duration("90")
      .durationUnits({ code: "MIN" })
      .allowSubstitutionCode("Y")
      .fillerStatusCode({ code: "BOOKED" });
    expect(aip.encode()).toBe("AIP|1|A|1234^Smith^Jane|SURG^Surgeon^L|ORTHO^Orthopaedics|20231016080000|0|MIN|90|MIN|Y|BOOKED");
  });

  test("AIP-5 repeats", () => {
    expect(new AIP().resourceGroup({ code: "A" }, { code: "B", text: "Bee" }).encode()).toBe("AIP|||||A~B^Bee");
    expect(new AIP().resourceGroup([{ code: "A" }, { code: "B" }]).encode()).toBe("AIP|||||A~B");
  });

  test("formats a Date for AIP-6", () => {
    expect(new AIP().startDateTime(new Date(2023, 9, 16, 8, 0, 0)).encode()).toBe("AIP||||||20231016080000");
  });

  test("round-trips", () => {
    const wire = "AIP|1|A|1234^Smith^Jane|SURG^Surgeon^L|ORTHO~GEN|20231016080000|0|MIN|90|MIN|Y|BOOKED";
    const parsed = AIP.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(parsed.val!.fields[4].repetitions).toHaveLength(1);
    expect(comp(parsed.val!, 3, 2)).toBe("Smith");
  });
});
