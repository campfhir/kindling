/**
 * Builder, parser and structure for OSU^O52 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [{PRT}] ] [{ARV}] { ORDER_STATUS: ORC [{PRT}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ARV } from "./ARV.ts";
import { ERR } from "./ERR.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { ORC } from "./ORC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OSU^O52 (HL7 v2.9.1), in order. */
export const OSU_O52_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  {
    name: "ORDER_STATUS",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
];

/** The PATIENT group of a parsed OSU^O52 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER STATUS group of a parsed OSU^O52 (HL7 v2.9.1) message. */
export interface ParsedOrderStatus {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 OSU^O52 (HL7 v2.9.1) message. */
export interface ParsedOSU_O52 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ORDER STATUS groups. */
  orderStatus: ParsedOrderStatus[];
}

/** The segment parsers of OSU^O52 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
};

/** Parser for HL7 OSU^O52 (HL7 v2.9.1) messages. */
export class OSU_O52_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSU_O52";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSU_O52_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSU_O52> {
    return parseStructure<ParsedOSU_O52>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSU^O52 (HL7 v2.9.1) message string into a structured result. */
export function parseOSU_O52(messageString: string): Result<ParsedOSU_O52> {
  return new OSU_O52_Parser().parse(messageString);
}

/** The PATIENT group of an OSU^O52 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER STATUS group of an OSU^O52 (HL7 v2.9.1) message being built. */
export interface OrderStatusGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an OSU^O52 (HL7 v2.9.1) message. */
export interface OSU_O52Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ARV segments. */
  arv2?: ARV[];
}

/** Builder for HL7 OSU^O52 (HL7 v2.9.1) messages. */
export class OSU_O52<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSU_O52";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSU_O52_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public orderStatus: OrderStatusGroup[],
    public options: OSU_O52Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, orderStatus: this.orderStatus };
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

/** Builds an HL7 OSU^O52 (HL7 v2.9.1) message. */
export function createOSU_O52<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  orderStatus: OrderStatusGroup[],
  options: OSU_O52Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSU_O52<TMSH, TMSA> {
  return new OSU_O52(header, acknowledgment, orderStatus, options, encoding);
}
