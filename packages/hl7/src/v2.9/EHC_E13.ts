/**
 * Builder, parser and structure for EHC^E13 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] RFI [{CTD}] IVC PSS PSG [PID] [{PRT}] [PSL] { REQUEST: [CTD] OBR [{PRT}] [NTE] { RESPONSE: OBX [{PRT}] [NTE] [TXA] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { RFI } from "./RFI.ts";
import { CTD } from "./CTD.ts";
import { IVC } from "./IVC.ts";
import { PSS } from "./PSS.ts";
import { PSG } from "./PSG.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { PSL } from "./PSL.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { TXA } from "./TXA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E13 (HL7 v2.9), in order. */
export const EHC_E13_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "RFI", required: true, repeating: false },
  { name: "CTD", required: false, repeating: true },
  { name: "IVC", required: true, repeating: false },
  { name: "PSS", required: true, repeating: false },
  { name: "PSG", required: true, repeating: false },
  { name: "PID", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true },
  { name: "PSL", required: false, repeating: false },
  {
    name: "REQUEST",
    required: true,
    repeating: true,
    segments: [
      { name: "CTD", required: false, repeating: false },
      { name: "OBR", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: false },
      {
        name: "RESPONSE",
        required: true,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: false },
          { name: "TXA", required: false, repeating: false },
        ],
      },
    ],
  },
];

/** The REQUEST group of a parsed EHC^E13 (HL7 v2.9) message. */
export interface ParsedRequest {
  /** The CTD segment. */
  contact?: CTD;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The RESPONSE groups. */
  responses: ParsedResponse[];
}

/** The RESPONSE group of a parsed EHC^E13 (HL7 v2.9) message. */
export interface ParsedResponse {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The TXA segment. */
  document?: TXA;
}

/** Structured result of parsing an HL7 EHC^E13 (HL7 v2.9) message. */
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PSL segment. */
  psl?: PSL;
  /** The REQUEST groups. */
  requests: ParsedRequest[];
}

/** The segment parsers of EHC^E13 (HL7 v2.9). */
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
  PRT: (s, e) => PRT.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
};

/** Parser for HL7 EHC^E13 (HL7 v2.9) messages. */
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

/** Parses an HL7 EHC^E13 (HL7 v2.9) message string into a structured result. */
export function parseEHC_E13(messageString: string): Result<ParsedEHC_E13> {
  return new EHC_E13_Parser().parse(messageString);
}

/** The REQUEST group of an EHC^E13 (HL7 v2.9) message being built. */
export interface RequestGroup {
  /** The CTD segment. */
  contact?: CTD;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The RESPONSE groups. */
  responses: ResponseGroup[];
}

/** The RESPONSE group of an EHC^E13 (HL7 v2.9) message being built. */
export interface ResponseGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The TXA segment. */
  document?: TXA;
}

/** The optional segments and groups of an EHC^E13 (HL7 v2.9) message. */
export interface EHC_E13Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The CTD segments. */
  contacts?: CTD[];
  /** The PID segment. */
  patient?: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PSL segment. */
  psl?: PSL;
}

/** Builder for HL7 EHC^E13 (HL7 v2.9) messages. */
export class EHC_E13<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TRFI extends RFI = RFI, TIVC extends IVC = IVC, TPSS extends PSS = PSS, TPSG extends PSG = PSG> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E13";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E13_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public rfi: TRFI,
    public ivc: TIVC,
    public pss: TPSS,
    public psg: TPSG,
    public requests: RequestGroup[],
    public options: EHC_E13Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, rfi: this.rfi, ivc: this.ivc, pss: this.pss, psg: this.psg, requests: this.requests };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 EHC^E13 (HL7 v2.9) message. */
export function createEHC_E13<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TRFI extends RFI = RFI, TIVC extends IVC = IVC, TPSS extends PSS = PSS, TPSG extends PSG = PSG>(
  header: TMSH,
  acknowledgment: TMSA,
  rfi: TRFI,
  ivc: TIVC,
  pss: TPSS,
  psg: TPSG,
  requests: RequestGroup[],
  options: EHC_E13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E13<TMSH, TMSA, TRFI, TIVC, TPSS, TPSG> {
  return new EHC_E13(header, acknowledgment, rfi, ivc, pss, psg, requests, options, encoding);
}
