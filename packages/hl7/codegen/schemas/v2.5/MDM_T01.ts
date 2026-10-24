import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, optList, req, wrappers } from "../helpers";
import { MDM_T01_EVENTS, MDM_T02_EVENTS } from "../v2.3/MDM_T01";

/**
 * MDM^T01 / MDM^T02 (HL7 v2.5, identical in v2.5.1).
 *
 * T01: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA
 * T02: ... TXA { OBSERVATION: OBX [{NTE}] }
 *
 * Compared with v2.3/v2.4: SFT, the COMMON ORDER group before TXA, and NTEs under each OBX in
 * the content events. The odd events (T03, T05, ...) share T01, the even ones (T04, ...) share T02.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/MDM_T01 and MDM_T02
 */
export const MDM_T01_SCHEMA: MessageSchema = {
  messageType: "MDM",
  triggerEvent: "T01",
  version: "2.5",
  structure: [
    req("MSH"),
    SFT,
    req("EVN"),
    req("PID"),
    req("PV1"),
    group("COMMON_ORDER", false, true, [
      req("ORC"),
      group("TIMING", false, true, [req("TQ1"), optList("TQ2")], { as: "timings", exportTypeName: "ParsedMDMTiming" }),
      req("OBR"),
      optList("NTE"),
    ], { as: "orders", exportTypeName: "ParsedMDMOrder" }),
    req("TXA"),
  ],
};

export const MDM_T02_SCHEMA: MessageSchema = {
  ...MDM_T01_SCHEMA,
  triggerEvent: "T02",
  structure: [
    ...MDM_T01_SCHEMA.structure,
    group("OBSERVATION", true, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedMDMObservation" }),
  ],
};

/** T01, T02 and the events wrapping them. */
export const MDM_FAMILY: MessageSchema[] = [
  MDM_T01_SCHEMA,
  ...wrappers(MDM_T01_SCHEMA, MDM_T01_EVENTS),
  MDM_T02_SCHEMA,
  ...wrappers(MDM_T02_SCHEMA, MDM_T02_EVENTS),
];
