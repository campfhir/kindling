/**
 * Builder for ADT^A02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [PDA]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A02_STRUCTURE } from "../../structures/v2.9.1/ADT_A02.ts";
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
import type { OH1 } from "../../segments/v2.9.1/OH1.ts";
import type { OH2 } from "../../segments/v2.9.1/OH2.ts";
import type { OH3 } from "../../segments/v2.9.1/OH3.ts";
import type { OH4 } from "../../segments/v2.9.1/OH4.ts";
import type { ROL } from "../../segments/v2.9.1/ROL.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { DB1 } from "../../segments/v2.9.1/DB1.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { PDA } from "../../segments/v2.9.1/PDA.ts";

/** The OBSERVATION group of an ADT^A02 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an ADT^A02 (HL7 v2.9.1) message. */
export interface ADT_A02Options {
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
  /** The OH1 segments. */
  oh1List?: OH1[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
  /** The OH4 segments. */
  oh4List?: OH4[];
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arv3?: ARV[];
  /** The ROL segments. */
  rol2?: ROL[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The PDA segment. */
  deathAndAutopsy?: PDA;
}

/** Builder for HL7 ADT^A02 (HL7 v2.9.1) messages. */
export class ADT_A02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: ADT_A02Options = {},
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

/** Builds an HL7 ADT^A02 (HL7 v2.9.1) message. */
export function createADT_A02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A02<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A02(header, event, patient, visit, options, encoding);
}
