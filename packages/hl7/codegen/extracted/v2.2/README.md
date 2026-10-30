# HL7 2.2 extraction from hl7.eu

Built by `codegen/extract/from-hl7eu.ts v2.2` from the hl7.eu pages that `codegen/validate/fetch-sources.sh` pulled
(the manifest is `codegen/validate/sources/v2.2.tsv`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

- Segments: 62, fields: 767.
- Message tables: 73 (plus 52 per-event ACK tables, the general acknowledgment, not extracted), structures: 73, events in the index: 73, event tables that differ from their primary: 0.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): none.
- Withdrawn segments: none.
- Tables with no rows (cross-references, or events whose page prints no structure): none.

## Problems found while parsing
- none

## Readings applied by the parser
- MF: a group of MFE and a placeholder is read as MFE alone
- MF_STAFF: a group of MFE and a placeholder is read as MFE alone
- MF_TEST: a group of MFE and a placeholder is read as MFE alone
- ACK: the general acknowledgment is the fullest of the 52 prints after the events (47 prints like A01's, 5 prints like N01's); the others leave out its optional items

## Tables printed twice
- none

## Placeholder rows
- none
