# HL7 2.6 extraction from hl7.eu

Built by `codegen/extract/from-hl7eu.ts v2.6` from the hl7.eu pages that `codegen/validate/fetch-sources.sh` pulled
(the manifest is `codegen/validate/sources/v2.6.tsv`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

- Segments: 171, fields: 2466.
- Message tables: 330 (plus 124 per-event ACK tables, the general acknowledgment, not extracted), structures: 215, events in the index: 423, event tables that differ from their primary: 47.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): none.
- Withdrawn segments: none.
- Tables with no rows (cross-references, or events whose page prints no structure): QBP^Q25.

## Problems found while parsing
- BRP^O30^BRP_O30: group RESPONSE is not closed (opened with "[")
- RTB^Znn^RTB_K13: group ROW_DEFINITION: brackets "[" / "["

## Readings applied by the parser
- RSP^Z88^RSP_Z88: "] --- VISIT begin" closes the open group VISIT; read as its end
- MF: a group of MFE and a placeholder row is read as MFE alone
- MF_SITE_DEFINED: a group of MFE and a placeholder row is read as MFE alone
- MF_QUERY: a group of MFE and a placeholder row is read as MFE alone
- PGL^PC6-PC8^PGL_PC6: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PPR^PC1-PC3^PPR_PC1: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PPP^PCB-PCD^PPP_PCB: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PPG^PCG,PCH,PCJ^PPG_PCG: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PRR^PC5^PRR_PC5: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PPV^PCA^PPV_PCA: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PTR^PCF^PTR_PCF: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- PPT^PCL^PPT_PCL: the choice "OBR | etc." is read as <OBR|RQD|RQ1|RXO|ODS|ODT>
- ANTI-MICROBIAL DEVICE DATA: a choice of one group ("<" ... ">" with no "|") is read as that group
- ANTI-MICROBIAL DEVICE CYCLE DATA: a choice of one group ("<" ... ">" with no "|") is read as that group

## Tables printed twice
- RDR^RDR: printed in ch04.htm and ch05.htm; kept ch04.htm; the prints DIFFER
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm and ch08.htm; kept ch05.htm; the prints are identical
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm and ch08.htm; kept ch05.htm; the prints DIFFER
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm and ch08.htm; kept ch05.htm; the prints DIFFER
- QBP^Znn: printed in ch05.htm and ch05.htm and ch05.htm and ch05.htm and ch08.htm; kept ch05.htm; the prints DIFFER
- RDY^Znn: printed in ch05.htm and ch05.htm; kept ch05.htm; the prints are identical
- RSP^Znn: printed in ch05.htm and ch08.htm; kept ch05.htm; the prints DIFFER
- ORU^R01: printed in ch05.htm and ch07.htm; kept ch07.htm; the prints DIFFER
- MFR^M04: printed in ch08.htm (M01-M17) and ch08.htm; kept ch08.htm; the prints DIFFER
- MFR^M05: printed in ch08.htm (M01-M17) and ch08.htm; kept ch08.htm; the prints DIFFER
- MFR^M06: printed in ch08.htm (M01-M17) and ch08.htm; kept ch08.htm; the prints DIFFER
- MFR^M07: printed in ch08.htm (M01-M17) and ch08.htm; kept ch08.htm; the prints DIFFER

## Placeholder rows
- RSP_K11: [ ... ]
- QBP_Q11: [ ... ]
- RSP_K11: ...
- QBP_Q13: [ ... ]
- QBP_Q15: [ ... ]
- QVR_Q17: [ ... ]
- SUR_P09: ED
- MFN_M03: ...
