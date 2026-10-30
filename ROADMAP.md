# Roadmap

Goal: well-tested TypeScript implementations of the data formats healthcare systems exchange,
published to npm as separate `@campfhir/*` packages from this repository, all with the same
fluent builder/parser style.

| Package | Scope | Status |
|---|---|---|
| `@campfhir/hl7` | HL7 v2 messages. Every release from v2.1 to v2.9.1, the latest, is complete and dispatched by `parse()` — see the [package roadmap](packages/hl7/ROADMAP.md) | ✅ v2.1 to v2.9.1 |
| `@campfhir/x12` | X12 EDI transaction sets used in healthcare (eligibility, claims, remittance, …) — see the [package roadmap](packages/x12/ROADMAP.md) | 🟡 0.1: envelopes, 270/271, 999 |
| `@campfhir/pdmp` | Prescription drug monitoring program (PDMP) reports in the ASAP format — see the [package roadmap](packages/pdmp/ROADMAP.md) | 🟡 0.1: syntax, envelope and loops |
| `@campfhir/fhir-r4` | FHIR R4 resources: typed builders, parsing and validation | ⬜ not started |
| `@campfhir/fhir-r5` | FHIR R5 resources | ⬜ not started |

Scope for the planned packages is a placeholder until work starts; each package keeps its own
detailed roadmap in its folder.

The release pipeline (CI, version bumps, staged npm publishing, tags) is described in
[CONTRIBUTING.md](CONTRIBUTING.md).
