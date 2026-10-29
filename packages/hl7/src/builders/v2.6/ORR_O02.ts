/**
 * Builder for ORR^O02 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORR_O02_STRUCTURE } from "../../structures/v2.6/ORR_O02.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { RQD } from "../../segments/v2.6/RQD.ts";
import type { RQ1 } from "../../segments/v2.6/RQ1.ts";
import type { RXO } from "../../segments/v2.6/RXO.ts";
import type { ODS } from "../../segments/v2.6/ODS.ts";
import type { ODT } from "../../segments/v2.6/ODT.ts";
import type { CTI } from "../../segments/v2.6/CTI.ts";

/** The RESPONSE group of an ORR^O02 (HL7 v2.6) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORR^O02 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an ORR^O02 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an ORR^O02 (HL7 v2.6) message. */
export interface ORR_O02Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORR^O02 (HL7 v2.6) messages. */
export class ORR_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORR_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORR_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORR_O02Options = {},
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

/** Builds an HL7 ORR^O02 (HL7 v2.6) message. */
export function createORR_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORR_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORR_O02<TMSH, TMSA> {
  return new ORR_O02(header, acknowledgment, options, encoding);
}
