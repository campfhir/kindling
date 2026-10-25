import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, req, type Usage } from "../helpers";
import { ADT_A01_SCHEMA } from "./ADT_A01";

/**
 * QRY^A19 - Patient Query (HL7 v2.3, chapter 3 section 3.2.19).
 *
 * MSH QRD [QRF]
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}] (see the v2.5 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/QRY_A19
 */
export const QRY_A19_SCHEMA: MessageSchema = {
  messageType: "QRY",
  triggerEvent: "A19",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF")],
};

/**
 * The QUERY_RESPONSE group of ADR^A19: `[EVN]` followed by the body of ADT^A01 of the same
 * version (everything after MSH EVN), as `queryResponses`.
 */
export function adrQueryResponse(adt: MessageSchema, usage: Usage = "required") {
  return group("QUERY_RESPONSE", usage, "repeating", [opt("EVN"), ...adt.structure.slice(2)], { exportTypeName: "ParsedQueryResponse", builderTypeName: "QueryResponse" });
}

/**
 * ADR^A19 - Patient Query Response (HL7 v2.3, chapter 3 section 3.2.19).
 *
 * MSH MSA [ERR] QRD [QRF] { QUERY_RESPONSE: [EVN] PID [PD1] [{NK1}] PV1 [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 *   [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] } [DSC]
 *
 * Each response repeats the ADT^A01 body after an optional EVN. v2.3.1 adds [QAK] and a repeating
 * IN3, v2.4 the A01 ROLs, v2.5 [{SFT}] (see those schemas).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADR_A19
 */
export const ADR_A19_SCHEMA: MessageSchema = {
  messageType: "ADR",
  triggerEvent: "A19",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), req("QRD"), opt("QRF"), adrQueryResponse(ADT_A01_SCHEMA), opt("DSC")],
};
