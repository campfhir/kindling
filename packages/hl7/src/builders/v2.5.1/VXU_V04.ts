/**
 * Builder for VXU^V04 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { VXU_V04_STRUCTURE } from "../../structures/v2.5.1/VXU_V04.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PD1 } from "../../segments/v2.5.1/PD1.ts";
import type { NK1 } from "../../segments/v2.5.1/NK1.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";
import type { GT1 } from "../../segments/v2.5.1/GT1.ts";
import type { IN1 } from "../../segments/v2.5.1/IN1.ts";
import type { IN2 } from "../../segments/v2.5.1/IN2.ts";
import type { IN3 } from "../../segments/v2.5.1/IN3.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import type { RXA } from "../../segments/v2.5.1/RXA.ts";
import type { RXR } from "../../segments/v2.5.1/RXR.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";

/** The PATIENT group of an VXU^V04 (HL7 v2.5.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  pv1: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
}

/** The INSURANCE group of an VXU^V04 (HL7 v2.5.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segment. */
  in3?: IN3;
}

/** The ORDER group of an VXU^V04 (HL7 v2.5.1) message being built. */
export interface VaccinationGroup {
  /** The ORC segment. */
  orc: ORC;
  /** The TIMING groups. */
  timing?: TimingGroup[];
  /** The RXA segment. */
  rxa: RXA;
  /** The RXR segment. */
  rxr?: RXR;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The TIMING group of an VXU^V04 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The OBSERVATION group of an VXU^V04 (HL7 v2.5.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The optional segments and groups of an VXU^V04 (HL7 v2.5.1) message. */
export interface VXU_V04Options {
  /** The SFT segments. */
  sftList?: SFT[];
  /** The PD1 segment. */
  pd1?: PD1;
  /** The NK1 segments. */
  nk1List?: NK1[];
  /** The PATIENT group. */
  visit?: VisitGroup;
  /** The GT1 segments. */
  gt1List?: GT1[];
  /** The INSURANCE groups. */
  insurance?: InsuranceGroup[];
  /** The ORDER groups. */
  orders?: VaccinationGroup[];
}

/** Builder for HL7 VXU^V04 (HL7 v2.5.1) messages. */
export class VXU_V04<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXU_V04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXU_V04_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public pid: TPID,
    public options: VXU_V04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, pid: this.pid };
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

/** Builds an HL7 VXU^V04 (HL7 v2.5.1) message. */
export function createVXU_V04<TMSH extends MSH = MSH, TPID extends PID = PID>(
  msh: TMSH,
  pid: TPID,
  options: VXU_V04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXU_V04<TMSH, TPID> {
  return new VXU_V04(msh, pid, options, encoding);
}
