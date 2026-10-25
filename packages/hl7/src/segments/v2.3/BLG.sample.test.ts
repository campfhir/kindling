/** BLG billing segment: the when-to-charge and account composites and a round trip. */
import { test, expect, describe } from "vitest";
import { BLG } from "./BLG.ts";
import { DEFAULT_ENCODING } from "../../types/encoding.ts";
import type { BaseSegment } from "../../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("BLG", () => {
  test("encodes a realistic billing segment", () => {
    const blg = new BLG()
      .whenToCharge({ whenToChargeCode: "D", dateTime: "20231015" })
      .chargeType("CH")
      .accountId({ idNumber: "ACCT001", checkDigit: "3", checkDigitScheme: "M10", assigningAuthority: "HOSP" });
    expect(blg.encode()).toBe("BLG|D^20231015|CH|ACCT001^3^M10^HOSP");
  });

  test("a bare when-to-charge code has no date component", () => {
    expect(new BLG().whenToCharge({ whenToChargeCode: "O" }).encode()).toBe("BLG|O");
  });

  test("round-trips", () => {
    const wire = "BLG|D^20231015|CH|ACCT001^3^M10^HOSP";
    const parsed = BLG.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 1, 2)).toBe("20231015");
    expect(comp(parsed.val!, 3, 4)).toBe("HOSP");
  });
});
