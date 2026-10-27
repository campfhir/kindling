/**
 * Message structure for PEX^P07 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{PRT}] { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] [{PRT}] }] [{PRB}] [{ OBSERVATION: OBX [{PRT}] }] [{NTE}] [ ASSOCIATED_PERSON: NK1 [{GSP}] [{GSR}] [ ASSOCIATED_RX_ORDER: RXE [{PRT}] { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] [{PRT}] }] [{PRB}] [{ ASSOCIATED_OBSERVATION: OBX [{PRT}] }] ] [{ STUDY: CSR [{CSP}] }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PEX^P07 (HL7 v2.9.1), in order. */
export const PEX_P07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  { name: "NTE", required: false, repeating: true },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
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
                  { name: "PRT", required: false, repeating: true },
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
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "PRB", required: false, repeating: true },
              {
                name: "OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "NTE", required: false, repeating: true },
              {
                name: "ASSOCIATED_PERSON",
                required: false,
                repeating: false,
                segments: [
                  { name: "NK1", required: true, repeating: false },
                  { name: "GSP", required: false, repeating: true },
                  { name: "GSR", required: false, repeating: true },
                  {
                    name: "ASSOCIATED_RX_ORDER",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "RXE", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
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
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "PRB", required: false, repeating: true },
                  {
                    name: "ASSOCIATED_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
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
