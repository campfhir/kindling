/** The original-mode queries of HL7 v2.3: QRY^Q01/Q02/P04 (MSH QRD [QRF] [DSC]), QRY^R02 (MSH QRD QRF) and QCK^Q02 (MSH MSA [ERR] [QAK]). */
import { describe, test, expect } from "vitest";
import { createQRY_Q01, QRY_Q01 } from "./QRY_Q01.ts";
import { createQRY_Q02, QRY_Q02 } from "./QRY_Q02.ts";
import { createQRY_P04 } from "./QRY_P04.ts";
import { createQRY_R02, QRY_R02 } from "./QRY_R02.ts";
import { createQCK_Q02 } from "./QCK_Q02.ts";
import { parseQRY_Q01 } from "./QRY_Q01.ts";
import { parseQRY_Q02, QRY_Q02_Parser } from "./QRY_Q02.ts";
import { QRY_Q01_Parser } from "./QRY_Q01.ts";
import { parseQRY_R02 } from "./QRY_R02.ts";
import { parseQCK_Q02 } from "./QCK_Q02.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { QAK } from "./QAK.ts";
import { DSC } from "./DSC.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("Q1");
const qrd = () => new QRD().queryDateTime("20231015120000").queryFormatCode("D").queryPriority("D").queryId("Q1").deferredResponseType("B");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("QRY_Q01 family (v2.3)", () => {
  test("QRY^Q01 encodes MSH QRD [QRF] [DSC] and parses back", () => {
    const wire = createQRY_Q01(msh("QRY", "Q01"), qrd(), { queryFilter: new QRF().whereSubjectFilter("LAB"), continuation: new DSC().continuationPointer("P2") }).encode();
    expect(names(wire)).toEqual(["MSH", "QRD", "QRF", "DSC"]);
    const result = parseQRY_Q01(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.query.fields[1], 0)).toBe("D");
    expect(ParserUtils.getComponent(result.val!.continuation!.fields[0], 0)).toBe("P2");
    expect(result.val!.message.encode()).toBe(wire);
    expect(names(createQRY_Q01(msh("QRY", "Q01"), qrd()).encode())).toEqual(["MSH", "QRD"]);
  });

  test("Q02 and P04 wrap Q01", () => {
    expect(createQRY_Q02(msh("QRY", "Q02"), qrd())).toBeInstanceOf(QRY_Q01);
    expect(createQRY_Q02(msh("QRY", "Q02"), qrd())).toBeInstanceOf(QRY_Q02);
    expect(createQRY_P04(msh("QRY", "P04"), qrd())).toBeInstanceOf(QRY_Q01);
    expect(QRY_Q02_Parser.prototype).toBeInstanceOf(QRY_Q01_Parser);
    expect(parseQRY_Q02([msh("QRY", "Q02").encode(), "QRD|20231015120000|D|D|Q1"].join("\r")).ok).toBe(true);
    // The wrapper reports errors under its own name.
    expect(parseQRY_Q02(msh("QRY", "Q02").encode()).err!.message).toBe("QRY_Q02 message must contain a QRD segment");
    // @ts-expect-error missing required segment
    expect(new QRY_Q02(msh("QRY", "Q02"), undefined).verify().errors).toEqual(["QRD segment is required"]);
  });

  test("QRY^R02 requires the QRF", () => {
    expect(createQRY_R02(msh("QRY", "R02"), qrd(), new QRF().whereSubjectFilter("LAB"))).toBeInstanceOf(QRY_R02);
    const wire = createQRY_R02(msh("QRY", "R02"), qrd(), new QRF().whereSubjectFilter("LAB")).encode();
    expect(names(wire)).toEqual(["MSH", "QRD", "QRF"]);
    expect(parseQRY_R02(wire).val!.queryFilter.name).toBe("QRF");
    // @ts-expect-error missing required segment
    expect(new QRY_R02(msh("QRY", "R02"), qrd(), undefined).verify().errors).toEqual(["QRF segment is required"]);
    expect(parseQRY_R02([msh("QRY", "R02").encode(), "QRD|20231015120000|D|D|Q1"].join("\r")).err!.message).toBe("QRY_R02 message must contain a QRF segment");
  });

  test("QCK^Q02 is MSH MSA [ERR] [QAK]", () => {
    const wire = createQCK_Q02(msh("QCK", "Q02"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), { queryAcknowledgment: new QAK().queryTag("Q1").queryResponseStatus("OK") }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QAK"]);
    const result = parseQCK_Q02(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.queryAcknowledgment!.fields[1], 0)).toBe("OK");
    expect(result.val!.error).toBeUndefined();
    expect(result.val!.message.encode()).toBe(wire);
  });
});
