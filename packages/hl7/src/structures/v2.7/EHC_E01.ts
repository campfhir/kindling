/**
 * Message structure for EHC^E01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION: IVC [PYE] [{CTD}] [AUT] [{LOC}] [{ROL}] { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG [{LOC}] [{ROL}] [{ PATIENT_INFO: PID [PV1] [PV2] [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] }] { PRODUCT_SERVICE_LINE_ITEM: PSL [{NTE}] [{ADJ}] [AUT] [{LOC}] [{ROL}] } [{ PROCEDURE: PR1 [{NTE}] [{ROL}] }] [{ INVOICE_PROCESSING: IPR }] } } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E01 (HL7 v2.7), in order. */
export const EHC_E01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "INVOICE_INFORMATION",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "PYE", required: false, repeating: false },
      { name: "CTD", required: false, repeating: true },
      { name: "AUT", required: false, repeating: false },
      { name: "LOC", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: true,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PRODUCT_SERVICE_GROUP",
            required: true,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              { name: "LOC", required: false, repeating: true },
              { name: "ROL", required: false, repeating: true },
              {
                name: "PATIENT_INFO",
                required: false,
                repeating: true,
                segments: [
                  { name: "PID", required: true, repeating: false },
                  { name: "PV1", required: false, repeating: false },
                  { name: "PV2", required: false, repeating: false },
                  { name: "ACC", required: false, repeating: true },
                  {
                    name: "INSURANCE",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "IN1", required: true, repeating: false },
                      { name: "IN2", required: false, repeating: false },
                    ],
                  },
                  {
                    name: "DIAGNOSIS",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "DG1", required: true, repeating: false },
                      { name: "NTE", required: false, repeating: true },
                    ],
                  },
                  { name: "OBX", required: false, repeating: true },
                ],
              },
              {
                name: "PRODUCT_SERVICE_LINE_ITEM",
                required: true,
                repeating: true,
                segments: [
                  { name: "PSL", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  { name: "ADJ", required: false, repeating: true },
                  { name: "AUT", required: false, repeating: false },
                  { name: "LOC", required: false, repeating: true },
                  { name: "ROL", required: false, repeating: true },
                ],
              },
              {
                name: "PROCEDURE",
                required: false,
                repeating: true,
                segments: [
                  { name: "PR1", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  { name: "ROL", required: false, repeating: true },
                ],
              },
              {
                name: "INVOICE_PROCESSING",
                required: false,
                repeating: true,
                segments: [
                  { name: "IPR", required: true, repeating: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
