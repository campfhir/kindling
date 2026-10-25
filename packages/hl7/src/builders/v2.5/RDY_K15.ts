/**
 * Builder for RDY^K15 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RDY_K15_STRUCTURE } from "../../structures/v2.5/RDY_K15.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { QAK } from "../../segments/v2.5/QAK.ts";
import type { QPD } from "../../segments/v2.5/QPD.ts";
import type { DSP } from "../../segments/v2.5/DSP.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The optional segments and groups of an RDY^K15 (HL7 v2.5) message. */
export interface RDY_K15Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RDY^K15 (HL7 v2.5) messages. */
export class RDY_K15<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDY_K15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDY_K15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RDY_K15Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters };
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

/** Builds an HL7 RDY^K15 (HL7 v2.5) message. */
export function createRDY_K15<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RDY_K15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDY_K15<TMSH, TMSA, TQAK, TQPD> {
  return new RDY_K15(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
