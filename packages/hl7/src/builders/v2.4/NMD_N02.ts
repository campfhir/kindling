/**
 * Builder for NMD^N02 messages (HL7 v2.4).
 *
 * Structure: MSH { CLOCK_AND_STATS_WITH_NOTES: [ CLOCK: NCK [{NTE}] ] [ APP_STATS: NST [{NTE}] ] [ APP_STATUS: NSC [{NTE}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { NMD_N02_STRUCTURE } from "../../structures/v2.4/NMD_N02.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { NCK } from "../../segments/v2.4/NCK.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { NST } from "../../segments/v2.4/NST.ts";
import type { NSC } from "../../segments/v2.4/NSC.ts";

/** The CLOCK AND STATS WITH NOTES group of an NMD^N02 (HL7 v2.4) message being built. */
export interface ClockAndStatistics {
  /** The NCK segment. */
  systemClock?: NCK;
  /** The NTE segments. */
  clockNotes?: NTE[];
  /** The NST segment. */
  applicationStatistics?: NST;
  /** The NTE segments. */
  statisticsNotes?: NTE[];
  /** The NSC segment. */
  applicationStatus?: NSC;
  /** The NTE segments. */
  statusNotes?: NTE[];
}

/** The optional segments and groups of an NMD^N02 (HL7 v2.4) message. The message has none. */
export type NMD_N02Options = Record<string, never>;

/** Builder for HL7 NMD^N02 (HL7 v2.4) messages. */
export class NMD_N02<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMD_N02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMD_N02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public clockAndStatistics: ClockAndStatistics[],
    public options: NMD_N02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, clockAndStatistics: this.clockAndStatistics };
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

/** Builds an HL7 NMD^N02 (HL7 v2.4) message. */
export function createNMD_N02<TMSH extends MSH = MSH>(
  header: TMSH,
  clockAndStatistics: ClockAndStatistics[],
  options: NMD_N02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMD_N02<TMSH> {
  return new NMD_N02(header, clockAndStatistics, options, encoding);
}
