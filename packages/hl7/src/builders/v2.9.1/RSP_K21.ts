/**
 * Builder for RSP^K21 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] MSA [ERR] QAK QPD [ QUERY_RESPONSE: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{ARV}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] QRI ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_K21_STRUCTURE } from "../../structures/v2.9.1/RSP_K21.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { QAK } from "../../segments/v2.9.1/QAK.ts";
import type { QPD } from "../../segments/v2.9.1/QPD.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { QRI } from "../../segments/v2.9.1/QRI.ts";
import type { DSC } from "../../segments/v2.9.1/DSC.ts";

/** The QUERY RESPONSE group of an RSP^K21 (HL7 v2.9.1) message being built. */
export interface QueryResponseGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKinGroup[];
  /** The QRI segment. */
  queryResponseInstance: QRI;
}

/** The NEXT OF KIN group of an RSP^K21 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The optional segments and groups of an RSP^K21 (HL7 v2.9.1) message. */
export interface RSP_K21Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The QUERY RESPONSE group. */
  queryResponse?: QueryResponseGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K21 (HL7 v2.9.1) messages. */
export class RSP_K21<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K21";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K21_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K21Options = {},
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

/** Builds an HL7 RSP^K21 (HL7 v2.9.1) message. */
export function createRSP_K21<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K21<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K21(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
