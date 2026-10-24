import { describe, test, expect } from "vitest";
import { createMDM_T01, MDM_T01 } from "./MDM_T01.ts";
import { createMDM_T02, MDM_T02 } from "./MDM_T02.ts";
import { parseMDM_T01 } from "../../parsers/v2.3/MDM_T01_Parser.ts";
import { parseMDM_T02 } from "../../parsers/v2.3/MDM_T02_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { TXA } from "../../segments/v2.3/TXA.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (ev: string) => new MSH().sendingApplication("HIS").messageType({ messageCode: "MDM", triggerEvent: ev });
const evn = (ev: string) => new EVN().eventTypeCode(ev).recordedDateTime("20231015120000");
const pid = () => new PID().setId("1").patientName({ familyName: "Doe", givenName: "John" });
const pv1 = () => new PV1().patientClass("I");
const txa = () => new TXA().setId("1").documentType("DS");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = (ev: string) => `MSH|^~\\&|HIS|HOSP|EMR|HOSP|20231015120000||MDM^${ev}^MDM_${ev}|MSG001|P|2.3`;

describe("MDM_T01 / MDM_T02 builders (v2.3)", () => {
  test("T01 is MSH EVN PID PV1 TXA and round-trips", () => {
    const wire = createMDM_T01(msh("T01"), evn("T01"), pid(), pv1(), txa()).encode();
    expect(types(wire)).toEqual(["MSH", "EVN", "PID", "PV1", "TXA"]);
    const result = parseMDM_T01(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.txa.fields[1], 0)).toBe("DS");
    expect(result.val!.message.encode()).toBe(wire);
  });

  test("T02 appends the OBX content and requires at least one OBX", () => {
    const wire = createMDM_T02(msh("T02"), evn("T02"), pid(), pv1(), txa(), [new OBX().setId("1"), new OBX().setId("2")]).encode();
    expect(types(wire)).toEqual(["MSH", "EVN", "PID", "PV1", "TXA", "OBX", "OBX"]);
    const result = parseMDM_T02(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.obxList).toHaveLength(2);
    expect(result.val!.message.encode()).toBe(wire);
    expect(new MDM_T02(msh("T02"), evn("T02"), pid(), pv1(), txa(), []).verify().errors).toEqual(["At least one OBX segment is required"]);
  });

  test("verify() lists every missing segment", () => {
    expect(new MDM_T01(null as any, null as any, null as any, null as any, null as any).verify().errors).toEqual([
      "MSH segment is required", "EVN segment is required", "PID segment is required", "PV1 segment is required", "TXA segment is required",
    ]);
  });
});

describe("parseMDM_T01 / parseMDM_T02 (v2.3)", () => {
  const body = ["EVN|T02|20231015120000", "PID|1||12345^^^MRN^MR||Doe^John", "PV1|1|I|WEST^101^1", "TXA|1|DS|TX|20231015120000"];

  test("T02 parses OBX content after TXA", () => {
    const result = parseMDM_T02([MSH_LINE("T02"), ...body, "OBX|1|TX|DS^Discharge summary||Line one", "OBX|2|TX|DS^Discharge summary||Line two"].join("\r"));
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.obxList[1].fields[4], 0)).toBe("Line two");
  });

  test("T02 without OBX, OBX before TXA, and T01 without TXA are rejected", () => {
    expect(parseMDM_T02([MSH_LINE("T02"), ...body].join("\r")).err!.message).toMatch(/MDM_T02 message must contain at least one OBX segment/);
    expect(parseMDM_T02([MSH_LINE("T02"), ...body.slice(0, 3), "OBX|1|TX", "TXA|1"].join("\r")).err!.message).toMatch(/MDM_T02 message must contain a TXA segment/);
    expect(parseMDM_T01([MSH_LINE("T01"), ...body.slice(0, 3)].join("\r")).err!.message).toMatch(/MDM_T01 message must contain a TXA segment/);
    expect(parseMDM_T01([MSH_LINE("T01"), "EVN|T01", "PV1|1|I"].join("\r")).err!.message).toMatch(/MDM_T01 message must contain a PID segment/);
  });
});
