# @campfhir/pdmp roadmap

| Step | Scope | Status |
|---|---|---|
| 0.1 Generic layer | Delimiters from the TH, tokenizer, segment model, typed envelope (TH, IS, TP, TT), the pharmacy / patient / dispensation loops, `parse()`, `encodeReport()`, `identifyReport()` | ✅ |
| ASAP 4.2B and 4.2A | Typed PHA, PAT, DSP, PRE, CDI and AIR classes per version, dispatched by `parse()` on TH01 | ⬜ |
| Zero reports | A builder for the zero report the state guides print | ⬜ |
| ASAP 4.1 and 5.0 | 4.1 is still accepted by some states; 5.0 adds IS04/IS05 and changes TH08 (only Maryland's and Illinois's guides cover it publicly) | ⬜ |
| Escape character | The caret `^`, once a second source confirms it is ASAP's | ⬜ |

Every fact is checked against the state PDMP dispenser guides and recorded in
[docs/validation/asap-ledger.md](docs/validation/asap-ledger.md).
