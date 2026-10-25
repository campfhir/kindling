import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { insertAfter, nameOf, opt, optList, replaceDeep, req, reversion, wrappers } from "../helpers";
import { ADT_MESSAGES_V231 } from "../v2.3.1/ADT";
import { ADT_A34_EVENTS } from "../v2.3/ADT_A34";
import { ADT_A01_FAMILY, ADT_A01_SCHEMA } from "./ADT_A01";
import { ADT_NEW_MESSAGES } from "./ADT_new";

/**
 * Every ADT message of HL7 v2.4, each event under the structure its chapter 3 table gives it
 * (https://www.hl7.eu/HL7v2x/v24/std24/ch03.htm; the table captions name the structure, e.g.
 * "ADT^A14^ADT_A05"), cross-checked on Caristix 2.4 and HAPI v24 by codegen/validate/message-ledger.ts
 * (docs/validation/v2.4-message-ledger.md).
 *
 * What changed from 2.3.1: the ROL segment joins the patient (after PD1) and the visit (after PV2) in
 * A01, A02, A03, A05, A06, A15, A16 and their events, and the INSURANCE group; PDA (patient death and
 * autopsy) ends A01, A02 and A03; MRG is required in A18. A05, A14, A28 and A31 share the A05
 * structure (A01 without PDA), A21–A33 keep the 2.3 transfer shape as the ADT_A21 structure, and A15
 * leaves the A09 family. New events: A52–A55 and A60–A62 (./ADT_new.ts).
 */

const v231 = new Map(ADT_MESSAGES_V231.map((m) => [nameOf(m), m]));

/** The 2.3.1 structure of an event, re-versioned, optionally under another trigger event (standalone, not a wrapper). */
function from(name: string, triggerEvent?: string): MessageSchema {
  const base = v231.get(name);
  if (!base) throw new Error(`no v2.3.1 ADT message ${name}`);
  const { baseMessage: _dropped, ...rest } = base;
  void _dropped;
  return { ...reversion(rest, "2.4"), ...(triggerEvent ? { triggerEvent } : {}) };
}

/** [{ROL}] after PD1 (the patient's roles) and after PV2 (the visit's roles), as the 2.4 tables add them. */
const withRoles = (s: MessageSchema): MessageSchema => insertAfter(insertAfter(s, "PD1", optList("ROL")), "PV2", optList("ROL", { as: "visitRoles" }));
/** [PDA] at the end of the message. */
const withPda = (s: MessageSchema): MessageSchema => ({ ...s, structure: [...s.structure, opt("PDA")] });
/** The A01 structure without its trailing PDA: the ADT_A05 structure of 2.4. */
const withoutPda = (s: MessageSchema, triggerEvent: string): MessageSchema => ({
  ...s,
  triggerEvent,
  structure: s.structure.filter((item: StructureItem) => !("name" in item && item.name === "PDA")),
});

export const ADT_A02_SCHEMA = withPda(withRoles(from("ADT_A02")));
export const ADT_A03_SCHEMA = withPda(withRoles(from("ADT_A03")));
export const ADT_A05_SCHEMA = withoutPda(ADT_A01_SCHEMA, "A05");
export const ADT_A05_FAMILY: MessageSchema[] = [ADT_A05_SCHEMA, ...wrappers(ADT_A05_SCHEMA, ["A14", "A28", "A31"])];
/** A06 (and A07): the roles, and [{ROL}] after IN3 in the INSURANCE group. */
export const ADT_A06_SCHEMA = insertAfter(withRoles(from("ADT_A06")), "IN3", optList("ROL"));
export const ADT_A06_FAMILY: MessageSchema[] = [ADT_A06_SCHEMA, ...wrappers(ADT_A06_SCHEMA, ["A07"])];
export const ADT_A09_SCHEMA = from("ADT_A09");
export const ADT_A09_FAMILY: MessageSchema[] = [ADT_A09_SCHEMA, ...wrappers(ADT_A09_SCHEMA, ["A10", "A11"])];
export const ADT_A15_SCHEMA = withRoles(from("ADT_A09", "A15"));
export const ADT_A16_SCHEMA = withRoles(from("ADT_A16"));
export const ADT_A18_SCHEMA = replaceDeep(from("ADT_A18"), "MRG", req("MRG"));
/** A21–A33 keep the 2.3 transfer structure (ADT_A21 in the 2.4 captions). */
export const ADT_A21_SCHEMA = from("ADT_A02", "A21");
export const ADT_A21_FAMILY: MessageSchema[] = [ADT_A21_SCHEMA, ...wrappers(ADT_A21_SCHEMA, ["A22", "A23", "A25", "A26", "A27", "A29", "A32", "A33"])];

/** The events whose 2.3.1 structure is unchanged in 2.4, base messages with their wrapper events. */
const UNCHANGED: Record<string, string[]> = {
  ADT_A12: [], ADT_A17: [], ADT_A20: [], ADT_A24: [],
  ADT_A34: ADT_A34_EVENTS, ADT_A37: [], ADT_A38: [],
  ADT_A39: ["A40", "A41", "A42"], ADT_A43: ["A44"], ADT_A45: [], ADT_A50: ["A51"],
};

/** Every ADT message of v2.4. */
export const ADT_MESSAGES_V24: MessageSchema[] = [
  ...ADT_A01_FAMILY,
  ADT_A02_SCHEMA,
  ADT_A03_SCHEMA,
  ...ADT_A05_FAMILY,
  ...ADT_A06_FAMILY,
  ...ADT_A09_FAMILY,
  ADT_A15_SCHEMA,
  ADT_A16_SCHEMA,
  ADT_A18_SCHEMA,
  ...ADT_A21_FAMILY,
  ...Object.entries(UNCHANGED).flatMap(([name, events]) => {
    const base = from(name);
    return [base, ...wrappers(base, events)];
  }),
  ...ADT_NEW_MESSAGES,
];
