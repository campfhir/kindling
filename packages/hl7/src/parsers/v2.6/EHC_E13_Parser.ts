/**
 * Parser for EHC^E13 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] RFI [{CTD}] IVC PSS PSG [PID] [PSL] { REQUEST: [CTD] OBR [NTE] { RESPONSE: OBX [NTE] [TXA] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E13_STRUCTURE } from "../../structures/v2.6/EHC_E13.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { RFI } from "../../segments/v2.6/RFI.ts";
import { CTD } from "../../segments/v2.6/CTD.ts";
import { IVC } from "../../segments/v2.6/IVC.ts";
import { PSS } from "../../segments/v2.6/PSS.ts";
import { PSG } from "../../segments/v2.6/PSG.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PSL } from "../../segments/v2.6/PSL.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { TXA } from "../../segments/v2.6/TXA.ts";

/** The REQUEST group of a parsed EHC^E13 (HL7 v2.6) message. */
export interface ParsedRequest {
  /** The CTD segment. */
  contact?: CTD;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segment. */
  note?: NTE;
  /** The RESPONSE groups. */
  responses: ParsedResponse[];
}

/** The RESPONSE group of a parsed EHC^E13 (HL7 v2.6) message. */
export interface ParsedResponse {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segment. */
  note?: NTE;
  /** The TXA segment. */
  document?: TXA;
}

/** Structured result of parsing an HL7 EHC^E13 (HL7 v2.6) message. */
export interface ParsedEHC_E13 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The RFI segment. */
  rfi: RFI;
  /** The CTD segments. */
  contacts?: CTD[];
  /** The IVC segment. */
  ivc: IVC;
  /** The PSS segment. */
  pss: PSS;
  /** The PSG segment. */
  psg: PSG;
  /** The PID segment. */
  patient?: PID;
  /** The PSL segment. */
  psl?: PSL;
  /** The REQUEST groups. */
  requests: ParsedRequest[];
}

/** The segment parsers of EHC^E13 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  RFI: (s, e) => RFI.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
};

/** Parser for HL7 EHC^E13 (HL7 v2.6) messages. */
export class EHC_E13_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E13";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E13_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E13> {
    return parseStructure<ParsedEHC_E13>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E13 (HL7 v2.6) message string into a structured result. */
export function parseEHC_E13(messageString: string): Result<ParsedEHC_E13> {
  return new EHC_E13_Parser().parse(messageString);
}
