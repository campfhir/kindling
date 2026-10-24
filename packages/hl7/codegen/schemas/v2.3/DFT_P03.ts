import { MessageSchema } from "../../../src/types/schema";

/**
 * DFT^P03 - Post Detail Financial Transaction (HL7 v2.3)
 *
 * MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FT1 [{ PR1 [{ROL}] }] }
 * [{DG1}] [DRG] [{GT1}] [{ IN1 [IN2] [IN3] }] [ACC]
 *
 * Checked on hl7-definition.caristix.com (v2.3) and HAPI v23. v2.4 is identical; v2.5/v2.5.1 have
 * their own structure (see the v2.5.1 schema).
 */
export const DFT_P03_SCHEMA: MessageSchema = {
  messageType: "DFT",
  triggerEvent: "P03",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PD1", required: false, repeating: false },
    { name: "PV1", required: false, repeating: false },
    { name: "PV2", required: false, repeating: false },
    { name: "DB1", required: false, repeating: true },
    { name: "OBX", required: false, repeating: true },
    {
      name: "FINANCIAL",
      required: true,
      repeating: true,
      exportTypeName: "ParsedDFTFinancial",
      segments: [
        { name: "FT1", required: true, repeating: false },
        {
          name: "FINANCIAL_PROCEDURE",
          required: false,
          repeating: true,
          exportTypeName: "ParsedDFTProcedure",
          segments: [
            { name: "PR1", required: true, repeating: false },
            { name: "ROL", required: false, repeating: true },
          ],
        },
      ],
    },
    { name: "DG1", required: false, repeating: true },
    { name: "DRG", required: false, repeating: false },
    { name: "GT1", required: false, repeating: true },
    {
      name: "INSURANCE",
      required: false,
      repeating: true,
      exportTypeName: "ParsedDFTInsurance",
      segments: [
        { name: "IN1", required: true, repeating: false },
        { name: "IN2", required: false, repeating: false },
        { name: "IN3", required: false, repeating: false },
      ],
    },
    { name: "ACC", required: false, repeating: false },
  ],
};
