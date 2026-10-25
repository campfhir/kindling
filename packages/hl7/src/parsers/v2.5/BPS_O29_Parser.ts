/**
 * Parser for BPS^O29 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] BPO [{NTE}] [{ PRODUCT: BPX [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BPS_O29_STRUCTURE } from "../../structures/v2.5/BPS_O29.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { BPO } from "../../segments/v2.5/BPO.ts";
import { BPX } from "../../segments/v2.5/BPX.ts";

/** The PATIENT group of a parsed BPS^O29 (HL7 v2.5) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
}

/** The PATIENT VISIT group of a parsed BPS^O29 (HL7 v2.5) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of a parsed BPS^O29 (HL7 v2.5) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT groups. */
  products?: ParsedProduct[];
}

/** The TIMING group of a parsed BPS^O29 (HL7 v2.5) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT group of a parsed BPS^O29 (HL7 v2.5) message. */
export interface ParsedProduct {
  /** The BPX segment. */
  bloodProductDispenseStatus: BPX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 BPS^O29 (HL7 v2.5) message. */
export interface ParsedBPS_O29 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of BPS^O29 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  BPO: (s, e) => BPO.parse(s, e),
  BPX: (s, e) => BPX.parse(s, e),
};

/** Parser for HL7 BPS^O29 (HL7 v2.5) messages. */
export class BPS_O29_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BPS_O29";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BPS_O29_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBPS_O29> {
    return parseStructure<ParsedBPS_O29>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BPS^O29 (HL7 v2.5) message string into a structured result. */
export function parseBPS_O29(messageString: string): Result<ParsedBPS_O29> {
  return new BPS_O29_Parser().parse(messageString);
}
