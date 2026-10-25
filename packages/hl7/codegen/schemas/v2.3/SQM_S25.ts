import type { MessageSchema, SegmentGroup } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/** The RESOURCES group of SQM^S25 and SQR^S25: RGS followed by the resource groups, each `AIx` + `extra`. */
export function scheduleResources(extra: (name: string) => ReturnType<typeof opt>): SegmentGroup {
  return group("RESOURCES", "required", "repeating", [
    req("RGS"),
    group("SERVICE", "optional", "repeating", [req("AIS"), extra("AIS")]),
    group("GENERAL_RESOURCE", "optional", "repeating", [req("AIG"), extra("AIG")]),
    group("PERSONNEL_RESOURCE", "optional", "repeating", [req("AIP"), extra("AIP")]),
    group("LOCATION_RESOURCE", "optional", "repeating", [req("AIL"), extra("AIL")]),
  ]);
}

/**
 * SQM^S25 - Schedule Query (HL7 v2.3, chapter 10 section 10.4.1).
 *
 * MSH QRD [QRF] [ REQUEST: ARQ [APR] [PID] { RESOURCES: RGS [{ SERVICE: AIS [APR] }] [{ GENERAL_RESOURCE: AIG [APR] }]
 *   [{ PERSONNEL_RESOURCE: AIP [APR] }] [{ LOCATION_RESOURCE: AIL [APR] }] } ] [DSC]
 *
 * The REQUEST group is inlined, so `appointmentRequest`, `patient` and `resources` sit at the top
 * level. Unchanged through v2.5.1.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/SQM_S25
 */
export const SQM_S25_SCHEMA: MessageSchema = {
  messageType: "SQM",
  triggerEvent: "S25",
  version: "2.3",
  structure: [
    req("MSH"),
    req("QRD"),
    opt("QRF"),
    group("REQUEST", "optional", "single", [
      req("ARQ"),
      opt("APR"),
      opt("PID"),
      scheduleResources(() => opt("APR")),
    ], { inline: true }),
    opt("DSC"),
  ],
};

/**
 * SQR^S25 - Schedule Query Response (HL7 v2.3, chapter 10 section 10.4.1).
 *
 * MSH MSA [ERR] QAK [{ SCHEDULE: SCH [{NTE}] [ PATIENT: PID [PV1] [PV2] [DG1] ] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }]
 *   [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] } }] [DSC]
 *
 * The PATIENT group of each schedule is inlined. Unchanged in v2.4; v2.5 makes ERR repeat and adds
 * [{TQ1}] after SCH (see the v2.5 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/SQR_S25
 */
export const SQR_S25_SCHEMA: MessageSchema = {
  messageType: "SQR",
  triggerEvent: "S25",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    group("SCHEDULE", "optional", "repeating", [
      req("SCH"),
      optList("NTE"),
      group("PATIENT", "optional", "single", [req("PID"), opt("PV1"), opt("PV2"), opt("DG1")], { inline: true }),
      scheduleResources(() => optList("NTE")),
    ]),
    opt("DSC"),
  ],
};

