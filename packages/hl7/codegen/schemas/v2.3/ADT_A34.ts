import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, wrappers } from "../helpers";

/**
 * ADT^A34 - Merge Patient Information – Patient ID Only (HL7 v2.3, chapter 3).
 *
 * MSH EVN PID [PD1] MRG [PV1]
 *
 * Base structure for the merge/link/move events that carry an MRG segment. A18, A50 and A51
 * (change visit number / alternate visit ID) require PV1 per the standard: MSH EVN PID [PD1] MRG PV1
 * (hl7-definition.caristix.com, v2.3). They reuse this structure, which accepts PV1 as an option.
 * v2.5/v2.5.1 add [{SFT}] after MSH (see the v2.5 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A34
 */
export const ADT_A34_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A34",
  version: "2.3",
  structure: [req("MSH"), req("EVN"), req("PID"), opt("PD1"), req("MRG"), opt("PV1")],
};

/** The trigger events that share the A34 structure. */
export const ADT_A34_EVENTS = ["A18", "A30", "A35", "A36", "A37", "A39", "A40", "A41", "A42", "A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51"];

/** A34 and the merge/link/move events wrapping it. */
export const ADT_A34_FAMILY: MessageSchema[] = [ADT_A34_SCHEMA, ...wrappers(ADT_A34_SCHEMA, ADT_A34_EVENTS)];
