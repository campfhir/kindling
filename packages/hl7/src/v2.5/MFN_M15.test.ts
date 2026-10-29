/** MFN^M15 (v2.5): MSH [{SFT}] MFI { MF_INV_ITEM: MFE IIM }, with the IIM segment new in 2.5; MFN^M12 gains SFT. */
import { describe, test, expect } from "vitest";
import { createMFN_M15, MFN_M15 } from "./MFN_M15.ts";
import { createMFN_M12 } from "./MFN_M12.ts";
import { createMFK_M15 } from "./MFK_M15.ts";
import { MFK_M01 } from "./MFK_M01.ts";
import { parseMFN_M15 } from "./MFN_M15.ts";
import { parseMFN_M12 } from "./MFN_M12.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { MSA } from "./MSA.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { IIM } from "./IIM.ts";
import { OM1 } from "./OM1.ts";
import { OM7 } from "./OM7.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("M1");
const mfi = (file: string) => new MFI().masterFileIdentifier({ identifier: file }).fileLevelEventCode("UPD");
const mfe = (key: string) => new MFE().recordLevelEventCode("MAD").primaryKeyValue(key);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("MFN_M15 and MFN_M12 (v2.5)", () => {
  test("each inventory item entry is MFE IIM", () => {
    const iim = new IIM().primaryKeyValue({ code: "INV1", text: "Reagent A" }).serviceItemCode("GLU").inventoryLotNumber("LOT42").inventoryOnHandQuantity("12");
    const msg = createMFN_M15(msh("MFN", "M15"), mfi("INV"), [{ entry: mfe("INV1"), inventoryItem: iim }], { software: [new SFT().softwareProductName("kindling")] });
    expect(msg).toBeInstanceOf(MFN_M15);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "MFI", "MFE", "IIM"]);
    expect(wire.split("\r")[4]).toBe("IIM|INV1^Reagent A|GLU|LOT42|||||||||12");
    const parsed = parseMFN_M15(wire).val!;
    expect(ParserUtils.getComponent(parsed.entries[0].inventoryItem.fields[0], 1)).toBe("Reagent A");
    expect(parsed.message.encode()).toBe(wire);
    // @ts-expect-error IIM is required
    expect(createMFN_M15(msh("MFN", "M15"), mfi("INV"), [{ entry: mfe("INV1") }]).verify().errors).toEqual(["MF INV ITEM group 1: IIM segment is required"]);
    expect(createMFK_M15(msh("MFK", "M15"), new MSA().acknowledgmentCode("AA").messageControlId("M1"), mfi("INV"))).toBeInstanceOf(MFK_M01);
  });

  test("MFN^M12 gains SFT", () => {
    const wire = createMFN_M12(msh("MFN", "M12"), mfi("OME"), [{ entry: mfe("GLU"), observationDefinition: new OM1().sequenceNumber("1"), additionalAttributes: new OM7().sequenceNumber("1") }], { software: [new SFT()] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "MFI", "MFE", "OM1", "OM7"]);
    expect(parseMFN_M12(wire).val!.entries[0].additionalAttributes!.name).toBe("OM7");
  });
});
