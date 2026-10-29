/**
 * Builder for SIU^S12 messages (HL7 v2.6).
 *
 * Structure: MSH SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SIU_S12_STRUCTURE } from "../../structures/v2.6/SIU_S12.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SCH } from "../../segments/v2.6/SCH.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { RGS } from "../../segments/v2.6/RGS.ts";
import type { AIS } from "../../segments/v2.6/AIS.ts";
import type { AIG } from "../../segments/v2.6/AIG.ts";
import type { AIL } from "../../segments/v2.6/AIL.ts";
import type { AIP } from "../../segments/v2.6/AIP.ts";

/** The PATIENT group of an SIU^S12 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of an SIU^S12 (HL7 v2.6) message being built. */
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

/** The SERVICE group of an SIU^S12 (HL7 v2.6) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SIU^S12 (HL7 v2.6) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SIU^S12 (HL7 v2.6) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SIU^S12 (HL7 v2.6) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SIU^S12 (HL7 v2.6) message. */
export interface SIU_S12Options {
  /** The TQ1 segments. */
  timings?: TQ1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: PatientGroup[];
}

/** Builder for HL7 SIU^S12 (HL7 v2.6) messages. */
export class SIU_S12<TMSH extends MSH = MSH, TSCH extends SCH = SCH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SIU_S12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SIU_S12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public appointment: TSCH,
    public resources: ResourcesGroup[],
    public options: SIU_S12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, appointment: this.appointment, resources: this.resources };
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

/** Builds an HL7 SIU^S12 (HL7 v2.6) message. */
export function createSIU_S12<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: ResourcesGroup[],
  options: SIU_S12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S12<TMSH, TSCH> {
  return new SIU_S12(header, appointment, resources, options, encoding);
}
