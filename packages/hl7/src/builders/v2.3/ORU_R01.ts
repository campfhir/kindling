/**
 * Builder for ORU^R01 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORU_R01_STRUCTURE } from "../../structures/v2.3/ORU_R01.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PD1 } from "../../segments/v2.3/PD1.ts";
import type { NK1 } from "../../segments/v2.3/NK1.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { OBR } from "../../segments/v2.3/OBR.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { CTI } from "../../segments/v2.3/CTI.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The PATIENT RESULT group of an ORU^R01 (HL7 v2.3) message being built. */
export interface PatientResult {
  /** The PID segment. */
  pid?: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The NK1 segments. */
  nk1List?: NK1[];
  /** The NTE segments. */
  nteList?: NTE[];
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The ORDER OBSERVATION groups. */
  orderObservations: OrderObservation[];
}

/** The ORDER OBSERVATION group of an ORU^R01 (HL7 v2.3) message being built. */
export interface OrderObservation {
  /** The ORC segment. */
  orc?: ORC;
  /** The OBR segment. */
  obr: OBR;
  /** The NTE segments. */
  obrNteList?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The CTI segments. */
  ctiList?: CTI[];
}

/** The OBSERVATION group of an ORU^R01 (HL7 v2.3) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The optional segments and groups of an ORU^R01 (HL7 v2.3) message. */
export interface ORU_R01Options {
  /** The DSC segment. */
  dsc?: DSC;
}

/** Builder for HL7 ORU^R01 (HL7 v2.3) messages. */
export class ORU_R01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R01_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public patientResults: PatientResult[],
    public options: ORU_R01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, patientResults: this.patientResults };
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

/** Builds an HL7 ORU^R01 (HL7 v2.3) message. */
export function createORU_R01<TMSH extends MSH = MSH>(
  msh: TMSH,
  patientResults: PatientResult[],
  options: ORU_R01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R01<TMSH> {
  return new ORU_R01(msh, patientResults, options, encoding);
}
