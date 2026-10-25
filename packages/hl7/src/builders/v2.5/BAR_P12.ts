/**
 * Builder for BAR^P12 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P12_STRUCTURE } from "../../structures/v2.5/BAR_P12.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { DG1 } from "../../segments/v2.5/DG1.ts";
import type { DRG } from "../../segments/v2.5/DRG.ts";
import type { PR1 } from "../../segments/v2.5/PR1.ts";
import type { ROL } from "../../segments/v2.5/ROL.ts";

/** The PROCEDURE group of an BAR^P12 (HL7 v2.5) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an BAR^P12 (HL7 v2.5) message. */
export interface BAR_P12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
}

/** Builder for HL7 BAR^P12 (HL7 v2.5) messages. */
export class BAR_P12<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: BAR_P12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit };
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

/** Builds an HL7 BAR^P12 (HL7 v2.5) message. */
export function createBAR_P12<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: BAR_P12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P12<TMSH, TEVN, TPID, TPV1> {
  return new BAR_P12(header, event, patient, visit, options, encoding);
}
