/**
 * Builder for SQM^S25 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [ REQUEST: ARQ [APR] [PID] { RESOURCES: RGS [{ SERVICE: AIS [APR] }] [{ GENERAL_RESOURCE: AIG [APR] }] [{ PERSONNEL_RESOURCE: AIP [APR] }] [{ LOCATION_RESOURCE: AIL [APR] }] } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SQM_S25_STRUCTURE } from "../../structures/v2.3/SQM_S25.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { QRF } from "../../segments/v2.3/QRF.ts";
import type { ARQ } from "../../segments/v2.3/ARQ.ts";
import type { APR } from "../../segments/v2.3/APR.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { RGS } from "../../segments/v2.3/RGS.ts";
import type { AIS } from "../../segments/v2.3/AIS.ts";
import type { AIG } from "../../segments/v2.3/AIG.ts";
import type { AIP } from "../../segments/v2.3/AIP.ts";
import type { AIL } from "../../segments/v2.3/AIL.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The RESOURCES group of an SQM^S25 (HL7 v2.3) message being built. */
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

/** The SERVICE group of an SQM^S25 (HL7 v2.3) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The GENERAL RESOURCE group of an SQM^S25 (HL7 v2.3) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The PERSONNEL RESOURCE group of an SQM^S25 (HL7 v2.3) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The LOCATION RESOURCE group of an SQM^S25 (HL7 v2.3) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The optional segments and groups of an SQM^S25 (HL7 v2.3) message. */
export interface SQM_S25Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The ARQ segment. */
  appointmentRequest?: ARQ;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The PID segment. */
  patient?: PID;
  /** The RESOURCES groups. */
  resources?: ResourcesGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 SQM^S25 (HL7 v2.3) messages. */
export class SQM_S25<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQM_S25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SQM_S25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: SQM_S25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query };
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

/** Builds an HL7 SQM^S25 (HL7 v2.3) message. */
export function createSQM_S25<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: SQM_S25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SQM_S25<TMSH, TQRD> {
  return new SQM_S25(header, query, options, encoding);
}
