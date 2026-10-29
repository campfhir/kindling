/** QRY^T12 (document query: MSH QRD [QRF]) and DOC^T12 (MSH MSA [ERR] QRD { [EVN] PID PV1 TXA [{OBX}] } [DSC]) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createQRY_T12, QRY_T12 } from "./QRY_T12.ts";
import { createDOC_T12, DOC_T12 } from "./DOC_T12.ts";
import { parseQRY_T12 } from "../v2.3/QRY_T12.ts";
import { parseDOC_T12 } from "../v2.3/DOC_T12.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { TXA } from "../../segments/v2.3/TXA.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (type: string) => new MSH().messageType({ messageCode: type, triggerEvent: "T12" }).messageControlId("D1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("QRY_T12 and DOC_T12 (v2.3)", () => {
  test("QRY^T12 is MSH QRD [QRF]", () => {
    expect(createQRY_T12(msh("QRY"), qrd())).toBeInstanceOf(QRY_T12);
    const wire = createQRY_T12(msh("QRY"), qrd()).encode();
    expect(names(wire)).toEqual(["MSH", "QRD"]);
    expect(parseQRY_T12(wire).val!.message.encode()).toBe(wire);
  });

  test("DOC^T12 returns one RESULT group per document", () => {
    const result = (id: string, withEvent = true) => ({
      event: withEvent ? new EVN().eventTypeCode("T12") : undefined,
      patient: new PID().setId("1").patientIdentifierList({ id }),
      visit: new PV1().setId("1").patientClass("I"),
      document: new TXA().setId("1").documentType("DS"),
      observations: withEvent ? [new OBX().setId("1").valueType("TX"), new OBX().setId("2").valueType("TX")] : [],
    });
    const msg = createDOC_T12(msh("DOC"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), qrd(), [result("111"), result("222", false)]);
    expect(msg).toBeInstanceOf(DOC_T12);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "EVN", "PID", "PV1", "TXA", "OBX", "OBX", "PID", "PV1", "TXA"]);
    const parsed = parseDOC_T12(wire);
    expect(parsed.ok).toBe(true);
    expect(parsed.val!.results).toHaveLength(2);
    expect(parsed.val!.results[0].observations).toHaveLength(2);
    expect(ParserUtils.getComponent(parsed.val!.results[0].document.fields[1], 0)).toBe("DS");
    expect(parsed.val!.results[1].event).toBeUndefined();
    expect(parsed.val!.results[1].observations).toEqual([]);
    expect(parsed.val!.message.encode()).toBe(wire);
  });

  test("verify() requires PID, PV1 and TXA in each result", () => {
    // @ts-expect-error missing required segments
    expect(createDOC_T12(msh("DOC"), new MSA(), qrd(), [{ event: new EVN() }]).verify().errors).toEqual([
      "RESULT group 1: PID segment is required",
      "RESULT group 1: PV1 segment is required",
      "RESULT group 1: TXA segment is required",
    ]);
    expect(parseDOC_T12([msh("DOC").encode(), "MSA|AA|Q1", "QRD|20231015120000|R|I|Q1"].join("\r")).err!.message).toBe("DOC_T12 message must contain at least one EVN/PID segment");
  });
});
