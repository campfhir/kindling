// ORM^O01 in v2.5 keeps the v2.4 structure (no SFT, one IN3 per insurance group), generated against the v2.5 segments.
import { describe, test, expect } from "vitest";
import { ORM_O01, createORM_O01 } from "./ORM_O01.ts";
import { ORM_O01 as ORM_O01_v24 } from "../v2.4/ORM_O01.ts";
import { parseORM_O01 } from "../v2.5/ORM_O01.ts";
import { parseORM_O01 as parseORM_O01_v24 } from "../v2.4/ORM_O01.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { IN3 } from "../../segments/v2.5/IN3.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";

const makeMSH = () => new MSH().messageType({ messageCode: "ORM", triggerEvent: "O01" }).messageControlId("1");
const message = () =>
  createORM_O01(makeMSH(), [{ commonOrder: new ORC().orderControl("NW") }], {
    patient: new PID().setId("1"),
    insurances: [{ insurance: new IN1().setId("1"), insuranceCertification: new IN3().setId("1") }],
  });

describe("ORM_O01 (v2.5)", () => {
  test("is its own class, generated against the v2.5 segments", () => {
    expect(message()).toBeInstanceOf(ORM_O01);
    expect(message()).not.toBeInstanceOf(ORM_O01_v24);
  });

  test("encodes without SFT and with one IN3 per insurance group (hl7.eu ch4 4.4.1, Caristix 2.5, HAPI v25)", () => {
    const msg = message();
    expect(msg.verify().valid).toBe(true);
    expect(msg.encode().split("\r").map((s) => s.slice(0, 3))).toEqual(["MSH", "PID", "IN1", "IN3", "ORC"]);
  });

  test("parses in v2.5 and, the structure being the 2.4 one, in v2.4 too", () => {
    const wire = message().encode();
    const result = parseORM_O01(wire);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.val.insurances![0].insuranceCertification).toBeInstanceOf(IN3);
    expect(parseORM_O01_v24(wire).ok).toBe(true);
  });

  test("a second IN3 in an insurance group is rejected", () => {
    const wire = [makeMSH().encode(), "PID|1", "IN1|1", "IN3|1", "IN3|2", "ORC|NW"].join("\r");
    expect(parseORM_O01(wire).ok).toBe(false);
  });
});
