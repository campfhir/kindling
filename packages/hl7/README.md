# HL7v2 Message Builder & Parser

A modular TypeScript library for building and parsing HL7v2 messages, published as
[`@campfhir/hl7`](https://www.npmjs.com/package/@campfhir/hl7). It is one package of the
[kindling](../../README.md) repository.

## Features

- **Fluent Interface**: Type-safe segment construction with fluent API
- **Parser**: Parse HL7v2 message strings back into structured data; `parse()` reads MSH-9 and
  MSH-12 and picks the right message parser itself (see [Parsing any message](#parsing-any-message))
- **Batches**: `parseBatch()` and `encodeBatch()` for the HL7 batch protocol (FHS/BHS … BTS/FTS)
- **Round-trip Support**: Build messages and parse them back with full fidelity
- **Modular Architecture**: Organized by HL7 version for easy extension
- **Version Support**: every HL7 v2 release from v2.1 to v2.9.1, the latest (v2.1, 2.2, 2.3, 2.3.1, 2.4, 2.5, 2.5.1, 2.6,
  2.7, 2.7.1, 2.8, 2.8.1, 2.8.2, 2.9, 2.9.1), all dispatched by the root `parse()` (see [Versions](#versions))
- **Date Input**: Segment date methods accept `Date` objects with optional HL7 layout format, in addition to pre-formatted strings
- **Value Extraction**: Path-based field/component extraction utility
- **Custom Segments**: Build Z-segments and other custom segments with a simple field-setter API
- **Message Editor**: Fluent API for inserting segments into, or updating field values in, any built message without modifying the builder
- **Comprehensive Tests**: 13,567 tests across 409 test files (with the external fixtures fetched, as CI does), co-located with source (Go style)

## Roadmap

See [ROADMAP.md](ROADMAP.md). Every release from v2.1 to v2.9.1 has its segments and messages, and the root
`parse()` dispatches all of them. Checklists of the remaining [segments](docs/ROADMAP-SEGMENTS.md) and
[event types](docs/ROADMAP-EVENTS.md).

## Project Structure

```
src/
├── index.ts                  # Core type exports and the root parse()
├── parse.ts                  # parse(), selectParser(): one message or a batch file
├── dispatch.ts               # parseMessage(), identifyMessage(): MSH-9/MSH-12 dispatch to the generated parsers
├── batch.ts                  # parseBatch(), encodeBatch(): the batch protocol (FHS/BHS … BTS/FTS)
├── types/                    # Version-agnostic core types
│   ├── encoding.ts           # HL7 encoding characters
│   ├── segment.ts            # Base segment types and classes
│   ├── message.ts            # Message container
│   ├── schema.ts             # Message schema definitions
│   └── parser.ts             # Parser utilities and interfaces
├── utils/
│   ├── dateUtils.ts          # Go-style date formatting utility (standalone, publishable)
│   ├── hl7DateUtils.ts       # HL7-specific date formatting wrapper and layout constants
│   ├── ValueExtractor.ts     # Path-based value extraction utility
│   ├── CustomSegment.ts      # Generic segment for Z-segments and custom use
│   └── MessageEditor.ts      # Fluent segment insertion API
│   └── structure.ts          # Structure-driven parse / verify / encode engine
├── v2.3/ … v2.9.1/           # One folder per version: its segments (PID.ts) and messages (ORU_R01.ts) side by side
│   │                         #   segments: v2.3 hand-written; v2.3.1 to v2.5.1 subclass the ones whose table changed;
│   │                         #   v2.6 on are generated from the version's segment spec (codegen/spec/), and a segment
│   │                         #   whose table did not change re-exports the earlier version's class
│   │                         #   messages (generated): one module per message with its builder, parser and structure;
│   │                         #   index.ts = the version barrel, registry.ts = structure name → parser
└── testdata/                 # 30 sample HL7 messages for integration tests
fixtures/
├── generated/                # One message per structure and version, from hl7apy's structures (fixture tests)
├── external/                 # Real-world sample collections, fetched by `pnpm fixtures:fetch` (not committed)
└── expectations.json         # The fixture messages that do not parse or round-trip, and why
```

Parsers, builders and structures are generated from the message schemas in `codegen/schemas/`
(ADT A01–A51, ACK, BAR P01/P02/P05/P06, DFT P03, MDM T01–T11, ORM O01, ORR O02,
ORU R01 and R30–R32, SIU S12–S26, SRM/SRR S01–S11, VXU V04, and the queries: QRY/ADR A19,
QRY Q01/Q02/P04/R02/T12, QCK Q02, DSR Q01/Q03/P04, UDM Q05/R06, EQQ/RQQ/SPQ/VQQ/TBR, EDR R07,
ERP R09, SQM/SQR S25, VXQ V01, VXX V02, VXR V03, ORF R04/W02, OSQ/OSR Q06, DOC T12, and the master
files: MFN M01–M15, MFK M01–M15, MFQ/MFR M01–M13, MFD MFA, and the orders: OMD/ORD, OMS/ORS,
OMN/ORN, RDO/RRO, RDE/RRE, RDS/RRD, RGV/RRG, RAS/RRA with their v2.4 event numbers, the pharmacy
queries QRY Q26–Q30 with ROR/RAR/RDR/RER/RGR, ORU W01, and the patient care, referral, clinical
trial, product experience and application management messages: PPR/PRR, PGL/PPV, PPP/PTR, PPG/PPT,
QRY PC4/PC9/PCE/PCK, RQI/RPI/RPL/RPR, RQP, RQC/RCI/RCL, PIN, RQA/RPA, REF/RRI, CRM, CSU, PEX, SUR,
NMQ/NMR/NMD — every trigger event of the HL7 v2.3 event list), each in the shape the
standard gives it for that version. See [codegen/README.md](codegen/README.md). From v2.6 on, a version's
segment spec and message schemas are imported from the standard itself, from hl7.eu's pages or the official
chapter PDFs, by the tools in [codegen/extract](codegen/extract/README.md); every decision the import makes is
recorded in `codegen/extracted/<version>/IMPORT.md`.

## Installation

```bash
npm install @campfhir/hl7
```

To work on the library itself, install at the repository root and run the scripts from this
folder (or from the root with `pnpm --filter @campfhir/hl7 <script>`):

```bash
pnpm install          # at the repository root
cd packages/hl7
pnpm build
```

## Testing

```bash
pnpm test             # unit tests
pnpm lint             # eslint (shared config at the repository root)
pnpm typecheck        # tsc --noEmit
pnpm fixtures:fetch   # clone the external sample collections the fixture tests read (CI does this)
```

Tests use [Vitest](https://vitest.dev/) and run directly against TypeScript source via `tsx`.
The fixture tests (`src/fixtures.test.ts`) parse and round-trip every message of
[`fixtures/`](fixtures/README.md): one generated message per structure and version, and the
real-world sample collections; `fixtures/expectations.json` is the list of messages that do not
parse, each with its reason.

## Runtime support

The package is ESM only (`"type": "module"`, one `.js` and one `.d.ts` per module, fully
specified import paths) and needs Node.js 24 or later; CommonJS code on Node 24 can still load it
with `require()`, which Node resolves to the ES module. It also runs on Bun, browsers and
Cloudflare Workers. There are no Node-only runtime dependencies. Other runtimes
that can consume npm packages (for example Deno via the `npm:` specifier) should
also work, but they are not an officially tested target.

## Versions

Every supported version has its own subpath, `@campfhir/hl7/<version>`, with its segments and messages. Versions that are structurally identical to their predecessor simply
re-export it, so `src/v2.4` `NK1` *is* the v2.3 `NK1` class, while a segment whose field table
changed gets a subclass in that version (`src/v2.4` `PID` extends the 2.3.1 `PID` with PID-31 to
PID-38). From v2.6 on a changed segment gets a class of its own, generated from that version's table.
v2.1 and v2.2 stand alone: they extend no version and no version extends them, so every one of their
segments is a class of its own (`@campfhir/hl7/v2.2` `PID` is not the v2.3 `PID`).
Segments are available from the version that introduced them:

| Version | Based on | Notes |
|---|---|---|
| `v2.1` | — | Standalone: 39 structures and 38 segments, each a class of its own generated from the 2.1 tables. Imported from the hl7.eu segment and event pages (hl7.eu has no 2.1 chapter pages), checked against Caristix and HAPI. QRY^P04 and QRY^R02 have no structure in any source and are not generated |
| `v2.2` | — | Standalone: 73 structures (ADT^A01–A37, the master file messages MFN/MFK/MFD/MFQ/MFR^M01–M03, the network management NMD/NMQ/NMR, ORM/ORR, ORU/ORF, the queries, BAR/DFT) and 62 segments, each a class of its own. Imported from the hl7.eu segment and event pages, checked against Caristix and HAPI. The pharmacy messages only Caristix lists (RDE/RDS/RGV/RAS^O01–O02 and their responses, QRY^Q26–Q30) are not implemented |
| `v2.3` | — | Base implementation |
| `v2.3.1` | v2.3 | Complete: every message generated against the 2.3.1 field tables (53 segments have their own class, the rest re-export v2.3's); the 2.3.1 structure changes (QAK, renumbered queries, repeating IN3, NK1 in ORU, PD1 in SIU, …) applied |
| `v2.4` | v2.3.1 | Complete: every message (334 structures, 57 new in 2.4: OML/ORL, OMG/ORG, OMP/ORP, OUL^R21, QBP/RSP/RTB/RDY and the other chapter 5 queries, the chapter 13 automation messages, PMU^B01–B06, BAR^P10, ADT A52–A55 and A60–A62) generated against the 2.4 field tables (94 segments have their own class, 28 of them new in 2.4); the 2.4 structure changes (ROL and PDA in ADT, CTD/FT1 in ORM and ORU, required order detail in ORR/OSR, …) applied |
| `v2.5` | v2.4 | Complete: every message (387 structures, 50 new in 2.5: OML^O33/O35 and ORL^O34/O36, OUL^R22–R24, OMI/ORI, OMB/ORB, the BPS/BRP/BTS/BRT blood bank messages, RDE^O25/RRE^O26, QBP^Q31/RSP^K31 and the chapter 5 Z73–Z99 conformance queries, PMU^B07/B08, BAR^P12, DFT^P11) generated against the 2.5 field tables (55 segments have their own class, 6 of them new in 2.5: BPO, BPX, BTX, CON, IPC, OVR); the 2.5 structure changes (`[{SFT}]` after MSH in every message except the ones kept from earlier releases, TIMING groups after ORC, SPECIMEN groups, repeating ERR in the acknowledgments, A03/A16 with the A01 segments, …) applied |
| `v2.5.1` | v2.5 | Complete: every message (387 structures) generated against the 2.5.1 field tables (OBR, OBX and ORC have their own class: OBR-50, OBX-20 to OBX-25, ORC-31; the rest re-export v2.5's); the two 2.5.1 structure changes (`[{SFT}]` in QRY^PC4/PC9/PCE/PCK, no NTE after RXE in RRE^O26) applied |
| `v2.6` | v2.5.1 | 410 structures (37 new: the chapter 16 e-claims messages EHC^E01–E24 with QBP/RSP^E03/E22, the chapter 17 materials messages SLR/SLN/STI/STC, OPL/OPR, OPU^R25, MFN/MFK^M14–M17); 171 segments generated from the 2.6 tables. Imported from hl7.eu, checked against Caristix and HAPI |
| `v2.7` | v2.6 | 326 structures (9 new: CCF/CCQ^I19–I22, OML^O39/ORL^O40, ORA^R33, OSM^R26, QBP^Q32/RSP^K32, SIU^S27; the messages withdrawn as of 2.7 left out); 175 segments. Imported from hl7.eu, checked against Caristix and HAPI |
| `v2.7.1` | v2.7 | 326 structures, the same as 2.7; 23 segments have their own class, the rest re-export 2.7's. Imported from hl7.eu, checked against Caristix |
| `v2.8` | v2.7.1 | 335 structures (22 new: the donor messages DBC/DBU/DEL/DEO/DER/DPR/DRC/DRG^O41–O48, OMQ/ORX/OSU, ORU^R40/ORA^R41, QBP/RSP^Q33/Q34/K33/K34, SCN/SDN/SDR/SMD); 181 segments, 58 with their own class. Imported from hl7.eu (chapter 16 from the official PDF), checked against Caristix and HAPI |
| `v2.8.1` | v2.8 | 335 structures; 29 segments with their own class. Imported from hl7.eu and the official PDFs of chapters 4, 4A, 9, 11, 13, 14 and 16, checked against HAPI |
| `v2.8.2` | v2.8.1 | 337 structures (MFN/MFK^M18 new); 185 segments (DPS, MCP, OMC, PM1 new), 24 with their own class. Imported from hl7.eu alone (no second source exists for it) |
| `v2.9` | v2.8.2 | 351 structures (22 new: OML^O59/RCV^O59, ORL^O53–O56, ORU^R42/R43, RDE^O49/RRE^O50, OMQ/ORX/OSU on O57/O58/O51–O52, MFN/MFK^M19, INR^U14, the chapter 17 SLS/STS/SDS/SMS); 192 segments. Imported from the official chapter PDFs, checked against hl7.eu |
| `v2.9.1` | v2.9 | 351 structures, with the gender harmony segments GSP, GSR and GSC in the patient, next-of-kin, guarantor (now a GUARANTOR group) and insurance parts; 195 segments. Imported from the official chapter PDFs, checked against hl7.eu |

A few messages of each version from v2.6 on are not generated yet: their tables hold a choice between groups
or a placeholder group, which the message schema cannot express, or they wrap such a message (8 in v2.6,
22–29 in the later versions; each version's `codegen/extracted/<version>/IMPORT.md` lists them with the reason).

The root `parse()` dispatches every version: 1.0 parses v2.3, 1.1 adds v2.3.1, 1.2 adds v2.4 (2.0 drops
CommonJS and Node < 24), 2.1 adds v2.5 and 2.2 adds v2.5.1. The later versions arrived as modules first
(2.3 adds v2.6, v2.7 and v2.7.1, 2.4 v2.8, 2.5 v2.8.1, 2.6 v2.8.2, 2.7 v2.9) and 2.8 adds v2.9.1 and
dispatches v2.6 to v2.9.1. 2.9 adds v2.1 and v2.2. The fixture tests round-trip one generated message per
structure of v2.1 to v2.8.2 (hl7apy has no v2.7.1, v2.9 or v2.9.1) through `parse()`.

Every segment field and every message structure of every version is checked against the sources there
are for it: hl7.eu, Caristix and HAPI, and the official HL7 chapter PDFs where they were at hand (which
decide). Each version has a segment ledger and a message ledger in [docs/validation](docs/validation/README.md)
listing every field and structure, every disagreement between the sources and every dated decision.

## Imports

Core types, utilities, and the message editor are exported from the package root:

```typescript
import { parse, BaseSegment, HL7Message, ParserUtils, extractValue, CustomSegment, MessageEditor } from '@campfhir/hl7';

// Date formatting utility (Go-style layout strings)
import { dateUtils, DateOnly, DateTime } from '@campfhir/hl7';
```

HL7-specific date helpers are imported directly:

```typescript
import { formatHL7Date, DateLayout, DateTimeLayout, TimeLayout } from '@campfhir/hl7/utils/hl7DateUtils';
```

Everything of a version is under `@campfhir/hl7/<version>`: one module per segment and per message,
and a barrel for the whole version.

```typescript
// A segment
import { PID } from '@campfhir/hl7/v2.5.1/PID';

// The version barrel: every segment class, plus create*, parse*, *_STRUCTURE and Parsed* of every
// message and the MESSAGES registry
import { MSH, PID, OBX, parseORU_R01, type ParsedORU_R01 } from '@campfhir/hl7/v2.5.1';
```

Each message has one module with its builder, parser, structure and types:

```typescript
// One message: everything about ORU^R01 in HL7 v2.5.1
import {
  createORU_R01, type PatientResult, type OrderObservation,  // builder
  parseORU_R01, type ParsedORU_R01,                          // parser
  ORU_R01_STRUCTURE,                                         // the structure, as data
} from '@campfhir/hl7/v2.5.1/ORU_R01';
```

Group types such as `PatientResult` share names across messages, so they come from the message's
module, not the barrel.

The paths of earlier releases still resolve for v2.3 to v2.5.1, to the same modules:
`@campfhir/hl7/segments/<v>/<SEG>`, `@campfhir/hl7/builders/<v>/<MSG>`, `@campfhir/hl7/parsers/<v>/<MSG>_Parser`,
`@campfhir/hl7/structures/<v>` and the `segments/`, `builders/` and `parsers/` barrels. They are deprecated and will
be removed in the next major version.

Every builder takes the message's required segments and groups as positional arguments, in the
order of the standard's message table, then an `options` object for the optional ones:
`createADT_A01(msh, evn, pid, pv1, { patientDemographics, nextOfKin, insuranceGroups })`,
`createACK(msh, msa, { error })`. Properties are named after what the segment holds, not its code:
`patient` (PID), `visit` (PV1), `notes` (NTE), `diagnoses` (DG1), `commonOrder` (ORC),
`observationRequest` (OBR), `observations` (OBX); the message header is `header`. `verify()` lists
what is missing or misplaced and `encode()` throws when the message is invalid. A parsed message
has the same shape as the builder input, so a message can be parsed, edited and rebuilt without
conversion.

## Usage Examples

### Parsing any message

The root `parse()` takes any HL7 v2 input. One message is dispatched on MSH-9 (message type and
trigger event) and MSH-12 (version) to the generated parser of that message in that version; the
result has `kind: 'message'`, `version` and `structure`, and a `switch` or `if` on `structure`
narrows `parsed` to the message's own shape (`ParsedADT_A01`, `ParsedORU_R01`, …), the very object
`parseADT_A01()` would return. A batch file (FHS or BHS first, or more than one MSH) is parsed by
`parseBatch()` instead and comes back with `kind: 'batch'` (see [Batches](#batches)).

```typescript
import { parse } from '@campfhir/hl7';

const result = parse(hl7String);
if (!result.ok) throw new Error(result.err.message); // "Unknown HL7 v2.3 message type 'ZZZ^Z01' (MSH-9)", "ADT_A01 message must contain a PID segment", …
if (result.val.kind === 'batch') return handleBatch(result.val); // fileHeader, batches, fileTrailer, warnings

switch (result.val.structure) {
  case 'ADT_A01':
  case 'ADT_A04':
    // the ADT_A01 of every version: patient and visit are in all of them
    console.log(result.val.parsed.patient.encode(), result.val.parsed.visit.encode());
    break;
  case 'ORU_R01':
    for (const { observations } of result.val.parsed.patientResults[0].orderObservations) {
      observations?.forEach(({ observation }) => console.log(observation.encode()));
    }
    break;
  case 'ACK':
    console.log(result.val.parsed.acknowledgment.encode());
}
```

`selectParser(hl7String)` stops one step earlier and returns the parser it would run: for a message
`{ kind: 'message', version, structure, messageType, parse }`, for a batch `{ kind: 'batch', parse }`.
`parseMessage()` and `selectMessageParser()` are the single-message halves (a batch is an error to
them), and `identifyMessage(hl7String)` returns only what MSH-9 and MSH-12 say. `MESSAGES` of
`@campfhir/hl7/v2.3` is the map they dispatch on (message structure name → parser).

`SUPPORTED_VERSIONS` lists the versions `parse()` dispatches (v2.1 to v2.9.1), and every other MSH-12
value is an error. To parse such a feed anyway, or one that leaves MSH-12 empty, name the
version to parse as: `parse(hl7String, { version: '2.5.1' })`. Each version's own parsers
(`parseADT_A01` of `@campfhir/hl7/v2.9.1`, …) can also be called directly.

A message type's shape can differ between versions (v2.9.1's ADT_A01 has GSP, GSR and GSC, for example),
so `structure` alone narrows `parsed` to the union of that message across the versions; check `version`
too for one version's exact type:

```typescript
if (result.val.version === '2.9.1' && result.val.structure === 'ADT_A01') {
  result.val.parsed.patient; // ParsedADT_A01 of @campfhir/hl7/v2.9.1
}
```

In v2.2 and v2.3 MSH-9 has two components, message type and trigger event (`ADT^A01`); the message
structure component (`ADT^A01^ADT_A01`) arrives in v2.3.1. The dispatcher keys on
`<type>_<event>` first, then on the type alone (`ACK`, whose event names the message it
acknowledges), then on MSH-9.3 when a sender includes it. In v2.1 MSH-9 is the message type alone
(`ADT`) and the trigger event travels in EVN-1, so a message whose MSH-9 names no event is keyed on
`<type>_<EVN-1>` (`ADT` with `EVN|A04` is `ADT_A04`), or on the only event of its type in the version
(`ORM` is `ORM_O01`). v2.1 and v2.2 define no message structure IDs: each of their messages is
`<type>_<event>`.

### Batches

`parseBatch()` reads an HL7 batch file, `[FHS] { [BHS] [QRD] [QRF] { [MSH …] } [BTS] } [FTS]`
(hl7.eu v2.3 chapter 2, §2.23.3), and dispatches every message as `parse()` does, so a batch may
mix message types. `parse()` itself calls it for any input that starts with FHS or BHS or holds
more than one MSH, and returns its result with `kind: 'batch'`. Every envelope segment is
optional: a bare run of messages is a file of one batch, and a single message is a batch of one.
A message that fails to parse does not fail the batch; its entry
in `messages` carries the error, with the batch number, message number and line in `err.meta`.
A BTS-1 or FTS-1 count that disagrees with what the file holds is listed in `warnings`.

```typescript
import { parseBatch, encodeBatch } from '@campfhir/hl7';

const file = parseBatch(batchString);
if (file.ok) {
  for (const [i, batch] of file.val.batches.entries()) {
    console.log(`batch ${i + 1}: ${batch.header?.encode()} … ${batch.trailer?.encode()}`);
    for (const message of batch.messages) {
      if (!message.ok) console.error(message.err.meta, message.err.message);
      else if (message.val.structure === 'DFT_P03') console.log(message.val.parsed.financials.length);
    }
  }
  console.warn(file.val.warnings); // ["BTS-1 of batch 1 (line 9) counts 3 messages, the batch holds 2"]
}

// The other way: FHS, BHS, QRD/QRF, messages (strings, HL7Message, builders), BTS, FTS, in structure order.
const wire = encodeBatch({
  fileHeader: new FHS().sendingApplication('LAB'),
  batches: [{ header: new BHS().sendingApplication('LAB'), messages: [oru1, oru2], trailer: new BTS().messageCount('2') }],
  fileTrailer: new FTS().fileBatchCount('1'),
});
```

### Building an ORU^R01 Message

```typescript
import { MSH } from '@campfhir/hl7/v2.5.1/MSH';
import { PID } from '@campfhir/hl7/v2.5.1/PID';
import { PV1 } from '@campfhir/hl7/v2.5.1/PV1';
import { OBR } from '@campfhir/hl7/v2.5.1/OBR';
import { OBX } from '@campfhir/hl7/v2.5.1/OBX';
import { createORU_R01, PatientResult } from '@campfhir/hl7/v2.5.1/ORU_R01';

const msh = new MSH()
  .sendingApplication('LAB')
  .sendingFacility('General Hospital')
  .receivingApplication('EMR')
  .receivingFacility('Main Campus')
  .dateTimeOfMessage('20250119120000')
  .messageType({ messageCode: 'ORU', triggerEvent: 'R01', messageStructure: 'ORU_R01' })
  .messageControlId('MSG00001')
  .processingId('P')
  .versionId('2.5.1');

const pid = new PID()
  .setId('1')
  .patientIdentifierList({ id: '12345', checkDigit: '', checkDigitScheme: '', assigningAuthority: 'MRN', identifierTypeCode: 'MR' })
  .patientName({ familyName: 'Doe', givenName: 'John', middleName: 'Q' })
  .dateTimeOfBirth(new Date(1980, 0, 15))   // Date object — formatted as YYYYMMDD
  // .dateTimeOfBirth('19800115')            // pre-formatted string also accepted
  .administrativeSex('M');

const pv1 = new PV1()
  .setId('1')
  .patientClass('I')
  .assignedPatientLocation({ pointOfCare: 'ICU', room: '101', bed: 'A', facility: 'Main' })
  .attendingDoctor({ id: '1234', familyName: 'Smith', givenName: 'Jane' });

const obr = new OBR()
  .setId('1')
  .placerOrderNumber('ORD123456')
  .fillerOrderNumber('LAB987654')
  .universalServiceIdentifier({ identifier: 'CBC', text: 'Complete Blood Count', nameOfCodingSystem: 'LN' })
  .observationDateTime('20250119120000')
  .resultStatus('F');

const obx = new OBX()
  .setId('1')
  .valueType('NM')
  .observationIdentifier({ identifier: '718-7', text: 'Hemoglobin', nameOfCodingSystem: 'LN' })
  .observationValue('15.5')
  .units({ identifier: 'g/dL', text: 'grams per deciliter', nameOfCodingSystem: 'UCUM' })
  .referenceRange('13.5-17.5')
  .observationResultStatus('F');

const patientResult: PatientResult = {
  patient: pid,
  visit: pv1,
  orderObservations: [{ observationRequest: obr, observations: [{ observation: obx }] }],
};

const message = createORU_R01(msh, [patientResult]);
console.log(message.encode());
```

### Parsing an ORU^R01 Message

```typescript
import { parseORU_R01 } from '@campfhir/hl7/v2.5.1/ORU_R01';
import { ParserUtils } from '@campfhir/hl7';

const hl7String = `MSH|^~\\&|LAB|General Hospital|EMR|Main Campus|20250119120000||ORU^R01^ORU_R01|MSG00001|P|2.5.1
PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M|||123 Main St^^Springfield^IL^62701^USA||555-1234
PV1|1|I|ICU^101^A^Main||||1234^Smith^Jane
OBR|1|ORD123456|LAB987654|CBC^Complete Blood Count^LN|||20250119120000|||||||||1234^Smith^Jane|||||||||F
OBX|1|NM|718-7^Hemoglobin^LN|1|15.5|g/dL^grams per deciliter^UCUM|13.5-17.5||||F|||20250119120000`;

const result = parseORU_R01(hl7String);

if (result.ok) {
  const parsed = result.val;

  // Access MSH data
  console.log('Sending App:', ParserUtils.getComponent(parsed.header.fields[1], 0));

  // Access patient data
  const pidFields = parsed.patientResults[0].patient!.fields;
  console.log('Patient Name:', ParserUtils.getComponent(pidFields[4], 0));

  // Access observations
  parsed.patientResults[0].orderObservations[0].observations!.forEach(({ observation: obx }) => {
    const name = ParserUtils.getComponent(obx.fields[2], 1);
    const value = ParserUtils.getComponent(obx.fields[4], 0);
    console.log(`${name}: ${value}`);
  });

  // Re-encode (round-trip)
  console.log(parsed.message.encode());
} else {
  console.error('Parse error:', result.err.message);
}
```

### Value Extraction

Extract field values using a simple path syntax without fully parsing the message:

```typescript
import { extractValue } from '@campfhir/hl7';

const message = `MSH|^~\\&|LAB|Hospital|EMR|Clinic|20250119120000||ORU^R01|MSG001|P|2.5.1
PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M|||123 Main St^Apt 4^Springfield^IL^62701^USA`;

extractValue('MSH-3', message);      // 'LAB'
extractValue('PID-5.1', message);    // 'Doe'
extractValue('PID-5.2', message);    // 'John'
extractValue('PID-11.3', message);   // 'Springfield'
extractValue('OBX-5', message);      // string[] — all OBX-5 values
```

**Path syntax**: `Segment[-FieldIndex[.ComponentIndex[.SubcomponentIndex]]]`

### Date Formatting

All segment methods that accept date/time values support both pre-formatted strings and `Date` objects. Strings pass through unchanged for backwards compatibility.

```typescript
import { DateLayout, DateTimeLayout, TimeLayout } from '@campfhir/hl7/utils/hl7DateUtils';

// Date object — use layout aliases or Go-style layout strings
pid.dateTimeOfBirth(new Date(1980, 0, 15));                  // default: YYYYMMDD → '19800115'
pid.dateTimeOfBirth(new Date(1980, 0, 15), 'Date');          // alias → '19800115'
pid.dateTimeOfBirth(new Date(1980, 0, 15), 'DateTime');      // alias → '19800115090503'
obr.observationDateTime(new Date(), DateTimeLayout);         // constant → 'YYYYMMDDHHmmss'

// Pre-formatted string — passes through unchanged
pid.dateTimeOfBirth('19800115');
```

Layout aliases: `"Date"` → `YYYYMMDD`, `"DateTime"` → `YYYYMMDDHHmmss`, `"Time"` → `HHmmss`, `"TimeWithSeconds"` → `HHmmss.SSS`

`dateUtils` (exported from package root) is a standalone Go-style date utility usable independently of the HL7 layer:

```typescript
import { dateUtils, DateOnly } from '@campfhir/hl7';

dateUtils.format(new Date(), DateOnly);       // { ok: true, val: '20250119' }
dateUtils.parse('20250119', DateOnly);        // { ok: true, val: Date }
```

### Custom Segments

`CustomSegment` lets you build Z-segments or any non-standard segment without type safety restrictions. Fields use 1-based HL7 numbering.

```typescript
import { CustomSegment } from '@campfhir/hl7';

const zpd = new CustomSegment('ZPD')
  .setField(1, 'extra-patient-data')
  .setField(2, ['comp1', 'comp2'])             // components
  .setField(3, [['sub1a', 'sub1b'], ['sub2']]); // subcomponents

zpd.encode(); // ZPD|extra-patient-data|comp1^comp2|sub1a&sub1b^sub2
```

### Message Editor

`MessageEditor` lets you insert segments into, or update field values in, any built message without modifying the builder. All operations are applied at `encode()` time and can be freely chained.

#### Inserting segments

```typescript
import { MessageEditor, CustomSegment } from '@campfhir/hl7';
import { NTE } from '@campfhir/hl7/v2.5.1';
import { createORU_R01 } from '@campfhir/hl7/v2.5.1/ORU_R01';

const message = createORU_R01(msh, patientResults);

const encoded = new MessageEditor(message)
  // insert after last PID (default)
  .insert(new CustomSegment('ZPD').setField(1, 'patient-extra'))
  .after('PID').commit()

  // insert a typed NTE after every OBX
  .insert(new NTE().setId('1').comment('auto-note'))
  .after('OBX').each().commit()

  // insert before the 2nd OBR
  .insert(new CustomSegment('ZOR').setField(1, 'order-extra'))
  .before('OBR').nth(2).commit()

  // append at end of message
  .append(new CustomSegment('ZMH').setField(1, 'message-footer'))

  .encode();
```

**Insertion modes** — chain before calling `commit()`:
- `.last()` — target the last matching segment (default)
- `.each()` — insert relative to every matching segment
- `.nth(n)` — insert relative to the Nth matching segment

#### Updating field values

`update()` uses the same path syntax as `extractValue` to set a field, component, or subcomponent value. All occurrences of a repeating segment are updated. Invalid paths are silently ignored.

```typescript
// single update
new MessageEditor(message)
  .update('PID-5.1', 'Smith')
  .encode();

// bulk update
new MessageEditor(message)
  .update({
    'MSH-3': 'NEW_LAB',
    'PID-5.1': 'Smith',
    'PID-3.4.1': 'GEN',   // subcomponent — assigning authority namespace
  })
  .encode();

// chain updates with insertions
new MessageEditor(message)
  .update('PID-5.1', 'Smith')
  .insert(new CustomSegment('ZPD').setField(1, 'extra'))
  .after('PID').commit()
  .encode();
```

**Path syntax**: `Segment-FieldIndex[.ComponentIndex[.SubcomponentIndex]]` — same as `extractValue`.

### Examples

```bash
npx tsx examples/oru-example.ts                    # Build ORU^R01 message
npx tsx examples/parse-any-example.ts              # Root parse(): dispatch on MSH-9/MSH-12
npx tsx examples/parser-example.ts                 # Parse and round-trip
npx tsx examples/oru-r30-example.ts                # Build ORU^R30 (point-of-care)
npx tsx examples/parse-modify-encode-example.ts    # Parse, modify, re-encode
npx tsx examples/value-extractor-example.ts        # Value extraction
```

## Architecture

### Fluent Interface

Each segment uses a fluent builder pattern:

```typescript
const msh = new MSH()
  .sendingApplication('APP')
  .receivingApplication('SYS');
```

### Structure-driven messages

A message's structure — the ordered segments, choices and groups of the standard's message table —
is data (`<MSG>_STRUCTURE` in `src/<version>/<MSG>.ts`, generated from `codegen/schemas/`). The parser and
builder of a message are generated too and contain no message-specific logic: they hand the
structure and the segment classes of their version to the engine in `src/types/structure.ts`.
`parseStructure` walks the raw segments against the structure (a repeating group starts a new
instance whenever the next segment can begin one, and when that segment also opens a later sibling
group, as ORC does for the diet and tray orders of OMD, the instance is parsed speculatively and
handed to the sibling if it stops at a segment only the sibling can take; missing required items
and misplaced known segments are errors; unknown segments such as Z segments are skipped with a
warning),
`verifyStructure` checks a builder's input and `encodeStructure` writes it out in order.

```typescript
import { parseStructure } from '@campfhir/hl7';
import { ORU_R01_STRUCTURE } from '@campfhir/hl7/v2.5.1';

// what parseORU_R01 does, given the v2.5.1 segment parsers
const result = parseStructure('ORU_R01', ORU_R01_STRUCTURE, parsers, hl7String);
```

Adding a message therefore means writing its schema (with the source page it was checked
against), not a parser.

### Version Organization

Segments and messages are organized by HL7 version (`v2.1` … `v2.9.1`), supporting:
- Multiple versions simultaneously
- Adding new versions without affecting existing code
- Version-specific business logic

## Extending the Library

### Adding a New Segment

1. Create a file in `src/v2.5.1/<SEGMENT>.ts`
2. Extend `BaseSegment` with typed setters/getters

### Adding a New Message Type

1. Describe the message in `codegen/schemas/<version>/<MSG_TYPE>.ts` (see [codegen/README.md](codegen/README.md))
2. Register it in that version's `version.ts` and run `pnpm codegen && pnpm barrels && pnpm exports`
3. Add tests for the generated `create<MSG_TYPE>` and `parse<MSG_TYPE>`

### Adding a New HL7 Version

1. Pull the sources: `codegen/validate/fetch-sources.sh v2.X <dir> --record` (hl7.eu, Caristix, HAPI); convert any
   official chapter PDFs with `codegen/extract/pdf-chapter.ts`
2. Import: `codegen/extract/add-version.sh v2.X <dir>` extracts the segment and message tables, writes the segment
   spec, the message schemas and `version.ts`, generates `src/v2.X/`, and builds the two validation ledgers
3. Settle what the ledgers report: fix the extraction, or record the decision with its date and source in
   `codegen/extracted/v2.X/overrides.json` or the notes files (see [docs/validation](docs/validation/README.md))

The steps are described in [codegen/extract/README.md](codegen/extract/README.md).

## Design Decisions

### Modular Architecture
Small, focused files organized by version make the codebase easy to navigate, test, extend, and maintain at scale.

### Type Safety
TypeScript provides compile-time validation, better IDE support, and self-documenting interfaces.

## License

MIT
