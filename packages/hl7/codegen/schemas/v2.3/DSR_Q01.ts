import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, reqList, wrappers } from "../helpers";

/**
 * DSR^Q01 - Display Response (HL7 v2.3, chapter 2 section 2.19.1).
 *
 * MSH MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC]
 *
 * P04 (chapter 6) shares the structure. Unchanged through v2.4; v2.5 adds [{SFT}] and no longer
 * lists P04.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/DSR_Q01
 */
export const DSR_Q01_SCHEMA: MessageSchema = {
  messageType: "DSR",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), opt("QAK"), req("QRD"), opt("QRF"), reqList("DSP"), opt("DSC")],
};

/** The trigger events that share the Q01 structure. */
export const DSR_Q01_EVENTS = ["P04"];

/** Q01 and the events wrapping it. */
export const DSR_Q01_FAMILY: MessageSchema[] = [DSR_Q01_SCHEMA, ...wrappers(DSR_Q01_SCHEMA, DSR_Q01_EVENTS)];

/**
 * DSR^Q03 - Deferred Display Response (HL7 v2.3, chapter 2 section 2.19.3).
 *
 * MSH [MSA] [ERR] [QAK] QRD [QRF] {DSP} [DSC] — unlike Q01 the MSA is optional.
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/DSR_Q03
 */
export const DSR_Q03_SCHEMA: MessageSchema = {
  messageType: "DSR",
  triggerEvent: "Q03",
  version: "2.3",
  structure: [req("MSH"), opt("MSA"), opt("ERR"), opt("QAK"), req("QRD"), opt("QRF"), reqList("DSP"), opt("DSC")],
};
