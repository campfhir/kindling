import type { MessageSchema } from "../../../src/types/schema";
import { wrappers } from "../helpers";

/**
 * SRM^S01 - Schedule Request: New Appointment Booking (HL7 v2.3)
 *
 * MSH ARQ [APR] [{NTE}] [{ PID [PV1] [PV2] [{OBX}] [{DG1}] }]
 * { RGS [{ AIS [APR] [{NTE}] }] [{ AIG [APR] [{NTE}] }] [{ AIL [APR] [{NTE}] }] [{ AIP [APR] [{NTE}] }] }
 *
 * S01–S11 share this structure, which is unchanged through v2.5.1 (checked on
 * hl7-definition.caristix.com for v2.3 and v2.5.1, and HAPI v23/v251).
 */
export const SRM_S01_SCHEMA: MessageSchema = {
  messageType: "SRM",
  triggerEvent: "S01",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "ARQ", required: true, repeating: false },
    { name: "APR", required: false, repeating: false },
    { name: "NTE", required: false, repeating: true },
    {
      name: "PATIENT",
      required: false,
      repeating: true,
      exportTypeName: "ParsedSRMPatient",
      segments: [
        { name: "PID", required: true, repeating: false },
        { name: "PV1", required: false, repeating: false },
        { name: "PV2", required: false, repeating: false },
        { name: "OBX", required: false, repeating: true },
        { name: "DG1", required: false, repeating: true },
      ],
    },
    {
      name: "RESOURCES",
      required: true,
      repeating: true,
      exportTypeName: "ParsedSRMResources",
      segments: [
        { name: "RGS", required: true, repeating: false },
        { name: "SERVICE", required: false, repeating: true, exportTypeName: "ParsedSRMService",
          segments: [{ name: "AIS", required: true, repeating: false }, { name: "APR", required: false, repeating: false }, { name: "NTE", required: false, repeating: true }] },
        { name: "GENERAL_RESOURCE", required: false, repeating: true, exportTypeName: "ParsedSRMGeneralResource",
          segments: [{ name: "AIG", required: true, repeating: false }, { name: "APR", required: false, repeating: false }, { name: "NTE", required: false, repeating: true }] },
        { name: "LOCATION_RESOURCE", required: false, repeating: true, exportTypeName: "ParsedSRMLocationResource",
          segments: [{ name: "AIL", required: true, repeating: false }, { name: "APR", required: false, repeating: false }, { name: "NTE", required: false, repeating: true }] },
        { name: "PERSONNEL_RESOURCE", required: false, repeating: true, exportTypeName: "ParsedSRMPersonnelResource",
          segments: [{ name: "AIP", required: true, repeating: false }, { name: "APR", required: false, repeating: false }, { name: "NTE", required: false, repeating: true }] },
      ],
    },
  ],
};

/** The trigger events that share the S01 structure. */
export const SRM_EVENTS = ["S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "S11"];

/** S01 and the events wrapping it. */
export const SRM_FAMILY: MessageSchema[] = [SRM_S01_SCHEMA, ...wrappers(SRM_S01_SCHEMA, SRM_EVENTS)];
