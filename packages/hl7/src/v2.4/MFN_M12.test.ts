/** MFN^M12 (v2.4): MSH MFI { MF_OBS_ATTRIBUTES: MFE OM1 [OM7] }, with the OM7 segment new in 2.4; MFK/MFQ/MFR gain the M12 event. */
import { describe, test, expect } from "vitest";
import { createMFN_M12, MFN_M12 } from "./MFN_M12.ts";
import { createMFK_M12 } from "./MFK_M12.ts";
import { createMFQ_M12 } from "./MFQ_M12.ts";
import { createMFR_M12 } from "./MFR_M12.ts";
import { MFK_M01 } from "./MFK_M01.ts";
import { MFQ_M01 } from "./MFQ_M01.ts";
import { MFR_M01 } from "./MFR_M01.ts";
import { parseMFN_M12 } from "./MFN_M12.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { OM1 } from "./OM1.ts";
import { OM7 } from "./OM7.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("M1");
const mfi = () => new MFI().masterFileIdentifier({ identifier: "OME" }).fileLevelEventCode("UPD");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("MFN_M12 (v2.4)", () => {
  test("each entry is MFE OM1 [OM7]", () => {
    const om7 = new OM7().sequenceNumber("1").universalServiceIdentifier({ identifier: "GLU", text: "Glucose" }).categoryIdentifier({ identifier: "LAB" }, { identifier: "CHEM" }).consentIndicator("N");
    const msg = createMFN_M12(msh("MFN", "M12"), mfi(), [
      { entry: new MFE().recordLevelEventCode("MAD").primaryKeyValue("GLU"), observationDefinition: new OM1().sequenceNumber("1"), additionalAttributes: om7 },
      { entry: new MFE().recordLevelEventCode("MAD").primaryKeyValue("K"), observationDefinition: new OM1().sequenceNumber("2") },
    ]);
    expect(msg).toBeInstanceOf(MFN_M12);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MFI", "MFE", "OM1", "OM7", "MFE", "OM1"]);
    expect(wire.split("\r")[4]).toBe("OM7|1|GLU^Glucose|LAB~CHEM||||||||N");
    const parsed = parseMFN_M12(wire).val!;
    expect(parsed.entries).toHaveLength(2);
    expect(ParserUtils.getComponent(parsed.entries[0].additionalAttributes!.fields[1], 1)).toBe("Glucose");
    expect(parsed.entries[1].additionalAttributes).toBeUndefined();
    expect(parsed.message.encode()).toBe(wire);
  });

  test("MFK, MFQ and MFR have an M12 event wrapping M01", () => {
    expect(createMFK_M12(msh("MFK", "M12"), new MSA().acknowledgmentCode("AA").messageControlId("M1"), mfi())).toBeInstanceOf(MFK_M01);
    expect(createMFQ_M12(msh("MFQ", "M12"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"))).toBeInstanceOf(MFQ_M01);
    expect(createMFR_M12(msh("MFR", "M12"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), mfi(), [])).toBeInstanceOf(MFR_M01);
  });
});
