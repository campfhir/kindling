/** SQM^S25 (schedule query, inlined REQUEST group) and SQR^S25 (schedule query response) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createSQM_S25, SQM_S25 } from "./SQM_S25.ts";
import { createSQR_S25, SQR_S25 } from "./SQR_S25.ts";
import { parseSQM_S25 } from "../v2.3/SQM_S25.ts";
import { parseSQR_S25 } from "../v2.3/SQR_S25.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QAK } from "../../segments/v2.3/QAK.ts";
import { ARQ } from "../../segments/v2.3/ARQ.ts";
import { APR } from "../../segments/v2.3/APR.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { SCH } from "../../segments/v2.3/SCH.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { RGS } from "../../segments/v2.3/RGS.ts";
import { AIS } from "../../segments/v2.3/AIS.ts";
import { AIG } from "../../segments/v2.3/AIG.ts";
import { AIP } from "../../segments/v2.3/AIP.ts";
import { AIL } from "../../segments/v2.3/AIL.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (type: string) => new MSH().messageType({ messageCode: type, triggerEvent: "S25" }).messageControlId("S1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("SQM_S25 (v2.3)", () => {
  test("the REQUEST group is inlined: appointmentRequest, patient and resources sit at the top level", () => {
    const msg = createSQM_S25(msh("SQM"), qrd(), {
      appointmentRequest: new ARQ().placerAppointmentId({ entityIdentifier: "A1" }),
      appointmentPreferences: new APR(),
      patient: new PID().setId("1"),
      resources: [
        {
          resourceGroup: new RGS().setId("1"),
          services: [{ service: new AIS().setId("1"), appointmentPreferences: new APR() }],
          generalResources: [{ generalResource: new AIG().setId("1") }],
          personnelResources: [{ personnel: new AIP().setId("1") }, { personnel: new AIP().setId("2") }],
          locationResources: [{ location: new AIL().setId("1") }],
        },
        { resourceGroup: new RGS().setId("2") },
      ],
    });
    expect(msg).toBeInstanceOf(SQM_S25);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "QRD", "ARQ", "APR", "PID", "RGS", "AIS", "APR", "AIG", "AIP", "AIP", "AIL", "RGS"]);
    const result = parseSQM_S25(wire);
    expect(result.ok).toBe(true);
    const parsed = result.val!;
    expect(ParserUtils.getComponent(parsed.appointmentRequest!.fields[0], 0)).toBe("A1");
    expect(parsed.patient!.name).toBe("PID");
    expect(parsed.resources).toHaveLength(2);
    expect(parsed.resources![0].services![0].appointmentPreferences!.name).toBe("APR");
    expect(parsed.resources![0].personnelResources).toHaveLength(2);
    expect(parsed.resources![1].services).toEqual([]);
    expect(parsed.message.encode()).toBe(wire);
  });

  test("a query without a request is MSH QRD [QRF] [DSC]", () => {
    const wire = createSQM_S25(msh("SQM"), qrd()).encode();
    expect(names(wire)).toEqual(["MSH", "QRD"]);
    const result = parseSQM_S25(wire);
    expect(result.val!.appointmentRequest).toBeUndefined();
    expect(result.val!.resources).toEqual([]);
  });

  test("verify() requires ARQ and at least one RESOURCES group once the request is present", () => {
    expect(createSQM_S25(msh("SQM"), qrd(), { patient: new PID() }).verify().errors).toEqual([
      "ARQ segment is required",
      "At least one RESOURCES group (RGS) is required",
    ]);
    // @ts-expect-error missing required segments
    expect(createSQM_S25(msh("SQM"), qrd(), { appointmentRequest: new ARQ(), resources: [{ services: [{ appointmentPreferences: new APR() }] }] }).verify().errors).toEqual([
      "RESOURCES group 1: RGS segment is required",
      "RESOURCES group 1: SERVICE group 1: AIS segment is required",
    ]);
  });
});

describe("SQR_S25 (v2.3)", () => {
  test("each schedule carries SCH, notes, an inlined patient and its resources", () => {
    const msg = createSQR_S25(msh("SQR"), new MSA().acknowledgmentCode("AA").messageControlId("S1"), new QAK().queryTag("Q1").queryResponseStatus("OK"), {
      schedules: [
        {
          appointment: new SCH().placerAppointmentId({ entityId: "A1" }),
          notes: [new NTE().setId("1").comment("first")],
          patient: new PID().setId("1"),
          visit: new PV1().setId("1").patientClass("O"),
          diagnosis: new DG1().setId("1"),
          resources: [{ resourceGroup: new RGS().setId("1"), services: [{ service: new AIS().setId("1"), notes: [new NTE().setId("1")] }], locationResources: [{ location: new AIL().setId("1") }] }],
        },
        { appointment: new SCH().placerAppointmentId({ entityId: "A2" }), resources: [{ resourceGroup: new RGS().setId("1"), personnelResources: [{ personnel: new AIP().setId("1") }] }] },
      ],
    });
    expect(msg).toBeInstanceOf(SQR_S25);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QAK", "SCH", "NTE", "PID", "PV1", "DG1", "RGS", "AIS", "NTE", "AIL", "SCH", "RGS", "AIP"]);
    const result = parseSQR_S25(wire);
    expect(result.ok).toBe(true);
    const parsed = result.val!;
    expect(parsed.schedules).toHaveLength(2);
    expect(parsed.schedules![0].patient!.name).toBe("PID");
    expect(parsed.schedules![0].diagnosis!.name).toBe("DG1");
    expect(parsed.schedules![0].resources[0].services![0].notes).toHaveLength(1);
    expect(parsed.schedules![1].patient).toBeUndefined();
    expect(parsed.schedules![1].resources[0].personnelResources).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
  });

  test("verify() requires MSA and QAK, and the RESOURCES of each schedule", () => {
    // @ts-expect-error missing required segments
    expect(new SQR_S25(msh("SQR"), undefined, undefined, { schedules: [{ appointment: new SCH(), resources: [] }] }).verify().errors).toEqual([
      "MSA segment is required",
      "QAK segment is required",
      "SCHEDULE group 1: At least one RESOURCES group (RGS) is required",
    ]);
  });
});
