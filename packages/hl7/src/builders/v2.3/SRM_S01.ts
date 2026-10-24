/**
 * Builder for SRM^S01 messages (HL7 v2.3).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SRM_S01_STRUCTURE } from "../../structures/v2.3/SRM_S01.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { ARQ } from "../../segments/v2.3/ARQ.ts";
import type { APR } from "../../segments/v2.3/APR.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { DG1 } from "../../segments/v2.3/DG1.ts";
import type { RGS } from "../../segments/v2.3/RGS.ts";
import type { AIS } from "../../segments/v2.3/AIS.ts";
import type { AIG } from "../../segments/v2.3/AIG.ts";
import type { AIL } from "../../segments/v2.3/AIL.ts";
import type { AIP } from "../../segments/v2.3/AIP.ts";

/** The PATIENT group of an SRM^S01 (HL7 v2.3) message being built. */
export interface SRMPatientGroup {
  /** The PID segment. */
  pid: PID;
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The OBX segments. */
  obxList?: OBX[];
  /** The DG1 segments. */
  dg1List?: DG1[];
}

/** The RESOURCES group of an SRM^S01 (HL7 v2.3) message being built. */
export interface SRMResourcesGroup {
  /** The RGS segment. */
  rgs: RGS;
  /** The SERVICE groups. */
  services?: SRMServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: SRMGeneralResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: SRMLocationResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: SRMPersonnelResourceGroup[];
}

/** The SERVICE group of an SRM^S01 (HL7 v2.3) message being built. */
export interface SRMServiceGroup {
  /** The AIS segment. */
  ais: AIS;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The GENERAL RESOURCE group of an SRM^S01 (HL7 v2.3) message being built. */
export interface SRMGeneralResourceGroup {
  /** The AIG segment. */
  aig: AIG;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The LOCATION RESOURCE group of an SRM^S01 (HL7 v2.3) message being built. */
export interface SRMLocationResourceGroup {
  /** The AIL segment. */
  ail: AIL;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SRM^S01 (HL7 v2.3) message being built. */
export interface SRMPersonnelResourceGroup {
  /** The AIP segment. */
  aip: AIP;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The optional segments and groups of an SRM^S01 (HL7 v2.3) message. */
export interface SRM_S01Options {
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The PATIENT groups. */
  patients?: SRMPatientGroup[];
}

/** Builder for HL7 SRM^S01 (HL7 v2.3) messages. */
export class SRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRM_S01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SRM_S01_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public arq: TARQ,
    public resources: SRMResourcesGroup[],
    public options: SRM_S01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, arq: this.arq, resources: this.resources };
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

/** Builds an HL7 SRM^S01 (HL7 v2.3) message. */
export function createSRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  msh: TMSH,
  arq: TARQ,
  resources: SRMResourcesGroup[],
  options: SRM_S01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S01<TMSH, TARQ> {
  return new SRM_S01(msh, arq, resources, options, encoding);
}
