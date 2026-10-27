/**
 * Builder for PMU^B08 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [PRA] [{CER}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PMU_B08_STRUCTURE } from "../../structures/v2.9.1/PMU_B08.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { STF } from "../../segments/v2.9.1/STF.ts";
import type { PRA } from "../../segments/v2.9.1/PRA.ts";
import type { CER } from "../../segments/v2.9.1/CER.ts";

/** The optional segments and groups of an PMU^B08 (HL7 v2.9.1) message. */
export interface PMU_B08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PRA segment. */
  practitioner?: PRA;
  /** The CER segments. */
  certificates?: CER[];
}

/** Builder for HL7 PMU^B08 (HL7 v2.9.1) messages. */
export class PMU_B08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B08Options = {},
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

/** Builds an HL7 PMU^B08 (HL7 v2.9.1) message. */
export function createPMU_B08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B08<TMSH, TEVN, TSTF> {
  return new PMU_B08(header, event, staff, options, encoding);
}
