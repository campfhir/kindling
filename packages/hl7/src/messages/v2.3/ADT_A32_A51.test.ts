/**
 * The derived ADT events added in 0.11: A32/A33 share the A02 structure (transfer-shaped),
 * A46/A48/A49 the A34 structure (MSH EVN PID [PD1] MRG) and A50/A51 the A50 structure, which
 * requires PV1. Checks that every wrapper exists in v2.3 and v2.5.1, encodes its trigger event
 * and parses under its own name.
 */
import { describe, test, expect } from "vitest";
import * as b23 from "./index.ts";
import * as p23 from "../v2.3/index.ts";
import * as b251 from "../v2.5.1/index.ts";
import * as p251 from "../v2.5.1/index.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { MRG } from "../../segments/v2.3/MRG.ts";
import type { Result } from "../../types/result.ts";

const msh = (event: string) => new MSH().sendingApplication("TEST").messageType({ messageCode: "ADT", triggerEvent: event });
const pid = () => new PID().setId("1").patientName({ familyName: "Doe", givenName: "John" });

const A02_LIKE = ["A32", "A33"] as const;
const A34_LIKE = ["A46", "A48", "A49"] as const;
const A50_LIKE = ["A50", "A51"] as const;

for (const [label, builders, parsers] of [
  ["v2.3", b23, p23],
  ["v2.5.1", b251, p251],
] as const) {
  describe(`${label} derived ADT events`, () => {
    for (const event of A02_LIKE) {
      test(`ADT^${event} (A02 structure) builds, encodes and parses`, () => {
        const create = (builders as Record<string, unknown>)[`createADT_${event}`] as typeof b23.createADT_A02;
        const parse = (parsers as Record<string, unknown>)[`parseADT_${event}`] as (s: string) => Result<{ patient: unknown }>;
        const encoded = create(msh(event), new EVN().eventTypeCode(event), pid(), new PV1().patientClass("I")).encode();
        expect(encoded.split("\r").map((s) => s.substring(0, 3))).toEqual(["MSH", "EVN", "PID", "PV1"]);
        expect(encoded).toContain(`ADT^${event}`);
        const parsed = parse(encoded);
        expect(parsed.ok).toBe(true);
        expect(parsed.val!.patient).toBeTruthy();
        const missingPid = parse(`MSH|^~\\&|TEST|||||ADT^${event}\rEVN|${event}`);
        expect(missingPid.ok).toBe(false);
        expect(missingPid.err!.message).toContain(`ADT_${event} message must contain a PID segment`);
      });
    }
    for (const event of A34_LIKE) {
      test(`ADT^${event} (A34 structure) builds, encodes and parses`, () => {
        const create = (builders as Record<string, unknown>)[`createADT_${event}`] as typeof b23.createADT_A34;
        const parse = (parsers as Record<string, unknown>)[`parseADT_${event}`] as (s: string) => Result<{ merge: unknown }>;
        const mrg = new MRG().priorPatientId({ id: "OLD-1" });
        const encoded = create(msh(event), new EVN().eventTypeCode(event), pid(), mrg).encode();
        expect(encoded.split("\r").map((s) => s.substring(0, 3))).toEqual(["MSH", "EVN", "PID", "MRG"]);
        const parsed = parse(encoded);
        expect(parsed.ok).toBe(true);
        expect(parsed.val!.merge).toBeTruthy();
        const missingMrg = parse(`MSH|^~\\&|TEST|||||ADT^${event}\rEVN|${event}\rPID|1`);
        expect(missingMrg.ok).toBe(false);
        expect(missingMrg.err!.message).toContain(`ADT_${event} message must contain an MRG segment`);
      });
    }
    for (const event of A50_LIKE) {
      test(`ADT^${event} (A50 structure) builds, encodes and parses, PV1 required`, () => {
        const create = (builders as Record<string, unknown>)[`createADT_${event}`] as typeof b23.createADT_A50;
        const parse = (parsers as Record<string, unknown>)[`parseADT_${event}`] as (s: string) => Result<{ merge: unknown; visit: unknown }>;
        const mrg = new MRG().priorPatientId({ id: "OLD-1" });
        const encoded = create(msh(event), new EVN().eventTypeCode(event), pid(), mrg, new PV1().patientClass("I")).encode();
        expect(encoded.split("\r").map((s) => s.substring(0, 3))).toEqual(["MSH", "EVN", "PID", "MRG", "PV1"]);
        const parsed = parse(encoded);
        expect(parsed.ok).toBe(true);
        expect(parsed.val!.merge).toBeTruthy();
        expect(parsed.val!.visit).toBeTruthy();
        const missingPv1 = parse(`MSH|^~\\&|TEST|||||ADT^${event}\rEVN|${event}\rPID|1\rMRG|OLD-1`);
        expect(missingPv1.ok).toBe(false);
        expect(missingPv1.err!.message).toContain(`ADT_${event} message must contain a PV1 segment`);
      });
    }
  });
}
