/** Clinical trials (CRM/CSU), product experience (PEX, SUR) and application management (NMQ/NMR/NMD) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createCRM_C01, CRM_C01 } from "./CRM_C01.ts";
import { createCRM_C08 } from "./CRM_C08.ts";
import { createCSU_C09, CSU_C09 } from "./CSU_C09.ts";
import { createPEX_P07, PEX_P07 } from "./PEX_P07.ts";
import { createPEX_P08 } from "./PEX_P08.ts";
import { createSUR_P09 } from "./SUR_P09.ts";
import { createNMQ_N01 } from "./NMQ_N01.ts";
import { createNMR_N01 } from "./NMR_N01.ts";
import { createNMD_N02 } from "./NMD_N02.ts";
import { parseCRM_C01 } from "./CRM_C01.ts";
import { parseCSU_C09 } from "./CSU_C09.ts";
import { parsePEX_P07 } from "./PEX_P07.ts";
import { parseSUR_P09 } from "./SUR_P09.ts";
import { parseNMQ_N01 } from "./NMQ_N01.ts";
import { parseNMR_N01 } from "./NMR_N01.ts";
import { parseNMD_N02 } from "./NMD_N02.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { CSR } from "./CSR.ts";
import { CSP } from "./CSP.ts";
import { CSS } from "./CSS.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { OBX } from "./OBX.ts";
import { RXA } from "./RXA.ts";
import { RXR } from "./RXR.ts";
import { RXE } from "./RXE.ts";
import { PES } from "./PES.ts";
import { PEO } from "./PEO.ts";
import { PCR } from "./PCR.ts";
import { PRB } from "./PRB.ts";
import { NK1 } from "./NK1.ts";
import { FAC } from "./FAC.ts";
import { PSH } from "./PSH.ts";
import { PDC } from "./PDC.ts";
import { NTE } from "./NTE.ts";
import { NCK } from "./NCK.ts";
import { NST } from "./NST.ts";
import { NSC } from "./NSC.ts";
import { QRD } from "./QRD.ts";
import { ERR } from "./ERR.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("M1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("clinical trials (v2.3)", () => {
  test("CRM^C01 registers patients; C02–C08 wrap it", () => {
    const msg = createCRM_C01(msh("CRM", "C01"), [{ patient: new PID().setId("1"), visit: new PV1(), studyRegistration: new CSR(), clinicalStudyPhases: [new CSP(), new CSP()] }, { patient: new PID().setId("2"), studyRegistration: new CSR() }]);
    expect(msg).toBeInstanceOf(CRM_C01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "PV1", "CSR", "CSP", "CSP", "PID", "CSR"]);
    expect(parseCRM_C01(wire).val!.patients[0].clinicalStudyPhases).toHaveLength(2);
    expect(createCRM_C08(msh("CRM", "C08"), [{ patient: new PID(), studyRegistration: new CSR() }])).toBeInstanceOf(CRM_C01);
  });

  test("CSU^C09 nests phases, schedules, observations and pharmacy administrations", () => {
    const msg = createCSU_C09(msh("CSU", "C09"), [{
      patient: new PID().setId("1"),
      studyRegistration: new CSR(),
      studyPhases: [{
        clinicalStudyPhase: new CSP(),
        studySchedules: [{
          clinicalStudySchedule: new CSS(),
          studyObservations: [{ commonOrder: new ORC(), observationRequest: new OBR().setId("1"), observations: [new OBX().setId("1"), new OBX().setId("2")] }],
          studyPharms: [{ administrations: [{ administration: new RXA(), route: new RXR() }, { administration: new RXA(), route: new RXR() }] }],
        }],
      }],
    }]);
    expect(msg).toBeInstanceOf(CSU_C09);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "CSR", "CSP", "CSS", "ORC", "OBR", "OBX", "OBX", "RXA", "RXR", "RXA", "RXR"]);
    const parsed = parseCSU_C09(wire).val!;
    const schedule = parsed.patients[0].studyPhases[0].studySchedules[0];
    expect(schedule.studyObservations![0].observations).toHaveLength(2);
    expect(schedule.studyPharms[0].administrations).toHaveLength(2);
    expect(parsed.message.encode()).toBe(wire);
  });
});

describe("product experience (v2.3)", () => {
  test("PEX^P07 nests senders, observations, causes and associated persons; P08 wraps it", () => {
    const msg = createPEX_P07(msh("PEX", "P07"), new EVN().eventTypeCode("P07"), new PID().setId("1"), [{
      experienceSender: new PES(),
      observations: [{
        experienceObservation: new PEO(),
        causes: [{
          causalRelationship: new PCR(),
          rxOrder: { encodedOrder: new RXE(), routes: [new RXR()] },
          rxAdministrations: [{ administration: new RXA(), route: new RXR() }, { administration: new RXA() }],
          problems: [new PRB()],
          observations: [new OBX().setId("1")],
          notes: [new NTE()],
          associatedPerson: { nextOfKin: new NK1(), rxOrder: { encodedOrder: new RXE() }, problems: [new PRB()] },
          studies: [{ studyRegistration: new CSR(), clinicalStudyPhases: [new CSP()] }],
        }],
      }],
    }]);
    expect(msg).toBeInstanceOf(PEX_P07);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "EVN", "PID", "PES", "PEO", "PCR", "RXE", "RXR", "RXA", "RXR", "RXA", "PRB", "OBX", "NTE", "NK1", "RXE", "PRB", "CSR", "CSP"]);
    const parsed = parsePEX_P07(wire).val!;
    const cause = parsed.experiences[0].observations[0].causes[0];
    expect(cause.rxOrder!.routes).toHaveLength(1);
    expect(cause.rxAdministrations).toHaveLength(2);
    expect(cause.associatedPerson!.rxOrder!.encodedOrder.name).toBe("RXE");
    expect(cause.associatedPerson!.rxAdministrations).toEqual([]);
    expect(cause.studies![0].clinicalStudyPhases).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
    expect(createPEX_P08(msh("PEX", "P08"), new EVN(), new PID(), [])).toBeInstanceOf(PEX_P07);
    // @ts-expect-error each observation needs at least one cause
    expect(createPEX_P07(msh("PEX", "P07"), new EVN(), new PID(), [{ experienceSender: new PES(), observations: [{ experienceObservation: new PEO() }] }]).verify().errors).toEqual(["EXPERIENCE group 1: PEX OBSERVATION group 1: At least one PEX CAUSE group (PCR) is required"]);
  });

  test("SUR^P09: facilities with products, a summary header and facility details", () => {
    const wire = createSUR_P09(msh("SUR", "P09"), [{
      facility: new FAC(),
      products: [{ productSummary: new PSH(), productDetail: new PDC() }],
      productSummary: new PSH(),
      facilityDetails: [{ facility: new FAC(), productDetail: new PDC(), note: new NTE() }],
    }]).encode();
    expect(names(wire)).toEqual(["MSH", "FAC", "PSH", "PDC", "PSH", "FAC", "PDC", "NTE"]);
    const parsed = parseSUR_P09(wire).val!;
    expect(parsed.facilities[0].products).toHaveLength(1);
    expect(parsed.facilities[0].facilityDetails[0].note.name).toBe("NTE");
    expect(parsed.message.encode()).toBe(wire);
  });
});

describe("application management (v2.3)", () => {
  test("NMQ^N01, NMR^N01 and NMD^N02 carry clock and statistics groups", () => {
    const nmq = createNMQ_N01(msh("NMQ", "N01"), [{ systemClock: new NCK(), applicationStatistics: new NST() }, { systemClock: new NCK(), applicationStatus: new NSC() }], { query: new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1") }).encode();
    expect(names(nmq)).toEqual(["MSH", "QRD", "NCK", "NST", "NCK", "NSC"]);
    expect(parseNMQ_N01(nmq).val!.clockAndStatistics).toHaveLength(2);

    const nmr = createNMR_N01(msh("NMR", "N01"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), [{ systemClock: new NCK(), clockNotes: [new NTE()], applicationStatus: new NSC(), statusNotes: [new NTE(), new NTE()] }], { error: new ERR() }).encode();
    expect(names(nmr)).toEqual(["MSH", "MSA", "ERR", "NCK", "NTE", "NSC", "NTE", "NTE"]);
    const parsedNmr = parseNMR_N01(nmr).val!;
    expect(parsedNmr.clockAndStatistics[0].clockNotes).toHaveLength(1);
    expect(parsedNmr.clockAndStatistics[0].statusNotes).toHaveLength(2);
    expect(parsedNmr.clockAndStatistics[0].statisticsNotes).toEqual([]);

    const nmd = createNMD_N02(msh("NMD", "N02"), [{ systemClock: new NCK(), clockNotes: [new NTE()], applicationStatistics: new NST(), statisticsNotes: [new NTE()] }]).encode();
    expect(names(nmd)).toEqual(["MSH", "NCK", "NTE", "NST", "NTE"]);
    expect(parseNMD_N02(nmd).val!.clockAndStatistics[0].statisticsNotes).toHaveLength(1);
    expect(createNMD_N02(msh("NMD", "N02"), [{ statisticsNotes: [new NTE()] }]).verify().errors).toEqual(["CLOCK AND STATS WITH NOTES group 1: NST segment is required"]);
  });
});
