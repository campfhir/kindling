/**
 * Builder for NMR^N01 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QRD] { CLOCK_AND_STATS_WITH_NOTES_ALT: [NCK] [{NTE}] [NST] [{NTE}] [NSC] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { NMR_N01_STRUCTURE } from "../../structures/v2.6/NMR_N01.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { NCK } from "../../segments/v2.6/NCK.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { NST } from "../../segments/v2.6/NST.ts";
import type { NSC } from "../../segments/v2.6/NSC.ts";

/** The CLOCK AND STATS WITH NOTES ALT group of an NMR^N01 (HL7 v2.6) message being built. */
export interface ClockAndStatsWithNotesAltGroup {
  /** The NCK segment. */
  systemClock?: NCK;
  /** The NTE segments. */
  notes?: NTE[];
  /** The NST segment. */
  applicationStatistics?: NST;
  /** The NTE segments. */
  nte2?: NTE[];
  /** The NSC segment. */
  applicationStatus?: NSC;
  /** The NTE segments. */
  nte3?: NTE[];
}

/** The optional segments and groups of an NMR^N01 (HL7 v2.6) message. */
export interface NMR_N01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QRD segment. */
  query?: QRD;
}

/** Builder for HL7 NMR^N01 (HL7 v2.6) messages. */
export class NMR_N01<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMR_N01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMR_N01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public clockAndStatsWithNotesAlts: ClockAndStatsWithNotesAltGroup[],
    public options: NMR_N01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, clockAndStatsWithNotesAlts: this.clockAndStatsWithNotesAlts };
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

/** Builds an HL7 NMR^N01 (HL7 v2.6) message. */
export function createNMR_N01<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  clockAndStatsWithNotesAlts: ClockAndStatsWithNotesAltGroup[],
  options: NMR_N01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMR_N01<TMSH, TMSA> {
  return new NMR_N01(header, acknowledgment, clockAndStatsWithNotesAlts, options, encoding);
}
