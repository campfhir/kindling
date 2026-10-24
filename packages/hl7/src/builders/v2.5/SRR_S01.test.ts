import { describe, test, expect } from "vitest";
import { createSRR_S01 } from "./SRR_S01.ts";
import { parseSRR_S01 } from "../../parsers/v2.5/SRR_S01_Parser.ts";
import { parseSRR_S01 as parseSRR_S01_v251 } from "../../parsers/v2.5.1/SRR_S01_Parser.ts";
import { createSRR_S01 as createSRR_S01_v251 } from "../v2.5.1/SRR_S01.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { SCH } from "../../segments/v2.5/SCH.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { RGS } from "../../segments/v2.5/RGS.ts";
import { AIS } from "../../segments/v2.5/AIS.ts";

const msh = () => new MSH().sendingApplication("RIS").messageType({ messageCode: "SRR", triggerEvent: "S01" });
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("MSG001");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = "MSH|^~\\&|RIS|HOSP|SCHED|HOSP|20231015120000||SRR^S01^SRR_S01|MSG002|P|2.5";

describe("SRR_S01 (v2.5): repeating ERR and TQ1 after SCH", () => {
  test("encodes and round-trips through the v2.5 and v2.5.1 parsers", () => {
    const build = (create: (...args: any[]) => { encode(): string }) =>
      create(msh(), msa(), {
        errors: [new ERR(), new ERR()],
        schedule: {
          appointment: new SCH(),
          timings: [new TQ1().setId("1"), new TQ1().setId("2")],
          notes: [new NTE().setId("1").comment("booked")],
          resources: [{ resourceGroup: new RGS().setId("1"), services: [{ service: new AIS().setId("1") }] }],
        },
      }).encode();
    const wire = build(createSRR_S01);
    expect(build(createSRR_S01_v251)).toBe(wire);
    expect(types(wire)).toEqual(["MSH", "MSA", "ERR", "ERR", "SCH", "TQ1", "TQ1", "NTE", "RGS", "AIS"]);
    for (const parse of [parseSRR_S01, parseSRR_S01_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.errors).toHaveLength(2);
      expect(result.val!.schedule!.timings).toHaveLength(2);
      expect(result.val!.schedule!.notes).toHaveLength(1);
      expect(result.val!.message.encode()).toBe(wire);
    }
  });

  test.each([
    [["MSA|AA|1", "SCH|1", "NTE|1||x", "TQ1|1", "RGS|1"], /SRR_S01 message must contain at least one RGS segment/],
    [["MSA|AA|1", "TQ1|1"], /TQ1 segment at line 3 is not allowed at this position in SRR_S01/],
    [["MSA|AA|1", "SCH|1", "ERR|1", "RGS|1"], /SRR_S01 message must contain at least one RGS segment/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseSRR_S01([MSH_LINE, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});
