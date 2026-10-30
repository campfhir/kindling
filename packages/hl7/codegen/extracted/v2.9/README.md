# HL7 2.9 extraction from hl7.eu

Built by `codegen/extract/from-hl7eu.ts v2.9` from the hl7.eu pages that `codegen/validate/fetch-sources.sh` pulled
(the manifest is `codegen/validate/sources/v2.9.tsv`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

Chapters read from the official PDF instead of the hl7.eu page (`codegen/extract/pdf-chapter.ts`; name and SHA-256 in `codegen/validate/sources/v2.9-hl7org.tsv`): ch02.htm (hl7.org V29_CH02_Control_tc.pdf), ch03.htm (hl7.org V29_CH03_PatientAdmin_tc.pdf), ch04.htm (hl7.org v29_CH04_Orders_tc.pdf), ch04a.htm (hl7.org V29_CH04A_Orders.pdf), ch05.htm (hl7.org V29_CH05_Queries_tc.pdf), ch06.htm (hl7.org V29_CH06_FinancialMngmt_tc.pdf), ch07.htm (hl7.org V29_CH07_Observations_tc.pdf), ch08.htm (hl7.org V29_CH08_MasterFiles_tc.pdf), ch09.htm (hl7.org V29_CH09_MedRecords.pdf), ch10.htm (hl7.org V29_CH10_Scheduling_tc.pdf), ch11.htm (hl7.org V29_CH11_PatientReferral_tc.pdf), ch12.htm (hl7.org V29_CH12_PatientCare.pdf), ch13.htm (hl7.org V29_CH13_ClinicalLabAuto_tc.pdf), ch14.htm (hl7.org V29_CH14_AppMngmt_tc.pdf), ch15.htm (hl7.org V29_CH15_PersMngmt_tc.pdf), ch16.htm (hl7.org V29_CH16_eClaims_tc.pdf), ch17.htm (hl7.org V29_CH17_MaterialsMngmt_tc.pdf).

- Segments: 192, fields: 2885.
- Message tables: 307 (plus 115 per-event ACK tables, the general acknowledgment, not extracted), structures: 214, events in the index: 412, event tables that differ from their primary: 20.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): 3.3.30 ADT/ACK - Merge Person Information (Event A30) (ch03.htm); 3.3.34 ADT/ACK - Merge Patient Information - Patient ID Only (Event A34) (ch03.htm); 3.3.35 ADT/ACK - Merge Patient Information - Account Number Only (Event (ch03.htm); 3.3.36 ADT/ACK - Merge Patient Information - Patient ID & Account Number (ch03.htm); 3.3.39 ADT/ACK - Merge Person - Patient ID (Event A39) (ch03.htm); 3.3.46 ADT/ACK - Change Patient ID (Event A46) (ch03.htm); 3.3.48 ADT/ACK - Change Alternate Patient ID (Event A48) (ch03.htm); 4.4.1 ORM â general order message (ch04.htm); 4.4.2 ORR â general order response message response to any ORM (ch04.htm); 4.4.3 OSQ/OSR- query response for order (ch04.htm); 4A.3.5 RDE/RRE - pharmacy/treatment encoded order message (O01/O02) (ch04a.htm); 4A.3.10 RGV/RRG - pharmacy/treatment give message (O01/O02) (ch04a.htm); 4A.3.18 ROR - Pharmacy/Treatment Order Response (ch04a.htm); 4A.3.19 RAR - Pharmacy/Treatment Administration Information (ch04a.htm); 4A.3.20 RDR - Pharmacy/Treatment Dispense Information (ch04a.htm); 4A.3.21 RER - Pharmacy/Treatment Encoded Order (ch04a.htm); 4A.3.22 RGR - Pharmacy/Treatment Dose Information (ch04a.htm); 4A.7.4 VXX - RESPONSE TO VACCINATION QUERY RETURNING MULTIPLE (ch04a.htm); 4A.7.5 VXR - Vaccination Record Response (Event V03) (ch04a.htm); 4A.9.1 VXQ - query for vaccination record (ch04a.htm); 4A.9.2 VXX - response to vaccination query with multiple PID matches (ch04a.htm); 4A.9.3 VXR - vaccination record response (ch04a.htm); 7.3.2 OUL â Unsolicited Laboratory Observation Message (Event R21) (ch07.htm); 7.3.3 QRY/ORF - Query for Results of Observation (Events R02, R04) (ch07.htm).
- Withdrawn segments: 6.5.10 UB1 - Uniform Billing 1 Segment (ch06.htm).
- Tables with no rows (cross-references): QBP^Q25.

## Problems found while parsing
- ADT^A05^ADT_A05: PRT: brackets "[{ PRT }}"
- ADT^A05^ADT_A05: IAM: brackets "[{ IAM }}"
- ADT^A06^ADT_A06: OH3: brackets "[ OH3 }"
- ADT^A07^ADT_A06: OH2: brackets "[{ OH2 }}"
- ADT^A07^ADT_A06: OH3: brackets "[ OH3 }"
- ADT^A07^ADT_A06: PRT: brackets "[{ PRT }}"
- ADT^A08^ADT_A01: OH2: brackets "[{ OH2 }}"
- ADT^A08^ADT_A01: OH3: brackets "[ OH3 }"
- ADT^A08^ADT_A01: PRT: brackets "[{ PRT }}"
- ADT^A11^ADT_A09: PRT: brackets "[{ PRT }}"
- ADT^A15^ADT_A15: PRT: brackets "[{ PRT }}"
- ADT^A17^ADT_A17: PRT: brackets "[{ PRT }}"
- ADT^A32^ADT_A21: PRT: brackets "[{ PRT }}"
- OML^O21^OML_O21: NTE: brackets "[{NTE]]"
- ORL^O53^ORL_O53: ARV: brackets "[{ARV]]"
- OML^O35^OML_O35: REL: brackets "[REL}"
- OML^O39^OML_O39: REL: brackets "[REL}"
- OMI^O23^OMI_O23: REL: brackets "[REL}"
- OML^O59^OML_O59: NTE: brackets "[{NTE]]"
- ORU^R30^ORU_R30: OBX: brackets "[{OBX]]"

## Readings applied by the parser
- DRG^O43^DRG_O43: "}] --- DONOR_OBSERVATIONS begin" closes the open group DONOR_OBSERVATIONS; read as its end
- RSP^Z88^RSP_Z88: "] --- VISIT begin" closes the open group VISIT; read as its end
- MF_SITE_DEFINED: a group of MFE and a placeholder row is read as MFE alone
- INVOICE_INFORMATION_SUBMIT: a choice of one group ("<" ... ">" with no "|") is read as that group
- INVOICE_INFORMATION_CANCEL: a choice of one group ("<" ... ">" with no "|") is read as that group
- QUERY_INFORMATION: a choice of one group ("<" ... ">" with no "|") is read as that group
- QUERY_ACK_IPR: a choice of one group ("<" ... ">" with no "|") is read as that group
- REASSESSMENT_REQUEST_INFO: a choice of one group ("<" ... ">" with no "|") is read as that group
- PAYMENT_REMITTANCE_HEADER_INFO: a choice of one group ("<" ... ">" with no "|") is read as that group
- AUTHORIZATION_REQUEST: a choice of one group ("<" ... ">" with no "|") is read as that group
- QUERY: a choice of one group ("<" ... ">" with no "|") is read as that group
- QUERY_ACK: a choice of one group ("<" ... ">" with no "|") is read as that group
- AUTHORIZATION_RESPONSE_INFO: a choice of one group ("<" ... ">" with no "|") is read as that group
- ANTI-MICROBIAL_DEVICE_DATA: a choice of one group ("<" ... ">" with no "|") is read as that group
- ANTI-MICROBIAL_DEVICE_CYCLE_DATA: a choice of one group ("<" ... ">" with no "|") is read as that group

## Tables printed twice
- QBP^Znn: printed in ch05.htm and ch05.htm; kept ch05.htm; the prints DIFFER
- RTB^Znn: printed in ch05.htm and ch05.htm; kept ch05.htm; the prints DIFFER
- RDY^Znn: printed in ch05.htm and ch05.htm; kept ch05.htm; the prints are identical

## Placeholder rows
- QBP_Q11: [...]
- RTB_Knn: ...
- RSP_Znn: [...]
- QBP_Q11: [...]
- RSP_K11: ...
- QBP_Q15: [...]
- QVR_Q17: [...]
- QBP_Q11: [...]
- QBP_Q11: [...]
