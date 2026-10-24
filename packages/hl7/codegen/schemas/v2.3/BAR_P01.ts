import { MessageSchema } from "../../../src/types/schema";

/**
 * BAR^P01 - Add Patient Accounts (HL7 v2.3)
 *
 * MSH EVN PID [PD1] { [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PR1 [{ROL}] }]
 *   [{GT1}] [{NK1}] [{ IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] }
 *
 * Every segment of the repeating VISIT group is optional, so the parser starts a new visit when
 * a segment appears out of group order (for example a second PV1). P05 (update account) has the
 * same structure. Checked on hl7-definition.caristix.com (v2.3) and HAPI v23. v2.4 and v2.5 have
 * their own shapes (see the v2.5.1 schema).
 */
export const BAR_P01_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P01",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PD1", required: false, repeating: false },
    {
      name: "VISIT",
      required: true,
      repeating: true,
      exportTypeName: "ParsedBARVisit",
      segments: [
        { name: "PV1", required: false, repeating: false },
        { name: "PV2", required: false, repeating: false },
        { name: "DB1", required: false, repeating: true },
        { name: "OBX", required: false, repeating: true },
        { name: "AL1", required: false, repeating: true },
        { name: "DG1", required: false, repeating: true },
        { name: "DRG", required: false, repeating: false },
        {
          name: "PROCEDURE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedBARProcedure",
          segments: [
            { name: "PR1", required: true, repeating: false },
            { name: "ROL", required: false, repeating: true },
          ],
        },
        { name: "GT1", required: false, repeating: true },
        { name: "NK1", required: false, repeating: true },
        {
          name: "INSURANCE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedBARInsurance",
          segments: [
            { name: "IN1", required: true, repeating: false },
            { name: "IN2", required: false, repeating: false },
            { name: "IN3", required: false, repeating: false },
          ],
        },
        { name: "ACC", required: false, repeating: false },
        { name: "UB1", required: false, repeating: false },
        { name: "UB2", required: false, repeating: false },
      ],
    },
  ],
};

/** BAR^P05 - Update Account: same structure as P01. */
export const BAR_P05_SCHEMA: MessageSchema = { ...BAR_P01_SCHEMA, triggerEvent: "P05", baseMessage: "BAR_P01" };

/** BAR^P02 - Purge Patient Accounts (HL7 v2.3): MSH EVN { PID [PD1] [PV1] [{DB1}] } */
export const BAR_P02_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P02",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "EVN", required: true, repeating: false },
    {
      name: "PATIENT",
      required: true,
      repeating: true,
      exportTypeName: "ParsedBARPurgePatient",
      segments: [
        { name: "PID", required: true, repeating: false },
        { name: "PD1", required: false, repeating: false },
        { name: "PV1", required: false, repeating: false },
        { name: "DB1", required: false, repeating: true },
      ],
    },
  ],
};

/** BAR^P06 - End Account (HL7 v2.3): MSH EVN { PID [PV1] } */
export const BAR_P06_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P06",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "EVN", required: true, repeating: false },
    {
      name: "PATIENT",
      required: true,
      repeating: true,
      exportTypeName: "ParsedBAREndPatient",
      segments: [
        { name: "PID", required: true, repeating: false },
        { name: "PV1", required: false, repeating: false },
      ],
    },
  ],
};
