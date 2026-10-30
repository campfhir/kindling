# PDMP (ASAP) Report Builder & Parser

A TypeScript library for building and parsing ASAP prescription drug monitoring program (PDMP)
dispensation reports, published as [`@campfhir/pdmp`](https://www.npmjs.com/package/@campfhir/pdmp).
It is one package of the [kindling](../../README.md) repository, with the same shape as
[`@campfhir/hl7`](../hl7/README.md): fluent segment classes, `Result` values instead of exceptions,
an asynchronous `parse()` in its own entry point, and output that round-trips.

**Status: 0.1, the generic layer.** The syntax, the envelope (TH, IS, TP, TT) and the loops are
typed and checked; the detail segments (PHA, PAT, DSP, PRE, CDI, AIR) are generic segments for now.
Typed detail segments for ASAP 4.2A and 4.2B come next. See [ROADMAP.md](ROADMAP.md).

## Parsing

```typescript
import { parse } from '@campfhir/pdmp/parse';

const result = await parse(asapString);
if (!result.ok) throw new Error(result.err.message); // "PAT segment at segment 4 is outside of any pharmacy (expected PHA first)", …

const { header, informationSource, pharmacies, warnings } = result.val;
header.getVersion();                                   // TH01: "4.2B"
for (const { pharmacy, patients } of pharmacies) {
  pharmacy.get(1);                                     // PHA01
  for (const { patient, dispensations } of patients) {
    for (const { dispensation, prescriber, compoundIngredients, additionalInformation } of dispensations) {
      dispensation.get(7);                             // DSP07
    }
  }
}
console.warn(warnings); // ["TP01 at segment 9 counts 6 segments, the pharmacy holds 7", "DSP at segment 5 has no PRE segment"]
```

The report is grouped as the state dispenser guides describe it:

```
TH IS { PHA { PAT { DSP [PRE] [CDI…] [AIR…] } } TP } TT
```

The delimiters are read from the TH: the element separator is the character after `TH`, and TH09
is the segment terminator, which then ends the TH too (`…*P**~~`). ASAP has no component or
repetition separator. Line breaks after the terminators are ignored.

`parse()` fails for a structure it cannot group: no TH, no IS (except in a void, TH03 `04`, which is
TH and TT alone), a segment outside its loop, PRE, CDI or AIR out of order, a pharmacy without TP, a
missing TT, or a segment ASAP does not define. TP01 and TT02 counts, a TT01 other than TH02, and a
dispensation without PRE are reported in `warnings`: which elements and segments are required
differs from state to state, so this layer does not enforce it.

`identifyReport()` (from the root) reads the TH and IS without grouping.

## Building

```typescript
import { TH, IS, GenericSegment, encodeReport } from '@campfhir/pdmp';

const wire = encodeReport({
  header: new TH().versionReleaseNumber('4.2B').transactionControlNumber('123456').transactionType('01')
    .creationDateTime(new Date()).fileType('T'),
  informationSource: new IS().uniqueInformationSourceId('7705555555').informationSourceEntityName('PHARMACY NAME'),
  pharmacies: [{
    pharmacy: new GenericSegment('PHA').element(1, '1234567890'),
    patients: [{
      patient: new GenericSegment('PAT').element(7, 'DOE').element(8, 'JANE'),
      dispensations: [{
        dispensation: new GenericSegment('DSP').element(1, '00').element(2, 'RX1'),
        prescriber: new GenericSegment('PRE').element(1, '1234567890'),
      }],
    }],
  }],
}, { lineBreak: '\n' });
```

TP and TT are computed when left out (segment counts and TH02). TH09 is the terminator the report
is encoded with (`options.delimiters`, default `*` and `~`). Every element is written, trailing
empty ones too, so a parsed report encodes exactly as it was read.

## Sources

The ASAP standard is sold by ASAP, so the facts here come from the state PDMP dispenser guides that
reprint its tables (Texas, South Carolina, Alabama, Louisiana, Mississippi, Washington, Tennessee,
Nebraska, Michigan, Montana, Maryland). Every fact is listed with its sources, the printed sample
files and the disagreements between the guides in
[docs/validation/asap-ledger.md](docs/validation/asap-ledger.md).

Not applied, because only some guides state it: the caret `^` as an escape character (Nebraska and
Maryland only), and any per-element requirement codes (the guides mix state rules into them).
