# HL7 Version 2.9.1 — message structures and segment field tables extracted from the official PDFs

Extraction of the message-structure tables and segment attribute tables of HL7 v2.9.1 (ANSI/HL7 V2.9.1-2024, September 2024 Normative Publication) from the chapter PDFs listed below. Everything in this folder was read from those PDFs only (text extracted with pypdf 6.21.2 in layout mode, since poppler's pdftotext/pdfinfo were not available in the sandbox; the layout text was then parsed by column position). No other source was consulted. Values are copied as printed; oddities are listed here, not corrected.


## 1. PDFs read (Step 0 check)

All chapter PDFs carry `ANSI/HL7 V2.9.1-2024`, the date `9/5/2024` and the footer `Version 2.9.1 / © 2024 Health Level Seven, International / September 2024 Normative Publication` (chapters 15 and 16 print `Normative Standard`). The version matches the requested v2.9.1, so extraction went ahead. The printed page labels (`Page N` in the footer) equal the 1-based PDF page index in every chapter file, so page numbers below are both.

| PDF file | PDF pages | version printed on cover | date printed | used for |
|---|---|---|---|---|
| V291_CH01_Intro_2024SEP.pdf | 26 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | version/date check only (no tables) |
| V291_CH02_Control_2024SEP.pdf | 94 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Publication) | general ACK structure (p. 53); control segments ADD, BTS, DSC, ERR, FHS, FTS, MSA, MSH, NTE, OVR, SFT, SGH, SGT, UAC (pp. 55-89) |
| V291_CH03_PatientAdmin_2024SEP.pdf | 258 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Publication) | message tables: 29 structures (pp. 6-113); segment tables: 21 (EVN, PID, PV1, PV2, NK1, AL1, IAM, IAR, NPU, MRG, PD1, DB1, PDA, ARV, OH1, OH2, OH3, OH4, GSP, GSR, GSC) |
| V291_CH04_Orders_2024SEP.pdf | 191 | None | None (None) | message tables: 49 structures (pp. 7-175); segment tables: 15 (ORC, BLG, OBR, TQ1, TQ2, IPC, ODS, ODT, RQD, RQ1, BPO, BPX, BTX, DON, BUI) |
| V291_CH04A_Orders_2024SEP.pdf | 123 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 15 structures (pp. 5-121); segment tables: 9 (RXO, RXR, RXC, RXE, RXD, RXG, RXA, RXV, CDO) |
| V291_CH05_Queries_2024SEP.pdf | 109 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 18 structures (pp. 16-101); segment tables: 8 (DSP, QAK, QID, QPD, QRI, RCP, RDF, RDT) |
| V291_CH06_FinancialMngmt_2024SEP.pdf | 156 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Standard) | message tables: 8 structures (pp. 4-22); segment tables: 16 (FT1, DG1, DRG, PR1, GT1, IN1, IN2, IN3, ACC, UB1, UB2, ABS, BLC, RMI, GP1, GP2) |
| V291_CH07_Observations_2024SEP.pdf | 188 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 12 structures (pp. 9-173); segment tables: 15 (OBX, SPM, PRT, CSR, CSP, CSS, CTI, PES, PEO, PCR, PSH, PDC, FAC, SHP, PAC) |
| V291_CH08_MasterFiles_2024SEP.pdf | 128 | None | 9/5/2024 (September 2024 Normative Standard) | message tables: 18 structures (pp. 7-122); segment tables: 26 (MFI, MFE, MFA, OM1, OM2, OM3, OM4, OM5, OM6, OM7, OMC, PM1, MCP, DPS, LOC, LCH, LRL, LDP, LCC, CDM, PRC, CM0, CM1, CM2, DMI, CTR) |
| V291_CH09_MedRecords_2024SEP.pdf | 46 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Standard) | message tables: 2 structures (pp. 9-12); segment tables: 2 (CON, TXA) |
| V291_CH10_Scheduling_2024SEP.pdf | 76 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 3 structures (pp. 14-23); segment tables: 8 (ARQ, SCH, RGS, AIS, AIG, AIL, AIP, APR) |
| V291_CH11_PatientReferral_2024SEP.pdf | 86 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 17 structures (pp. 10-52); segment tables: 4 (RF1, AUT, PRD, CTD) |
| V291_CH12_PatientCare_2024SEP.pdf | 42 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 4 structures (pp. 9-19); segment tables: 5 (GOL, PRB, PTH, VAR, REL) |
| V291_CH13_ClinicalLabAuto_2024SEP.pdf | 67 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (None) | message tables: 12 structures (pp. 16-31); segment tables: 13 (EQU, ISD, SAC, INV, ECD, ECR, NDS, CNS, TCC, TCD, SID, EQP, DST) |
| V291_CH14_AppMngmt_2024SEP.pdf | 9 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Standard) | message tables: 1 structures (pp. 4-4); segment tables: 3 (NCK, NSC, NST) |
| V291_CH15_PersMngmt_2024SEP.pdf | 51 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Standard) | message tables: 6 structures (pp. 4-15); segment tables: 8 (AFF, CER, EDU, LAN, ORG, PRA, ROL, STF) |
| V291_CH16_eClaims_2024SEP.pdf | 66 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Standard) | message tables: 14 structures (pp. 6-31); segment tables: 9 (RFI, IVC, PYE, PSS, PSG, PSL, ADJ, PMT, IPR) |
| V291_CH17_MaterialsMngmt_2024SEP.pdf | 72 | ANSI/HL7 V2.9.1-2024 | 9/5/2024 (September 2024 Normative Standard) | message tables: 4 structures (pp. 38-46); segment tables: 13 (IIM, ITM, STZ, VND, PKG, PCE, IVT, ILT, SCP, SLT, SDD, SCD, DEV) |

Not read: V291_CH02A (data types), V291_CH02B (conformance), V291_CH02C (tables), Appendices A–E — they define no message structures or segment attribute tables.

## 2. What was produced and counts

- `segments.json`: **189 segments**, **2895 fields**.
- `messages/`: **213 message-structure files** (one per structure code, e.g. `ADT_A01.json`; `ACK.json` for the general acknowledgment).
- `messages/index.json`: **398 entries** — 370 event entries that point at a structure file, 1 cross-reference-only entry (QBP^Q25^QBP_Q21, see §3.9) and 27 withdrawn events (`"status": "withdrawn"`).
- Message tables parsed in total: 424 (of which 115 are the per-event `ACK^xxx^ACK` tables printed after each event's main table, and 1 is the chapter 2 worked example `WRP^Z02^WRQ_Z02`, both handled as described in §3.8).

## 3. Format notes and decisions

### 3.1 segments.json
- Keys are segment IDs; each has `title` (as printed after `HL7 Attribute Table - XXX -`), `source` (PDF file and page range of the table) and `fields`.
- Each field has the keys required by the brief (`seq`, `name`, `length`, `type`, `opt`, `rep`, `table`, `inherited`) **plus three extra keys** because v2.9.1 attribute tables print more columns than the 2.5.1 format has room for: `clen` = the `C.LEN` (conformance length, e.g. `"20="`, `"10#"`) column as printed, `item` = the `ITEM#` column as printed. `length` is the `LEN` column as printed (in v2.9.1 this is printed as a `min..max` range such as `"1..4"`, and is blank for most fields).
- `opt` is copied verbatim. Besides R/O/C/B/X the PDF prints `W` (withdrawn field, 108 fields), `-` (all 14 fields of ROL, chapter 15 p. 38), `C(R/X)` (IN3-29, IN3-31, OMC-2, OMC-3) and `C(RE/X)` (IN3-30). Full list in §4.3.
- `rep`: `"∞"` when `RP/#` prints `Y` (or `y`), `"-"` when it is blank or prints `N`, and the number when it prints `Y/n` or a bare number. When the printed value is anything other than blank or `Y`, the extra key `repPrinted` carries it verbatim. Fixed repeat counts are listed in §4.2.
- `seq` is an integer. ADD-1, RDT-1 print `1-n` and QPD-3 prints `3-n`; these are recorded as 1 / 3 with the extra key `seqPrinted`.
- Field names are the ELEMENT NAME column as printed, whitespace collapsed to single spaces, including trailing markers such as `*`, `+`, `#` on OBR fields. Where the layout text extraction inserted a stray space inside a word (e.g. `Resu lts`) and the field-definition heading in the same chapter prints the same letters without it, the heading spelling was used; every such case is listed in §4.5.
### 3.2 messages/<STRUCTURE>.json
- v2.9.1 message tables have **no Usage and no Cardinality columns**; they print the abstract syntax (`[ ]`, `{ }`, `< | >`) in a `Segments` column plus `Description`, `Status` and `Chapter` columns. **`minOccurs`/`maxOccurs` were therefore derived from the brackets and braces** (`[X]` → 0..1, `{X}` → 1..*, `[{X}]` / `{[X]}` → 0..*, bare → 1..1) and `usage` is always `null`.
- Groups are named from the `--- NAME begin` / `--- NAME end` markers printed in the Description column; `name` is `null` only where the PDF prints none (unnamed groups appear inside choices and as the single-segment choice alternatives).
- Choices (`< A | B >`) are written as `{"kind": "choice", "oneOf": [..]}` when every alternative is a plain segment; otherwise the alternatives (some are multi-segment groups, e.g. `OBR [{PRT}]`) are under `alternatives`. The named choice marker (e.g. `--- RESOURCE_OBJECT begin`) is kept as `name`. `alternatives` is always present (it carries page/description per alternative).
- Extra keys on items: `description`, `status` and `chapterRef` copy the Description/Status/Chapter columns; `footnote` carries a footnote digit printed against the row (chapter 6 DFT tables); `bracketMismatch: true` + `notation` mark rows whose brackets do not pair (§4.1), for which `minOccurs`/`maxOccurs` are `null`.
- `kind: "placeholder"` items record rows that are not segments: `[...]` / `...` ("Optional query by example segments", "Segment Pattern from Query Profile", MFN_Znn's "One or more HL7 and/or Z-segments") and `Hxx etc.` in the chapter 12 choices. See §4.7.
- `description` is taken from the chapter's section heading for the event (e.g. `3.3.1 ADT/ACK - Admit/Visit Notification (Event A01)` → `Admit/Visit Notification`), with the leading message-type prefix and the `(Event …)` suffix removed; `title` is the text printed after the colon in the table header (e.g. `ADT Message`) and `sectionHeading` is the heading verbatim. Three chapter 4 tables literally print `Description` as their title (ORB^O28, BRP^O30, BRT^O32).
- Shared structures: v2.9.1 prints a full table for every event, naming the structure in the header (`ADT^A04^ADT_A01`). One file is written per structure from the *primary* table (the event whose code matches the structure suffix, e.g. A01 for ADT_A01; otherwise the first table in chapter order); `triggerEvents` lists every event/table that uses the structure with `identicalToPrimary`. Where a non-primary table is **not** identical in shape, its full items are kept under `variants` (14 cases, §4.9). In `index.json` the non-primary events carry `"sameAs": "<primary event>"`.
- Event ranges/lists printed in one header (`SRM^S01-S11^SRM_S01`, `PGL^PC6-PC8^PGL_PC6`, `PPG^PCG,PCH,PCJ^PPG_PCG`, …) are expanded to one index entry per event, each carrying `eventPrinted` with the header as printed. The chapter 2 header prints `ACK^varies^ACK`, so `ACK.json` has `triggerEvent: null`. Chapter 5/8 grammar templates print `Znn` as the event (`QBP^Znn^QBP_Qnn`, `RSP^Znn^RSP_Znn`, `MFN^M14^MFN_Znn`…); `Znn` is kept verbatim as the trigger event and the structure name.
- Z events: chapters 4A and 5 print example query profiles with Z trigger events (Z73, Z74, Z76–Z99, Z82–Z90, …). They are included (they are printed structures) and flagged with a `note` in the index.
### 3.3 Page numbers
`page` on every item is the PDF page (1-based) on which that row is printed; `source.pages` is the page range of the table.

## 4. Every problem found

### 4.1 Mismatched / malformed brackets in message tables (values copied, min/max set to null)
The PDF prints these rows with non-matching bracket pairs. The opener and closer are kept in `notation`; `minOccurs` and `maxOccurs` are `null` because the intended cardinality cannot be read with confidence.

- ADT_A01 (variant A08) p27: segment OH2 printed as '[{ OH2 }}' -> minOccurs/maxOccurs null
- ADT_A01 (variant A08) p27: segment OH3 printed as '[  OH3  }' -> minOccurs/maxOccurs null
- ADT_A01 (variant A08) p27: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- ADT_A05 p18: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- ADT_A05 p18: segment IAM printed as '[{ IAM }}' -> minOccurs/maxOccurs null
- ADT_A06 p21: segment OH3 printed as '[  OH3  }' -> minOccurs/maxOccurs null
- ADT_A06 (variant A07) p24: segment OH2 printed as '[{ OH2 }}' -> minOccurs/maxOccurs null
- ADT_A06 (variant A07) p24: segment OH2 printed as '[{ OH2 ]}' -> minOccurs/maxOccurs null
- ADT_A06 (variant A07) p24: segment OH3 printed as '[  OH3  }' -> minOccurs/maxOccurs null
- ADT_A06 (variant A07) p24: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- ADT_A09 (variant A11) p33: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- ADT_A15 p43: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- ADT_A17 p47: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- ADT_A21 (variant A32) p69: segment PRT printed as '[{ PRT }}' -> minOccurs/maxOccurs null
- OML_O21 p15: segment NTE printed as '[{NTE]]' -> minOccurs/maxOccurs null
- ORL_O53 p18: segment ARV printed as '[{ARV]]' -> minOccurs/maxOccurs null
- OML_O35 p28: segment REL printed as '[REL}' -> minOccurs/maxOccurs null
- OML_O39 p34: segment REL printed as '[REL}' -> minOccurs/maxOccurs null
- OMI_O23 p40: segment REL printed as '[REL}' -> minOccurs/maxOccurs null
- OSU_O52 p48: segment ARV printed as '[{ARV]}' -> minOccurs/maxOccurs null
- OML_O59 p55: segment NTE printed as '[{NTE]]' -> minOccurs/maxOccurs null
- ORU_R30 p15: segment OBX printed as '[{OBX]]' -> minOccurs/maxOccurs null
- OSM_R26 p171: segment ARV printed as '{[ARV}]' -> minOccurs/maxOccurs null
- EHC_E20 p25: segment PRT printed as '[ { PRT ] }' -> minOccurs/maxOccurs null

Other structural oddities in message tables (as printed):

- OMG_O19: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p7 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OMG_O19: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p8 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OMG_O19: group name printed with internal space 'ORDER_DETAIL _PARTICIPATION_PRIOR' p10 (recorded as 'ORDER_DETAIL_PARTICIPATION_PRIOR')
- OMG_O19: group name printed with internal space 'ORDER_DETAIL _PARTICIPATION_PRIOR' p10 (recorded as 'ORDER_DETAIL_PARTICIPATION_PRIOR')
- OML_O21: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p13 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O21: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p13 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O33: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p20 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O33: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p20 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O35: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p26 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O35: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p26 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O39: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p33 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OML_O39: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p33 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OMI_O23: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p40 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- OMI_O23: group name printed with internal space 'OCCUPATIONAL _DATA_FOR_HEALTH' p40 (recorded as 'OCCUPATIONAL_DATA_FOR_HEALTH')
- DRG_O43: 'begin' marker printed on a closing row p169 '}]' '--- DONOR_OBSERVATIONS begin'
- DEO_O45: group end name DONOR != begin name Donor p171
- RSP_Z88: 'begin' marker printed on a closing row p79 ']' '--- VISIT begin'
- OSM_R26: group name printed with internal space 'SUBJECT_POPULATION_OR_LOCATION_IDENTIFICAT ION' p172 (recorded as 'SUBJECT_POPULATION_OR_LOCATION_IDENTIFICATION')
- OSM_R26: group name printed with internal space 'SUBJECT_POPULATION_OR_LOCATION_IDENTIFICAT ION' p173 (recorded as 'SUBJECT_POPULATION_OR_LOCATION_IDENTIFICATION')
- RQI_I01 (variant I03): group end name GUARANTOR_INSURANCE != begin name GUARANTOR+INSURANCE p14

Table-parsing notes: V291_CH02_Control_2024SEP.pdf p87: orphan column header (previous table 'ACK^varies^ACK: General Acknowledgment' ended on p53); ignored

### 4.2 Fixed repeat counts (the project has no field for them yet; `rep` holds the number, `repPrinted` the printed value)
- ERR-6 (Application Error Parameter) p60: RP/# printed 'Y/10' -> rep '10'
- PID-38 (Production Class Code) p119: RP/# printed '2' -> rep '2'
- ORC-14 (Call Back Phone Number) p57: RP/# printed 'Y/2' -> rep '2'
- OBR-17 (Order Callback Phone Number) p71: RP/# printed 'Y/2' -> rep '2'
- ODS-2 (Service Period) p112: RP/# printed 'Y/10' -> rep '10'
- ODS-3 (Diet, Supplement, or Preference Code) p112: RP/# printed 'Y/20' -> rep '20'
- ODS-4 (Text Instruction) p112: RP/# printed 'Y/2' -> rep '2'
- ODT-2 (Service Period) p114: RP/# printed 'Y/10' -> rep '10'
- FT1-55 (DME Condition Indicator Code) p24: RP/# printed 'Y/2' -> rep '2'
- UB1-7 (Condition Code) p137: RP/# printed 'Y/5' -> rep '5'
- UB1-10 (Value Amount & Code) p137: RP/# printed 'Y/8' -> rep '8'
- UB1-16 (Occurrence) p137: RP/# printed 'Y/5' -> rep '5'
- UB2-3 (Condition Code (24-30)) p139: RP/# printed 'Y/7' -> rep '7'
- UB2-6 (Value Amount & Code (39-41)) p139: RP/# printed 'Y/12' -> rep '12'
- UB2-7 (Occurrence Code & Date (32-35)) p139: RP/# printed 'Y/8' -> rep '8'
- UB2-8 (Occurrence Span Code/Dates (36)) p139: RP/# printed 'Y/2' -> rep '2'
- UB2-9 (Uniform Billing Locator 2 (state)) p139: RP/# printed 'Y/2' -> rep '2'
- UB2-10 (Uniform Billing Locator 11 (state)) p139: RP/# printed 'Y/2' -> rep '2'
- UB2-12 (Document Control Number) p139: RP/# printed 'Y/3' -> rep '3'
- UB2-13 (Uniform Billing Locator 49 (national)) p139: RP/# printed 'Y/23' -> rep '23'
- UB2-14 (Uniform Billing Locator 56 (state)) p139: RP/# printed 'Y/5' -> rep '5'
- UB2-16 (Uniform Billing Locator 78 (state)) p139: RP/# printed 'Y/2' -> rep '2'
- CSR-11 (Study Randomization Date/time) p122: RP/# printed 'Y/3' -> rep '3'
- CSR-12 (Randomized Study Arm) p122: RP/# printed 'Y/3' -> rep '3'
- CSR-13 (Stratum for Study Randomization) p122: RP/# printed 'Y/3' -> rep '3'
- CSS-3 (Study Quality Control Codes) p129: RP/# printed 'Y/3' -> rep '3'
- PES-11 (Event Report Timing/Type) p142: RP/# printed 'Y/2' -> rep '2'
- PCR-12 (Product Serial/Lot Number) p153: RP/# printed 'Y/3' -> rep '3'
- PCR-21 (Action Taken In Response To The Event) p153: RP/# printed 'Y/6' -> rep '6'
- PCR-22 (Event Causality Observations) p153: RP/# printed 'Y/6' -> rep '6'
- PCR-23 (Indirect Exposure Mechanism) p153: RP/# printed 'Y/3' -> rep '3'
- PSH-13 (Number of Product Experience Reports Filed by Facility) p157: RP/# printed 'Y/8' -> rep '8'
- PSH-14 (Number of Product Experience Reports Filed by Distributor) p157: RP/# printed 'Y/8' -> rep '8'
- CM0-3 (Alternate Study ID) p108: RP/# printed 'Y/3' -> rep '3'
- CM2-4 (Events Scheduled This Time Point) p113: RP/# printed 'Y/200' -> rep '200'
- PYE-4 (Payee Identification List) p41: RP/# printed 'Y/5' -> rep '5'
- PYE-5 (Payee Person Name) p41: RP/# printed 'Y/4' -> rep '4'
- PYE-6 (Payee Address) p41: RP/# printed 'Y/4' -> rep '4'
- PSL-8 (Product/Service Code Modifier) p47: RP/# printed 'Y/5' -> rep '5'
- PSL-17 (Product/Service Clarification Code Type) p47: RP/# printed 'Y/20' -> rep '20'
- PSL-18 (Product/Service Clarification Code Value) p47: RP/# printed 'Y/20' -> rep '20'
- PSL-19 (Health Document Reference Identifier) p47: RP/# printed 'Y/5' -> rep '5'
- PSL-20 (Processing Consideration Code) p47: RP/# printed 'Y/20' -> rep '20'
- ADJ-5 (Adjustment Amount) p58: RP/# printed 'Y/5' -> rep '5'

### 4.3 OPT values other than R/O/C/B/X (copied verbatim)
- ERR-1 (Error Code and Location) p60: OPT printed 'W'
- MSA-3 (Text Message) p67: OPT printed 'W'
- MSA-5 (Delayed Acknowledgment Type) p67: OPT printed 'W'
- MSA-6 (Error Condition) p67: OPT printed 'W'
- EVN-1 (Event Type Code) p115: OPT printed 'W'
- PID-2 (Patient ID) p118: OPT printed 'W'
- PID-4 (Alternate Patient ID - PID) p118: OPT printed 'W'
- PID-9 (Patient Alias) p118: OPT printed 'W'
- PID-12 (County Code) p118: OPT printed 'W'
- PID-13 (Phone Number - Home) p118: OPT printed 'W'
- PID-14 (Phone Number - Business) p118: OPT printed 'W'
- PID-19 (SSN Number - Patient) p118: OPT printed 'W'
- PID-20 (Driver's License Number - Patient) p118: OPT printed 'W'
- PID-28 (Nationality) p118: OPT printed 'W'
- PV1-40 (Bed Status) p132: OPT printed 'W'
- PV1-52 (Other Healthcare Provider) p132: OPT printed 'W'
- NK1-5 (Phone Number) p163: OPT printed 'W'
- NK1-6 (Business Phone Number) p163: OPT printed 'W'
- NK1-31 (Contact Person's Telephone Number) p163: OPT printed 'W'
- AL1-6 (Identification Date) p178: OPT printed 'W'
- MRG-2 (Prior Alternate Patient ID) p193: OPT printed 'W'
- MRG-4 (Prior Patient ID) p193: OPT printed 'W'
- PD1-4 (Patient Primary Care Provider Name & ID No.) p196: OPT printed 'W'
- ORC-7 (Quantity/Timing) p57: OPT printed 'W'
- ORC-10 (Entered By) p57: OPT printed 'W'
- ORC-11 (Verified By) p57: OPT printed 'W'
- ORC-12 (Ordering Provider) p57: OPT printed 'W'
- ORC-17 (Entering Organization) p57: OPT printed 'W'
- ORC-18 (Entering Device) p57: OPT printed 'W'
- ORC-19 (Action By) p57: OPT printed 'W'
- ORC-21 (Ordering Facility Name) p57: OPT printed 'W'
- ORC-22 (Ordering Facility Address) p57: OPT printed 'W'
- ORC-23 (Ordering Facility Phone Number) p57: OPT printed 'W'
- ORC-24 (Ordering Provider Address) p57: OPT printed 'W'
- ORC-31 (Parent Universal Service Identifier) p57: OPT printed 'W'
- OBR-5 (Priority) p71: OPT printed 'W'
- OBR-6 (Requested Date/Time) p71: OPT printed 'W'
- OBR-14 (Specimen Received Date/Time *) p71: OPT printed 'W'
- OBR-15 (Specimen Source) p71: OPT printed 'W'
- OBR-16 (Ordering Provider) p71: OPT printed 'W'
- OBR-27 (Quantity/Timing) p71: OPT printed 'W'
- OBR-28 (Result Copies To) p71: OPT printed 'W'
- OBR-32 (Principal Result Interpreter +) p72: OPT printed 'W'
- OBR-33 (Assistant Result Interpreter +) p72: OPT printed 'W'
- OBR-34 (Technician +) p72: OPT printed 'W'
- OBR-35 (Transcriptionist +) p72: OPT printed 'W'
- OBR-50 (Parent Universal Service Identifier) p72: OPT printed 'W'
- RXO-8 (Deliver-To Location) p40: OPT printed 'W'
- RXO-14 (Ordering Provider's DEA Number) p40: OPT printed 'W'
- RXE-1 (Quantity/Timing) p59: OPT printed 'W'
- RXE-8 (Deliver-to Location) p59: OPT printed 'W'
- RXD-13 (Dispense-to Location) p75: OPT printed 'W'
- RXG-3 (Quantity/Timing) p86: OPT printed 'W'
- RXG-11 (Dispense -To Location) p86: OPT printed 'W'
- RXG-27 (Dispense to Pharmacy) p86: OPT printed 'W'
- RXG-28 (Dispense to Pharmacy Address) p86: OPT printed 'W'
- RXA-10 (Administering Provider) p95: OPT printed 'W'
- RXA-11 (Administered -at Location) p95: OPT printed 'W'
- FT1-8 (Transaction Description) p23: OPT printed 'W'
- FT1-9 (Transaction Description - Alt) p23: OPT printed 'W'
- DG1-2 (Diagnosis Coding Method) p43: OPT printed 'W'
- DG1-4 (Diagnosis Description) p43: OPT printed 'W'
- DG1-7 (Major Diagnostic Category) p43: OPT printed 'W'
- DG1-8 (Diagnostic Related Group) p43: OPT printed 'W'
- DG1-9 (DRG Approval Indicator) p43: OPT printed 'W'
- DG1-10 (DRG Grouper Review Code) p43: OPT printed 'W'
- DG1-11 (Outlier Type) p43: OPT printed 'W'
- DG1-12 (Outlier Days) p43: OPT printed 'W'
- DG1-13 (Outlier Cost) p43: OPT printed 'W'
- DG1-14 (Grouper Version And Type) p43: OPT printed 'W'
- PR1-2 (Procedure Coding Method) p56: OPT printed 'W'
- PR1-4 (Procedure Description) p56: OPT printed 'W'
- PR1-8 (Anesthesiologist) p56: OPT printed 'W'
- PR1-11 (Surgeon) p56: OPT printed 'W'
- PR1-12 (Procedure Practitioner) p56: OPT printed 'W'
- IN1-38 (Policy Limit - Amount) p81: OPT printed 'W'
- IN1-40 (Room Rate - Semi-Private) p81: OPT printed 'W'
- IN1-41 (Room Rate - Private) p81: OPT printed 'W'
- IN3-29 (Online Verification Result) p122: OPT printed 'C(R/X)'
- IN3-30 (Online Verification Result Error Code) p122: OPT printed 'C(RE/X)'
- IN3-31 (Online Verification Result Check Digit) p122: OPT printed 'C(R/X)'
- UB1-1 (Set ID - UB1) p136: OPT printed 'W'
- UB1-2 (Blood Deductible) p137: OPT printed 'W'
- UB1-3 (Blood Furnished-Pints) p137: OPT printed 'W'
- UB1-4 (Blood Replaced-Pints) p137: OPT printed 'W'
- UB1-5 (Blood Not Replaced-Pints) p137: OPT printed 'W'
- UB1-6 (Co-Insurance Days) p137: OPT printed 'W'
- UB1-7 (Condition Code) p137: OPT printed 'W'
- UB1-8 (Covered Days) p137: OPT printed 'W'
- UB1-9 (Non Covered Days) p137: OPT printed 'W'
- UB1-10 (Value Amount & Code) p137: OPT printed 'W'
- UB1-11 (Number Of Grace Days) p137: OPT printed 'W'
- UB1-12 (Special Program Indicator) p137: OPT printed 'W'
- UB1-13 (PSRO/UR Approval Indicator) p137: OPT printed 'W'
- UB1-14 (PSRO/UR Approved Stay-Fm) p137: OPT printed 'W'
- UB1-15 (PSRO/UR Approved Stay-To) p137: OPT printed 'W'
- UB1-16 (Occurrence) p137: OPT printed 'W'
- UB1-17 (Occurrence Span) p137: OPT printed 'W'
- UB1-18 (Occur Span Start Date) p137: OPT printed 'W'
- UB1-19 (Occur Span End Date) p137: OPT printed 'W'
- UB1-20 (UB-82 Locator 2) p137: OPT printed 'W'
- UB1-21 (UB-82 Locator 9) p137: OPT printed 'W'
- UB1-22 (UB-82 Locator 27) p137: OPT printed 'W'
- UB1-23 (UB-82 Locator 45) p137: OPT printed 'W'
- OMC-2 (Segment Action Code) p66: OPT printed 'C(R/X)'
- OMC-3 (Segment Unique Key) p66: OPT printed 'C(R/X)'
- SCH-9 (Appointment Duration) p39: OPT printed 'W'
- SCH-11 (Appointment Timing Quantity) p39: OPT printed 'W'
- GOL-15 (Goal Review Interval) p21: OPT printed 'W'
- SAC-6 (Specimen Source) p35: OPT printed 'W'
- INV-14 (On Board Stability Duration) p47: OPT printed 'W'
- ECD-4 (Requested Completion Time) p53: OPT printed 'W'
- TCC-3 (Specimen Source) p56: OPT printed 'W'
- ROL-1 (Role Instance ID) p38: OPT printed '-'
- ROL-2 (Action Code) p38: OPT printed '-'
- ROL-3 (Role-ROL) p38: OPT printed '-'
- ROL-4 (Role Person) p38: OPT printed '-'
- ROL-5 (Role Begin Date/Time) p38: OPT printed '-'
- ROL-6 (Role End Date/Time) p38: OPT printed '-'
- ROL-7 (Role Duration) p38: OPT printed '-'
- ROL-8 (Role Action Reason) p38: OPT printed '-'
- ROL-9 (Provider Type) p38: OPT printed '-'
- ROL-10 (Organization Unit Type) p38: OPT printed '-'
- ROL-11 (Office/Home Address/Birthplace) p38: OPT printed '-'
- ROL-12 (Phone) p38: OPT printed '-'
- ROL-13 (Person's Location) p38: OPT printed '-'
- ROL-14 (Organization) p38: OPT printed '-'

### 4.4 Other odd cells in attribute tables (copied verbatim)
- ADD p55: SEQ printed '1-n'; recorded seq 1 with "seqPrinted"
- QPD p51: SEQ printed '3-n'; recorded seq 3 with "seqPrinted"
- RDT p56: SEQ printed '1-n'; recorded seq 1 with "seqPrinted"
- MSH-26 p69: ITEM# printed '2429' (copied as is)
- MSH-27 p69: ITEM# printed '2430' (copied as is)
- MSH-28 p69: ITEM# printed '2431' (copied as is)
- GSP-5 p221: TBL# printed '0821,0822,0823' (copied as is)
- DON-1 p175: RP/# printed 'N' (recorded as rep '-')
- DON-2 p175: RP/# printed 'N' (recorded as rep '-')
- DON-3 p175: RP/# printed 'N' (recorded as rep '-')
- DON-4 p175: RP/# printed 'N' (recorded as rep '-')
- DON-5 p175: RP/# printed 'N' (recorded as rep '-')
- DON-6 p175: RP/# printed 'N' (recorded as rep '-')
- DON-9 p176: RP/# printed 'N' (recorded as rep '-')
- DON-11 p176: RP/# printed 'N' (recorded as rep '-')
- DON-12 p176: RP/# printed 'N' (recorded as rep '-')
- DON-13 p176: RP/# printed 'N' (recorded as rep '-')
- DON-15 p176: RP/# printed 'N' (recorded as rep '-')
- DON-16 p176: RP/# printed 'N' (recorded as rep '-')
- DON-17 p176: RP/# printed 'N' (recorded as rep '-')
- DON-18 p176: RP/# printed 'N' (recorded as rep '-')
- DON-19 p176: RP/# printed 'N' (recorded as rep '-')
- DON-20 p176: RP/# printed 'N' (recorded as rep '-')
- DON-21 p176: RP/# printed 'N' (recorded as rep '-')
- DON-22 p176: RP/# printed 'N' (recorded as rep '-')
- DON-23 p176: RP/# printed 'N' (recorded as rep '-')
- DON-24 p176: RP/# printed 'N' (recorded as rep '-')
- DON-25 p176: RP/# printed 'N' (recorded as rep '-')
- DON-26 p176: RP/# printed 'N' (recorded as rep '-')
- DON-27 p176: RP/# printed 'N' (recorded as rep '-')
- DON-28 p176: RP/# printed 'N' (recorded as rep '-')
- DON-29 p176: RP/# printed 'N' (recorded as rep '-')
- DON-30 p176: RP/# printed 'N' (recorded as rep '-')
- DON-32 p176: RP/# printed 'N' (recorded as rep '-')
- BUI-1 p185: RP/# printed 'N' (recorded as rep '-')
- BUI-2 p185: RP/# printed 'N' (recorded as rep '-')
- BUI-3 p185: RP/# printed 'N' (recorded as rep '-')
- BUI-4 p185: RP/# printed 'N' (recorded as rep '-')
- BUI-5 p185: RP/# printed 'N' (recorded as rep '-')
- BUI-6 p186: RP/# printed 'N' (recorded as rep '-')
- BUI-7 p186: RP/# printed 'N' (recorded as rep '-')
- BUI-8 p186: RP/# printed 'N' (recorded as rep '-')
- BUI-9 p186: RP/# printed 'N' (recorded as rep '-')
- BUI-10 p186: RP/# printed 'N' (recorded as rep '-')
- BUI-11 p186: RP/# printed 'N' (recorded as rep '-')
- BUI-12 p186: RP/# printed 'N' (recorded as rep '-')
- RXE-2 p59: TBL# printed '0292/0479' (copied as is)
- IN3-28 p122: RP/# printed 'N' (recorded as rep '-')
- IN3-29 p122: RP/# printed 'N' (recorded as rep '-')
- IN3-30 p122: RP/# printed 'N' (recorded as rep '-')
- IN3-31 p122: RP/# printed 'N' (recorded as rep '-')
- OBX-23 p62: RP/# printed 'N' (recorded as rep '-')
- OBX-24 p62: RP/# printed 'N' (recorded as rep '-')
- OBX-25 p62: RP/# printed 'N' (recorded as rep '-')
- OBX-26 p62: RP/# printed 'N' (recorded as rep '-')
- OBX-29 p62: RP/# printed 'N' (recorded as rep '-')
- OBX-30 p62: RP/# printed 'N' (recorded as rep '-')
- SPM-32 p79: RP/# printed 'N' (recorded as rep '-')
- SPM-33 p80: RP/# printed 'N' (recorded as rep '-')
- SPM-33 p80: ITEM# printed '3485' (copied as is)
- SPM-34 p80: RP/# printed 'N' (recorded as rep '-')
- SPM-34 p80: ITEM# printed '3486' (copied as is)
- PRT-1 p89: RP/# printed 'N' (recorded as rep '-')
- SHP-1 p175: RP/# printed 'N' (recorded as rep '-')
- SHP-3 p175: RP/# printed 'N' (recorded as rep '-')
- SHP-4 p175: RP/# printed 'N' (recorded as rep '-')
- SHP-5 p175: RP/# printed 'N' (recorded as rep '-')
- SHP-6 p175: RP/# printed 'N' (recorded as rep '-')
- SHP-8 p175: RP/# printed 'N' (recorded as rep '-')
- PAC-1 p178: RP/# printed 'N' (recorded as rep '-')
- PAC-2 p178: RP/# printed 'N' (recorded as rep '-')
- PAC-3 p178: RP/# printed 'N' (recorded as rep '-')
- PAC-4 p178: RP/# printed 'N' (recorded as rep '-')
- PAC-5 p178: RP/# printed 'N' (recorded as rep '-')
- MFI-2 p10: RP/# printed 'y' (recorded as rep '∞')
- OM1-44 p31: TBL# printed '0256/0257' (copied as is)
- OM1-58 p32: TBL# printed '0001/0828' (copied as is)
- LCH-5 p84: TBL# printed '0136/0262/0263' (copied as is)
- RF1-13 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-14 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-15 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-16 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-17 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-18 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-19 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-20 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-21 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-22 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-23 p53: RP/# printed 'N' (recorded as rep '-')
- RF1-24 p54: RP/# printed 'N' (recorded as rep '-')
- RF1-25 p54: RP/# printed 'N' (recorded as rep '-')
- AUT-13 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-14 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-15 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-16 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-17 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-18 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-19 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-20 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-21 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-22 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-23 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-24 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-25 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-26 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-27 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-28 p61: RP/# printed 'N' (recorded as rep '-')
- AUT-29 p61: RP/# printed 'N' (recorded as rep '-')
- PRD-10 p69: RP/# printed 'N' (recorded as rep '-')
- PRD-14 p69: RP/# printed 'N' (recorded as rep '-')
- STF-2 p38: TBL# printed '0061/0203/0363' (copied as is)
- STF-19 p39: TBL# printed '0327/0328' (copied as is)

### 4.5 Field-name spacing: table vs field-definition heading
The attribute table and the per-field heading (`3.4.2.3 PID-3 Patient Identifier List (CX) 00106`) were compared for every field. Where the letters are identical but spacing differs, the spelling with fewer extraction artifacts was used:

- RXG-1 p86: table prints 'Give Sub-ID Counter', heading prints 'Give Sub -ID Counter' (same letters, different spacing); kept the table spelling
- GT1-51 p62: table prints "Guarantor Employer 's Organization Name" (spacing artifact of text extraction); used the field-definition heading spelling "Guarantor Employer's Organization Name" (p78)
- IN1-11 p80: table prints "Insured 's Group Emp Name" (spacing artifact of text extraction); used the field-definition heading spelling "Insured's Group Emp Name" (p86)
- UB2-3 p139: table prints 'Condition Code (24 -30)' (spacing artifact of text extraction); used the field-definition heading spelling 'Condition Code (24-30)' (p140)
- UB2-7 p139: table prints 'Occurrence Code & Date (32-35)', heading prints 'Occurrence Code & Date (32 -35)' (same letters, different spacing); kept the table spelling
- OM1-23 p31: table prints 'Typical Turn-Around Time', heading prints 'Typical Turn -Around Time' (same letters, different spacing); kept the table spelling
- OM1-53 p31: table prints 'Prior Resu lts Instructions' (spacing artifact of text extraction); used the field-definition heading spelling 'Prior Results Instructions' (p46)
- OM1-57 p31: table prints 'Typical Turn-Around Time – (2)', heading prints 'Typical Turn -Around Time – (2)' (same letters, different spacing); kept the table spelling
- OM6-1 p60: table prints 'Sequence Number - Test/Observation Master File', heading prints 'Sequence Number -Test/Observation Master File' (same letters, different spacing); kept the table spelling
- OM7-1 p60: table prints 'Sequence Number - Test/Observation Master File', heading prints 'Sequence Number -Test/Observation Master File' (same letters, different spacing); kept the table spelling
- CM2-1 p113: table prints 'Set ID- CM2' (spacing artifact of text extraction); used the field-definition heading spelling 'Set ID - CM2' (p113)
- CON-1 p27: table prints 'Set ID - CON', heading prints 'Set ID -CON' (same letters, different spacing); kept the table spelling
- CON-6 p27: table prints 'Subject -specific Consent Text' (spacing artifact of text extraction); used the field-definition heading spelling 'Subject-specific Consent Text' (p28)
- CON-8 p27: table prints 'Subject -specific Consent Background Text' (spacing artifact of text extraction); used the field-definition heading spelling 'Subject-specific Consent Background Text' (p28)
- TXA-1 p31: table prints 'Set ID- TXA' (spacing artifact of text extraction); used the field-definition heading spelling 'Set ID - TXA' (p32)

Names that still look suspicious (one-sided dash spacing or a stray fragment) and could not be checked against a heading, kept exactly as the table prints them:

- RXG-11 p86: 'Dispense -To Location'
- RXA-11 p95: 'Administered -at Location'
- OM1-39 p31: 'Factors that may Affect the Observation'
- CON-9 p27: 'Consenter -imposed limitations'
- REL-1 p35: 'Set ID –REL'

152 fields have no matching per-field heading in the text (mostly withdrawn fields and segments whose headings use a different layout): ADD-1-n, ERR-1, FHS-15, FHS-16, FHS-17, MSA-3, MSA-5, MSA-6, MSH-28, EVN-1, PID-2, PID-4, PID-9, PID-12, PID-19, PID-20, PID-28, PV1-40, IAM-8, MRG-2, MRG-4, PD1-4, OH4-5, GSP-2, ORC-7, OBR-5, OBR-6, OBR-14, OBR-15, OBR-27, DON-33, RXO-8, RXO-14, RXO-17, RXO-32, RXO-33, RXE-1, RXE-3, RXE-4, RXE-8, RXD-13, RXG-3, RXG-11, RXG-27, RXG-28, RXA-10, RXA-11, QPD-3-n, RDT-1-n, FT1-8, FT1-9, FT1-44, DG1-2, DG1-4, DG1-7, DG1-8, DG1-9, DG1-10, DG1-11, DG1-12, DG1-13, DG1-14, PR1-2, PR1-4, PR1-8, PR1-11, PR1-12, IN1-38, IN1-40, IN1-41, UB1-1, UB1-2, UB1-3, UB1-4, UB1-5, UB1-6, UB1-7, UB1-8, UB1-9, UB1-10, UB1-11, UB1-12, UB1-13, UB1-14, UB1-15, UB1-16, UB1-17, UB1-18, UB1-19, UB1-20, UB1-21, UB1-22, UB1-23, OBX-12, OBX-13, OBX-14, SPM-1, SPM-33, SPM-34, CSR-13, OM1-56, OMC-9, CTR-4, CTR-5, CTR-6, CTR-7, CTR-8, CTR-9, CTR-10, CTR-11, CTR-12, CTR-13, CTR-14, CTR-15, CTR-16, CTR-17, CTR-18, CTR-19, CTR-20, CTR-21, SCH-9, SCH-11, AIG-13, AIG-14, GOL-15, PRB-21, PRB-22, SAC-6, INV-14, ECD-4, TCC-3, ROL-1, ROL-2, ROL-3, ROL-4, ROL-5, ROL-6, ROL-7, ROL-8, ROL-9, ROL-10, ROL-11, ROL-12, ROL-13, ROL-14, ITM-25, ITM-26, SCD-33, SCD-34, SCD-35, SCD-36, SCD-37

### 4.6 Table value differs from the field-definition heading (PDF-internal inconsistency; table value kept)
- MSH-15 p69: table name 'Accept Acknowledgment' vs field-definition heading 'Accept Acknowledgment Type' (p71); table value kept
- MSH-19 p69: table name 'Principal Language Of Message' vs field-definition heading 'Principal Language of Message' (p73); table value kept
- PV1-13 p131: table name 'Re-admission Indicator' vs field-definition heading 'Re-Admission Indicator' (p139); table value kept
- PV2-48 p153: table name 'Expected Pre-admission Testing Date/Time' vs field-definition heading 'Expected Preadmission Testing Date/Time' (p162); table value kept
- NK1-41 p163: table name "Contact Person's Telecommunication Information" vs field-definition heading 'Contact Person’s Telecommunication Information' (p178); table value kept
- IAM-14 p180: table name 'Reported By' vs field-definition heading 'Reported by' (p183); table value kept
- IAR-3 p191: table name 'Sensitivity to Causative Agent Code' vs field-definition heading 'Sensitivity to Causative Agent code' (p191); table value kept
- OH2-2 p213: table DT 'ID' vs heading DT 'CWE'; table value kept
- OH2-10 p213: table name 'Average Hours worked per Day' vs field-definition heading 'Average Hours Worked Per Day' (p215); table value kept
- OH3-6 p218: table name 'Start year' vs field-definition heading 'Start Year' (p219); table value kept
- GSP-6 p221: table name 'Validity Range' vs field-definition heading 'Validity Period' (p222); table value kept
- GSR-5 p224: table name 'Source Document Field Label' vs field-definition heading 'Source Document Field Type and or Label' (p225); table value kept
- GSR-7 p224: table name 'Source Document Jurisdiction for Recorded Sex or Gender' vs field-definition heading 'Source Document Jurisdiction For Recorded Sex or Gender' (p225); table value kept
- ORC-34 p57: table DT 'CWE' vs heading DT 'EI'; table value kept
- BLG-1 p69: table name 'When to Charge' vs field-definition heading 'When to charge' (p69); table value kept
- BLG-2 p69: table name 'Charge Type' vs field-definition heading 'Charge type' (p69); table value kept
- BLG-4 p69: table name 'Charge Type Reason' vs field-definition heading 'Charge type reason' (p70); table value kept
- OBR-2 p71: table name 'Placer Order Number' vs field-definition heading 'Placer order number' (p72); table value kept
- OBR-7 p71: table name 'Observation Date/Time #' vs field-definition heading 'Observation Date/Time' (p74); table value kept
- OBR-8 p71: table name 'Observation End Date/Time #' vs field-definition heading 'Observation End Date/Time' (p75); table value kept
- OBR-9 p71: table name 'Collection Volume *' vs field-definition heading 'Collection Volume' (p75); table value kept
- OBR-10 p71: table name 'Collector Identifier *' vs field-definition heading 'Collector Identifier' (p75); table value kept
- OBR-11 p71: table name 'Specimen Action Code *' vs field-definition heading 'Specimen Action Code' (p76); table value kept
- OBR-20 p71: table name 'Filler Field 1 +' vs field-definition heading 'Filler Field 1' (p78); table value kept
- OBR-21 p71: table name 'Filler Field 2 +' vs field-definition heading 'Filler Field 2' (p78); table value kept
- OBR-22 p71: table name 'Results Rpt/Status Chng – Date/Time +' vs field-definition heading 'Results Rpt/Status Chng – Date/Time' (p78); table value kept
- OBR-23 p71: table name 'Charge to Practice +' vs field-definition heading 'Charge to Practice' (p78); table value kept
- OBR-25 p71: table name 'Result Status +' vs field-definition heading 'Result Status' (p79); table value kept
- OBR-26 p71: table name 'Parent Result +' vs field-definition heading 'Parent Result' (p79); table value kept
- OBR-29 p71: table name 'Parent Results Observation Identifier' vs field-definition heading 'Parent Result Observation Identifier' (p80); table value kept
- OBR-32 p72: table name 'Principal Result Interpreter +' vs field-definition heading 'Principal Result Interpreter' (p80); table value kept
- OBR-33 p72: table name 'Assistant Result Interpreter +' vs field-definition heading 'Assistant Result Interpreter' (p81); table value kept
- OBR-34 p72: table name 'Technician +' vs field-definition heading 'Technician' (p81); table value kept
- OBR-35 p72: table name 'Transcriptionist +' vs field-definition heading 'Transcriptionist' (p81); table value kept
- OBR-36 p72: table name 'Scheduled Date/Time +' vs field-definition heading 'Scheduled Date/Time' (p81); table value kept
- OBR-37 p72: table name 'Number of Sample Containers *' vs field-definition heading 'Number of Sample Containers' (p81); table value kept
- OBR-38 p72: table name 'Transport Logistics of Collected Sample *' vs field-definition heading 'Transport Logistics of Collected Sample' (p81); table value kept
- OBR-39 p72: table name "Collector's Comment *" vs field-definition heading "Collector's Comment" (p81); table value kept
- TQ1-7 p87: table name 'Start date/time' vs field-definition heading 'Start Date/Time' (p89); table value kept
- TQ1-8 p87: table name 'End date/time' vs field-definition heading 'End Date/Time' (p89); table value kept
- TQ1-10 p87: table name 'Condition text' vs field-definition heading 'Condition Text' (p90); table value kept
- TQ1-11 p87: table name 'Text instruction' vs field-definition heading 'Text Instruction' (p90); table value kept
- TQ1-13 p87: table name 'Occurrence duration' vs field-definition heading 'Occurrence Duration' (p90); table value kept
- TQ1-14 p87: table name 'Total occurrences' vs field-definition heading 'Total Occurrences' (p90); table value kept
- TQ2-1 p91: table name 'Set ID - TQ2' vs field-definition heading 'Set ID – TQ2' (p92); table value kept
- ODT-2 p114: table name 'Service Period' vs field-definition heading 'Service period' (p114); table value kept
- RQD-9 p123: table name 'Deliver To ID' vs field-definition heading 'Deliver to ID' (p125); table value kept
- BPO-11 p137: table name 'BP Requested Dispense To Location' vs field-definition heading 'BP Requested Dispense to Location' (p140); table value kept
- BPO-12 p137: table name 'BP Requested Dispense To Address' vs field-definition heading 'BP Requested Dispense to Address' (p140); table value kept
- BPX-18 p142: table name 'BP Actual Dispensed To Location' vs field-definition heading 'BP Actual Dispensed to Location' (p147); table value kept
- BPX-19 p142: table name 'BP Actual Dispensed To Address' vs field-definition heading 'BP Actual Dispensed to Address' (p148); table value kept
- DON-13 p176: table name 'Process Interruption Reason' vs field-definition heading '- Process Interruption Reason' (p179); table value kept
- DON-22 p176: table DT 'CNE' vs heading DT 'CWE'; table value kept
- BUI-1 p185: table name 'Set ID – BUI' vs field-definition heading 'Set ID' (p186); table value kept
- RXO-13 p40: table name 'Number Of Refills' vs field-definition heading 'Number of Refills' (p44); table value kept
- RXE-42 p60: table name 'Deliver-to Patient Location' vs field-definition heading 'Deliver-To Patient Location' (p72); table value kept
- RXD-1 p75: table name 'Dispense Sub-ID Counter' vs field-definition heading 'Dispense Sub-ID counter' (p76); table value kept
- RXD-25 p75: table name 'Supplementary Code' vs field-definition heading 'Supplementary code' (p81); table value kept
- RXG-5 p86: table name 'Give Amount - Minimum' vs field-definition heading 'Give Amount – Minimum' (p87); table value kept
- RXA-7 p95: table name 'Administered Units' vs field-definition heading 'Administered units' (p97); table value kept
- RXA-27 p96: table name 'Administer-at' vs field-definition heading 'Administered-At' (p101); table value kept
- RXA-29 p96: table name 'Administered Tag Identifier' vs field-definition heading 'Administration Tag Identifier' (p103); table value kept
- RXV-1 p103: table name 'Set ID - RXV' vs field-definition heading 'Set ID' (p104); table value kept
- QAK-5 p50: table name 'This payload' vs field-definition heading 'This Payload' (p50); table value kept
- QAK-6 p50: table name 'Hits remaining' vs field-definition heading 'Hits Remaining' (p50); table value kept
- RCP-2 p53: table name 'Quantity Limited Request .' vs field-definition heading 'Quantity Limited Request' (p54); table value kept
- RCP-7 p54: table name 'Segment group inclusion' vs field-definition heading 'Segment Group Inclusion' (p55); table value kept
- FT1-20 p23: table name 'Performed By Code' vs field-definition heading 'Performed by Code' (p29); table value kept
- FT1-24 p24: table name 'Entered By Code' vs field-definition heading 'Entered by Code' (p32); table value kept
- FT1-45 p24: table name 'DME Certification Type Code' vs field-definition heading 'DME Certification Type' (p40); table value kept
- FT1-46 p24: table name 'DME Duration Value' vs field-definition heading 'DME Duration' (p41); table value kept
- FT1-53 p24: table name 'DME Frequency Code' vs field-definition heading 'DME Frequency' (p41); table value kept
- FT1-55 p24: table name 'DME Condition Indicator Code' vs field-definition heading 'DME Condition Indicator' (p42); table value kept
- DRG-31 p49: table name 'Status Weight at Birth' vs field-definition heading 'Status Weight At Birth' (p55); table value kept
- GT1-6 p61: table name 'Guarantor Ph Num – Home' vs field-definition heading 'Guarantor Ph Num - Home' (p65); table value kept
- GT1-7 p61: table name 'Guarantor Ph Num – Business' vs field-definition heading 'Guarantor Ph Num - Business' (p65); table value kept
- GT1-8 p61: table name 'Guarantor Date/Time Of Birth' vs field-definition heading 'Guarantor Date/Time of Birth' (p66); table value kept
- GT1-24 p61: table name 'Guarantor Death Date And Time' vs field-definition heading 'Guarantor Death Date and Time' (p71); table value kept
- IN1-16 p81: table name 'Name Of Insured' vs field-definition heading 'Name of Insured' (p87); table value kept
- IN1-17 p81: table name "Insured's Relationship To Patient" vs field-definition heading "Insured's Relationship to Patient" (p88); table value kept
- IN1-18 p81: table name "Insured's Date Of Birth" vs field-definition heading "Insured's Date of Birth" (p88); table value kept
- IN1-20 p81: table name 'Assignment Of Benefits' vs field-definition heading 'Assignment of Benefits' (p89); table value kept
- IN1-21 p81: table name 'Coordination Of Benefits' vs field-definition heading 'Coordination of Benefits' (p90); table value kept
- IN1-22 p81: table name 'Coord Of Ben. Priority' vs field-definition heading 'Coord of Ben. Priority' (p90); table value kept
- IN1-23 p81: table name 'Notice Of Admission Flag' vs field-definition heading 'Notice of Admission Flag' (p90); table value kept
- IN1-24 p81: table name 'Notice Of Admission Date' vs field-definition heading 'Notice of Admission Date' (p90); table value kept
- IN1-25 p81: table name 'Report Of Eligibility Flag' vs field-definition heading 'Report of Eligibility Flag' (p90); table value kept
- IN1-26 p81: table name 'Report Of Eligibility Date' vs field-definition heading 'Report of Eligibility Date' (p90); table value kept
- IN1-28 p81: table name 'Pre-Admit Cert (PAC)' vs field-definition heading 'Pre-admit Cert (PAC)' (p91); table value kept
- IN1-30 p81: table name 'Verification By' vs field-definition heading 'Verification by' (p91); table value kept
- IN1-31 p81: table name 'Type Of Agreement Code' vs field-definition heading 'Type of Agreement Code' (p92); table value kept
- IN2-11 p98: table name 'Dependent Of Military Recipient' vs field-definition heading 'Dependent of Military Recipient' (p103); table value kept
- IN2-18 p98: table name 'Military Non-Avail Cert On File' vs field-definition heading 'Military Non-Avail Cert on File' (p104); table value kept
- IN2-60 p99: table name 'Policy Source' vs field-definition heading 'Policy source' (p117); table value kept
- ACC-9 p133: table name 'Brought In By' vs field-definition heading 'Brought in By' (p135); table value kept
- UB2-9 p139: table name 'Uniform Billing Locator 2 (state)' vs field-definition heading 'UB92 Locator 2 (state)' (p141); table value kept
- UB2-10 p139: table name 'Uniform Billing Locator 11 (state)' vs field-definition heading 'UB92 Locator 11 (state)' (p141); table value kept
- UB2-11 p139: table name 'Uniform Billing Locator 31 (national)' vs field-definition heading 'UB92 Locator 31 (national)' (p141); table value kept
- UB2-13 p139: table name 'Uniform Billing Locator 49 (national)' vs field-definition heading 'UB92 Locator 49 (national)' (p141); table value kept
- UB2-14 p139: table name 'Uniform Billing Locator 56 (state)' vs field-definition heading 'UB92 Locator 56 (state)' (p141); table value kept
- UB2-15 p139: table name 'Uniform Billing Locator 57 (sational)' vs field-definition heading 'UB92 Locator 57 (national)' (p141); table value kept
- UB2-16 p139: table name 'Uniform Billing Locator 78 (state)' vs field-definition heading 'UB92 Locator 78 (state)' (p141); table value kept
- ABS-4 p142: table name 'Date/Time of Attestation' vs field-definition heading 'Date/time of Attestation' (p144); table value kept
- ABS-5 p142: table name 'Attested By' vs field-definition heading 'Attested by' (p144); table value kept
- ABS-8 p142: table name 'Abstracted By' vs field-definition heading 'Abstracted by' (p145); table value kept
- OBX-1 p61: table name 'Set ID – OBX' vs field-definition heading 'Set ID - OBX' (p62); table value kept
- OBX-10 p61: table name 'Nature of Abnormal Test' vs field-definition heading 'Nature of abnormal test' (p69); table value kept
- PRT-11 p90: table name 'Begin Date/Time (arrival time)' vs field-definition heading 'Begin Date/T ime' (p95); table value kept
- PRT-12 p90: table name 'End Date/Time (departure time)' vs field-definition heading 'End Date/Time' (p95); table value kept
- CSR-6 p121: table name 'Date/Time of Patient Study Registration' vs field-definition heading 'Date/Time Patient of Patient Study Registration' (p124); table value kept
- CSR-11 p122: table name 'Study Randomization Date/time' vs field-definition heading 'Study Randomization Date/Time' (p126); table value kept
- CSP-2 p128: table name 'Date/time Study Phase Began' vs field-definition heading 'Date/Time Study Phase Began' (p129); table value kept
- CSP-3 p128: table name 'Date/time Study Phase Ended' vs field-definition heading 'Date/Time Study Phase Ended' (p129); table value kept
- PEO-18 p147: table name 'Cause Of Death' vs field-definition heading 'Cause of Death' (p150); table value kept
- PEO-25 p147: table name "Primary Observer's identity May Be Divulged" vs field-definition heading "Primary Observer's Identity May Be Divulged" (p152); table value kept
- PCR-4 p153: table name 'Total Duration Of Therapy' vs field-definition heading 'Total Duration of Therapy' (p154); table value kept
- PCR-10 p153: table name 'Indication For Product Use' vs field-definition heading 'Indication for Product Use' (p155); table value kept
- PCR-13 p153: table name 'Product Available For Inspection' vs field-definition heading 'Product Available for Inspection' (p155); table value kept
- PCR-18 p153: table name 'Date Product Returned To Manufacturer' vs field-definition heading 'Date Product Returned to Manufacturer' (p156); table value kept
- PCR-21 p153: table name 'Action Taken In Response To The Event' vs field-definition heading 'Action Taken in Response to the Event' (p157); table value kept
- OM1-8 p30: table name 'Other Names' vs field-definition heading 'Other Names (recognized by the producer for the observation)' (p33); table value kept
- OM1-13 p30: table name 'Identity of Instrument Used to Perform this Study' vs field-definition heading 'Identity of Instrument Used to Perform This Study' (p34); table value kept
- OM1-39 p31: table name 'Factors that may Affect the Observation' vs field-definition heading 'Factors That May Affect the Observation' (p41); table value kept
- OM1-46 p31: table name 'Target Anatomic Site Of Test' vs field-definition heading 'Target Anatomic Site of Test' (p44); table value kept
- OM1-51 p31: table name 'Other Names' vs field-definition heading 'Other Names (recognized by the producer for the observation)' (p45); table value kept
- OM1-52 p31: table name "Replacement Producer's Service/Test/Observation ID" vs field-definition heading "Replaced Producer's Service/Test Observation ID" (p46); table value kept
- OM4-17 p54: table name 'Preferred Specimen/Attribture Sequence ID' vs field-definition heading 'Preferred Specimen/Attribute Sequence' (p58); table value kept
- OM5-2 p59: table name 'Test/Observations Included Within an Ordered Test Battery' vs field-definition heading 'Tests/Observations Included Within an Ordered Test Battery' (p59); table value kept
- OMC-1 p66: table name 'Sequence Number - Test/Observation Master File' vs field-definition heading 'Sequence Number – Test/Observation Master File' (p67); table value kept
- OMC-5 p66: table name 'Collection Event/Process Step' vs field-definition heading 'Collection Event/Process Step Limit' (p67); table value kept
- OMC-7 p66: table name 'Answer Required' vs field-definition heading 'Answer Required to Complete the Test' (p68); table value kept
- MCP-1 p76: table name 'Set ID - MCP' vs field-definition heading 'Set ID – MCP' (p76); table value kept
- MCP-5 p76: table name 'Reason for Universal Service Cost Range' vs field-definition heading 'Reason for Universal Service Price Range' (p77); table value kept
- DPS-5 p77: table name 'Type of Limitation' vs field-definition heading 'Type of limitation' (p78); table value kept
- LDP-6 p89: table name 'Active/Inactive Flag' vs field-definition heading 'Active/inactive Flag' (p91); table value kept
- CDM-8 p97: table name 'Active/Inactive Flag' vs field-definition heading 'Active/inactive Flag' (p99); table value kept
- CON-9 p27: table name 'Consenter -imposed limitations' vs field-definition heading 'Consenter-imposed Limitations' (p28); table value kept
- CON-22 p27: table name 'Consent Non-disclosure Reason' vs field-definition heading 'Consent Non-Disclosure Reason' (p30); table value kept
- CON-23 p27: table name 'Non-subject Consenter Reason' vs field-definition heading 'Non-Subject Consenter Reason' (p30); table value kept
- TXA-23 p32: table name 'Distributed Copies (Code and Name of Recipient(s) )' vs field-definition heading 'Distributed Copies (Code and Name of Recipients(s))' (p43); table value kept
- ARQ-19 p28: table name 'Entered By Person' vs field-definition heading 'Entered by Person' (p36); table value kept
- ARQ-20 p28: table name 'Entered By Phone Number' vs field-definition heading 'Entered by Phone Number' (p37); table value kept
- ARQ-21 p28: table name 'Entered By Location' vs field-definition heading 'Entered by Location' (p37); table value kept
- ARQ-26 p28: table ITEM# '03547' vs heading '00218'; table value kept
- SCH-4 p39: table DT 'EI' vs heading DT 'EIP'; table value kept
- SCH-28 p40: table ITEM# '03547' vs heading '00218'; table value kept
- AIS-9 p53: table name 'Allow Substitution Code' vs field-definition heading 'Allow substitution code' (p56); table value kept
- AIL-1 p62: table name 'Set ID - AIL' vs field-definition heading 'Set ID – AIL' (p62); table value kept
- AIL-4 p62: table name 'Location Type - AIL' vs field-definition heading 'Location Type – AIL' (p63); table value kept
- AIP-2 p66: table name 'Segment Action code' vs field-definition heading 'Segment Action Code' (p67); table value kept
- RF1-17 p53: table name 'Number of Schedule Treatments/Units' vs field-definition heading 'Number of Scheduled Treatments/Units' (p57); table value kept
- RF1-24 p54: table DT 'ST' vs heading DT 'TX'; table value kept
- AUT-20 p61: table name 'Number of Schedule Treatments/Units' vs field-definition heading 'Number of Scheduled Treatments/Units' (p65); table value kept
- AUT-28 p61: table DT 'ST' vs heading DT 'TX'; table value kept
- REL-1 p35: table name 'Set ID –REL' vs field-definition heading 'Set ID - REL' (p35); table value kept
- REL-15 p35: table name 'Priority Sequence No (rel preference for consideration)' vs field-definition heading 'Priority Sequence No' (p39); table value kept
- EQU-6 p32: table name 'Expected date/time of the next status change' vs field-definition heading 'Expected Date/Time of the Next Status Change' (p33); table value kept
- SAC-12 p35: table name 'Tray Type – SAC' vs field-definition heading 'Tray Type - SAC' (p38); table value kept
- EQP-1 p62: table name 'Event type' vs field-definition heading 'Event Type' (p62); table value kept
- NCK-1 p5: table name 'System Date/Time' vs field-definition heading 'System Date/time' (p5); table value kept
- NST-15 p8: table name 'Application control-level Errors' vs field-definition heading 'Application Control-level Errors' (p9); table value kept
- AFF-1 p16: table name 'Set ID – AFF' vs field-definition heading 'Set ID - AFF' (p17); table value kept
- CER-1 p18: table name 'Set ID – CER' vs field-definition heading 'Set ID - CER' (p19); table value kept
- CER-29 p19: table name 'Revocation Date' vs field-definition heading 'Revocation date' (p25); table value kept
- EDU-1 p26: table name 'Set ID – EDU' vs field-definition heading 'Set ID - EDU' (p26); table value kept
- LAN-1 p29: table name 'Set ID – LAN' vs field-definition heading 'Set ID - LAN' (p29); table value kept
- ORG-1 p30: table name 'Set ID – ORG' vs field-definition heading 'Set ID - ORG' (p30); table value kept
- STF-1 p38: table name 'Primary Key Value – STF' vs field-definition heading 'Primary Key Value - STF' (p40); table value kept
- STF-9 p39: table name 'Hospital Service – STF' vs field-definition heading 'Hospital Service - STF' (p42); table value kept
- STF-15 p39: table name 'E-Mail Address' vs field-definition heading 'E-mail Address' (p45); table value kept
- STF-22 p39: table name "Driver's License Number – Staff" vs field-definition heading "Driver's License Number - Staff" (p46); table value kept
- STF-39 p39: table name 'Generic resource type or category' vs field-definition heading 'Generic Resource Type or Category' (p49); table value kept
- IVC-25 p33: table name 'Benefit Group' vs field-definition heading 'Benefit group' (p40); table value kept
- IIM-11 p9: table name 'Inventory On Hand Date' vs field-definition heading 'Inventory on Hand Date' (p11); table value kept
- IIM-12 p9: table name 'Inventory On Hand Quantity' vs field-definition heading 'Inventory on Hand Quantity' (p11); table value kept
- IIM-13 p9: table name 'Inventory On Hand Quantity Unit' vs field-definition heading 'Inventory on Hand Quantity Unit' (p11); table value kept
- ITM-6 p12: table name 'Subject to Expiration Indicator' vs field-definition heading 'Subject To Expiration Indicator' (p14); table value kept
- ITM-13 p12: table name 'Transaction Amount - Unit' vs field-definition heading 'Transaction Amount Unit' (p15); table value kept
- ITM-20 p13: table name 'Approved To Buy Quantity' vs field-definition heading 'Approved to Buy Quantity' (p17); table value kept
- ITM-21 p13: table name 'Approved To Buy Price' vs field-definition heading 'Approved to Buy Price' (p18); table value kept
- ITM-32 p13: table name 'Material Data Safety Sheet Number' vs field-definition heading 'Material Safety Data Sheet Number' (p20); table value kept
- ITM-33 p13: table name 'United Nations Standard Products and Services Code (UNSPSC)' vs field-definition heading 'United Nations Standard Products and Services Code' (p21); table value kept
- VND-1 p24: table name 'Set Id – VND' vs field-definition heading 'Set ID - VND' (p24); table value kept
- PKG-1 p26: table name 'Set Id - PKG' vs field-definition heading 'Set ID - PKG' (p26); table value kept
- PKG-3 p26: table name 'Default Order Unit Of Measure Indicator' vs field-definition heading 'Default Order Unit of Measure Indicator' (p26); table value kept
- IVT-1 p29: table name 'Set Id – IVT' vs field-definition heading 'Set ID - IVT' (p30); table value kept
- IVT-13 p30: table name 'Transaction Amount - Unit' vs field-definition heading 'Transaction Amount – Unit' (p32); table value kept
- ILT-1 p35: table name 'Set Id - ILT' vs field-definition heading 'Set ID – ILT' (p36); table value kept
- ILT-8 p36: table name 'Inventory On Hand Date' vs field-definition heading 'Inventory on Hand Date' (p37); table value kept
- ILT-9 p36: table name 'Inventory On Hand Quantity' vs field-definition heading 'Inventory on Hand Quantity' (p37); table value kept
- ILT-10 p36: table name 'Inventory On Hand Quantity Unit' vs field-definition heading 'Inventory on Hand Quantity Unit' (p37); table value kept
- SCP-1 p51: table name 'Number Of Decontamination/Sterilization Devices' vs field-definition heading 'Number of Decontamination/Sterilization Devices' (p52); table value kept
- SCD-25 p56: table name 'Operator - Unload' vs field-definition heading 'Operator – Unload' (p61); table value kept
- DEV-1 p67: table name 'Action Code' vs field-definition heading 'Action code' (p67); table value kept

### 4.7 Placeholder rows in message tables (not segments)
- QBP_Q11 p39: '[...]' — 'Optional query by example segments' (kept as kind "placeholder")
- RTB_Knn p23: '...' — '' (kept as kind "placeholder")
- RSP_Znn p32: '[...]' — '(additional segments according to the data to be produced)' (kept as kind "placeholder")
- RSP_K11 p40: '...' — 'Segment Pattern from Query Profile' (kept as kind "placeholder")
- QBP_Q15 p42: '[...]' — 'Optional query by example segments' (kept as kind "placeholder")
- QVR_Q17 p45: '[...]' — 'Optional query by example segments' (kept as kind "placeholder")
- MFN_Znn p9: '...' — 'One or more HL7 and/or Z -segments carrying the data for the entry identified in the MFE segment' (kept as kind "placeholder")
- PGL_PC6 p10: 'Hxx' — 'etc.' (kept as kind "placeholder")
- PPR_PC1 p13: 'Hxx' — 'etc.' (kept as kind "placeholder")
- PPP_PCB p15: 'Hxx' — 'etc.' (kept as kind "placeholder")
- PPG_PCG p18: 'Hxx' — 'etc.' (kept as kind "placeholder")

### 4.8 Attribute tables excluded, duplicated, or merged from wrapped lines
- RXA (Pharmacy/Treatment Administration Example - Vaccine Messages) in V291_CH04A_Orders_2024SEP.pdf p121 — example table, not a segment definition; excluded
- ZL7 ((proposed example only)) in V291_CH08_MasterFiles_2024SEP.pdf p15 — example table, not a segment definition; excluded
- OBR: defined in V291_CH04_Orders_2024SEP.pdf pp. 71-72 and again in V291_CH07_Observations_2024SEP.pdf pp. 46-47 — identical; kept the first

Cells that wrapped onto a continuation line in the PDF and were merged (e.g. TBL# `0292/0479`, OPT `C(RE/X)`, long names):

- GSP-5 p221: continuation line '0822,' merged into the row
- GSP-5 p221: continuation line '0823' merged into the row
- GSR-7 p224: continuation line 'Gender' merged into the row
- RXE-2 p59: continuation line '479' merged into the row
- RCP-2 p53: continuation line '.' merged into the row
- FT1-44 p24: continuation line 'Code' merged into the row
- IN3-30 p122: continuation line 'X)' merged into the row
- PSH-13 p157: continuation line 'Facility' merged into the row
- PSH-14 p157: continuation line 'Distributor' merged into the row
- OM1-7 p30: continuation line 'Observation' merged into the row
- OM1-10 p30: continuation line 'Observation' merged into the row
- OM1-21 p30: continuation line 'the Observation' merged into the row
- OM1-27 p31: continuation line 'Performed' merged into the row
- OM1-44 p31: continuation line '0257' merged into the row
- OM1-52 p31: continuation line 'ID' merged into the row
- OM1-56 p31: continuation line 'Service/Test/Observation ID' merged into the row
- OM1-58 p32: continuation line '0828' merged into the row
- OM2-6 p48: continuation line 'Continuous Observations' merged into the row
- OM2-7 p48: continuation line 'Observations' merged into the row
- OM2-8 p48: continuation line 'Observations' merged into the row
- OM5-2 p59: continuation line 'Battery' merged into the row
- LCH-5 p84: continuation line '0262/' merged into the row
- LCH-5 p84: continuation line '0263' merged into the row
- PRB-24 p26: continuation line 'Problem/Prognosis' merged into the row
- REL-15 p35: continuation line 'consideration)' merged into the row
- EDU-4 p26: continuation line 'Range' merged into the row
- STF-2 p38: continuation line '0203/' merged into the row
- STF-2 p38: continuation line '0363' merged into the row
- STF-19 p39: continuation line '0328' merged into the row
- ADJ-13 p58: continuation line 'Reference' merged into the row
- ITM-33 p13: continuation line 'Code (UNSPSC)' merged into the row

### 4.9 Shared structures whose per-event tables differ
- ADT_A01: the table printed for 'ADT^A08^ADT_A01: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 26-28) differs from the primary table 'ADT^A01^ADT_A01: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p6) — first difference at item 22: primary ('NEXT_OF_KIN/OH2', 0, '*') vs variant ('NEXT_OF_KIN/OH2', None, None) (62 vs 62 items); kept in full under "variants" in ADT_A01.json
- ADT_A05: the table printed for 'ADT^A14^ADT_A05: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 39-41) differs from the primary table 'ADT^A05^ADT_A05: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p17) — first difference at item 32: primary ('OBSERVATION/PRT', None, None) vs variant ('OBSERVATION/PRT', 0, '*') (61 vs 61 items); kept in full under "variants" in ADT_A05.json
- ADT_A05: the table printed for 'ADT^A28^ADT_A05: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 61-63) differs from the primary table 'ADT^A05^ADT_A05: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p17) — first difference at item 32: primary ('OBSERVATION/PRT', None, None) vs variant ('OBSERVATION/PRT', 0, '*') (61 vs 61 items); kept in full under "variants" in ADT_A05.json
- ADT_A05: the table printed for 'ADT^A31^ADT_A05: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 66-67) differs from the primary table 'ADT^A05^ADT_A05: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p17) — first difference at item 32: primary ('OBSERVATION/PRT', None, None) vs variant ('OBSERVATION/PRT', 0, '*') (61 vs 61 items); kept in full under "variants" in ADT_A05.json
- ADT_A06: the table printed for 'ADT^A07^ADT_A06: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 23-25) differs from the primary table 'ADT^A06^ADT_A06: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p20) — first difference at item 12: primary ('OH2', 0, '*') vs variant ('OH2', None, None) (56 vs 56 items); kept in full under "variants" in ADT_A06.json
- ADT_A09: the table printed for 'ADT^A11^ADT_A09: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 33-33) differs from the primary table 'ADT^A09^ADT_A09: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p29) — first difference at item 16: primary ('OBSERVATION/PRT', 0, '*') vs variant ('OBSERVATION/PRT', None, None) (16 vs 16 items); kept in full under "variants" in ADT_A09.json
- ADT_A21: the table printed for 'ADT^A32^ADT_A21: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf pp. 68-69) differs from the primary table 'ADT^A21^ADT_A21: ADT Message' (V291_CH03_PatientAdmin_2024SEP.pdf p50) — first difference at item 16: primary ('OBSERVATION/PRT', 0, '*') vs variant ('OBSERVATION/PRT', None, None) (16 vs 16 items); kept in full under "variants" in ADT_A21.json
- RDE_O11: the table printed for 'RDE^O25^RDE_O11: Pharmacy/Treatment Refill Authorization Request' (V291_CH04A_Orders_2024SEP.pdf pp. 25-28) differs from the primary table 'RDE^O11^RDE_O11: Pharmacy/Treatment Encoded Order Message' (V291_CH04A_Orders_2024SEP.pdf p9) — first difference at item 37: primary ('ORDER/ORDER_DETAIL/GROUP:COMPONENT', 0, '*') vs variant ('ORDER/ORDER_DETAIL/GROUP:COMPONENTS', 0, '*') (62 vs 88 items); kept in full under "variants" in RDE_O11.json
- RDY_K15: the table printed for 'RDY^Znn^RDY_K15: Response Grammar: RDY Message' (V291_CH05_Queries_2024SEP.pdf pp. 34-34) differs from the primary table 'RDY^K15^RDY_K15: Display Based Response' (V291_CH05_Queries_2024SEP.pdf p42) — first difference at item 5: primary ('ERR', 0, '*') vs variant ('ERR', 0, 1) (9 vs 9 items); kept in full under "variants" in RDY_K15.json
- RTB_K13: the table printed for 'RTB^Z96^RTB_K13: Response Grammar: Who Am I' (V291_CH05_Queries_2024SEP.pdf pp. 94-94) differs from the primary table 'RTB^K13^RTB_K13: Table Based Response' (V291_CH05_Queries_2024SEP.pdf p41) — first difference at item 5: primary ('ERR', 0, '*') vs variant ('ERR', 0, 1) (11 vs 11 items); kept in full under "variants" in RTB_K13.json
- ORU_R30: the table printed for 'ORU^R31^ORU_R30: Observation Message' (V291_CH07_Observations_2024SEP.pdf pp. 16-17) differs from the primary table 'ORU^R30^ORU_R30: Observation Message:' (V291_CH07_Observations_2024SEP.pdf p14) — first difference at item 37: primary ('DEVICE/OBX', None, None) vs variant ('DEVICE/OBX', 0, '*') (37 vs 37 items); kept in full under "variants" in ORU_R30.json
- ORU_R30: the table printed for 'ORU^R32^ORU_R30: Observation Message' (V291_CH07_Observations_2024SEP.pdf pp. 19-20) differs from the primary table 'ORU^R30^ORU_R30: Observation Message:' (V291_CH07_Observations_2024SEP.pdf p14) — first difference at item 37: primary ('DEVICE/OBX', None, None) vs variant ('DEVICE/OBX', 0, '*') (37 vs 37 items); kept in full under "variants" in ORU_R30.json
- MDM_T02: the table printed for 'MDM^T06^MDM_T02: Document Addendum Notification & Content' (V291_CH09_MedRecords_2024SEP.pdf pp. 17-18) differs from the primary table 'MDM^T02^MDM_T02: Original Document Notification & Content' (V291_CH09_MedRecords_2024SEP.pdf p11) — first difference at item 23: primary ('GROUP:OBSERVATION', 1, '*') vs variant ('GROUP:None', 1, '*') (26 vs 26 items); kept in full under "variants" in MDM_T02.json
- RQI_I01: the table printed for 'RQI^I03^RQI_I01: Request Patient Information' (V291_CH11_PatientReferral_2024SEP.pdf pp. 14-14) differs from the primary table 'RQI^I01^RQI_I01: Request Patient Information' (V291_CH11_PatientReferral_2024SEP.pdf p10) — first difference at item 15: primary ('GROUP:GUARANTOR_INSURANCE', 0, 1) vs variant ('GROUP:GUARANTOR+INSURANCE', 0, 1) (21 vs 21 items); kept in full under "variants" in RQI_I01.json

### 4.10 Message tables excluded or reference-only
- WRP^Z02^WRQ_Z02: Widget Reports (V291_CH02_Control_2024SEP.pdf p51) — chapter 2 worked example (fictional Z event); excluded
- QBP^Q25^QBP_Q21: Query Personnel Information Message (V291_CH15_PersMngmt_2024SEP.pdf p11): the table body prints only 'see                                                                          3.3.58'; indexed with "definedBy" and no own structure file

All 115 per-event `ACK^xxx^ACK: General Acknowledgment` tables printed in chapters 3–17 were parsed and compared with the chapter 2 `ACK^varies^ACK` table (p. 53): all identical in shape (MSH, [{SFT}], [UAC], MSA, [{ERR}]). They are not duplicated as files; the index lists the general ACK once.

### 4.11 Withdrawn events (no structure file; listed in index.json with status withdrawn)
- A18 — 3.3.18 ADT/ACK - Merge Patient Information (Event A18) (V291_CH03_PatientAdmin_2024SEP.pdf p. 48)
- A19 — 3.3.19 QRY/ADR - Patient Query (Event A19) (V291_CH03_PatientAdmin_2024SEP.pdf p. 48)
- A30 — 3.3.30 ADT/ACK - Merge Person Information (Event A30) (V291_CH03_PatientAdmin_2024SEP.pdf p. 65)
- A34 — 3.3.34 ADT/ACK - Merge Patient Information - Patient ID Only (Event A34) (V291_CH03_PatientAdmin_2024SEP.pdf p. 71)
- A39 — 3.3.39 ADT/ACK - Merge Person - Patient ID (Event A39) (V291_CH03_PatientAdmin_2024SEP.pdf p. 74)
- A46 — 3.3.46 ADT/ACK - Change Patient ID (Event A46) (V291_CH03_PatientAdmin_2024SEP.pdf p. 84)
- A48 — 3.3.48 ADT/ACK - Change Alternate Patient ID (Event A48) (V291_CH03_PatientAdmin_2024SEP.pdf p. 86)
- V01 — 4A.7.3 VXQ - Query for Vaccination Record (Event V01) (V291_CH04A_Orders_2024SEP.pdf p. 119)
- V03 — 4A.7.5 VXR - Vaccination Record Response (Event V03) (V291_CH04A_Orders_2024SEP.pdf p. 119)
- R21 — 7.3.2 OUL – Unsolicited Laboratory Observation Message (Event R21) (V291_CH07_Observations_2024SEP.pdf p. 13)
- R02 — 7.3.3 QRY/ORF - Query for Results of Observation (Events R02, R04) (V291_CH07_Observations_2024SEP.pdf p. 13)
- R04 — 7.3.3 QRY/ORF - Query for Results of Observation (Events R02, R04) (V291_CH07_Observations_2024SEP.pdf p. 13)
- P09 — 7.11.2 SUR - Summary Product Experience Report (Event P09) (V291_CH07_Observations_2024SEP.pdf p. 141)
- M01 — 8.4.1 MFN/MFK - Master File Notification [WITHDRAWN] (Event M01) (V291_CH08_MasterFiles_2024SEP.pdf p. 7)
- M01-M17 — 8.4.4 MFQ/MFR - Master Files Query [WITHDRAWN] (Event M01 -M17) (V291_CH08_MasterFiles_2024SEP.pdf p. 10)
- T12 — 9.9.1 QRY/DOC - Document Query (Event T12) (V291_CH09_MedRecords_2024SEP.pdf p. 46)
- S25 — 10.5.3 SQM/SQR - Schedule Query Message and Response (Event S25) (V291_CH10_Scheduling_2024SEP.pdf p. 27)
- I05 — 11.3.5 RQC/RCI - Request for Patient Clinical Information (Event I05) (V291_CH11_PatientReferral_2024SEP.pdf p. 18)
- I06 — 11.3.6 RQC/RCL - Request/Receipt of Clinical Data Listing (Event I06) (V291_CH11_PatientReferral_2024SEP.pdf p. 18)
- PC4 — 12.3.5 QRY - Patient Care Problem Query (Event PC4) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PC5 — 12.3.6 PRR - Patient Problem Response (Event PC5) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PC9 — 12.3.7 QRY - Patient Goal Query (Event PC9) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PCA — 12.3.8 PPV - Patient Goal Response (Event PCA) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PCE — 12.3.9 QRY - Patient Pathway (Problem-Oriented) Query (Event PCE) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PCF — 12.3.10 PTR - Patient Pathway (Problem-Oriented) Response (Event PCF) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PCK — 12.3.11 QRY - Patient Pathway (Goal-Oriented) Query (Event PCK) (V291_CH12_PatientCare_2024SEP.pdf p. 20)
- PCL — 12.3.12 PPT - Patient Pathway (Goal-Oriented) Response (Event PCL) (V291_CH12_PatientCare_2024SEP.pdf p. 20)

The range tables in chapter 10 (SRM/SRR `S01-S11`, SIU `S12-S24,S26,S27` as printed), chapter 11 (RQA/RPA I08–I11, REF/RRI I12–I15, CCR I16–I18) and chapter 12 (PC1–PC3, PC6–PC8, PCB–PCD, PCG/PCH/PCJ) cover events whose own sections print no table; those events are indexed from the range table with `eventPrinted`.

### 4.12 Segments referenced in messages but not defined
None — every segment named in any message table (including variants) has an attribute table in `segments.json`. Placeholders (`Hxx`, `[...]`, `...`) are not segments.

## 5. What could not be checked

- The abstract-syntax notation was converted to min/max by rule (no Cardinality column exists in v2.9.1); where the printed brackets do not pair (§4.1) nothing was inferred.
- Text was extracted with pypdf, not poppler. Column assignment is by position under the header line; rows whose cells wrapped were merged by rule (§4.8). Spacing inside names depends on the extraction and is only cross-checked where a per-field heading exists (§4.5).
- pypdf reported rotated text on chapters 3 and 4 ("Rotated text discovered. Output will be incomplete."); no table or page was found missing (every attribute table has contiguous SEQ numbers and every message table balances except the printed mismatches above), but rotated fragments may be dropped from descriptions.
- Field-definition headings were used only to cross-check names/DT/ITEM# (§4.5/4.6); the tables remain the source of every value.
- Descriptions in message items are the Description column as printed, including the PDF's own typos (e.g. `Notest and Comments`, `Past or Prsent Job`, `compatibilitty`).

## 6. Status

**Extraction complete**: 189 segments / 2895 fields and 213 message structures (398 index entries incl. 27 withdrawn) from all 17 chapter PDFs; the only gaps are the 24 cardinalities set to null because the PDF prints mismatched brackets (§4.1).
