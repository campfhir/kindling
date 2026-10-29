/**
 * Builder for RRD^O14 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ DISPENSE: RXD [{NTE}] {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RRD_O14_STRUCTURE } from "../../structures/v2.6/RRD_O14.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";
import type { RXD } from "../../segments/v2.6/RXD.ts";
import type { RXR } from "../../segments/v2.6/RXR.ts";
import type { RXC } from "../../segments/v2.6/RXC.ts";

/** The RESPONSE group of an RRD^O14 (HL7 v2.6) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an RRD^O14 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an RRD^O14 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The DISPENSE group. */
  dispense?: DispenseGroup;
}

/** The TIMING group of an RRD^O14 (HL7 v2.6) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The DISPENSE group of an RRD^O14 (HL7 v2.6) message being built. */
export interface DispenseGroup {
  /** The RXD segment. */
  dispense: RXD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RRD^O14 (HL7 v2.6) message. */
export interface RRD_O14Options {
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

/** Builder for HL7 RRD^O14 (HL7 v2.6) messages. */
export class RRD_O14<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRD_O14";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRD_O14_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: RRD_O14Options = {},
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

/** Builds an HL7 RRD^O14 (HL7 v2.6) message. */
export function createRRD_O14<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRD_O14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRD_O14<TMSH, TMSA> {
  return new RRD_O14(header, acknowledgment, options, encoding);
}
