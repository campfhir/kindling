import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, wrappers } from "../helpers";

/**
 * QRY^Q01 - Query Sent for Immediate Response (HL7 v2.3, chapter 2 section 2.19.1).
 *
 * MSH QRD [QRF] [DSC]
 *
 * Q02 (deferred response) and P04 (generate bills and A/R statements, chapter 6) share the
 * structure. Unchanged through v2.4; v2.5 adds [{SFT}] and no longer lists P04.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/QRY_Q01
 */
export const QRY_Q01_SCHEMA: MessageSchema = {
  messageType: "QRY",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF"), opt("DSC")],
};

/** The trigger events that share the Q01 structure. */
export const QRY_Q01_EVENTS = ["Q02", "P04"];

/** Q01 and the events wrapping it. */
export const QRY_Q01_FAMILY: MessageSchema[] = [QRY_Q01_SCHEMA, ...wrappers(QRY_Q01_SCHEMA, QRY_Q01_EVENTS)];

/**
 * QRY^R02 - Query for Results of Observation (HL7 v2.3, chapter 7 section 7.3.2).
 *
 * MSH QRD QRF — the only original-mode query whose QRF is required.
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/QRY_R02
 */
export const QRY_R02_SCHEMA: MessageSchema = {
  messageType: "QRY",
  triggerEvent: "R02",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), req("QRF")],
};

/**
 * QCK^Q02 - Query General Acknowledgment (HL7 v2.3, chapter 2 section 2.19.2).
 *
 * MSH MSA [ERR] [QAK]
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/QCK_Q02
 */
export const QCK_Q02_SCHEMA: MessageSchema = {
  messageType: "QCK",
  triggerEvent: "Q02",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), opt("QAK")],
};
