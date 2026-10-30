# X12 EDI Builder & Parser

A TypeScript library for building and parsing X12 EDI interchanges, published as
[`@campfhir/x12`](https://www.npmjs.com/package/@campfhir/x12). It is one package of the
[kindling](../../README.md) repository, with the same shape as [`@campfhir/hl7`](../hl7/README.md):
fluent segment classes, `Result` values instead of exceptions, an asynchronous `parse()` in its own
entry point, and output that round-trips.

**Status: 0.1.** The syntax and the envelopes (ISA, GS, ST, SE, GE, IEA) are typed and checked, and
five transaction sets are typed against their implementation guides: the 270 and 271 eligibility
inquiry and response (005010X279A1), the 837 professional claim (005010X222A1, which also reads
005010X222), the 835 claim payment/advice (005010X221A1) and the 999 implementation acknowledgment
(005010X231A1), with `acknowledge()` to answer an interchange with a 999. Other transaction sets
parse as lists of segments. See [ROADMAP.md](ROADMAP.md).

## Parsing

```typescript
import { parse } from '@campfhir/x12/parse';

const result = await parse(x12String);
if (!result.ok) throw new Error(result.err.message); // "transaction set 0001 has no SE segment", …

const { header, functionalGroups, warnings } = result.val;
header.getSenderId();                                 // ISA06, without its padding
for (const group of functionalGroups) {
  group.header.getVersion();                          // GS08: "005010X279A1"
  for (const set of group.transactionSets) {
    set.header.getTransactionSetIdentifierCode();     // ST01: "270"
    for (const segment of set.segments) {
      segment.id;                                     // "NM1"
      segment.get(3);                                 // NM103
      segment.getComponent(1, 2);                     // the second component of element 01
      segment.getRepetitions(2);                      // every repetition of element 02
    }
  }
}
console.warn(warnings); // ["SE01 of transaction set 0001 (at segment 7) counts 4, the interchange holds 5"]
```

The delimiters are read from the ISA, so any element separator, repetition separator (ISA11),
component separator (ISA16) and segment terminator work; line breaks after the terminators are
ignored. In version 00401 and earlier ISA11 is the standards identifier `U`, and the interchange
has no repetition separator.

`parse()` fails for a structure it cannot group: no ISA, an ST outside a GS, a missing SE, GE or
IEA, a segment outside a transaction set, or anything after IEA. Trailer counts (SE01, GE01, IEA01),
control numbers that do not match their header (SE02, GE02, IEA02) and an ST03 other than GS08 are
reported in `warnings`, as `@campfhir/hl7`'s `parseBatch()` reports BTS and FTS counts.

`identifyInterchange()` (from the root) reads the ISA and the GS08, ST01 and ST03 of every
transaction set without grouping, to route an interchange before parsing it.

## Typed transaction sets

`parse()` reads each transaction set of a guide it knows (`SUPPORTED_GUIDES`) against that guide:
ST03, or GS08 when ST03 is absent, picks the guide, ST01 the transaction set, and the guide's
module loads the first time one of its transaction sets is parsed. The result is in `parsed`, and
`transactionSet` narrows `value` to that transaction set's loops and segments:

```typescript
import { parse } from '@campfhir/x12/parse';

const result = await parse(x12String);
for (const group of result.val!.functionalGroups) {
  for (const set of group.transactionSets) {
    if (!set.parsed) continue;                        // a transaction set this release does not type
    if (!set.parsed.ok) {                             // it does not fit its guide; the interchange still parsed
      console.error(set.parsed.err.message, set.parsed.err.meta);
      // "270 loop 2000C must contain loop 2100C (Subscriber Name, opened by NM1 (NM101 IL))"
      // { problem: 'missing', segmentPosition: 9, segment: 'NM1', loop: '2100C' }
      continue;
    }
    if (set.parsed.val.transactionSet === '271') {
      for (const source of set.parsed.val.value.informationSources) {           // 2000A
        for (const receiver of source.informationReceivers) {                   // 2000B
          for (const subscriber of receiver.subscribers) {                      // 2000C
            const { name, eligibilityBenefits } = subscriber.subscriberName;    // 2100C, NM1 as an NM1
            for (const { benefit, dates, relatedEntities } of eligibilityBenefits) { // 2110C
              benefit.getInformationCode();                                     // EB01
              benefit.getServiceTypeCodes();                                    // EB03, every repetition
            }
          }
        }
      }
    }
  }
}
```

Loops are named after what they hold (`informationSources`, `subscriberName`, `eligibilityBenefits`,
`relatedEntities`), segments likewise (`name`, `traceNumbers`, `demographicInformation`), and a
repeating loop or segment is always an array. Segments that share an ID are told apart by their
qualifier, as the guide does: NM101 (`PR`, `IL`, `03`, …), HL03 (`20` to `23`), AMT01, CTX01. The
parsed types are derived from each guide's structure, so they cannot drift from it.

The segments whose element tables are public have classes with named setters and getters: BHT,
HL, TRN, NM1, EQ, EB, AAA, LS, LE (`@campfhir/x12/005010X279A1`) and AK1, AK2, IK3, CTX, IK4, IK5,
AK9 with their code lists (`@campfhir/x12/005010X231A1`), SBR, PAT, CLM, SV1, SVD, LIN, CTP
(`@campfhir/x12/005010X222A1`) and BPR, N1, LX, CLP, CAS, SVC, PLB (`@campfhir/x12/005010X221A1`).
The others (REF, DTP, DMG, N3, N4, PER, …) are generic segments, read with `get(n)`.

The guides split one position of the base standard into named uses told apart by their qualifiers:
the 837's fourteen REF and sixteen DTP uses of the claim, its 2310A–F provider loops, the 835's NM1
uses of the claim. Senders may send such uses in any order, so the parser takes them in any order,
each into its own property (`claim.priorAuthorization`, `claim.renderingProvider`), and writes them
back in the guide's order. `unordered()` in a schema says so.

A transaction set that departs from its guide does not fail the interchange: its `parsed` carries
the error, with the position of the segment in the transaction set (ST is 1), the loop and whether
a segment is `missing` or `unexpected`. Repeats past the guide's maximum are `warnings`.

### Building a 270

```typescript
import { X270, BHT, HL, NM1, TRN, EQ } from '@campfhir/x12/005010X279A1';

const inquiry = X270.create('0001', {                 // ST*270*0001*005010X279A1, then the body in the guide's order
  beginningOfHierarchicalTransaction: new BHT().hierarchicalStructureCode('0022').transactionSetPurposeCode('13').dateTime(new Date()),
  informationSources: [{
    hierarchicalLevel: new HL().hierarchicalIdNumber(1).hierarchicalLevelCode('20').hierarchicalChildCode('1'),
    informationSourceName: { name: new NM1().entityIdentifierCode('PR').organization('ACME HEALTH PLAN').identification('PI', '99999') },
    informationReceivers: [{
      hierarchicalLevel: new HL().hierarchicalIdNumber(2).hierarchicalParentIdNumber(1).hierarchicalLevelCode('21').hierarchicalChildCode('1'),
      informationReceiverName: { name: new NM1().entityIdentifierCode('1P').organization('RIVERSIDE FAMILY PRACTICE').identification('XX', '1234567893') },
      subscribers: [{
        hierarchicalLevel: new HL().hierarchicalIdNumber(3).hierarchicalParentIdNumber(2).hierarchicalLevelCode('22').hierarchicalChildCode('0'),
        traceNumbers: [new TRN().traceTypeCode('1').referenceIdentification('TRACE1').originatingCompanyIdentifier('1000000001')],
        subscriberName: {
          name: new NM1().entityIdentifierCode('IL').person({ last: 'DOE', first: 'JANE' }).identification('MI', 'W000000001'),
          eligibilityInquiries: [{ inquiry: new EQ().serviceTypeCode('30') }],
        },
      }],
    }],
  }],
});
// encodeInterchange({ header, functionalGroups: [{ header: gs, transactionSets: [inquiry] }] })
```

`X270.verify(input)` lists what is missing; `create()` throws with that list. A parsed `value` is a
valid input, so a parsed transaction set can be edited and rebuilt.

### Answering with a 999

```typescript
import { acknowledge } from '@campfhir/x12/005010X231A1';

const parsed = await parse(x12String);
const acks = acknowledge(parsed.val!);                // one 999 per functional group
// encodeInterchange({ header, functionalGroups: [{ header: new GS().functionalIdentifierCode('FA')
//   .versionReleaseIndustryIdentifierCode('005010X231A1')…, transactionSets: acks }] })
```

`acknowledge()` reports what `parse()` checks: the envelope (SE01, SE02, GE01, GE02) and, for a typed
transaction set, the guide's loops and segments (IK3 with IK304 `3` for a missing segment, `2` for an
unexpected one). It does not check elements (IK4). That mapping is this library's choice; see
`src/005010X231A1/acknowledge.ts`.

## Building

```typescript
import { ISA, GS, ST, GenericSegment, encodeInterchange } from '@campfhir/x12';

const wire = encodeInterchange({
  header: new ISA()
    .sender('ZZ', 'SUBMITTERID')
    .receiver('ZZ', 'CMS')
    .interchangeDateTime(new Date())
    .interchangeControlNumber(1)       // zero padded to nine digits
    .usageIndicator('T'),
  functionalGroups: [{
    header: new GS()
      .functionalIdentifierCode('HS')
      .applicationSenderCode('SUBMITTERID')
      .applicationReceiverCode('CMS')
      .dateTime(new Date())
      .groupControlNumber(1)
      .versionReleaseIndustryIdentifierCode('005010X279A1'),
    transactionSets: [{
      header: new ST().transactionSetIdentifierCode('270').transactionSetControlNumber('0001').implementationConventionReference('005010X279A1'),
      segments: [
        new GenericSegment('BHT').element(1, '0022').element(2, '13').element(3, 'TRACE0001'),
        new GenericSegment('HI').repeating(1, ['ABK', 'J450'], ['ABF', 'R05']), // HI*ABK:J450^ABF:R05
      ],
    }],
  }],
}, { lineBreak: '\n' });
```

SE, GE and IEA are computed when left out (counts and the header's control number). The ISA is
written fixed length, each element padded to its width, and announces the delimiters it is encoded
with (`options.delimiters`, default `* ^ : ~`). A segment drops its trailing empty elements, as X12
requires, so an input that carries them does not round-trip byte for byte.

## Testing

```bash
pnpm test             # unit tests
pnpm fixtures:fetch   # download X12's published examples (https://x12.org/examples) for src/examples.test.ts
```

`src/examples.test.ts` parses every example X12 publishes for the guides this package types, and
checks that each reads typed without a structure error or a warning and encodes back to what was
read. Five of them depart from their guide as the public sources give it (an 835 1000B without its
required N4, short SE01 counts, an 837P CR3 out of order); `fixtures/x12org-expectations.json`
names each with the error it must produce and why. X12's terms do not allow reproducing or recreating its examples
(https://x12.org/examples/disclaimers), so they are downloaded into the uncommitted
`fixtures/external/` and the test is skipped without them; the repository holds only the links, in
`scripts/fetch-examples.mjs`. The other tests use fixtures written for this package.

## Sources

X12's implementation guides are sold by X12, so the facts here come from free public sources: CMS
and Medicare contractor companion guides (above all the CMS 270/271 4010A1 → 5010A1 crosswalk), state
Medicaid companion guides, X12's published examples and requests for interpretation. Every element,
loop, usage, repeat and the disagreements between the sources are in
[docs/validation](docs/validation): [the envelope](docs/validation/005010-envelope-ledger.md),
[270/271](docs/validation/005010X279A1-ledger.md), [837P](docs/validation/005010X222A1-ledger.md),
[835](docs/validation/005010X221A1-ledger.md) and [999](docs/validation/005010X231A1-ledger.md).
What no public source confirms is left out rather than guessed: the 999's maximum uses and loop
repeats, most code meanings, and the element tables of the segments that stay generic. Where the
sources disagree on a usage, the less strict reading is kept and the choice recorded in the ledger.
