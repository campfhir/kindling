/** ORF^R04 (v2.5): MSH [{SFT}] MSA QRD [QRF] { [PID [{NTE}]] { [ORC] OBR [{NTE}] [{TQ1 [{TQ2}]}] [CTD] { [OBX] [{NTE}] } [{CTI}] } } [{ERR}] [QAK] [DSC]; W02 has no timing groups. */
import { describe, test, expect } from "vitest";
import { createORF_R04 } from "./ORF_R04.ts";
import { createORF_W02, ORF_W02 } from "./ORF_W02.ts";
import { ORF_R04 } from "./ORF_R04.ts";
import { parseORF_R04 } from "../v2.5/ORF_R04.ts";
import { parseORF_W02 } from "../v2.5/ORF_W02.ts";
import { parseORF_R04 as parseORF_R04_v24 } from "../v2.4/ORF_R04.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QAK } from "../../segments/v2.5/QAK.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { CTD } from "../../segments/v2.5/CTD.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";

const msh = (event: string) => new MSH().messageType({ messageCode: "ORF", triggerEvent: event }).messageControlId("R1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("ORF_R04 (v2.5)", () => {
  test("adds SFT, the TIMING QTY groups, CTD and a trailing repeating ERR + QAK", () => {
    const wire = createORF_R04(msh("R04"), msa(), qrd(), [
      {
        patient: new PID().setId("1"),
        orders: [{
          observationRequest: new OBR().setId("1"),
          timings: [{ timing: new TQ1().setId("1"), timingRelationships: [new TQ2().setId("1")] }],
          contact: new CTD(),
          observations: [{ observation: new OBX().setId("1").valueType("NM") }],
        }],
      },
    ], {
      software: [new SFT().softwareVendorOrganization("Campfhir").softwareProductName("kindling")],
      errors: [new ERR(), new ERR()],
      queryAcknowledgment: new QAK().queryTag("Q1").queryResponseStatus("OK"),
    }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "MSA", "QRD", "PID", "OBR", "TQ1", "TQ2", "CTD", "OBX", "ERR", "ERR", "QAK"]);
    const result = parseORF_R04(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.software).toHaveLength(1);
    expect(result.val!.queryResponses[0].orders[0].timings![0].timingRelationships).toHaveLength(1);
    expect(result.val!.queryResponses[0].orders[0].contact!.name).toBe("CTD");
    expect(result.val!.errors).toHaveLength(2);
    expect(result.val!.message.encode()).toBe(wire);
    // v2.4 has CTD and a single ERR; it does not know SFT, TQ1 or TQ2 (skipped) and rejects the second ERR.
    expect(parseORF_R04_v24(wire).err!.message).toBe("ERR segment at line 12 is not allowed at this position in ORF_R04");
  });

  test("W02 is its own message in v2.5: no TIMING QTY groups", () => {
    expect(createORF_W02(msh("W02"), msa(), qrd(), [])).toBeInstanceOf(ORF_W02);
    expect(createORF_W02(msh("W02"), msa(), qrd(), [])).not.toBeInstanceOf(ORF_R04);
    const wire = createORF_W02(msh("W02"), msa(), qrd(), [{ orders: [{ observationRequest: new OBR().setId("1"), contact: new CTD(), observations: [] }] }], { errors: [new ERR()] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "OBR", "CTD", "ERR"]);
    expect(parseORF_W02(wire).val!.queryResponses[0].orders[0].contact!.name).toBe("CTD");
    // A TQ1 is not part of ORF^W02, so the parser skips it as an unknown segment.
    const withTq1 = parseORF_W02([...wire.split("\r").slice(0, 4), "TQ1|1", "CTD|", "ERR|"].join("\r"));
    expect(withTq1.ok).toBe(true);
    expect(withTq1.val!.message.segments.map((s) => s.name)).toEqual(["MSH", "MSA", "QRD", "OBR", "CTD", "ERR"]);
    // @ts-expect-error timings are not part of ORF^W02
    expect(createORF_W02(msh("W02"), msa(), qrd(), [{ orders: [{ observationRequest: new OBR(), observations: [], timings: [] }] }]).verify().errors).toEqual(['QUERY RESPONSE group 1: ORDER group 1: Unknown property "timings"']);
  });
});
