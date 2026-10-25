/** ADR^A19 (v2.3.1): MSH MSA [ERR] [QAK] QRD [QRF] { [EVN] PID ... IN1 [IN2] [{IN3}] ... } [DSC] — QAK and the repeating IN3 are new in 2.3.1. */
import { describe, test, expect } from "vitest";
import { createADR_A19 } from "./ADR_A19.ts";
import { parseADR_A19 } from "../../parsers/v2.3.1/ADR_A19_Parser.ts";
import { parseADR_A19 as parseADR_A19_v23 } from "../../parsers/v2.3/ADR_A19_Parser.ts";
import { parseADR_A19 as parseADR_A19_v24 } from "../../parsers/v2.4/ADR_A19_Parser.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { QAK } from "../../segments/v2.3.1/QAK.ts";
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { PV1 } from "../../segments/v2.3.1/PV1.ts";
import { IN1 } from "../../segments/v2.3.1/IN1.ts";
import { IN3 } from "../../segments/v2.3.1/IN3.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";

const msh = () => new MSH().messageType({ messageCode: "ADR", triggerEvent: "A19" }).messageControlId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("ADR_A19 (v2.3.1)", () => {
  const wire = () =>
    createADR_A19(msh(), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), [
      { patient: new PID().setId("1"), visit: new PV1().setId("1"), insuranceGroups: [{ insurance: new IN1().setId("1"), insuranceCertifications: [new IN3().setId("1"), new IN3().setId("2")] }] },
    ], { queryAcknowledgment: new QAK().queryTag("Q1").queryResponseStatus("OK") }).encode();

  test("carries a QAK and repeating IN3s", () => {
    expect(names(wire())).toEqual(["MSH", "MSA", "QAK", "QRD", "PID", "PV1", "IN1", "IN3", "IN3"]);
    const result = parseADR_A19(wire());
    expect(result.ok).toBe(true);
    expect(result.val!.queryAcknowledgment!.name).toBe("QAK");
    expect(result.val!.queryResponses[0].insuranceGroups![0].insuranceCertifications).toHaveLength(2);
    expect(result.val!.message.encode()).toBe(wire());
  });

  test("the v2.3 parser skips the unknown QAK and rejects the second IN3; the v2.4 parser accepts the message (and ROLs)", () => {
    expect(parseADR_A19_v23(wire()).err!.message).toBe("IN3 segment at line 9 is not allowed at this position in ADR_A19");
    expect(parseADR_A19_v24(wire()).ok).toBe(true);
    const withRoles = [...wire().split("\r").slice(0, 6), new ROL().roleInstanceId({ entityId: "1" }).encode(), "IN1|1", "ROL|2"].join("\r");
    const v24 = parseADR_A19_v24(withRoles).val!;
    expect(v24.queryResponses[0].visitRoles).toHaveLength(1);
    expect(v24.queryResponses[0].insuranceGroups![0].roles).toHaveLength(1);
    expect(parseADR_A19(withRoles).err!.message).toBe("ROL segment at line 7 is not allowed at this position in ADR_A19");
  });
});
