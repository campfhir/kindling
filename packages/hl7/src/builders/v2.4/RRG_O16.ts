/**
 * Builder for RRG^O16 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ GIVE: RXG {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RRG_O16_STRUCTURE } from "../../structures/v2.4/RRG_O16.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { RXG } from "../../segments/v2.4/RXG.ts";
import type { RXR } from "../../segments/v2.4/RXR.ts";
import type { RXC } from "../../segments/v2.4/RXC.ts";

/** The ORDER group of an RRG^O16 (HL7 v2.4) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXG segment. */
  give?: RXG;
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RRG^O16 (HL7 v2.4) message. */
export interface RRG_O16Options {
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

/** Builder for HL7 RRG^O16 (HL7 v2.4) messages. */
export class RRG_O16<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRG_O16";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRG_O16_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: RRG_O16Options = {},
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

/** Builds an HL7 RRG^O16 (HL7 v2.4) message. */
export function createRRG_O16<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRG_O16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRG_O16<TMSH, TMSA> {
  return new RRG_O16(header, acknowledgment, options, encoding);
}
