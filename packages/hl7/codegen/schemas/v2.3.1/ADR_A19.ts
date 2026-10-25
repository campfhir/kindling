import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, replaceItem, reversion } from "../helpers";
import { ADT_A01_SCHEMA } from "../v2.3/ADT_A01";
import { adrQueryResponse } from "../v2.3/QRY_A19";

/**
 * ADR^A19 (HL7 v2.3.1): MSH MSA [ERR] [QAK] QRD [QRF] { QUERY_RESPONSE: ... IN1 [IN2] [{IN3}] ... } [DSC]
 *
 * Compared with v2.3: [QAK] after ERR, and IN3 repeats inside INSURANCE (the ADT^A01 body of
 * v2.3.1 is otherwise unchanged). v2.4 adds the ROLs (see the v2.4 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/ADR_A19
 */
const insurance = group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), optList("IN3")], { as: "insuranceGroups", exportTypeName: "ParsedInsuranceGroup" });
export const ADR_A19_SCHEMA: MessageSchema = {
  messageType: "ADR",
  triggerEvent: "A19",
  version: "2.3.1",
  structure: [
    req("MSH"), req("MSA"), opt("ERR"), opt("QAK"), req("QRD"), opt("QRF"),
    adrQueryResponse(replaceItem(reversion(ADT_A01_SCHEMA, "2.3.1"), "INSURANCE", insurance)),
    opt("DSC"),
  ],
};
