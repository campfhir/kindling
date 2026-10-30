# ASAP PDMP dispensation format: facts confirmed from public sources

Research date: 2026-10-30. I fetched every source below (PDF downloaded and text-extracted with
`pdftotext -layout`) and read the cited pages. I relied on nothing from memory or blogs.

**Key caveat.** The ASAP Implementation Guide itself is a paid document (asapnet.org sells it for
$300-$500). No public copy exists. All element tables below come from **state PDMP dispenser guides
that reprint the ASAP field tables**. Their "Requirement" columns mix ASAP requirements with
state-specific ones. Only the WA (4.2A) and AL (4.2B) guides separate "R = Required by ASAP" from
"RR = Required by state", and even those two disagree (see Disagreements). So the true
ASAP-level usage (M/S/N) of each element is **not confirmed** from public sources. The element IDs,
names, order and code lists are confirmed, and they are consistent across guides.

## Sources

"PDF p." is the physical page index in the PDF. "printed p." is the page number in the footer.

| Code | Document | URL |
|---|---|---|
| TX | Texas PMP *Data Submission Guide for Dispensers*, v4.1 (Bamboo Health, (c)2025; last change-log entry 06/19/2025). Has App. A 4.1, B 4.2, **C 4.2A**, **D 4.2B**, E Zero Report | https://www.pharmacy.texas.gov/files_pdf/pmp/data-submission-guide-for-dispensers.pdf |
| SC | South Carolina PMP *Data Submission Dispenser Guide* v4.0 (Bamboo, (c)2025). App. A ASAP 4.2B | https://dph.sc.gov/sites/scdph/files/2025-06/SC_PMP_Data_Submission_Dispenser_Guide_v4.0.pdf |
| AL | Alabama PDMP *Data Submission Guide for Dispensers* v3.1, Jan 2025 (Bamboo). App. A ASAP 4.2B; legend "R = Required by ASAP, RR = Required by Alabama" | https://www.alabamapublichealth.gov/PDMP/assets/al-data-submission-dispenser-guide.pdf |
| LA | Louisiana PMP *Data Submission Guide for Dispensers* v4.0, Dec 2025 (Bamboo). App. A ASAP 4.2B | https://www.pharmacy.la.gov/assets/docs/PMP/Support_Guides/LA-Data-Submission-Dispenser-Guide_v4.0_2025.12.pdf |
| MS | Mississippi PMP *Data Submission Guide for Dispensers* v4.1, Mar 2026 (Bamboo). App. A ASAP 4.2B | https://pmp.mbp.ms.gov/sites/default/files/March%202026%20MS%20PMP%20Data%20Submission%20Dispenser%20Guide_v4.1%20version%202.pdf |
| WA | Washington PMP *Data Submission Guide for Dispensers* (Bamboo, (c)2026). App. A ASAP 4.2A; legend "R = Required by ASAP, RR = Required by WA PMP, N = Not used" | https://DOH.WA.gov/sites/default/files/legacy/Documents/2600/WA-DataSubmissionDispenserGuide.pdf |
| NE | Nebraska DHHS/CyncHealth *PDMP Submitter User Guide* V1.5 (Jan 10 2023 on cover) | https://dhhs.ne.gov/DOP%20document%20library/PDMP-Submitter-User-Guide-PRE-July2024.pdf |
| MI | Michigan MAPS, *Format for ASAP Version 4.1 (2009), List of required fields* | https://www.michigan.gov/-/media/Project/Websites/lara/healthsystemslicensing/Folder1/lara_MAPS_ASAP2009_ListofRequiredFields.pdf?rev=748a9ac4018c4ff0b86cdef0632cc52c |
| MT | Montana MPDR *Technical Specifications for Pharmacies* (ASAP 4.1) | https://boards.bsd.dli.mt.gov/Portals/133/Documents/pha/mpdr/dli-bsd-mpdr013.pdf |
| TN | Tennessee CSMD *Data Collection Manual* v2.2, effective Mar 1 2026 (Bamboo). ASAP 4.2A (June 2017 version) | https://www.tn.gov/content/dam/tn/health/healthprofboards/csmd/TNDataCollectionManualTN.pdf |
| MD | Maryland PDMP *RxGov Data Submitter User Guide for ASAP 5.0*, Version 6 (Aug 2025) | https://health.maryland.gov/pdmp/Documents/%5BUPDATED%5D%20RxGov%20Data%20Submitter%20Guides/Maryland%20PDMP%20RxGov%20Data%20Submitter%20(v5.0)%20-%20August%202025.pdf |
| ASAP | asapnet.org Publications page (product descriptions only) | https://asapnet.org/publications/ |
| LC | LogiCoy (PDMP vendor) *Dispenser Upload Guide ASAP 4.2A*, Oct 2018. **Vendor doc, secondary**: used only as a cross-check | https://s3.amazonaws.com/logicoy-pdmp-docs/LogiCoy-PDMP-System-Dispenser-Upload-Guide.pdf |

Also downloaded and spot-checked for consistency (same Bamboo template): Georgia v3.1 Feb 2026
(ASAP 4.2) https://dph.georgia.gov/media/91541/download, Minnesota v3.0 Apr 2025 (ASAP 4.2)
https://mn.gov/boards/assets/MN%20Data%20Submission%20Dispenser%20Guide_v3.0_tcm21-563922.pdf,
and Michigan Bamboo guide (ASAP 4.1)
https://www.michigan.gov/-/media/Project/Websites/lara/bpl/Folder5/MI_Data_Submission_Dispenser_Guide.pdf?rev=3a43819a7f5049a289cf478d98dc5427

ASAP versions, from [ASAP]: 4.0 (2007), 4.1 (2009), 4.2 (2011), 4.2A (2016; "refinements to 4.2 …
including changes to the PHA, DSP, and PRE segments"), 4.2B (2020; "changes needed by PDMPs to
improve the quality and scope of the data reported"), and 5.0 (2023; "Not to be implemented prior to
January 2024"; "a number of new fields"; some fields "moved to new positions or retired").

---

## 1. Segments, order, status and looping

Confirmed order: **TH, IS, PHA, PAT, DSP, PRE, CDI, AIR, TP, TT**. This matches your understanding.

| Seg | Name | Status (as labeled in guides) | Occurrence / loop | Sources |
|---|---|---|---|---|
| TH | Transaction Header | Required | Once per file (header) | TX PDF p.72, 84 ("TH: Transaction Header (required)"); SC PDF p.51; MI p.3 ("The Header (TH and IS) is sent once for the entire file") |
| IS | Information Source | Required | Once per file (header) | same; MI p.3 |
| PHA | Pharmacy Header | Required | Starts the **pharmacy loop**. It repeats per pharmacy, with all detail segments under it | TX p.73/85; MI p.3 ("If multiple pharmacies are included in a single file, the PHA segment is repeated with all the DETAIL segments under it for each Pharmacy") |
| PAT | Patient Information | Required | **Patient loop** inside the pharmacy loop. It repeats per patient | MI p.3 ("If there are multiple patients … the PAT, DSP and PRE are repeated for each patient") |
| DSP | Dispensing Record | Required | **Detail loop** inside PAT: DSP (+PRE, CDI, AIR) can repeat under one PAT | MI p.3 ("the prescription info can loop multiple times under the PAT segment. However, you may also include the PAT segment for each RX filled if necessary"); NE PDF p.45 ("the information can be looped (DSP / PRE / CDI / AIR) under the same PAT segment") |
| PRE | Prescriber Information | Required | Once per DSP | TX p.76/90 "(required)"; MI p.3 |
| CDI | Compound Drug Ingredient Detail | Situational | Required when DSP07 = 06 (compound). It **repeats once per reportable ingredient** (CDI01 sequence 1, 2, …) | TX p.80/91: "If more than one ingredient is for a prescription monitoring program reporting drug, then this would be incremented by one for each compound ingredient"; MI p.3; NE sample (3-4 CDIs per DSP) PDF p.45-46 |
| AIR | Additional Information Reporting | Situational | Per DSP. "If this segment is used, at least one of the data elements (fields) will be required" | TX p.80/91 |
| TP | Pharmacy Trailer | Required | Closes each pharmacy loop (one per PHA) | MI p.3 ("The TP segment is inserted at the end of each pharmacy's report") |
| TT | Transaction Trailer | Required | Once, at end of file | MI p.3 ("The TT field is inserted at the end of the entire file") |

The LC p.11 "Core Reporting Segments" groups the segments as Header (TH, IS, PHA), Detail (PAT, DSP,
PRE, CDI situational, AIR situational) and Summary (TP, TT). The same grouping appears in MI p.1-3
(HEADER / DETAIL / SUMMARY).

NE PDF p.34 and MD PDF p.44: "Segments must be in the specified order for the file to process
appropriately."

Optional segments may be omitted or sent empty. MI p.3: "If a segment is not being used at all
(i.e., CDI segment), you do not need to include them in the file. However, if you wish to include
the segment in the file with no data, you must use at least one delimiter ex. CDI*\." The Bamboo
zero-report samples include empty `CDI*\` and `AIR*\` (TX PDF p.96, SC PDF p.63). NE zero
samples omit them (NE PDF p.47).

Inferred grammar (sequence from TX/SC; loop rules from MI/NE; not an ASAP-published grammar):

```
TH IS
{ PHA
    { PAT
        { DSP PRE [CDI...] [AIR] }+
    }+
  TP
}+
TT
```

Whether AIR may repeat per DSP is **not confirmed**. No public source says it does, and none says
it cannot.

---

## 2. Envelope segments

The requirement codes are identical in TX 4.2A, TX 4.2B, SC 4.2B, AL 4.2B, WA 4.2A, LA 4.2B and MS 4.2B
for every TH/IS/TP/TT element (R = required, N = not required/not used).

### TH: Transaction Header
Purpose (all guides): "Used to indicate the start of a transaction. It also assigns the data element
separator, segment terminator, and control number."

| ID | Name | Req | Values / notes | Sources |
|---|---|---|---|---|
| TH01 | Version/Release Number | R | "Code uniquely identifying the transaction." Values seen in samples and tables: `4.1`, `4.2`, `4.2A`, `4.2B` (and `4.2a` lower case in NE zero sample; `5.0` in IL/MD 5.0 guides). Guides print "Format = x.xx" or "Format = xx.x" (see Disagreements). LC and MD give size AN4 | TX PDF p.72 (4.2A), p.84 (4.2B); SC p.51; Zero-report tables: SC PDF p.62 "TH01 4.2B", LA p.64, MS p.64, WA p.70 "Version/ Release Number: 4.2A"; TN p.19 "4.2A (June 2017 version)" |
| TH02 | Transaction Control Number | R | "Sender assigned code uniquely identifying a transaction." TN/LC recommend a GUID. LC/MD: AN40 | TX p.72/84; TN p.19 |
| TH03 | Transaction Type | N | 01 Send/Request Transaction; 02 Acknowledgement (Response only); 03 Error Receiving (Response only); 04 Void ("used to void a specific Rx in a real-time transmission or an entire batch that has been transmitted"). TN p.19 adds: "When 04 is used, only the TH Header Segment and the Transaction Trailer Segment are used." | TX p.72/84; TN p.19 |
| TH04 | Response ID | N | "Contains the Transaction Control Number of a transaction that initiated the transaction. Required in response transaction only." | TX p.72/84 |
| TH05 | Creation Date | R | CCYYMMDD | TX p.72/84 |
| TH06 | Creation Time | R | HHMMSS or HHMM | TX p.72/84 |
| TH07 | File Type | R | **P = Production, T = Test** | TX p.72/84; SC p.51; MI p.1 |
| TH08 | Routing Number | N | "Reserved for real-time transmissions that go through a network switch to indicate, if necessary, the specific PMP the transaction should be routed to." (LC: "Not Used", N6). In 5.0 [MD] the slot is "CDS or NonCDS Zero Report Indicator" (01 CDS, 02 Non-CDS). Whether that is ASAP 5.0 or Maryland-specific is unverified | TX p.72/84; MD PDF p.46 |
| TH09 | Segment Terminator Character | R | "This terminates the TH segment and sets the actual value of the data segment terminator for the entire transaction." Written twice at end of TH: e.g. `~~` or `\\` (see section 3) | TX p.72/84; SC p.50-51; MI p.1 |

### IS: Information Source
"Used to convey the name and identification numbers of the entity supplying the information."

| ID | Name | Req | Notes | Sources |
|---|---|---|---|---|
| IS01 | Unique Information Source ID | R | "Reference number or identification number. (Example: phone number)" | TX p.72/84 |
| IS02 | Information Source Entity Name | R | "Entity name of the Information Source." | TX p.72-73/84 |
| IS03 | Message | N | "Free-form text message." Zero reports put the date range here: `#CCYYMMDD#-#CCYYMMDD#` | TX p.73/84, zero table p.95 |

(5.0 adds IS04 Pharmacy Dispensing Software Vendor and IS05 Phone Number of Software Vendor, per
MD PDF p.47.)

### TP: Pharmacy Trailer
"Used to identify the end of data for a given pharmacy and provide the count of the total number of
detail segments reported for the pharmacy, including the PHA and TP segment."

| ID | Name | Req | What it counts | Sources |
|---|---|---|---|---|
| TP01 | Detail Segment Count | R | "Number of detail segments included for the pharmacy including the pharmacy header (PHA) and the pharmacy trailer (TP) segments." So it counts **every segment from PHA through TP, inclusive**, for that pharmacy. LC/MD: N10 | TX PDF p.82 (4.2A), p.94 (4.2B); SC p.61 |

### TT: Transaction Trailer
"Used to indicate the end of the transaction and provide the count of the total number of segments
included in the transaction."

| ID | Name | Req | What it holds | Sources |
|---|---|---|---|---|
| TT01 | Transaction Control Number | R | "Identifying control number that must be unique. Assigned by the originator of the transaction. **Must match the number in TH02.**" | TX p.82/94 |
| TT02 | Segment Count | R | "Total number of segments included in the transaction including the header and trailer segments." So it counts **all segments TH through TT, inclusive**. LC N10; MD N12 | TX p.82/94 |

**Arithmetic check of the counts against printed samples (all confirm PHA..TP and TH..TT inclusive):**
- Bamboo zero report (TX p.96, SC p.63): PHA, PAT, DSP, PRE, CDI, AIR, TP = **TP\*7**. TH + IS + 7 + TT = **TT\*…\*10**.
- NE single report (PDF p.45): PHA, PAT, DSP, PRE, TP = `TP*5`. 2 + 5 + 1 = `TT*…*8`.
- NE multi-pharmacy (PDF p.45-46): pharmacy 1 = PHA + 2×(PAT, DSP, PRE, 3×CDI) + TP = `TP*14`. Pharmacy 2 = PHA + 2×(PAT, DSP, PRE, 4×CDI) + TP = `TP*16`. 2 + 14 + 16 + 1 = `TT*Sample Test File*33`.
- TN animal file (PDF p.60): PHA + 5×(PAT, DSP, PRE) + TP = `TP*17*`. 2 + 17 + 1 = `TT*…*20*`.

---

## 3. Delimiters

| Fact | Status | Sources |
|---|---|---|
| **Data element separator** = the character immediately after `TH`, i.e. the 3rd byte/character of the file. It is not named in any element. Example: `*` | Confirmed (3 public sources, none Bamboo) | MT PDF p.13: "The third byte in the TH segment is used by example to indicate the data element separator."; NE PDF p.34: "Data (Field) Delimiter … and is the third ASCII code / character in the file."; MD PDF p.44 (same wording, 5.0); LC p.10: "The character used as the Data Element Separator is defined by the value in the third byte of the transaction." |
| Bamboo guides only say: "Data Delimiter – character used to separate segments and the data elements within a segment, for example, an asterisk (*). Each completed field should be followed by an asterisk, and each blank field should contain a single asterisk. If the last field in the segment is blank, it should contain an asterisk and a tilde (~)." | Confirmed text | SC PDF p.50; AL p.49; WA p.56; LA p.50 |
| **Segment terminator is defined by TH09.** TH09 holds the terminator character, and the same character then ends the TH segment, so TH ends with the character twice (`~~`, `\\`, `\|\|`) | Confirmed | SC p.50: "Field TH09 in the Transaction Header segment contains a built-in segment terminator. Since TH09 also signifies the end of the segment, it should contain two tildes (~~)."; MI p.1: "The data segment character should be specified twice. One to define the segment terminator character used in the file and the other for terminating the segment since it is the last data element. Example: TH\*4.1\*857463\*\*\*20101213\*112620\*P\*\*\|\|"; MI p.1: terminator "can be any special character. But not same as the data delimiter." |
| The characters themselves are not fixed by ASAP | Stated by NE/MD only | NE PDF p.35 / MD p.44: "Segment Terminators and Data (Field) Delimiters are not specified in the ASAP standard and is open to the appropriate ASCII code or a wide selection of ASCII characters." TN p.19: "some recommended characters are "/" or "~" or "\|" or "\*" but there are other options." |
| **Escape character: caret `^`** | Stated by NE and MD only (not in any Bamboo guide) | NE PDF p.35: "The escape character for the ASAP standard is the caret (^)." Example: `Take 1 table by mouth twice daily. ^*^*Check Pulse Prior to Administration^*^*`. Also: "The caret is used to denote an escape character and should not be used as a data delimiter or segment terminator." MD p.44-45 is identical |
| **Sub-element / composite / repetition separator** | **NOT FOUND.** None of the 15+ guides I read defines a component, sub-element or repetition separator, and no ASAP element is shown with internal structure. The only special characters are the element separator (byte 3), the segment terminator (TH09) and the `^` escape (NE/MD) | (absence across all sources) |
| Trailing empty elements may be dropped | Stated by NE/MD; Bamboo samples do it | NE PDF p.35 / MD p.45: "Segments can end at the last required field, but an ideal file would keep these fields in place." Bamboo zero sample `PAT*******REPORT*ZERO************\` carries only 20 of 23 PAT positions; NE zero sample has `PAT*******Report*Zero~` |
| Line breaks between segments are cosmetic | NE | NE PDF p.45: "The system will be able to read the file as one long string, as long as the Data / Field and Segment delimiters are in place." LC p.10 says a newline may be the terminator |

---

## 4. Detail segment element tables (4.2A and 4.2B)

Column key: **TX-A** = Texas App. C 4.2A, **WA-A** = Washington 4.2A (R = required by ASAP, RR = required by WA),
**TX-B** = Texas App. D 4.2B, **SC-B** = South Carolina 4.2B, **AL-B** = Alabama 4.2B (R = required by ASAP, RR = required by AL).
Codes: R required, RR state-required, N not required / not used, S situational, CS2\* = TX required for Schedule II.
Unless noted, the element name is the same in 4.2A and 4.2B.

Pages: TX-A PDF p.73-82; TX-B PDF p.85-94; SC-B PDF p.51-61; AL-B PDF p.50-59; WA-A PDF p.57-68.

### PHA: Pharmacy Header (required)
"It is required that information be provided in at least one of the following fields: PHA01, PHA02, or PHA03." (TX p.73/85)

| ID | Name | TX-A | WA-A | TX-B | SC-B | AL-B | Notes |
|---|---|---|---|---|---|---|---|
| PHA01 | National Provider Identifier (NPI) | N | S | N | N | N | |
| PHA02 | NCPDP/NABP Provider ID | N | N | N | N | S | |
| PHA03 | DEA Number | R | RR | R | R | RR | |
| PHA04 | Pharmacy Name | R | RR | R | R | RR | "Free-form name of the pharmacy or dispensing practitioner" |
| PHA05 | Address Information – 1 | R | RR | R | N | RR | |
| PHA06 | Address Information – 2 | N | N | N | N | S | |
| PHA07 | City Address | R | RR | R | N | RR | |
| PHA08 | State Address | R | RR | R | N | RR | |
| PHA09 | ZIP Code Address | R | RR | R | N | RR | 4.2B text adds "Do not include hyphens." |
| PHA10 | Phone Number | N | N | N | N | RR | |
| PHA11 | Contact Name | N | N | N | N | S | |
| PHA12 | Chain Site ID | N | N | N | N | S | |
| PHA13 | Pharmacy's Permit Number/License Number | N | S | N | S | S | New in 4.2A (absent from TX App. A 4.1 and App. B 4.2; NE/MD field counts PHA 4.2 = 12, 4.2A = 13). 4.2B text in TX: "To be utilized only when the pharmacy does not have an NPI number or DEA number." |

### PAT: Patient Information (required)

| ID | Name | TX-A | WA-A | TX-B | SC-B | AL-B | Values |
|---|---|---|---|---|---|---|---|
| PAT01 | ID Qualifier of Patient Identifier | N | S | N | N | N | jurisdiction issuing PAT03 |
| PAT02 | ID Qualifier | N | S | N | N | S | 01 Military ID, 02 State Issued ID, 03 Unique System ID, 04 Permanent Resident Card (Green Card), 05 Passport ID, 06 Driver's License ID, 07 Social Security Number, 08 Tribal ID, 99 Other. **4.2B adds 09 Vendor Specific (such as Bamboo Health, Experian, LexisNexis) and 10 Veterinary Patient Microchip Number** (LA PDF p.53; SC p.53; TX-B prints the microchip entry without its number) |
| PAT03 | ID of Patient | N | S | N | N | S | |
| PAT04 | ID Qualifier of Additional Patient Identifier | N | N | N | N | S | |
| PAT05 | Additional Patient ID Qualifier | N | N | N | N | S | same code list as PAT02 (4.2B adds 09, 10) |
| PAT06 | Additional ID | N | S | N | N | S | |
| PAT07 | Last Name | R | RR | R | R | RR | |
| PAT08 | First Name | R | RR | R | R | RR | |
| PAT09 | Middle Name | N | S | N | N | S | |
| PAT10 | Name Prefix | N | N | N | N | N | |
| PAT11 | Name Suffix | N | S | N | N | S | |
| PAT12 | Address Information – 1 | R | RR | R | R | RR | |
| PAT13 | Address Information – 2 | S | N | S | N | S | |
| PAT14 | City Address | R | RR | R | R | RR | |
| PAT15 | State Address | R | RR | R | R | RR | |
| PAT16 | ZIP Code Address | R | RR | R | R | RR | "Populate with zeros if patient address is outside the U.S." |
| PAT17 | Phone Number | N | N | N | N | S | |
| PAT18 | Date of Birth | R | RR | R | R | RR | CCYYMMDD |
| PAT19 | Gender Code | R | RR | R | N | RR | F Female, M Male, U Unknown |
| PAT20 | Species Code | N | S | N | S | RR | 01 Human, 02 Veterinary Patient |
| PAT21 | Patient Location Code | N | N | N | N | S | 01 Home, 02 Intermediary Care, 03 Nursing Home, 04 Long-Term/Extended Care, 05 Rest Home, 06 Boarding Home, 07 Skilled-Care Facility, 08 Sub-Acute Care Facility, 09 Acute Care Facility, 10 Outpatient, 11 Hospice, 98 Unknown, 99 Other |
| PAT22 | Country of Non-U.S. Resident | N | N | N | N | N | 4.2B text: "…and PAT12 through PAT16 are left blank" |
| PAT23 | Name of Animal | N | S | N | S | S | |

### DSP: Dispensing Record (required)

| ID | Name | TX-A | WA-A | TX-B | SC-B | AL-B | Values / notes |
|---|---|---|---|---|---|---|---|
| DSP01 | Reporting Status | R | R | R | R | RR | 00 New Record, 01 Revise, 02 Void. "An empty or blank field no longer indicates a new prescription transaction" |
| DSP02 | Prescription Number | R | R | R | R | RR | |
| DSP03 | Date Written | R | RR | R | R | RR | CCYYMMDD |
| DSP04 | Refills Authorized | R | RR | R | R | RR | |
| DSP05 | Date Filled | R | RR | R | R | RR | CCYYMMDD |
| DSP06 | 4.2A **Refill Number** → 4.2B **Fill Number** | R | RR | R | R | RR | "0 indicates New Rx; 01-99 is the fill number" |
| DSP07 | Product ID Qualifier | R | RR | R | R | RR | 01 NDC, 06 Compound (CDI then required) |
| DSP08 | Product ID | R | RR | R | R | RR | 4.2A: "Full 11-digit NDC …". 4.2B: "Full product identification as indicated in DSP07, including leading zeros without punctuation". Compound: first 5 chars `99999` |
| DSP09 | Quantity Dispensed | R | RR | R | R | RR | metric decimal |
| DSP10 | Days Supply (4.2B text: Days' Supply) | R | RR | R | R | RR | |
| DSP11 | Drug Dosage Units Code | R | N | N | N | RR | 01 Each, 02 Milliliters (ml), 03 Grams (gm) |
| DSP12 | Transmission Form of Rx Origin Code | CS2\* | N | CS2\* | N | N | 01 Written, 02 Telephone, 03 Telephone Emergency, 04 Fax, 05 Electronic, 06 Transfer/Forwarded, 99 Other |
| DSP13 | Partial Fill Indicator | S | N | S | N | S | 00 Not a Partial Fill, 01 First Partial Fill, then incrementing to 99 |
| DSP14 | Pharmacist National Provider Identifier (NPI) | N | S | N | N | N | |
| DSP15 | Pharmacist State License Number | N | N | N | N | S | |
| DSP16 | Classification Code for Payment Type | R | RR | R | R | RR | 01 Private Pay, 02 Medicaid, 03 Medicare, 04 Commercial Insurance, 05 Military Installations and VA, 06 Workers' Compensation, 07 Indian Nations, 99 Other |
| DSP17 | Date Sold | N | RR | N | N | S | |
| DSP18 | RxNorm Code Qualifier | N | N | N | N | S | 01 SCD, 02 SBD, 03 GPCK, 04 BPCK |
| DSP19 | RxNorm Code | S | N | S | N | S | |
| DSP20 | Electronic Prescription Reference Number | CS2\* | N | CS2\* | N | S | SCRIPT MessageID |
| DSP21 | Electronic Prescription Order Number | N | S | N | N | S | SCRIPT PrescriberOrderNumber |
| DSP22 | Quantity Prescribed | N | S | N | S | S | |
| DSP23 | Rx SIG | N | S | N | S | N | |
| DSP24 | Treatment Type | N | N | N | S | S | 01 Not used for opioid dependency treatment, 02 Used for opioid dependency treatment, 03 Pain associated with active and aftercare cancer treatment, 04 Palliative care…, 05 End-of-life and hospice care, 06 A pregnant individual with a pre-existing prescription for opioids, 07 Acute pain for an individual with an existing opioid prescription for chronic pain, 08 Individuals pursuing an active taper…, 09 Patient is participating in a pain management contract, 99 Other. **4.2B adds 10 Acute Opioid Therapy and 11 Chronic Opioid Therapy** (TX-B p.91; AL p.57; TN p.38: "only available in ASAP 4.2b") |
| DSP25 | Diagnosis Code | N | N | N | S | S | ICD-10 or CDT. 4.2B adds "Exclude the decimal point" |

DSP count by version (NE PDF p.35 and MD PDF p.45): 4.2 = 21, 4.2A = 25, 4.2B = 25 (5.0 = 36). So
DSP22-DSP25 are 4.2A additions. TX-A prints DSP22-25 with their IDs beside the descriptions, not
the names (layout quirk), but the order Quantity Prescribed / Rx SIG / Treatment Type / Diagnosis
Code is the same in WA-A and TX-B.

### PRE: Prescriber Information (required)

| ID | Name | TX-A | WA-A | TX-B | SC-B | AL-B | Notes |
|---|---|---|---|---|---|---|---|
| PRE01 | National Provider Identifier (NPI) | N | S | N | N | N | |
| PRE02 | DEA Number | R | RR | R | R | R | |
| PRE03 | DEA Number Suffix | S | N | S | S | S | |
| PRE04 | 4.2A: Prescriber State License Number. 4.2B: **Prescriber License Number** (TX-B, SC-B). AL-B keeps "Prescriber State License Number" | N | N | N | S | N | 4.2B: use only when no NPI/DEA (e.g. veterinarian) |
| PRE05 | Last Name | R | RR | R | R | R | |
| PRE06 | First Name | R | RR | R | R | R | |
| PRE07 | Middle Name | N | N | N | N | S | |
| PRE08 | Phone Number | N | S | N | N | S | |
| PRE09 | XDEA Number | N | N | N | S | N | New in 4.2A (count PRE 4.2 = 8, 4.2A = 9) |
| PRE10 | Jurisdiction or State Issuing Prescriber License Number | — | — | N | S | N | **New in 4.2B** (absent from TX-A/WA-A; NE/MD count PRE 4.2B = 10). "Use this field to further identify the information provided in PRE04." |

### CDI: Compound Drug Ingredient Detail (situational)
"Use of this segment is required when medication dispensed is a compound and one of the ingredients
is a PMP reporting drug… If CDI is filled in, the NDC of DSP08 must be 99999999999." (TX p.80/91)

| ID | Name | TX-A | WA-A | TX-B | SC-B | AL-B | Values |
|---|---|---|---|---|---|---|---|
| CDI01 | Compound Drug Ingredient Sequence Number | S | R | S | S | S | 1, 2, … |
| CDI02 | Product ID Qualifier | S | R | S | S | S | 01 NDC |
| CDI03 | Product ID | S | R | S | S | S | |
| CDI04 | Compound Ingredient Quantity | S | R | S | S | S | metric decimal |
| CDI05 | Compound Drug Dosage Units Code | S | N | S | S | S | 01 Each, 02 Milliliters, 03 Grams |

### AIR: Additional Information Reporting (situational)

| ID | Name | TX-A | WA-A | TX-B | SC-B | AL-B | Values |
|---|---|---|---|---|---|---|---|
| AIR01 | State Issuing Rx Serial Number | CS2\* | N | CS2\* | N | N | required if AIR02 used |
| AIR02 | State Issued Rx Serial Number | CS2\* | N | CS2\* | N | N | |
| AIR03 | Issuing Jurisdiction | N | S | N | N | N | |
| AIR04 | ID Qualifier of Person Dropping Off or Picking Up Rx | N | S | N | N | S | 4.2A: 01-08, 99 (same as PAT02). 4.2B code list differs between guides (see Disagreements) |
| AIR05 | ID of Person Dropping Off or Picking Up Rx | N | S | N | N | S | |
| AIR06 | Relationship of Person Dropping Off or Picking Up Rx | N | N | N | N | N | 01 Patient, 02 Parent/Legal Guardian, 03 Spouse, 04 Caregiver, 99 Other |
| AIR07 | Last Name of Person Dropping Off or Picking Up Rx | N | S | N | N | N | |
| AIR08 | First Name of Person Dropping Off or Picking Up Rx | N | S | N | N | N | |
| AIR09 | Last Name or Initials of Pharmacist | N | N | N | N | S | |
| AIR10 | First Name of Pharmacist | N | N | N | N | S | |
| AIR11 | Dropping Off/Picking Up Identifier Qualifier | N | S | N | N | (absent) | 01 Person Dropping Off, 02 Person Picking Up, 03 Unknown/Not Applicable |

### Element counts per version (NE PDF p.35; MD PDF p.45)

| Seg | 4.2 | 4.2A | 4.2B | 5.0 (MD only) |
|---|---|---|---|---|
| TH | 9 | 9 | 9 | 9 |
| IS | 3 | 3 | 3 | 5 |
| PHA | 12 | 13 | 13 | 15 |
| PAT | 23 | 23 | 23 | 29 |
| DSP | 21 | 25 | 25 | 36 |
| PRE | 8 | 9 | 10 | 15 |
| CDI | 5 | 5 | 5 | 6 |
| AIR | 11 | 11 | 11 | 32 |
| TP | 1 | 1 | 1 | 1 |
| TT | 2 | 2 | 2 | 2 |

### Summary: 4.2A → 4.2B differences (confirmed from guides)
1. PRE10 added (Jurisdiction or State Issuing Prescriber License Number).
2. PAT02/PAT05 add codes 09 Vendor Specific and 10 Veterinary Patient Microchip Number.
3. DSP24 adds codes 10 Acute Opioid Therapy and 11 Chronic Opioid Therapy.
4. DSP06 renamed Refill Number → Fill Number. PRE04 renamed Prescriber State License Number → Prescriber License Number (in TX/SC, not AL).
5. Wording: DSP08/CDI03 go from "Full 11-digit NDC" to "Full product identification … including leading zeros". DSP25 adds "exclude the decimal point". PHA09/PAT16 add "Do not include hyphens". PAT22 says it is used when PAT12-16 are blank.
6. No segment was added or removed. TH/IS/TP/TT are unchanged.

4.2 → 4.2A (from NE counts and TX App. B vs C): PHA13, PRE09, DSP22-DSP25 added. [ASAP] says 4.2A
changed "PHA, DSP, and PRE segments".

---

## 5. Sample files (verbatim)

### 5a. Bamboo ASAP 4.2B zero report: SC PDF p.63 (printed p.60)
```
TH*4.2B*123456*01**20220108*223000*P**\\
IS*7705555555*PHARMACY NAME*#20220107#-#20220107#\
PHA*** ZZ1234567\
PAT*******REPORT*ZERO************\
DSP*****20220108******\
PRE*\
CDI*\
AIR*\
TP*7\
TT*123456*10\
```
(Identical structure in LA PDF p.64 with `TH*4.2B*…*20250108…` and in MS PDF p.64. TX PDF p.96 has the
same with TH01 `4.2`. Note the stray space in `PHA*** ZZ1234567`, present in all Bamboo copies.)

### 5b. ASAP 4.2A full dispensation file, multiple pharmacies, compounds: NE PDF p.45-46
Printed with line wraps inside segments (wraps are artifacts of the PDF, not of the format):
```
TH*4.2A*Sample Test File*01**20211215*0800*P**~~
IS*bo95838411*BORCHERTEST*~
PHA*9999999997*9999997*ZZ9999997*zzTest Pharmacy 1*1234 Main
St**Omaha*NE*68111*4025556666*Test Pharmacist 1**PRD~
PAT*NE*06*HC651808****ZZZTESTPT*Sample****2320 TestingPatient Road**North
Platte*NE*69101*4025551212*20010203*M*01***~
DSP*00*824611*20211215*00*20211215*00*06*99999999999*180*30*01*05*00***01*20211215***Fe
ntanyl 1600 mcg Troche***Dissolve 1 or 2 troche(s) under the tongue every 4 hours**~
PRE*9999991827*ZZ9991827**NE2320*zzPrescriber*Sample**9991112320*~
CDI*1*01*00406921630*180*01~
CDI*2*03*38779056708*0.9*03~
CDI*3*03*Medisca2378-1*180*03~
PAT*NE*06*HC651808****ZZZTESTPT*Sample****2320 TestingPatient Road**North
Platte*NE*69101*4025551212*20010203*M*01***~
DSP*00*824712*20211115*00*20211115*00*06*99999999999*180*30*01*05*00***01*20211115***Fe
ntanyl 1600 mcg Troche***Dissolve 1 or 2 troche(s) under the tongue every 4 hours**~
PRE*9999991827*ZZ9991827**NE2320*zzPrescriber*Sample**9991112320*~
CDI*1*01*00406921630*180*01~
CDI*2*03*38779056708*0.9*03~
CDI*3*03*Medisca2378-1*180*03~
TP*14~
PHA*9999999998*9999998*ZZ9999998*Kevin's Pharmacy*322 E 22nd
Street**Fremont*NE*68025*4025559997*Test Pharmacist**~
PAT*NE*06*HC651808****ZZZTESTPT*Sample****2320 TestingPatient Road**North
Platte*NE*69101*4025551212*20010203*M*01***~
DSP*00*795011*20211215*32*20211215*00*06*99999999999*30*4*02*05*00***01*20211017***ABH
Gel***Apply 1ml topically every 2 hours as needed**~
PRE*9999991827*ZZ9991827**NE2320*zzPrescriber*Sample**9991112320*~
CDI*1*01*00591024105*30*01~
CDI*2*01*00904530660*15*03~
CDI*3*01*00378031410*1.8*03~
CDI*4*01*62991156705*60*02~
PAT*NE*06*HC651808****ZZZTESTPT*Sample****2320 TestingPatient Road**North
Platte*NE*69101*4025551212*20010203*M*01***~
DSP*00*7950*20211017*32*20211017*01*06*99999999999*30*4*02*05*00***01*20211017***ABH
Gel***Apply 1ml topically every 2 hours as needed**~
PRE*9999991827*ZZ9991827**NE2320*zzPrescriber*Sample**9991112320*~
CDI*1*01*00591024105*30*01~
CDI*2*01*00904530660*15*03~
CDI*3*01*00378031410*1.8*03~
CDI*4*01*62991156705*60*02~
TP*16~
TT*Sample Test File*33~
```
(This sample is internally inconsistent in places. CDI02 = `03` is not a 4.2A CDI02 code, since
TX/WA list only 01 NDC. Also, every segment ends with a separator before `~`.)

NE single-pharmacy sample (PDF p.45):
```
TH*4.2A*TestFile20191201*01**20191201*085400*T**~~
IS*9999999994*CyncHealth Test*~
PHA*9876543210*9876543*FA9999999*CyncHealth Test Pharmacy*987654321 Any Street**Any
City*NE*98765*4025599992*Test Pharmacist**~
PAT**06*N9999999*NE***Patient*Test****987654 N Test Avenue**Test
City*NE*98765*1111111111*19850315*M*01***~
DSP*00*JW11115*20190801*99*20191221*03*01*42543070001*15*5*01*05*00*1234567893*NE9999
*01*******Take 1 tablet by mouth daily**~
PRE*1234567890*AS1234567***Prescriber*Test**8001234567*~
TP*5~
TT*TestFile20191201*8~
```

### 5c. ASAP 4.2A veterinary file, multiple patients: TN PDF p.59-60 (Bamboo-authored state manual)
```
TH*4.2A*VS-20250303-093551-AB0000000*01**20250303*143607*P**~~
IS*8653798833*Dispenser Name Animal Hospital**~
PHA***BH7910652* Dispenser Name Animal Hospital*2648 US Highway 411
South**Memphis*TN*372431*8651231234* Dispenser Contact Name***~
PAT*******Smith*Lulu****2919 Test Drive RD**Mabelle*TN*37243*8651231234*20120517*U*02***Lulu*~
DSP*00*160604*20250224*0*20250224*0*01*65162010150*60*30*01*99*00***01*20250225*****60****~
PRE**BH1111111***Music*Lois**8652222222**~
PAT*******Redman*Rosie****5741 Test Ridge
Rd**Monroe*TN*37243*8653333333*20220504*F*02***Rosie*~
DSP*00*160611*20250224*0*20250224*0*01*65162010150*20*20*01*99*00***01*20250224*****20****~
PRE**BH1111111***Music*Lois**8652222222**~
PAT*******Donatello*Boston****1318 TEST Puller
Circle**Fairland*TN*37243*8654444444*20191030*M*02***Boston*~
DSP*00*160695*20250227*0*20250227*0*01*65162010150*10*10*01*99*00***01*20250227*****10****~
PRE**BH1111111***Music*Lois**8652222222**~
PAT*******Spider*Miss Muffet****2907 TEST Ferry
Rd.**Sayville*TN*37243*8655555555*20140602*F*02***Miss Muffet*~
DSP*00*160696*20250227*0*20250227*0*01*65162010150*90*90*01*99*00***01*20250228*****90****~
PRE**BH1111111***Music*Lois**8652222222**~
PAT*******Green*Clover****1808 TEST Mill Rd.**Rover*TN*37243*8656666666*20200530*F*02***Clover*~
DSP*00*160775*20250301*0*20250301*0*01*71093016205*30*8*01*99*00***01*20250301*****30****~
PRE**BH1111111***Music*Lois**8652222222**~
TP*17*~
TT*VS-20250303-093551-BH7910652*20*~
```
(The guide's TT01 does not match its TH02 (`…AB0000000` vs `…BH7910652`), which breaks the
"must match TH02" rule. Treat that as a typo in the guide.)

---

## 6. Could NOT confirm from free public sources

1. **ASAP-level usage of each element** (what ASAP itself marks mandatory/situational/not used).
   State guides mix state rules into the column. WA and AL "R = Required by ASAP" columns
   conflict with each other (DSP01/DSP02 R in WA but RR in AL; PRE05/PRE06 RR in WA but R in AL;
   CDI01-04 R in WA but S in AL). Flag every requirement code as state-specific.
2. **A sub-element/composite/repetition separator.** None is mentioned anywhere. It is probably not part of the
   format, but no public source states that explicitly.
3. **Whether the data element separator is "defined" by ASAP as byte 3.** MT, NE, MD and LC say so.
   No Bamboo guide states it, and no public ASAP text is available.
4. **The escape character `^`** is claimed as "the escape character for the ASAP standard" only by NE
   (CyncHealth) and MD. It is not in any Bamboo guide. Unverified against ASAP.
5. **Field lengths/data types** for 4.2B. Public sizes exist only for 4.2A (LC, a vendor doc) and 5.0 (MD).
   Not reproduced here as 4.2B facts.
6. **Whether AIR may repeat per DSP**, and whether PRE is strictly exactly one per DSP. Guides imply one, but none
   states a maximum.
7. **The exact TH01 literal ASAP requires** (e.g. `4.2B` vs `42B`). Samples and zero-report tables consistently use
   `4.2A` / `4.2B`, but the printed format masks ("x.xx", "xx.x") match neither.
8. **ASAP 5.0 details** beyond MD's guide. MD 5.0 shows IS04/IS05 added, TH08 reused as a zero-report
   indicator, TH06 TM7 with optional Z, and the counts above. Whether these are ASAP or Maryland
   choices is unverified. Not investigated further. An Illinois 5.0 guide exists at
   https://rxsubmit-il.logicoy.com/PDMPSystemApp/content/publicview/pdf/Data_Submitter_Guide_V_5_0 (TH01 "Must be 5.0").
9. 4.1 was not tabulated. TX App. A (PDF p.47-58) and the MI/MT guides cover it. MI says TH01 = `4.1`.

## 7. Disagreements between guides

| Topic | Disagreement | Sources |
|---|---|---|
| TH01 format mask | "Format = xx.x" in TX 4.2A (p.72), AL 4.2B (p.50), MN, NC, LA v2.5. "Format = x.xx" in TX 4.1/4.2/4.2B (p.48/60/84), SC (p.51), LA v4.0 (p.51), WA 4.2A (p.57), MS, GA. "Format = x.x" in MI. None matches the 4-char `4.2B` used in samples | as listed |
| Zero-report TH01 in a 4.2B guide | AL (a 4.2B guide) prints `TH*4.1*123456*01**20150108*223000*P**\\` (PDF p.63). TX (4.1-4.2B guide) prints `TH*4.2*…`. SC/LA/MS print `TH*4.2B*…` | AL, TX, SC |
| TH09 example | Bamboo text says TH09 "should contain two tildes (~~)", but the same guides' samples use `\\` as terminator | SC p.50 vs p.63 |
| AIR04 code list in 4.2B | TX-B lists 01, 02, 03, 05, 06, 07, 08 (no 04, no 99). SC-B lists 01-03, 05-08. AL-B lists 01-03, 05-08, 99. LA-B lists 01-08 (keeps 04). 4.2A (TX-A, WA) lists 01-08, 99 | TX p.93, SC p.60, AL p.59, LA p.61 |
| AIR11 in 4.2B | Present in TX-B and SC-B, absent from AL-B (AL ends AIR at AIR10) | TX p.94, AL p.59 |
| PRE04 name in 4.2B | "Prescriber License Number" (TX-B, SC-B) vs "Prescriber State License Number" (AL-B) | TX p.91-92, AL p.58 |
| PAT02/PAT05 code 10 | LA/SC print "10 Veterinary Patient Microchip Number". TX-B prints the entry with no code number | LA p.53, TX p.86 |
| TP01 / TT01 names in MD 5.0 | MD labels TT01 "Detail Segment Count" (copy error; the description is the control number) | MD p.60 |
| "R = Required by ASAP" | WA (4.2A) vs AL (4.2B) assign R/RR differently for DSP01, DSP02, PRE05, PRE06, CDI01-04 | WA p.62-66, AL p.53-59 |
| Patient loop | MI: DSP/PRE "can loop multiple times under the PAT … However, you may also include the PAT segment for each RX". NE samples repeat PAT per DSP even for the same patient. Both forms are evidently accepted | MI p.3, NE p.45-46 |
| Trailing separators | Bamboo samples end `TP*7\`. NE/TN samples end every segment with an extra separator (`TP*17*~`, `IS*…*~`) | SC p.63, TN p.60 |
