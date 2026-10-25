/** MFR (v2.4): MSH MSA [ERR] [QAK] QRD [QRF] MFI { MFE <record> } [DSC]; the M02 record gains [ORG]. */
import { describe, test, expect } from "vitest";
import { createMFR_M02 } from "./MFR_M02.ts";
import { createMFR_M04 } from "./MFR_M04.ts";
import { parseMFR_M02 } from "../../parsers/v2.4/MFR_M02_Parser.ts";
import { parseMFR_M04 } from "../../parsers/v2.4/MFR_M04_Parser.ts";
import { parseMFR_M02 as parseMFR_M02_v23 } from "../../parsers/v2.3/MFR_M02_Parser.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { QAK } from "../../segments/v2.4/QAK.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { MFI } from "../../segments/v2.4/MFI.ts";
import { MFE } from "../../segments/v2.4/MFE.ts";
import { STF } from "../../segments/v2.4/STF.ts";
import { ORG } from "../../segments/v2.4/ORG.ts";
import { CDM } from "../../segments/v2.4/CDM.ts";

const msh = (event: string) => new MSH().messageType({ messageCode: "MFR", triggerEvent: event }).messageControlId("R1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("MFR (v2.4)", () => {
  test("adds QAK; the staff record carries ORG", () => {
    const wire = createMFR_M02(msh("M02"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), new MFI().masterFileIdentifier({ identifier: "PRA" }), [
      { entry: new MFE().recordLevelEventCode("MAD").primaryKeyValue("D1"), staff: new STF(), organizationUnit: new ORG().setId("1") },
    ], { queryAcknowledgment: new QAK().queryTag("Q1").queryResponseStatus("OK") }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QAK", "QRD", "MFI", "MFE", "STF", "ORG"]);
    const parsed = parseMFR_M02(wire).val!;
    expect(parsed.queryAcknowledgment!.name).toBe("QAK");
    expect(parsed.entries[0].organizationUnit!.name).toBe("ORG");
    expect(parsed.message.encode()).toBe(wire);
    // v2.3 knows neither QAK nor ORG and skips both.
    expect(parseMFR_M02_v23(wire).val!.message.segments.map((s) => s.name)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "STF"]);
  });

  test("the typed records are the v2.3 ones", () => {
    const wire = createMFR_M04(msh("M04"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), new MFI().masterFileIdentifier({ identifier: "CDM" }), [
      { entry: new MFE().recordLevelEventCode("MAD").primaryKeyValue("C1"), chargeDescription: new CDM() },
    ]).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "CDM"]);
    expect(parseMFR_M04(wire).val!.entries[0].chargeDescription.name).toBe("CDM");
  });
});
