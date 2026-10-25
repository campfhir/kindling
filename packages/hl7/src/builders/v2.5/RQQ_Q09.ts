/**
 * Builder for RQQ^Q09 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RQQ_Q09_STRUCTURE } from "../../structures/v2.5/RQQ_Q09.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { ERQ } from "../../segments/v2.5/ERQ.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The optional segments and groups of an RQQ^Q09 (HL7 v2.5) message. */
export interface RQQ_Q09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RQQ^Q09 (HL7 v2.5) messages. */
export class RQQ_Q09<TMSH extends MSH = MSH, TERQ extends ERQ = ERQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQQ_Q09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQQ_Q09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public eventReplayQuery: TERQ,
    public options: RQQ_Q09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, eventReplayQuery: this.eventReplayQuery };
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

/** Builds an HL7 RQQ^Q09 (HL7 v2.5) message. */
export function createRQQ_Q09<TMSH extends MSH = MSH, TERQ extends ERQ = ERQ>(
  header: TMSH,
  eventReplayQuery: TERQ,
  options: RQQ_Q09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQQ_Q09<TMSH, TERQ> {
  return new RQQ_Q09(header, eventReplayQuery, options, encoding);
}
