import { describe, test, expect } from "vitest";
import { createSRM_S01, SRM_S01 } from "./SRM_S01.ts";
import { parseSRM_S01 } from "../../parsers/v2.3/SRM_S01_Parser.ts";
import { parseSRM_S01 as parseSRM_S01_v251 } from "../../parsers/v2.5.1/SRM_S01_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { ARQ } from "../../segments/v2.3/ARQ.ts";
import { APR } from "../../segments/v2.3/APR.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { RGS } from "../../segments/v2.3/RGS.ts";
import { AIS } from "../../segments/v2.3/AIS.ts";
import { AIG } from "../../segments/v2.3/AIG.ts";
import { AIL } from "../../segments/v2.3/AIL.ts";
import { AIP } from "../../segments/v2.3/AIP.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = () => new MSH().sendingApplication("SCHED").messageType({ messageCode: "SRM", triggerEvent: "S01" });
const arq = () => new ARQ().placerAppointmentId("PLACER1");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("SRM_S01 builder (v2.3)", () => {
  test("verify() requires MSH, ARQ and a RESOURCES group", () => {
    expect(new SRM_S01(null as any, null as any).verify().errors).toEqual([
      "MSH segment is required",
      "ARQ segment is required",
      "At least one RESOURCES group (RGS) is required",
    ]);
    expect(() => createSRM_S01(msh(), arq()).encode()).toThrow(/RESOURCES group/);
  });

  test("encodes every group in spec order", () => {
    const wire = createSRM_S01(msh(), arq(), {
      apr: new APR().timeSelectionCriteria("PREFSTART"),
      nteList: [new NTE().setId("1").comment("request note")],
      patients: [
        { pid: new PID().setId("1").patientName({ familyName: "Doe", givenName: "John" }), pv1: new PV1().patientClass("O"), obxList: [new OBX().setId("1")], dg1List: [new DG1().setId("1")] },
        { pid: new PID().setId("2") },
      ],
      resources: [
        {
          rgs: new RGS().setId("1"),
          services: [{ ais: new AIS().setId("1"), apr: new APR(), nteList: [new NTE().setId("1").comment("service note")] }],
          generalResources: [{ aig: new AIG().setId("1") }],
          locationResources: [{ ail: new AIL().setId("1"), nteList: [new NTE().setId("1")] }],
          personnelResources: [{ aip: new AIP().setId("1"), apr: new APR() }],
        },
        { rgs: new RGS().setId("2") },
      ],
    }).encode();
    expect(types(wire)).toEqual([
      "MSH", "ARQ", "APR", "NTE",
      "PID", "PV1", "OBX", "DG1", "PID",
      "RGS", "AIS", "APR", "NTE", "AIG", "AIL", "NTE", "AIP", "APR",
      "RGS",
    ]);
    expect(wire).toContain("SRM^S01");

    for (const parse of [parseSRM_S01, parseSRM_S01_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(v.apr).toBeTruthy();
      expect(v.nteList).toHaveLength(1);
      expect(v.patients).toHaveLength(2);
      expect(ParserUtils.getComponent(v.patients[0].pid.fields[4], 0)).toBe("Doe");
      expect(v.patients[0].obxList).toHaveLength(1);
      expect(v.patients[1].pv1).toBeUndefined();
      expect(v.resources).toHaveLength(2);
      const rg = v.resources[0];
      expect(rg.services[0].apr).toBeTruthy();
      expect(rg.services[0].nteList).toHaveLength(1);
      expect(rg.generalResources).toHaveLength(1);
      expect(rg.locationResources[0].nteList).toHaveLength(1);
      expect(rg.personnelResources[0].apr).toBeTruthy();
      expect(v.resources[1].services).toHaveLength(0);
      expect(v.message.encode()).toBe(wire);
    }
  });
});

describe("parseSRM_S01 (v2.3)", () => {
  const MSH_LINE = "MSH|^~\\&|SCHED|HOSP|RIS|HOSP|20231015120000||SRM^S01^SRM_S01|MSG001|P|2.3";

  test("parses a wire message with notes routed to the right owner", () => {
    const result = parseSRM_S01([
      MSH_LINE,
      "ARQ|PLACER1|||||CHECKUP",
      "NTE|1||request note",
      "PID|1||12345^^^MRN^MR||Doe^John",
      "RGS|1|A|GRP1",
      "AIS|1|A|PROC^Procedure",
      "APR|PREF",
      "NTE|1||service note",
      "NTE|2||second service note",
      "AIP|1|A|DR1",
      "NTE|1||personnel note",
    ].join("\r"));
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.apr).toBeUndefined();
    expect(v.nteList.map((n) => ParserUtils.getComponent(n.fields[2], 0))).toEqual(["request note"]);
    expect(v.resources[0].services[0].nteList).toHaveLength(2);
    expect(v.resources[0].services[0].apr).toBeTruthy();
    expect(v.resources[0].personnelResources[0].nteList).toHaveLength(1);
    expect(v.message.segments).toHaveLength(11);
  });

  test.each([
    [["ARQ|1", "PID|1", "APR|X", "RGS|1"], /APR segment at line 4 must directly follow ARQ or a resource segment/],
    [["ARQ|1", "RGS|1", "PID|1"], /PID segment at line 4 must appear before the RESOURCES groups/],
    [["ARQ|1", "AIS|1"], /AIS segment at line 3 must follow an RGS segment/],
    [["ARQ|1", "PID|1", "NTE|1||x", "RGS|1"], /NTE segment at line 4 must follow ARQ\/APR or a resource segment/],
    [["ARQ|1", "PID|1", "PV1|1|O", "PV1|2|O", "RGS|1"], /PV1 segment at line 5 appears more than once/],
    [["ARQ|1"], /must contain at least one RGS segment/],
    [["RGS|1"], /RGS segment at line 2 found without preceding ARQ segment/],
    [["ARQ|1", "ARQ|2", "RGS|1"], /ARQ segment at line 3 appears more than once/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseSRM_S01([MSH_LINE, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});
