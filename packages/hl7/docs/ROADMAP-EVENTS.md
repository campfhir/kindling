# Roadmap: Event / Message Types

Tracks message structures (builders in `src/builders/<version>/`, parsers in
`src/parsers/<version>/`, schemas in `codegen/schemas/<version>/`).
HL7 v2.3 completeness comes first, then v2.5.1 parity (see [ROADMAP.md](../ROADMAP.md)).

> The event list is the HL7 v2.3 trigger event list of the Caristix reference, cross-checked on the
> hl7.eu chapter pages. **Verify structures against the official spec before implementing** and fix
> this file in the same PR if something is wrong. Messages need their segments from
> [ROADMAP-SEGMENTS.md](./ROADMAP-SEGMENTS.md) first.

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
| MFN | M01–M11 master file notifications (M12 from 2.4, M13 and M15 from 2.5) | ✅ | ✅ |
| MFK | M01–M11 master file acknowledgments (M12 from 2.4, M13 and M15 from 2.5) | ✅ | ✅ |
| MFQ / MFR | M01–M11 master file query and response (M12 from 2.4, M13 from 2.5) | ✅ | ✅ |
| MFD | MFA delayed acknowledgment (withdrawn in 2.5) | ✅ | n/a |
| ACK | general acknowledgment | ✅ | ✅ |
| ORM | O01 | ✅ | ✅ |
| ORR | O02 | ✅ | ✅ |
| VXU | V04 (unsolicited vaccination update) | ✅ | ✅ |
| SIU | S12–S24, S26 | ✅ | ✅ |
| SRM | S01–S11 (schedule requests) | ✅ | ✅ |
| SRR | S01–S11 (schedule request responses) | ✅ | ✅ |
| MDM | T01–T11 (document management) | ✅ | ✅ |
| OMD / ORD | O01/O02 diet orders (O03/O04 from 2.4) | ✅ | ✅ |
| OMS / ORS, OMN / ORN | O01/O02 stock and nonstock requisitions (O05/O06, O07/O08 from 2.4) | ✅ | ✅ |
| RDO / RRO | O01/O02 pharmacy order (withdrawn in 2.4) | ✅ | n/a |
| RDE / RRE, RDS / RRD, RGV / RRG, RAS / RRA | pharmacy encoded order, dispense, give, administration (O01/O02; O11–O18 from 2.4) | ✅ | ✅ |
| QRY Q26–Q30, ROR / RAR / RDR / RER / RGR | pharmacy queries and responses | ✅ | ✅ |
| ORU | W01 waveform result | ✅ | ✅ |
| PPR / PRR | PC1–PC3 problem add/update/delete, PC5 problem response | ✅ | ✅ |
| PGL / PPV | PC6–PC8 goal add/update/delete, PCA goal response | ✅ | ✅ |
| PPP / PTR | PCB–PCD pathway (problem-oriented), PCF pathway response | ✅ | ✅ |
| PPG / PPT | PCG, PCH, PCJ pathway (goal-oriented), PCL pathway response | ✅ | ✅ |
| QRY | PC4, PC9, PCE, PCK patient care queries | ✅ | ✅ |
| RQI / RPI / RPL / RPR | I01–I03 insurance information requests and the I01/I04, I02, I03 responses | ✅ | ✅ |
| RQP / RQC / RCI / RCL | I04 patient demographics, I05/I06 clinical information requests and responses | ✅ | ✅ |
| PIN | I07 unsolicited insurance information | ✅ | ✅ |
| RQA / RPA | I08–I11 treatment authorization requests and responses | ✅ | ✅ |
| REF / RRI | I12–I15 patient referral and responses | ✅ | ✅ |
| CRM | C01–C08 clinical study registration | ✅ | ✅ |
| CSU | C09–C12 unsolicited study data | ✅ | ✅ |
| PEX | P07, P08 product experience | ✅ | ✅ |
| SUR | P09 summary product experience report | ✅ | ✅ |
| NMQ / NMR / NMD | N01 application management query and response, N02 application management data | ✅ | ✅ |

## Remaining for v2.3

Every trigger event of the HL7 v2.3 event list (276 events on the Caristix reference, checked
against the hl7.eu chapter pages) has a builder and a parser. Messages the earlier draft of this
list named but that are not v2.3 events are out of scope here: MCF (the v2.1/v2.2 delayed
acknowledgment) and ORU^R03 are not in the v2.3 list, and STC, the equipment automation messages
(EAC/EAN/EAR/ESR/ESU) and the inventory and laboratory automation messages (INR/INU/LSR/LSU) were
introduced in v2.4 and belong to the later-version work below.

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
and withdraws QRY^P04 and DSR^P04. OSR^Q06's order detail (the OBR/RQD/RQ1/RXO/ODS/ODT choice) is
optional in v2.3 and v2.3.1 and required from v2.4 on, following the hl7.eu chapter 4 tables
(v2.3, v2.4, v2.5, v2.5.1) and HAPI; Caristix marks it optional again in v2.5/v2.5.1, which is
not followed. An NTE after an OBR in ORF is parsed as an order note, never as an OBSERVATION group
without OBX.

Done in 0.17: the master files of chapter 8 for v2.3 through v2.5.1: MFN^M01 and M03–M11, MFK^M01–M11
(one structure, M02–M11 wrap M01), MFQ^M01–M11 (likewise), MFR^M01–M11 and MFD^MFA, structures from
the hl7.eu chapter 8 pages (v2.3, v2.4, v2.5, v2.5.1) cross-checked on hl7-definition.caristix.com
and HAPI. Every notification is `MSH MFI { MFE <record> }` with the records exposed as `entries`
(`chargeDescription`, `patientLocation` with nested `departments`, `clinicalStudy` with `phases`,
`observationDefinition` with the OM2–OM6 details, ...). MFR carries the typed record where the
standard states the replacement (M02 staff, M04 charge descriptions, M05 locations, M06/M07 clinical
studies) and a bare `{ MFE }` otherwise (M01, M03, M08–M11, as Caristix shows). Per version: v2.4
adds `[QAK]` to MFR and `[ORG]` to the M02 record; v2.5 (also v2.5.1) adds `[{SFT}]` everywhere, a
repeating `ERR` to MFK and MFR, MFN^M13 (`MSH [{SFT}] MFI {MFE}`), flattens the MFR^M05/M06 records
(`MFE LOC [{LCH}] [{LRL}] {LDP} [{LCH}] [{LCC}]`, `MFE CM0 [{CM1}] [{CM2}]`, per hl7.eu and HAPI) and
withdraws MFD^MFA. Not followed: Caristix's doubled MFI in the v2.3 MFK^M01 (HAPI v23 mirrors it;
hl7.eu has `MSH MSA [ERR] MFI [{MFA}]` for every event), the MFN^M02 body it appends to the v2.4
MFK^M02, and the M06 structure it shows for the v2.3 MFN^M07 (hl7.eu: `MFE CM0 [{CM2}]`). Caristix
also drops MFN^M01/M03 and most MFK/MFQ/MFR events from its v2.4 and v2.5 lists although hl7.eu still
defines them, so they are kept. The later events are in too: MFN^M12 (`MFE OM1 [OM7]`, with the new
OM7 segment in `segments/v2.4`) from v2.4 and MFN^M15 (`MFE IIM`, with the new IIM segment in
`segments/v2.5`) from v2.5, each with its MFK event, plus MFQ/MFR^M12 (v2.4) and M13 (v2.5). Field
tables from hl7-definition.caristix.com cross-checked on hl7.eu (OM7 is unchanged through 2.5.1, IIM
in 2.5.1).

Done in 0.18: the orders and pharmacy messages of chapter 4 for v2.3 through v2.5.1: the diet
orders OMD/ORD, the stock and nonstock requisitions OMS/ORS and OMN/ORN, the pharmacy order RDO/RRO,
the encoded order RDE/RRE, dispense RDS/RRD, give RGV/RRG and administration RAS/RRA, the pharmacy
queries QRY^Q26–Q30 with their ROR/RAR/RDR/RER/RGR responses, and ORU^W01. Structures from the
hl7.eu chapter 4 pages (v2.3, v2.4, v2.5, v2.5.1) cross-checked on hl7-definition.caristix.com and
HAPI. In the v2.3 text the diet, supply and pharmacy orders are ORM/ORR variants; the OMD/OMS/OMN/
RDO message types are the names Caristix and v2.3.1 give them, and RAS/RRA are "events O02/O02" in
v2.3 (RAS^O01 from v2.3.1, O17 from v2.4). Orders inline their PATIENT groups (`patient`, `visit`,
`insurances`, ...) and read `commonOrder`, `detail` (RXO with `notes`, `routes`, `components`),
`encoding`/`encodedOrder`, `dispense`, `gives`, `administrations`, `observations`; the query
responses carry `definitions: [{ query, patient, orders }]`. Per version: v2.4 renumbers every
event (OMD^O03, OMS^O05, OMN^O07, RDE^O11, RDS^O13, RGV^O15, RAS^O17 and the matching
acknowledgments), withdraws the v2.3 events and RDO/RRO, makes the supply RQD required, the diet
and RDE/RDS observations optional, adds `[{FT1}]` to RDS and gives ORU^W01 its own shape (NK1, CTD,
FT1); v2.5 (also v2.5.1) adds `[{SFT}]`, the `TIMING` groups after ORC, `TIMING_ENCODED` after RXE
and `TIMING_GIVE` after RXG, NTEs after RXE/RXD, repeating `COMPONENT` groups, `[{FT1}] [BLG]` in
RDE, grouped `administrations` in RAS, repeating ERR in the acknowledgments and query responses and
SPECIMEN groups in ORU^W01. The parser gained one piece of lookahead for this batch: when a segment
opens both another instance of a repeating group and a later sibling group (ORC in OMD/ORD), the
instance is parsed speculatively and handed to the sibling if it stops at a segment only the
sibling can take.

Done in 0.19: the patient care messages of chapter 12 (PPR^PC1–PC3, PGL^PC6–PC8, PPP^PCB–PCD,
PPG^PCG/PCH/PCJ, the PRR^PC5, PPV^PCA, PTR^PCF and PPT^PCL responses and QRY^PC4/PC9/PCE/PCK), the
referral messages of chapter 11 (RQI^I01–I03, RPI^I01/I04, RPL^I02, RPR^I03, RQP^I04, RQC^I05/I06,
RCI^I05, RCL^I06, PIN^I07, RQA/RPA^I08–I11, REF/RRI^I12–I15), the clinical trial messages of chapter
7 (CRM^C01–C08, CSU^C09–C12), the product experience messages PEX^P07/P08 and SUR^P09 and the
application management messages NMQ/NMR^N01 and NMD^N02 of chapter 14, for v2.3 through v2.5.1.
Structures from the Caristix reference cross-checked on the hl7.eu chapter pages (chapter 14 is
missing from hl7.eu's v2.3 set, so NMQ/NMR/NMD were cross-checked with HAPI's v2.3 and v2.4
structures, and SUR^P09 with HAPI's v2.3). The problem, goal and pathway messages share one set of
groups (`problems`, `goals`, `pathways`, each with `roles`, `variances`, `observations`, `orders`
and nested goals/problems/pathways); referrals read `providers`, `insurances`, `procedures` with
their `authorization`, `notes` and `observations`; CSU nests `studyPhases` → `studySchedules` →
`studyObservations`/`studyPharms` → `administrations`; PEX nests `experiences` → `observations` →
`causes` with `rxOrder`, `rxAdministrations`, `associatedPerson` and `studies`. Per version: v2.3.1
adds `[QAK]` to the four care responses and makes the CSU study observations required; v2.4 makes
CSP optional in CSU, gives NMR a single `[ERR]` and lets RQC^I05/I06 repeat GT1; v2.5 (also
v2.5.1) adds `[{SFT}]` everywhere except QRY^PC4 and SUR^P09, repeating `ERR` in the care
responses and NMR, optional `TIMING_QTY` groups after OBR in CSU and required ones after each RXE
in PEX. The parser's speculative parse of a shared start segment was refined for this batch: an
instance is kept when it stops at a segment that can *start* the sibling (OBX then RXA in CSU),
and a repeating group hands a failed extra instance back when its start segment is also the next
sibling segment (the lone PSH of SUR^P09).

Next: the later-version messages listed under v2.5.1 parity.

## v2.5.1 parity
After v2.3 is complete, bring v2.5.1 to parity with the same messages, then add the 2.5.1 additions:
ORU R30–R32 ✅, ACK, QBP/RSP/RTB (conformance-based queries; need QPD, RCP, QAK, QID), OML/OMI
(O21–O23), OUL, ORL, RDE O11/RDS O13, RAS O17, VXU V04, MFN (M01–M17), SIU/SRM scheduling
(S01–S26), ADT up through A62, MDM T01–T11, BAR P01–P12, DFT P03/P11.

## Definition of done (per event)
1. Structure verified per version against the sources in `CLAUDE.md` (hl7.org, hl7.eu, the
   Caristix reference, HAPI as a cross-check) and cited in the schema's doc comment.
2. Schema added under `codegen/schemas/<version>/` (and the later versions whose shape differs),
   then `pnpm codegen && pnpm barrels && pnpm exports`.
3. Tests: builder and parser round trips and the verify() errors, plus a realistic sample under
   `src/parsers/testdata/` where one exists.
4. Roadmap and README updated; `pnpm lint && pnpm typecheck && pnpm test && pnpm codegen:check` green.
