import type { MessageSchema } from "../../../src/types/schema";
import { wrappers } from "../helpers";

/**
 * SIU^S12 - Notification of New Appointment Booking (HL7 v2.3)
 * S13: Rescheduling  S14: Modification  S15: Cancellation
 * S16: Discontinuation  S17: Deletion  S18–S24: Addition/Modification/Cancellation/Discontinuation/
 * Deletion of service or resource, Blocked and Opened schedule time slots  S26: Patient No-Show
 *
 * All SIU trigger events share the same message structure (checked on hl7-definition.caristix.com
 * for S12, S18 and S24 in v2.3). Caristix lists no PD1 in the v2.3 PATIENT group; it appears in
 * v2.5, where [{TQ1}] also follows SCH. Both are kept as optional here, TQ1 is not modelled yet.
 */
export const SIU_S12_SCHEMA: MessageSchema = {
  messageType: "SIU",
  triggerEvent: "S12",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "SCH", required: true, repeating: false },
    { name: "NTE", required: false, repeating: true },
    {
      name: "PATIENT",
      required: false,
      repeating: true,
      exportTypeName: "ParsedSIUPatient",
      segments: [
        { name: "PID", required: true, repeating: false },
        { name: "PD1", required: false, repeating: false },
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
      exportTypeName: "ParsedSIUResources",
      segments: [
        { name: "RGS", required: true, repeating: false },
        {
          name: "SERVICE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedSIUService",
          segments: [
            { name: "AIS", required: true, repeating: false },
            { name: "NTE", required: false, repeating: true },
          ],
        },
        {
          name: "GENERAL_RESOURCE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedSIUGeneralResource",
          segments: [
            { name: "AIG", required: true, repeating: false },
            { name: "NTE", required: false, repeating: true },
          ],
        },
        {
          name: "LOCATION_RESOURCE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedSIULocationResource",
          segments: [
            { name: "AIL", required: true, repeating: false },
            { name: "NTE", required: false, repeating: true },
          ],
        },
        {
          name: "PERSONNEL_RESOURCE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedSIUPersonnelResource",
          segments: [
            { name: "AIP", required: true, repeating: false },
            { name: "NTE", required: false, repeating: true },
          ],
        },
      ],
    },
  ],
};

/** The trigger events that share the S12 structure. */
export const SIU_EVENTS = ["S13", "S14", "S15", "S16", "S17", "S18", "S19", "S20", "S21", "S22", "S23", "S24", "S26"];

/** S12 and the events wrapping it. */
export const SIU_FAMILY: MessageSchema[] = [SIU_S12_SCHEMA, ...wrappers(SIU_S12_SCHEMA, SIU_EVENTS)];
