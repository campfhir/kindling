# Project notes for Claude

## Validating HL7 facts

When confirming anything about the HL7 v2 standard (which version introduced a segment or
event, field tables, data types, message structures), use **only** these sources:

- https://www.hl7.org (official HL7 International)
- https://www.hl7.eu (e.g. `https://www.hl7.eu/HL7v2x/v23/hl7v23segmROL.htm`)
- https://hl7-definition.caristix.com/v2
- https://hapifhir.github.io/hapi-hl7v2/v23/apidocs (HAPI HL7 v2.3 generated structures, javadoc
  e.g. `.../ca/uhn/hl7v2/model/v23/segment/IN2.html`). Use it as a cross-check for field types and
  repeatability: a getter returning `X[]` or a `getXReps()` method means the field repeats. HAPI is
  generated code, so it confirms a fact only alongside a spec source, not on its own.
- https://github.com/hapifhir/hapi-hl7v2 (HAPI source). The field definitions in
  `hapi-structures-v23/.../model/v23/segment/*.java` are a machine-readable v2.3 field table. Use it
  as a fact source for `packages/hl7/codegen/validate/hapi-v23.mjs`. HAPI is dual licensed (MPL 1.1 / GPL) and this
  project is MIT, so do not copy HAPI code into this repository or generate code from it without a
  license decision.

Segment field tables are tracked per version in `packages/hl7/docs/validation/<version>-segment-ledger.md`
(every field, every source, dated, with the contradictions) and message structures in
`<version>-message-ledger.md`. Check them before looking a field or a structure up again. When the
sources disagree, hl7.eu decides unless Caristix and HAPI agree with each other against it; record
the disagreement and any hand decision with the date in
`packages/hl7/codegen/validate/ledger-v23-notes.json` (v2.3 segments), `ledger-v231-notes.json`
(v2.3.1 segments), `ledger-v24-notes.json` (v2.4 segments), `ledger-v25-notes.json` (v2.5 segments),
`ledger-v251-notes.json` (v2.5.1 segments), `ledger-v<version without dots>-notes.json` for a later version
(`ledger-v28-notes.json`: v2.8 segments) or `message-notes.json` (structures, by version and
event). `packages/hl7/docs/validation/README.md` says how to refresh a ledger and how a
new version's segments and messages are seeded from the sources.

Do not rely on other sites (vendor guides, blogs, whitepapers, package docs) or on memory alone.
If those sources cannot confirm a fact, say so and flag it as unverified instead of
guessing. Cite the page used in the PR or commit when a spec decision is made.

## Validating X12 and PDMP (ASAP) facts

The X12 implementation guides (TR3s) and the ASAP standard are sold, not published, so facts about
them come from free public sources that reprint or apply them:

- X12: x12.org public pages and requests for interpretation, CMS and Medicare contractor (MAC)
  companion guides and edit spreadsheets, and state Medicaid companion guides.
- ASAP (`@campfhir/pdmp`): state PDMP data-submission dispenser guides published by state boards of
  pharmacy or health departments, and asapnet.org's public pages.

Do not rely on vendor marketing pages, blogs or memory alone; a vendor guide may only cross-check.
Companion guides add payer and state rules on top of the standard: record a fact as the standard's
only when several independent guides agree, and treat requirement codes from a single guide as that
guide's rule. Facts are tracked with their sources, dates and disagreements in
`packages/x12/docs/validation/` and `packages/pdmp/docs/validation/`; check them before looking a
fact up again, and flag what no public source confirms as unverified instead of guessing.

X12's published examples (https://x12.org/examples) are X12's intellectual property and "cannot be
reproduced or recreated without the express consent of ASC X12" (https://x12.org/examples/disclaimers).
Test against them through `packages/x12/scripts/fetch-examples.mjs` (`pnpm fixtures:fetch`, into the
uncommitted `fixtures/external/`), cite them by link, and describe rather than quote them in a
ledger; never commit them or fixtures copied from their names and identifiers. X12 Glass needs a
paid license and is not a free public source.

## Repository layout

This is a pnpm workspace. Every npm package lives in `packages/<name>` and publishes as
`@campfhir/<name>`; `packages/hl7` is `@campfhir/hl7`. Lint and TypeScript settings are shared
from the root (`eslint.config.mjs`, `tsconfig.base.json`). The release workflows discover packages
by scanning `packages/*/package.json`. See `CONTRIBUTING.md` for adding a package and releasing.

## Workflow

- From the root, `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` run in every package;
  all must pass. CI also runs `pnpm codegen:check` and `pnpm smoke`. `pnpm verify` runs everything.
- To run one package's scripts use `pnpm --filter @campfhir/hl7 <script>` or `cd packages/hl7`.
- `@campfhir/hl7`: after adding/moving segments, parsers or builders run
  `pnpm codegen && pnpm barrels && pnpm exports` inside `packages/hl7`. Versions are described in
  `packages/hl7/codegen/schemas/`; see `packages/hl7/codegen/README.md`.
