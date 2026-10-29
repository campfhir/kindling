/**
 * Builder for ORF^R04 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] [{OBX}] ] { ORDER: [ORC] OBR [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [{ERR}] [QAK] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORF_R04_STRUCTURE } from "../../structures/v2.6/ORF_R04.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { QRF } from "../../segments/v2.6/QRF.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";
import type { CTD } from "../../segments/v2.6/CTD.ts";
import type { CTI } from "../../segments/v2.6/CTI.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The QUERY RESPONSE group of an ORF^R04 (HL7 v2.6) message being built. */
export interface QueryResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORF^R04 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The ORDER group of an ORF^R04 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING QTY group of an ORF^R04 (HL7 v2.6) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an ORF^R04 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORF^R04 (HL7 v2.6) message. */
export interface ORF_R04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ORF^R04 (HL7 v2.6) messages. */
export class ORF_R04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORF_R04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORF_R04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public queryResponses: QueryResponseGroup[],
    public options: ORF_R04Options = {},
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

/** Builds an HL7 ORF^R04 (HL7 v2.6) message. */
export function createORF_R04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  queryResponses: QueryResponseGroup[],
  options: ORF_R04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORF_R04<TMSH, TMSA, TQRD> {
  return new ORF_R04(header, acknowledgment, query, queryResponses, options, encoding);
}
