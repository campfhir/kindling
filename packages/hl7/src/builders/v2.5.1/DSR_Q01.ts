/**
 * Builder for DSR^Q01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DSR_Q01_STRUCTURE } from "../../structures/v2.5.1/DSR_Q01.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { ERR } from "../../segments/v2.5.1/ERR.ts";
import type { QAK } from "../../segments/v2.5.1/QAK.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";
import type { QRF } from "../../segments/v2.5.1/QRF.ts";
import type { DSP } from "../../segments/v2.5.1/DSP.ts";
import type { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The optional segments and groups of an DSR^Q01 (HL7 v2.5.1) message. */
export interface DSR_Q01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 DSR^Q01 (HL7 v2.5.1) messages. */
export class DSR_Q01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DSR_Q01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DSR_Q01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public displayLines: DSP[],
    public options: DSR_Q01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, displayLines: this.displayLines };
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

/** Builds an HL7 DSR^Q01 (HL7 v2.5.1) message. */
export function createDSR_Q01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  displayLines: DSP[],
  options: DSR_Q01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DSR_Q01<TMSH, TMSA, TQRD> {
  return new DSR_Q01(header, acknowledgment, query, displayLines, options, encoding);
}
