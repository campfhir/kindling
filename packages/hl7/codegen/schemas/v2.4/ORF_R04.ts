import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, req, reversion, wrappers } from "../helpers";
import { ORF_OBSERVATION, ORF_R04_EVENTS, ORF_R04_SCHEMA as R04_V23, orfQueryResponse } from "../v2.3/ORF_R04";

/**
 * ORF^R04 (HL7 v2.4): MSH MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] [CTD]
 *   { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [ERR] [QAK] [DSC]
 *
 * Compared with v2.3.1: [CTD] after the order's notes. W02 shares the structure.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ORF_R04
 */
export const ORF_R04_SCHEMA: MessageSchema = {
  ...reversion(R04_V23, "2.4"),
  structure: [
    req("MSH"), req("MSA"), req("QRD"), opt("QRF"),
    orfQueryResponse([opt("ORC"), req("OBR"), optList("NTE"), opt("CTD"), ORF_OBSERVATION, optList("CTI")]),
    opt("ERR"), opt("QAK"), opt("DSC"),
  ],
};

/** R04 and the events wrapping it. */
export const ORF_R04_FAMILY: MessageSchema[] = [ORF_R04_SCHEMA, ...wrappers(ORF_R04_SCHEMA, ORF_R04_EVENTS)];
