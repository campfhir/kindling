import { MessageSchema } from "../../../src/types/schema";

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

export const SRM_S02_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S02", baseMessage: "SRM_S01" };
export const SRM_S03_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S03", baseMessage: "SRM_S01" };
export const SRM_S04_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S04", baseMessage: "SRM_S01" };
export const SRM_S05_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S05", baseMessage: "SRM_S01" };
export const SRM_S06_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S06", baseMessage: "SRM_S01" };
export const SRM_S07_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S07", baseMessage: "SRM_S01" };
export const SRM_S08_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S08", baseMessage: "SRM_S01" };
export const SRM_S09_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S09", baseMessage: "SRM_S01" };
export const SRM_S10_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S10", baseMessage: "SRM_S01" };
export const SRM_S11_SCHEMA: MessageSchema = { ...SRM_S01_SCHEMA, triggerEvent: "S11", baseMessage: "SRM_S01" };
