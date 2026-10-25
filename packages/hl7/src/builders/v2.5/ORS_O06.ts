/**
 * Builder for ORS^O06 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RQD [RQ1] [{NTE}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORS_O06_STRUCTURE } from "../../structures/v2.5/ORS_O06.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { RQD } from "../../segments/v2.5/RQD.ts";
import type { RQ1 } from "../../segments/v2.5/RQ1.ts";

/** The ORDER group of an ORS^O06 (HL7 v2.5) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The RQD segment. */
  requisition: RQD;
  /** The RQ1 segment. */
  requisitionSupplier?: RQ1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING group of an ORS^O06 (HL7 v2.5) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an ORS^O06 (HL7 v2.5) message. */
export interface ORS_O06Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** Builder for HL7 ORS^O06 (HL7 v2.5) messages. */
export class ORS_O06<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORS_O06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORS_O06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORS_O06Options = {},
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

/** Builds an HL7 ORS^O06 (HL7 v2.5) message. */
export function createORS_O06<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORS_O06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORS_O06<TMSH, TMSA> {
  return new ORS_O06(header, acknowledgment, options, encoding);
}
