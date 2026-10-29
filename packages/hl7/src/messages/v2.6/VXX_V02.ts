/**
 * Builder, parser and structure for VXX^V02 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{SFT}] [UAC] QRD [QRF] { PATIENT: PID [{NK1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { NK1 } from "../../segments/v2.6/NK1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of VXX^V02 (HL7 v2.6), in order. */
export const VXX_V02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "NK1", required: false, repeating: true },
    ],
  },
];

/** The PATIENT group of a parsed VXX^V02 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** Structured result of parsing an HL7 VXX^V02 (HL7 v2.6) message. */
export interface ParsedVXX_V02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of VXX^V02 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
};

/** Parser for HL7 VXX^V02 (HL7 v2.6) messages. */
export class VXX_V02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXX_V02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXX_V02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXX_V02> {
    return parseStructure<ParsedVXX_V02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXX^V02 (HL7 v2.6) message string into a structured result. */
export function parseVXX_V02(messageString: string): Result<ParsedVXX_V02> {
  return new VXX_V02_Parser().parse(messageString);
}

/** The PATIENT group of an VXX^V02 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** The optional segments and groups of an VXX^V02 (HL7 v2.6) message. */
export interface VXX_V02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 VXX^V02 (HL7 v2.6) messages. */
export class VXX_V02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXX_V02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXX_V02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public patients: PatientGroup[],
    public options: VXX_V02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, patients: this.patients };
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

/** Builds an HL7 VXX^V02 (HL7 v2.6) message. */
export function createVXX_V02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patients: PatientGroup[],
  options: VXX_V02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXX_V02<TMSH, TMSA, TQRD> {
  return new VXX_V02(header, acknowledgment, query, patients, options, encoding);
}
