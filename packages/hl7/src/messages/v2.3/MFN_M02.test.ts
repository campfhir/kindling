import { describe, test, expect } from "vitest";
import { createMFN_M02, MFN_M02 } from "./MFN_M02.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MFI } from "../../segments/v2.3/MFI.ts";
import { MFE } from "../../segments/v2.3/MFE.ts";
import { STF } from "../../segments/v2.3/STF.ts";
import { PRA } from "../../segments/v2.3/PRA.ts";
import { parseMFN_M02 } from "../v2.3/MFN_M02.ts";

function buildBasicMessage() {
  const msh = new MSH()
    .sendingApplication("LAB")
    .messageType({ messageCode: "MFN", triggerEvent: "M02" })
    .messageControlId("MSG001")
    .processingId("P")
    .versionId("2.3");

  const mfi = new MFI()
    .masterFileIdentifier({ identifier: "STF", text: "Staff Master File" })
    .fileLevelEventCode("UPD")
    .responseLevelCode("NE");

  const mfe = new MFE()
    .recordLevelEventCode("MAD")
    .mfnControlId("CTL001")
    .primaryKeyValue("DOC001");

  const stf = new STF()
    .primaryKeyValue({ identifier: "DOC001" })
    .staffName({ familyName: "Smith", givenName: "John", middleName: "A" })
    .staffType("MD")
    .administrativeSex("M")
    .activeInactiveFlag("A");

  return { header: msh, masterFile: mfi, entry: mfe, staff: stf };
}

describe("MFN_M02 builder", () => {
  test("createMFN_M02 returns MFN_M02 instance", () => {
    const { header: msh, masterFile: mfi, entry: mfe, staff: stf } = buildBasicMessage();
    const message = createMFN_M02(msh, mfi, [{ entry: mfe, staff: stf }]);

    expect(message instanceof MFN_M02).toBeTruthy();
  });

  test("verify() detects missing MSH", () => {
    const { masterFile: mfi, entry: mfe, staff: stf } = buildBasicMessage();
    // deno-lint-ignore no-explicit-any
    const message = new MFN_M02(null as any, mfi, [{ entry: mfe, staff: stf }]);

    const result = message.verify();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("MSH segment is required"))).toBe(true);
  });

  test("verify() detects missing MFI", () => {
    const { header: msh, entry: mfe, staff: stf } = buildBasicMessage();
    // deno-lint-ignore no-explicit-any
    const message = new MFN_M02(msh, null as any, [{ entry: mfe, staff: stf }]);

    const result = message.verify();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("MFI segment is required"))).toBe(true);
  });

  test("verify() detects empty staff entries", () => {
    const { header: msh, masterFile: mfi } = buildBasicMessage();
    const message = new MFN_M02(msh, mfi, []);

    const result = message.verify();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("At least one MF STAFF group (MFE) is required"))).toBe(true);
  });

  test("encode() produces parseable MFN_M02 message", () => {
    const { header: msh, masterFile: mfi, entry: mfe, staff: stf } = buildBasicMessage();
    const message = createMFN_M02(msh, mfi, [{ entry: mfe, staff: stf }]);

    const encoded = message.encode();
    const parsed = parseMFN_M02(encoded);

    expect(parsed.ok).toBe(true);
    expect(parsed.val?.staffEntries.length).toBe(1);
    expect(parsed.val?.staffEntries[0].staff.getStaffName().familyName).toBe("Smith");
  });

  test("encode() includes PRA when present", () => {
    const { header: msh, masterFile: mfi, entry: mfe, staff: stf } = buildBasicMessage();

    const pra = new PRA()
      .primaryKeyValue({ identifier: "DOC001" })
      .practitionerCategory("OP");

    const message = createMFN_M02(msh, mfi, [{ entry: mfe, staff: stf, practitioner: pra }]);
    const encoded = message.encode();
    const parsed = parseMFN_M02(encoded);

    expect(parsed.ok).toBe(true);
    expect(parsed.val?.staffEntries[0].practitioner).toBeDefined();
    expect(parsed.val?.staffEntries[0].practitioner?.getPractitionerCategory()).toBe("OP");
  });

  test("encode() handles multiple staff entries", () => {
    const { header: msh, masterFile: mfi } = buildBasicMessage();

    const entries = ["DOC001", "DOC002", "DOC003"].map((id, i) => ({
      entry: new MFE().recordLevelEventCode("MAD").mfnControlId(`CTL00${i + 1}`).primaryKeyValue(id),
      staff: new STF().primaryKeyValue({ identifier: id }).staffName({ familyName: `Doctor${i + 1}` }).activeInactiveFlag("A"),
    }));

    const message = createMFN_M02(msh, mfi, entries);
    const encoded = message.encode();
    const parsed = parseMFN_M02(encoded);

    expect(parsed.ok).toBe(true);
    expect(parsed.val?.staffEntries.length).toBe(3);
  });

  test("encode() round-trips through parse", () => {
    const { header: msh, masterFile: mfi, entry: mfe, staff: stf } = buildBasicMessage();
    const message = createMFN_M02(msh, mfi, [{ entry: mfe, staff: stf }]);
    const encoded = message.encode();

    const parsed = parseMFN_M02(encoded);
    expect(parsed.ok).toBe(true);

    // Re-encode from parsed data
    const rebuilt = createMFN_M02(
      parsed.val!.header,
      parsed.val!.masterFile,
      parsed.val!.staffEntries,
    );
    const reencoded = rebuilt.encode();

    expect(reencoded).toBe(encoded);
  });
});
