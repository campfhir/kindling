import { describe, test, expect } from "vitest";
import { createMDM_T01 } from "./MDM_T01.ts";
import { createMDM_T02 } from "./MDM_T02.ts";
import { parseMDM_T01 } from "../../parsers/v2.5/MDM_T01_Parser.ts";
import { parseMDM_T02 } from "../../parsers/v2.5/MDM_T02_Parser.ts";
import { parseMDM_T02 as parseMDM_T02_v251 } from "../../parsers/v2.5.1/MDM_T02_Parser.ts";
import { parseMDM_T01 as parseMDM_T01_v251 } from "../../parsers/v2.5.1/MDM_T01_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { TXA } from "../../segments/v2.5/TXA.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";

const msh = (ev: string) => new MSH().sendingApplication("HIS").messageType({ messageCode: "MDM", triggerEvent: ev });
const evn = (ev: string) => new EVN().eventTypeCode(ev);
const pid = () => new PID().setId("1").patientName({ familyName: "Doe" });
const pv1 = () => new PV1().patientClass("I");
const txa = () => new TXA().setId("1").documentType("CN");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = (ev: string) => `MSH|^~\\&|HIS|HOSP|EMR|HOSP|20231015120000||MDM^${ev}^MDM_${ev}|MSG001|P|2.5`;

describe("MDM_T01 / MDM_T02 (v2.5): SFT, common orders with timing, OBX with NTEs", () => {
  const orders = () => [
    { orc: new ORC().orderControl("NW"), timing: [{ tq1: new TQ1().setId("1"), tq2List: [new TQ2().setId("1")] }], obr: new OBR().setId("1"), nteList: [new NTE().setId("1").comment("order note")] },
    { orc: new ORC().orderControl("NW"), obr: new OBR().setId("2") },
  ];

  test("T01 encodes orders before TXA and round-trips through v2.5 and v2.5.1", () => {
    const wire = createMDM_T01(msh("T01"), evn("T01"), pid(), pv1(), txa(), { sftList: [new SFT()], orders: orders() }).encode();
    expect(types(wire)).toEqual(["MSH", "SFT", "EVN", "PID", "PV1", "ORC", "TQ1", "TQ2", "OBR", "NTE", "ORC", "OBR", "TXA"]);
    for (const parse of [parseMDM_T01, parseMDM_T01_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(v.sftList).toHaveLength(1);
      expect(v.orders).toHaveLength(2);
      expect(v.orders[0].timing[0].tq2List).toHaveLength(1);
      expect(v.orders[0].nteList).toHaveLength(1);
      expect(v.orders[1].timing).toHaveLength(0);
      expect(v.message.encode()).toBe(wire);
    }
  });

  test("T02 encodes observations with their notes after TXA", () => {
    const wire = createMDM_T02(msh("T02"), evn("T02"), pid(), pv1(), txa(), [
      { obx: new OBX().setId("1"), nteList: [new NTE().setId("1"), new NTE().setId("2")] },
      { obx: new OBX().setId("2") },
    ]).encode();
    expect(types(wire)).toEqual(["MSH", "EVN", "PID", "PV1", "TXA", "OBX", "NTE", "NTE", "OBX"]);
    for (const parse of [parseMDM_T02, parseMDM_T02_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.observations.map((o) => o.nteList.length)).toEqual([2, 0]);
      expect(result.val!.message.encode()).toBe(wire);
    }
    expect(createMDM_T02(msh("T02"), evn("T02"), pid(), pv1(), txa(), []).verify().errors).toEqual(["At least one OBSERVATION group (OBX) is required"]);
    expect(createMDM_T01(msh("T01"), evn("T01"), pid(), pv1(), txa(), { orders: [{ orc: new ORC(), obr: null as any }] }).verify().errors).toEqual(["COMMON ORDER group 1: OBR segment is required"]);
  });

  const body = ["EVN|T02", "PID|1||1||Doe", "PV1|1|I"];
  test.each([
    [["ORC|NW", "TXA|1", "OBX|1"], /TXA segment at line 6 found before the last order has its OBR/],
    [["ORC|NW", "TQ2|1", "OBR|1", "TXA|1", "OBX|1"], /TQ2 segment at line 6 must follow a TQ1 segment/],
    [["ORC|NW", "NTE|1", "OBR|1", "TXA|1", "OBX|1"], /NTE segment at line 6 must follow an OBR or OBX segment/],
    [["ORC|NW", "ORC|NW", "OBR|1", "TXA|1", "OBX|1"], /ORC segment at line 6 starts a new order before the previous order has its OBR/],
    [["TXA|1", "ORC|NW", "OBR|1", "OBX|1"], /ORC segment at line 6 must appear between PV1 and TXA/],
    [["SFT|x"], /SFT segment at line 5 must appear before the EVN segment/],
    [["TXA|1"], /MDM_T02 message must contain at least one OBX segment/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseMDM_T02([MSH_LINE("T02"), ...body, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});
