/**
 * Builder for ADT^A24 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [PV1] [{DB1}] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [PV1] [{DB1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A24_STRUCTURE } from "../../structures/v2.9.1/ADT_A24.ts";
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
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { DB1 } from "../../segments/v2.9.1/DB1.ts";

/** The optional segments and groups of an ADT^A24 (HL7 v2.9.1) message. */
export interface ADT_A24Options {
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
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The PD1 segment. */
  pd12?: PD1;
  /** The GSP segments. */
  gsp2?: GSP[];
  /** The GSR segments. */
  gsr2?: GSR[];
  /** The GSC segments. */
  gsc2?: GSC[];
  /** The PV1 segment. */
  pv12?: PV1;
  /** The DB1 segments. */
  db12?: DB1[];
}

/** Builder for HL7 ADT^A24 (HL7 v2.9.1) messages. */
export class ADT_A24<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public pid2: PID,
    public options: ADT_A24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, pid2: this.pid2 };
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

/** Builds an HL7 ADT^A24 (HL7 v2.9.1) message. */
export function createADT_A24<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  pid2: PID,
  options: ADT_A24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A24<TMSH, TEVN, TPID> {
  return new ADT_A24(header, event, patient, pid2, options, encoding);
}
