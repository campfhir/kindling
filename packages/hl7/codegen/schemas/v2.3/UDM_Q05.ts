import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, reqList, wrappers } from "../helpers";

/**
 * UDM^Q05 - Unsolicited Display Update (HL7 v2.3, chapter 2 section 2.19.5).
 *
 * MSH URD [URS] {DSP} [DSC]
 *
 * R06 shares the structure in v2.3 and v2.3.1 (v2.4 no longer lists it); v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/UDM_Q05
 */
export const UDM_Q05_SCHEMA: MessageSchema = {
  messageType: "UDM",
  triggerEvent: "Q05",
  version: "2.3",
  structure: [req("MSH"), req("URD"), opt("URS"), reqList("DSP"), opt("DSC")],
};

/** The trigger events that share the Q05 structure. */
export const UDM_Q05_EVENTS = ["R06"];

/** Q05 and the events wrapping it. */
export const UDM_Q05_FAMILY: MessageSchema[] = [UDM_Q05_SCHEMA, ...wrappers(UDM_Q05_SCHEMA, UDM_Q05_EVENTS)];
