/**
 * Builder for MFN^M10 messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI { MF_TEST_BATTERIES: MFE OM1 [ MF_TEST_BATT_DETAIL: OM5 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M10_STRUCTURE } from "../../structures/v2.3.1/MFN_M10.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MFI } from "../../segments/v2.3.1/MFI.ts";
import type { MFE } from "../../segments/v2.3.1/MFE.ts";
import type { OM1 } from "../../segments/v2.3.1/OM1.ts";
import type { OM5 } from "../../segments/v2.3.1/OM5.ts";
import type { OM4 } from "../../segments/v2.3.1/OM4.ts";

/** The MF TEST BATTERIES group of an MFN^M10 (HL7 v2.3.1) message being built. */
export interface BatteryEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM5 segment. */
  observationBattery?: OM5;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** The optional segments and groups of an MFN^M10 (HL7 v2.3.1) message. The message has none. */
export type MFN_M10Options = Record<string, never>;

/** Builder for HL7 MFN^M10 (HL7 v2.3.1) messages. */
export class MFN_M10<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: BatteryEntry[],
    public options: MFN_M10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFN^M10 (HL7 v2.3.1) message. */
export function createMFN_M10<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: BatteryEntry[],
  options: MFN_M10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M10<TMSH, TMFI> {
  return new MFN_M10(header, masterFile, entries, options, encoding);
}
