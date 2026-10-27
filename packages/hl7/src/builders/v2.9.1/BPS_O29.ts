/**
 * Builder for BPS^O29 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] BPO [{NTE}] [{ PRODUCT: BPX [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BPS_O29_STRUCTURE } from "../../structures/v2.9.1/BPS_O29.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { BPO } from "../../segments/v2.9.1/BPO.ts";
import type { BPX } from "../../segments/v2.9.1/BPX.ts";

/** The PATIENT group of an BPS^O29 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The PATIENT VISIT group of an BPS^O29 (HL7 v2.9.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of an BPS^O29 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT groups. */
  products?: ProductGroup[];
}

/** The TIMING group of an BPS^O29 (HL7 v2.9.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT group of an BPS^O29 (HL7 v2.9.1) message being built. */
export interface ProductGroup {
  /** The BPX segment. */
  bloodProductDispenseStatus: BPX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an BPS^O29 (HL7 v2.9.1) message. */
export interface BPS_O29Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 BPS^O29 (HL7 v2.9.1) messages. */
export class BPS_O29<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BPS_O29";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BPS_O29_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: BPS_O29Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders };
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

/** Builds an HL7 BPS^O29 (HL7 v2.9.1) message. */
export function createBPS_O29<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: BPS_O29Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BPS_O29<TMSH> {
  return new BPS_O29(header, orders, options, encoding);
}
