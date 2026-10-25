/**
 * Builder for RRA^O02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ADMINISTRATION: {RXA} RXR ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RRA_O02_STRUCTURE } from "../../structures/v2.3/RRA_O02.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { RXA } from "../../segments/v2.3/RXA.ts";
import type { RXR } from "../../segments/v2.3/RXR.ts";

/** The ORDER group of an RRA^O02 (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXA segments. */
  administrations?: RXA[];
  /** The RXR segment. */
  route?: RXR;
}

/** The optional segments and groups of an RRA^O02 (HL7 v2.3) message. */
export interface RRA_O02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** Builder for HL7 RRA^O02 (HL7 v2.3) messages. */
export class RRA_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRA_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRA_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: RRA_O02Options = {},
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

/** Builds an HL7 RRA^O02 (HL7 v2.3) message. */
export function createRRA_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRA_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRA_O02<TMSH, TMSA> {
  return new RRA_O02(header, acknowledgment, options, encoding);
}
