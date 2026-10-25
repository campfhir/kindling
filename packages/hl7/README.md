# HL7v2 Message Builder & Parser

A modular TypeScript library for building and parsing HL7v2 messages, published as
[`@campfhir/hl7`](https://www.npmjs.com/package/@campfhir/hl7). It is one package of the
[kindling](../../README.md) repository.

## Features

- **Fluent Interface**: Type-safe segment construction with fluent API
- **Parser**: Parse HL7v2 message strings back into structured data
- **Round-trip Support**: Build messages and parse them back with full fidelity
- **Modular Architecture**: Organized by HL7 version for easy extension
- **Version Support**: HL7 v2.3, v2.3.1, v2.4, v2.5 and v2.5.1 (see [Versions](#versions))
- **Date Input**: Segment date methods accept `Date` objects with optional HL7 layout format, in addition to pre-formatted strings
- **Value Extraction**: Path-based field/component extraction utility
- **Custom Segments**: Build Z-segments and other custom segments with a simple field-setter API
- **Message Editor**: Fluent API for inserting segments into, or updating field values in, any built message without modifying the builder
- **Comprehensive Tests**: 609 tests across 25 test files, co-located with source (Go style)

## Roadmap

See [ROADMAP.md](ROADMAP.md) — HL7 v2.3 completion first, then v2.5.1 parity. Checklists of the
remaining [segments](docs/ROADMAP-SEGMENTS.md) and [event types](docs/ROADMAP-EVENTS.md).

## Project Structure

```
src/
├── index.ts                  # Core type exports
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
├── segments/                 # Segment definitions by version
│   ├── v2.3/                 # hand-written base segments
│   ├── v2.3.1/               # re-exports of v2.3 (generated)
│   ├── v2.4/                 # re-exports of v2.3.1 + PDA, ABS, BLC, RMI, ORG, AFF, LAN, EDU
│   ├── v2.5/                 # re-exports + SFT, SPM, TQ1, TQ2, CER (and EDU-9)
│   └── v2.5.1/               # extends v2.5 with 2.5.1-specific fields
├── structures/               # Generated: each message's structure as data (<MSG>_STRUCTURE)
├── parsers/                  # Generated message parsers by version (v2.3 … v2.5.1)
│   └── testdata/             # 30 sample HL7 messages for integration tests
└── builders/                 # Generated message builders by version (v2.3 … v2.5.1)
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
standard gives it for that version. See [codegen/README.md](codegen/README.md).

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
pnpm test        # unit tests
pnpm lint        # eslint (shared config at the repository root)
pnpm typecheck   # tsc --noEmit
```

Tests use [Vitest](https://vitest.dev/) and run directly against TypeScript source via `tsx`.

## Runtime support

The package ships dual CJS/ESM builds with fully-specified import paths, so it
runs on Node.js (CommonJS `require` and native ESM `import`), Bun, browsers, and
Cloudflare Workers. There are no Node-only runtime dependencies. Other runtimes
that can consume npm packages (for example Deno via the `npm:` specifier) should
also work, but they are not an officially tested target.

## Versions

Every supported version has its own subpath (`segments/<version>`, `parsers/<version>`,
`builders/<version>`). Versions that are structurally identical to their predecessor simply
re-export it, so `segments/v2.4` `PID` *is* the v2.3 `PID` class. Segments are available from the
version that introduced them:

| Version | Based on | Notes |
|---|---|---|
| `v2.3` | — | Base implementation |
| `v2.3.1` | v2.3 | Re-export |
| `v2.4` | v2.3.1 | Re-export, except `ORM^O01` (adds `CTD` and `FT1`) |
| `v2.5` | v2.4 | Re-export + `SFT` (Software), `SPM` (Specimen), `TQ1` (Timing/Quantity); `ERR` gains ERR-2..12; own `ACK` (`[{SFT}]`, repeating `ERR`) and `ORR^O02` (repeating `ERR`) |
| `v2.5.1` | v2.5 | Version-specific fields and messages (e.g. `ORU_R30–R32`) |

Version-specific differences in 2.3.1, 2.4 and 2.5 are filled in as they are implemented — see the
[roadmap](ROADMAP.md).

## Imports

Core types, utilities, and the message editor are exported from the package root:

```typescript
import { BaseSegment, HL7Message, ParserUtils, extractValue, CustomSegment, MessageEditor } from '@campfhir/hl7';

// Date formatting utility (Go-style layout strings)
import { dateUtils, DateOnly, DateTime } from '@campfhir/hl7';
```

HL7-specific date helpers are imported directly:

```typescript
import { formatHL7Date, DateLayout, DateTimeLayout, TimeLayout } from '@campfhir/hl7/utils/hl7DateUtils';
```

Versioned segments can be imported as a group or individually:

```typescript
// All segments for a version
import { MSH, PID, OBX } from '@campfhir/hl7/segments/v2.5.1';

// Individual segment (also gives access to types)
import { MSH } from '@campfhir/hl7/segments/v2.5.1/MSH';
```

Builders and parsers are imported individually or via the barrel (create*/parse* functions only):

```typescript
// Barrel — create*/parse* functions only
import { createORU_R01 } from '@campfhir/hl7/builders/v2.5.1';
import { parseORU_R01 } from '@campfhir/hl7/parsers/v2.5.1';

// Per-file — includes types like PatientResult, OrderObservation, ParsedORU_R01
import { createORU_R01, PatientResult } from '@campfhir/hl7/builders/v2.5.1/ORU_R01';
import { parseORU_R01, type ParsedORU_R01 } from '@campfhir/hl7/parsers/v2.5.1/ORU_R01_Parser';

// The message structure itself, as data
import { ORU_R01_STRUCTURE } from '@campfhir/hl7/structures/v2.5.1';
```

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

### Building an ORU^R01 Message

```typescript
import { MSH } from '@campfhir/hl7/segments/v2.5.1/MSH';
import { PID } from '@campfhir/hl7/segments/v2.5.1/PID';
import { PV1 } from '@campfhir/hl7/segments/v2.5.1/PV1';
import { OBR } from '@campfhir/hl7/segments/v2.5.1/OBR';
import { OBX } from '@campfhir/hl7/segments/v2.5.1/OBX';
import { createORU_R01, PatientResult } from '@campfhir/hl7/builders/v2.5.1/ORU_R01';

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
import { parseORU_R01 } from '@campfhir/hl7/parsers/v2.5.1/ORU_R01_Parser';
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
import { NTE } from '@campfhir/hl7/segments/v2.5.1';
import { createORU_R01 } from '@campfhir/hl7/builders/v2.5.1/ORU_R01';

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
is data (`src/structures/<version>/<MSG>.ts`, generated from `codegen/schemas/`). The parser and
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
import { ORU_R01_STRUCTURE } from '@campfhir/hl7/structures/v2.5.1';

// what parseORU_R01 does, given the v2.5.1 segment parsers
const result = parseStructure('ORU_R01', ORU_R01_STRUCTURE, parsers, hl7String);
```

Adding a message therefore means writing its schema (with the source page it was checked
against), not a parser.

### Version Organization

Segments, builders, and parsers are organized by HL7 version (`v2.3`, `v2.5.1`), supporting:
- Multiple versions simultaneously
- Adding new versions without affecting existing code
- Version-specific business logic

## Extending the Library

### Adding a New Segment

1. Create a file in `src/segments/v2.5.1/<SEGMENT>.ts`
2. Extend `BaseSegment` with typed setters/getters

### Adding a New Message Type

1. Describe the message in `codegen/schemas/<version>/<MSG_TYPE>.ts` (see [codegen/README.md](codegen/README.md))
2. Register it in that version's `version.ts` and run `pnpm codegen && pnpm barrels && pnpm exports`
3. Add tests for the generated `create<MSG_TYPE>` and `parse<MSG_TYPE>`

### Adding a New HL7 Version

1. Add `codegen/schemas/v2.X/version.ts` naming its base version and the messages whose structure changed
2. Hand-write the segments the version introduces in `src/segments/v2.X/`; everything else is generated or mirrored from the base version

## Design Decisions

### Modular Architecture
Small, focused files organized by version make the codebase easy to navigate, test, extend, and maintain at scale.

### Type Safety
TypeScript provides compile-time validation, better IDE support, and self-documenting interfaces.

## License

MIT
