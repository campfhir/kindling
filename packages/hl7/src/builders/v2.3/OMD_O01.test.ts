/** Diet (OMD/ORD) and supply (OMS/ORS, OMN/ORN) orders of HL7 v2.3, plus the pharmacy queries QRY^Q26–Q30 and their responses, and ORU^W01. */
import { describe, test, expect } from "vitest";
import { createOMD_O01, OMD_O01 } from "./OMD_O01.ts";
import { createORD_O02 } from "./ORD_O02.ts";
import { createOMS_O01, OMS_O01 } from "./OMS_O01.ts";
import { createOMN_O01, OMN_O01 } from "./OMN_O01.ts";
import { createORS_O02 } from "./ORS_O02.ts";
import { createORN_O02 } from "./ORN_O02.ts";
import { createQRY_Q26, QRY_Q26 } from "./QRY_Q26.ts";
import { createQRY_Q30 } from "./QRY_Q30.ts";
import { createROR_ROR } from "./ROR_ROR.ts";
import { createRAR_RAR } from "./RAR_RAR.ts";
import { createRDR_RDR } from "./RDR_RDR.ts";
import { createRER_RER } from "./RER_RER.ts";
import { createRGR_RGR } from "./RGR_RGR.ts";
import { createORU_W01 } from "./ORU_W01.ts";
import { ORU_R01 } from "./ORU_R01.ts";
import { parseOMD_O01 } from "../../parsers/v2.3/OMD_O01_Parser.ts";
import { parseORD_O02 } from "../../parsers/v2.3/ORD_O02_Parser.ts";
import { parseOMS_O01 } from "../../parsers/v2.3/OMS_O01_Parser.ts";
import { parseOMN_O01 } from "../../parsers/v2.3/OMN_O01_Parser.ts";
import { parseORN_O02 } from "../../parsers/v2.3/ORN_O02_Parser.ts";
import { parseRAR_RAR } from "../../parsers/v2.3/RAR_RAR_Parser.ts";
import { parseRDR_RDR } from "../../parsers/v2.3/RDR_RDR_Parser.ts";
import { parseRGR_RGR } from "../../parsers/v2.3/RGR_RGR_Parser.ts";
import { parseORU_W01, ORU_W01_Parser } from "../../parsers/v2.3/ORU_W01_Parser.ts";
import { ORU_R01_Parser } from "../../parsers/v2.3/ORU_R01_Parser.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { ODS } from "../../segments/v2.3/ODS.ts";
import { ODT } from "../../segments/v2.3/ODT.ts";
import { RQD } from "../../segments/v2.3/RQD.ts";
import { RQ1 } from "../../segments/v2.3/RQ1.ts";
import { BLG } from "../../segments/v2.3/BLG.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { OBR } from "../../segments/v2.3/OBR.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { RXO } from "../../segments/v2.3/RXO.ts";
import { RXE } from "../../segments/v2.3/RXE.ts";
import { RXD } from "../../segments/v2.3/RXD.ts";
import { RXG } from "../../segments/v2.3/RXG.ts";
import { RXA } from "../../segments/v2.3/RXA.ts";
import { RXR } from "../../segments/v2.3/RXR.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("O1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("O1");
const orc = (control: string) => new ORC().orderControl(control);
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1").whatSubjectFilter({ code: "RAR" });
const rxr = () => new RXR().route({ code: "PO" });
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("OMD_O01 / ORD_O02 (v2.3)", () => {
  test("diet orders carry ODS lists with required observations; tray orders carry ODTs", () => {
    const msg = createOMD_O01(msh("OMD", "O01"), [
      { commonOrder: orc("NW"), diets: [new ODS().type("D"), new ODS().type("S")], notes: [new NTE().comment("low salt")], observations: [{ observation: new OBX().setId("1") }] },
      { commonOrder: orc("HD") },
    ], { patient: new PID().setId("1"), trayOrders: [{ commonOrder: orc("NW"), dietTrays: [new ODT().trayType({ identifier: "EARLY" })] }] });
    expect(msg).toBeInstanceOf(OMD_O01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "ORC", "ODS", "ODS", "NTE", "OBX", "ORC", "ORC", "ODT"]);
    const parsed = parseOMD_O01(wire).val!;
    expect(parsed.dietOrders).toHaveLength(2);
    expect(parsed.dietOrders[0].diets).toHaveLength(2);
    expect(parsed.dietOrders[1].diets).toEqual([]);
    expect(parsed.trayOrders).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
    // In v2.3 the diet's observations are required once a diet is present.
    expect(createOMD_O01(msh("OMD", "O01"), [{ commonOrder: orc("NW"), diets: [new ODS()] }]).verify().errors).toEqual(["ORDER DIET group 1: At least one OBSERVATION group (OBX) is required"]);
  });

  test("ORD^O02 acknowledges diet and tray orders", () => {
    const wire = createORD_O02(msh("ORD", "O02"), msa(), { dietOrders: [{ commonOrder: orc("OK"), diets: [new ODS()] }], trayOrders: [{ commonOrder: orc("OK"), dietTrays: [new ODT()] }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ORC", "ODS", "ORC", "ODT"]);
    const parsed = parseORD_O02(wire).val!;
    expect(parsed.dietOrders).toHaveLength(1);
    expect(parsed.trayOrders).toHaveLength(1);
    // A tray order without ODT is indistinguishable from a diet order on the wire.
    expect(parseORD_O02([msh("ORD", "O02").encode(), "MSA|AA|O1", "ORC|OK", "ORC|OK"].join("\r")).val!.dietOrders).toHaveLength(2);
  });
});

describe("OMS/ORS and OMN/ORN (v2.3)", () => {
  test("stock requisitions carry RQD; nonstock ones may add RQ1", () => {
    const oms = createOMS_O01(msh("OMS", "O01"), [{ commonOrder: orc("NW"), requisition: new RQD().requisitionLineNumber("1"), notes: [new NTE()], observations: [{ observation: new OBX().setId("1") }], billing: new BLG() }]);
    expect(oms).toBeInstanceOf(OMS_O01);
    expect(names(oms.encode())).toEqual(["MSH", "ORC", "RQD", "NTE", "OBX", "BLG"]);
    expect(parseOMS_O01(oms.encode()).val!.orders[0].requisition!.name).toBe("RQD");
    // @ts-expect-error RQ1 is not part of OMS
    expect(createOMS_O01(msh("OMS", "O01"), [{ commonOrder: orc("NW"), requisition: new RQD(), requisitionSupplier: new RQ1() }]).verify().errors).toEqual(['ORDER group 1: Unknown property "requisitionSupplier"']);

    const omn = createOMN_O01(msh("OMN", "O01"), [{ commonOrder: orc("NW"), requisition: new RQD(), requisitionSupplier: new RQ1() }], { patient: new PID().setId("1") });
    expect(omn).toBeInstanceOf(OMN_O01);
    expect(names(omn.encode())).toEqual(["MSH", "PID", "ORC", "RQD", "RQ1"]);
    expect(parseOMN_O01(omn.encode()).val!.orders[0].requisitionSupplier!.name).toBe("RQ1");
  });

  test("ORS/ORN require the RQD of each order", () => {
    const ors = createORS_O02(msh("ORS", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), requisition: new RQD() }] }).encode();
    expect(names(ors)).toEqual(["MSH", "MSA", "ORC", "RQD"]);
    const orn = createORN_O02(msh("ORN", "O02"), msa(), { patient: new PID(), orders: [{ commonOrder: orc("OK"), requisition: new RQD(), requisitionSupplier: new RQ1(), notes: [new NTE()] }] }).encode();
    expect(names(orn)).toEqual(["MSH", "MSA", "PID", "ORC", "RQD", "RQ1", "NTE"]);
    expect(parseORN_O02(orn).val!.orders![0].requisitionSupplier!.name).toBe("RQ1");
    // @ts-expect-error RQD is required
    expect(createORN_O02(msh("ORN", "O02"), msa(), { orders: [{ commonOrder: orc("OK") }] }).verify().errors).toEqual(["ORDER group 1: RQD segment is required"]);
  });
});

describe("pharmacy queries (v2.3)", () => {
  test("QRY^Q26–Q30 share one structure", () => {
    expect(createQRY_Q26(msh("QRY", "Q26"), qrd())).toBeInstanceOf(QRY_Q26);
    expect(createQRY_Q30(msh("QRY", "Q30"), qrd(), { continuation: new DSC() })).toBeInstanceOf(QRY_Q26);
    expect(names(createQRY_Q30(msh("QRY", "Q30"), qrd(), { continuation: new DSC() }).encode())).toEqual(["MSH", "QRD", "DSC"]);
  });

  test("the responses carry one DEFINITION per query with the orders of its kind", () => {
    const ror = createROR_ROR(msh("ROR", "ROR"), msa(), [{ query: qrd(), orders: [{ commonOrder: orc("RE"), pharmacyOrder: new RXO(), routes: [rxr()] }] }]).encode();
    expect(names(ror)).toEqual(["MSH", "MSA", "QRD", "ORC", "RXO", "RXR"]);

    const rar = createRAR_RAR(msh("RAR", "RAR"), msa(), [
      { query: qrd(), patient: new PID().setId("1"), orders: [{ commonOrder: orc("RE"), encoding: { encodedOrder: new RXE(), routes: [rxr()] }, administrations: [new RXA(), new RXA()], route: rxr() }] },
      { query: qrd(), orders: [{ commonOrder: orc("RE"), administrations: [new RXA()], route: rxr() }] },
    ], { continuation: new DSC() }).encode();
    expect(names(rar)).toEqual(["MSH", "MSA", "QRD", "PID", "ORC", "RXE", "RXR", "RXA", "RXA", "RXR", "QRD", "ORC", "RXA", "RXR", "DSC"]);
    const parsed = parseRAR_RAR(rar).val!;
    expect(parsed.definitions).toHaveLength(2);
    expect(parsed.definitions[0].orders[0].encoding!.encodedOrder.name).toBe("RXE");
    expect(parsed.definitions[0].orders[0].administrations).toHaveLength(2);
    expect(parsed.definitions[1].patient).toBeUndefined();
    expect(parsed.message.encode()).toBe(rar);

    const rdr = createRDR_RDR(msh("RDR", "RDR"), msa(), [{ query: qrd(), orders: [{ commonOrder: orc("RE"), dispenses: [{ dispense: new RXD(), routes: [rxr()] }, { dispense: new RXD(), routes: [rxr()] }] }] }]).encode();
    expect(names(rdr)).toEqual(["MSH", "MSA", "QRD", "ORC", "RXD", "RXR", "RXD", "RXR"]);
    expect(parseRDR_RDR(rdr).val!.definitions[0].orders[0].dispenses).toHaveLength(2);

    const rer = createRER_RER(msh("RER", "RER"), msa(), [{ query: qrd(), orders: [{ commonOrder: orc("RE"), encodedOrder: new RXE(), routes: [rxr()] }] }]).encode();
    expect(names(rer)).toEqual(["MSH", "MSA", "QRD", "ORC", "RXE", "RXR"]);

    const rgr = createRGR_RGR(msh("RGR", "RGR"), msa(), [{ query: qrd(), orders: [{ commonOrder: orc("RE"), gives: [new RXG(), new RXG()], routes: [rxr()] }] }]).encode();
    expect(names(rgr)).toEqual(["MSH", "MSA", "QRD", "ORC", "RXG", "RXG", "RXR"]);
    expect(parseRGR_RGR(rgr).val!.definitions[0].orders[0].gives).toHaveLength(2);
    // @ts-expect-error a definition needs its query and at least one order
    expect(createRGR_RGR(msh("RGR", "RGR"), msa(), [{ orders: [] }]).verify().errors).toEqual(["DEFINITION group 1: QRD segment is required", "DEFINITION group 1: At least one ORDER group (ORC) is required"]);
  });
});

describe("ORU_W01 (v2.3)", () => {
  test("wraps ORU^R01", () => {
    const msg = createORU_W01(msh("ORU", "W01"), [{ patient: new PID().setId("1"), orderObservations: [{ observationRequest: new OBR().setId("1"), observations: [{ observation: new OBX().setId("1").valueType("NA") }] }] }]);
    expect(msg).toBeInstanceOf(ORU_R01);
    expect(names(msg.encode())).toEqual(["MSH", "PID", "OBR", "OBX"]);
    expect(ORU_W01_Parser.prototype).toBeInstanceOf(ORU_R01_Parser);
    expect(parseORU_W01(msg.encode()).val!.patientResults[0].orderObservations[0].observations![0].observation.name).toBe("OBX");
    expect(parseORU_W01(msh("ORU", "W01").encode()).err!.message).toBe("ORU_W01 message must contain at least one PID/ORC/OBR segment");
  });
});
