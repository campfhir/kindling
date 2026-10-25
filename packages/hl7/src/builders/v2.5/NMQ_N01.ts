/**
 * Builder for NMQ^N01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [ QRY_WITH_DETAIL: QRD [QRF] ] { CLOCK_AND_STATISTICS: [NCK] [NST] [NSC] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { NMQ_N01_STRUCTURE } from "../../structures/v2.5/NMQ_N01.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";
import type { QRF } from "../../segments/v2.5/QRF.ts";
import type { NCK } from "../../segments/v2.5/NCK.ts";
import type { NST } from "../../segments/v2.5/NST.ts";
import type { NSC } from "../../segments/v2.5/NSC.ts";

/** The CLOCK AND STATISTICS group of an NMQ^N01 (HL7 v2.5) message being built. */
export interface ClockAndStatistics {
  /** The NCK segment. */
  systemClock?: NCK;
  /** The NST segment. */
  applicationStatistics?: NST;
  /** The NSC segment. */
  applicationStatus?: NSC;
}

/** The optional segments and groups of an NMQ^N01 (HL7 v2.5) message. */
export interface NMQ_N01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The QRD segment. */
  query?: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 NMQ^N01 (HL7 v2.5) messages. */
export class NMQ_N01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMQ_N01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMQ_N01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public clockAndStatistics: ClockAndStatistics[],
    public options: NMQ_N01Options = {},
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

/** Builds an HL7 NMQ^N01 (HL7 v2.5) message. */
export function createNMQ_N01<TMSH extends MSH = MSH>(
  header: TMSH,
  clockAndStatistics: ClockAndStatistics[],
  options: NMQ_N01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMQ_N01<TMSH> {
  return new NMQ_N01(header, clockAndStatistics, options, encoding);
}
