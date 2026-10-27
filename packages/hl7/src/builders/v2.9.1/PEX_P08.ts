/**
 * Builder for PEX^P08 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{PRT}] { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] [{PRT}] }] [{PRB}] [{ OBSERVATION: OBX [{PRT}] }] [{NTE}] [ ASSOCIATED_PERSON: NK1 [{GSP}] [{GSR}] [ ASSOCIATED_RX_ORDER: RXE [{PRT}] { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] [{PRT}] }] [{PRB}] [{ ASSOCIATED_OBSERVATION: OBX [{PRT}] }] ] [{ STUDY: CSR [{CSP}] }] } } }
 * Shares the PEX^P07 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import { PEX_P07, type PEX_P07Options, type VisitGroup, type ExperienceGroup, type PexObservationGroup, type PexCauseGroup, type RxOrderGroup, type TimingQtyGroup, type RxAdministrationGroup, type ObservationGroup, type AssociatedPersonGroup, type AssociatedRxOrderGroup, type Nk1TimingQtyGroup, type AssociatedRxAdminGroup, type AssociatedObservationGroup, type StudyGroup } from "./PEX_P07.ts";

export type { VisitGroup, ExperienceGroup, PexObservationGroup, PexCauseGroup, RxOrderGroup, TimingQtyGroup, RxAdministrationGroup, ObservationGroup, AssociatedPersonGroup, AssociatedRxOrderGroup, Nk1TimingQtyGroup, AssociatedRxAdminGroup, AssociatedObservationGroup, StudyGroup };
/** The optional segments and groups of an PEX^P08 (HL7 v2.9.1) message. */
export type PEX_P08Options = PEX_P07Options;

/** Builder for HL7 PEX^P08 (HL7 v2.9.1) messages. */
export class PEX_P08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> extends PEX_P07<TMSH, TEVN, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PEX_P08";
}

/** Builds an HL7 PEX^P08 (HL7 v2.9.1) message. */
export function createPEX_P08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  experiences: ExperienceGroup[],
  options: PEX_P08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PEX_P08<TMSH, TEVN, TPID> {
  return new PEX_P08(header, event, patient, experiences, options, encoding);
}
