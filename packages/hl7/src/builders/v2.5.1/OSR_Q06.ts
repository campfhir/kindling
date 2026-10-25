/**
 * Builder for OSR^Q06 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }]  ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}]  } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OSR_Q06_STRUCTURE } from "../../structures/v2.5.1/OSR_Q06.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { ERR } from "../../segments/v2.5.1/ERR.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";
import type { QRF } from "../../segments/v2.5.1/QRF.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import type { OBR } from "../../segments/v2.5.1/OBR.ts";
import type { RQD } from "../../segments/v2.5.1/RQD.ts";
import type { RQ1 } from "../../segments/v2.5.1/RQ1.ts";
import type { RXO } from "../../segments/v2.5.1/RXO.ts";
import type { ODS } from "../../segments/v2.5.1/ODS.ts";
import type { ODT } from "../../segments/v2.5.1/ODT.ts";
import type { CTI } from "../../segments/v2.5.1/CTI.ts";
import type { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The ORDER group of an OSR^Q06 (HL7 v2.5.1) message being built. */
export interface ResponseOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  detail: ResponseDetailGroup;
}

/** The TIMING group of an OSR^Q06 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an OSR^Q06 (HL7 v2.5.1) message being built. */
export interface ResponseDetailGroup {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an OSR^Q06 (HL7 v2.5.1) message. */
export interface OSR_Q06Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ResponseOrderGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OSR^Q06 (HL7 v2.5.1) messages. */
export class OSR_Q06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSR_Q06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSR_Q06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public options: OSR_Q06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query };
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

/** Builds an HL7 OSR^Q06 (HL7 v2.5.1) message. */
export function createOSR_Q06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  options: OSR_Q06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSR_Q06<TMSH, TMSA, TQRD> {
  return new OSR_Q06(header, acknowledgment, query, options, encoding);
}
