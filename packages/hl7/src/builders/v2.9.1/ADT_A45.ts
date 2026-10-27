/**
 * Builder for ADT^A45 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] { MERGE_INFO: MRG PV1 }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A45_STRUCTURE } from "../../structures/v2.9.1/ADT_A45.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { MRG } from "../../segments/v2.9.1/MRG.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";

/** The MERGE INFO group of an ADT^A45 (HL7 v2.9.1) message being built. */
export interface MergeInfoGroup {
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit: PV1;
}

/** The optional segments and groups of an ADT^A45 (HL7 v2.9.1) message. */
export interface ADT_A45Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
}

/** Builder for HL7 ADT^A45 (HL7 v2.9.1) messages. */
export class ADT_A45<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A45";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A45_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public mergeInfos: MergeInfoGroup[],
    public options: ADT_A45Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, mergeInfos: this.mergeInfos };
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

/** Builds an HL7 ADT^A45 (HL7 v2.9.1) message. */
export function createADT_A45<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  mergeInfos: MergeInfoGroup[],
  options: ADT_A45Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A45<TMSH, TEVN, TPID> {
  return new ADT_A45(header, event, patient, mergeInfos, options, encoding);
}
