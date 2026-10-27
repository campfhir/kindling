/**
 * Parser for EHC^E12 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [{UAC}] RFI [{CTD}] IVC PSS PSG [PID] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{PSL}] { REQUEST: [CTD] OBR [{PRT}] [NTE] [{OBX}] [{PRT}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E12_STRUCTURE } from "../../structures/v2.9.1/EHC_E12.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { RFI } from "../../segments/v2.9.1/RFI.ts";
import { CTD } from "../../segments/v2.9.1/CTD.ts";
import { IVC } from "../../segments/v2.9.1/IVC.ts";
import { PSS } from "../../segments/v2.9.1/PSS.ts";
import { PSG } from "../../segments/v2.9.1/PSG.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { PSL } from "../../segments/v2.9.1/PSL.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";

/** The REQUEST group of a parsed EHC^E12 (HL7 v2.9.1) message. */
export interface ParsedRequest {
  /** The CTD segment. */
  contact?: CTD;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The OBX segments. */
  observations?: OBX[];
  /** The PRT segments. */
  prt2?: PRT[];
}

/** Structured result of parsing an HL7 EHC^E12 (HL7 v2.9.1) message. */
export interface ParsedEHC_E12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
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
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PSL segments. */
  pslList?: PSL[];
  /** The REQUEST groups. */
  requests: ParsedRequest[];
}

/** The segment parsers of EHC^E12 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  RFI: (s, e) => RFI.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 EHC^E12 (HL7 v2.9.1) messages. */
export class EHC_E12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E12> {
    return parseStructure<ParsedEHC_E12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E12 (HL7 v2.9.1) message string into a structured result. */
export function parseEHC_E12(messageString: string): Result<ParsedEHC_E12> {
  return new EHC_E12_Parser().parse(messageString);
}
