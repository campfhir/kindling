import type { MessageSchema } from "../../../src/types/schema";
import { reversion } from "../helpers";
import { EQQ_Q01_SCHEMA, RQQ_Q01_SCHEMA, SPQ_Q01_SCHEMA, TBR_Q01_SCHEMA, VQQ_Q01_SCHEMA } from "../v2.3/EQQ_Q01";

/**
 * The enhanced-mode queries from HL7 v2.3.1 on (chapter 2 section 2.20): the v2.3 structures
 * under their renumbered trigger events. EQQ^Q01 becomes Q04, VQQ^Q01 becomes Q07, SPQ^Q01
 * becomes Q08, RQQ^Q01 becomes Q09 and the tabular response TBR^Q01 becomes R08; the Q01 events
 * are withdrawn. Unchanged in v2.4; v2.5 adds [{SFT}].
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/EQQ_Q04 (and VQQ_Q07,
 * SPQ_Q08, RQQ_Q09, TBR_R08).
 */
const renumber = (schema: MessageSchema, triggerEvent: string, version = "2.3.1"): MessageSchema => ({ ...reversion(schema, version), triggerEvent });

/** EQQ^Q04 - Embedded Query Language Query: MSH EQL [DSC] */
export const EQQ_Q04_SCHEMA: MessageSchema = renumber(EQQ_Q01_SCHEMA, "Q04");
/** VQQ^Q07 - Virtual Table Query: MSH VTQ [RDF] [DSC] */
export const VQQ_Q07_SCHEMA: MessageSchema = renumber(VQQ_Q01_SCHEMA, "Q07");
/** SPQ^Q08 - Stored Procedure Request: MSH SPR [RDF] [DSC] */
export const SPQ_Q08_SCHEMA: MessageSchema = renumber(SPQ_Q01_SCHEMA, "Q08");
/** RQQ^Q09 - Event Replay Query: MSH ERQ [DSC] */
export const RQQ_Q09_SCHEMA: MessageSchema = renumber(RQQ_Q01_SCHEMA, "Q09");
/** TBR^R08 - Tabular Response: MSH MSA [ERR] QAK RDF {RDT} [DSC] */
export const TBR_R08_SCHEMA: MessageSchema = renumber(TBR_Q01_SCHEMA, "R08");

/** The renumbered enhanced-mode query messages. */
export const RENUMBERED_QUERY_MESSAGES: MessageSchema[] = [EQQ_Q04_SCHEMA, VQQ_Q07_SCHEMA, SPQ_Q08_SCHEMA, RQQ_Q09_SCHEMA, TBR_R08_SCHEMA];

/** The v2.3 events the renumbering withdrew. */
export const WITHDRAWN_Q01_MESSAGES = ["EQQ_Q01", "VQQ_Q01", "SPQ_Q01", "RQQ_Q01", "TBR_Q01"];
