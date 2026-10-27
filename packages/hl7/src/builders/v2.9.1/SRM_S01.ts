/**
 * Builder for SRM^S01 messages (HL7 v2.9.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{ OBSERVATION: OBX [{PRT}] }] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SRM_S01_STRUCTURE } from "../../structures/v2.9.1/SRM_S01.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARQ } from "../../segments/v2.9.1/ARQ.ts";
import type { APR } from "../../segments/v2.9.1/APR.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { DG1 } from "../../segments/v2.9.1/DG1.ts";
import type { RGS } from "../../segments/v2.9.1/RGS.ts";
import type { AIS } from "../../segments/v2.9.1/AIS.ts";
import type { AIG } from "../../segments/v2.9.1/AIG.ts";
import type { AIL } from "../../segments/v2.9.1/AIL.ts";
import type { AIP } from "../../segments/v2.9.1/AIP.ts";

/** The PATIENT group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The OBSERVATION group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RESOURCES group of an SRM^S01 (HL7 v2.9.1) message being built. */
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

/** The SERVICE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SRM^S01 (HL7 v2.9.1) message. */
export interface SRM_S01Options {
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: PatientGroup[];
}

/** Builder for HL7 SRM^S01 (HL7 v2.9.1) messages. */
export class SRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRM_S01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SRM_S01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public appointmentRequest: TARQ,
    public resources: ResourcesGroup[],
    public options: SRM_S01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, appointmentRequest: this.appointmentRequest, resources: this.resources };
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

/** Builds an HL7 SRM^S01 (HL7 v2.9.1) message. */
export function createSRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: ResourcesGroup[],
  options: SRM_S01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S01<TMSH, TARQ> {
  return new SRM_S01(header, appointmentRequest, resources, options, encoding);
}
