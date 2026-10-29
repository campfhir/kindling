/** SQR^S25 (v2.5): MSH MSA [{ERR}] QAK [{ SCH [{TQ1}] [{NTE}] [PID [PV1] [PV2] [DG1]] { RGS ... } }] [DSC] — ERR repeats and TQ1 follows SCH. */
import { describe, test, expect } from "vitest";
import { createSQR_S25 } from "./SQR_S25.ts";
import { parseSQR_S25 } from "../v2.5/SQR_S25.ts";
import { parseSQR_S25 as parseSQR_S25_v24 } from "../v2.4/SQR_S25.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QAK } from "../../segments/v2.5/QAK.ts";
import { SCH } from "../../segments/v2.5/SCH.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { RGS } from "../../segments/v2.5/RGS.ts";

const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("SQR_S25 (v2.5)", () => {
  test("ERR repeats and each schedule may carry TQ1s after SCH", () => {
    const wire = createSQR_S25(new MSH().messageType({ messageCode: "SQR", triggerEvent: "S25" }).messageControlId("S1"), new MSA().acknowledgmentCode("AA").messageControlId("Q1"), new QAK().queryTag("Q1").queryResponseStatus("OK"), {
      errors: [new ERR(), new ERR()],
      schedules: [{ appointment: new SCH(), timings: [new TQ1().setId("1"), new TQ1().setId("2")], resources: [{ resourceGroup: new RGS().setId("1") }] }],
    }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ERR", "ERR", "QAK", "SCH", "TQ1", "TQ1", "RGS"]);
    const result = parseSQR_S25(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.errors).toHaveLength(2);
    expect(result.val!.schedules![0].timings).toHaveLength(2);
    expect(result.val!.message.encode()).toBe(wire);
    // In v2.4 the ERR does not repeat: the second one stops the parser before the QAK it expects.
    expect(parseSQR_S25_v24(wire).err!.message).toBe("SQR_S25 message must contain a QAK segment");
  });
});
