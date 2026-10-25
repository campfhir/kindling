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

Done in 0.9: ACK, ORM^O01, ORR^O02 for v2.3 and v2.5.1 (`ORM`/`ORR` cover the OBR, RQD, RQ1, RXO, ODS and ODT order detail choices). Where the structures differ by version (checked on hl7.eu): v2.4 adds `[CTD]` and `[{FT1}]` to `ORM^O01`; v2.5 adds `[{SFT}]` and repeating `ERR` to `ACK` and repeating `ERR` to `ORR^O02` (`ORM^O01` keeps the 2.4 shape: no SFT, one IN3, see 2.1 below). v2.3.1 matches v2.3 for all three, and v2.5.1 matches v2.5.

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
`OBX`. (SRR and MDM keep the v2.3 shape in v2.4, generated against the 2.4 segments since 1.2; the
v2.3 SIU model lost its `PD1` in 1.1, see below. Known gap: the SIU model does not yet carry the
v2.5 `[{TQ1}]` after `SCH`.)

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
and are skipped); ORR^O02's order detail is optional in v2.3 and v2.3.1 (required from v2.4, see
1.2 below). Properties are named after
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
Structures from the Caristix reference cross-checked on the hl7.eu chapter pages (in v2.3 the
application management messages are Appendix C, `std23/appc.htm`, and chapter 14 from v2.4 on;
SUR^P09 was cross-checked with HAPI's v2.3). Two corrections came out of those pages: NMR's ERR is
a single `[ERR]` in the v2.3 and v2.4 text (Caristix and HAPI list it as repeating in v2.3 and
v2.3.1), and NSC-9 New Facility is in the v2.3 NSC table, so the v2.3 segment now has nine fields
and v2.4 no longer needs its own. The problem, goal and pathway messages share one set of
groups (`problems`, `goals`, `pathways`, each with `roles`, `variances`, `observations`, `orders`
and nested goals/problems/pathways); referrals read `providers`, `insurances`, `procedures` with
their `authorization`, `notes` and `observations`; CSU nests `studyPhases` → `studySchedules` →
`studyObservations`/`studyPharms` → `administrations`; PEX nests `experiences` → `observations` →
`causes` with `rxOrder`, `rxAdministrations`, `associatedPerson` and `studies`. Per version: v2.3.1
adds `[QAK]` to the four care responses and makes the CSU study observations required; v2.4 makes
CSP optional in CSU and lets RQC^I05/I06 repeat GT1; v2.5 (also
v2.5.1) adds `[{SFT}]` everywhere except QRY^PC4 and SUR^P09, repeating `ERR` in the care
responses and NMR, optional `TIMING_QTY` groups after OBR in CSU and required ones after each RXE
in PEX. The parser's speculative parse of a shared start segment was refined for this batch: an
instance is kept when it stops at a segment that can *start* the sibling (OBX then RXA in CSU),
and a repeating group hands a failed extra instance back when its start segment is also the next
sibling segment (the lone PSH of SUR^P09).

Done in 1.1 (v2.3.1 complete): a message structure ledger (`docs/validation/v2.3-message-ledger.md`,
`v2.3.1-message-ledger.md`) compares every structure with the hl7.eu chapter tables (v2.3), Caristix
and HAPI. It found the v2.3 ADT family modelled too broadly: A02, A03, A06/A07, A09–A12, A15, A16,
A21–A23, A25–A27, A29, A32, A33 and A38 have their own shorter shapes, A18 is `[MRG] PV1`, A30/A34–A36
and A46–A49 have no PV1, A37 lists two asymmetric patients, A39–A42 and A43/A44 are repeating
PATIENT groups, A45 repeats `MRG PV1` and A50/A51 require PV1 (hl7.eu chapter 3, Caristix and HAPI
v23 agree per event; `codegen/schemas/v2.3/ADT.ts` lists the 18 families). ORU^R01/W01 lose the NK1
and SIU the PD1 that only arrive in 2.3.1, and ORR^O02/OSR^Q06 list the order detail segment, its
notes and CTIs as siblings of ORC as the standard does. For 2.3.1 every message is generated
against the 2.3.1 segments (`codegen/schemas/v2.3.1/version.ts`), with the structure changes
Caristix and HAPI v231 agree on: [QAK] in the query responses, the renumbered enhanced-mode
queries, RAS^O01, CSU's required study observations, repeating IN3 (ADT A01 family, A06/A07, BAR
P01/P05, DFT^P03, ORM^O01, ADR^A19), the A06/A07 erratum, A16's repeating DG1, A37's second PD1,
NK1 in ORU^R01/W01 and PD1 in SIU. The remaining differences between the sources are recorded with
their reasons in `codegen/validate/message-notes.json`.

Done in 1.2 (v2.4 complete): every v2.4 event. The message ledger now reads the hl7.eu v2.4 chapters
(`std24/ch02.htm` … `ch15.htm`, whose table captions name the event, `ADT^A14^ADT_A05`) beside
Caristix 2.4 and HAPI v24; `docs/validation/v2.4-message-ledger.md` compares all 334 structures
(302 match the decided shape, 32 are accepted modelling equivalences with dated notes, 0 differ).
The 57 events new in 2.4 were drafted from the Caristix tables with
`codegen/validate/scaffold-messages.ts` and checked by the ledger: OML^O21/ORL^O22, OMG^O19/ORG^O20,
OMP^O09/ORP^O10 and OUL^R21 (chapters 4 and 7), QBP^Q11/Q13/Q15/Q21–Q25 with RSP^K11/K13/K15/K21–K25,
RTB^K13/Q13, RDY^K15, QSB^Q16, QSX^J02, QVR^Q17 and QCN^J01 (chapter 5, with the new QPD, RCP, QID,
QRI and RDF usage), the chapter 13 automation messages ESU/ESR, SSU/SSR, INU/INR, EAC/EAR, EAN,
TCU/TCR and LSU/LSR (new EQU, ISD, SAC, INV, ECD, ECR, CNS, NDS, TCC, TCD, EQP, SID segments),
PMU^B01–B06 (chapter 15), BAR^P10 (GP1/GP2) and ADT A52–A55, A60 (IAM) and A61/A62. The 2.4
structure changes: ROL after PD1 and PV2 (and in INSURANCE) across ADT A01–A03, A05/A14/A28/A31,
A06/A07, A15, A16, A54/A55, A61/A62, PDA closing A01–A03, A18's required MRG, A05 as its own
structure (A01 without PDA; A14, A28, A31 share it) and A21 as the base of the transfer-shaped
events; ORU^R01 gains `[CTD]` and `[{FT1}]`, ORR^O02 requires the order detail (Caristix and HAPI
against the hl7.eu text), QBP^Q15 carries no RDF (hl7.eu against Caristix). Every v2.4 message is
generated against the v2.4 segment modules (`codegen/schemas/v2.4/version.ts`).

Done in 2.1 (v2.5 complete): every v2.5 event. `docs/validation/v2.5-message-ledger.md` compares
all 387 structures with the hl7.eu v2.5 chapters (`std25/ch02.html` … `ch15.html`), Caristix 2.5
and HAPI v25 (362 match the decided shape, 25 are accepted modelling equivalences with dated notes,
0 differ). Every v2.4 message is derived with `[{SFT}]` after MSH, except the 32 that 2.5 kept in
their older shape (ORM^O01, ORR^O02, the SIU and SRM families, SQM^S25, QRY^T12, DOC^T12,
QRY^PC4, SUR^P09: no SFT); the structures that changed were written by hand or drafted from the
Caristix tables with `scaffold-messages.ts` and checked by the ledger: A03 and A16 carry the A01
segments (NK1, AL1, GT1, INSURANCE, ACC), ERR repeats in the acknowledgments and query responses
(MFK, MFR, ORR, OSR, ORG/ORL/ORP, the care responses, RSP^K25), `[{ TIMING: TQ1 [{TQ2}] }]` follows
ORC in the chapter 4, 7, 9 and 12 messages (TIMING_QTY in ORU/OUL/CSU, TIMING_ENCODED after RXE,
TIMING_GIVE after RXG), SPECIMEN groups (SPM [{OBX}] [{ CONTAINER: SAC [{OBX}] }]) join OMG/OML/
ORG/ORL/OUL/ORU, the automation SAC gains `[{SPM}]` (EAC, EAR, SSR, SSU) and TCR/TCU a
TEST_CONFIGURATION group, SIU gains `[{TQ1}]` after SCH, PMU^B01/B02 `[{CER}]` while B04–B06
shrink to `EVN STF [{PRA}] [{ORG}]`, RSP^K21/K22 `[{NK1}]`, K23/K24 a QUERY_RESPONSE group,
MFN^M13/M15 and MFK/MFQ/MFR^M13 are new. The 50 events new in 2.5: OML^O33/O35 and ORL^O34/O36,
OUL^R22–R24, OMI^O23/ORI^O24 (IPC), OMB^O27/ORB^O28, BPS^O29/BRP^O30, BTS^O31/BRT^O32 (BPO, BPX,
BTX), RDE^O25/RRE^O26, QBP^Q31/RSP^K31, the chapter 5 conformance examples QBP^Z73–Z99 with
RSP/RTB/RDY and QSB^Z83, PMU^B07/B08, BAR^P12 and DFT^P11. Withdrawn in 2.5: QRY/DSR^P04,
MFD^MFA, RSP^K13/K15 and RTB^Q13. Every v2.5 message is generated against the v2.5 segment
modules (`codegen/schemas/v2.5/version.ts`), and v2.5.1 derives every message v2.5 carries.

Next: the 2.5.1 sweep (segment and message ledgers against hl7.eu v251, Caristix 2.5.1 and HAPI v251).

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
