/**
 * Builder for ORU^R30 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORU_R30_STRUCTURE } from "../../structures/v2.5/ORU_R30.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";

/** The TIMING QTY group of an ORU^R30 (HL7 v2.5) message being built. */
export interface TimingQty {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The OBSERVATION group of an ORU^R30 (HL7 v2.5) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The optional segments and groups of an ORU^R30 (HL7 v2.5) message. */
export interface ORU_R30Options {
  /** The SFT segments. */
  sftList?: SFT[];
  /** The PD1 segment. */
  pd1?: PD1;
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The NTE segments. */
  obrNteList?: NTE[];
  /** The TIMING QTY groups. */
  timing?: TimingQty[];
}

/** Builder for HL7 ORU^R30 (HL7 v2.5) messages. */
export class ORU_R30<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R30";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R30_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public pid: TPID,
    public orc: TORC,
    public obr: TOBR,
    public observations: ObservationGroup[],
    public options: ORU_R30Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, pid: this.pid, orc: this.orc, obr: this.obr, observations: this.observations };
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

/** Builds an HL7 ORU^R30 (HL7 v2.5) message. */
export function createORU_R30<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  msh: TMSH,
  pid: TPID,
  orc: TORC,
  obr: TOBR,
  observations: ObservationGroup[],
  options: ORU_R30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R30<TMSH, TPID, TORC, TOBR> {
  return new ORU_R30(msh, pid, orc, obr, observations, options, encoding);
}
