/** AL1 allergy segment: the allergen composite, the identification date and a round trip. */
import { test, expect, describe } from "vitest";
import { AL1 } from "./AL1.ts";
import { DEFAULT_ENCODING } from "../../types/encoding.ts";
import type { BaseSegment } from "../../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("AL1", () => {
  test("encodes a realistic allergy", () => {
    const al1 = new AL1()
      .setId("1")
      .allergenTypeCode("DA")
      .allergen({ code: "70618", text: "Penicillin", codingSystem: "RXNORM" })
      .allergySeverityCode("SV")
      .allergyReaction("Anaphylaxis")
      .identificationDate("20200315");
    expect(al1.encode()).toBe("AL1|1|DA|70618^Penicillin^RXNORM|SV|Anaphylaxis|20200315");
  });

  test("formats a Date for AL1-6", () => {
    expect(new AL1().identificationDate(new Date(2020, 2, 15)).encode()).toBe("AL1||||||20200315");
  });

  test("round-trips", () => {
    const wire = "AL1|1|DA|70618^Penicillin^RXNORM|SV|Anaphylaxis|20200315";
    const parsed = AL1.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 3, 1)).toBe("70618");
  });
});
