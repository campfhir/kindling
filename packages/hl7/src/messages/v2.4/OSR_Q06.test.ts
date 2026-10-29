/** OSR^Q06 (v2.4): the order detail (OBR|RQD|RQ1|RXO|ODS|ODT) is required from v2.4 on; v2.3 keeps it optional. */
import { describe, test, expect } from "vitest";
import { createOSR_Q06 } from "./OSR_Q06.ts";
import { createOSR_Q06 as createOSR_Q06_v23 } from "../v2.3/OSR_Q06.ts";
import { parseOSR_Q06 } from "../v2.4/OSR_Q06.ts";
import { parseOSR_Q06 as parseOSR_Q06_v23 } from "../v2.3/OSR_Q06.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { OBR } from "../../segments/v2.4/OBR.ts";

const msh = () => new MSH().messageType({ messageCode: "OSR", triggerEvent: "Q06" }).messageControlId("O1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("OSR_Q06 (v2.4)", () => {
  test("an order without a detail segment fails verification in v2.4 but not in v2.3", () => {
    const orders = [{ commonOrder: new ORC().orderControl("SC") }];
    // @ts-expect-error the detail segment is required in v2.4
    const errors = createOSR_Q06(msh(), msa(), qrd(), { orders }).verify().errors;
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/ORDER group 1.*OBR/);
    expect(createOSR_Q06_v23(msh(), msa(), qrd(), { orders }).verify().errors).toEqual([]);

    const wire = createOSR_Q06(msh(), msa(), qrd(), { orders: [{ commonOrder: new ORC().orderControl("SC"), segment: new OBR().setId("1") }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "ORC", "OBR"]);
    expect(parseOSR_Q06(wire).val!.orders![0].segment.name).toBe("OBR");
    expect(parseOSR_Q06(wire).val!.message.encode()).toBe(wire);
  });

  test("the parser rejects a bare ORC in v2.4 and accepts it in v2.3", () => {
    const wire = [msh().encode(), "MSA|AA|Q1", "QRD|||R|I|Q1", "ORC|SC"].join("\r");
    expect(parseOSR_Q06(wire).ok).toBe(false);
    expect(parseOSR_Q06(wire).err!.message).toContain("OSR_Q06");
    expect(parseOSR_Q06_v23(wire).val!.orders![0].segment).toBeUndefined();
  });
});
