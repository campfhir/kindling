# HL7 2.1 extraction from hl7.eu

Built by `codegen/extract/from-hl7eu.ts v2.1` from the hl7.eu pages that `codegen/validate/fetch-sources.sh` pulled
(the manifest is `codegen/validate/sources/v2.1.tsv`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

- Segments: 38, fields: 434.
- Message tables: 39 (plus 30 per-event ACK tables, the general acknowledgment, not extracted), structures: 39, events in the index: 43, event tables that differ from their primary: 0.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): none.
- Withdrawn segments: none.
- Tables with no rows (cross-references, or events whose page prints no structure): QRY^P04, DSR^P04, QRY^R02, ORF^R02.

## Problems found while parsing
- none

## Readings applied by the parser
- ACK: the general acknowledgment is the fullest of the 30 prints after the events (26 prints like A01's, 4 prints like Q03's); the others leave out its optional items

## Tables printed twice
- none

## Placeholder rows
- none
