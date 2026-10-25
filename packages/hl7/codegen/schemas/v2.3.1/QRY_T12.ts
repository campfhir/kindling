import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * DOC^T12 (HL7 v2.3.1, unchanged through v2.5.1): MSH MSA [ERR] [QAK] QRD { RESULT: [EVN] PID PV1 TXA [{OBX}] } [DSC]
 *
 * Compared with v2.3: [QAK] after ERR.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/DOC_T12
 */
export const DOC_T12_SCHEMA: MessageSchema = {
  messageType: "DOC",
  triggerEvent: "T12",
  version: "2.3.1",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    opt("QAK"),
    req("QRD"),
    group("RESULT", "required", "repeating", [opt("EVN"), req("PID"), req("PV1"), req("TXA"), optList("OBX")]),
    opt("DSC"),
  ],
};
