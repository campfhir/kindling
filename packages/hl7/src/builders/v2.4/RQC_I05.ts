/**
 * Builder for RQC^I05 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RQC_I05_STRUCTURE } from "../../structures/v2.4/RQC_I05.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { QRD } from "../../segments/v2.4/QRD.ts";
import type { QRF } from "../../segments/v2.4/QRF.ts";
import type { PRD } from "../../segments/v2.4/PRD.ts";
import type { CTD } from "../../segments/v2.4/CTD.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { NK1 } from "../../segments/v2.4/NK1.ts";
import type { GT1 } from "../../segments/v2.4/GT1.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";

/** The PROVIDER group of an RQC^I05 (HL7 v2.4) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RQC^I05 (HL7 v2.4) message. */
export interface RQC_I05Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RQC^I05 (HL7 v2.4) messages. */
export class RQC_I05<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQC_I05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQC_I05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public providers: Provider[],
    public patient: TPID,
    public options: RQC_I05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RQC^I05 (HL7 v2.4) message. */
export function createRQC_I05<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  query: TQRD,
  providers: Provider[],
  patient: TPID,
  options: RQC_I05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQC_I05<TMSH, TQRD, TPID> {
  return new RQC_I05(header, query, providers, patient, options, encoding);
}
