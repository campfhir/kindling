/**
 * Builder for BAR^P05 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC] [UB1] [UB2] }
 * Shares the BAR^P01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EVN } from "../../segments/v2.3.1/EVN.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import { BAR_P01, type BAR_P01Options, type BARVisitGroup, type BARProcedureGroup, type BARInsuranceGroup } from "./BAR_P01.ts";

export type { BARVisitGroup, BARProcedureGroup, BARInsuranceGroup };
/** The optional segments and groups of an BAR^P05 (HL7 v2.3.1) message. */
export type BAR_P05Options = BAR_P01Options;

/** Builder for HL7 BAR^P05 (HL7 v2.3.1) messages. */
export class BAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> extends BAR_P01<TMSH, TEVN, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "BAR_P05";
}

/** Builds an HL7 BAR^P05 (HL7 v2.3.1) message. */
export function createBAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visits: BARVisitGroup[],
  options: BAR_P05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P05<TMSH, TEVN, TPID> {
  return new BAR_P05(header, event, patient, visits, options, encoding);
}
