import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/** The QUERY_RESPONSE group of ORF^R04: an inlined PATIENT and the ORDER groups, whose body is `order`. */
export function orfQueryResponse(order: StructureItem[]) {
  return group("QUERY_RESPONSE", "required", "repeating", [
    group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
    group("ORDER", "required", "repeating", order, { exportTypeName: "ParsedResponseOrder" }),
  ], { exportTypeName: "ParsedQueryResponse", builderTypeName: "QueryResponse" });
}

/** The OBSERVATION group of ORF^R04: a required repeating group whose OBX is itself optional. */
export const ORF_OBSERVATION = group("OBSERVATION", "required", "repeating", [opt("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" });

/**
 * ORF^R04 - Response to Query; Transmission of Requested Observation (HL7 v2.3, chapter 7 section 7.3.2).
 *
 * MSH MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [DSC]
 *
 * W02 (waveform result, chapter 7 section 7.14) shares the structure. The PATIENT group is inlined
 * (`patient`, `patientNotes`). v2.3.1 adds a trailing [ERR] [QAK], v2.4 [CTD] after the order's
 * notes, v2.5 [{SFT}], the TIMING QTY groups and a repeating ERR (see those schemas).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORF_R04
 */
export const ORF_R04_SCHEMA: MessageSchema = {
  messageType: "ORF",
  triggerEvent: "R04",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    req("QRD"),
    opt("QRF"),
    orfQueryResponse([opt("ORC"), req("OBR"), optList("NTE"), ORF_OBSERVATION, optList("CTI")]),
    opt("DSC"),
  ],
};

/** The trigger events that share the R04 structure. */
export const ORF_R04_EVENTS = ["W02"];

/** R04 and the events wrapping it. */
export const ORF_R04_FAMILY: MessageSchema[] = [ORF_R04_SCHEMA, ...wrappers(ORF_R04_SCHEMA, ORF_R04_EVENTS)];
