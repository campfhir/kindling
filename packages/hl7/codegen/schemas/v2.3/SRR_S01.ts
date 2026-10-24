import type { MessageSchema } from "../../../src/types/schema";
import { wrappers } from "../helpers";

/**
 * SRR^S01 - Scheduled Request Response: New Appointment Booking (HL7 v2.3)
 *
 * MSH MSA [ERR] [ SCH [{NTE}] [{ PID [PV1] [PV2] [{DG1}] }]
 *   { RGS [{ AIS [{NTE}] }] [{ AIG [{NTE}] }] [{ AIL [{NTE}] }] [{ AIP [{NTE}] }] } ]
 *
 * The RESOURCES groups sit inside the optional SCHEDULE group. S01–S11 share this structure;
 * v2.4 is identical, v2.5/v2.5.1 make ERR repeat and add [{TQ1}] after SCH (see the v2.5.1
 * schema). Checked on hl7-definition.caristix.com (v2.3, v2.4, v2.5, v2.5.1) and HAPI v23/v251.
 */
export const SRR_S01_SCHEMA: MessageSchema = {
  messageType: "SRR",
  triggerEvent: "S01",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "MSA", required: true, repeating: false },
    { name: "ERR", required: false, repeating: false },
    {
      name: "SCHEDULE",
      required: false,
      repeating: false,
      exportTypeName: "ParsedSRRSchedule",
      segments: [
        { name: "SCH", required: true, repeating: false },
        { name: "NTE", required: false, repeating: true },
        {
          name: "PATIENT",
          required: false,
          repeating: true,
          exportTypeName: "ParsedSRRPatient",
          segments: [
            { name: "PID", required: true, repeating: false },
            { name: "PV1", required: false, repeating: false },
            { name: "PV2", required: false, repeating: false },
            { name: "DG1", required: false, repeating: true },
          ],
        },
        {
        name: "RESOURCES",
        required: true,
        repeating: true,
        exportTypeName: "ParsedSRRResources",
        segments: [
          { name: "RGS", required: true, repeating: false },
          { name: "SERVICE", required: false, repeating: true, exportTypeName: "ParsedSRRService",
            segments: [{ name: "AIS", required: true, repeating: false }, { name: "NTE", required: false, repeating: true }] },
          { name: "GENERAL_RESOURCE", required: false, repeating: true, exportTypeName: "ParsedSRRGeneralResource",
            segments: [{ name: "AIG", required: true, repeating: false }, { name: "NTE", required: false, repeating: true }] },
          { name: "LOCATION_RESOURCE", required: false, repeating: true, exportTypeName: "ParsedSRRLocationResource",
            segments: [{ name: "AIL", required: true, repeating: false }, { name: "NTE", required: false, repeating: true }] },
          { name: "PERSONNEL_RESOURCE", required: false, repeating: true, exportTypeName: "ParsedSRRPersonnelResource",
            segments: [{ name: "AIP", required: true, repeating: false }, { name: "NTE", required: false, repeating: true }] },
        ],
      },
      ],
    },
  ],
};

/** The trigger events that share the S01 structure. */
export const SRR_EVENTS = ["S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "S11"];

/** S01 and the events wrapping it. */
export const SRR_FAMILY: MessageSchema[] = [SRR_S01_SCHEMA, ...wrappers(SRR_S01_SCHEMA, SRR_EVENTS)];
