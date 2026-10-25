# Roadmap: Event / Message Types

Tracks message structures (builders in `src/builders/<version>/`, parsers in
`src/parsers/<version>/`, schemas in `codegen/schemas/<version>/`).
HL7 v2.3 completeness comes first, then v2.5.1 parity (see [ROADMAP.md](../ROADMAP.md)).

> The "to build" lists come from the HL7 v2.3 message/event tables compiled from memory of the
> spec. **Verify structures against the official spec before implementing** and fix this file in
> the same PR if something is wrong. Many messages need segments from
> [ROADMAP-SEGMENTS.md](./ROADMAP-SEGMENTS.md) first — dependencies are noted.

Legend: ✅ builder + parser exist · ⬜ not started

## Built

| Family | Events | v2.3 | v2.5.1 |
|---|---|---|---|
| ADT | A01–A18, A20–A51 | ✅ | ✅ |
| QRY / ADR | A19 patient query and response | ✅ | ✅ |
| QRY / QCK / DSR | Q01, Q02, Q03, P04 original-mode queries, acknowledgment and display responses (P04 withdrawn in 2.5) | ✅ | ✅ |
| QRY | R02 (results), T12 (document) | ✅ | ✅ |
| UDM | Q05, R06 unsolicited display update (R06 withdrawn in 2.4) | ✅ | ✅ |
| EQQ / RQQ / SPQ / VQQ / TBR | Q01 enhanced-mode queries and tabular response (Q04, Q09, Q08, Q07, R08 from 2.3.1) | ✅ | ✅ |
| EDR / ERP | R07 enhanced display response, R09 event replay response | ✅ | ✅ |
| SQM / SQR | S25 schedule query and response | ✅ | ✅ |
| VXQ / VXX / VXR | V01 vaccination query, V02 multiple matches, V03 record | ✅ | ✅ |
| ORF | R04, W02 observation query responses | ✅ | ✅ |
| OSQ / OSR | Q06 order status query and response | ✅ | ✅ |
| DOC | T12 document query response | ✅ | ✅ |
| DFT | P03 (post detail financial transactions) | ✅ | ✅ |
| BAR | P01, P02, P05, P06 (add/purge/update/end account) | ✅ | ✅ |
| ORU | R01 | ✅ | ✅ |
| ORU | R30, R31, R32 | n/a (2.5+) | ✅ |
| MFN | M02 (staff/practitioner) | ✅ | ✅ |
| ACK | general acknowledgment | ✅ | ✅ |
| ORM | O01 | ✅ | ✅ |
| ORR | O02 | ✅ | ✅ |
| VXU | V04 (unsolicited vaccination update) | ✅ | ✅ |
| SIU | S12–S24, S26 | ✅ | ✅ |
| SRM | S01–S11 (schedule requests) | ✅ | ✅ |
| SRR | S01–S11 (schedule request responses) | ✅ | ✅ |
| MDM | T01–T11 (document management) | ✅ | ✅ |

## Remaining for v2.3

### Acknowledgments
| Message | Notes | Needs |
|---|---|---|
| ⬜ MCF | Delayed acknowledgment | — |

### Orders and results
| Message | Events | Needs |
|---|---|---|
| ⬜ ORU | R01 variants (unsolicited) and R03 | ✅ |
| ⬜ RDE / RDS / RGV / RAS | Pharmacy encoded order, dispense, give, administration (O01/O02, O13/O14, O15/O16, O17) | RXC, RXG |
| ⬜ RRA / RRD / RRE / RRG / RRI | Pharmacy responses | RXC, RXG |
| ⬜ OMD / OMN / OMS / OMG | Diet, non-stock, stock, general orders | ODS, ODT |

### Financial and documents
| Message | Events | Needs |
|---|---|---|
| ⬜ PEX | P07/P08 product experience | PEO, PES, PCR |
| ⬜ PPR / PPT / PPG / PPP / PRR | Problem/goal/pathway (PC1–PC3, PC6–PCC etc.) | PRB, GOL, PTH, VAR |

### Master files and scheduling
| Message | Events | Needs |
|---|---|---|
| ⬜ MFN | M01 (non-specific), M03 (test/observation), M04 (charge description), M05 (location), M06 (clinical study), M07 (clinical study schedule), M08–M12 | CDM, PRC, OM1–OM7, LOC…, CM0–CM2 |
| ⬜ MFK | Master file application acknowledgment | MFA |
| ⬜ RQI / RPI / RPL / RPR / RQP / RQC / RQA / RPA | Referral & patient information | RF1, PRD |
| ⬜ CRM / CSU | Clinical study registration / unsolicited data | CSR, CSS |
| ⬜ EAC / EAN / EAR / ESR / ESU | Equipment automation | ECD, ECR, EQU, SAC |
| ⬜ INR / INU / LSR / LSU | Inventory / specimen automation | INV, ISD |
| ⬜ NMD / NMQ / NMR | Network management | NCK, NDS, NSC, NST |
| ⬜ STC | Patient state | — |

Done in 0.9: ACK, ORM^O01, ORR^O02 for v2.3 and v2.5.1 (`ORM`/`ORR` cover the OBR, RQD, RQ1, RXO, ODS and ODT order detail choices). Where the structures differ by version (checked on hl7.eu): v2.4 adds `[CTD]` and `[{FT1}]` to `ORM^O01`; v2.5 adds `[{SFT}]` and repeating `ERR` to `ACK`, repeating `ERR` to `ORR^O02`, and repeating `IN3` to `ORM^O01`. v2.3.1 matches v2.3 for all three, and v2.5.1 matches v2.5.

VXU^V04 is also done for every version: v2.3 and v2.3.1 are identical, v2.4 adds `[{GT1}]`, and v2.5/v2.5.1 add `[{SFT}]`, a required `ORC` and the timing group (`TQ1`, `TQ2`).

Done in 0.11: ADT A17, A24, A32, A33, A46, A48, A49, A50 and A51 for v2.3 and v2.5.1, structures
checked on hl7-definition.caristix.com (and HAPI for A17/A24). `A17`/`A24` carry two patient
groups (`patients[0]`/`patients[1]` since 0.14). `A32`/`A33` reuse the `ADT_A01` builder and parser the way `A21`
does; `A46`/`A48`/`A49` reuse `ADT_A34` (`MSH EVN PID [PD1] MRG`); `A50`/`A51` require `PV1` in the
spec but, like `A18`, reuse `ADT_A34` where `PV1` is an option. The optional `[{SFT}]` that v2.5.1
adds after `MSH` is not modelled, consistent with the other v2.5.1 ADT messages here.

Done in 0.12: SIU S18–S24 (wrappers of S12), SRM S01–S11, SRR S01–S11 and MDM T01–T11 for v2.3 and
v2.5.1, structures checked per event on hl7-definition.caristix.com (v2.3, v2.4, v2.5, v2.5.1) and
HAPI v23/v251. SRM is unchanged through v2.5.1. SRR and MDM have two shapes: v2.3 (also v2.4) and
v2.5 (also v2.5.1): SRR gains repeating `ERR` and `[{TQ1}]` after `SCH`; MDM gains `[{SFT}]`, the
COMMON ORDER group (`ORC [{TQ1 [{TQ2}]}] OBR [{NTE}]`) and, in the content events, NTEs under each
`OBX`. Known gaps: `segments/v2.4` re-exports v2.3 for SRR and MDM although v2.4 already matches
v2.3 there, so nothing is missing for v2.4; the existing SIU model includes `PD1` in the v2.3
patient group (Caristix lists it from v2.5) and does not model the v2.5 `[{TQ1}]` after `SCH`.

Done in 0.13: ADT A20, DFT P03 and BAR P01/P02/P05/P06 for v2.3 and v2.5.1, structures checked per
event on hl7-definition.caristix.com (v2.3 and v2.5.1) and HAPI v23 (DFT_P03, BAR_P01). The BAR
VISIT group has no required segment, so the parser opens a new visit when a segment appears out of
group order. ADT, DFT^P03 and BAR have their own shapes per version: v2.4 adds the `ROL`s after
PD1/PV2 and in INSURANCE, repeating `IN3`, the trailing `PDA` in the A01 family (new `PDA`
segment), the COMMON ORDER groups in DFT^P03 and `ABS`/`BLC`/`RMI` closing the BAR^P05 visit (new
segments); v2.5 (also v2.5.1) adds `[{SFT}]` everywhere plus, in DFT^P03, the TQ1/TQ2 timing and
the `NTE` after `FT1`. Wrapper events (A02…, SRR S02…, MDM T03…) wrap the base message of their
own version, so `parsers/v2.5/ADT_A02` wraps the v2.5 `ADT_A01`.

Done in 0.14: every parser and builder is generated from its message structure
(`codegen/schemas/`, see `codegen/README.md`), for every version. Structures were made faithful to
the standard where the hand-written code had drifted (checked on hl7-definition.caristix.com):
v2.3 ADT^A01 has no `ROL` after `PD1` and a single `IN3`; ORU^R01 carries its OBSERVATION groups
(`observations: [{ observation, notes }]`), `[{CTI}]` and `[DSC]`, and from v2.5 `[{SFT}]`, the TIMING
QTY groups, `[CTD]`, `[{FT1}]` and SPECIMEN groups; ORU^R30–R32 are one patient and one order per
message (`pid`, `orc`, `obr`, `observations` at the top level) with `[{SFT}]`, `[PD1]`, the VISIT
group, `[{NTE}]` and TIMING QTY; SIU gains `[{TQ1}]` after `SCH` in v2.5; MFN^M02 gains `[{SFT}]`,
repeating `PRA` and `[{NTE}]` in v2.5 (its `ORG`/`AFF`/`LAN`/`EDU`/`CER` segments have no classes yet
and are skipped); ORR^O02's order detail is optional in every version. Known gap: v2.4 ORU^R01
still mirrors v2.3 (the standard adds `[CTD]` and `[{FT1}]` there). Properties are named after
what a segment holds rather than its code (`patient`, `visit`, `notes`, `diagnoses`,
`observationRequest`, `header`; see `SEGMENT_NAMES` in `src/types/schema.ts`), and ORM/ORR/VXU inline
their PATIENT and visit groups so `patient`, `visit`, `insurances` sit at the top level.

Done in 0.15: the staff master file segments. MFN^M02 is `MSH MFI { MFE STF [PRA] [ORG] }` in
v2.4 (new ORG segment) and `MSH [{SFT}] MFI { MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}]
[{NTE}] }` in v2.5/v2.5.1 (new AFF, LAN, EDU in 2.4 and CER in 2.5; EDU-9 added in 2.5), structures
and field tables from hl7-definition.caristix.com (v2.4, v2.5, v2.5.1).

Done in 0.16: the v2.3 queries (chapters 2–10): QRY/ADR^A19, QRY^Q01/Q02/P04/R02/T12, QCK^Q02,
DSR^Q01/Q03/P04, UDM^Q05/R06, the enhanced-mode EQQ/RQQ/SPQ/VQQ^Q01 with TBR^Q01, EDR^R07, ERP^R09,
SQM/SQR^S25, VXQ^V01/VXX^V02/VXR^V03, ORF^R04/W02, OSQ/OSR^Q06 and DOC^T12, every structure checked
per event and version on hl7-definition.caristix.com (v2.3, v2.3.1, v2.4, v2.5, v2.5.1). Properties
read `query` (QRD), `queryFilter` (QRF), `queryAcknowledgment` (QAK), `displayLines` (DSP),
`rowDefinition`/`rows` (RDF/RDT), `updateDefinition`/`updateSelection` (URD/URS). ADR^A19's
QUERY_RESPONSE groups reuse the ADT^A01 body of their version after an optional EVN; SQM's REQUEST,
SQR's PATIENT, VXR's visit and ORF/OSR's PATIENT groups are inlined. Per version: v2.3.1 adds `[QAK]`
to ADR^A19 (with a repeating `IN3`), ORF^R04/W02 (trailing `[ERR] [QAK]`) and DOC^T12, and renumbers
the enhanced-mode events to EQQ^Q04, VQQ^Q07, SPQ^Q08, RQQ^Q09 and TBR^R08 (the Q01 events are
withdrawn from v2.3.1 on, via `withdrawnMessages`); v2.4 adds the A01 `ROL`s to ADR^A19, `[CTD]` to
ORF and `[{GT1}]` to VXR^V03 and withdraws UDM^R06; v2.5 (also v2.5.1) adds `[{SFT}]` to every query
but QRY^T12, DOC^T12, SQM^S25 and SQR^S25 (after `MSA` in VXX/VXR and after a now repeating `ERR` in
OSR^Q06), the TQ1/TQ2 timing groups to ORF^R04 (not W02, which becomes its own message), OSR^Q06 and
VXR^V03 (with a required `ORC`), repeating `ERR` to ORF, OSR and SQR^S25 plus `[{TQ1}]` after `SCH`,
and withdraws QRY^P04 and DSR^P04. Known gap: Caristix lists OSR^Q06's order detail as required in
v2.4 only; it stays optional in every version here. An NTE after an OBR in ORF is parsed as an order
note, never as an OBSERVATION group without OBX.

Suggested order: **MFN → orders/pharmacy → the rest.**

## v2.5.1 parity
After v2.3 is complete, bring v2.5.1 to parity with the same messages, then add the 2.5.1 additions:
ORU R30–R32 ✅, ACK, QBP/RSP/RTB (conformance-based queries; need QPD, RCP, QAK, QID), OML/OMI
(O21–O23), OUL, ORL, RDE O11/RDS O13, RAS O17, VXU V04, MFN (M01–M17), SIU/SRM scheduling
(S01–S26), ADT up through A62, MDM T01–T11, BAR P01–P12, DFT P03/P11.

## Definition of done (per event)
1. Schema added under `codegen/schemas/<version>/`, then `pnpm codegen`.
2. Builder + parser completed (remove the `const _TODO` stub marker).
3. Tests: builder, parser, and a round-trip with a realistic sample under `src/parsers/testdata/`.
4. Barrel regenerated (`pnpm barrels`), `pnpm lint && pnpm typecheck && pnpm test` green.
