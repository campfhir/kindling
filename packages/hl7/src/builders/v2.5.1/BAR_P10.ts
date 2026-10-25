/**
 * Builder for BAR^P10 messages (HL7 v2.5.1).
 *
 * Structure: MSH EVN PID PV1 [{DG1}] GP1 [{ PROCEDURE: PR1 [GP2] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P10_STRUCTURE } from "../../structures/v2.5.1/BAR_P10.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { DG1 } from "../../segments/v2.5.1/DG1.ts";
import type { GP1 } from "../../segments/v2.5.1/GP1.ts";
import type { PR1 } from "../../segments/v2.5.1/PR1.ts";
import type { GP2 } from "../../segments/v2.5.1/GP2.ts";

/** The PROCEDURE group of an BAR^P10 (HL7 v2.5.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The GP2 segment. */
  groupingProcedure?: GP2;
}

/** The optional segments and groups of an BAR^P10 (HL7 v2.5.1) message. */
export interface BAR_P10Options {
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
}

/** Builder for HL7 BAR^P10 (HL7 v2.5.1) messages. */
export class BAR_P10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TGP1 extends GP1 = GP1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public groupingVisit: TGP1,
    public options: BAR_P10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit, groupingVisit: this.groupingVisit };
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

/** Builds an HL7 BAR^P10 (HL7 v2.5.1) message. */
export function createBAR_P10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TGP1 extends GP1 = GP1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  groupingVisit: TGP1,
  options: BAR_P10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P10<TMSH, TEVN, TPID, TPV1, TGP1> {
  return new BAR_P10(header, event, patient, visit, groupingVisit, options, encoding);
}
