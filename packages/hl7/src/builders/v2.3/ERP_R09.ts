/**
 * Builder for ERP^R09 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QAK ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ERP_R09_STRUCTURE } from "../../structures/v2.3/ERP_R09.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { QAK } from "../../segments/v2.3/QAK.ts";
import type { ERQ } from "../../segments/v2.3/ERQ.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The optional segments and groups of an ERP^R09 (HL7 v2.3) message. */
export interface ERP_R09Options {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ERP^R09 (HL7 v2.3) messages. */
export class ERP_R09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TERQ extends ERQ = ERQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ERP_R09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ERP_R09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public eventReplayQuery: TERQ,
    public options: ERP_R09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, eventReplayQuery: this.eventReplayQuery };
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

/** Builds an HL7 ERP^R09 (HL7 v2.3) message. */
export function createERP_R09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TERQ extends ERQ = ERQ>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  eventReplayQuery: TERQ,
  options: ERP_R09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ERP_R09<TMSH, TMSA, TQAK, TERQ> {
  return new ERP_R09(header, acknowledgment, queryAcknowledgment, eventReplayQuery, options, encoding);
}
