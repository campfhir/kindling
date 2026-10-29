/**
 * Builder for SQR^S25 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] QAK [{ SCHEDULE: SCH [{TQ1}] [{NTE}] [ PATIENT: PID [PV1] [PV2] [DG1] ] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] } }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SQR_S25_STRUCTURE } from "../../structures/v2.6/SQR_S25.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { SCH } from "../../segments/v2.6/SCH.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { RGS } from "../../segments/v2.6/RGS.ts";
import type { AIS } from "../../segments/v2.6/AIS.ts";
import type { AIG } from "../../segments/v2.6/AIG.ts";
import type { AIP } from "../../segments/v2.6/AIP.ts";
import type { AIL } from "../../segments/v2.6/AIL.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The SCHEDULE group of an SQR^S25 (HL7 v2.6) message being built. */
export interface ScheduleGroup {
  /** The SCH segment. */
  appointment: SCH;
  /** The TQ1 segments. */
  timings?: TQ1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The RESOURCES groups. */
  resources: ResourcesGroup[];
}

/** The PATIENT group of an SQR^S25 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segment. */
  diagnosis?: DG1;
}

/** The RESOURCES group of an SQR^S25 (HL7 v2.6) message being built. */
export interface ResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: GeneralResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: PersonnelResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: LocationResourceGroup[];
}

/** The SERVICE group of an SQR^S25 (HL7 v2.6) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SQR^S25 (HL7 v2.6) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SQR^S25 (HL7 v2.6) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SQR^S25 (HL7 v2.6) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SQR^S25 (HL7 v2.6) message. */
export interface SQR_S25Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SCHEDULE groups. */
  schedules?: ScheduleGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 SQR^S25 (HL7 v2.6) messages. */
export class SQR_S25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQR_S25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SQR_S25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public options: SQR_S25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment };
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

/** Builds an HL7 SQR^S25 (HL7 v2.6) message. */
export function createSQR_S25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  options: SQR_S25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SQR_S25<TMSH, TMSA, TQAK> {
  return new SQR_S25(header, acknowledgment, queryAcknowledgment, options, encoding);
}
