/**
 * Builder for OSU^O51 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [PID] [{PRT}] [{ARV}] { ORDER_STATUS: ORC [{PRT}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OSU_O51_STRUCTURE } from "../../structures/v2.9.1/OSU_O51.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";

/** The ORDER STATUS group of an OSU^O51 (HL7 v2.9.1) message being built. */
export interface OrderStatusGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an OSU^O51 (HL7 v2.9.1) message. */
export interface OSU_O51Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arv2?: ARV[];
}

/** Builder for HL7 OSU^O51 (HL7 v2.9.1) messages. */
export class OSU_O51<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSU_O51";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSU_O51_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orderStatus: OrderStatusGroup[],
    public options: OSU_O51Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orderStatus: this.orderStatus };
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

/** Builds an HL7 OSU^O51 (HL7 v2.9.1) message. */
export function createOSU_O51<TMSH extends MSH = MSH>(
  header: TMSH,
  orderStatus: OrderStatusGroup[],
  options: OSU_O51Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSU_O51<TMSH> {
  return new OSU_O51(header, orderStatus, options, encoding);
}
