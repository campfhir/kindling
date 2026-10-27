/**
 * Message structure for OSM^R26 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { SHIPMENT: SHP {PRT} [{ SHIPPING_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{PRT}] [{ SPECIMEN: SPM [{PRT}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] [ SUBJECT_PERSON_OR_ANIMAL_IDENTIFICATION: PID [{PRT}] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] ] [ SUBJECT_POPULATION_OR_LOCATION_IDENTIFICATION: PV1 [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{PRT}] }] [PID] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OSM^R26 (HL7 v2.9.1), in order. */
export const OSM_R26_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "SHIPMENT",
    required: true,
    repeating: true,
    segments: [
      { name: "SHP", required: true, repeating: false },
      { name: "PRT", required: true, repeating: true },
      {
        name: "SHIPPING_OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      {
        name: "PACKAGE",
        required: true,
        repeating: true,
        segments: [
          { name: "PAC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "SPECIMEN_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              {
                name: "CONTAINER",
                required: false,
                repeating: true,
                segments: [
                  { name: "SAC", required: true, repeating: false },
                  {
                    name: "CONTAINER_OBSERVATION",
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
                name: "SUBJECT_PERSON_OR_ANIMAL_IDENTIFICATION",
                required: false,
                repeating: false,
                segments: [
                  { name: "PID", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  { name: "ARV", required: false, repeating: true },
                  {
                    name: "PATIENT_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  {
                    name: "NEXT_OF_KIN",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "NK1", required: true, repeating: false },
                      { name: "GSP", required: false, repeating: true },
                      { name: "GSR", required: false, repeating: true },
                    ],
                  },
                ],
              },
              {
                name: "SUBJECT_POPULATION_OR_LOCATION_IDENTIFICATION",
                required: false,
                repeating: false,
                segments: [
                  { name: "PV1", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "PATIENT_VISIT_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "PID", required: false, repeating: false },
                  { name: "PRT", required: false, repeating: true, as: "prt2" },
                  {
                    name: "NEXT_OF_KIN",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "NK1", required: true, repeating: false },
                      { name: "GSP", required: false, repeating: true },
                      { name: "GSR", required: false, repeating: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
