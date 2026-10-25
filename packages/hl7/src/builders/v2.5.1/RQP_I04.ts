/**
 * Builder for RQP^I04 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RQP_I04_STRUCTURE } from "../../structures/v2.5.1/RQP_I04.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { PRD } from "../../segments/v2.5.1/PRD.ts";
import type { CTD } from "../../segments/v2.5.1/CTD.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { NK1 } from "../../segments/v2.5.1/NK1.ts";
import type { GT1 } from "../../segments/v2.5.1/GT1.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";

/** The PROVIDER group of an RQP^I04 (HL7 v2.5.1) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RQP^I04 (HL7 v2.5.1) message. */
export interface RQP_I04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RQP^I04 (HL7 v2.5.1) messages. */
export class RQP_I04<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQP_I04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQP_I04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providers: Provider[],
    public patient: TPID,
    public options: RQP_I04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RQP^I04 (HL7 v2.5.1) message. */
export function createRQP_I04<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RQP_I04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQP_I04<TMSH, TPID> {
  return new RQP_I04(header, providers, patient, options, encoding);
}
