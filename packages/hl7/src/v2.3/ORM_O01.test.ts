import { describe, test, expect } from "vitest";
import { ORM_O01, createORM_O01, type OrderGroup } from "./ORM_O01.ts";
import { parseORM_O01 } from "./ORM_O01.ts";
import { MSH } from "./MSH.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { GT1 } from "./GT1.ts";
import { AL1 } from "./AL1.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { RQD } from "./RQD.ts";
import { RQ1 } from "./RQ1.ts";
import { RXO } from "./RXO.ts";
import { ODS } from "./ODS.ts";
import { ODT } from "./ODT.ts";
import { DG1 } from "./DG1.ts";
import { OBX } from "./OBX.ts";
import { CTI } from "./CTI.ts";
import { BLG } from "./BLG.ts";

const makeMSH = () =>
  new MSH().sendingApplication("ORDERS").messageType({ messageCode: "ORM", triggerEvent: "O01" }).messageControlId("M1");
const makeORC = (n = "ORD1") => new ORC().orderControl("NW").placerOrderNumber(n);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

function fullMessage() {
  return createORM_O01(
    makeMSH(),
    [
      {
        commonOrder: makeORC("ORD1"),
        detail: {
          segment: new OBR().setId("1").placerOrderNumber("ORD1"),
          notes: [new NTE().setId("1").comment("detail note")],
          diagnoses: [new DG1().setId("1")],
          observations: [
            { observation: new OBX().setId("1").valueType("ST"), notes: [new NTE().setId("1").comment("obx note")] },
            { observation: new OBX().setId("2").valueType("ST") },
          ],
        },
        clinicalTrials: [new CTI().sponsorStudyId({ entityIdentifier: "S1" })],
        billing: new BLG().chargeType("CH"),
      },
      { commonOrder: makeORC("ORD2"), detail: { segment: new RXO().requestedGiveCode({ code: "RX1" }) } },
    ],
    {
      notes: [new NTE().setId("1").comment("header note")],
      patient: new PID().setId("1"),
      patientDemographics: new PD1(),
      patientNotes: [new NTE().setId("1").comment("patient note")],
      visit: new PV1().patientClass("I"),
      visitDetails: new PV2(),
      insurances: [{ insurance: new IN1().setId("1"), insuranceDetails: new IN2(), insuranceCertification: new IN3() }, { insurance: new IN1().setId("2") }],
      guarantor: new GT1().setId("1"),
      allergies: [new AL1().setId("1")],
    },
  );
}

describe("ORM_O01 builder", () => {
  test("createORM_O01 returns an ORM_O01", () => {
    expect(createORM_O01(makeMSH(), [{ commonOrder: makeORC() }])).toBeInstanceOf(ORM_O01);
  });

  test("verify() requires MSH and at least one order", () => {
    const result = new ORM_O01(makeMSH(), []).verify();
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("At least one ORDER group (ORC) is required");
    expect(new ORM_O01(null as any, [{ commonOrder: makeORC() }]).verify().errors).toContain("MSH segment is required");
  });

  test("verify() checks nested required segments", () => {
    const bad = (x: any) => x as OrderGroup;
    const msg = new ORM_O01(
      makeMSH(),
      [
        bad({ commonOrder: null }),
        bad({ commonOrder: makeORC(), detail: { segment: null } }),
        bad({ commonOrder: makeORC(), detail: { segment: new OBR(), observations: [{ observation: null }] } }),
      ],
      { patientDemographics: new PD1(), visitDetails: new PV2(), insurances: [{ insurance: null }] } as any,
    );
    expect(msg.verify().errors).toEqual([
      "PID segment is required",
      "PV1 segment is required",
      "INSURANCE group 1: IN1 segment is required",
      "ORDER group 1: ORC segment is required",
      "ORDER group 2: ORDER DETAIL group 1: One of OBR, RQD, RQ1, RXO, ODS, ODT is required",
      "ORDER group 3: ORDER DETAIL group 1: OBSERVATION group 1: OBX segment is required",
    ]);
  });

  test("encode() throws when invalid", () => {
    expect(() => new ORM_O01(makeMSH(), []).encode()).toThrow(/at least one order/i);
  });

  test("a minimal message is MSH + ORC", () => {
    expect(names(createORM_O01(makeMSH(), [{ commonOrder: makeORC() }]).encode())).toEqual(["MSH", "ORC"]);
  });

  test("encodes every group in specification order", () => {
    expect(names(fullMessage().encode())).toEqual([
      "MSH", "NTE",
      "PID", "PD1", "NTE", "PV1", "PV2", "IN1", "IN2", "IN3", "IN1", "GT1", "AL1",
      "ORC", "OBR", "NTE", "DG1", "OBX", "NTE", "OBX", "CTI", "BLG",
      "ORC", "RXO",
    ]);
  });
});

describe("ORM_O01 parser", () => {
  test("round-trips a full message", () => {
    const wire = fullMessage().encode();
    const result = parseORM_O01(wire);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const { val } = result;

    expect(val.notes).toHaveLength(1);
    expect(val.patient).toBeInstanceOf(PID);
    expect(val.patientDemographics).toBeInstanceOf(PD1);
    expect(val.patientNotes).toHaveLength(1);
    expect(val.visitDetails).toBeInstanceOf(PV2);
    expect(val.insurances).toHaveLength(2);
    expect(val.insurances![0].insuranceDetails).toBeInstanceOf(IN2);
    expect(val.insurances![0].insuranceCertification).toBeInstanceOf(IN3);
    expect(val.insurances![1].insuranceDetails).toBeUndefined();
    expect(val.guarantor).toBeInstanceOf(GT1);
    expect(val.allergies).toHaveLength(1);

    expect(val.orders).toHaveLength(2);
    const first = val.orders[0];
    expect(first.detail?.segment).toBeInstanceOf(OBR);
    expect(first.detail?.notes).toHaveLength(1);
    expect(first.detail?.diagnoses).toHaveLength(1);
    expect(first.detail?.observations!.map((o) => o.notes!.length)).toEqual([1, 0]);
    expect(first.clinicalTrials).toHaveLength(1);
    expect(first.billing).toBeInstanceOf(BLG);
    expect(val.orders[1].detail?.segment).toBeInstanceOf(RXO);

    // every segment survives into the message container
    expect(val.message.segments).toHaveLength(wire.split("\r").length);
  });

  test.each([
    ["OBR", () => new OBR().setId("1")],
    ["RQD", () => new RQD().requisitionLineNumber("1")],
    ["RQ1", () => new RQ1().anticipatedPrice("9.99")],
    ["RXO", () => new RXO().requestedGiveCode({ code: "RX" })],
    ["ODS", () => new ODS().type("D")],
    ["ODT", () => new ODT().textInstruction("none")],
  ] as const)("accepts %s as the order detail segment", (name, make) => {
    const wire = createORM_O01(makeMSH(), [{ commonOrder: makeORC(), detail: { segment: make() } }]).encode();
    const result = parseORM_O01(wire);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.val.orders[0].detail?.segment.name).toBe(name);
  });

  test("the patient group is optional", () => {
    const result = parseORM_O01(createORM_O01(makeMSH(), [{ commonOrder: makeORC() }]).encode());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.val.patient).toBeUndefined();
  });

  test("an order detail segment is optional (control messages)", () => {
    const result = parseORM_O01([makeMSH().encode(), "ORC|HD|ORD1"].join("\r"));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.val.orders[0].detail).toBeUndefined();
  });

  test("an NTE after OBX attaches to that OBX, not the order detail", () => {
    const result = parseORM_O01(
      [makeMSH().encode(), "ORC|NW|1", "OBR|1", "OBX|1|ST", "NTE|1||x"].join("\r"),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.val.orders[0].detail?.notes).toHaveLength(0);
    expect(result.val.orders[0].detail?.observations![0].notes).toHaveLength(1);
  });

  const msh = () => makeMSH().encode();
  test.each([
    ["empty", ""],
    ["no MSH first", "ORC|NW|1"],
    ["no ORC", [msh(), "PID|1"].join("\r")],
    ["detail without ORC", [msh(), "OBR|1"].join("\r")],
    ["two detail segments for one ORC", [msh(), "ORC|NW|1", "OBR|1", "OBR|2"].join("\r")],
    ["DG1 without detail", [msh(), "ORC|NW|1", "DG1|1"].join("\r")],
    ["OBX without detail", [msh(), "ORC|NW|1", "OBX|1"].join("\r")],
    ["CTI before ORC", [msh(), "CTI|S1", "ORC|NW|1"].join("\r")],
    ["BLG before ORC", [msh(), "BLG|O", "ORC|NW|1"].join("\r")],
    ["PD1 without PID", [msh(), "PD1|1", "ORC|NW|1"].join("\r")],
    ["PV2 without PV1", [msh(), "PID|1", "PV2|1", "ORC|NW|1"].join("\r")],
    ["IN2 without IN1", [msh(), "PID|1", "IN2|1", "ORC|NW|1"].join("\r")],
    ["PID after ORC", [msh(), "ORC|NW|1", "PID|1"].join("\r")],
    ["NTE after ORC (not allowed there)", [msh(), "ORC|NW|1", "NTE|1||x"].join("\r")],
  ])("rejects: %s", (_label, wire) => {
    expect(parseORM_O01(wire).ok).toBe(false);
  });
});
