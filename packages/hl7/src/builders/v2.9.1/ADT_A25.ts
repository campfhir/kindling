/**
 * Builder for ADT^A25 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] PV1 [PV2] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }]
 * Shares the ADT^A21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { ADT_A21, type ADT_A21Options, type ObservationGroup } from "./ADT_A21.ts";

export type { ObservationGroup };
/** The optional segments and groups of an ADT^A25 (HL7 v2.9.1) message. */
export type ADT_A25Options = ADT_A21Options;

/** Builder for HL7 ADT^A25 (HL7 v2.9.1) messages. */
export class ADT_A25<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A21<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A25";
}

/** Builds an HL7 ADT^A25 (HL7 v2.9.1) message. */
export function createADT_A25<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A25<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A25(header, event, patient, visit, options, encoding);
}
