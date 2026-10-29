/**
 * Builder for EAN^U09 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { NOTIFICATION: NDS [NTE] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EAN_U09_STRUCTURE } from "../../structures/v2.6/EAN_U09.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { EQU } from "../../segments/v2.6/EQU.ts";
import type { NDS } from "../../segments/v2.6/NDS.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";

/** The NOTIFICATION group of an EAN^U09 (HL7 v2.6) message being built. */
export interface NotificationGroup {
  /** The NDS segment. */
  notificationDetail: NDS;
  /** The NTE segment. */
  note?: NTE;
}

/** The optional segments and groups of an EAN^U09 (HL7 v2.6) message. */
export interface EAN_U09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 EAN^U09 (HL7 v2.6) messages. */
export class EAN_U09<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAN_U09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EAN_U09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public notifications: NotificationGroup[],
    public options: EAN_U09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, notifications: this.notifications };
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

/** Builds an HL7 EAN^U09 (HL7 v2.6) message. */
export function createEAN_U09<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  notifications: NotificationGroup[],
  options: EAN_U09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EAN_U09<TMSH, TEQU> {
  return new EAN_U09(header, equipmentDetail, notifications, options, encoding);
}
