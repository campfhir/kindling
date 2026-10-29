# Brief v2: extract HL7 v2 message and segment tables from the official PDFs

This replaces the first brief. It keeps the same goal and adds the exact file shapes, one rule about
withdrawn sections, and a check script you must run before you finish.

You read the official HL7 Version 2 chapter PDFs (hl7.org) of ONE version and write structured JSON.
You do not write code, you do not change any repository, and you use no other source: no hl7.eu, no
Caristix, no HAPI, no vendor guides, no memory of the standard. Those are used afterwards as an
independent check, so using them here would make the check meaningless.

## Where this goes

The project is `@campfhir/hl7`, a TypeScript library. For each HL7 version it needs every message structure
(segments, choices and groups, with how often each may occur) and every segment's field table. An importer
turns your files into code, so the shapes below must be followed exactly. Copy values as printed; if you cannot
read one with confidence write `null` and say so in `README.md`. Never guess and never correct the standard.

## Output

One folder per version, named like the version: `out/v2.6/`, `out/v2.7.1/`, `out/v2.9/`. Inside:

```
out/<version>/
  README.md        PDFs read (file, pages, cover version/date), counts, every problem, the checker's output
  segments.json    every segment's field table
  messages/
    index.json     every event of the version, including withdrawn ones
    <STRUCTURE>.json   one file per message structure (ADT_A01.json, ACK.json, ...)
```

Pack the folder as one zip when you finish.

Step 0: confirm each PDF is the version asked for (cover page, footer, date) and record it in `README.md`. If it
is not, stop and report.

Tools: `pdftotext -layout -f <first> -l <last> file.pdf out.txt` (poppler) keeps table columns aligned. Use
`pdfinfo` for page counts. Look at a page as an image whenever columns or brackets are hard to read. If poppler
is not available, any layout-preserving text extraction will do for reading, but the check script below needs
poppler's `pdftotext`, so install it (or ask for it) before the final step.

## segments.json

Keys are segment identifiers. One entry per `HL7 Attribute Table - XXX` in the version, in every chapter,
including the batch and file segments (BHS, BTS, FHS, FTS), the control segments and the header (MSH).

```json
{
  "OBR": {
    "title": "Observation Request",
    "source": "V291_CH04_Orders_2024SEP.pdf pp. 71-72",
    "fields": [
      { "seq": 1, "name": "Set ID - OBR", "length": "1..4", "type": "SI", "opt": "O", "rep": "-", "table": "", "inherited": false, "clen": "", "item": "00237" },
      { "seq": 10, "name": "Collector Identifier *", "length": "250", "type": "XCN", "opt": "O", "rep": "∞", "table": "", "inherited": false, "clen": "", "item": "00244" }
    ]
  }
}
```

- `seq`: integer, as printed. A printed `1-n` or `3-n` is recorded as 1 or 3, and the printed text goes in `seqPrinted`.
- `name`: the element name as printed, spaces collapsed, markers like `*`, `+`, `#` kept.
- `length`: the LEN column as printed (some versions print `min..max`, some a number); `""` if blank.
  `clen`: the C.LEN (conformance length) column as printed, `""` if the version has none.
- `type`: data type code as printed (`""` for a withdrawn field that prints none).
- `opt`: the usage as printed: `R`, `O`, `C`, `B`, `X`, `W`, `-`, `C(R/X)`, `C(RE/X)`, ... Copy it; do not reinterpret.
- `rep`: `"∞"` when the repeat column says `Y` (any case) or an unbounded count; `"-"` when blank or `N`. A fixed
  count (`Y/10`, `2`) is recorded as that number as a string, and the printed text goes in `repPrinted`.
- `table`: table number(s) as printed, as one string (`"0136"`, `"0061/0203/0363"`); `""` if none.
- `item`: the ITEM# column as printed, `""` if the version has none.
- `inherited`: always `false`.
- `source`: PDF file name and page range of the table. If an identical table is printed in two chapters, name both.

## messages/index.json

A list with one entry per event. Every event the version defines, including the ones whose section only says
it is withdrawn.

```json
[
  { "structure": "ADT_A01", "messageType": "ADT", "triggerEvent": "A01", "description": "ADT Message",
    "pdf": "V291_CH03_PatientAdmin_2024SEP.pdf", "page": 6,
    "sectionHeading": "3.3.1 ADT/ACK - Admit/Visit Notification (Event A01)" },
  { "structure": "ADT_A01", "messageType": "ADT", "triggerEvent": "A04", "description": "Register a Patient",
    "pdf": "...", "page": 14, "sectionHeading": "3.3.4 ADT/ACK - Register a Patient (Event A04)", "sameAs": "A01" },
  { "structure": "CRM_C01", "messageType": "CRM", "triggerEvent": "C01", "description": "...", "pdf": "...", "page": 116,
    "sectionHeading": "7.7.1 CRM - Clinical Study Registration Message (Events C01 -C08)", "eventPrinted": "C01-C08" },
  { "structure": null, "messageType": "ADT", "triggerEvent": "A18", "description": "Merge Patient Information",
    "pdf": "...", "page": 48, "status": "withdrawn", "sectionHeading": "3.3.18 ADT/ACK - Merge Patient Information (Event A18)" }
]
```

- `structure`: the message structure name printed in the table header (`ADT^A04^ADT_A01` -> `ADT_A01`); `null` for a
  withdrawn event with no table. `messageType` is the first token of the header (`ADT`). A section heading that names
  two types (`QRY/ADR`) gets one entry per type, never a type containing a slash.
- A range or list printed in one header (`S01-S11`, `PC6-PC8`, `PCG,PCH,PCJ`) is one entry per event with
  `eventPrinted` holding the header text as printed.
- `sameAs`: the primary event when this event's table is identical to it (the primary is the event whose code
  matches the structure name, otherwise the first table in chapter order).
- `sectionHeading`: the section heading exactly as printed, section number included. It is how entries are matched
  to the PDF, so it must start with the section number (`3.3.18 `).
- **Withdrawn sections: record every one.** A message section whose heading is followed by a note like
  "Attention: Retained for backwards compatibility only as of v2.4 and withdrawn as of v2.7" is a withdrawn event
  even though it has no table. Write an entry with `"status": "withdrawn"`. This applies to sections in every
  chapter. A note inside a *field* description is not a withdrawn message and needs no entry.
- Printed grammar templates (`QBP^Znn^QBP_Qnn`) are kept as the PDF prints them; add a `note` saying so. Z events
  printed as examples get a `note` saying they are examples.
- `definedBy`: when a table body only says "see 3.3.58", write the entry with `"definedBy": "see 3.3.58"` and no
  structure file of its own.

## messages/<STRUCTURE>.json

One file per structure, named after it. If several events share a structure, one file carries all of them.

```json
{
  "structure": "ADT_A01",
  "messageType": "ADT",
  "triggerEvent": "A01",
  "version": "2.9.1",
  "description": "Admit/Visit Notification",
  "title": "ADT Message",
  "sectionHeading": "3.3.1 ADT/ACK - Admit/Visit Notification (Event A01)",
  "source": { "pdf": "V291_CH03_PatientAdmin_2024SEP.pdf", "pages": "6-8", "table": "ADT^A01^ADT_A01: ADT Message" },
  "triggerEvents": [
    { "events": ["A01"], "eventPrinted": "A01", "pdf": "...", "page": 6, "table": "ADT^A01^ADT_A01: ADT Message", "identicalToPrimary": true },
    { "events": ["A04"], "eventPrinted": "A04", "pdf": "...", "page": 14, "table": "ADT^A04^ADT_A01: ADT Message", "identicalToPrimary": true },
    { "events": ["A08"], "eventPrinted": "A08", "pdf": "...", "page": 26, "table": "ADT^A08^ADT_A01: ADT Message", "identicalToPrimary": false }
  ],
  "items": [ ],
  "variants": [
    { "eventPrinted": "A08", "pdf": "...", "pages": "26-28", "table": "ADT^A08^ADT_A01: ADT Message", "items": [ ], "problems": [ ] }
  ]
}
```

- `triggerEvent` is the primary event. `triggerEvents` lists every event that uses the structure, each with its
  own printed table and whether its items equal the primary's (compare them item by item: segment, group,
  order, cardinality; ignore descriptions).
- `variants` carries the full `items` of every event whose table is NOT identical, with `eventPrinted` equal to that
  event's code. `problems` lists anything odd you found in that table (mismatched brackets, with page and row).
- `ACK^xxx^ACK` tables printed after each event are the general ACK. Compare each with the chapter 2 ACK; if all
  are identical do not write them as files, and say so in the README. If one differs, give it a structure file.
- If the PDF prints no table for an event (only a heading and a note), it is not a structure file; it is an index
  entry (withdrawn or `definedBy`).

Items, in the order the table prints them, groups nested as the table nests them:

```json
{ "kind": "segment", "name": "MSH", "usage": null, "minOccurs": 1, "maxOccurs": 1, "page": 6, "description": "Message Header", "chapterRef": "2" }
{ "kind": "group", "name": "NEXT_OF_KIN", "minOccurs": 0, "maxOccurs": "*", "page": 6, "items": [ ] }
{ "kind": "choice", "oneOf": ["OBR", "RQD"], "minOccurs": 1, "maxOccurs": 1, "page": 60 }
{ "kind": "choice", "name": "CLINICAL_HISTORY_OBJECT", "minOccurs": 1, "maxOccurs": 1, "alternatives": [ ] }
{ "kind": "placeholder", "text": "[...]", "minOccurs": 1, "maxOccurs": 1, "page": 39, "description": "Optional query by example segments", "notation": "[...]" }
```

- The notation is `[ X ]` optional, `{ X }` repeating (one or more), `[{ X }]` optional and repeating,
  `< A | B >` a choice of segments. If the PDF has Usage and Cardinality columns (v2.5 and some later
  versions), copy `usage` and take min/max from the Cardinality column. If it prints only the abstract syntax,
  `usage` is `null` and min/max come from the brackets and braces: `[X]` 0..1, `{X}` 1..*, `[{X}]` 0..*, bare 1..1.
- A choice whose alternatives are all single segments uses `oneOf`. If any alternative is a group or several
  segments, use `alternatives` (each alternative a segment or group item) and keep the choice's name.
- Group `name`: from the `--- NAME begin` / `--- NAME end` markers (or the printed group label). Copy it as printed,
  including odd spacing or case; the importer normalises names. `null` only when none is printed.
- If a row's brackets do not pair (`[{ PRT }}`, `[{NTE]]`), set `minOccurs` and `maxOccurs` to `null`, add
  `"bracketMismatch": true` and `"notation": "<the row's brackets as printed>"`, and list it in `problems`.
- `description`, `status` (the printed Status column, for example `B`) and `chapterRef` are copied from the table.
  `footnote` carries a footnote digit printed against a row.

## Check before you finish

`check-completeness.ts` (supplied with this brief) compares your folder with the PDFs without trusting your files:

```
npx tsx check-completeness.ts <folder-with-the-version's-chapter-PDFs> out/<version>
```

It reports (1) a message table caption in a PDF with no index entry, and an index event with no caption;
(2) an attribute-table heading with no entry in `segments.json`; (3) a withdrawn section with no `withdrawn` index
entry. Fix everything it reports, run it again, and paste the final output into `README.md`. A clean run is
required before you hand the folder over. Also run it with the chapters you did not read; it skips chapters you
do not have.

## README.md must contain

1. PDF file names, page counts, version and date printed on each cover.
2. Counts: events in the index (and how many withdrawn), structure files, segments, fields.
3. Every problem: `null` values, bracket mismatches (file, page, row), fixed repeat counts, usage values other than
   R/O/C/B/X, withdrawn sections found, tables that differ from their primary, anything you could not read.
4. The check script's final output.
5. One line saying whether the extraction is complete, and what is missing if not.
