/**
 * Builder for ORF^W02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [{ERR}] [QAK] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORF_W02_STRUCTURE } from "../../structures/v2.5/ORF_W02.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";
import type { QRF } from "../../segments/v2.5/QRF.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { CTD } from "../../segments/v2.5/CTD.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { CTI } from "../../segments/v2.5/CTI.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { QAK } from "../../segments/v2.5/QAK.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The QUERY RESPONSE group of an ORF^W02 (HL7 v2.5) message being built. */
export interface QueryResponse {
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders: ResponseOrderGroup[];
}

/** The ORDER group of an ORF^W02 (HL7 v2.5) message being built. */
export interface ResponseOrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The OBSERVATION group of an ORF^W02 (HL7 v2.5) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORF^W02 (HL7 v2.5) message. */
export interface ORF_W02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ORF^W02 (HL7 v2.5) messages. */
export class ORF_W02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORF_W02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORF_W02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public queryResponses: QueryResponse[],
    public options: ORF_W02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, queryResponses: this.queryResponses };
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

/** Builds an HL7 ORF^W02 (HL7 v2.5) message. */
export function createORF_W02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  queryResponses: QueryResponse[],
  options: ORF_W02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORF_W02<TMSH, TMSA, TQRD> {
  return new ORF_W02(header, acknowledgment, query, queryResponses, options, encoding);
}
