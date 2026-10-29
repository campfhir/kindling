/**
 * Builder for ADR^A19 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] [QAK] QRD [QRF] { QUERY_RESPONSE: [EVN] PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADR_A19_STRUCTURE } from "../../structures/v2.6/ADR_A19.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { QRF } from "../../segments/v2.6/QRF.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { ARV } from "../../segments/v2.6/ARV.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { NK1 } from "../../segments/v2.6/NK1.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { DB1 } from "../../segments/v2.6/DB1.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { AL1 } from "../../segments/v2.6/AL1.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { DRG } from "../../segments/v2.6/DRG.ts";
import type { PR1 } from "../../segments/v2.6/PR1.ts";
import type { GT1 } from "../../segments/v2.6/GT1.ts";
import type { IN1 } from "../../segments/v2.6/IN1.ts";
import type { IN2 } from "../../segments/v2.6/IN2.ts";
import type { IN3 } from "../../segments/v2.6/IN3.ts";
import type { ACC } from "../../segments/v2.6/ACC.ts";
import type { UB1 } from "../../segments/v2.6/UB1.ts";
import type { UB2 } from "../../segments/v2.6/UB2.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The QUERY RESPONSE group of an ADR^A19 (HL7 v2.6) message being built. */
export interface QueryResponseGroup {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ROL segments. */
  rol2?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
}

/** The PROCEDURE group of an ADR^A19 (HL7 v2.6) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of an ADR^A19 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an ADR^A19 (HL7 v2.6) message. */
export interface ADR_A19Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ADR^A19 (HL7 v2.6) messages. */
export class ADR_A19<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADR_A19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADR_A19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public queryResponses: QueryResponseGroup[],
    public options: ADR_A19Options = {},
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

/** Builds an HL7 ADR^A19 (HL7 v2.6) message. */
export function createADR_A19<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  queryResponses: QueryResponseGroup[],
  options: ADR_A19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADR_A19<TMSH, TMSA, TQRD> {
  return new ADR_A19(header, acknowledgment, query, queryResponses, options, encoding);
}
