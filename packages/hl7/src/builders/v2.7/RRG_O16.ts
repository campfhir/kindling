/**
 * Builder for RRG^O16 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ GIVE: RXG { TIMING_GIVE: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RRG_O16_STRUCTURE } from "../../structures/v2.7/RRG_O16.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { ERR } from "../../segments/v2.7/ERR.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";
import type { RXG } from "../../segments/v2.7/RXG.ts";
import type { RXR } from "../../segments/v2.7/RXR.ts";
import type { RXC } from "../../segments/v2.7/RXC.ts";

/** The RESPONSE group of an RRG^O16 (HL7 v2.7) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an RRG^O16 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an RRG^O16 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The GIVE group. */
  give?: GiveGroup;
}

/** The TIMING group of an RRG^O16 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The GIVE group of an RRG^O16 (HL7 v2.7) message being built. */
export interface GiveGroup {
  /** The RXG segment. */
  give: RXG;
  /** The TIMING GIVE groups. */
  timingGives: TimingGiveGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING GIVE group of an RRG^O16 (HL7 v2.7) message being built. */
export interface TimingGiveGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an RRG^O16 (HL7 v2.7) message. */
export interface RRG_O16Options {
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

/** Builder for HL7 RRG^O16 (HL7 v2.7) messages. */
export class RRG_O16<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRG_O16";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRG_O16_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: RRG_O16Options = {},
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

/** Builds an HL7 RRG^O16 (HL7 v2.7) message. */
export function createRRG_O16<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRG_O16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRG_O16<TMSH, TMSA> {
  return new RRG_O16(header, acknowledgment, options, encoding);
}
