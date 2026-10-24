import { test, expect } from "vitest";
import { createADT_A34, ADT_A34 } from "./ADT_A34.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { MRG } from "../../segments/v2.3/MRG.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { parseADT_A34 } from "../../parsers/v2.5.1/ADT_A34_Parser.ts";

function makeMSH() {
  return new MSH().sendingApplication("TEST").messageType({ messageCode: "ADT", triggerEvent: "A34" });
}
function makePID() {
  return new PID().setId("1").patientName({ familyName: "Doe", givenName: "John" });
}
function makeEVN() {
  return new EVN().eventTypeCode("A34").recordedDateTime("20231015120000");
}
function makeMRG() {
  return new MRG().priorPatientId({ id: "OLD-12345" });
}

test("createADT_A34 returns ADT_A34 instance", () => {
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG());
  expect(msg instanceof ADT_A34).toBe(true);
});

test("verify() passes with all required segments", () => {
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG());
  const result = msg.verify();
  expect(result.valid).toBe(true);
  expect(result.errors).toHaveLength(0);
});

test("verify() fails when MSH is missing", () => {
  // deno-lint-ignore no-explicit-any
  const msg = new ADT_A34(null as any, makeEVN(), makePID(), makeMRG());
  const result = msg.verify();
  expect(result.valid).toBe(false);
  expect(result.errors.some((e) => e.includes("MSH"))).toBe(true);
});

test("verify() fails when PID is missing", () => {
  // deno-lint-ignore no-explicit-any
  const msg = new ADT_A34(makeMSH(), makeEVN(), null as any, makeMRG());
  const result = msg.verify();
  expect(result.valid).toBe(false);
  expect(result.errors.some((e) => e.includes("PID"))).toBe(true);
});

test("verify() fails when MRG is missing", () => {
  // deno-lint-ignore no-explicit-any
  const msg = new ADT_A34(makeMSH(), makeEVN(), makePID(), null as any);
  const result = msg.verify();
  expect(result.valid).toBe(false);
  expect(result.errors.some((e) => e.includes("MRG"))).toBe(true);
});

test("encode() throws when message is invalid", () => {
  // deno-lint-ignore no-explicit-any
  const msg = new ADT_A34(null as any, makeEVN(), makePID(), makeMRG());
  expect(() => msg.encode()).toThrow();
});

test("encode() produces correct segment order for minimal message", () => {
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG());
  const segments = msg.encode().split("\r");

  expect(segments.map((s) => s.substring(0, 3))).toEqual(["MSH", "EVN", "PID", "MRG"]);
});

test("verify() fails when EVN is missing", () => {
  // deno-lint-ignore no-explicit-any
  const msg = new ADT_A34(makeMSH(), null as any, makePID(), makeMRG());
  expect(msg.verify().errors).toEqual(["EVN segment is required"]);
});

test("encode() places optional PD1 after PID and before MRG", () => {
  const pd1 = new PD1();
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG(), { patientDemographics: pd1 });
  const segments = msg.encode().split("\r");
  const names = segments.map((s) => s.substring(0, 3));

  expect(names.indexOf("PD1")).toBeGreaterThan(names.indexOf("PID"));
  expect(names.indexOf("PD1")).toBeLessThan(names.indexOf("MRG"));
});

test("encode() places optional PV1 after MRG", () => {
  const pv1 = new PV1().patientClass("I");
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG(), { visit: pv1 });
  const segments = msg.encode().split("\r");
  const names = segments.map((s) => s.substring(0, 3));

  expect(names.indexOf("PV1")).toBeGreaterThan(names.indexOf("MRG"));
});

test("encode() includes all optional segments in correct order", () => {
  const pd1 = new PD1();
  const pv1 = new PV1().patientClass("I");
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG(), { patientDemographics: pd1, visit: pv1 });
  const segments = msg.encode().split("\r");
  const names = segments.map((s) => s.substring(0, 3));

  expect(names).toEqual(["MSH", "EVN", "PID", "PD1", "MRG", "PV1"]);
});

test("round-trip: build → encode → parse", () => {
  const msg = createADT_A34(makeMSH(), makeEVN(), makePID(), makeMRG());

  const encoded = msg.encode();
  const parsed = parseADT_A34(encoded);

  expect(parsed.ok).toBe(true);
  expect(parsed.val!.patient).toBeTruthy();
  expect(parsed.val!.merge).toBeTruthy();
  expect(parsed.val!.event).toBeTruthy();
});
