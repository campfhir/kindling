import { describe, test, expect } from "vitest";
import { createSRR_S01, SRR_S01 } from "./SRR_S01.ts";
import { parseSRR_S01 } from "../v2.3/SRR_S01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { SCH } from "../../segments/v2.3/SCH.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { RGS } from "../../segments/v2.3/RGS.ts";
import { AIS } from "../../segments/v2.3/AIS.ts";
import { AIL } from "../../segments/v2.3/AIL.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = () => new MSH().sendingApplication("RIS").messageType({ messageCode: "SRR", triggerEvent: "S01" });
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("MSG001");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = "MSH|^~\\&|RIS|HOSP|SCHED|HOSP|20231015120000||SRR^S01^SRR_S01|MSG002|P|2.3";

describe("SRR_S01 builder (v2.3)", () => {
  test("a response without a schedule is MSH MSA [ERR]", () => {
    expect(types(createSRR_S01(msh(), msa()).encode())).toEqual(["MSH", "MSA"]);
    expect(types(createSRR_S01(msh(), msa(), { error: new ERR() }).encode())).toEqual(["MSH", "MSA", "ERR"]);
  });

  test("verify() requires MSH, MSA and, with a schedule, SCH and a RESOURCES group", () => {
    expect(new SRR_S01(null as any, null as any).verify().errors).toEqual(["MSH segment is required", "MSA segment is required"]);
    const noResources = createSRR_S01(msh(), msa(), { schedule: { appointment: new SCH(), resources: [] } });
    expect(noResources.verify().errors).toEqual(["SCHEDULE group 1: At least one RESOURCES group (RGS) is required"]);
  });

  test("encodes the schedule group in spec order and round-trips", () => {
    const wire = createSRR_S01(msh(), msa(), {
      schedule: {
        appointment: new SCH().placerAppointmentId({ entityId: "PLACER1" }),
        notes: [new NTE().setId("1").comment("booked")],
        patients: [{ patient: new PID().setId("1").patientName({ familyName: "Doe" }), visit: new PV1().patientClass("O"), diagnoses: [new DG1().setId("1")] }],
        resources: [{ resourceGroup: new RGS().setId("1"), services: [{ service: new AIS().setId("1"), notes: [new NTE().setId("1")] }], locationResources: [{ location: new AIL().setId("1") }] }],
      },
    }).encode();
    expect(types(wire)).toEqual(["MSH", "MSA", "SCH", "NTE", "PID", "PV1", "DG1", "RGS", "AIS", "NTE", "AIL"]);
    const result = parseSRR_S01(wire);
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.error).toBeUndefined();
    expect(v.schedule!.notes).toHaveLength(1);
    expect(ParserUtils.getComponent(v.schedule!.patients![0].patient.fields[4], 0)).toBe("Doe");
    expect(v.schedule!.resources[0].services![0].notes).toHaveLength(1);
    expect(v.schedule!.resources[0].locationResources).toHaveLength(1);
    expect(v.message.encode()).toBe(wire);
  });
});

describe("parseSRR_S01 (v2.3)", () => {
  test("accepts MSH MSA ERR with no schedule", () => {
    const result = parseSRR_S01([MSH_LINE, "MSA|AE|MSG001|Rejected", "ERR|ARQ^1^1"].join("\r"));
    expect(result.ok).toBe(true);
    expect(result.val!.error).toBeTruthy();
    expect(result.val!.schedule).toBeUndefined();
  });

  test.each([
    [["ERR|1"], /SRR_S01 message must contain an MSA segment/],
    [["MSA|AA|1", "ERR|1", "ERR|2"], /ERR segment at line 4 is not allowed at this position in SRR_S01/],
    [["MSA|AA|1", "SCH|1"], /must contain at least one RGS segment/],
    [["MSA|AA|1", "PID|1"], /PID segment at line 3 is not allowed at this position in SRR_S01/],
    [["MSA|AA|1", "SCH|1", "RGS|1", "NTE|1||x"], /NTE segment at line 5 is not allowed at this position in SRR_S01/],
    [["SCH|1", "RGS|1"], /SRR_S01 message must contain an MSA segment/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseSRR_S01([MSH_LINE, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});
