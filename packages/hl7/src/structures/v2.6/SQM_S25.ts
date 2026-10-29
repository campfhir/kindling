/**
 * Message structure for SQM^S25 messages (HL7 v2.6).
 *
 * Structure: MSH QRD [QRF] [ REQUEST: ARQ [APR] [PID] { RESOURCES: RGS [{ SERVICE: AIS [APR] }] [{ GENERAL_RESOURCE: AIG [APR] }] [{ PERSONNEL_RESOURCE: AIP [APR] }] [{ LOCATION_RESOURCE: AIL [APR] }] } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SQM^S25 (HL7 v2.6), in order. */
export const SQM_S25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "REQUEST",
    required: false,
    repeating: false,
    segments: [
      { name: "ARQ", required: true, repeating: false },
      { name: "APR", required: false, repeating: false },
      { name: "PID", required: false, repeating: false },
      {
        name: "RESOURCES",
        required: true,
        repeating: true,
        segments: [
          { name: "RGS", required: true, repeating: false },
          {
            name: "SERVICE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIS", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
          {
            name: "GENERAL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIG", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
          {
            name: "PERSONNEL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIP", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
          {
            name: "LOCATION_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIL", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
