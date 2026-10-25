/** MFK^M01–M11 (MSH MSA [ERR] MFI [{MFA}]), MFD^MFA (MSH MFI [{MFA}]) and MFQ^M01–M11 (MSH QRD [QRF] [DSC]) for HL7 v2.3. */
import { describe, test, expect } from "vitest";
import { createMFK_M01, MFK_M01 } from "./MFK_M01.ts";
import { createMFK_M04 } from "./MFK_M04.ts";
import { createMFK_M11 } from "./MFK_M11.ts";
import { createMFD_MFA, MFD_MFA } from "./MFD_MFA.ts";
import { createMFQ_M01, MFQ_M01 } from "./MFQ_M01.ts";
import { createMFQ_M05 } from "./MFQ_M05.ts";
import { parseMFK_M01 } from "../../parsers/v2.3/MFK_M01_Parser.ts";
import { parseMFK_M02 } from "../../parsers/v2.3/MFK_M02_Parser.ts";
import { parseMFD_MFA } from "../../parsers/v2.3/MFD_MFA_Parser.ts";
import { parseMFQ_M01 } from "../../parsers/v2.3/MFQ_M01_Parser.ts";
import { parseMFQ_M11 } from "../../parsers/v2.3/MFQ_M11_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { MFI } from "../../segments/v2.3/MFI.ts";
import { MFA } from "../../segments/v2.3/MFA.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("K1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("M1");
const mfi = () => new MFI().masterFileIdentifier({ identifier: "CDM" }).fileLevelEventCode("UPD");
const mfa = (key: string) => new MFA().recordLevelEventCode("MAD").mfnControlId(key).errorReturnCodeAndOrText({ identifier: "S" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("MFK_M01 family (v2.3)", () => {
  test("acknowledges each entry with an MFA", () => {
    const msg = createMFK_M01(msh("MFK", "M01"), msa(), mfi(), { error: new ERR().errorCodeAndLocation("0"), entryAcknowledgments: [mfa("1"), mfa("2")] });
    expect(msg).toBeInstanceOf(MFK_M01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ERR", "MFI", "MFA", "MFA"]);
    const parsed = parseMFK_M01(wire).val!;
    expect(parsed.entryAcknowledgments).toHaveLength(2);
    expect(ParserUtils.getComponent(parsed.entryAcknowledgments![1].fields[1], 0)).toBe("2");
    expect(parsed.message.encode()).toBe(wire);
    expect(names(createMFK_M01(msh("MFK", "M01"), msa(), mfi()).encode())).toEqual(["MSH", "MSA", "MFI"]);
  });

  test("M02–M11 wrap M01", () => {
    expect(createMFK_M04(msh("MFK", "M04"), msa(), mfi())).toBeInstanceOf(MFK_M01);
    expect(createMFK_M11(msh("MFK", "M11"), msa(), mfi(), { entryAcknowledgments: [mfa("1")] })).toBeInstanceOf(MFK_M01);
    expect(parseMFK_M02([msh("MFK", "M02").encode(), "MSA|AA|M1", "MFI|CDM||UPD", "MFA|MAD|1"].join("\r")).val!.entryAcknowledgments).toHaveLength(1);
    expect(parseMFK_M02([msh("MFK", "M02").encode(), "MSA|AA|M1"].join("\r")).err!.message).toBe("MFK_M02 message must contain an MFI segment");
    // @ts-expect-error missing required segments
    expect(new MFK_M01(msh("MFK", "M01"), undefined, undefined).verify().errors).toEqual(["MSA segment is required", "MFI segment is required"]);
  });

  test("MFD^MFA is MSH MFI [{MFA}]", () => {
    const msg = createMFD_MFA(msh("MFD", "MFA"), mfi(), { entryAcknowledgments: [mfa("1")] });
    expect(msg).toBeInstanceOf(MFD_MFA);
    expect(names(msg.encode())).toEqual(["MSH", "MFI", "MFA"]);
    expect(parseMFD_MFA(msg.encode()).val!.entryAcknowledgments).toHaveLength(1);
  });
});

describe("MFQ_M01 family (v2.3)", () => {
  test("is MSH QRD [QRF] [DSC]; M02–M11 wrap M01", () => {
    const qrd = new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1").whatSubjectFilter({ code: "MFQ" }).whatDepartmentDataCode({ code: "CDM" });
    const msg = createMFQ_M01(msh("MFQ", "M01"), qrd);
    expect(msg).toBeInstanceOf(MFQ_M01);
    expect(names(msg.encode())).toEqual(["MSH", "QRD"]);
    expect(ParserUtils.getComponent(parseMFQ_M01(msg.encode()).val!.query.fields[9], 0)).toBe("CDM");
    expect(createMFQ_M05(msh("MFQ", "M05"), qrd)).toBeInstanceOf(MFQ_M01);
    expect(parseMFQ_M11(msg.encode()).ok).toBe(true);
    expect(parseMFQ_M11(msh("MFQ", "M11").encode()).err!.message).toBe("MFQ_M11 message must contain a QRD segment");
  });
});
