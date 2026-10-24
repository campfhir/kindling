import { test, expect } from "vitest";
import { createDFT_P03 } from "./DFT_P03.ts";
import { parseDFT_P03 } from "../../parsers/v2.4/DFT_P03_Parser.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { OBR } from "../../segments/v2.4/OBR.ts";
import { OBX } from "../../segments/v2.4/OBX.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { FT1 } from "../../segments/v2.4/FT1.ts";

const MSH_LINE = "MSH|^~\\&|BILL|HOSP|AR|HOSP|20231015120000||DFT^P03^DFT_P03|MSG001|P|2.4";

test("DFT_P03 (v2.4): order groups without timing, no FT1 note, no SFT", () => {
  const msh = new MSH().sendingApplication("BILL").messageType({ messageCode: "DFT", triggerEvent: "P03" });
  const wire = createDFT_P03(msh, new EVN().eventTypeCode("P03"), new PID().setId("1"), [
    { ft1: new FT1().setId("1"), orders: [{ orc: new ORC().orderControl("NW"), obr: new OBR().setId("1"), obrNteList: [new NTE()], observations: [{ obx: new OBX().setId("1") }] }] },
  ], { rolList: [new ROL()], orders: [{ obr: new OBR().setId("2") }] }).encode();
  expect(wire.split("\r").map((s) => s.slice(0, 3))).toEqual(["MSH", "EVN", "PID", "ROL", "OBR", "FT1", "ORC", "OBR", "NTE", "OBX"]);
  const result = parseDFT_P03(wire);
  expect(result.ok).toBe(true);
  expect(result.val!.rolList).toHaveLength(1);
  expect(result.val!.orders).toHaveLength(1);
  expect(result.val!.financials[0].orders![0].obrNteList).toHaveLength(1);
  expect(result.val!.financials[0].orders![0].observations).toHaveLength(1);
  expect("timing" in result.val!.orders![0]).toBe(false);
  expect(result.val!.message.encode()).toBe(wire);
  // No NTE directly after FT1 in v2.4.
  const bad = parseDFT_P03([MSH_LINE, "EVN|P03", "PID|1", "FT1|1", "NTE|1"].join("\r"));
  expect(bad.ok).toBe(false);
  expect(bad.err!.message).toMatch(/NTE segment at line 5 is not allowed at this position in DFT_P03/);
});
