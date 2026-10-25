/** The v2.4 renumbering of the order and pharmacy messages: RDE^O11, RDS^O13 (FT1), OMS^O05/OMN^O07 (RQD required), OMD^O03 (optional diet observations), ORU^W01 (own shape). */
import { describe, test, expect } from "vitest";
import { createRDE_O11 } from "./RDE_O11.ts";
import { createRDS_O13 } from "./RDS_O13.ts";
import { createOMS_O05 } from "./OMS_O05.ts";
import { createOMD_O03 } from "./OMD_O03.ts";
import { createORU_W01, ORU_W01 } from "./ORU_W01.ts";
import { ORU_R01 } from "./ORU_R01.ts";
import { parseRDE_O11 } from "../../parsers/v2.4/RDE_O11_Parser.ts";
import { parseRDS_O13 } from "../../parsers/v2.4/RDS_O13_Parser.ts";
import { parseORU_W01 } from "../../parsers/v2.4/ORU_W01_Parser.ts";
import { parseRDE_O01 } from "../../parsers/v2.3/RDE_O01_Parser.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { NK1 } from "../../segments/v2.4/NK1.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { RXE } from "../../segments/v2.4/RXE.ts";
import { RXD } from "../../segments/v2.4/RXD.ts";
import { RXR } from "../../segments/v2.4/RXR.ts";
import { RQD } from "../../segments/v2.4/RQD.ts";
import { RQ1 } from "../../segments/v2.4/RQ1.ts";
import { ODS } from "../../segments/v2.4/ODS.ts";
import { OBR } from "../../segments/v2.4/OBR.ts";
import { CTD } from "../../segments/v2.4/CTD.ts";
import { FT1 } from "../../segments/v2.4/FT1.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("P1");
const orc = () => new ORC().orderControl("NW");
const rxr = () => new RXR().route({ code: "PO" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("orders and pharmacy (v2.4)", () => {
  test("RDE^O11 is the v2.3 RDE^O01 with optional observations; the O01 name is withdrawn", () => {
    const wire = createRDE_O11(msh("RDE", "O11"), [{ commonOrder: orc(), encodedOrder: new RXE(), routes: [rxr()] }]).encode();
    expect(names(wire)).toEqual(["MSH", "ORC", "RXE", "RXR"]);
    expect(parseRDE_O11(wire).val!.orders[0].observations).toEqual([]);
    // The same wire still parses as a v2.3 RDE^O01 (whose observation group has no required child).
    expect(parseRDE_O01(wire).ok).toBe(true);
  });

  test("RDS^O13 closes the order with FT1s", () => {
    const wire = createRDS_O13(msh("RDS", "O13"), [{ commonOrder: orc(), dispense: new RXD(), routes: [rxr()], transactions: [new FT1(), new FT1()] }]).encode();
    expect(names(wire)).toEqual(["MSH", "ORC", "RXD", "RXR", "FT1", "FT1"]);
    expect(parseRDS_O13(wire).val!.orders[0].transactions).toHaveLength(2);
  });

  test("OMS^O05 requires the RQD and allows RQ1; OMD^O03 diet observations are optional", () => {
    // @ts-expect-error RQD is required in v2.4
    expect(createOMS_O05(msh("OMS", "O05"), [{ commonOrder: orc() }]).verify().errors).toEqual(["ORDER group 1: RQD segment is required"]);
    expect(names(createOMS_O05(msh("OMS", "O05"), [{ commonOrder: orc(), requisition: new RQD(), requisitionSupplier: new RQ1() }]).encode())).toEqual(["MSH", "ORC", "RQD", "RQ1"]);
    expect(createOMD_O03(msh("OMD", "O03"), [{ commonOrder: orc(), diets: [new ODS()] }]).verify().errors).toEqual([]);
  });

  test("ORU^W01 has its own shape: NK1, CTD, FT1 and an optional OBX per observation", () => {
    const msg = createORU_W01(msh("ORU", "W01"), [{
      patient: new PID().setId("1"),
      nextOfKin: [new NK1()],
      orderObservations: [{ observationRequest: new OBR().setId("1"), contact: new CTD(), observations: [], transactions: [new FT1()] }],
    }]);
    expect(msg).toBeInstanceOf(ORU_W01);
    expect(msg).not.toBeInstanceOf(ORU_R01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "NK1", "OBR", "CTD", "FT1"]);
    const parsed = parseORU_W01(wire).val!;
    expect(parsed.patientResults[0].nextOfKin).toHaveLength(1);
    expect(parsed.patientResults[0].orderObservations[0].contact!.name).toBe("CTD");
    expect(parsed.message.encode()).toBe(wire);
  });
});
