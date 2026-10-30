/**
 * Builder, parser and structure for PMU^B01 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NK1}] [{PRT}] [{ROL}]
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
import { EVN } from "./EVN.ts";
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
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of PMU^B01 (HL7 v2.8.2), in order. */
export const PMU_B01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
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
];

/** Structured result of parsing an HL7 PMU^B01 (HL7 v2.8.2) message. */
export interface ParsedPMU_B01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
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

/** The segment parsers of PMU^B01 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
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
};

/** Parser for HL7 PMU^B01 (HL7 v2.8.2) messages. */
export class PMU_B01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B01> {
    return parseStructure<ParsedPMU_B01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B01 (HL7 v2.8.2) message string into a structured result. */
export function parsePMU_B01(messageString: string): Result<ParsedPMU_B01> {
  return new PMU_B01_Parser().parse(messageString);
}

/** The optional segments and groups of an PMU^B01 (HL7 v2.8.2) message. */
export interface PMU_B01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
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

/** Builder for HL7 PMU^B01 (HL7 v2.8.2) messages. */
export class PMU_B01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, staff: this.staff };
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

/** Builds an HL7 PMU^B01 (HL7 v2.8.2) message. */
export function createPMU_B01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B01<TMSH, TEVN, TSTF> {
  return new PMU_B01(header, event, staff, options, encoding);
}
