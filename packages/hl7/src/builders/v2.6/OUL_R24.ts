/**
 * Builder for OUL^R24 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [NTE] [ PATIENT: PID [PD1] [{NTE}] [{OBX}] [ VISIT: PV1 [PV2] ] ] [{NK1}] { ORDER: OBR [ORC] [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ SPECIMEN: SPM [{OBX}] [{ CONTAINER: SAC [INV] }] }] [{ RESULT: OBX [TCD] [{SID}] [{NTE}] }] [{CTI}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OUL_R24_STRUCTURE } from "../../structures/v2.6/OUL_R24.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { NK1 } from "../../segments/v2.6/NK1.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";
import type { SPM } from "../../segments/v2.6/SPM.ts";
import type { SAC } from "../../segments/v2.6/SAC.ts";
import type { INV } from "../../segments/v2.6/INV.ts";
import type { TCD } from "../../segments/v2.6/TCD.ts";
import type { SID } from "../../segments/v2.6/SID.ts";
import type { CTI } from "../../segments/v2.6/CTI.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The PATIENT group of an OUL^R24 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** The VISIT group of an OUL^R24 (HL7 v2.6) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of an OUL^R24 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
  /** The RESULT groups. */
  results?: ResultGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING QTY group of an OUL^R24 (HL7 v2.6) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The SPECIMEN group of an OUL^R24 (HL7 v2.6) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
}

/** The CONTAINER group of an OUL^R24 (HL7 v2.6) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
}

/** The RESULT group of an OUL^R24 (HL7 v2.6) message being built. */
export interface ResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OUL^R24 (HL7 v2.6) message. */
export interface OUL_R24Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OUL^R24 (HL7 v2.6) messages. */
export class OUL_R24<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OUL_R24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: OUL_R24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders };
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

/** Builds an HL7 OUL^R24 (HL7 v2.6) message. */
export function createOUL_R24<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: OUL_R24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OUL_R24<TMSH> {
  return new OUL_R24(header, orders, options, encoding);
}
