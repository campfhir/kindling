/** The immunization queries of HL7 v2.3: VXQ^V01 (MSH QRD [QRF]), VXX^V02 (multiple PID matches) and VXR^V03 (the vaccination record). */
import { describe, test, expect } from "vitest";
import { createVXQ_V01, VXQ_V01 } from "./VXQ_V01.ts";
import { createVXX_V02, VXX_V02 } from "./VXX_V02.ts";
import { createVXR_V03, VXR_V03 } from "./VXR_V03.ts";
import { parseVXQ_V01 } from "./VXQ_V01.ts";
import { parseVXX_V02 } from "./VXX_V02.ts";
import { parseVXR_V03 } from "./VXR_V03.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PID } from "./PID.ts";
import { NK1 } from "./NK1.ts";
import { PV1 } from "./PV1.ts";
import { IN1 } from "./IN1.ts";
import { ORC } from "./ORC.ts";
import { RXA } from "./RXA.ts";
import { RXR } from "./RXR.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("V1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("V1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("R").queryPriority("I").queryId("Q1").whoSubjectFilter({ id: "12345", familyName: "DOE" });
const rxa = (n: string) => new RXA().giveSubIdCounter("0").administrationSubIdCounter(n).administeredCode({ code: "08", text: "Hep B" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("VXQ_V01 (v2.3)", () => {
  test("is MSH QRD [QRF]", () => {
    expect(createVXQ_V01(msh("VXQ", "V01"), qrd())).toBeInstanceOf(VXQ_V01);
    const wire = createVXQ_V01(msh("VXQ", "V01"), qrd(), { queryFilter: new QRF().whereSubjectFilter("IMM") }).encode();
    expect(names(wire)).toEqual(["MSH", "QRD", "QRF"]);
    const result = parseVXQ_V01(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.query.fields[7], 1)).toBe("DOE");
    expect(result.val!.message.encode()).toBe(wire);
  });
});

describe("VXX_V02 (v2.3)", () => {
  test("returns one PATIENT group per match", () => {
    const msg = createVXX_V02(msh("VXX", "V02"), msa(), qrd(), [
      { patient: new PID().setId("1").patientIdentifierList({ id: "111" }), nextOfKin: [new NK1().setId("1"), new NK1().setId("2")] },
      { patient: new PID().setId("2").patientIdentifierList({ id: "222" }) },
    ]);
    expect(msg).toBeInstanceOf(VXX_V02);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "PID", "NK1", "NK1", "PID"]);
    const result = parseVXX_V02(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.patients).toHaveLength(2);
    expect(result.val!.patients[0].nextOfKin).toHaveLength(2);
    expect(result.val!.patients[1].nextOfKin).toEqual([]);
    expect(result.val!.message.encode()).toBe(wire);
  });

  test("verify() requires at least one patient", () => {
    expect(createVXX_V02(msh("VXX", "V02"), msa(), qrd(), []).verify().errors).toEqual(["At least one PATIENT group (PID) is required"]);
    expect(parseVXX_V02([msh("VXX", "V02").encode(), "MSA|AA|V1", "QRD|20231015120000|R|I|Q1"].join("\r")).err!.message).toBe("VXX_V02 message must contain at least one PID segment");
  });
});

describe("VXR_V03 (v2.3)", () => {
  test("is the VXU^V04 body after MSA QRD [QRF], with the visit group inlined", () => {
    const msg = createVXR_V03(msh("VXR", "V03"), msa(), qrd(), new PID().setId("1"), {
      queryFilter: new QRF().whereSubjectFilter("IMM"),
      nextOfKin: [new NK1().setId("1")],
      visit: new PV1().patientClass("O"),
      insurances: [{ insurance: new IN1().setId("1") }],
      orders: [
        { commonOrder: new ORC().orderControl("RE"), administration: rxa("1"), route: new RXR().route({ code: "IM" }), observations: [{ observation: new OBX().setId("1").valueType("CE"), notes: [new NTE().setId("1")] }] },
        { administration: rxa("2") },
      ],
    });
    expect(msg).toBeInstanceOf(VXR_V03);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "QRF", "PID", "NK1", "PV1", "IN1", "ORC", "RXA", "RXR", "OBX", "NTE", "RXA"]);
    const result = parseVXR_V03(wire);
    expect(result.ok).toBe(true);
    const parsed = result.val!;
    expect(parsed.visit!.name).toBe("PV1");
    expect(parsed.visitDetails).toBeUndefined();
    expect(parsed.orders).toHaveLength(2);
    expect(parsed.orders![0].observations![0].notes).toHaveLength(1);
    expect(parsed.orders![1].commonOrder).toBeUndefined();
    expect(ParserUtils.getComponent(parsed.orders![1].administration.fields[1], 0)).toBe("2");
    expect(parsed.message.encode()).toBe(wire);
  });

  test("verify() requires MSA, QRD, PID and the RXA of each order", () => {
    // @ts-expect-error missing required segments
    expect(new VXR_V03(msh("VXR", "V03"), undefined, undefined, undefined, { orders: [{ commonOrder: new ORC() }] }).verify().errors).toEqual([
      "MSA segment is required",
      "QRD segment is required",
      "PID segment is required",
      "ORDER group 1: RXA segment is required",
    ]);
  });
});
