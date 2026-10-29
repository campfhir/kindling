/** QRY^A19 (MSH QRD [QRF]) and ADR^A19 (MSH MSA [ERR] QRD [QRF] { [EVN] <ADT^A01 body> } [DSC]) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createQRY_A19, QRY_A19 } from "./QRY_A19.ts";
import { createADR_A19, ADR_A19 } from "./ADR_A19.ts";
import { parseQRY_A19 } from "./QRY_A19.ts";
import { parseADR_A19 } from "./ADR_A19.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { PR1 } from "./PR1.ts";
import { ROL } from "./ROL.ts";
import { IN1 } from "./IN1.ts";
import { IN3 } from "./IN3.ts";
import { DSC } from "./DSC.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = (type: string, event: string) => new MSH().sendingApplication("ADT").messageType({ messageCode: type, triggerEvent: event }).messageControlId("Q1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("R").queryPriority("I").queryId("Q1").whoSubjectFilter({ id: "12345" }).whatSubjectFilter({ code: "DEM" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("QRY_A19 (v2.3)", () => {
  test("encodes MSH QRD [QRF] and parses back", () => {
    expect(createQRY_A19(msh("QRY", "A19"), qrd())).toBeInstanceOf(QRY_A19);
    const wire = createQRY_A19(msh("QRY", "A19"), qrd(), { queryFilter: new QRF().whereSubjectFilter("ADT") }).encode();
    expect(names(wire)).toEqual(["MSH", "QRD", "QRF"]);
    const result = parseQRY_A19(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.query.fields[3], 0)).toBe("Q1");
    expect(ParserUtils.getComponent(result.val!.query.fields[7], 0)).toBe("12345");
    expect(result.val!.queryFilter!.name).toBe("QRF");
    expect(result.val!.message.encode()).toBe(wire);
  });

  test("verify() requires QRD", () => {
    // @ts-expect-error missing required segment
    expect(new QRY_A19(msh("QRY", "A19"), undefined).verify().errors).toEqual(["QRD segment is required"]);
    expect(parseQRY_A19([msh("QRY", "A19").encode(), "QRF|ADT"].join("\r")).err!.message).toBe("QRY_A19 message must contain a QRD segment");
  });
});

describe("ADR_A19 (v2.3)", () => {
  const response = (id: string) => ({
    event: new EVN().eventTypeCode("A19"),
    patient: new PID().setId("1").patientIdentifierList({ id }),
    visit: new PV1().setId("1").patientClass("I"),
    procedures: [{ procedure: new PR1().setId("1").procedureCode({ code: "4711" }), roles: [new ROL().roleInstanceId({ entityId: "1" })] }],
    insuranceGroups: [{ insurance: new IN1().setId("1").insurancePlanId({ code: "PLAN" }), insuranceCertification: new IN3().setId("1") }],
  });

  test("each query response repeats the ADT^A01 body after an optional EVN", () => {
    const msg = createADR_A19(msh("ADR", "A19"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), qrd(), [response("111"), { ...response("222"), event: undefined }], {
      error: new ERR().errorCodeAndLocation("0"),
      queryFilter: new QRF().whereSubjectFilter("ADT"),
      continuation: new DSC().continuationPointer("NEXT"),
    });
    expect(msg).toBeInstanceOf(ADR_A19);
    const wire = msg.encode();
    expect(names(wire)).toEqual([
      "MSH", "MSA", "ERR", "QRD", "QRF",
      "EVN", "PID", "PV1", "PR1", "ROL", "IN1", "IN3",
      "PID", "PV1", "PR1", "ROL", "IN1", "IN3",
      "DSC",
    ]);
    const result = parseADR_A19(wire);
    expect(result.ok).toBe(true);
    const parsed = result.val!;
    expect(parsed.queryResponses).toHaveLength(2);
    expect(parsed.queryResponses[0].event!.name).toBe("EVN");
    expect(parsed.queryResponses[1].event).toBeUndefined();
    expect(ParserUtils.getComponent(parsed.queryResponses[1].patient.fields[2], 0)).toBe("222");
    expect(parsed.queryResponses[0].procedures![0].roles).toHaveLength(1);
    expect(parsed.queryResponses[1].insuranceGroups![0].insuranceCertification!.name).toBe("IN3");
    expect(parsed.continuation!.name).toBe("DSC");
    expect(parsed.message.encode()).toBe(wire);
  });

  test("verify() requires MSA, QRD, at least one response and the PID/PV1 of each", () => {
    // @ts-expect-error missing required segments
    expect(new ADR_A19(msh("ADR", "A19"), undefined, undefined, []).verify().errors).toEqual([
      "MSA segment is required",
      "QRD segment is required",
      "At least one QUERY RESPONSE group (EVN/PID) is required",
    ]);
    // @ts-expect-error missing required segments
    expect(createADR_A19(msh("ADR", "A19"), new MSA(), qrd(), [{ event: new EVN() }]).verify().errors).toEqual([
      "QUERY RESPONSE group 1: PID segment is required",
      "QUERY RESPONSE group 1: PV1 segment is required",
    ]);
  });

  test("the parser rejects a second IN3 (it repeats only from v2.3.1)", () => {
    const wire = [msh("ADR", "A19").encode(), "MSA|AA|Q1", "QRD|20231015120000|R|I|Q1", "PID|1", "PV1|1|I", "IN1|1", "IN3|1", "IN3|2"].join("\r");
    expect(parseADR_A19(wire).err!.message).toBe("IN3 segment at line 8 is not allowed at this position in ADR_A19");
  });
});
