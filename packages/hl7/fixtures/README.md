# Fixture messages

Two sets of HL7 v2 messages that `src/fixtures.test.ts` runs through the root `parse()`: every
message must parse and encode back to the same wire text, except where `expectations.json`
records why it cannot. The test fails when a message deviates without a record, and when a record
no longer matches (a fix that makes a message parse must remove its record), so the manifest is
always the current list of what the parser does not take and why.

## `generated/` (committed)

`v<version>.min.hl7` and `v<version>.full.hl7` for every version this package parses (2.3,
2.3.1, 2.4, 2.5, 2.5.1), one message per message structure, written by `generate.py` from the
structure definitions of [hl7apy](https://github.com/crs4/hl7apy) (MIT), the library that
[iris-HL7v2Gen](https://github.com/mwaseem75/iris-HL7v2Gen) (MIT) builds its test-message generator
on. The script does outside InterSystems IRIS what that tool's `GenMessage` does inside it: it
walks the structure, emits the segments it asks for and fills the fields with plausible values by
datatype. The values are seeded per message, so a run reproduces the committed files.

- `min`: the required segments and groups only, their required fields filled (the shape
  iris-HL7v2Gen produces).
- `full`: every segment and group once (a repeating group twice at the top level), every field
  filled.

Messages are separated by a blank line; segments end with a carriage return.

To regenerate (needs Python 3 and `pip install hl7apy`):

```bash
pnpm fixtures:generate            # every version
python3 fixtures/generate.py 2.5  # one version
```

hl7apy's structures are a third opinion next to hl7.eu, Caristix and HAPI, and they differ from
the message ledgers (`docs/validation/<version>-message-ledger.md`) in places; the generated message
follows hl7apy's structure, and `expectations.json` records every such message with the ledger
row that decides it. hl7apy also has no choice construct, so where the standard allows one of
several order detail segments the generated message carries all of them.

## `external/` (fetched, not committed)

Real-world sample collections, cloned at a pinned commit by `pnpm fixtures:fetch`
(`scripts/fetch-fixtures.mjs`) into `external/<name>/`. CI runs the fetch before the tests; locally
the external tests are skipped with a warning until the fetch has run. The collections carry no
license, so they are not copied into this repository: the fetch script names the repository and
commit, and `expectations.json` refers to the files by path.

| Source | Commit | Contents |
| --- | --- | --- |
| [bqfan/sample-hl7-messages](https://github.com/bqfan/sample-hl7-messages) | `7a0525a7bb4b` | [hl7-samples](https://github.com/tonyyates/hl7-samples) (Tony Yates), [HL7V2Examples](https://github.com/angusmillar/HL7V2Examples) (Angus Millar) and [Mirth-Connect-Resources](https://github.com/tiskinty/Mirth-Connect-Resources) (tiskinty): ADT, ORU, ORM, REF, SIU, MDM, VXU/VXQ/VXR, v2.2 to v2.5.1 |

The test reads every file that contains `MSH|` (PDF, DOCX, ZIP and Markdown files are skipped),
removes MLLP framing, normalises line endings and splits a file at every `MSH` segment. The samples
that do not parse are nonconformant (a missing EVN or PV1, segments out of order), in a version
this package does not parse (2.2) or carry a mistyped MSH-9; each has a record in
`expectations.json` saying which.

To move a source to a newer commit, change its `commit` in `scripts/fetch-fixtures.mjs`, run
`pnpm fixtures:fetch` and `pnpm vitest run src/fixtures.test.ts`, and review the records the test
asks for.

## `expectations.json`

```jsonc
{
  "reasons": { "<key>": "what this kind of deviation is" },
  "generated": { "<file>": [ { "messages": ["<MSH-9>", …], "error": "<substring of the parse error>", "reason": "<key>", "why": "…" } ] },
  "external": { "<source>": { "<path>": [ { "messages": [<1-based index>, …], … } ] } }
}
```

A record has one of `error` (the message is refused and the error contains this text), `dropped`
(it parses, but these segments, in wire order, are unknown to the structure and skipped with a
warning, so the round trip loses them) or `lossy` (it parses, and the round trip loses what the
text says). `messages` is omitted for an external file holding one message.
