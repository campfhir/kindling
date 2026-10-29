/**
 * The derived events added in 0.12: SIU S18–S24 reuse SIU_S12, SRM S02–S11 reuse SRM_S01,
 * SRR S02–S11 reuse SRR_S01, and MDM T03/T05/T07/T09/T11 reuse MDM_T01 while T04/T06/T08/T10
 * reuse MDM_T02. Checks that every wrapper exists in v2.3 and v2.5.1 and parses under its own name.
 */
import { describe, test, expect } from "vitest";
import * as b23 from "./index.ts";
import * as p23 from "./index.ts";
import * as b251 from "../v2.5.1/index.ts";
import * as p251 from "../v2.5.1/index.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ARQ } from "./ARQ.ts";
import { SCH } from "./SCH.ts";
import { RGS } from "./RGS.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { TXA } from "./TXA.ts";
import { OBX } from "./OBX.ts";
import type { Result } from "../types/result.ts";

type Fns = Record<string, (...args: any[]) => any>;
const msh = (type: string, event: string) => new MSH().sendingApplication("TEST").messageType({ messageCode: type, triggerEvent: event });
const pad = (n: number) => String(n).padStart(2, "0");

for (const [label, builders, parsers, is251] of [
  ["v2.3", b23 as unknown as Fns, p23 as unknown as Fns, false],
  ["v2.5.1", b251 as unknown as Fns, p251 as unknown as Fns, true],
] as const) {
  describe(`${label} scheduling and MDM wrappers`, () => {
    const check = (name: string, encoded: string, missing: string, expectedError: RegExp) => {
      const parse = parsers[`parse${name}`] as (s: string) => Result<unknown>;
      expect(typeof parse).toBe("function");
      expect(encoded).toContain(name.replace("_", "^"));
      expect(parse(encoded).ok).toBe(true);
      const failed = parse(missing);
      expect(failed.ok).toBe(false);
      expect(failed.err!.message).toMatch(expectedError);
    };

    test.each([18, 19, 20, 21, 22, 23, 24])("SIU^S%i reuses SIU_S12", (n) => {
      const name = `SIU_S${n}`;
      const encoded = builders[`create${name}`](msh("SIU", `S${n}`), new SCH(), [{ resourceGroup: new RGS().setId("1") }]).encode();
      check(name, encoded, `MSH|^~\\&|TEST|||||SIU^S${n}`, new RegExp(`${name} message must contain an SCH segment`));
    });

    test.each(Array.from({ length: 10 }, (_, i) => i + 2))("SRM^S%02d reuses SRM_S01", (n) => {
      const name = `SRM_S${pad(n)}`;
      const encoded = builders[`create${name}`](msh("SRM", `S${pad(n)}`), new ARQ(), [{ resourceGroup: new RGS().setId("1") }]).encode();
      check(name, encoded, `MSH|^~\\&|TEST|||||SRM^S${pad(n)}\rARQ|1`, new RegExp(`${name} message must contain at least one RGS`));
    });

    test.each(Array.from({ length: 10 }, (_, i) => i + 2))("SRR^S%02d reuses SRR_S01", (n) => {
      const name = `SRR_S${pad(n)}`;
      const encoded = builders[`create${name}`](msh("SRR", `S${pad(n)}`), new MSA().acknowledgmentCode("AA")).encode();
      check(name, encoded, `MSH|^~\\&|TEST|||||SRR^S${pad(n)}`, new RegExp(`${name} message must contain an MSA`));
    });

    test.each([3, 5, 7, 9, 11])("MDM^T%02d reuses MDM_T01", (n) => {
      const name = `MDM_T${pad(n)}`;
      const encoded = builders[`create${name}`](msh("MDM", `T${pad(n)}`), new EVN().eventTypeCode(`T${pad(n)}`), new PID().setId("1"), new PV1().patientClass("I"), new TXA().setId("1")).encode();
      check(name, encoded, `MSH|^~\\&|TEST|||||MDM^T${pad(n)}\rEVN|1\rPID|1\rPV1|1`, new RegExp(`${name} message must contain a TXA`));
    });

    test.each([4, 6, 8, 10])("MDM^T%02d reuses MDM_T02", (n) => {
      const name = `MDM_T${pad(n)}`;
      const content = is251 ? [{ observation: new OBX().setId("1") }] : [new OBX().setId("1")];
      const encoded = builders[`create${name}`](msh("MDM", `T${pad(n)}`), new EVN().eventTypeCode(`T${pad(n)}`), new PID().setId("1"), new PV1().patientClass("I"), new TXA().setId("1"), content).encode();
      expect((encoded as string).split("\r").map((s: string) => s.slice(0, 3))).toEqual(["MSH", "EVN", "PID", "PV1", "TXA", "OBX"]);
      check(name, encoded, `MSH|^~\\&|TEST|||||MDM^T${pad(n)}\rEVN|1\rPID|1\rPV1|1\rTXA|1`, new RegExp(`${name} message must contain at least one OBX`));
    });
  });
}
