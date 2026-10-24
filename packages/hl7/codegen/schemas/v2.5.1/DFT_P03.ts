import { MessageSchema } from "../../../src/types/schema";

/**
 * DFT^P03 - Post Detail Financial Transactions (HL7 v2.5.1, identical to v2.5)
 *
 * MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}]
 * [{ COMMON ORDER: [ORC] [{ TQ1 [{TQ2}] }] [ OBR [{NTE}] ] [{ OBX [{NTE}] }] }]
 * { FINANCIAL: FT1 [NTE] [{ PR1 [{ROL}] }] [{ FINANCIAL COMMON ORDER }] }
 * [{DG1}] [DRG] [{GT1}] [{ IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * The v2.5 builder and parser are hand-written in src/<kind>/v2.5.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/DFT_P03
 */
export const DFT_P03_SCHEMA: MessageSchema = {
  messageType: "DFT",
  triggerEvent: "P03",
  version: "2.5.1",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "SFT", required: false, repeating: true },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PD1", required: false, repeating: false },
    { name: "ROL", required: false, repeating: true },
    { name: "PV1", required: false, repeating: false },
    { name: "PV2", required: false, repeating: false },
    { name: "ROL", required: false, repeating: true },
    { name: "DB1", required: false, repeating: true },
    {
      name: "COMMON_ORDER",
      required: false,
      repeating: true,
      exportTypeName: "ParsedDFTOrder",
      segments: [
        { name: "ORC", required: false, repeating: false },
        {
          name: "TIMING_QUANTITY",
          required: false,
          repeating: true,
          exportTypeName: "ParsedDFTTiming",
          segments: [
            { name: "TQ1", required: true, repeating: false },
            { name: "TQ2", required: false, repeating: true },
          ],
        },
        { name: "OBR", required: false, repeating: false },
        { name: "NTE", required: false, repeating: true },
        {
          name: "OBSERVATION",
          required: false,
          repeating: true,
          exportTypeName: "ParsedDFTObservation",
          segments: [
            { name: "OBX", required: true, repeating: false },
            { name: "NTE", required: false, repeating: true },
          ],
        },
      ],
    },
    {
      name: "FINANCIAL",
      required: true,
      repeating: true,
      exportTypeName: "ParsedDFTFinancial",
      segments: [
        { name: "FT1", required: true, repeating: false },
        { name: "NTE", required: false, repeating: false },
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
        {
      name: "FINANCIAL_COMMON_ORDER",
      required: false,
      repeating: true,
      exportTypeName: "ParsedDFTFinancialOrder",
      segments: [
        { name: "ORC", required: false, repeating: false },
        {
          name: "FINANCIAL_TIMING_QUANTITY",
          required: false,
          repeating: true,
          exportTypeName: "ParsedDFTFinancialTiming",
          segments: [
            { name: "TQ1", required: true, repeating: false },
            { name: "TQ2", required: false, repeating: true },
          ],
        },
        { name: "OBR", required: false, repeating: false },
        { name: "NTE", required: false, repeating: true },
        {
          name: "FINANCIAL_OBSERVATION",
          required: false,
          repeating: true,
          exportTypeName: "ParsedDFTFinancialObservation",
          segments: [
            { name: "OBX", required: true, repeating: false },
            { name: "NTE", required: false, repeating: true },
          ],
        },
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
        { name: "IN3", required: false, repeating: true },
        { name: "ROL", required: false, repeating: true },
      ],
    },
    { name: "ACC", required: false, repeating: false },
  ],
};
