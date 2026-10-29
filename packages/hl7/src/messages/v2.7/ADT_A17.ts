/**
 * Builder, parser and structure for ADT^A17 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EVN } from "../../segments/v2.7/EVN.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { DB1 } from "../../segments/v2.7/DB1.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ADT^A17 (HL7 v2.7), in order. */
export const ADT_A17_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  { name: "PID", required: true, repeating: false, as: "pid2" },
  { name: "PD1", required: false, repeating: false, as: "pd12" },
  { name: "PV1", required: true, repeating: false, as: "pv12" },
  { name: "PV2", required: false, repeating: false, as: "pv22" },
  { name: "DB1", required: false, repeating: true, as: "db12" },
  { name: "OBX", required: false, repeating: true, as: "obx2" },
];

/** Structured result of parsing an HL7 ADT^A17 (HL7 v2.7) message. */
export interface ParsedADT_A17 extends ParsedMessageBase {
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
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The PID segment. */
  pid2: PID;
  /** The PD1 segment. */
  pd12?: PD1;
  /** The PV1 segment. */
  pv12: PV1;
  /** The PV2 segment. */
  pv22?: PV2;
  /** The DB1 segments. */
  db12?: DB1[];
  /** The OBX segments. */
  obx2?: OBX[];
}

/** The segment parsers of ADT^A17 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 ADT^A17 (HL7 v2.7) messages. */
export class ADT_A17_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A17";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A17_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A17> {
    return parseStructure<ParsedADT_A17>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A17 (HL7 v2.7) message string into a structured result. */
export function parseADT_A17(messageString: string): Result<ParsedADT_A17> {
  return new ADT_A17_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A17 (HL7 v2.7) message. */
export interface ADT_A17Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The PD1 segment. */
  pd12?: PD1;
  /** The PV2 segment. */
  pv22?: PV2;
  /** The DB1 segments. */
  db12?: DB1[];
  /** The OBX segments. */
  obx2?: OBX[];
}

/** Builder for HL7 ADT^A17 (HL7 v2.7) messages. */
export class ADT_A17<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A17";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A17_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public pid2: PID,
    public pv12: PV1,
    public options: ADT_A17Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit, pid2: this.pid2, pv12: this.pv12 };
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

/** Builds an HL7 ADT^A17 (HL7 v2.7) message. */
export function createADT_A17<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  pid2: PID,
  pv12: PV1,
  options: ADT_A17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A17<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A17(header, event, patient, visit, pid2, pv12, options, encoding);
}
