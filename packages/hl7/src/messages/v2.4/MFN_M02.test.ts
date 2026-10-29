/** MFN^M02 (v2.4): MSH MFI { MF_STAFF: MFE STF [PRA] [ORG] } — the ORG segment is new in 2.4. */
import { describe, test, expect } from "vitest";
import { createMFN_M02 } from "./MFN_M02.ts";
import { createMFN_M02 as createMFN_M02_v23 } from "../v2.3/MFN_M02.ts";
import { parseMFN_M02 } from "../v2.4/MFN_M02.ts";
import { parseMFN_M02 as parseMFN_M02_v23 } from "../v2.3/MFN_M02.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MFI } from "../../segments/v2.4/MFI.ts";
import { MFE } from "../../segments/v2.4/MFE.ts";
import { STF } from "../../segments/v2.4/STF.ts";
import { PRA } from "../../segments/v2.4/PRA.ts";
import { ORG } from "../../segments/v2.4/ORG.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = () => new MSH().sendingApplication("HR").messageType({ messageCode: "MFN", triggerEvent: "M02" }).messageControlId("1");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("MFN_M02 (v2.4): ORG in the staff entry", () => {
  test("encodes and parses the ORG segment; v2.3 skips it with a warning", () => {
    const wire = createMFN_M02(msh(), new MFI(), [
      {
        entry: new MFE().recordLevelEventCode("MAD"),
        staff: new STF(),
        practitioner: new PRA(),
        organizationUnit: new ORG().setId("1").organizationUnitCode({ identifier: "CARD", text: "Cardiology" }).primaryOrgUnitIndicator("Y"),
      },
    ]).encode();
    expect(types(wire)).toEqual(["MSH", "MFI", "MFE", "STF", "PRA", "ORG"]);
    const result = parseMFN_M02(wire);
    expect(result.ok).toBe(true);
    const org = result.val!.staffEntries[0].organizationUnit!;
    expect(ParserUtils.getComponent(org.fields[1], 0)).toBe("CARD");
    expect(ParserUtils.getComponent(org.fields[3], 0)).toBe("Y");
    expect(result.val!.message.encode()).toBe(wire);

    // Not part of v2.3: the builder rejects it and the parser skips the unknown segment.
    expect(createMFN_M02_v23(msh(), new MFI(), [{ entry: new MFE(), staff: new STF(), organizationUnit: new ORG() } as any]).verify().errors)
      .toEqual(['MF STAFF group 1: Unknown property "organizationUnit"']);
    const v23 = parseMFN_M02_v23(wire);
    expect(v23.ok).toBe(true);
    expect(v23.val!.message.segments.map((s) => s.name)).not.toContain("ORG");
  });

  test("a second ORG is misplaced in v2.4 (it repeats from v2.5)", () => {
    const result = parseMFN_M02(["MSH|^~\\&|HR|HOSP|EMR|HOSP|20231015120000||MFN^M02|1|P|2.4", "MFI|PRA", "MFE|MAD", "STF|1", "ORG|1", "ORG|2"].join("\r"));
    expect(result.err!.message).toBe("ORG segment at line 6 is not allowed at this position in MFN_M02");
  });
});
