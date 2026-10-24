import { test, expect } from "vitest";
import { createADT_A20, ADT_A20 } from "./ADT_A20.ts";
import { parseADT_A20 } from "../../parsers/v2.3/ADT_A20_Parser.ts";
import { parseADT_A20 as parseADT_A20_v251 } from "../../parsers/v2.5.1/ADT_A20_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { NPU } from "../../segments/v2.3/NPU.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = () => new MSH().sendingApplication("ADT").messageType({ messageCode: "ADT", triggerEvent: "A20" });

test("ADT_A20 encodes MSH EVN NPU and round-trips through v2.3 and v2.5.1", () => {
  const wire = createADT_A20(msh(), new EVN().eventTypeCode("A20"), new NPU().bedStatus("C")).encode();
  expect(wire.split("\r").map((s) => s.slice(0, 3))).toEqual(["MSH", "EVN", "NPU"]);
  for (const parse of [parseADT_A20, parseADT_A20_v251]) {
    const result = parse(wire);
    expect(result.ok).toBe(true);
    expect(ParserUtils.getComponent(result.val!.npu.fields[1], 0)).toBe("C");
    expect(result.val!.message.encode()).toBe(wire);
  }
});

test("verify() and the parser require EVN and NPU", () => {
  expect(new ADT_A20(null as any, null as any, null as any).verify().errors).toEqual(["MSH segment is required", "EVN segment is required", "NPU segment is required"]);
  const MSH_LINE = "MSH|^~\\&|ADT|HOSP|BED|HOSP|20231015120000||ADT^A20^ADT_A20|MSG001|P|2.3";
  expect(parseADT_A20([MSH_LINE, "EVN|A20"].join("\r")).err!.message).toMatch(/ADT_A20 message must contain an NPU segment/);
  expect(parseADT_A20([MSH_LINE, "NPU|WEST^101^1|C"].join("\r")).err!.message).toMatch(/NPU segment at line 2 must follow the EVN segment/);
  expect(parseADT_A20([MSH_LINE, "EVN|A20", "NPU|WEST^101^1|C", "NPU|WEST^102^1|O"].join("\r")).err!.message).toMatch(/NPU segment at line 4 appears more than once/);
});
