/**
 * Builder for ORX^O58 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] [{PRT}] [{ARV}] ] { ORDER: ORC [{PRT}] TXA [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORX_O58_STRUCTURE } from "../../structures/v2.9.1/ORX_O58.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { TXA } from "../../segments/v2.9.1/TXA.ts";
import type { CTI } from "../../segments/v2.9.1/CTI.ts";

/** The RESPONSE group of an ORX^O58 (HL7 v2.9.1) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORX^O58 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ORDER group of an ORX^O58 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an ORX^O58 (HL7 v2.9.1) message. */
export interface ORX_O58Options {
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
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORX^O58 (HL7 v2.9.1) messages. */
export class ORX_O58<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORX_O58";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORX_O58_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORX_O58Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 ORX^O58 (HL7 v2.9.1) message. */
export function createORX_O58<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORX_O58Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORX_O58<TMSH, TMSA> {
  return new ORX_O58(header, acknowledgment, options, encoding);
}
