import { describe, test, expect } from "vitest";
import { createADT_A01 } from "./ADT_A01.ts";
import { createADT_A28 } from "./ADT_A28.ts";
import { createADT_A34 } from "./ADT_A34.ts";
import { createADT_A17 } from "./ADT_A17.ts";
import { createADT_A20 } from "./ADT_A20.ts";
import { parseADT_A01 } from "../../parsers/v2.5/ADT_A01_Parser.ts";
import { parseADT_A28 } from "../../parsers/v2.5/ADT_A28_Parser.ts";
import { parseADT_A34 } from "../../parsers/v2.5/ADT_A34_Parser.ts";
import { parseADT_A17 } from "../../parsers/v2.5/ADT_A17_Parser.ts";
import { parseADT_A20 } from "../../parsers/v2.5/ADT_A20_Parser.ts";
import { parseADT_A01 as parseADT_A01_v251 } from "../../parsers/v2.5.1/ADT_A01_Parser.ts";
import { parseADT_A08 } from "../../parsers/v2.5.1/ADT_A08_Parser.ts";
import { parseADT_A34 as parseADT_A34_v251 } from "../../parsers/v2.5.1/ADT_A34_Parser.ts";
import { parseADT_A47 } from "../../parsers/v2.5.1/ADT_A47_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { NK1 } from "../../segments/v2.5/NK1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { PR1 } from "../../segments/v2.5/PR1.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { IN3 } from "../../segments/v2.5/IN3.ts";
import { MRG } from "../../segments/v2.5/MRG.ts";
import { NPU } from "../../segments/v2.5/NPU.ts";
import { PDA } from "../../segments/v2.5/PDA.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (ev: string) => new MSH().sendingApplication("ADT").messageType({ messageCode: "ADT", triggerEvent: ev });
const evn = (ev: string) => new EVN().eventTypeCode(ev);
const pid = () => new PID().setId("1").patientName({ familyName: "Doe", givenName: "John" });
const pv1 = () => new PV1().patientClass("I");
const sft = () => new SFT().softwareVendorOrganization("Kindling").softwareVersion("0.13").softwareProductName("hl7");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = (ev: string) => `MSH|^~\\&|ADT|HOSP|EMR|HOSP|20231015120000||ADT^${ev}^ADT_${ev}|MSG001|P|2.5`;

describe("ADT_A01 (v2.5): SFT, visit ROLs, insurance IN3/ROL and PDA", () => {
  test("encodes the v2.5 additions in spec order and round-trips through v2.5 and v2.5.1", () => {
    const pda = new PDA()
      .deathCauseCode({ identifier: "I21.9", text: "Myocardial infarction", nameOfCodingSystem: "I10" })
      .deathLocation({ pointOfCare: "ICU", room: "3" })
      .deathCertifiedIndicator("Y")
      .deathCertificateSignedDateTime("20231015120000")
      .deathCertifiedBy({ id: "DR1", familyName: "Smith" })
      .autopsyIndicator("N")
      .coronerIndicator("N");
    const wire = createADT_A01(msh("A01"), evn("A01"), pid(), pv1(), {
      sftList: [sft()],
      pd1: new PD1(),
      rolList: [new ROL()],
      nk1List: [new NK1().setId("1")],
      pv2: new PV2(),
      visitRolList: [new ROL(), new ROL()],
      obxList: [new OBX().setId("1")],
      procedures: [{ pr1: new PR1().setId("1"), rolList: [new ROL()] }],
      insuranceGroups: [{ in1: new IN1().setId("1"), in3List: [new IN3().setId("1"), new IN3().setId("2")], rolList: [new ROL()] }],
      pda,
    }).encode();
    expect(types(wire)).toEqual([
      "MSH", "SFT", "EVN", "PID", "PD1", "ROL", "NK1", "PV1", "PV2", "ROL", "ROL", "OBX",
      "PR1", "ROL", "IN1", "IN3", "IN3", "ROL", "PDA",
    ]);
    for (const parse of [parseADT_A01, parseADT_A01_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(v.sftList).toHaveLength(1);
      expect(ParserUtils.getComponent(v.sftList![0].fields[0], 0)).toBe("Kindling");
      expect(v.rolList).toHaveLength(1);
      expect(v.visitRolList).toHaveLength(2);
      expect(v.procedures![0].rolList).toHaveLength(1);
      expect(v.insuranceGroups![0].in3List).toHaveLength(2);
      expect(v.insuranceGroups![0].rolList).toHaveLength(1);
      expect(v.pda).toBeTruthy();
      expect(ParserUtils.getComponent(v.pda!.fields[0], 0)).toBe("I21.9");
      expect(ParserUtils.getComponent(v.pda!.fields[1], 0)).toBe("ICU");
      expect(ParserUtils.getComponent(v.pda!.fields[4], 1)).toBe("Smith");
      expect(v.message.encode()).toBe(wire);
    }
  });

  test("a v2.3-shaped message still parses, with the new lists absent", () => {
    const result = parseADT_A01([MSH_LINE("A01"), "EVN|A01", "PID|1||1||Doe", "PV1|1|I", "OBX|1|ST|X||y", "IN1|1|PLAN", "IN2|1", "IN3|1", "ACC|20231015"].join("\r"));
    expect(result.ok).toBe(true);
    expect(result.val!.sftList).toEqual([]);
    expect(result.val!.visitRolList).toEqual([]);
    expect(result.val!.insuranceGroups![0].in3List).toHaveLength(1);
    expect(result.val!.pda).toBeUndefined();
  });

  test("wrappers reuse the v2.5 shape under their own names", () => {
    const wire = createADT_A28(msh("A28"), evn("A28"), pid(), pv1(), { sftList: [sft()] }).encode();
    expect(parseADT_A28(wire).val!.sftList).toHaveLength(1);
    const a08 = parseADT_A08([MSH_LINE("A08"), "SFT|Vendor|1|App", "EVN|A08", "PID|1", "PV1|1|I", "PDA|I10^x"].join("\r"));
    expect(a08.ok).toBe(true);
    expect(a08.val!.pda).toBeTruthy();
    expect(parseADT_A08([MSH_LINE("A08"), "EVN|A08"].join("\r")).err!.message).toMatch(/ADT_A08 message must contain a PID segment/);
  });

  test.each([
    [["EVN|A01", "SFT|x", "PID|1", "PV1|1"], /ADT_A01 message must contain a PID segment/],
    [["EVN|A01", "PID|1", "PV1|1", "OBX|1", "ROL|1"], /ROL segment at line 6 is not allowed at this position in ADT_A01/],
    [["EVN|A01", "PID|1", "PV1|1", "IN1|1", "ROL|1", "IN3|1"], /IN3 segment at line 7 is not allowed at this position in ADT_A01/],
    [["EVN|A01", "PID|1", "PV1|1", "PDA|1", "PDA|2"], /PDA segment at line 6 is not allowed at this position in ADT_A01/],
    [["EVN|A01", "PID|1", "PV1|1", "NK1|1"], /NK1 segment at line 5 is not allowed at this position in ADT_A01/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseADT_A01([MSH_LINE("A01"), ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});

describe("ADT_A34, ADT_A17 and ADT_A20 (v2.5): SFT after MSH", () => {
  test("A34 and its wrappers carry SFT", () => {
    const wire = createADT_A34(msh("A34"), evn("A34"), pid(), new MRG().priorPatientId({ id: "OLD" }), { sftList: [sft(), sft()] }).encode();
    expect(types(wire)).toEqual(["MSH", "SFT", "SFT", "EVN", "PID", "MRG"]);
    for (const parse of [parseADT_A34, parseADT_A34_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.sftList).toHaveLength(2);
      expect(result.val!.message.encode()).toBe(wire);
    }
    expect(parseADT_A47([MSH_LINE("A47"), "SFT|x", "EVN|A47", "PID|1", "MRG|OLD"].join("\r")).val!.sftList).toHaveLength(1);
    expect(parseADT_A34([MSH_LINE("A34"), "EVN|A34", "PID|1", "SFT|x", "MRG|OLD"].join("\r")).err!.message).toMatch(/ADT_A34 message must contain an MRG segment/);
  });

  test("A17 and A20 carry SFT", () => {
    const a17 = createADT_A17(msh("A17"), evn("A17"), [{ pid: pid(), pv1: pv1() }, { pid: pid(), pv1: pv1() }], { sftList: [sft()] }).encode();
    expect(types(a17).slice(0, 3)).toEqual(["MSH", "SFT", "EVN"]);
    expect(parseADT_A17(a17).val!.sftList).toHaveLength(1);
    const a20 = createADT_A20(msh("A20"), evn("A20"), new NPU().bedStatus("C"), { sftList: [sft()] }).encode();
    expect(types(a20)).toEqual(["MSH", "SFT", "EVN", "NPU"]);
    expect(parseADT_A20(a20).val!.sftList).toHaveLength(1);
    expect(parseADT_A20(a20).val!.message.encode()).toBe(a20);
  });
});
