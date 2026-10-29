/** ACC accident segment: a realistic segment, its composite fields and a parse/encode round trip. */
import { test, expect, describe } from "vitest";
import { ACC } from "./ACC.ts";
import { DEFAULT_ENCODING } from "../types/encoding.ts";
import type { BaseSegment } from "../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("ACC", () => {
  test("encodes a realistic accident segment", () => {
    const acc = new ACC()
      .accidentDateTime("20231015093000")
      .accidentCode({ code: "MVA", text: "Motor vehicle accident", codingSystem: "L" })
      .accidentLocation("Main St at 1st Ave")
      .autoAccidentState({ code: "CA", text: "California" })
      .accidentJobRelated("N")
      .accidentDeath("N");
    expect(acc.encode()).toBe("ACC|20231015093000|MVA^Motor vehicle accident^L|Main St at 1st Ave|CA^California|N|N");
  });

  test("formats a Date for ACC-1", () => {
    expect(new ACC().accidentDateTime(new Date(2023, 9, 15, 9, 30, 0)).encode()).toBe("ACC|20231015093000");
  });

  test("round-trips", () => {
    const wire = "ACC|20231015093000|MVA^Motor vehicle accident^L|Main St|CA^California|N|Y";
    const parsed = ACC.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 2, 1)).toBe("MVA");
    expect(comp(parsed.val!, 2, 3)).toBe("L");
  });
});
