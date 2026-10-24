/**
 * Builder for DFT^P03 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}] [{ COMMON_ORDER: [ORC] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }] { FINANCIAL: FT1 [NTE] [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: [ORC] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{NTE}] }] }] } [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DFT_P03_STRUCTURE } from "../../structures/v2.5/DFT_P03.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { ROL } from "../../segments/v2.5/ROL.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { DB1 } from "../../segments/v2.5/DB1.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { FT1 } from "../../segments/v2.5/FT1.ts";
import type { PR1 } from "../../segments/v2.5/PR1.ts";
import type { DG1 } from "../../segments/v2.5/DG1.ts";
import type { DRG } from "../../segments/v2.5/DRG.ts";
import type { GT1 } from "../../segments/v2.5/GT1.ts";
import type { IN1 } from "../../segments/v2.5/IN1.ts";
import type { IN2 } from "../../segments/v2.5/IN2.ts";
import type { IN3 } from "../../segments/v2.5/IN3.ts";
import type { ACC } from "../../segments/v2.5/ACC.ts";

/** The COMMON ORDER group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTOrderGroup {
  /** The ORC segment. */
  orc?: ORC;
  /** The TIMING QUANTITY groups. */
  timing?: DFTTimingGroup[];
  /** The OBR segment. */
  obr?: OBR;
  /** The NTE segments. */
  obrNteList?: NTE[];
  /** The OBSERVATION groups. */
  observations?: DFTObservationGroup[];
}

/** The TIMING QUANTITY group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTTimingGroup {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The OBSERVATION group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTObservationGroup {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The FINANCIAL group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTFinancialGroup {
  /** The FT1 segment. */
  ft1: FT1;
  /** The NTE segment. */
  nte?: NTE;
  /** The FINANCIAL PROCEDURE groups. */
  procedures?: DFTProcedureGroup[];
  /** The FINANCIAL COMMON ORDER groups. */
  orders?: DFTFinancialOrderGroup[];
}

/** The FINANCIAL PROCEDURE group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTProcedureGroup {
  /** The PR1 segment. */
  pr1: PR1;
  /** The ROL segments. */
  rolList?: ROL[];
}

/** The FINANCIAL COMMON ORDER group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTFinancialOrderGroup {
  /** The ORC segment. */
  orc?: ORC;
  /** The FINANCIAL TIMING QUANTITY groups. */
  timing?: DFTFinancialTimingGroup[];
  /** The OBR segment. */
  obr?: OBR;
  /** The NTE segments. */
  obrNteList?: NTE[];
  /** The FINANCIAL OBSERVATION groups. */
  observations?: DFTFinancialObservationGroup[];
}

/** The FINANCIAL TIMING QUANTITY group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTFinancialTimingGroup {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The FINANCIAL OBSERVATION group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTFinancialObservationGroup {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The INSURANCE group of an DFT^P03 (HL7 v2.5) message being built. */
export interface DFTInsuranceGroup {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segments. */
  in3List?: IN3[];
  /** The ROL segments. */
  rolList?: ROL[];
}

/** The optional segments and groups of an DFT^P03 (HL7 v2.5) message. */
export interface DFT_P03Options {
  /** The SFT segments. */
  sftList?: SFT[];
  /** The PD1 segment. */
  pd1?: PD1;
  /** The ROL segments. */
  rolList?: ROL[];
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The ROL segments. */
  visitRolList?: ROL[];
  /** The DB1 segments. */
  db1List?: DB1[];
  /** The COMMON ORDER groups. */
  orders?: DFTOrderGroup[];
  /** The DG1 segments. */
  dg1List?: DG1[];
  /** The DRG segment. */
  drg?: DRG;
  /** The GT1 segments. */
  gt1List?: GT1[];
  /** The INSURANCE groups. */
  insurances?: DFTInsuranceGroup[];
  /** The ACC segment. */
  acc?: ACC;
}

/** Builder for HL7 DFT^P03 (HL7 v2.5) messages. */
export class DFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DFT_P03_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public financials: DFTFinancialGroup[],
    public options: DFT_P03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, evn: this.evn, pid: this.pid, financials: this.financials };
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

/** Builds an HL7 DFT^P03 (HL7 v2.5) message. */
export function createDFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  financials: DFTFinancialGroup[],
  options: DFT_P03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DFT_P03<TMSH, TEVN, TPID> {
  return new DFT_P03(msh, evn, pid, financials, options, encoding);
}
