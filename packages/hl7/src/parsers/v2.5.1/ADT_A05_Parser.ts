/**
 * Parser for ADT^A05 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A05_STRUCTURE } from "../../structures/v2.5.1/ADT_A05.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";
import { NK1 } from "../../segments/v2.5.1/NK1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { DB1 } from "../../segments/v2.5.1/DB1.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { AL1 } from "../../segments/v2.5.1/AL1.ts";
import { DG1 } from "../../segments/v2.5.1/DG1.ts";
import { DRG } from "../../segments/v2.5.1/DRG.ts";
import { PR1 } from "../../segments/v2.5.1/PR1.ts";
import { GT1 } from "../../segments/v2.5.1/GT1.ts";
import { IN1 } from "../../segments/v2.5.1/IN1.ts";
import { IN2 } from "../../segments/v2.5.1/IN2.ts";
import { IN3 } from "../../segments/v2.5.1/IN3.ts";
import { ACC } from "../../segments/v2.5.1/ACC.ts";
import { UB1 } from "../../segments/v2.5.1/UB1.ts";
import { UB2 } from "../../segments/v2.5.1/UB2.ts";

/** The PROCEDURE group of a parsed ADT^A05 (HL7 v2.5.1) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of a parsed ADT^A05 (HL7 v2.5.1) message. */
export interface ParsedInsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 ADT^A05 (HL7 v2.5.1) message. */
export interface ParsedADT_A05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ROL segments. */
  visitRoles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insuranceGroups?: ParsedInsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
}

/** The segment parsers of ADT^A05 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  UB1: (s, e) => UB1.parse(s, e),
  UB2: (s, e) => UB2.parse(s, e),
};

/** Parser for HL7 ADT^A05 (HL7 v2.5.1) messages. */
export class ADT_A05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A05> {
    return parseStructure<ParsedADT_A05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A05 (HL7 v2.5.1) message string into a structured result. */
export function parseADT_A05(messageString: string): Result<ParsedADT_A05> {
  return new ADT_A05_Parser().parse(messageString);
}
