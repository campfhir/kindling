/** DSR^Q01/P04 (MSH MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC]), DSR^Q03 ([MSA]) and UDM^Q05/R06 (MSH URD [URS] {DSP} [DSC]) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createDSR_Q01, DSR_Q01 } from "./DSR_Q01.ts";
import { createDSR_P04 } from "./DSR_P04.ts";
import { createDSR_Q03, DSR_Q03 } from "./DSR_Q03.ts";
import { createUDM_Q05, UDM_Q05 } from "./UDM_Q05.ts";
import { createUDM_R06 } from "./UDM_R06.ts";
import { parseDSR_Q01 } from "../v2.3/DSR_Q01.ts";
import { parseDSR_Q03 } from "../v2.3/DSR_Q03.ts";
import { parseUDM_Q05 } from "../v2.3/UDM_Q05.ts";
import { parseUDM_R06 } from "../v2.3/UDM_R06.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QAK } from "../../segments/v2.3/QAK.ts";
import { DSP } from "../../segments/v2.3/DSP.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";
import { URD } from "../../segments/v2.3/URD.ts";
import { URS } from "../../segments/v2.3/URS.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("R1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("D").queryPriority("I").queryId("Q1");
const lines = (...text: string[]) => text.map((t, i) => new DSP().setId(String(i + 1)).dataLine(t));
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("DSR_Q01 family (v2.3)", () => {
  test("DSR^Q01 carries the display lines after the query definition", () => {
    const msg = createDSR_Q01(msh("DSR", "Q01"), msa(), qrd(), lines("Patient: DOE, JOHN", "Visit: 1"), {
      queryAcknowledgment: new QAK().queryTag("Q1").queryResponseStatus("OK"),
      continuation: new DSC().continuationPointer("P2"),
    });
    expect(msg).toBeInstanceOf(DSR_Q01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QAK", "QRD", "DSP", "DSP", "DSC"]);
    const result = parseDSR_Q01(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.displayLines).toHaveLength(2);
    expect(ParserUtils.getComponent(result.val!.displayLines[1].fields[2], 0)).toBe("Visit: 1");
    expect(result.val!.queryAcknowledgment!.name).toBe("QAK");
    expect(result.val!.message.encode()).toBe(wire);
  });

  test("verify() requires MSA, QRD and at least one DSP", () => {
    // @ts-expect-error missing required segments
    expect(new DSR_Q01(msh("DSR", "Q01"), undefined, undefined, []).verify().errors).toEqual([
      "MSA segment is required",
      "QRD segment is required",
      "At least one DSP segment is required",
    ]);
    expect(parseDSR_Q01([msh("DSR", "Q01").encode(), "MSA|AA|Q1", "QRD|20231015120000|D|I|Q1"].join("\r")).err!.message).toBe("DSR_Q01 message must contain at least one DSP segment");
  });

  test("P04 wraps Q01; Q03 has an optional MSA", () => {
    expect(createDSR_P04(msh("DSR", "P04"), msa(), qrd(), lines("Bill"))).toBeInstanceOf(DSR_Q01);
    const q03 = createDSR_Q03(msh("DSR", "Q03"), qrd(), lines("Deferred"), { acknowledgment: msa() });
    expect(q03).toBeInstanceOf(DSR_Q03);
    expect(q03).not.toBeInstanceOf(DSR_Q01);
    expect(names(q03.encode())).toEqual(["MSH", "MSA", "QRD", "DSP"]);
    const withoutMsa = createDSR_Q03(msh("DSR", "Q03"), qrd(), lines("Deferred")).encode();
    expect(names(withoutMsa)).toEqual(["MSH", "QRD", "DSP"]);
    const result = parseDSR_Q03(withoutMsa);
    expect(result.ok).toBe(true);
    expect(result.val!.acknowledgment).toBeUndefined();
    expect(result.val!.displayLines).toHaveLength(1);
  });
});

describe("UDM_Q05 family (v2.3)", () => {
  test("UDM^Q05 is MSH URD [URS] {DSP} [DSC]", () => {
    const msg = createUDM_Q05(msh("UDM", "Q05"), new URD().reportPriority("R"), lines("Result 1", "Result 2"), { updateSelection: new URS().rUWhereSubjectDefinition("LAB") });
    expect(msg).toBeInstanceOf(UDM_Q05);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "URD", "URS", "DSP", "DSP"]);
    const result = parseUDM_Q05(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.updateDefinition.name).toBe("URD");
    expect(result.val!.updateSelection!.name).toBe("URS");
    expect(result.val!.displayLines).toHaveLength(2);
    expect(result.val!.message.encode()).toBe(wire);
    // @ts-expect-error missing required segments
    expect(new UDM_Q05(msh("UDM", "Q05"), undefined, []).verify().errors).toEqual(["URD segment is required", "At least one DSP segment is required"]);
  });

  test("R06 wraps Q05", () => {
    expect(createUDM_R06(msh("UDM", "R06"), new URD(), lines("x"))).toBeInstanceOf(UDM_Q05);
    expect(parseUDM_R06([msh("UDM", "R06").encode(), "URD|", "DSP|1||x"].join("\r")).val!.displayLines).toHaveLength(1);
  });
});
