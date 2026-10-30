# Adding a version from an extraction

An HL7 version enters the codebase from an *extraction*: the segment field tables and the message
structures of the version as JSON (`codegen/extracted/<version>/`, the format is in [BRIEF.md](BRIEF.md)).
There are two ways to make one, and everything after it is the same.

| Source of the extraction | Tool | Used for |
|---|---|---|
| The official hl7.org chapter PDFs, read by an agent that has them | [BRIEF.md](BRIEF.md), checked with `check-completeness.ts` | 2.9.1 (its own PR) |
| The hl7.eu pages `fetch-sources.sh` pulled | `from-hl7eu.ts` (deterministic parser) | 2.6 onward |
| An official chapter PDF where hl7.eu lacks the chapter, converted to an hl7.eu-shaped page | `pdf-chapter.ts`, then `from-hl7eu.ts` | 2.8 chapter 16 |

## The steps, in order

Run from `packages/hl7`; `<dir>` is any folder for the pulled sources, `vX` the version.
After step 1, `codegen/extract/add-version.sh vX <dir>` runs steps 2 (from hl7.eu) to 7 (the two
ledgers); pass `--keep-extraction` when the extraction came from the PDFs. The steps are:

```sh
# 1. Pull hl7.eu, Caristix and HAPI (curl, git, jq; nothing chosen by hand). --record keeps the manifest.
codegen/validate/fetch-sources.sh vX <dir> --record

# 2. The extraction, either from hl7.eu (an official chapter PDF first converted into <dir>/hl7org/chapters replaces
#    hl7.eu's page of that chapter, as the authoritative text or where hl7.eu lacks it; --record keeps its checksum) ...
npx tsx codegen/extract/pdf-chapter.ts vX <V281_CH04_Name.pdf> <dir> --record  # each official chapter PDF on hand
npx tsx codegen/extract/from-hl7eu.ts vX <dir> codegen/extracted/vX
#    ... or from the PDFs (BRIEF.md), then check it against them:
npx tsx codegen/extract/check-completeness.ts <pdf-dir> codegen/extracted/vX

# 3. Import: the segment spec, the message schemas, version.ts and IMPORT.md (every decision).
#    Hand-checked facts the importer needs go in codegen/extracted/vX/overrides.json (see import-extraction.ts).
npx tsx codegen/extract/import-extraction.ts vX
mkdir -p src/vX
# 4. Register the version in codegen/generate.ts (after its base), then make the classes and messages.
npx tsx codegen/generate-segments.ts --version vX     # a class for every spec segment
pnpm codegen && pnpm barrels && pnpm exports          # messages, and re-exports of everything else

# 5. MSH, BHS and FHS are not generated from the spec; adopt them as subclasses of the base class.
node codegen/validate/ledger.mjs vX <dir> --adopt MSH,BHS,FHS

# 6. Write the decided values (rule: hl7.eu, unless Caristix and HAPI agree against it) into the spec,
#    then rebuild the classes from it. Deleting them first is what makes the generator rewrite them
#    (src/vX also holds the messages: delete the segment classes only, as add-version.sh does).
node codegen/validate/ledger.mjs vX <dir> --fix-spec
npx tsx codegen/generate-segments.ts --version vX
pnpm codegen && pnpm barrels && pnpm exports

# 7. Check. verify-import compares the schemas with the extraction; the ledgers compare the version with the three sources.
npx tsx codegen/extract/verify-import.ts vX
node codegen/validate/ledger.mjs vX <dir>
npx tsx codegen/validate/message-ledger.ts vX --caristix <dir>/caristix/events --hapi <dir>/hapi/message <dir>/hapi/group <dir>/hapi/eventmap.properties --hl7eu <dir>/hl7eu/chapters
pnpm typecheck && pnpm lint && pnpm test && pnpm codegen:check   # codegen:check needs the new files committed
```

A difference the message ledger reports is either fixed (in the extraction, or by a `structureFixes` entry in
`overrides.json` when the rule says Caristix and HAPI win; a `sharePrimary` entry when an event's caption names
another event's structure but prints a different table, and the structure ID is followed) or accepted with a dated note in
`codegen/validate/message-notes.json`. Never accept a difference without saying which source agrees with the
structure and why the others differ.

## What the importer cannot express yet

A message is not generated, and is listed in `withdrawnMessages` of `version.ts` with its reason, when its table
has a choice whose alternatives are groups, or a group that holds only placeholder rows. Everything the importer
decides is written to `IMPORT.md`.
