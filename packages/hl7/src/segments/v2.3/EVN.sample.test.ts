/** EVN event type segment: the operator composite, three date/times and a round trip. */
import { test, expect, describe } from "vitest";
import { EVN } from "./EVN.ts";
import { DEFAULT_ENCODING } from "../../types/encoding.ts";
import type { BaseSegment } from "../../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("EVN", () => {
  test("encodes a realistic event", () => {
    const evn = new EVN()
      .eventTypeCode("A01")
      .recordedDateTime("20231015120000")
      .dateTimePlannedEvent("20231015130000")
      .eventReasonCode("01")
      .operatorId({ id: "OP1", familyName: "Jones", givenName: "Sam" })
      .eventOccurred("20231015115500");
    expect(evn.encode()).toBe("EVN|A01|20231015120000|20231015130000|01|OP1^Jones^Sam|20231015115500");
  });

  test("formats Dates for EVN-2, EVN-3 and EVN-6", () => {
    const at = new Date(2023, 9, 15, 12, 0, 0);
    expect(new EVN().recordedDateTime(at).dateTimePlannedEvent(at).eventOccurred(at).encode()).toBe("EVN||20231015120000|20231015120000|||20231015120000");
  });

  test("round-trips", () => {
    const wire = "EVN|A01|20231015120000||01|OP1^Jones^Sam|20231015115500";
    const parsed = EVN.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 5, 2)).toBe("Jones");
  });
});
