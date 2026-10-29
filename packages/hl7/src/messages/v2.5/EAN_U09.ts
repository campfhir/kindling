/**
 * Builder, parser and structure for EAN^U09 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EQU { NOTIFICATION: NDS [NTE] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EQU } from "../../segments/v2.5/EQU.ts";
import { NDS } from "../../segments/v2.5/NDS.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of EAN^U09 (HL7 v2.5), in order. */
export const EAN_U09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "NOTIFICATION",
    required: true,
    repeating: true,
    segments: [
      { name: "NDS", required: true, repeating: false },
      { name: "NTE", required: false, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];

/** The NOTIFICATION group of a parsed EAN^U09 (HL7 v2.5) message. */
export interface ParsedNotification {
  /** The NDS segment. */
  notificationDetail: NDS;
  /** The NTE segment. */
  note?: NTE;
}

/** Structured result of parsing an HL7 EAN^U09 (HL7 v2.5) message. */
export interface ParsedEAN_U09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The NOTIFICATION groups. */
  notifications: ParsedNotification[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of EAN^U09 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  NDS: (s, e) => NDS.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EAN^U09 (HL7 v2.5) messages. */
export class EAN_U09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAN_U09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EAN_U09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEAN_U09> {
    return parseStructure<ParsedEAN_U09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EAN^U09 (HL7 v2.5) message string into a structured result. */
export function parseEAN_U09(messageString: string): Result<ParsedEAN_U09> {
  return new EAN_U09_Parser().parse(messageString);
}

/** The NOTIFICATION group of an EAN^U09 (HL7 v2.5) message being built. */
export interface NotificationGroup {
  /** The NDS segment. */
  notificationDetail: NDS;
  /** The NTE segment. */
  note?: NTE;
}

/** The optional segments and groups of an EAN^U09 (HL7 v2.5) message. */
export interface EAN_U09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 EAN^U09 (HL7 v2.5) messages. */
export class EAN_U09<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAN_U09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EAN_U09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public notifications: NotificationGroup[],
    public options: EAN_U09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, notifications: this.notifications };
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

/** Builds an HL7 EAN^U09 (HL7 v2.5) message. */
export function createEAN_U09<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  notifications: NotificationGroup[],
  options: EAN_U09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EAN_U09<TMSH, TEQU> {
  return new EAN_U09(header, equipmentDetail, notifications, options, encoding);
}
