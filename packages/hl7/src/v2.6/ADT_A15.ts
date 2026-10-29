/**
 * Builder, parser and structure for ADT^A15 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{DG1}]
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
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { ARV } from "./ARV.ts";
import { ROL } from "./ROL.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DB1 } from "./DB1.ts";
import { OBX } from "./OBX.ts";
import { DG1 } from "./DG1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ADT^A15 (HL7 v2.6), in order. */
export const ADT_A15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "ROL", required: false, repeating: true },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  { name: "ROL", required: false, repeating: true, as: "rol2" },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  { name: "DG1", required: false, repeating: true },
];

/** Structured result of parsing an HL7 ADT^A15 (HL7 v2.6) message. */
export interface ParsedADT_A15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
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
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ROL segments. */
  rol2?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The segment parsers of ADT^A15 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
};

/** Parser for HL7 ADT^A15 (HL7 v2.6) messages. */
export class ADT_A15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A15> {
    return parseStructure<ParsedADT_A15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A15 (HL7 v2.6) message string into a structured result. */
export function parseADT_A15(messageString: string): Result<ParsedADT_A15> {
  return new ADT_A15_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A15 (HL7 v2.6) message. */
export interface ADT_A15Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ROL segments. */
  rol2?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** Builder for HL7 ADT^A15 (HL7 v2.6) messages. */
export class ADT_A15<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: ADT_A15Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit };
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

/** Builds an HL7 ADT^A15 (HL7 v2.6) message. */
export function createADT_A15<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A15<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A15(header, event, patient, visit, options, encoding);
}
