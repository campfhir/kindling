/**
 * Builder for BRP^O30 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] [{ARV}] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [BPO] [{BPX}] }] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BRP_O30_STRUCTURE } from "../../structures/v2.9.1/BRP_O30.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { BPO } from "../../segments/v2.9.1/BPO.ts";
import type { BPX } from "../../segments/v2.9.1/BPX.ts";

/** The RESPONSE group of an BRP^O30 (HL7 v2.9.1) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** The PATIENT group of an BRP^O30 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The ORDER group of an BRP^O30 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The BPO segment. */
  bloodProductOrder?: BPO;
  /** The BPX segments. */
  bloodProductDispenseStatuses?: BPX[];
}

/** The TIMING group of an BRP^O30 (HL7 v2.9.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an BRP^O30 (HL7 v2.9.1) message. */
export interface BRP_O30Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 BRP^O30 (HL7 v2.9.1) messages. */
export class BRP_O30<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BRP_O30";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BRP_O30_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: BRP_O30Options = {},
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

/** Builds an HL7 BRP^O30 (HL7 v2.9.1) message. */
export function createBRP_O30<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: BRP_O30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BRP_O30<TMSH, TMSA> {
  return new BRP_O30(header, acknowledgment, options, encoding);
}
