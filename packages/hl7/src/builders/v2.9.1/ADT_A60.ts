/**
 * Builder for ADT^A60 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [{GSP}] [{GSR}] [{GSC}] [{ARV}] [ VISIT_GROUP: PV1 [PV2] [{ARV}] ] [{ ADVERSE_REACTION_GROUP: IAM [{NTE}] [{IAR}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A60_STRUCTURE } from "../../structures/v2.9.1/ADT_A60.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { IAM } from "../../segments/v2.9.1/IAM.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { IAR } from "../../segments/v2.9.1/IAR.ts";

/** The VISIT GROUP group of an ADT^A60 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ADVERSE REACTION GROUP group of an ADT^A60 (HL7 v2.9.1) message being built. */
export interface AdverseReactionGroup {
  /** The IAM segment. */
  adverseReaction: IAM;
  /** The NTE segments. */
  notes?: NTE[];
  /** The IAR segments. */
  iarList?: IAR[];
}

/** The optional segments and groups of an ADT^A60 (HL7 v2.9.1) message. */
export interface ADT_A60Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The ARV segments. */
  arv2?: ARV[];
  /** The VISIT GROUP group. */
  visitGroup?: VisitGroup;
  /** The ADVERSE REACTION GROUP groups. */
  adverseReactionGroups?: AdverseReactionGroup[];
}

/** Builder for HL7 ADT^A60 (HL7 v2.9.1) messages. */
export class ADT_A60<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A60";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A60_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public options: ADT_A60Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient };
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

/** Builds an HL7 ADT^A60 (HL7 v2.9.1) message. */
export function createADT_A60<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  options: ADT_A60Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A60<TMSH, TEVN, TPID> {
  return new ADT_A60(header, event, patient, options, encoding);
}
