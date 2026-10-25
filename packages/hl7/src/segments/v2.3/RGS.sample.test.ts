/** RGS resource group segment: its three fields and a round trip. */
import { test, expect, describe } from "vitest";
import { RGS } from "./RGS.ts";
import { DEFAULT_ENCODING } from "../../types/encoding.ts";
import type { BaseSegment } from "../../types/segment.ts";

/** Component `c` (1-based) of field `f` (1-based) of the first repetition. */
const comp = (seg: BaseSegment, f: number, c: number) => seg.fields[f - 1]?.components[c - 1]?.subComponents[0];

describe("RGS", () => {
  test("encodes a realistic resource group", () => {
    expect(new RGS().setId("1").segmentActionCode("A").resourceGroupId({ code: "GRP1", text: "Surgical team" }).encode()).toBe("RGS|1|A|GRP1^Surgical team");
  });

  test("round-trips", () => {
    const wire = "RGS|1|A|GRP1^Surgical team";
    const parsed = RGS.parse(wire, DEFAULT_ENCODING);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.encode()).toBe(wire);
    expect(comp(parsed.val!, 3, 2)).toBe("Surgical team");
  });
});
