# Roadmap

Goal: a complete, well-tested TypeScript implementation of HL7 v2, published to npm as
[`@campfhir/hl7`](https://www.npmjs.com/package/@campfhir/hl7).

| Phase | Scope | Status |
|---|---|---|
| 1 | **HL7 v2.3 complete** — every segment and event type | ✅ every event type and segment built, every field checked against hl7.eu, Caristix and HAPI (see the validation ledger), every composite and date field typed (0.19); the root `parse()` dispatches any v2.3 message on MSH-9/MSH-12 (1.0) |
| 2 | **HL7 v2.3.1 complete** and wired into `parse()` | ✅ 1.1: every segment field and message structure checked against hl7.eu, Caristix and HAPI (segment and message ledgers), 53 segments with their own 2.3.1 class, all 276 messages generated against them |
| 3 | **HL7 v2.4 complete** and wired into `parse()` | ✅ 1.2: every segment field and message structure checked against the hl7.eu v2.4 chapters, Caristix and HAPI (segment and message ledgers), 94 segments with their own 2.4 class (28 of them new in 2.4), all 334 messages (57 new in 2.4) generated against them |
| 4 | **HL7 v2.5 complete** and wired into `parse()` | ✅ 2.1: every segment field and message structure checked against the hl7.eu v2.5 chapters, Caristix and HAPI (segment and message ledgers), 55 segments with their own 2.5 class (6 of them new in 2.5), all 387 messages (50 new in 2.5) generated against them |
| 5 | **HL7 v2.5.1 complete** and wired into `parse()` | ✅ 2.2: every segment field and message structure checked against the hl7.eu v2.5.1 chapters, Caristix and HAPI (segment and message ledgers); 2.5.1 changes three segment tables (OBR, OBX, ORC) and two structures (QRY^PC4, RRE^O26), all 387 messages generated against the 2.5.1 segments |
| 6 | **HL7 v2.6** — imported from the hl7.eu pages and checked against Caristix and HAPI | 🚧 segment ledger: 0 open issues (112 source disagreements recorded); message ledger: 387 of 410 structures match, 23 accepted with a dated reason, 0 unexplained. Not wired into `parse()`: 9 events the 2.5.1 list has are not in the hl7.eu 2.6 tables (EDR^R07, EQQ^Q04, ERP^R09, ORF^W02, ORU^W01, RQQ^Q09, SPQ^Q08, TBR^R08, VQQ^Q07), 8 messages the schema type cannot express yet, and BHS, FHS, MSH are subclasses of the 2.3 and 2.5 classes |
| 7 | **HL7 v2.7** — imported from the hl7.eu pages and checked against Caristix and HAPI | 🚧 segment ledger: 0 open issues (88 source disagreements recorded); message ledger: 306 of 326 structures match, 20 accepted with a dated reason, 0 unexplained; RQC^I06 shares the RQC_I05 structure its caption names (`[{GT1}]`), not its own table's `[GT1]`: the official v2.7 chapter 11 has the same inconsistency, decided for the structure ID in 2.6 to 2.7.1 as in 2.4 to 2.5.1. 2.7 withdraws ADT A30, A34, A35, A36, A39, A46, A48, ORM/ORR, OSQ/OSR and the UB1 segment (hl7.eu "withdrawn" notes), and 68 more 2.6 events are in none of hl7.eu, Caristix 2.7 or HAPI v27 (the original-mode queries QRY/DSR, MFQ/MFR, VXQ/VXR/VXX, …; listed in `codegen/extracted/v2.7/IMPORT.md`). Not wired into `parse()`: 29 messages the schema type cannot express yet (choices of groups: CCM/CCR/CCU/CQU/CCI, the PPR/PPP/PPG/PRR/PPV/PTR/PPT problem messages, EHC^E24, SDR/SMD, and groups of placeholder rows) |
| 8 | **HL7 v2.7.1** — imported from the hl7.eu pages and checked against Caristix (HAPI has no 2.7.1 classes) | 🚧 segment ledger: 0 open issues (80 source disagreements recorded); 20 segment tables changed in 2.7.1 (OBR, OBX, ORC, PID, RXA, …) and have their own class, the rest re-export the 2.7 class. Message ledger: 286 of 326 structures match, 40 accepted with a dated reason, 0 unexplained; every structure equals 2.7's. Not wired into `parse()`: the same 29 messages as 2.7 the schema type cannot express yet |
| 9 | **HL7 v2.8** — imported from the hl7.eu pages, chapter 16 from the official PDF, checked against Caristix and HAPI | 🚧 segment ledger: 0 open issues (163 source disagreements recorded); 6 new segments (BUI, CDO, DON, RXV, SGH, SGT), 123 tables unchanged from 2.7.1 re-export its class. Message ledger: 292 of 335 structures match, 43 accepted with a dated reason, 0 unexplained; 17 new messages (the donation messages DBC/DBU/DEL/DEO/DER/DPR/DRC/DRG, OMQ^O42, ORA^R41, ORU^R40, ORX^O43, OSU^O41, QBP/RSP Q33/Q34). hl7.eu v2.8 has no chapter 16 (its ch16 page repeats chapter 17), so chapter 16 (the EHC events, QBP/RSP^E03/E22) is read from the official PDF (`codegen/extract/pdf-chapter.ts`, checksum in `codegen/validate/sources/v2.8-hl7org.tsv`); QBP^Z75/Z77/Z79/Z91/Z93/Z95/Z97, for which hl7.eu and the PDF print no table, use the structure the official chapter 5 names for each. Withdrawn as of 2.8 (hl7.eu chapters 5 and 12): QRY^PC4/PC9/PCE/PCK, RQC/RCI^I05, RQC/RCL^I06. Not wired into `parse()`: 24 messages the schema type cannot express yet (choices with alternatives, placeholder groups and their wrappers, among them QBP^Z81/Z85 on QBP_Q11) |
| 10 | **HL7 v2.8.1** — imported from the hl7.eu pages, with chapters 4, 4A, 9, 11, 13, 14 and 16 read from the official PDFs, and checked against HAPI (Caristix answers HTTP 500 for 2.8.1) | 🚧 segment ledger: 0 open issues (382 disagreements between hl7.eu and HAPI recorded); RF1-18 is a withdrawn position: hl7.eu prints no row for it and keeps RF1-19 to RF1-25, while HAPI renumbers RF1 to 24 fields (`ledger-v281-notes.json`). Message ledger: 275 of 335 structures match, 60 accepted with a dated reason, 0 unexplained; each of the 60 is the same structure as v2.8's with the source reading the same, so v2.8's resolution applies (each note says which). The official chapters name groups hl7.eu leaves unnamed (DPR^O48/DRC^O47 DONATION_ORDER, CQU^I19 ROLE_PATHWAY) and decide. RDE^O11/O25 keep v2.8's `{TIMING_ENCODED}` inside the RXV group by hand decision (HAPI v281 agrees; the official chapter 4A and hl7.eu print the same unpaired brackets); QBP^Z75–Z97 use the structure hl7.eu's query profiles name. Not wired into `parse()`: 22 messages the schema type cannot express yet |
| 11 | **HL7 v2.8.2 to v2.9.1**, one PR per version in release order (2.8.2, 2.9), then v2.9.1, the latest, from the official PDFs | ⬜ next, see [Plan to v2.9.1](#plan-to-v291) |

2.0 made the package ESM only (Node 24 or later). Each version joins the root parser in its own minor release once every one of its event types and
segments is built and checked: `parse()` reads MSH-12 and refuses a version it does not dispatch
yet (the caller can still name the version to parse as, and every version's individual
`parse<MSG>()` functions are available from day one). Wiring a version is one entry in the
`REGISTRIES` table of `src/parse.ts`; its `MESSAGES` registry is generated by `pnpm barrels`.

## Plan to v2.9.1

The latest HL7 v2 release is **v2.9.1**: the hl7.org product brief for it (product 649) lists it as
normative, status 2024-09-05, and the V2 Management Group's publication request for it is dated
December 2023. (Read through search results only: the hl7.org brief page itself did not load when
this plan was written, so the date is unverified until someone reads the page.) Between 2.5.1 and
2.9.1 the releases are 2.6, 2.7, 2.7.1, 2.8, 2.8.1 and 2.8.2, and the chapters of 2.8.2 are on
hl7.eu (`https://hl7.eu/HL7v2x/v282/std282/ch01.html`).

Steps, each one checked against the sources in the repository's `CLAUDE.md` before the next starts:

1. **Sources.** Pulled by `codegen/validate/fetch-sources.sh <version> <dir> --record`, whose manifests
   are in `codegen/validate/sources/` (each version's manifest lands with that version's PR). Status when pulled (the manifest has every URL and checksum):
   - hl7.eu segment pages: all of 2.5.1 to 2.9.1. Chapter pages: 2.5.1 to 2.8.2 and 2.9 (2.9.1 has none
     at any path tried: 16 absent).
   - Caristix: 2.5.1, 2.6, 2.7, 2.7.1 and 2.8 answer. 2.8.1, 2.8.2, 2.9 and 2.9.1 answer HTTP 500 for
     every request, retries included. Without Caristix the message ledger cannot compare structures
     for those four versions, so they are blocked on a source, not on code.
   - HAPI: classes for 2.5.1, 2.6, 2.7, 2.8 and 2.8.1. Master has no classes for 2.7.1 (the module
     exists, empty) and no module at all for 2.8.2, 2.9 or 2.9.1.
   The rule in `docs/validation/README.md` applies per version. Where HAPI is absent, hl7.eu still
   decides segments, but nothing cross-checks it while Caristix is down; for 2.8.2 to 2.9.1 neither
   cross-check exists right now.
2. **Version order (decided).** One version at a time, in release order: 2.6, 2.7, 2.7.1, 2.8, 2.8.1, 2.8.2,
   2.9, 2.9.1 (extracted from the official PDFs), each in its own PR. Each version re-exports the latest
   earlier version imported, and gets its own ledgers and minor release, as 2.3 to 2.5.1 did.
3. **Extraction from the official PDFs.** The hl7.org PDFs are not public, so an agent with the PDFs follows
   the extraction brief and writes `out/<version>/` (segments, message structures, index). Before it is
   handed over, `codegen/extract/check-completeness.ts <pdf-dir> out/<version>` must run clean: it compares the
   PDFs' message-table captions, attribute-table headings and "withdrawn" notes with the extraction. The
   extraction goes to `codegen/extracted/<version>/`.
4. **Import and independent check.** `codegen/extract/import-extraction.ts <version>` writes the segment spec,
   the message schemas and `IMPORT.md` (every decision); `verify-import.ts` checks the schemas against the
   extraction. Then `fetch-sources.sh <version>` pulls hl7.eu, Caristix and HAPI, and the segment and message
   ledgers compare the import with them, wherever those sources exist (2.6, 2.7, 2.8: all three or two of
   three; 2.8.1 on: Caristix returns HTTP 500, so fewer). Differences are fixed in the extraction or
   recorded in the notes files with a date.
5. **Build, test, wire.** Generate with `pnpm codegen && pnpm barrels && pnpm exports`, add the
   version's round-trip and position tests, and add its entry to `REGISTRIES` in `src/parse.ts`.
6. **Document and release.** Update the README version table, the roadmaps (this file and the two
   checklists) and the root roadmap in the same PR, then bump the minor version with the release
   workflow.

Detailed checklists:

- [Segments roadmap](docs/ROADMAP-SEGMENTS.md)
- [Event / message types roadmap](docs/ROADMAP-EVENTS.md)

## Release pipeline

CI, version bumps, staged npm publishing and release tags are shared by every package in the
repository and described in [CONTRIBUTING.md](../../CONTRIBUTING.md). In short: run **Bump
version** with `hl7` as the package on a release branch, merge to `main`, and approve the staged
version on npm.
