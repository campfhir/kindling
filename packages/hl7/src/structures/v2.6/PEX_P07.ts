/**
 * Message structure for PEX^P07 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] }] [{PRB}] [{OBX}] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] }] [{PRB}] [{OBX}] ] [{ STUDY: CSR [{CSP}] }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PEX^P07 (HL7 v2.6), in order. */
export const PEX_P07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  {
    name: "EXPERIENCE",
    required: true,
    repeating: true,
    segments: [
      { name: "PES", required: true, repeating: false },
      {
        name: "PEX_OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          { name: "PEO", required: true, repeating: false },
          {
            name: "PEX_CAUSE",
            required: true,
            repeating: true,
            segments: [
              { name: "PCR", required: true, repeating: false },
              {
                name: "RX_ORDER",
                required: false,
                repeating: false,
                segments: [
                  { name: "RXE", required: true, repeating: false },
                  {
                    name: "TIMING_QTY",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "TQ1", required: true, repeating: false },
                      { name: "TQ2", required: false, repeating: true },
                    ],
                  },
                  { name: "RXR", required: false, repeating: true },
                ],
              },
              {
                name: "RX_ADMINISTRATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "RXA", required: true, repeating: false },
                  { name: "RXR", required: false, repeating: false },
                ],
              },
              { name: "PRB", required: false, repeating: true },
              { name: "OBX", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
              {
                name: "ASSOCIATED_PERSON",
                required: false,
                repeating: false,
                segments: [
                  { name: "NK1", required: true, repeating: false },
                  {
                    name: "ASSOCIATED_RX_ORDER",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "RXE", required: true, repeating: false },
                      {
                        name: "NK1_TIMING_QTY",
                        required: true,
                        repeating: true,
                        segments: [
                          { name: "TQ1", required: true, repeating: false },
                          { name: "TQ2", required: false, repeating: true },
                        ],
                      },
                      { name: "RXR", required: false, repeating: true },
                    ],
                  },
                  {
                    name: "ASSOCIATED_RX_ADMIN",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "RXA", required: true, repeating: false },
                      { name: "RXR", required: false, repeating: false },
                    ],
                  },
                  { name: "PRB", required: false, repeating: true },
                  { name: "OBX", required: false, repeating: true },
                ],
              },
              {
                name: "STUDY",
                required: false,
                repeating: true,
                segments: [
                  { name: "CSR", required: true, repeating: false },
                  { name: "CSP", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
