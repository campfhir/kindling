# @campfhir/x12 roadmap

| Step | Scope | Status |
|---|---|---|
| 0.1 Generic layer | Delimiters from the ISA, tokenizer, segment model, typed envelope segments (ISA, GS, ST, SE, GE, IEA), `parse()`, `encodeInterchange()`, `identifyInterchange()` | ✅ |
| Structure engine | Schemas of loops and qualified segments, `parseStructure()` / `verifyStructure()` / `encodeStructure()`, types derived from the schema, dispatch on ST01 and ST03/GS08 with each guide loaded on first use | ✅ |
| 270/271 (005010X279A1) | Every loop and segment of the guide; classes for BHT, HL, TRN, NM1, EQ, EB, AAA, LS, LE | ✅ |
| 999 (005010X231A1) | The structure, AK1/AK2/IK3/CTX/IK4/IK5/AK9 with their code lists, and `acknowledge()` (envelope and structure errors) | ✅ |
| Element checks | Types, lengths and code values per element, reported as IK4 in a 999; needs element tables for the segments that stay generic | ⬜ |
| More transaction sets | 837P/I/D, 835, 276/277, 278, 834, 820 | ⬜ |
| TA1 | A typed TA1 class (its element types and widths are not in any public source yet) | ⬜ |
| Several interchanges per file | Today a second ISA after IEA is an error | ⬜ |

Every fact is checked against free public sources (CMS and state Medicaid companion guides, X12's
published interpretations) and recorded in [docs/validation](docs/validation/005010-envelope-ledger.md).
