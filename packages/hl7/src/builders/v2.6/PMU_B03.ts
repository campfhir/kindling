/**
 * Builder for PMU^B03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PMU_B03_STRUCTURE } from "../../structures/v2.6/PMU_B03.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { STF } from "../../segments/v2.6/STF.ts";

/** The optional segments and groups of an PMU^B03 (HL7 v2.6) message. */
export interface PMU_B03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 PMU^B03 (HL7 v2.6) messages. */
export class PMU_B03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B03Options = {},
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

/** Builds an HL7 PMU^B03 (HL7 v2.6) message. */
export function createPMU_B03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B03<TMSH, TEVN, TSTF> {
  return new PMU_B03(header, event, staff, options, encoding);
}
