/**
 * Builder, parser and structure for RSP^K25 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] QAK QPD RCP { STAFF: STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NK1}] [{PRT}] [{ROL}] } [DSC]
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
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { RCP } from "./RCP.ts";
import { STF } from "./STF.ts";
import { PRA } from "./PRA.ts";
import { ORG } from "./ORG.ts";
import { AFF } from "./AFF.ts";
import { LAN } from "./LAN.ts";
import { EDU } from "./EDU.ts";
import { CER } from "./CER.ts";
import { NK1 } from "./NK1.ts";
import { PRT } from "./PRT.ts";
import { ROL } from "./ROL.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^K25 (HL7 v2.8.1), in order. */
export const RSP_K25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
  {
    name: "STAFF",
    required: true,
    repeating: true,
    segments: [
      { name: "STF", required: true, repeating: false },
      { name: "PRA", required: false, repeating: true },
      { name: "ORG", required: false, repeating: true },
      { name: "AFF", required: false, repeating: true },
      { name: "LAN", required: false, repeating: true },
      { name: "EDU", required: false, repeating: true },
      { name: "CER", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The STAFF group of a parsed RSP^K25 (HL7 v2.8.1) message. */
export interface ParsedStaff {
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
  /** The CER segments. */
  certificates?: CER[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 RSP^K25 (HL7 v2.8.1) message. */
export interface ParsedRSP_K25 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The STAFF groups. */
  staffs: ParsedStaff[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K25 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K25 (HL7 v2.8.1) messages. */
export class RSP_K25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K25> {
    return parseStructure<ParsedRSP_K25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K25 (HL7 v2.8.1) message string into a structured result. */
export function parseRSP_K25(messageString: string): Result<ParsedRSP_K25> {
  return new RSP_K25_Parser().parse(messageString);
}

/** The STAFF group of an RSP^K25 (HL7 v2.8.1) message being built. */
export interface StaffGroup {
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
  /** The CER segments. */
  certificates?: CER[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an RSP^K25 (HL7 v2.8.1) message. */
export interface RSP_K25Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K25 (HL7 v2.8.1) messages. */
export class RSP_K25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public staffs: StaffGroup[],
    public options: RSP_K25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters, responseControl: this.responseControl, staffs: this.staffs };
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

/** Builds an HL7 RSP^K25 (HL7 v2.8.1) message. */
export function createRSP_K25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  responseControl: TRCP,
  staffs: StaffGroup[],
  options: RSP_K25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K25<TMSH, TMSA, TQAK, TQPD, TRCP> {
  return new RSP_K25(header, acknowledgment, queryAcknowledgment, queryParameters, responseControl, staffs, options, encoding);
}
