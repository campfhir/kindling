/**
 * Builder for PMU^B05 messages (HL7 v2.5.1).
 *
 * Structure: MSH EVN STF [{PRA}] [ORG]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PMU_B05_STRUCTURE } from "../../structures/v2.5.1/PMU_B05.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { STF } from "../../segments/v2.5.1/STF.ts";
import type { PRA } from "../../segments/v2.5.1/PRA.ts";
import type { ORG } from "../../segments/v2.5.1/ORG.ts";

/** The optional segments and groups of an PMU^B05 (HL7 v2.5.1) message. */
export interface PMU_B05Options {
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segment. */
  organizationUnit?: ORG;
}

/** Builder for HL7 PMU^B05 (HL7 v2.5.1) messages. */
export class PMU_B05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, staff: this.staff };
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

/** Builds an HL7 PMU^B05 (HL7 v2.5.1) message. */
export function createPMU_B05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B05<TMSH, TEVN, TSTF> {
  return new PMU_B05(header, event, staff, options, encoding);
}
