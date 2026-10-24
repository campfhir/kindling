/**
 * Builder for MDM^T01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MDM_T01_STRUCTURE } from "../../structures/v2.5.1/MDM_T01.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import type { OBR } from "../../segments/v2.5.1/OBR.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { TXA } from "../../segments/v2.5.1/TXA.ts";

/** The COMMON ORDER group of an MDM^T01 (HL7 v2.5.1) message being built. */
export interface MDMOrderGroup {
  /** The ORC segment. */
  orc: ORC;
  /** The TIMING groups. */
  timing?: MDMTimingGroup[];
  /** The OBR segment. */
  obr: OBR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The TIMING group of an MDM^T01 (HL7 v2.5.1) message being built. */
export interface MDMTimingGroup {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The optional segments and groups of an MDM^T01 (HL7 v2.5.1) message. */
export interface MDM_T01Options {
  /** The SFT segments. */
  sftList?: SFT[];
  /** The COMMON ORDER groups. */
  orders?: MDMOrderGroup[];
}

/** Builder for HL7 MDM^T01 (HL7 v2.5.1) messages. */
export class MDM_T01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MDM_T01_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public pv1: TPV1,
    public txa: TTXA,
    public options: MDM_T01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, evn: this.evn, pid: this.pid, pv1: this.pv1, txa: this.txa };
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

/** Builds an HL7 MDM^T01 (HL7 v2.5.1) message. */
export function createMDM_T01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  txa: TTXA,
  options: MDM_T01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T01(msh, evn, pid, pv1, txa, options, encoding);
}
