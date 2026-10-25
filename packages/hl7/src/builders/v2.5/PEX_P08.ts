/**
 * Builder for PEX^P08 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] }] [{PRB}] [{OBX}] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] }] [{PRB}] [{OBX}] ] [{ STUDY: CSR [{CSP}] }] } } }
 * Shares the PEX^P07 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import { PEX_P07, type PEX_P07Options, type Experience, type PexObservation, type PexCause, type RxOrder, type TimingQtyGroup, type RxAdministration, type AssociatedPerson, type AssociatedRxOrder, type Nk1TimingQtyGroup, type AssociatedRxAdmin, type Study } from "./PEX_P07.ts";

export type { Experience, PexObservation, PexCause, RxOrder, TimingQtyGroup, RxAdministration, AssociatedPerson, AssociatedRxOrder, Nk1TimingQtyGroup, AssociatedRxAdmin, Study };
/** The optional segments and groups of an PEX^P08 (HL7 v2.5) message. */
export type PEX_P08Options = PEX_P07Options;

/** Builder for HL7 PEX^P08 (HL7 v2.5) messages. */
export class PEX_P08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> extends PEX_P07<TMSH, TEVN, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PEX_P08";
}

/** Builds an HL7 PEX^P08 (HL7 v2.5) message. */
export function createPEX_P08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  experiences: Experience[],
  options: PEX_P08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PEX_P08<TMSH, TEVN, TPID> {
  return new PEX_P08(header, event, patient, experiences, options, encoding);
}
