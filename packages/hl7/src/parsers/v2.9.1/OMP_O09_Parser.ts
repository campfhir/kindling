/**
 * Parser for OMP^O09 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [ ADDITIONAL_DEMOGRAPHICS: PD1 [{GSP}] [{GSR}] [{GSC}] [{PRT}] ] [{NTE}] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] [{ARV}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXO [{PRT}] [{NTE}] {RXR} [{ COMPONENT: RXC [{NTE}] }] [{CDO}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OMP_O09_STRUCTURE } from "../../structures/v2.9.1/OMP_O09.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { IN1 } from "../../segments/v2.9.1/IN1.ts";
import { IN2 } from "../../segments/v2.9.1/IN2.ts";
import { IN3 } from "../../segments/v2.9.1/IN3.ts";
import { GT1 } from "../../segments/v2.9.1/GT1.ts";
import { AL1 } from "../../segments/v2.9.1/AL1.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { RXO } from "../../segments/v2.9.1/RXO.ts";
import { RXR } from "../../segments/v2.9.1/RXR.ts";
import { RXC } from "../../segments/v2.9.1/RXC.ts";
import { CDO } from "../../segments/v2.9.1/CDO.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { FT1 } from "../../segments/v2.9.1/FT1.ts";
import { BLG } from "../../segments/v2.9.1/BLG.ts";

/** The PATIENT group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: ParsedAdditionalDemographics;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The ADDITIONAL DEMOGRAPHICS group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedAdditionalDemographics {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The INSURANCE group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT groups. */
  components?: ParsedComponent[];
  /** The CDO segments. */
  cdoList?: CDO[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIMING group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The COMPONENT group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedComponent {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of a parsed OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OMP^O09 (HL7 v2.9.1) message. */
export interface ParsedOMP_O09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of OMP^O09 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  CDO: (s, e) => CDO.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OMP^O09 (HL7 v2.9.1) messages. */
export class OMP_O09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMP_O09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OMP_O09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOMP_O09> {
    return parseStructure<ParsedOMP_O09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OMP^O09 (HL7 v2.9.1) message string into a structured result. */
export function parseOMP_O09(messageString: string): Result<ParsedOMP_O09> {
  return new OMP_O09_Parser().parse(messageString);
}
