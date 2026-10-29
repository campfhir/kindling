/**
 * Builder for NMD^N02 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { CLOCK_AND_STATS_WITH_NOTES: [ CLOCK: NCK [{NTE}] ] [ APP_STATS: NST [{NTE}] ] [ APP_STATUS: NSC [{NTE}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { NMD_N02_STRUCTURE } from "../../structures/v2.7/NMD_N02.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { NCK } from "../../segments/v2.7/NCK.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { NST } from "../../segments/v2.7/NST.ts";
import type { NSC } from "../../segments/v2.7/NSC.ts";

/** The CLOCK AND STATS WITH NOTES group of an NMD^N02 (HL7 v2.7) message being built. */
export interface ClockAndStatsWithNotesGroup {
  /** The CLOCK group. */
  clock?: ClockGroup;
  /** The APP STATS group. */
  appStats?: AppStatsGroup;
  /** The APP STATUS group. */
  appStatus?: AppStatusGroup;
}

/** The CLOCK group of an NMD^N02 (HL7 v2.7) message being built. */
export interface ClockGroup {
  /** The NCK segment. */
  systemClock: NCK;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The APP STATS group of an NMD^N02 (HL7 v2.7) message being built. */
export interface AppStatsGroup {
  /** The NST segment. */
  applicationStatistics: NST;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The APP STATUS group of an NMD^N02 (HL7 v2.7) message being built. */
export interface AppStatusGroup {
  /** The NSC segment. */
  applicationStatus: NSC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an NMD^N02 (HL7 v2.7) message. */
export interface NMD_N02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 NMD^N02 (HL7 v2.7) messages. */
export class NMD_N02<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMD_N02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMD_N02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public clockAndStatsWithNotes: ClockAndStatsWithNotesGroup[],
    public options: NMD_N02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, clockAndStatsWithNotes: this.clockAndStatsWithNotes };
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

/** Builds an HL7 NMD^N02 (HL7 v2.7) message. */
export function createNMD_N02<TMSH extends MSH = MSH>(
  header: TMSH,
  clockAndStatsWithNotes: ClockAndStatsWithNotesGroup[],
  options: NMD_N02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMD_N02<TMSH> {
  return new NMD_N02(header, clockAndStatsWithNotes, options, encoding);
}
