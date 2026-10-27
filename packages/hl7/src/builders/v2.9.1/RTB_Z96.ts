/**
 * Builder for RTB^Z96 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RTB_Z96_STRUCTURE } from "../../structures/v2.9.1/RTB_Z96.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { QAK } from "../../segments/v2.9.1/QAK.ts";
import type { QPD } from "../../segments/v2.9.1/QPD.ts";
import type { RDF } from "../../segments/v2.9.1/RDF.ts";
import type { RDT } from "../../segments/v2.9.1/RDT.ts";
import type { DSC } from "../../segments/v2.9.1/DSC.ts";

/** The ROW DEFINITION group of an RTB^Z96 (HL7 v2.9.1) message being built. */
export interface RowDefinitionGroup {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** The optional segments and groups of an RTB^Z96 (HL7 v2.9.1) message. */
export interface RTB_Z96Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The ROW DEFINITION group. */
  rowDefinition?: RowDefinitionGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RTB^Z96 (HL7 v2.9.1) messages. */
export class RTB_Z96<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_Z96";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RTB_Z96_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RTB_Z96Options = {},
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

/** Builds an HL7 RTB^Z96 (HL7 v2.9.1) message. */
export function createRTB_Z96<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RTB_Z96Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RTB_Z96<TMSH, TMSA, TQAK, TQPD> {
  return new RTB_Z96(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
