/**
 * Builder for SRR^S01 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [ SCHEDULE: SCH [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SRR_S01_STRUCTURE } from "../../structures/v2.4/SRR_S01.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { SCH } from "../../segments/v2.4/SCH.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { DG1 } from "../../segments/v2.4/DG1.ts";
import type { RGS } from "../../segments/v2.4/RGS.ts";
import type { AIS } from "../../segments/v2.4/AIS.ts";
import type { AIG } from "../../segments/v2.4/AIG.ts";
import type { AIL } from "../../segments/v2.4/AIL.ts";
import type { AIP } from "../../segments/v2.4/AIP.ts";

/** The SCHEDULE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRScheduleGroup {
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: SRRPatientGroup[];
  /** The RESOURCES groups. */
  resources: SRRResourcesGroup[];
}

/** The PATIENT group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRPatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: SRRServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: SRRGeneralResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: SRRLocationResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: SRRPersonnelResourceGroup[];
}

/** The SERVICE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRGeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRLocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRPersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SRR^S01 (HL7 v2.4) message. */
export interface SRR_S01Options {
  /** The ERR segment. */
  error?: ERR;
  /** The SCHEDULE group. */
  schedule?: SRRScheduleGroup;
}

/** Builder for HL7 SRR^S01 (HL7 v2.4) messages. */
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

/** Builds an HL7 SRR^S01 (HL7 v2.4) message. */
export function createSRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S01<TMSH, TMSA> {
  return new SRR_S01(header, acknowledgment, options, encoding);
}
