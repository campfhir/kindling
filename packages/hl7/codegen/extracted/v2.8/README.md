# HL7 2.8 extraction from hl7.eu

Built by `codegen/extract/from-hl7eu.ts v2.8` from the hl7.eu pages that `codegen/validate/fetch-sources.sh` pulled
(the manifest is `codegen/validate/sources/v2.8.tsv`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

Chapters read from the official PDF instead of the hl7.eu page (`codegen/extract/pdf-chapter.ts`; name and SHA-256 in `codegen/validate/sources/v2.8-hl7org.tsv`): ch16.htm (hl7.org V28_CH16_eClaims.pdf).

- Segments: 181, fields: 2654.
- Message tables: 287 (plus 116 per-event ACK tables, the general acknowledgment, not extracted), structures: 203, events in the index: 378, event tables that differ from their primary: 4.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): 3.3.30 ADT/ACK - Merge Person Information (Event A30) (ch03.htm); 3.3.34 ADT/ACK - Merge Patient Information - Patient ID Only (Event A34) (ch03.htm); 3.3.35 ADT/ACK - Merge Patient Information - Account Number Only (Event A35) (ch03.htm); 3.3.36 ADT/ACK - Merge Patient Information - Patient ID & Account Number (Event A36) (ch03.htm); 3.3.39 ADT/ACK - Merge Person - Patient ID (Event A39) (ch03.htm); 3.3.46 ADT/ACK - Change Patient ID (Event A46) (ch03.htm); 3.3.48 ADT/ACK - Change Alternate Patient ID (Event A48) (ch03.htm); 4.4.1 ORM - general order message (ch04.htm); 4.4.2 ORR - general order response message response to any ORM (ch04.htm); 4.4.3 OSQ/OSR- query response for order (ch04.htm); 7.3.2 OUL - Unsolicited Laboratory Observation Message (Event R21) (ch07.htm); 7.3.3 QRY/ORF - Query for Results of Observation (Events R02, R04) (ch07.htm).
- Withdrawn segments: 6.5.10 UB1 - Uniform Billing 1 Segment (ch06.htm).
- Tables with no rows (cross-references): QBP^Q25.

## Problems found while parsing
- OMQ^O42^OMQ_O42: OMQ^O42^OMQ_O42: "}" closes no group
- BRP^O30^BRP_O30: group RESPONSE is not closed (opened with "[")
- RDE^O11^RDE_O11: group TIMING_ENCODED: brackets "{" / "}]"
- RDE^O11^RDE_O11: group (unnamed): brackets "[{" / "}"
- RDE^O11^RDE_O11: group ORDER is not closed (opened with "{")
- RDE^O25^RDE_O11: group TIMING_ENCODED: brackets "{" / "}]"
- RDE^O25^RDE_O11: group (unnamed): brackets "[{" / "}"
- RDE^O25^RDE_O11: group ORDER is not closed (opened with "{")

## Readings applied by the parser
- QBP^Q21^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q22^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q23^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q24^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q32^QBP_Q21: rows printed without a table element after the caption, read as the table
- DBC^O41^DBC_O41: the table holds only its header row; the rows of the next table are read as its rows
- QBP^Z73^QBP_Z73: rows printed without a table element after the caption, read as the table
- QBP^Q33^QBP_O33: rows printed without a table element after the caption, read as the table
- QBP^Q34^QBP_O34: rows printed without a table element after the caption, read as the table
- RSP^Z88^RSP_Z88: "] --- VISIT begin" closes the open group VISIT; read as its end
- QBP^Z99^QBP_Q13: rows printed without a table element after the caption, read as the table
- RTB^Znn^RTB_K13: rows printed without a table element after the caption, read as the table
- QBP^Znn^QBP_Q11: rows printed without a table element after the caption, read as the table
- RDY^Znn^RDY_K15: rows printed without a table element after the caption, read as the table
- RSP^Z82^RSP_Z82: rows printed without a table element after the caption, read as the table
- RSP^Z86^RSP_Z86: rows printed without a table element after the caption, read as the table
- QBP^Z87^QBP_Q11: rows printed without a table element after the caption, read as the table
- QBP^Z89^QBP_Q11: rows printed without a table element after the caption, read as the table
- RTB^Z94^RTB_K13: rows printed without a table element after the caption, read as the table
- RTB^Z96^RTB_K13: rows printed without a table element after the caption, read as the table
- RDY^Z80^RDY_Z80: rows printed without a table element after the caption, read as the table
- MF_SITE_DEFINED: a group of MFE and a placeholder row is read as MFE alone
- PGL^PC6-PC8^PGL_PC6: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- QBP^Q25^QBP_Q21: rows printed without a table element after the caption, read as the table
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
- DBC_O42: Segment
- RSP_O33: Segment
- RSP_O34: Segment
- DRG_O43: Segment
- DER_O44: Segment
- DEO_O45: Segment
- DEL_O46: Segment
- DRC_O47: Segment
- DPR_O48: Segment
- QBP_O33: Segment
- QBP_O34: Segment
- QBP_Q11: [ ... ]
- RTB_Knn: ...
- RSP_Znn: [ ... ]
- QBP_Q11: [ ... ]
- RSP_K11: ...
- QBP_Q15: [ ... ]
- QVR_Q17: [ ... ]
- QBP_Q11: [ ... ]
- QBP_Q11: [ ... ]
