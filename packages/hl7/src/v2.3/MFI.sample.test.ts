/** MFI master file identification segment: the file identifier composite, dates and a round trip. */
import { test, expect, describe } from "vitest";
import { MFI } from "./MFI.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("MFI", () => {
  test("encodes a realistic master file identification", () => {
    const mfi = new MFI()
      .masterFileIdentifier({ identifier: "PRA", text: "Practitioner master file", codingSystem: "HL70175" })
      .masterFileApplicationIdentifier("HOSPAPP")
      .fileLevelEventCode("UPD")
      .enteredDateTime("20231015120000")
      .effectiveDateTime("20231101000000")
      .responseLevelCode("NE");
    expect(mfi.encode()).toBe("MFI|PRA^Practitioner master file^HL70175|HOSPAPP|UPD|20231015120000|20231101000000|NE");
  });

  test("formats Dates for MFI-4 and MFI-5", () => {
    expect(new MFI().enteredDateTime(new Date(2023, 9, 15, 12, 0, 0)).effectiveDateTime(new Date(2023, 10, 1, 0, 0, 0)).encode()).toBe("MFI||||20231015120000|20231101000000");
  });

  test("round-trips", () => {
    const wire = "MFI|PRA^Practitioner master file^HL70175|HOSPAPP|UPD|20231015120000|20231101000000|NE";
    const parsed = MFI.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 1, 3)).toBe("HL70175");
  });
});
