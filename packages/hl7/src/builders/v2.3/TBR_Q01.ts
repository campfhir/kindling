/**
 * Builder for TBR^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QAK RDF {RDT} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { TBR_Q01_STRUCTURE } from "../../structures/v2.3/TBR_Q01.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { QAK } from "../../segments/v2.3/QAK.ts";
import type { RDF } from "../../segments/v2.3/RDF.ts";
import type { RDT } from "../../segments/v2.3/RDT.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The optional segments and groups of an TBR^Q01 (HL7 v2.3) message. */
export interface TBR_Q01Options {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 TBR^Q01 (HL7 v2.3) messages. */
export class TBR_Q01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TRDF extends RDF = RDF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TBR_Q01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = TBR_Q01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public rowDefinition: TRDF,
    public rows: RDT[],
    public options: TBR_Q01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, rowDefinition: this.rowDefinition, rows: this.rows };
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

/** Builds an HL7 TBR^Q01 (HL7 v2.3) message. */
export function createTBR_Q01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TRDF extends RDF = RDF>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  rowDefinition: TRDF,
  rows: RDT[],
  options: TBR_Q01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): TBR_Q01<TMSH, TMSA, TQAK, TRDF> {
  return new TBR_Q01(header, acknowledgment, queryAcknowledgment, rowDefinition, rows, options, encoding);
}
