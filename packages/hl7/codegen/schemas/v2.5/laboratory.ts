import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The chapter 4 and 7 clinical order messages of HL7 v2.5: OMG/ORG, OML/ORL, OMP/ORP and OUL gain
 * [{ TIMING: TQ1 [{TQ2}] }] after ORC (TIMING_PRIOR in the prior results), SPECIMEN groups
 * (SPM [{OBX}] [{ CONTAINER: SAC [{OBX}] }]) and the acknowledgments put [{SFT}] after [{ERR}].
 * New in 2.5: OML^O33/ORL^O34 (specimen-centric) and OML^O35/ORL^O36 (specimen shipment-centric),
 * OUL^R22 (specimen oriented), OUL^R23 (specimen container oriented) and OUL^R24 (order oriented).
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch04.html (4.4.6–4.4.11, 4.6.3) and ch07.html (7.3.5–7.3.8),
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMG_O19 … OUL_R24, HAPI v25.
 */
/**
 * OMG^O19 - General Clinical Order (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMG_O19; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OMG_O19_SCHEMA: MessageSchema = {
  messageType: "OMG",
  triggerEvent: "O19",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      optList("NK1"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
      group("INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        opt("IN3"),
      ]),
      opt("GT1"),
      optList("AL1"),
    ]),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("TIMING", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      req("OBR"),
      optList("NTE"),
      opt("CTD"),
      optList("DG1"),
      group("OBSERVATION", "optional", "repeating", [
        req("OBX"),
        optList("NTE"),
      ]),
      group("SPECIMEN", "optional", "repeating", [
        req("SPM"),
        optList("OBX"),
        group("CONTAINER", "optional", "repeating", [
          req("SAC"),
          optList("OBX"),
        ]),
      ]),
      group("PRIOR_RESULT", "optional", "repeating", [
        group("PATIENT_PRIOR", "optional", "single", [
          req("PID"),
          opt("PD1"),
        ]),
        group("PATIENT_VISIT_PRIOR", "optional", "single", [
          req("PV1"),
          opt("PV2"),
        ]),
        optList("AL1"),
        group("ORDER_PRIOR", "required", "repeating", [
          opt("ORC"),
          req("OBR"),
          group("TIMING_PRIOR", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          optList("NTE"),
          opt("CTD"),
          group("OBSERVATION_PRIOR", "required", "repeating", [
            req("OBX"),
            optList("NTE"),
          ]),
        ]),
      ]),
      optList("FT1"),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};

/**
 * ORG^O20 - General Clinical Order Acknowledgement (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORG_O20; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORG_O20_SCHEMA: MessageSchema = {
  messageType: "ORG",
  triggerEvent: "O20",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        optList("NTE"),
      ]),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        opt("OBR"),
        optList("NTE"),
        optList("CTI"),
        group("SPECIMEN", "optional", "repeating", [
          req("SPM"),
          optList("SAC"),
        ]),
      ]),
    ]),
  ],
};

/**
 * OML^O21 - Laboratory Order (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OML_O21; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OML_O21_SCHEMA: MessageSchema = {
  messageType: "OML",
  triggerEvent: "O21",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      optList("NK1"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
      group("INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        opt("IN3"),
      ]),
      opt("GT1"),
      optList("AL1"),
    ]),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("TIMING", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      group("OBSERVATION_REQUEST", "optional", "single", [
        req("OBR"),
        opt("TCD"),
        optList("NTE"),
        opt("CTD"),
        optList("DG1"),
        group("OBSERVATION", "optional", "repeating", [
          req("OBX"),
          opt("TCD"),
          optList("NTE"),
        ]),
        group("SPECIMEN", "optional", "repeating", [
          req("SPM"),
          optList("OBX"),
          group("CONTAINER", "optional", "repeating", [
            req("SAC"),
            optList("OBX"),
          ]),
        ]),
        group("PRIOR_RESULT", "optional", "repeating", [
          group("PATIENT_PRIOR", "optional", "single", [
            req("PID"),
            opt("PD1"),
          ]),
          group("PATIENT_VISIT_PRIOR", "optional", "single", [
            req("PV1"),
            opt("PV2"),
          ]),
          optList("AL1"),
          group("ORDER_PRIOR", "required", "repeating", [
            opt("ORC"),
            req("OBR"),
            optList("NTE"),
            group("TIMING_PRIOR", "optional", "repeating", [
              req("TQ1"),
              optList("TQ2"),
            ]),
            group("OBSERVATION_PRIOR", "required", "repeating", [
              req("OBX"),
              optList("NTE"),
            ]),
          ]),
        ]),
      ]),
      optList("FT1"),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};

/**
 * ORL^O22 - General Laboratory Order Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORL_O22; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORL_O22_SCHEMA: MessageSchema = {
  messageType: "ORL",
  triggerEvent: "O22",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        group("ORDER", "optional", "repeating", [
          req("ORC"),
          group("TIMING", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          group("OBSERVATION_REQUEST", "optional", "single", [
            req("OBR"),
            group("SPECIMEN", "optional", "repeating", [
              req("SPM"),
              optList("SAC"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ],
};

/**
 * OMP^O09 - Pharmacy/Treatment Order (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMP_O09; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OMP_O09_SCHEMA: MessageSchema = {
  messageType: "OMP",
  triggerEvent: "O09",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
      group("INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        opt("IN3"),
      ]),
      opt("GT1"),
      optList("AL1"),
    ]),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("TIMING", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      req("RXO"),
      optList("NTE"),
      reqList("RXR"),
      group("COMPONENT", "optional", "repeating", [
        req("RXC"),
        optList("NTE"),
      ]),
      group("OBSERVATION", "optional", "repeating", [
        req("OBX"),
        optList("NTE"),
      ]),
      optList("FT1"),
      opt("BLG"),
    ]),
  ],
};

/**
 * ORP^O10 - Pharmacy/Treatment Order Acknowledgement (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORP_O10; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORP_O10_SCHEMA: MessageSchema = {
  messageType: "ORP",
  triggerEvent: "O10",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        optList("NTE"),
      ]),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("ORDER_DETAIL", "optional", "single", [
          req("RXO"),
          optList("NTE"),
          reqList("RXR"),
          group("COMPONENT", "optional", "repeating", [
            req("RXC"),
            optList("NTE"),
          ]),
        ]),
      ]),
    ]),
  ],
};

/**
 * OUL^R21 - Unsolicited laboratory observation (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OUL_R21; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OUL_R21_SCHEMA: MessageSchema = {
  messageType: "OUL",
  triggerEvent: "R21",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    opt("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
    ]),
    group("VISIT", "optional", "single", [
      req("PV1"),
      opt("PV2"),
    ]),
    group("ORDER_OBSERVATION", "required", "repeating", [
      group("CONTAINER", "optional", "single", [
        req("SAC"),
        opt("SID"),
      ]),
      opt("ORC"),
      req("OBR"),
      optList("NTE"),
      group("TIMING_QTY", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      group("OBSERVATION", "required", "repeating", [
        opt("OBX"),
        opt("TCD"),
        optList("SID"),
        optList("NTE"),
      ]),
      optList("CTI"),
    ]),
    opt("DSC"),
  ],
};

/**
 * OML^O33 - Laboratory Order for Multiple Orders Related to a Single Specimen (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OML_O33; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OML_O33_SCHEMA: MessageSchema = {
  messageType: "OML",
  triggerEvent: "O33",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      optList("NK1"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
      group("INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        opt("IN3"),
      ]),
      opt("GT1"),
      optList("AL1"),
    ]),
    group("SPECIMEN", "required", "repeating", [
      req("SPM"),
      optList("OBX"),
      optList("SAC"),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("OBSERVATION_REQUEST", "optional", "single", [
          req("OBR"),
          opt("TCD"),
          optList("NTE"),
          optList("DG1"),
          group("OBSERVATION", "optional", "repeating", [
            req("OBX"),
            opt("TCD"),
            optList("NTE"),
          ]),
          group("PRIOR_RESULT", "optional", "repeating", [
            group("PATIENT_PRIOR", "optional", "single", [
              req("PID"),
              opt("PD1"),
            ]),
            group("PATIENT_VISIT_PRIOR", "optional", "single", [
              req("PV1"),
              opt("PV2"),
            ]),
            optList("AL1"),
            group("ORDER_PRIOR", "required", "repeating", [
              opt("ORC"),
              req("OBR"),
              optList("NTE"),
              group("TIMING_PRIOR", "optional", "repeating", [
                req("TQ1"),
                optList("TQ2"),
              ]),
              group("OBSERVATION_PRIOR", "required", "repeating", [
                req("OBX"),
                optList("NTE"),
              ]),
            ]),
          ]),
        ]),
        optList("FT1"),
        optList("CTI"),
        opt("BLG"),
      ]),
    ]),
  ],
};

/**
 * ORL^O34 - Laboratory Order Response to a Multiple Order Related to Single Specimen OML (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORL_O34; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORL_O34_SCHEMA: MessageSchema = {
  messageType: "ORL",
  triggerEvent: "O34",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    // hl7.eu ch4 4.4.9 puts the PID and a required, repeating SPECIMEN group straight in RESPONSE; Caristix 2.5 and
    // HAPI v25 wrap them in an optional PATIENT group (HAPI with the SPECIMEN required, Caristix optional).
    group("RESPONSE", "optional", "single", [
      req("PID"),
      group("SPECIMEN", "required", "repeating", [
        req("SPM"),
        optList("OBX"),
        optList("SAC"),
        group("ORDER", "optional", "repeating", [
          req("ORC"),
          group("TIMING", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          group("OBSERVATION_REQUEST", "optional", "single", [
            req("OBR"),
            group("SPECIMEN", "optional", "repeating", [req("SPM"), optList("SAC")], { as: "requestSpecimens", exportTypeName: "ParsedRequestSpecimen", builderTypeName: "RequestSpecimen" }),
          ]),
        ]),
      ]),
    ]),
  ],
};

/**
 * OML^O35 - Laboratory Order for Multiple Orders Related to a Single Container of a Specimen (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OML_O35; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OML_O35_SCHEMA: MessageSchema = {
  messageType: "OML",
  triggerEvent: "O35",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      optList("NK1"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
      group("INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        opt("IN3"),
      ]),
      opt("GT1"),
      optList("AL1"),
    ]),
    group("SPECIMEN", "required", "repeating", [
      req("SPM"),
      optList("OBX"),
      group("SPECIMEN_CONTAINER", "required", "repeating", [
        req("SAC"),
        group("ORDER", "required", "repeating", [
          req("ORC"),
          group("TIMING", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          group("OBSERVATION_REQUEST", "optional", "single", [
            req("OBR"),
            opt("TCD"),
            optList("NTE"),
            optList("DG1"),
            group("OBSERVATION", "optional", "repeating", [
              req("OBX"),
              opt("TCD"),
              optList("NTE"),
            ]),
            group("PRIOR_RESULT", "optional", "repeating", [
              group("PATIENT_PRIOR", "optional", "single", [
                req("PID"),
                opt("PD1"),
              ]),
              group("PATIENT_VISIT_PRIOR", "optional", "single", [
                req("PV1"),
                opt("PV2"),
              ]),
              optList("AL1"),
              group("ORDER_PRIOR", "required", "repeating", [
                opt("ORC"),
                req("OBR"),
                optList("NTE"),
                group("TIMING_PRIOR", "optional", "repeating", [
                  req("TQ1"),
                  optList("TQ2"),
                ]),
                group("OBSERVATION_PRIOR", "required", "repeating", [
                  req("OBX"),
                  optList("NTE"),
                ]),
              ]),
            ]),
          ]),
          optList("FT1"),
          optList("CTI"),
          opt("BLG"),
        ]),
      ]),
    ]),
  ],
};

/**
 * ORL^O36 - Laboratory Order Response to a Single Container of a Specimen OML (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORL_O36; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORL_O36_SCHEMA: MessageSchema = {
  messageType: "ORL",
  triggerEvent: "O36",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        group("SPECIMEN", "required", "repeating", [
          req("SPM"),
          optList("OBX"),
          group("SPECIMEN_CONTAINER", "required", "repeating", [
            req("SAC"),
            group("ORDER", "optional", "repeating", [
              req("ORC"),
              group("TIMING", "optional", "repeating", [
                req("TQ1"),
                optList("TQ2"),
              ]),
              group("OBSERVATION_REQUEST", "optional", "single", [
                req("OBR"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ],
};

/**
 * OUL^R22 - Unsolicited Specimen Oriented Observation Message (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OUL_R22; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OUL_R22_SCHEMA: MessageSchema = {
  messageType: "OUL",
  triggerEvent: "R22",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    opt("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
    ]),
    group("VISIT", "optional", "single", [
      req("PV1"),
      opt("PV2"),
    ]),
    group("SPECIMEN", "required", "repeating", [
      req("SPM"),
      optList("OBX"),
      group("CONTAINER", "optional", "repeating", [
        req("SAC"),
        opt("INV"),
      ]),
      group("ORDER", "required", "repeating", [
        req("OBR"),
        opt("ORC"),
        optList("NTE"),
        group("TIMING_QTY", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("RESULT", "optional", "repeating", [
          req("OBX"),
          opt("TCD"),
          optList("SID"),
          optList("NTE"),
        ]),
        optList("CTI"),
      ]),
    ]),
    opt("DSC"),
  ],
};

/**
 * OUL^R23 - Unsolicited Specimen Container Oriented Observation Message (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OUL_R23; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OUL_R23_SCHEMA: MessageSchema = {
  messageType: "OUL",
  triggerEvent: "R23",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    opt("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
    ]),
    group("VISIT", "optional", "single", [
      req("PV1"),
      opt("PV2"),
    ]),
    group("SPECIMEN", "required", "repeating", [
      req("SPM"),
      optList("OBX"),
      group("CONTAINER", "required", "repeating", [
        req("SAC"),
        opt("INV"),
        group("ORDER", "required", "repeating", [
          req("OBR"),
          opt("ORC"),
          optList("NTE"),
          group("TIMING_QTY", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          group("RESULT", "optional", "repeating", [
            req("OBX"),
            opt("TCD"),
            optList("SID"),
            optList("NTE"),
          ]),
          optList("CTI"),
        ]),
      ]),
    ]),
    opt("DSC"),
  ],
};

/**
 * OUL^R24 - Unsolicited Order Oriented Observation Message (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OUL_R24; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OUL_R24_SCHEMA: MessageSchema = {
  messageType: "OUL",
  triggerEvent: "R24",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    opt("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
    ]),
    group("VISIT", "optional", "single", [
      req("PV1"),
      opt("PV2"),
    ]),
    group("ORDER", "required", "repeating", [
      req("OBR"),
      opt("ORC"),
      optList("NTE"),
      group("TIMING_QTY", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      group("SPECIMEN", "optional", "repeating", [
        req("SPM"),
        optList("OBX"),
        group("CONTAINER", "optional", "repeating", [
          req("SAC"),
          opt("INV"),
        ]),
      ]),
      group("RESULT", "optional", "repeating", [
        req("OBX"),
        opt("TCD"),
        optList("SID"),
        optList("NTE"),
      ]),
      optList("CTI"),
    ]),
    opt("DSC"),
  ],
};

/** Every v2.5 clinical order and unsolicited laboratory observation message of this module. */
export const LAB_ORDER_MESSAGES: MessageSchema[] = [
  OMG_O19_SCHEMA, ORG_O20_SCHEMA, OML_O21_SCHEMA, ORL_O22_SCHEMA, OMP_O09_SCHEMA, ORP_O10_SCHEMA, OUL_R21_SCHEMA,
  OML_O33_SCHEMA, ORL_O34_SCHEMA, OML_O35_SCHEMA, ORL_O36_SCHEMA, OUL_R22_SCHEMA, OUL_R23_SCHEMA, OUL_R24_SCHEMA,
];
