/**
 * Builder for RCL^I06 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{DG1}] [{DRG}] [{AL1}] [{NTE}] [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RCL_I06_STRUCTURE } from "../../structures/v2.3.1/RCL_I06.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MSA } from "../../segments/v2.3.1/MSA.ts";
import type { QRD } from "../../segments/v2.3.1/QRD.ts";
import type { QRF } from "../../segments/v2.3.1/QRF.ts";
import type { PRD } from "../../segments/v2.3.1/PRD.ts";
import type { CTD } from "../../segments/v2.3.1/CTD.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { DG1 } from "../../segments/v2.3.1/DG1.ts";
import type { DRG } from "../../segments/v2.3.1/DRG.ts";
import type { AL1 } from "../../segments/v2.3.1/AL1.ts";
import type { NTE } from "../../segments/v2.3.1/NTE.ts";
import type { DSP } from "../../segments/v2.3.1/DSP.ts";
import type { DSC } from "../../segments/v2.3.1/DSC.ts";

/** The PROVIDER group of an RCL^I06 (HL7 v2.3.1) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RCL^I06 (HL7 v2.3.1) message. */
export interface RCL_I06Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RCL^I06 (HL7 v2.3.1) messages. */
export class RCL_I06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCL_I06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RCL_I06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public providers: Provider[],
    public patient: TPID,
    public options: RCL_I06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RCL^I06 (HL7 v2.3.1) message. */
export function createRCL_I06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  providers: Provider[],
  patient: TPID,
  options: RCL_I06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RCL_I06<TMSH, TMSA, TQRD, TPID> {
  return new RCL_I06(header, acknowledgment, query, providers, patient, options, encoding);
}
