/**
 * Builder for RCI^I05 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{DG1}] [{DRG}] [{AL1}] [ OBSERVATION: OBR [{NTE}] [ RESULTS: OBX [{NTE}] ] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RCI_I05_STRUCTURE } from "../../structures/v2.7/RCI_I05.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { QRD } from "../../segments/v2.7/QRD.ts";
import type { QRF } from "../../segments/v2.7/QRF.ts";
import type { PRD } from "../../segments/v2.7/PRD.ts";
import type { CTD } from "../../segments/v2.7/CTD.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { DG1 } from "../../segments/v2.7/DG1.ts";
import type { DRG } from "../../segments/v2.7/DRG.ts";
import type { AL1 } from "../../segments/v2.7/AL1.ts";
import type { OBR } from "../../segments/v2.7/OBR.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";

/** The PROVIDER group of an RCI^I05 (HL7 v2.7) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The OBSERVATION group of an RCI^I05 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS group. */
  results?: ResultsGroup;
}

/** The RESULTS group of an RCI^I05 (HL7 v2.7) message being built. */
export interface ResultsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RCI^I05 (HL7 v2.7) message. */
export interface RCI_I05Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The OBSERVATION group. */
  observation?: ObservationGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RCI^I05 (HL7 v2.7) messages. */
export class RCI_I05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCI_I05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RCI_I05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public providers: ProviderGroup[],
    public patient: TPID,
    public options: RCI_I05Options = {},
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

/** Builds an HL7 RCI^I05 (HL7 v2.7) message. */
export function createRCI_I05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  providers: ProviderGroup[],
  patient: TPID,
  options: RCI_I05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RCI_I05<TMSH, TMSA, TQRD, TPID> {
  return new RCI_I05(header, acknowledgment, query, providers, patient, options, encoding);
}
