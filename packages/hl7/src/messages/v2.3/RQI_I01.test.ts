/** The referral messages of HL7 v2.3 chapter 11. */
import { describe, test, expect } from "vitest";
import { createRQI_I01, RQI_I01 } from "./RQI_I01.ts";
import { createRQI_I02 } from "./RQI_I02.ts";
import { createRPI_I01 } from "./RPI_I01.ts";
import { createRPL_I02 } from "./RPL_I02.ts";
import { createRPR_I03 } from "./RPR_I03.ts";
import { createRQP_I04 } from "./RQP_I04.ts";
import { createRQC_I05 } from "./RQC_I05.ts";
import { createRQC_I06 } from "./RQC_I06.ts";
import { createRCI_I05 } from "./RCI_I05.ts";
import { createRCL_I06 } from "./RCL_I06.ts";
import { createPIN_I07 } from "./PIN_I07.ts";
import { createRQA_I08, RQA_I08 } from "./RQA_I08.ts";
import { createRPA_I08 } from "./RPA_I08.ts";
import { createREF_I12, REF_I12 } from "./REF_I12.ts";
import { createREF_I15 } from "./REF_I15.ts";
import { createRRI_I12 } from "./RRI_I12.ts";
import { parseRQI_I01 } from "../v2.3/RQI_I01.ts";
import { parseRPR_I03 } from "../v2.3/RPR_I03.ts";
import { parseRCI_I05 } from "../v2.3/RCI_I05.ts";
import { parseRQA_I08 } from "../v2.3/RQA_I08.ts";
import { parseREF_I12 } from "../v2.3/REF_I12.ts";
import { parseRRI_I12 } from "../v2.3/RRI_I12.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { PRD } from "../../segments/v2.3/PRD.ts";
import { CTD } from "../../segments/v2.3/CTD.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { NK1 } from "../../segments/v2.3/NK1.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { DSP } from "../../segments/v2.3/DSP.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { OBR } from "../../segments/v2.3/OBR.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { RF1 } from "../../segments/v2.3/RF1.ts";
import { AUT } from "../../segments/v2.3/AUT.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { ACC } from "../../segments/v2.3/ACC.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("R1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("R1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const providers = () => [{ provider: new PRD(), contacts: [new CTD(), new CTD()] }, { provider: new PRD() }];
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("referrals (v2.3)", () => {
  test("RQI^I01 and RPI^I01 carry providers, the patient and the inlined guarantor/insurance group", () => {
    const msg = createRQI_I01(msh("RQI", "I01"), providers(), new PID().setId("1"), { nextOfKin: [new NK1()], guarantors: [new GT1()], insurances: [{ insurance: new IN1().setId("1") }], notes: [new NTE()] });
    expect(msg).toBeInstanceOf(RQI_I01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PRD", "CTD", "CTD", "PRD", "PID", "NK1", "GT1", "IN1", "NTE"]);
    const parsed = parseRQI_I01(wire).val!;
    expect(parsed.providers).toHaveLength(2);
    expect(parsed.providers[0].contacts).toHaveLength(2);
    expect(parsed.insurances).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
    expect(createRQI_I02(msh("RQI", "I02"), providers(), new PID())).toBeInstanceOf(RQI_I01);
    // The insurance is required once the guarantor/insurance group is present.
    expect(createRQI_I01(msh("RQI", "I01"), providers(), new PID(), { guarantors: [new GT1()] }).verify().errors).toEqual(["At least one INSURANCE group (IN1) is required"]);
    expect(names(createRPI_I01(msh("RPI", "I01"), msa(), providers(), new PID()).encode())).toEqual(["MSH", "MSA", "PRD", "CTD", "CTD", "PRD", "PID"]);
    expect(createRQI_I01(msh("RQI", "I01"), [], new PID()).verify().errors).toEqual(["At least one PROVIDER group (PRD) is required"]);
  });

  test("RPL^I02 returns display lines, RPR^I03 patient lists, RQP^I04 asks for demographics", () => {
    expect(names(createRPL_I02(msh("RPL", "I02"), msa(), providers(), { displayLines: [new DSP(), new DSP()] }).encode())).toEqual(["MSH", "MSA", "PRD", "CTD", "CTD", "PRD", "DSP", "DSP"]);
    const rpr = createRPR_I03(msh("RPR", "I03"), msa(), providers(), { patients: [new PID().setId("1"), new PID().setId("2")] }).encode();
    expect(parseRPR_I03(rpr).val!.patients).toHaveLength(2);
    expect(names(createRQP_I04(msh("RQP", "I04"), providers(), new PID(), { guarantors: [new GT1()] }).encode())).toEqual(["MSH", "PRD", "CTD", "CTD", "PRD", "PID", "GT1"]);
  });

  test("RQC/RCI/RCL carry the query definition; RCI nests results under observations", () => {
    expect(names(createRQC_I05(msh("RQC", "I05"), qrd(), providers(), new PID(), { guarantors: [new GT1(), new GT1()] }).encode())).toEqual(["MSH", "QRD", "PRD", "CTD", "CTD", "PRD", "PID", "GT1", "GT1"]);
    // RQC^I06 takes a single guarantor in v2.3.
    expect(names(createRQC_I06(msh("RQC", "I06"), qrd(), providers(), new PID(), { guarantor: new GT1() }).encode())).toEqual(["MSH", "QRD", "PRD", "CTD", "CTD", "PRD", "PID", "GT1"]);
    const rci = createRCI_I05(msh("RCI", "I05"), msa(), qrd(), providers(), new PID(), { diagnoses: [new DG1()], observations: [{ observationRequest: new OBR().setId("1"), results: [{ observation: new OBX().setId("1"), notes: [new NTE()] }] }] }).encode();
    expect(names(rci)).toEqual(["MSH", "MSA", "QRD", "PRD", "CTD", "CTD", "PRD", "PID", "DG1", "OBR", "OBX", "NTE"]);
    expect(parseRCI_I05(rci).val!.observations![0].results![0].notes).toHaveLength(1);
    expect(names(createRCL_I06(msh("RCL", "I06"), msa(), qrd(), providers(), new PID(), { displayLines: [new DSP()] }).encode())).toEqual(["MSH", "MSA", "QRD", "PRD", "CTD", "CTD", "PRD", "PID", "DSP"]);
    expect(names(createPIN_I07(msh("PIN", "I07"), providers(), new PID(), { insurances: [{ insurance: new IN1() }] }).encode())).toEqual(["MSH", "PRD", "CTD", "CTD", "PRD", "PID", "IN1"]);
  });

  test("RQA/RPA and REF/RRI: referral info, authorizations (top level and per procedure), observations and the visit", () => {
    const rqa = createRQA_I08(msh("RQA", "I08"), providers(), new PID().setId("1"), {
      referral: new RF1(),
      authorization: new AUT(),
      authorizationContact: new CTD(),
      accident: new ACC(),
      procedures: [{ procedure: new PR1().setId("1"), authorization: new AUT() }, { procedure: new PR1().setId("2") }],
      observations: [{ observationRequest: new OBR().setId("1"), results: [{ observation: new OBX().setId("1") }] }],
      visit: new PV1(),
      notes: [new NTE()],
    });
    expect(rqa).toBeInstanceOf(RQA_I08);
    const wire = rqa.encode();
    expect(names(wire)).toEqual(["MSH", "RF1", "AUT", "CTD", "PRD", "CTD", "CTD", "PRD", "PID", "ACC", "PR1", "AUT", "PR1", "OBR", "OBX", "PV1", "NTE"]);
    const parsed = parseRQA_I08(wire).val!;
    expect(parsed.authorizationContact!.name).toBe("CTD");
    expect(parsed.procedures![0].authorization!.name).toBe("AUT");
    expect(parsed.procedures![1].authorization).toBeUndefined();
    expect(parsed.visit!.name).toBe("PV1");
    expect(parsed.message.encode()).toBe(wire);

    // RPA requires at least one procedure.
    // @ts-expect-error procedures are required in RPA
    expect(createRPA_I08(msh("RPA", "I08"), msa(), providers(), new PID()).verify().errors).toEqual(["At least one PROCEDURE group (PR1) is required"]);

    const ref = createREF_I12(msh("REF", "I12"), providers(), new PID().setId("1"), { guarantors: [new GT1()], insurances: [{ insurance: new IN1() }], diagnoses: [new DG1()] });
    expect(ref).toBeInstanceOf(REF_I12);
    expect(names(ref.encode())).toEqual(["MSH", "PRD", "CTD", "CTD", "PRD", "PID", "GT1", "IN1", "DG1"]);
    expect(parseREF_I12(ref.encode()).val!.insurances).toHaveLength(1);
    expect(createREF_I15(msh("REF", "I15"), providers(), new PID())).toBeInstanceOf(REF_I12);

    const rri = createRRI_I12(msh("RRI", "I12"), providers(), new PID().setId("1"), { acknowledgment: msa(), referral: new RF1() }).encode();
    expect(names(rri)).toEqual(["MSH", "MSA", "RF1", "PRD", "CTD", "CTD", "PRD", "PID"]);
    expect(parseRRI_I12(rri).val!.acknowledgment!.name).toBe("MSA");
  });
});
