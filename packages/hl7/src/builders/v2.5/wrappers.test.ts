/**
 * In v2.4 and v2.5 the wrapper events (ADT A02…, SRR S02…, MDM T03…) are copied by codegen so
 * they wrap that version's own base message. These checks would fail if a wrapper silently fell
 * back to the v2.3 base.
 */
import { test, expect } from "vitest";
import { parseADT_A08 } from "../../parsers/v2.5/ADT_A08_Parser.ts";
import { parseADT_A18 } from "../../parsers/v2.5/ADT_A18_Parser.ts";
import { parseSRR_S02 } from "../../parsers/v2.5/SRR_S02_Parser.ts";
import { parseMDM_T03 } from "../../parsers/v2.5/MDM_T03_Parser.ts";
import { parseADT_A08 as parseADT_A08_v24 } from "../../parsers/v2.4/ADT_A08_Parser.ts";
import { createADT_A08 } from "./ADT_A08.ts";
import { createSRR_S02 } from "./SRR_S02.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";

const MSH_LINE = (type: string, ev: string) => `MSH|^~\\&|APP|HOSP|EMR|HOSP|20231015120000||${type}^${ev}|MSG001|P|2.5`;

test("v2.5 ADT wrappers accept SFT and PDA; the v2.4 ones accept PDA only", () => {
  const wire = createADT_A08(new MSH().messageType({ messageCode: "ADT", triggerEvent: "A08" }), new EVN(), new PID(), new PV1(), { software: [new SFT()] }).encode();
  expect(wire.split("\r").map((s) => s.slice(0, 3))).toEqual(["MSH", "SFT", "EVN", "PID", "PV1"]);
  expect(parseADT_A08(wire).val!.software).toHaveLength(1);
  const withPda = [MSH_LINE("ADT", "A08"), "EVN|A08", "PID|1", "PV1|1|I", "PDA|I10"].join("\r");
  expect(parseADT_A08(withPda).val!.deathAndAutopsy).toBeTruthy();
  expect(parseADT_A08_v24(withPda).val!.deathAndAutopsy).toBeTruthy();
  expect(parseADT_A18([MSH_LINE("ADT", "A18"), "SFT|x", "EVN|A18", "PID|1", "MRG|OLD", "PV1|1|I"].join("\r")).val!.software).toHaveLength(1);
});

test("v2.5 SRR and MDM wrappers use the v2.5 bases (repeating ERR, TQ1; SFT)", () => {
  const srr = createSRR_S02(new MSH().messageType({ messageCode: "SRR", triggerEvent: "S02" }), new MSA().acknowledgmentCode("AA"), { errors: [new ERR(), new ERR()] }).encode();
  expect(parseSRR_S02(srr).val!.errors).toHaveLength(2);
  expect(parseSRR_S02([MSH_LINE("SRR", "S02"), "MSA|AA|1", "SCH|1", "TQ1|1", "RGS|1"].join("\r")).val!.schedule!.timings).toHaveLength(1);
  const mdm = parseMDM_T03([MSH_LINE("MDM", "T03"), "SFT|x", "EVN|T03", "PID|1", "PV1|1|I", "ORC|NW", "OBR|1", "TXA|1"].join("\r"));
  expect(mdm.ok).toBe(true);
  expect(mdm.val!.software).toHaveLength(1);
  expect(mdm.val!.orders).toHaveLength(1);
});
