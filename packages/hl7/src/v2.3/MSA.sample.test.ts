/** MSA message acknowledgment segment: all six fields, the error condition composite and a round trip. */
import { test, expect, describe } from "vitest";
import { MSA } from "./MSA.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("MSA", () => {
  test("encodes an application accept", () => {
    expect(new MSA().acknowledgmentCode("AA").messageControlId("MSG00001").encode()).toBe("MSA|AA|MSG00001");
  });

  test("encodes an application error with every field", () => {
    const msa = new MSA()
      .acknowledgmentCode("AE")
      .messageControlId("MSG00002")
      .textMessage("Patient not found")
      .expectedSequenceNumber("7")
      .delayedAcknowledgmentType("D")
      .errorCondition({ code: "204", text: "Unknown key identifier" });
    expect(msa.encode()).toBe("MSA|AE|MSG00002|Patient not found|7|D|204^Unknown key identifier");
  });

  test("round-trips", () => {
    const wire = "MSA|AE|MSG00002|Patient not found|7|D|204^Unknown key identifier";
    const parsed = MSA.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 6, 2)).toBe("Unknown key identifier");
  });
});
