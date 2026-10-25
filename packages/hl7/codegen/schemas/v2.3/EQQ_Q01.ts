import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, reqList } from "../helpers";

/**
 * The enhanced-mode queries of HL7 v2.3 (chapter 2 section 2.20) and their responses. v2.3.1
 * renumbers the four query events (EQQ^Q04, VQQ^Q07, SPQ^Q08, RQQ^Q09) and the tabular response
 * (TBR^R08) without changing the structures; v2.5 adds [{SFT}] to all of them.
 */

/**
 * EQQ^Q01 - Embedded Query Language Query: MSH EQL [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/EQQ_Q01
 */
export const EQQ_Q01_SCHEMA: MessageSchema = {
  messageType: "EQQ",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("EQL"), opt("DSC")],
};

/**
 * RQQ^Q01 - Event Replay Query: MSH ERQ [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RQQ_Q01
 */
export const RQQ_Q01_SCHEMA: MessageSchema = {
  messageType: "RQQ",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("ERQ"), opt("DSC")],
};

/**
 * SPQ^Q01 - Stored Procedure Request: MSH SPR [RDF] [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/SPQ_Q01
 */
export const SPQ_Q01_SCHEMA: MessageSchema = {
  messageType: "SPQ",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("SPR"), opt("RDF"), opt("DSC")],
};

/**
 * VQQ^Q01 - Virtual Table Query: MSH VTQ [RDF] [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/VQQ_Q01
 */
export const VQQ_Q01_SCHEMA: MessageSchema = {
  messageType: "VQQ",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("VTQ"), opt("RDF"), opt("DSC")],
};

/**
 * TBR^Q01 - Tabular Response: MSH MSA [ERR] QAK RDF {RDT} [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/TBR_Q01
 */
export const TBR_Q01_SCHEMA: MessageSchema = {
  messageType: "TBR",
  triggerEvent: "Q01",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), req("QAK"), req("RDF"), reqList("RDT"), opt("DSC")],
};

/**
 * EDR^R07 - Enhanced Display Response: MSH MSA [ERR] QAK {DSP} [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/EDR_R07
 */
export const EDR_R07_SCHEMA: MessageSchema = {
  messageType: "EDR",
  triggerEvent: "R07",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), req("QAK"), reqList("DSP"), opt("DSC")],
};

/**
 * ERP^R09 - Event Replay Response: MSH MSA [ERR] QAK ERQ [DSC]
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ERP_R09
 */
export const ERP_R09_SCHEMA: MessageSchema = {
  messageType: "ERP",
  triggerEvent: "R09",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), req("QAK"), req("ERQ"), opt("DSC")],
};

/** The v2.3 enhanced-mode query messages. */
export const ENHANCED_QUERY_MESSAGES: MessageSchema[] = [
  EQQ_Q01_SCHEMA, RQQ_Q01_SCHEMA, SPQ_Q01_SCHEMA, VQQ_Q01_SCHEMA, TBR_Q01_SCHEMA, EDR_R07_SCHEMA, ERP_R09_SCHEMA,
];
