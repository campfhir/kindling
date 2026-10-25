import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, opt, optList, req } from "../helpers";

/**
 * ORU^R01 - Unsolicited Observation Result (HL7 v2.5, identical in v2.5.1; chapter 7).
 *
 * MSH [{SFT}] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [ VISIT: PV1 [PV2] ] ]
 *   { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{NTE}] }]
 *     [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{OBX}] }] } } [DSC]
 *
 * The PATIENT and VISIT groups are inlined. Compared with v2.3: SFT, NTE before NK1, the TIMING
 * QTY groups, CTD, FT1 and SPECIMEN groups.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORU_R01
 */
export const ORU_R01_SCHEMA: MessageSchema = {
  messageType: "ORU",
  triggerEvent: "R01",
  version: "2.5",
  structure: [
    req("MSH"),
    SFT,
    group("PATIENT_RESULT", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NTE"),
        optList("NK1"),
        group("VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
      ], { inline: true }),
      group("ORDER_OBSERVATION", "required", "repeating", [
        opt("ORC"),
        req("OBR"),
        optList("NTE"),
        group("TIMING_QTY", "optional", "repeating", [req("TQ1"), optList("TQ2")], { as: "timings", exportTypeName: "ParsedTimingQty", builderTypeName: "TimingQty" }),
        opt("CTD"),
        group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: "ParsedObservation", builderTypeName: "ObservationGroup" }),
        optList("FT1"),
        optList("CTI"),
        group("SPECIMEN", "optional", "repeating", [req("SPM"), optList("OBX")], { exportTypeName: "ParsedSpecimen", builderTypeName: "Specimen" }),
      ], { builderTypeName: "OrderObservation" }),
    ], { builderTypeName: "PatientResult" }),
    opt("DSC"),
  ],
};
