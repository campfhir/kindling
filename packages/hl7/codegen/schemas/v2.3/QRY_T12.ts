import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * QRY^T12 - Document Query (HL7 v2.3, chapter 9 section 9.5.12).
 *
 * MSH QRD [QRF]
 *
 * Unchanged through v2.5.1.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/QRY_T12
 */
export const QRY_T12_SCHEMA: MessageSchema = {
  messageType: "QRY",
  triggerEvent: "T12",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF")],
};

/**
 * DOC^T12 - Document Query Response (HL7 v2.3, chapter 9 section 9.5.12).
 *
 * MSH MSA [ERR] QRD { RESULT: [EVN] PID PV1 TXA [{OBX}] } [DSC]
 *
 * v2.3.1 adds [QAK] after ERR (see the v2.3.1 schema), unchanged thereafter through v2.5.1.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/DOC_T12
 */
export const DOC_T12_SCHEMA: MessageSchema = {
  messageType: "DOC",
  triggerEvent: "T12",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QRD"),
    group("RESULT", "required", "repeating", [opt("EVN"), req("PID"), req("PV1"), req("TXA"), optList("OBX")]),
    opt("DSC"),
  ],
};
