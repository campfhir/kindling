/** OSR^Q06 (v2.5): MSH MSA [{ERR}] [{SFT}] [{NTE}] QRD [QRF] [ [PID [{NTE}]] { ORC [{TQ1 [{TQ2}]}] <detail> [{NTE}] [{CTI}] } ] [DSC]. */
import { describe, test, expect } from "vitest";
import { createOSR_Q06 } from "./OSR_Q06.ts";
import { parseOSR_Q06 } from "../../parsers/v2.5/OSR_Q06_Parser.ts";
import { parseOSR_Q06 as parseOSR_Q06_v24 } from "../../parsers/v2.4/OSR_Q06_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { RQD } from "../../segments/v2.5/RQD.ts";

const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("OSR_Q06 (v2.5)", () => {
  test("ERR repeats and precedes SFT; orders gain the TIMING group", () => {
    const wire = createOSR_Q06(new MSH().messageType({ messageCode: "OSR", triggerEvent: "Q06" }).messageControlId("O1"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), {
      errors: [new ERR(), new ERR()],
      software: [new SFT().softwareProductName("kindling")],
      orders: [{ commonOrder: new ORC().orderControl("SC"), timings: [{ timing: new TQ1().setId("1") }], detail: { segment: new RQD().requisitionLineNumber("1") } }],
    }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ERR", "ERR", "SFT", "QRD", "ORC", "TQ1", "RQD"]);
    const result = parseOSR_Q06(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.errors).toHaveLength(2);
    expect(result.val!.software).toHaveLength(1);
    expect(result.val!.orders![0].timings![0].timing.name).toBe("TQ1");
    expect(result.val!.orders![0].detail!.segment.name).toBe("RQD");
    expect(result.val!.message.encode()).toBe(wire);
    // In v2.4 the ERR does not repeat: the second one stops the parser before the QRD it expects.
    expect(parseOSR_Q06_v24(wire).err!.message).toBe("OSR_Q06 message must contain a QRD segment");
  });

  test("the order detail stays required (as in v2.4)", () => {
    const msg = createOSR_Q06(new MSH().messageType({ messageCode: "OSR", triggerEvent: "Q06" }).messageControlId("O1"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1"), {
      // @ts-expect-error the detail is required from v2.4
      orders: [{ commonOrder: new ORC().orderControl("SC"), timings: [{ timing: new TQ1().setId("1") }] }],
    });
    expect(msg.verify().errors).toEqual(["ORDER group 1: At least one ORDER DETAIL group (OBR/RQD/RQ1/RXO/ODS/ODT) is required"]);
  });
});
