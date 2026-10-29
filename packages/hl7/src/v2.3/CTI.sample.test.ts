/** CTI clinical trial identification segment: its three composites and a round trip. */
import { test, expect, describe } from "vitest";
import { CTI } from "./CTI.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("CTI", () => {
  test("encodes a realistic trial identification", () => {
    const cti = new CTI()
      .sponsorStudyId({ entityIdentifier: "STUDY-42", namespaceId: "NCI", universalId: "2.16.840.1", universalIdType: "ISO" })
      .studyPhaseIdentifier({ identifier: "P2", text: "Phase 2", codingSystem: "L" })
      .studyScheduledTimePoint({ identifier: "V3", text: "Visit 3" });
    expect(cti.encode()).toBe("CTI|STUDY-42^NCI^2.16.840.1^ISO|P2^Phase 2^L|V3^Visit 3");
  });

  test("round-trips", () => {
    const wire = "CTI|STUDY-42^NCI^2.16.840.1^ISO|P2^Phase 2^L|V3^Visit 3";
    const parsed = CTI.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 1, 4)).toBe("ISO");
  });
});
