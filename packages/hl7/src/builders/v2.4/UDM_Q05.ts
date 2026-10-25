/**
 * Builder for UDM^Q05 messages (HL7 v2.4).
 *
 * Structure: MSH URD [URS] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { UDM_Q05_STRUCTURE } from "../../structures/v2.4/UDM_Q05.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { URD } from "../../segments/v2.4/URD.ts";
import type { URS } from "../../segments/v2.4/URS.ts";
import type { DSP } from "../../segments/v2.4/DSP.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The optional segments and groups of an UDM^Q05 (HL7 v2.4) message. */
export interface UDM_Q05Options {
  /** The URS segment. */
  updateSelection?: URS;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 UDM^Q05 (HL7 v2.4) messages. */
export class UDM_Q05<TMSH extends MSH = MSH, TURD extends URD = URD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "UDM_Q05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = UDM_Q05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public updateDefinition: TURD,
    public displayLines: DSP[],
    public options: UDM_Q05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, updateDefinition: this.updateDefinition, displayLines: this.displayLines };
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

/** Builds an HL7 UDM^Q05 (HL7 v2.4) message. */
export function createUDM_Q05<TMSH extends MSH = MSH, TURD extends URD = URD>(
  header: TMSH,
  updateDefinition: TURD,
  displayLines: DSP[],
  options: UDM_Q05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): UDM_Q05<TMSH, TURD> {
  return new UDM_Q05(header, updateDefinition, displayLines, options, encoding);
}
