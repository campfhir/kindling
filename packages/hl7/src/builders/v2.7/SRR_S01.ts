/**
 * Builder for SRR^S01 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SRR_S01_STRUCTURE } from "../../structures/v2.7/SRR_S01.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { ERR } from "../../segments/v2.7/ERR.ts";
import type { SCH } from "../../segments/v2.7/SCH.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";
import type { DG1 } from "../../segments/v2.7/DG1.ts";
import type { RGS } from "../../segments/v2.7/RGS.ts";
import type { AIS } from "../../segments/v2.7/AIS.ts";
import type { AIG } from "../../segments/v2.7/AIG.ts";
import type { AIL } from "../../segments/v2.7/AIL.ts";
import type { AIP } from "../../segments/v2.7/AIP.ts";

/** The SCHEDULE group of an SRR^S01 (HL7 v2.7) message being built. */
export interface ScheduleGroup {
  /** The SCH segment. */
  appointment: SCH;
  /** The TQ1 segments. */
  timings?: TQ1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: PatientGroup[];
  /** The RESOURCES groups. */
  resources: ResourcesGroup[];
}

/** The PATIENT group of an SRR^S01 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of an SRR^S01 (HL7 v2.7) message being built. */
export interface ResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: GeneralResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: LocationResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: PersonnelResourceGroup[];
}

/** The SERVICE group of an SRR^S01 (HL7 v2.7) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SRR^S01 (HL7 v2.7) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SRR^S01 (HL7 v2.7) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SRR^S01 (HL7 v2.7) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SRR^S01 (HL7 v2.7) message. */
export interface SRR_S01Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SCHEDULE group. */
  schedule?: ScheduleGroup;
}

/** Builder for HL7 SRR^S01 (HL7 v2.7) messages. */
export class SRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRR_S01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SRR_S01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: SRR_S01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 SRR^S01 (HL7 v2.7) message. */
export function createSRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S01<TMSH, TMSA> {
  return new SRR_S01(header, acknowledgment, options, encoding);
}
