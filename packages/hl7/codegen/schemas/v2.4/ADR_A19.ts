import type { MessageSchema } from "../../../src/types/schema";
import { opt, req } from "../helpers";
import { adrQueryResponse } from "../v2.3/QRY_A19";
import { ADT_A01_SCHEMA } from "./ADT_A01";

/**
 * ADR^A19 (HL7 v2.4): MSH MSA [ERR] [QAK] QRD [QRF] { QUERY_RESPONSE: [EVN] <ADT^A01 body> } [DSC]
 *
 * Each response repeats the v2.4 ADT^A01 body (ROLs after PD1 and PV2 and in INSURANCE, a
 * repeating IN3) after an optional EVN; unlike ADT^A01 there is no trailing PDA. v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADR_A19
 */
export const ADR_A19_SCHEMA: MessageSchema = {
  messageType: "ADR",
  triggerEvent: "A19",
  version: "2.4",
  structure: [
    req("MSH"), req("MSA"), opt("ERR"), opt("QAK"), req("QRD"), opt("QRF"),
    adrQueryResponse({ ...ADT_A01_SCHEMA, structure: ADT_A01_SCHEMA.structure.filter((item) => !("name" in item && item.name === "PDA")) }),
    opt("DSC"),
  ],
};
