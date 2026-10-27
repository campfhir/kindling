/**
 * Parser for ADT^A50 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] MRG PV1
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A50_STRUCTURE } from "../../structures/v2.9.1/ADT_A50.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EVN } from "../../segments/v2.9.1/EVN.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { MRG } from "../../segments/v2.9.1/MRG.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";

/** Structured result of parsing an HL7 ADT^A50 (HL7 v2.9.1) message. */
export interface ParsedADT_A50 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit: PV1;
}

/** The segment parsers of ADT^A50 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 ADT^A50 (HL7 v2.9.1) messages. */
export class ADT_A50_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A50";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A50_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A50> {
    return parseStructure<ParsedADT_A50>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A50 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A50(messageString: string): Result<ParsedADT_A50> {
  return new ADT_A50_Parser().parse(messageString);
}
