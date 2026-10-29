/** The pharmacy order flow of HL7 v2.3: RDO/RRO (order), RDE/RRE (encoded order), RDS/RRD (dispense), RGV/RRG (give), RAS/RRA (administration). */
import { describe, test, expect } from "vitest";
import { createRDO_O01, RDO_O01 } from "./RDO_O01.ts";
import { createRRO_O02 } from "./RRO_O02.ts";
import { createRDE_O01, RDE_O01 } from "./RDE_O01.ts";
import { createRRE_O02 } from "./RRE_O02.ts";
import { createRDS_O01, RDS_O01 } from "./RDS_O01.ts";
import { createRRD_O02 } from "./RRD_O02.ts";
import { createRGV_O01, RGV_O01 } from "./RGV_O01.ts";
import { createRRG_O02 } from "./RRG_O02.ts";
import { createRAS_O02, RAS_O02 } from "./RAS_O02.ts";
import { createRRA_O02 } from "./RRA_O02.ts";
import { parseRDO_O01 } from "./RDO_O01.ts";
import { parseRRO_O02 } from "./RRO_O02.ts";
import { parseRDE_O01 } from "./RDE_O01.ts";
import { parseRRE_O02 } from "./RRE_O02.ts";
import { parseRDS_O01 } from "./RDS_O01.ts";
import { parseRRD_O02 } from "./RRD_O02.ts";
import { parseRGV_O01 } from "./RGV_O01.ts";
import { parseRRG_O02 } from "./RRG_O02.ts";
import { parseRAS_O02 } from "./RAS_O02.ts";
import { parseRRA_O02 } from "./RRA_O02.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PV1 } from "./PV1.ts";
import { AL1 } from "./AL1.ts";
import { IN1 } from "./IN1.ts";
import { ORC } from "./ORC.ts";
import { RXO } from "./RXO.ts";
import { RXE } from "./RXE.ts";
import { RXD } from "./RXD.ts";
import { RXG } from "./RXG.ts";
import { RXA } from "./RXA.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { OBX } from "./OBX.ts";
import { CTI } from "./CTI.ts";
import { BLG } from "./BLG.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("P1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("P1");
const orc = (control: string) => new ORC().orderControl(control);
const rxr = () => new RXR().route({ code: "PO" });
const nte = (text: string) => new NTE().comment(text);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("RDO_O01 / RRO_O02 (v2.3)", () => {
  test("the order detail is RXO [{NTE}] {RXR} [ {RXC} [{NTE}] ] [{ OBX [{NTE}] }]", () => {
    const msg = createRDO_O01(msh("RDO", "O01"), [
      {
        commonOrder: orc("NW"),
        detail: { pharmacyOrder: new RXO(), notes: [nte("rxo note")], routes: [rxr()], components: [new RXC(), new RXC()], componentNotes: [nte("rxc note")], observations: [{ observation: new OBX().setId("1") }] },
        billing: new BLG(),
      },
      { commonOrder: orc("HD") },
    ], { notes: [nte("header")], patient: new PID().setId("1"), patientDemographics: new PD1(), visit: new PV1(), insurances: [{ insurance: new IN1().setId("1") }], allergies: [new AL1()] });
    expect(msg).toBeInstanceOf(RDO_O01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "NTE", "PID", "PD1", "PV1", "IN1", "AL1", "ORC", "RXO", "NTE", "RXR", "RXC", "RXC", "NTE", "OBX", "BLG", "ORC"]);
    const parsed = parseRDO_O01(wire).val!;
    expect(parsed.orders).toHaveLength(2);
    expect(parsed.orders[0].detail!.components).toHaveLength(2);
    expect(parsed.orders[0].detail!.componentNotes).toHaveLength(1);
    expect(parsed.orders[0].detail!.observations).toHaveLength(1);
    expect(parsed.orders[1].detail).toBeUndefined();
    expect(parsed.message.encode()).toBe(wire);
    // @ts-expect-error the routes are required once a detail is present
    expect(createRDO_O01(msh("RDO", "O01"), [{ commonOrder: orc("NW"), detail: { pharmacyOrder: new RXO() } }]).verify().errors).toEqual(["ORDER group 1: ORDER DETAIL group 1: At least one RXR segment is required"]);
  });

  test("RRO^O02 echoes the order detail with notes for the RXO and the RXCs", () => {
    const wire = createRRO_O02(msh("RRO", "O02"), msa(), { patient: new PID().setId("1"), orders: [{ commonOrder: orc("OK"), detail: { pharmacyOrder: new RXO(), routes: [rxr()], components: [new RXC()], componentNotes: [nte("c")] } }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "PID", "ORC", "RXO", "RXR", "RXC", "NTE"]);
    const parsed = parseRRO_O02(wire).val!;
    expect(parsed.orders![0].detail!.componentNotes).toHaveLength(1);
    expect(parsed.orders![0].detail!.notes).toEqual([]);
    expect(parsed.message.encode()).toBe(wire);
  });
});

describe("RDE_O01 / RRE_O02 (v2.3)", () => {
  test("each order carries the RXE, its routes and components, and observations whose OBX is optional", () => {
    const msg = createRDE_O01(msh("RDE", "O01"), [
      {
        commonOrder: orc("NW"),
        detail: { pharmacyOrder: new RXO(), routes: [rxr()] },
        encodedOrder: new RXE().giveCode({ code: "AMOX" }),
        routes: [rxr(), new RXR().route({ code: "IV" })],
        components: [new RXC()],
        observations: [{ observation: new OBX().setId("1") }, { notes: [nte("pending")] }],
        clinicalTrials: [new CTI()],
      },
    ], { patient: new PID().setId("1") });
    expect(msg).toBeInstanceOf(RDE_O01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "ORC", "RXO", "RXR", "RXE", "RXR", "RXR", "RXC", "OBX", "NTE", "CTI"]);
    const parsed = parseRDE_O01(wire).val!;
    expect(parsed.orders[0].encodedOrder.name).toBe("RXE");
    expect(parsed.orders[0].routes).toHaveLength(2);
    expect(parsed.orders[0].detail!.routes).toHaveLength(1);
    // The NTE after the OBX belongs to that observation.
    expect(parsed.orders[0].observations).toHaveLength(1);
    expect(parsed.orders[0].observations[0].notes).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
    // @ts-expect-error RXE and routes are required
    expect(createRDE_O01(msh("RDE", "O01"), [{ commonOrder: orc("NW"), observations: [] }]).verify().errors).toEqual(["ORDER group 1: RXE segment is required", "ORDER group 1: At least one RXR segment is required"]);
  });

  test("RRE^O02 inlines the ENCODING group", () => {
    const wire = createRRE_O02(msh("RRE", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), encodedOrder: new RXE(), routes: [rxr()] }, { commonOrder: orc("OK") }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ORC", "RXE", "RXR", "ORC"]);
    const parsed = parseRRE_O02(wire).val!;
    expect(parsed.orders![0].encodedOrder!.name).toBe("RXE");
    expect(parsed.orders![1].encodedOrder).toBeUndefined();
    expect(parsed.orders![1].routes).toEqual([]);
    expect(createRRE_O02(msh("RRE", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), encodedOrder: new RXE() }] }).verify().errors).toEqual(["ORDER group 1: At least one RXR segment is required"]);
  });
});

describe("RDS_O01 / RRD_O02 (v2.3)", () => {
  test("the dispense follows an optional RXO supplement and an optional encoding", () => {
    const msg = createRDS_O01(msh("RDS", "O01"), [
      {
        commonOrder: orc("RE"),
        detail: { pharmacyOrder: new RXO(), notes: [nte("supplement")], routes: [rxr()], components: [new RXC()] },
        encoding: { encodedOrder: new RXE(), routes: [rxr()] },
        dispense: new RXD().dispenseSubIdCounter("1"),
        routes: [rxr()],
        observations: [{ observation: new OBX().setId("1"), notes: [nte("obx")] }],
      },
    ], { patient: new PID().setId("1"), allergies: [new AL1()], visit: new PV1() });
    expect(msg).toBeInstanceOf(RDS_O01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "AL1", "PV1", "ORC", "RXO", "NTE", "RXR", "RXC", "RXE", "RXR", "RXD", "RXR", "OBX", "NTE"]);
    const parsed = parseRDS_O01(wire).val!;
    expect(parsed.orders[0].detail!.notes).toHaveLength(1);
    expect(parsed.orders[0].encoding!.encodedOrder.name).toBe("RXE");
    expect(parsed.orders[0].dispense.name).toBe("RXD");
    expect(parsed.message.encode()).toBe(wire);
    // The supplement's NTE is required once the supplement is present, and so is at least one observation.
    expect(createRDS_O01(msh("RDS", "O01"), [{ commonOrder: orc("RE"), detail: { pharmacyOrder: new RXO(), routes: [rxr()] }, dispense: new RXD(), routes: [rxr()], observations: [] }]).verify().errors).toEqual([
      "ORDER group 1: ORDER DETAIL group 1: At least one NTE segment is required",
      "ORDER group 1: At least one OBSERVATION group (OBX) is required",
    ]);
  });

  test("RRD^O02 inlines the DISPENSE group", () => {
    const wire = createRRD_O02(msh("RRD", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), dispense: new RXD(), routes: [rxr()], components: [new RXC()] }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ORC", "RXD", "RXR", "RXC"]);
    expect(parseRRD_O02(wire).val!.orders![0].components).toHaveLength(1);
  });
});

describe("RGV_O01 / RRG_O02 (v2.3)", () => {
  test("each order carries GIVE groups", () => {
    const msg = createRGV_O01(msh("RGV", "O01"), [
      {
        commonOrder: orc("RE"),
        encoding: { encodedOrder: new RXE(), routes: [rxr()] },
        gives: [
          { give: new RXG().giveSubIdCounter("1"), routes: [rxr()], observations: [{ observation: new OBX().setId("1") }] },
          { give: new RXG().giveSubIdCounter("2"), routes: [rxr()], components: [new RXC()], observations: [] },
        ],
      },
    ], { patient: new PID().setId("1") });
    expect(msg).toBeInstanceOf(RGV_O01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "ORC", "RXE", "RXR", "RXG", "RXR", "OBX", "RXG", "RXR", "RXC"]);
    const parsed = parseRGV_O01(wire).val!;
    expect(parsed.orders[0].gives).toHaveLength(2);
    expect(parsed.orders[0].gives[1].components).toHaveLength(1);
    expect(parsed.message.encode()).toBe(wire);
    // RGV's patient has no PD1.
    // @ts-expect-error PD1 is not part of RGV
    expect(createRGV_O01(msh("RGV", "O01"), [{ commonOrder: orc("RE"), gives: [] }], { patient: new PID(), patientDemographics: new PD1() }).verify().errors).toEqual(['Unknown property "patientDemographics"', "ORDER group 1: At least one GIVE group (RXG) is required"]);
  });

  test("RRG^O02 inlines the GIVE group", () => {
    const wire = createRRG_O02(msh("RRG", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), give: new RXG(), routes: [rxr()] }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ORC", "RXG", "RXR"]);
    expect(parseRRG_O02(wire).val!.orders![0].give!.name).toBe("RXG");
  });
});

describe("RAS_O02 / RRA_O02 (v2.3)", () => {
  test("each order carries the administrations and one route", () => {
    const msg = createRAS_O02(msh("RAS", "O02"), [
      {
        commonOrder: orc("RE"),
        administrations: [new RXA().giveSubIdCounter("1").administrationSubIdCounter("1"), new RXA().giveSubIdCounter("1").administrationSubIdCounter("2")],
        route: rxr(),
        observations: [{ observation: new OBX().setId("1") }],
        clinicalTrials: [new CTI()],
      },
    ], { patient: new PID().setId("1"), patientDemographics: new PD1() });
    expect(msg).toBeInstanceOf(RAS_O02);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "PID", "PD1", "ORC", "RXA", "RXA", "RXR", "OBX", "CTI"]);
    const parsed = parseRAS_O02(wire).val!;
    expect(parsed.orders[0].administrations).toHaveLength(2);
    expect(parsed.orders[0].route.name).toBe("RXR");
    expect(parsed.message.encode()).toBe(wire);
    // @ts-expect-error administrations and the route are required
    expect(createRAS_O02(msh("RAS", "O02"), [{ commonOrder: orc("RE") }]).verify().errors).toEqual(["ORDER group 1: At least one RXA segment is required", "ORDER group 1: RXR segment is required"]);
  });

  test("RRA^O02 inlines the ADMINISTRATION group", () => {
    const wire = createRRA_O02(msh("RRA", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), administrations: [new RXA()], route: rxr() }] }).encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "ORC", "RXA", "RXR"]);
    expect(parseRRA_O02(wire).val!.orders![0].administrations).toHaveLength(1);
    expect(createRRA_O02(msh("RRA", "O02"), msa(), { orders: [{ commonOrder: orc("OK"), administrations: [new RXA()] }] }).verify().errors).toEqual(["ORDER group 1: RXR segment is required"]);
  });
});
