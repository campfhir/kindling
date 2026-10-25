/**
 * Builder for DOC^T12 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD { RESULT: [EVN] PID PV1 TXA [{OBX}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DOC_T12_STRUCTURE } from "../../structures/v2.5/DOC_T12.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { QAK } from "../../segments/v2.5/QAK.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { TXA } from "../../segments/v2.5/TXA.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The RESULT group of an DOC^T12 (HL7 v2.5) message being built. */
export interface ResultGroup {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The TXA segment. */
  document: TXA;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an DOC^T12 (HL7 v2.5) message. */
export interface DOC_T12Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 DOC^T12 (HL7 v2.5) messages. */
export class DOC_T12<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DOC_T12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DOC_T12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public results: ResultGroup[],
    public options: DOC_T12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, results: this.results };
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

/** Builds an HL7 DOC^T12 (HL7 v2.5) message. */
export function createDOC_T12<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  results: ResultGroup[],
  options: DOC_T12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DOC_T12<TMSH, TMSA, TQRD> {
  return new DOC_T12(header, acknowledgment, query, results, options, encoding);
}
