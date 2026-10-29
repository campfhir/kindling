/** VXR^V03 (v2.5): MSH MSA [{SFT}] QRD [QRF] PID [PD1] [{NK1}] [PV1 [PV2]] [{GT1}] [{IN1 [IN2] [IN3]}] [{ ORC [{TQ1 [{TQ2}]}] RXA [RXR] [{OBX [{NTE}]}] }]. */
import { describe, test, expect } from "vitest";
import { createVXR_V03, VXR_V03 } from "./VXR_V03.ts";
import { createVXX_V02 } from "./VXX_V02.ts";
import { parseVXR_V03 } from "../v2.5/VXR_V03.ts";
import { parseVXX_V02 } from "../v2.5/VXX_V02.ts";
import { parseVXR_V03 as parseVXR_V03_v24 } from "../v2.4/VXR_V03.ts";
import { parseVXR_V03 as parseVXR_V03_v23 } from "../v2.3/VXR_V03.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { GT1 } from "../../segments/v2.5/GT1.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { RXA } from "../../segments/v2.5/RXA.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("V1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const rxa = () => new RXA().giveSubIdCounter("0").administrationSubIdCounter("1").administeredCode({ code: "08" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("VXR_V03 and VXX_V02 (v2.5)", () => {
  test("SFT follows MSA; GT1 (v2.4) and the TIMING group with a required ORC (v2.5) are new", () => {
    const wire = createVXR_V03(msh("VXR", "V03"), msa(), qrd(), new PID().setId("1"), {
      software: [new SFT().softwareProductName("kindling")],
      guarantors: [new GT1().setId("1")],
      orders: [{ commonOrder: new ORC().orderControl("RE"), timings: [{ timing: new TQ1().setId("1") }], administration: rxa() }],
    }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "SFT", "QRD", "PID", "GT1", "ORC", "TQ1", "RXA"]);
    const result = parseVXR_V03(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.software).toHaveLength(1);
    expect(result.val!.guarantors).toHaveLength(1);
    expect(result.val!.orders![0].timings![0].timing.name).toBe("TQ1");
    expect(result.val!.message.encode()).toBe(wire);
    // @ts-expect-error ORC is required from v2.5
    expect(new VXR_V03(msh("VXR", "V03"), msa(), qrd(), new PID(), { orders: [{ administration: rxa() }] }).verify().errors).toEqual(["ORDER group 1: ORC segment is required"]);

    // Earlier versions skip the segments they do not know: v2.4 drops SFT and TQ1, v2.3 also GT1.
    expect(parseVXR_V03_v24(wire).val!.message.segments.map((s) => s.name)).toEqual(["MSH", "MSA", "QRD", "PID", "GT1", "ORC", "RXA"]);
    expect(parseVXR_V03_v23(wire).val!.message.segments.map((s) => s.name)).toEqual(["MSH", "MSA", "QRD", "PID", "ORC", "RXA"]);
  });

  test("VXX^V02 puts the SFT after MSA too", () => {
    const wire = createVXX_V02(msh("VXX", "V02"), msa(), qrd(), [{ patient: new PID().setId("1") }], { software: [new SFT().softwareProductName("kindling")] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "SFT", "QRD", "PID"]);
    expect(parseVXX_V02(wire).val!.software).toHaveLength(1);
  });
});
