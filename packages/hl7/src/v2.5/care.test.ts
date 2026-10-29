/** The v2.5 patient care, referral and miscellaneous shapes: SFT, repeating ERR and QAK in the care responses, TIMING QTY in CSU and PEX, RQC^I06 with the v2.4 I05 shape. */
import { describe, test, expect } from "vitest";
import { createPPR_PC1 } from "./PPR_PC1.ts";
import { createPRR_PC5 } from "./PRR_PC5.ts";
import { createQRY_PC9 } from "./QRY_PC9.ts";
import { createQRY_PC4 } from "./QRY_PC4.ts";
import { createRQI_I01 } from "./RQI_I01.ts";
import { createRQC_I06 } from "./RQC_I06.ts";
import { createCSU_C09 } from "./CSU_C09.ts";
import { createPEX_P07 } from "./PEX_P07.ts";
import { createNMR_N01 } from "./NMR_N01.ts";
import { createSUR_P09 } from "./SUR_P09.ts";
import { parsePPR_PC1 } from "./PPR_PC1.ts";
import { parsePRR_PC5 } from "./PRR_PC5.ts";
import { parseRQC_I06 } from "./RQC_I06.ts";
import { parseCSU_C09 } from "./CSU_C09.ts";
import { parsePEX_P07 } from "./PEX_P07.ts";
import { parseNMR_N01 } from "./NMR_N01.ts";
import { parseRQC_I06 as parseRQC_I06_v24 } from "../v2.4/RQC_I06.ts";
import { parsePRR_PC5 as parsePRR_PC5_v231 } from "../v2.3.1/PRR_PC5.ts";
import { parsePRR_PC5 as parsePRR_PC5_v23 } from "../v2.3/PRR_PC5.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { QRD } from "./QRD.ts";
import { PID } from "./PID.ts";
import { PRB } from "./PRB.ts";
import { PRD } from "./PRD.ts";
import { GT1 } from "./GT1.ts";
import { CSR } from "./CSR.ts";
import { OBR } from "./OBR.ts";
import { OBX } from "./OBX.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { RXA } from "./RXA.ts";
import { RXR } from "./RXR.ts";
import { RXE } from "./RXE.ts";
import { EVN } from "./EVN.ts";
import { PES } from "./PES.ts";
import { PEO } from "./PEO.ts";
import { PCR } from "./PCR.ts";
import { NCK } from "./NCK.ts";
import { FAC } from "./FAC.ts";
import { PSH } from "./PSH.ts";
import { PDC } from "./PDC.ts";
import { NTE } from "./NTE.ts";
import { NK1 } from "./NK1.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("M1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("patient care (v2.5)", () => {
  test("PPR^PC1 and QRY^PC9 take SFT; QRY^PC4 keeps the v2.3 shape", () => {
    const wire = createPPR_PC1(msh("PPR", "PC1"), new PID().setId("1"), [{ problem: new PRB() }], { software: [new SFT()] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "PID", "PRB"]);
    expect(parsePPR_PC1(wire).val!.software).toHaveLength(1);
    expect(names(createQRY_PC9(msh("QRY", "PC9"), qrd(), { software: [new SFT()] }).encode())).toEqual(["MSH", "SFT", "QRD"]);
    expect("software" in createQRY_PC4(msh("QRY", "PC4"), qrd())).toBe(false);
  });

  test("PRR^PC5 carries SFT, repeating ERR and QAK; v2.3.1 parses the QAK and v2.3 does not", () => {
    const wire = createPRR_PC5(msh("PRR", "PC5"), msa(), qrd(), [{ patient: new PID().setId("1"), problems: [{ problem: new PRB() }] }], { software: [new SFT()], errors: [new ERR(), new ERR()], queryAcknowledgment: new QAK().queryTag("Q1") }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "MSA", "ERR", "ERR", "QAK", "QRD", "PID", "PRB"]);
    const parsed = parsePRR_PC5(wire).val!;
    expect(parsed.errors).toHaveLength(2);
    expect(parsed.queryAcknowledgment!.name).toBe("QAK");
    expect(parsed.patients[0].problems).toHaveLength(1);
    const v231 = "MSH|^~\\&|||||||PRR^PC5|M1|P|2.3.1\rMSA|AA|Q1\rQAK|Q1\rQRD|||||Q1\rPID|1\rPRB";
    expect(parsePRR_PC5_v231(v231).val!.queryAcknowledgment!.name).toBe("QAK");
    const warn = console.warn;
    console.warn = () => {};
    try {
      expect("queryAcknowledgment" in parsePRR_PC5_v23(v231).val!).toBe(false); // v2.3 skips the segment it does not know
    } finally {
      console.warn = warn;
    }
  });
});

describe("referrals (v2.5)", () => {
  test("RQI^I01 takes SFT; RQC^I06 repeats GT1 from v2.4 on", () => {
    expect(names(createRQI_I01(msh("RQI", "I01"), [{ provider: new PRD() }], new PID(), { software: [new SFT()] }).encode())).toEqual(["MSH", "SFT", "PRD", "PID"]);
    const wire = createRQC_I06(msh("RQC", "I06"), qrd(), [{ provider: new PRD() }], new PID(), { software: [new SFT()], guarantors: [new GT1(), new GT1()] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "QRD", "PRD", "PID", "GT1", "GT1"]);
    expect(parseRQC_I06(wire).val!.guarantors).toHaveLength(2);
    expect(parseRQC_I06_v24(wire.replace("SFT\r", "").replace("|2.5", "|2.4")).val!.guarantors).toHaveLength(2);
  });
});

describe("clinical trials, product experience and application management (v2.5)", () => {
  test("CSU^C09 takes SFT and optional TIMING QTY after each OBR", () => {
    const wire = createCSU_C09(msh("CSU", "C09"), [{
      patient: new PID().setId("1"),
      studyRegistration: new CSR(),
      studyPhases: [{ studySchedules: [{
        studyObservations: [{ observationRequest: new OBR().setId("1"), timings: [{ timing: new TQ1(), timingRelationships: [new TQ2()] }], observations: [new OBX().setId("1")] }],
        studyPharms: [{ administrations: [{ administration: new RXA(), route: new RXR() }] }],
      }] }],
    }], { software: [new SFT()] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "PID", "CSR", "OBR", "TQ1", "TQ2", "OBX", "RXA", "RXR"]);
    const parsed = parseCSU_C09(wire).val!;
    expect(parsed.patients[0].studyPhases[0].studySchedules[0].studyObservations[0].timings![0].timingRelationships).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
  });

  test("PEX^P07 requires TIMING QTY after RXE, in the cause and in the associated person", () => {
    const wire = createPEX_P07(msh("PEX", "P07"), new EVN(), new PID().setId("1"), [{
      experienceSender: new PES(),
      observations: [{ experienceObservation: new PEO(), causes: [{
        causalRelationship: new PCR(),
        rxOrder: { encodedOrder: new RXE(), timings: [{ timing: new TQ1() }], routes: [new RXR()] },
        associatedPerson: { nextOfKin: new NK1(), rxOrder: { encodedOrder: new RXE(), timings: [{ timing: new TQ1() }] } },
      }] }],
    }], { software: [new SFT()] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "EVN", "PID", "PES", "PEO", "PCR", "RXE", "TQ1", "RXR", "NK1", "RXE", "TQ1"]);
    const cause = parsePEX_P07(wire).val!.experiences[0].observations[0].causes[0];
    expect(cause.rxOrder!.timings).toHaveLength(1);
    expect(cause.associatedPerson!.rxOrder!.timings).toHaveLength(1);
    // @ts-expect-error the timing group is required after RXE
    expect(createPEX_P07(msh("PEX", "P07"), new EVN(), new PID(), [{ experienceSender: new PES(), observations: [{ experienceObservation: new PEO(), causes: [{ causalRelationship: new PCR(), rxOrder: { encodedOrder: new RXE() } }] }] }]).verify().errors).toEqual(["EXPERIENCE group 1: PEX OBSERVATION group 1: PEX CAUSE group 1: RX ORDER group 1: At least one TIMING QTY group (TQ1) is required"]);
  });

  test("NMR^N01 takes SFT and repeating ERR; SUR^P09 is unchanged", () => {
    const wire = createNMR_N01(msh("NMR", "N01"), msa(), [{ systemClock: new NCK() }], { software: [new SFT()], errors: [new ERR(), new ERR()] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "MSA", "ERR", "ERR", "NCK"]);
    expect(parseNMR_N01(wire).val!.errors).toHaveLength(2);
    const sur = createSUR_P09(msh("SUR", "P09"), [{ facility: new FAC(), products: [{ productSummary: new PSH(), productDetail: new PDC() }], productSummary: new PSH(), facilityDetails: [{ facility: new FAC(), productDetail: new PDC(), note: new NTE() }] }]);
    expect("software" in sur).toBe(false);
    expect(names(sur.encode())).toEqual(["MSH", "FAC", "PSH", "PDC", "PSH", "FAC", "PDC", "NTE"]);
  });
});
