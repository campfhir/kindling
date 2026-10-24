import { MessageSchema } from "../../../src/types/schema";
import { BAR_P02_SCHEMA as P02_V23, BAR_P06_SCHEMA as P06_V23 } from "../v2.3/BAR_P01";

/**
 * BAR^P01 - Add Patient Accounts (HL7 v2.5.1, identical to v2.5)
 *
 * MSH [{SFT}] EVN PID [PD1] [{ROL}] { [PV1] [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 *   [{ PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] }
 *
 * P05 (update account) adds [ABS] [{BLC}] [RMI] at the end of each visit. The v2.4 shapes are
 * the same without SFT; the v2.4 and v2.5 builders and parsers are hand-written in
 * src/<kind>/v2.4 and v2.5. Checked on hl7-definition.caristix.com (v2.4, v2.5.1) and HAPI v24.
 */
export const BAR_P01_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P01",
  version: "2.5.1",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "SFT", required: false, repeating: true },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PD1", required: false, repeating: false },
    { name: "ROL", required: false, repeating: true },
    {
      name: "VISIT",
      required: true,
      repeating: true,
      exportTypeName: "ParsedBARVisit",
      segments: [
        { name: "PV1", required: false, repeating: false },
        { name: "PV2", required: false, repeating: false },
        { name: "ROL", required: false, repeating: true },
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
            { name: "IN3", required: false, repeating: true },
            { name: "ROL", required: false, repeating: true },
          ],
        },
        { name: "ACC", required: false, repeating: false },
        { name: "UB1", required: false, repeating: false },
        { name: "UB2", required: false, repeating: false },
      ],
    },
  ],
};

/** BAR^P05 - Update Account: P01 plus [ABS] [{BLC}] [RMI] closing each visit. */
export const BAR_P05_SCHEMA: MessageSchema = {
  ...BAR_P01_SCHEMA,
  triggerEvent: "P05",
  structure: [
    ...BAR_P01_SCHEMA.structure.slice(0, -1),
    {
      name: "VISIT",
      required: true,
      repeating: true,
      exportTypeName: "ParsedBARVisit",
      segments: [
        { name: "PV1", required: false, repeating: false },
        { name: "PV2", required: false, repeating: false },
        { name: "ROL", required: false, repeating: true },
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
            { name: "IN3", required: false, repeating: true },
            { name: "ROL", required: false, repeating: true },
          ],
        },
        { name: "ACC", required: false, repeating: false },
        { name: "UB1", required: false, repeating: false },
        { name: "UB2", required: false, repeating: false },
        { name: "ABS", required: false, repeating: false },
        { name: "BLC", required: false, repeating: true },
        { name: "RMI", required: false, repeating: false },
      ],
    },
  ],
};

/** BAR^P02 - Purge Patient Accounts (v2.5.1): v2.3 structure plus [{SFT}]. */
export const BAR_P02_SCHEMA: MessageSchema = {
  ...P02_V23,
  version: "2.5.1",
  structure: [P02_V23.structure[0], { name: "SFT", required: false, repeating: true }, ...P02_V23.structure.slice(1)],
};

/** BAR^P06 - End Account (v2.5.1): v2.3 structure plus [{SFT}]. */
export const BAR_P06_SCHEMA: MessageSchema = {
  ...P06_V23,
  version: "2.5.1",
  structure: [P06_V23.structure[0], { name: "SFT", required: false, repeating: true }, ...P06_V23.structure.slice(1)],
};
