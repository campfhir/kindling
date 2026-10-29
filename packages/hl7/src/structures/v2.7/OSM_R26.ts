/**
 * Message structure for OSM^R26 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { SHIPMENT: SHP {PRT} [{ SHIPPING_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{PRT}] [{ SPECIMEN: SPM [{PRT}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] [ SUBJECT_PERSON_ANIMAL_IDENTIFICATION: PID [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [{NK1}] ] [ SUBJECT_POPULATION_LOCATION_IDENTIFICATION: PV1 [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{PRT}] }] [PID] [{PRT}] [{NK1}] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OSM^R26 (HL7 v2.7), in order. */
export const OSM_R26_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
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
                name: "SUBJECT_PERSON_ANIMAL_IDENTIFICATION",
                required: false,
                repeating: false,
                segments: [
                  { name: "PID", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "PATIENT_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "NK1", required: false, repeating: true },
                ],
              },
              {
                name: "SUBJECT_POPULATION_LOCATION_IDENTIFICATION",
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
                  { name: "NK1", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
