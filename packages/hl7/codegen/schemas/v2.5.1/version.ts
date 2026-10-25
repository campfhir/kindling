import type { MessageSchema, VersionSchema } from "../../../src/types/schema";
import { findDeep, nameOf, replaceDeep, reversionAll, withSft } from "../helpers";
import { V2_5_MESSAGES } from "../v2.5/version";

const base = reversionAll(V2_5_MESSAGES, "2.5.1");
const byName = new Map(base.map((m) => [nameOf(m), m]));

/**
 * QRY^PC4 (and PC9, PCE, PCK, which wrap it): 2.5.1 adds the [{SFT}] the other 2.5 messages have.
 * Source: https://www.hl7.eu/HL7v2x/v251/std251/ch12.html (12.3.4) and HAPI v251 QRY_PC4; Caristix 2.5.1 prints it without.
 */
const QRY_PC4_SCHEMA: MessageSchema = withSft(byName.get("QRY_PC4")!);

/**
 * RRE^O26: the ENCODING group loses the [{NTE}] after RXE in 2.5.1 (RXE { TIMING_ENCODED } {RXR} [{RXC}]).
 * Source: https://www.hl7.eu/HL7v2x/v251/std251/ch04.html (4.13.10) and HAPI v251 RRE_O26; Caristix 2.5.1 keeps the NTE.
 */
const RRE_O26_SCHEMA: MessageSchema = (() => {
  const rre = byName.get("RRE_O26")!;
  const encoding = findDeep(rre.structure, "ENCODING")!;
  return replaceDeep(rre, "ENCODING", { ...encoding, segments: encoding.segments.filter((item) => !("name" in item && item.name === "NTE")) });
})();

const changed = new Map([QRY_PC4_SCHEMA, RRE_O26_SCHEMA].map((m) => [nameOf(m), m]));
/** Every v2.5.1 message: the v2.5 list re-versioned, with the two structures 2.5.1 changes; a wrapper event has its base's structure. */
export const V2_5_1_MESSAGES: MessageSchema[] = base
  .map((m) => changed.get(nameOf(m)) ?? m)
  .map((m) => (m.baseMessage !== undefined && changed.has(m.baseMessage) ? { ...m, structure: changed.get(m.baseMessage)!.structure } : m));

/**
 * v2.5.1 — a re-export version of v2.5 for its segments (OBR, OBX and ORC have their own class for
 * OBR-50, OBX-20 to OBX-25 and ORC-31, see docs/validation/v2.5.1-segment-ledger.md) with every
 * message generated against the v2.5.1 segment modules (docs/validation/v2.5.1-message-ledger.md).
 */
export const V2_5_1: VersionSchema = {
  version: "v2.5.1",
  baseVersion: "v2.5",
  reexport: true,
  ownSegments: [],
  segments: [],
  messages: V2_5_1_MESSAGES,
};
