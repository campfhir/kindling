/**
 * Builder, parser and structure for ADT^A44 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{ARV}] MRG }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { ARV } from "./ARV.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { MRG } from "./MRG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ADT^A44 (HL7 v2.9.1), in order. */
export const ADT_A44_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "GSC", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
      { name: "MRG", required: true, repeating: false },
    ],
  },
];

/** The PATIENT group of a parsed ADT^A44 (HL7 v2.9.1) message. */
export interface ParsedPatient {
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
  /** The ARV segments. */
  arvList?: ARV[];
  /** The MRG segment. */
  merge: MRG;
}

/** Structured result of parsing an HL7 ADT^A44 (HL7 v2.9.1) message. */
export interface ParsedADT_A44 extends ParsedMessageBase {
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
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of ADT^A44 (HL7 v2.9.1). */
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
};

/** Parser for HL7 ADT^A44 (HL7 v2.9.1) messages. */
export class ADT_A44_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A44";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A44_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A44> {
    return parseStructure<ParsedADT_A44>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A44 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A44(messageString: string): Result<ParsedADT_A44> {
  return new ADT_A44_Parser().parse(messageString);
}

/** The PATIENT group of an ADT^A44 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
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
  /** The ARV segments. */
  arvList?: ARV[];
  /** The MRG segment. */
  merge: MRG;
}

/** The optional segments and groups of an ADT^A44 (HL7 v2.9.1) message. */
export interface ADT_A44Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 ADT^A44 (HL7 v2.9.1) messages. */
export class ADT_A44<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A44";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A44_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: PatientGroup[],
    public options: ADT_A44Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patients: this.patients };
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

/** Builds an HL7 ADT^A44 (HL7 v2.9.1) message. */
export function createADT_A44<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A44Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A44<TMSH, TEVN> {
  return new ADT_A44(header, event, patients, options, encoding);
}
