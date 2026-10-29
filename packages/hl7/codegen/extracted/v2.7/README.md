# HL7 2.7 extraction from hl7.eu

Built by `codegen/extract/from-hl7eu.ts v2.7` from the hl7.eu pages that `codegen/validate/fetch-sources.sh` pulled
(the manifest is `codegen/validate/sources/v2.7.tsv`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

- Segments: 175, fields: 2519.
- Message tables: 292 (plus 115 per-event ACK tables, the general acknowledgment, not extracted), structures: 192, events in the index: 378, event tables that differ from their primary: 20.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): 3.3.30 ADT/ACK - Merge Person Information (Event A30) (ch03.htm); 3.3.34 ADT/ACK - Merge Patient Information - Patient ID Only (Event A34) (ch03.htm); 3.3.35 ADT/ACK - Merge Patient Information - Account Number Only (Event A35) (ch03.htm); 3.3.36 ADT/ACK - Merge Patient Information - Patient ID & Account Number (Event A36) (ch03.htm); 3.3.39 ADT/ACK - Merge Person - Patient ID (Event A39) (ch03.htm); 3.3.46 ADT/ACK - Change Patient ID (Event A46) (ch03.htm); 3.3.48 ADT/ACK - Change Alternate Patient ID (Event A48) (ch03.htm); 4.4.1 ORM - general order message (ch04.htm); 4.4.2 ORR - general order response message response to any ORM (ch04.htm); 4.4.3 OSQ/OSR- query response for order (ch04.htm).
- Withdrawn segments: 6.5.10 UB1 - Uniform Billing 1 Segment (ch06.htm).
- Tables with no rows (cross-references): QBP^Q25.

## Problems found while parsing
- OML^O39^OML_O39: group SPECIMEN_IN_PACKAGE: brackets "[{" / "}"
- OML^O39^OML_O39: group SPECIMEN_SHIPMENT: brackets "[{" / "}"
- BRP^O30^BRP_O30: group RESPONSE is not closed (opened with "[")

## Readings applied by the parser
- QBP^Q21^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q22^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q23^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q24^QBP_Q21: rows printed without a table element after the caption, read as the table
- QBP^Q32^QBP_Q21: rows printed without a table element after the caption, read as the table
- OML^O39^OML_O39: "}] --- SPECIMEN OBSERVATION begin" closes the open group SPECIMEN OBSERVATION; read as its end
- QBP^Z73^QBP_Z73: rows printed without a table element after the caption, read as the table
- RSP^Z88^RSP_Z88: "] --- VISIT begin" closes the open group VISIT; read as its end
- QBP^Z99^QBP_Q13: rows printed without a table element after the caption, read as the table
- QBP^Znn^QBP_Q13: rows printed without a table element after the caption, read as the table
- QBP^Znn^QBP_Q11: rows printed without a table element after the caption, read as the table
- QBP^Znn^QBP_Q15: rows printed without a table element after the caption, read as the table
- QBP^Z81^QBP_Q11: rows printed without a table element after the caption, read as the table
- QBP^Z85^QBP_Q11: rows printed without a table element after the caption, read as the table
- QBP^Z87^QBP_Q11: rows printed without a table element after the caption, read as the table
- QBP^Z89^QBP_Q11: rows printed without a table element after the caption, read as the table
- QBP^Z93^QBP_Q13: rows printed without a table element after the caption, read as the table
- QBP^Z95^QBP_Q13: rows printed without a table element after the caption, read as the table
- QBP^Z79^QBP_Q15: rows printed without a table element after the caption, read as the table
- QBP^Z75^QBP_Q13: rows printed without a table element after the caption, read as the table
- MF_SITE_DEFINED: a group of MFE and a placeholder row is read as MFE alone
- PGL^PC6-PC8^PGL_PC6: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- QBP^Q25^QBP_Q21: rows printed without a table element after the caption, read as the table

## Tables printed twice
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm; kept ch05.htm; the prints are identical
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm; kept ch05.htm; the prints DIFFER
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm; kept ch05.htm; the prints DIFFER
- RTB^Znn: printed in ch05.htm and ch05.htm; kept ch05.htm; the prints DIFFER
- RDY^Znn: printed in ch05.htm and ch05.htm; kept ch05.htm; the prints are identical
- ORU^R01: printed in ch05.htm and ch07.htm; kept ch07.htm; the prints DIFFER

## Placeholder rows
- RTB_Knn: ...
- RSP_K11: [ ... ]
- QBP_Q11: [ ... ]
- RSP_K11: ...
- QBP_Q13: [ ... ]
- QBP_Q15: [ ... ]
- QVR_Q17: [ ... ]
