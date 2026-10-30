# X12 005010 interchange envelope: facts checked against free public sources

Researched 2026-10-30. Every URL below was downloaded and its text checked (PDFs converted with `pdftotext`).
Sources are limited to x12.org, CMS, Medicare MAC and state Medicaid publications. No vendor or blog pages are used.

## Source key

| Key | Source | URL | Notes |
|---|---|---|---|
| **XW** | CMS, *270/271 4010A1 → 5010/5010A1 Combined Changes* crosswalk (footer dated 03/21/2011) | https://www.cms.gov/files/document/eligibility4010a1to5010a1pdf | Best single source. It gives element ID, name, type, Min-Max and Req. for the whole envelope, side by side for 4010A1 and 5010. |
| **R1112** | CMS transmittal R1112OTN3, *837 Institutional Edits* spreadsheet, version EA20131V01 (PDF created 2012-08-10) | https://www.cms.gov/Regulations-and-Guidance/Guidance/Transmittals/Downloads/R1112OTN3.pdf | Edit-level rules, e.g. "IEA02 must = ISA13". |
| **PROF09** | CMS, *837 Professional Edits 5010 2009_0901 Published* ("Proposed 5010 Edits") | https://www.cms.gov/files/document/professionaledits501020090901publishedpdf | Older and proposed. Has some errors (see Disagreements). |
| **HETS** | CMS *HETS 270/271 5010 Companion Guide*, version 15-1, May 2026 | https://www.cms.gov/files/document/current-hets-270-271-companion-guide.pdf | Linked as "Current HETS 270/271 Companion Guide" from the CMS HETS page. |
| **CGS** | CGS Medicare (a MAC), *835 Companion Guide* | https://www.cgsmedicare.com/pdf/edi/835_compguide.pdf | |
| **OH** | Ohio Dept. of Medicaid, *837 Professional Companion Guide* v15.0 (cover: 20240405) | https://dam.assets.ohio.gov/image/upload/medicaid.ohio.gov/Providers/MITS/HIPAA%205010%20Implementation/CompanionGuide/TradingPartners/ODM_Companion_Guide__837_Professional_Health_Care_Claim_20240209_v15.0.pdf | |
| **WI** | Wisconsin ForwardHealth, *Companion Guide for 5010 TA1* v1.1, June 30, 2011 (P-00269) | https://www.dhs.wisconsin.gov/publications/p0/p00269.pdf | |
| **IN** | Indiana Health Coverage Programs, *5010 TA1 and 999 Acknowledgments* v1.8 (Sept. 23, 2026) | https://secure.in.gov/medicaid/providers/files/ta1-999-ihcp-5010-companion-guide.pdf | A "Preview Draft" of the same version also exists at `.../ta1-999-ihcp-5010-companion-guide-draft.pdf`. |
| **COBA** | CMS, *COBA Companion Guide, 837 I/P COB 5010* | https://www.cms.gov/files/document/coordination-benefits-agreement-coba-companion-guide-health-insurance-portability-and-accountability.pdf | |
| **NE** | Nebraska DHHS Medicaid, *837P Companion Guide* | https://dhhs.ne.gov/Documents/837P%20Companion%20Guide.pdf | |
| **WA** | Washington HCA (ProviderOne), *835 Companion Guide* 2015 | https://www.hca.wa.gov/assets/835-CG-2015.pdf | |
| **RFI1877** | X12 RFI #1877, "834 DMG05-3 Repeat" | https://x12.org/resources/requests-for-interpretation/rfi-1877-834-dmg05-3-repeat | Official X12 interpretation that quotes 005010 TR3 sections B.1.1.2.5 and C.1. |
| **RFI1138** | X12 RFI #1138, "Value of ISA11" | https://x12.org/index.php/resources/requests-for-interpretation/rfi-1138-value-isa11 | |
| **RFI2205** | X12 RFI #2205, "Clarification on ISA02 and ISA04" | https://x12.org/resources/requests-for-interpretation/rfi-2205-clarification-isa02-and-isa | |
| **RFI2207** | X12 RFI #2207, "Segment Delimiters" | https://x12.org/resources/requests-for-interpretation/rfi-2207-segment-delimiters | |
| **X12RDE** | X12, *Repeating Data Elements* (PDF) | https://x12.org/sites/default/files/documents/repeating-data-elements.pdf | |

Type codes as the sources print them: ID = identifier (code), AN = string, DT = date, TM = time, N0 = numeric with 0 implied decimals.
"Min-Max" uses the sources' `min-max` notation. All Req. values below are `R` (Required) in the cited CMS tables.

---

## 1. ISA: Interchange Control Header (5010)

Every row comes from the **XW** 5010 column (270 5010, page 1). The same type and Min-Max values appear in **R1112** (rows `X223.C3..ISA01.010` through `ISA16.010`) and in **PROF09**.

| Elem | Name (as printed in XW 5010 column) | Type | Min-Max | Req | Values shown in source | Sources |
|---|---|---|---|---|---|---|
| ISA01 | Authorization Information Qualifier | ID | 2-2 | R | 00, 03 | XW; R1112 `ISA01 ID 2-2 R 00, 03` |
| ISA02 | Authorization Information | AN | 10-10 | R | (R1112: "ISA02 must be 10 characters.") | XW; R1112; RFI2205 |
| ISA03 | Security Information Qualifier | ID | 2-2 | R | 00, 01 | XW; R1112 |
| ISA04 | Security Information | AN | 10-10 | R | | XW; R1112; RFI2205 |
| ISA05 | Interchange ID Qualifier | ID | 2-2 | R | 01, 14, 20, 27, 28, 29, 30, 33, ZZ | XW; R1112 |
| ISA06 | Interchange Sender ID | AN | 15-15 | R | (R1112: "ISA06 must be 15 characters.") | XW; R1112 |
| ISA07 | Interchange ID Qualifier | ID | 2-2 | R | 01, 14, 20, 27, 28, 29, 30, 33, ZZ | XW; R1112 |
| ISA08 | Interchange Receiver ID | AN | 15-15 | R | | XW; R1112 |
| ISA09 | Interchange Date | DT | 6-6 | R | YYMMDD | XW; R1112 |
| ISA10 | Interchange Time | TM | 4-4 | R | HHMM | XW; R1112 |
| ISA11 | Repetition Separator | *(blank)* | 1-1 | R | XW note: "New Element" | XW; R1112 `ISA11 Repetiiton Seperator 1-1 R` |
| ISA12 | Interchange Control Version Number | ID | 5-5 | R | 00501 | XW; R1112: `ISA12 must be "00501".` |
| ISA13 | Interchange Control Number | N0 | 9-9 | R | R1112: must be numeric, 9 characters, > 0, unsigned | XW; R1112; HETS (HTS00201 "ISA13 is not nine characters in length", HTS00204 "ISA13 must be numeric") |
| ISA14 | Acknowledgement Requested | ID | 1-1 | R | 0, 1 | XW; R1112 |
| ISA15 | Interchange Usage Indicator (R1112/PROF09: "Usage Indicator") | ID | 1-1 | R | P, T | XW; R1112 |
| ISA16 | Component Element Separator | *(blank)* | 1-1 | R | R1112: "ISA16 must be 1 character" | XW; R1112 |

**Fixed length.** WI says: *"The ISA is a fixed-length record with fixed-length elements."* RFI2205 says: *"ISA elements 02 and 04 are fixed in length with identical minimum and maximum lengths. Spaces are inserted to meet the minimum length in an AN data element."* Every ISA element in XW has min = max.

**Total ISA length = 106 characters, including the segment terminator.** This total is **derived**, not quoted (see Section 7). It is the 3-character "ISA" tag, plus 16 element separators, plus the sum of the fixed element lengths (2+10+2+10+2+15+2+15+6+4+1+5+9+1+1+1 = 86), plus 1 segment terminator: 3 + 16 + 86 + 1 = 106.

**4010A1 comparison (XW 4010A1 column).** `ISA11 | Interchange Control Standards ID | ID | 1-1 | R | U` and `ISA12 | Interchange Control Version Number | ID | 5-5 | R | 00401`. PROF09 also lists ISA11 with 4010A1 value `U`. RFI1138 (for version 5030) says: *"the value of ISA11 is the repetition separator. The value of U is not a valid value for the data element."*

---

## 2. Delimiter detection and character offsets

| Delimiter | Where it is | 1-based byte | 0-based index | Confirmation |
|---|---|---|---|---|
| Data element separator | Character right after the `ISA` tag | 4 | 3 | **Derived** from the fixed layout. No allowed public source states "byte 4" in so many words. |
| Repetition separator | ISA11 (5010). In 4010A1 this position held ISA11 *Interchange Control Standards ID* = `U` | **83** | 82 | **Confirmed, X12 RFI1877**: *"Delimiters are specified in the interchange header segment, ISA. ... the repetition separator is byte number 83 ..."* and *"Section C.1 identifies ISA segment byte number 83 as field ISA11: "Repetition Separator"."* The RFI is quoting 005010X220 TR3 §B.1.1.2.5. |
| Component element separator | ISA16 | 105 | 104 | **Derived**. ISA16 = Component Element Separator, 1-1 (XW, R1112). |
| Segment terminator | Character right after ISA16 | 106 | 105 | **Derived**. |

**Offset check.** The bytes before ISA11 are "ISA" (3), plus 11 separators, plus ISA01–ISA10 (2+10+2+10+2+15+2+15+6+4 = 68), which is 82. So ISA11 falls at byte 83. This matches the byte X12 publishes and supports the other derived offsets.

> Full layout (1-based): sep@4, ISA01 5–6, sep@7, ISA02 8–17, sep@18, ISA03 19–20, sep@21, ISA04 22–31, sep@32, ISA05 33–34, sep@35, ISA06 36–50, sep@51, ISA07 52–53, sep@54, ISA08 55–69, sep@70, ISA09 71–76, sep@77, ISA10 78–81, sep@82, **ISA11 83**, sep@84, ISA12 85–89, sep@90, ISA13 91–99, sep@100, ISA14 101, sep@102, ISA15 103, sep@104, **ISA16 105**, **terminator 106**.

**Supporting statements from the sources:**
- RFI2207 (question text, quoted in the RFI): *"A receiving system should be capable of reading the ISA segment to determine all delimiters being used in the file, including the segment terminator."* The RFI answer adds that CR/LF *"are recognized as valid for use in EDI interchanges at the discretion of the sender, as noted in X12.5 section 4.3 and section A.3.1."*
- X12RDE: *"Each repeat is separated by the value specified in ISA11, data element I65, the repetition separator."* This gives the data element number of ISA11 as I65.
- WI (ISA11 row): *"The repetition separator is a delimiter separating repeated occurrences of a data element or composite data; it is not a data element."*
- R1112 edits: ISA11 and ISA16 *"must be 1 character"* and *"must contain at least one non-space character"*. ISA16 errors map to `TA105 = 027: "Invalid Component Element Separator"`.
- Delimiters payers prefer (not required by the standard):
  - HETS Table 8: `*` Data Element Separator, `|` Component Element Separator, `~` Segment Terminator, `^` Repetition Separator.
  - CGS Table 5: `*`, `^` repetition, `>` component, `~` terminator.
  - WA: `*`, `:`, `~`, `^`.

---

## 3. GS: Functional Group Header (5010)

Rows come from the **XW** 5010 column. R1112 rows `X223.C7..GS01.010` through `GS08.010` match on type and Min-Max.

| Elem | Name | Type | Min-Max | Req | Values / notes | Sources |
|---|---|---|---|---|---|---|
| GS01 | Functional Identifier Code | ID | 2-2 | R | XW (270/271): HB, HS. R1112 (837): HC | XW; R1112; PROF09 |
| GS02 | Application Sender's Code | AN | 2-15 | R | R1112: "GS02 must be 2 - 15 characters." | XW; R1112 |
| GS03 | Application Receiver's Code | AN | 2-15 | R | | XW; R1112 |
| GS04 | Date | DT | 8-8 | R | CCYYMMDD | XW; R1112 |
| GS05 | Time | TM | 4-8 | R | HHMM (XW) | XW; R1112 |
| GS06 | Group Control Number | N0 | 1-9 | R | PROF09: must be numeric, > 0, <= 999,999,999, "unique within the interchange" | XW; R1112; PROF09 |
| GS07 | Responsible Agency Code | ID | 1-2 | R | X | XW; R1112 (`GS07 must be "X"` in PROF09) |
| GS08 | Version/Release/Industry Identifier Code | AN | 1-12 | R | see next table | XW; R1112 |

### GS08 values for 005010 healthcare guides

| GS08 value | Transaction | What the source shows | Source |
|---|---|---|---|
| 005010X279A1 | 270/271 eligibility | XW GS08 row: `005010X279A1  Updated in 5010A1`. HETS sample: `GS*HS*SUBMITTERID*CMS*20260731*073411*5014*X*005010X279A1~` and `GS*HB*CMS*SUBMITTERID*...*X*005010X279A1~` | XW; HETS Appendix A |
| 005010X222A1 | 837 Professional | IN 999 example `AK1*HC*8215*005010X222A1~`. Per IN, AK103 is GS08 of the acknowledged group. COBA: `ST03 – 005010X222 [for pre-Errata]; 005010X222A1 [for Errata version]`. NE cover: "ASC X12N 837 (005010X222A1)". PROF09 (2009, pre-errata): `GS08 must be "005010X222".` | IN; COBA; NE; PROF09 |
| 005010X221A1 | 835 remittance | CGS: `C.8 GS08 Version Identifier Code 005010X221A1` | CGS |
| 005010X223A2 | 837 Institutional | R1112: `X223A2.41..GS08.010 GS08 Version Identifier Code AN 1-12 R 005010X223A2` | R1112 |
| 005010X231A1 | 999 acknowledgment | HETS cites the "ASC X12 999 version 005010X231A1 TR3" and "999 and TA1 guidelines outlined in the ASC X12 version 005010X231A1 TR3". This is a reference to the TR3, not a GS08 value. The IN 999 example uses `ST*999*54321*005010X231~` (no A1), and IN says ST03 "contains the same value as the data element GS08". | HETS; IN (see Disagreements) |

---

## 4. ST, SE, GE, IEA

Rows come from **XW** (5010 column, pages 1, 19 and 20). They are cross-checked against **R1112** and **PROF09**.

### ST: Transaction Set Header
| Elem | Name | Type | Min-Max | Req | Notes | Sources |
|---|---|---|---|---|---|---|
| ST01 | Transaction Set Identifier Code | ID | 3-3 | R | 270, 837, ... | XW; R1112 |
| ST02 | Transaction Set Control Number | AN | 4-9 | R | PROF09: "ST02 must be a unique number within the ISA-IEA envelope." OH: "Identical to the value in SE02" | XW; R1112; PROF09; OH |
| ST03 | Implementation Convention Reference | AN | 1-35 | R | XW: "New Element in 5010". IN: "contains the same value as the data element GS08" | XW; R1112; IN |

### SE: Transaction Set Trailer
| Elem | Name | Type | Min-Max | Req | Meaning | Sources |
|---|---|---|---|---|---|---|
| SE01 | Number of Included Segments (PROF09: "Transaction Segment Count") | N0 | 1-10 | R | OH: *"Total number of segments included in a transaction set including ST and SE segments"*. R1112/PROF09: "SE01 must equal the transaction segment count", error `IK502: 4 "Number of Included Segments Does Not Match Actual Count"` | XW; OH; R1112; PROF09 |
| SE02 | Transaction Set Control Number | AN | 4-9 | R | R1112/PROF09: "SE02 must = ST02" | XW; R1112; OH |

### GE: Functional Group Trailer
| Elem | Name | Type | Min-Max | Req | Meaning | Sources |
|---|---|---|---|---|---|---|
| GE01 | Number of Transaction Sets Included | N0 | 1-6 | R | R1112: "GE01 must = the number of transaction sets included" | XW; R1112; OH ("Number of included transaction sets.") |
| GE02 | Group Control Number | N0 | 1-9 | R | XW "Must=GS06". R1112: "GE02 must = GS06." | XW; R1112; OH |

### IEA: Interchange Control Trailer
| Elem | Name | Type | Min-Max | Req | Meaning | Sources |
|---|---|---|---|---|---|---|
| IEA01 | Number of Included Functional Groups | N0 | 1-5 | R | R1112/PROF09: "IEA01 must equal the number of functional groups included in the interchange." Error `TA105: 021` | XW; R1112; OH |
| IEA02 | Interchange Control Number | N0 | 9-9 | R | R1112: "IEA02 must = ISA13". HETS: HTS00208 "IEA02 is not nine characters in length" | XW; R1112; HETS |

---

## 5. Control number matching rules

| Rule | Exact wording | Sources |
|---|---|---|
| ISA13 = IEA02 | R1112 / PROF09: `IEA02 must = ISA13` (error `TA105: 001 "The Interchange Control Number in the Header and Trailer Do Not Match"`). OH: ISA13 "Must be identical to the associated interchange control trailer IEA02". HETS: `HTS00203 ISA13 and IEA02 do not match.` IN: "The ISA13 and IEA02 must be identical." | R1112; PROF09; OH; HETS; IN |
| GS06 = GE02 | R1112: `GE02 must = GS06.` (error `AK905: 4 "Group Control Number in the Functional Group Header and Trailer Do Not Agree"`). XW: "Must=GS06". OH: GS06 "Must be identical to the value in GE02." | R1112; XW; OH |
| ST02 = SE02 | R1112 / PROF09: `SE02 must = ST02.` (error `IK502: 3 "Transaction Set Control Number in Header and Trailer Do Not Match"`). OH: ST02 "Identical to the value in SE02", SE02 "Identical to the value in ST02." | R1112; PROF09; OH |
| Counts | SE01 = segments including ST and SE (OH). GE01 = transaction sets in the group (R1112). IEA01 = functional groups in the interchange (R1112). | OH; R1112 |

---

## 6. TA1: Interchange Acknowledgment

Names and usage come from **IN** Table 2.1 and **WI** §3.1. Both say the X12 base is 005010X231A1 (WI title `X12_TA1_5010X231A1_V1`).

| Elem | Name | Req (IN) | Meaning (quoted) | Type / Min-Max | Sources |
|---|---|---|---|---|---|
| TA101 | Interchange Control Number | R | IN: "This is the interchange control number of the original interchange to which this TA1 is reporting." WI: "This is the value in ISA13 from the interchange to which this TA1 is responding." | **not confirmed** | IN; WI |
| TA102 | Interchange Date | R | IN: "...date of the original interchange ... (YYMMDD)". WI: "date from ISA09" | **not confirmed** | IN; WI |
| TA103 | Interchange Time | R | IN: "...time of the original interchange ... (HHMM)". WI: "time from the ISA10" | **not confirmed** | IN; WI |
| TA104 | Interchange Acknowledgment Code | R | Both guides use only `R` (rejected). IN: "The only value used is 'R', indicating that ISA, IEA, GS/GE interchange had critical errors and the exchange was not accepted." | **not confirmed** | IN; WI |
| TA105 | Interchange Note Code | R | WI lists codes 001–031, e.g. 001 "The Interchange Control Number in the Header and Trailer Do Not Match. The Value from the Header is used in the Acknowledgment.", 020 "Invalid Test Indicator Value", 025 "Duplicate Interchange Control Number", 026 "Invalid Data Element Separator", 027 "Invalid Component Element Separator" | **not confirmed** | WI; IN |

Example TA1 (IN): `TA1*000000001*060114*1321*R*020~`. It responds to ISA13 `000000001`, ISA09 `060114`, ISA10 `1321`, and is rejected for an invalid Usage Indicator (ISA15).

---

## 7. Could NOT confirm from an allowed public source

1. **Total ISA length of 106.** No allowed page states "106" outright. The figure is derived from the fixed Min-Max of all 16 elements (XW/R1112). The derivation agrees with X12's published "byte number 83" for ISA11 (RFI1877).
2. **Element separator at byte 4, ISA16 at byte 105, segment terminator at byte 106.** Derived as above. Only byte 83 (ISA11) is stated verbatim by X12.
3. **Data type of ISA11 and ISA16.** XW, R1112 and PROF09 all leave the type column **blank** for these two elements (min-max 1-1 only). No allowed source assigns a type.
4. **TA101–TA105 data types and min/max.** No downloadable public guide gave these. Leads I could not use:
   - The CMS-contractor CSSC TA1 documents (csscoperations.com) returned HTTP 403.
   - Minnesota's TA1 guide (https://www.health.mn.gov/facilities/ehealth/auc/guides/docs/cgta1.pdf) only incorporates Appendix C.1 of 005010X231 by reference.
   - The authoritative table is in the 005010X231A1 TR3 Appendix C.1, which is not free.
5. **005010X231A1 as a literal GS08 value.** HETS confirms X231A1 only as the TR3 for 999/TA1. No sample GS08 or ST03 with `005010X231A1` was found. IN's example uses `005010X231`.
6. **The 5010 element name "Interchange Control Standards Identifier".** XW prints the 4010A1 ISA11 name as "Interchange Control Standards ID", abbreviated.
7. **Inaccessible sources:**
   - The X12 public-review ISA page (https://reviewer.x12.org/x334PublicReview-2/ContentPage/10100002-a1.htm) failed DNS in this sandbox, so `reviewer.x12.org` would need to be allowed. It was also a non-005010 public-review draft.
   - Alabama Medicaid's 5010 companion guide (medicaid.alabama.gov) failed TLS chain verification and was not used.
   - Washington Publishing Company (wpc-edi.com) publishes the TR3s for sale only. I found no free WPC page with the envelope tables.

## 8. Disagreements and errors between sources

| Topic | Source A | Source B | Assessment |
|---|---|---|---|
| IEA01 max length | XW and R1112: `N0 1-5` | PROF09 (2009 proposed): `N0 1-6` | 1-5 is backed by two later CMS documents. PROF09 probably copied GE01's 1-6. |
| GE02 type/length | XW and R1112: `N0 1-9` | PROF09: `AN 4-9` | PROF09 looks like a copy of SE02's row. Use N0 1-9, which also matches GS06 N0 1-9. |
| IEA02 type/length | XW and R1112: `N0 9-9` | PROF09: `AN 4-9` | Same copy error in PROF09. Use N0 9-9 (= ISA13). |
| SE01 name | XW: "Number of Included Segments". OH: same | PROF09: "Transaction Segment Count" | Naming only. |
| ISA15 name | XW 5010: "Interchange Usage Indicator" | XW 4010A1, R1112, PROF09: "Usage Indicator" | Naming only. |
| GS08 for 835 | CGS code column: `005010X221A1` | CGS notes column: "Medicare will send 05010X221A1" | Typo in the notes column (missing leading 0). |
| 999 version string | HETS: 999/TA1 TR3 is `005010X231A1` | IN example: `ST*999*54321*005010X231~` | IN's example omits the A1 errata suffix. Not resolved from public sources. |
| WI TA1 example | WI is a 5010 TA1 guide | Its example ISA reads `...*1321*U*00401*000000001*0*P*:~`, which is a 4010 envelope (ISA11 `U`, ISA12 `00401`) | Error in the WI example. IN's equivalent example uses `^*00501`. |
| WA delimiter label | WA: "Sub-element Separator, Vertical Bar, ( : )" | The character shown is a colon | The label and the character disagree in the WA guide. |
| R1112 spelling | R1112: "Repetiiton Seperator" | XW: "Repetition Separator" | Typo in R1112. |
| Sample ISA lines in PDFs | HETS, IN and WI print sample ISA segments | After text extraction they are 68–74 characters long, not 106 | The padding spaces collapse when the PDFs are converted. Do not use PDF samples to check ISA length. WA's sample keeps the padding (e.g. `ISA*00*          *00*          *ZZ*77045          *ZZ*...`). |
| ISA05/ISA07 values | XW: 01, 14, 20, 27, 28, 29, 30, 33, ZZ | R1112/PROF09: Medicare accepts only "27", "28" or "ZZ". CGS: "27, 28, ZZ" / sends 29 | Payer restriction, not a disagreement about the standard. |
