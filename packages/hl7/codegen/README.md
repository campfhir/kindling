# codegen

Internal build tool that generates the HL7 message code (structures, parsers and builders) and the
per-version segment wrappers from the schemas in `schemas/`. Segments themselves are hand-written.

## Usage

```sh
pnpm codegen           # generate everything
pnpm codegen --dry-run # print what would be written without touching files
pnpm barrels           # regenerate the index.ts barrels
pnpm exports           # regenerate the package.json "exports" map
```

After changing a schema run all three (`pnpm codegen && pnpm barrels && pnpm exports`); CI fails
if the committed output drifts (`pnpm codegen:check`).

## How it works

A message is described once, as the standard's message table reads, by a `MessageSchema`
(`src/types/schema.ts`): an ordered list of segments, choices (`<OBR|RQD|...>`) and groups, each
required or optional, repeating or not. From every message of every registered version codegen
writes three modules:

| Module | Contents |
| --- | --- |
| `src/structures/<v>/<MSG>.ts` | `<MSG>_STRUCTURE: StructureItem[]` — the structure as data |
| `src/parsers/<v>/<MSG>_Parser.ts` | `Parsed<MSG>` and one `Parsed*` interface per group, `<MSG>_Parser`, `parse<MSG>()` |
| `src/builders/<v>/<MSG>.ts` | one `*Group` interface per group, `<MSG>Options`, the `<MSG>` builder class, `create<MSG>()` |

Parsers and builders contain no message-specific logic. They hand the structure and the segment
classes of their version to the engine in `src/types/structure.ts`:

- `parseStructure` walks the raw segments against the structure like a recursive-descent parser.
  A repeating group starts a new instance whenever the next segment can begin one; a required item
  that is missing, or a known segment where the structure does not allow it, is an error; segments
  the structure never mentions (Z segments) are skipped with a warning.
- `verifyStructure` checks a builder's input (required items, min/max occurrences, choices,
  unknown properties) and `encodeStructure` writes it out in structure order.

Every generated file carries the `// @generated message` marker. Codegen regenerates marked files
and deletes marked files no schema produces any more; a file without the marker is hand-written and
is left alone (and logged as skipped), which is how a message can be customised when the generated
one does not fit.

### Naming

Property names come from the structure and read as what the segment holds, not its code. The
`SEGMENT_NAMES` table in `src/types/schema.ts` gives every segment a singular and a plural name
(`PID` → `patient`, `NTE` → `note`/`notes`, `DG1` → `diagnosis`/`diagnoses`, `OBR` →
`observationRequest`, `MSH` → `header`); a segment appearing once at a level uses the singular,
a repeating one the plural. Segments missing from the table fall back to their code (`zpd`,
`zpdList`). A group is camel-cased and pluralised when it repeats (`PATIENT_RESULT` →
`patientResults`), a choice is `segment`. Names only have to be unique within one level, so the
same segment can be `visit` in one message and sit inside a `visits` group in another; override
with `as` when two items at one level would clash (`optList("ROL", { as: "visitRoles" })`,
`optList("NTE", { as: "patientNotes" })`) or to keep a specific name (`as: "insuranceGroups"`).
Codegen refuses a structure with duplicate names at one level. Group type names default to
`Parsed<PascalCase>` and `<PascalCase>Group`; override them with `exportTypeName` and
`builderTypeName`.

A group marked `inline: true` contributes its fields to the enclosing object instead of nesting
them (`PATIENT: PID [PD1] [VISIT: PV1 [PV2]]` reads as `patient`, `patientDemographics`, `visit`,
`visitDetails`) while still
parsing and verifying as a unit.

### Builders

Every builder has the same shape: the required top-level items are constructor parameters, in
structure order, followed by `options` (the optional ones) and `encoding`:

```ts
createADT_A01(msh, evn, pid, pv1, { nextOfKin: [nk1], insuranceGroups: [{ insurance: in1, insuranceDetails: in2 }] });
createORU_R01(msh, [{ patient: pid, orderObservations: [{ observationRequest: obr, observations: [{ observation: obx }] }] }]);
createACK(msh, msa, { error: err });
```

`verify()` returns `{ valid, errors }`, `encode()` throws when invalid, and `toInput()` gives the
object the two work on. A parsed message has the same shape as the builder input, so
parse → edit → rebuild works without conversion.

### Versions

`schemas/<version>/version.ts` registers a `VersionSchema`; `generate.ts` lists them in order,
bases before derived versions.

- **Base version** (`v2.3`): hand-written segments; every message generated.
- **Derived version** (`v2.5.1`, `baseVersion` set): a wrapper class is generated for every
  segment its messages use (`segments` lists extra ones), extending the base version's class.
  An existing wrapper file is never overwritten, so 2.5.1-specific fields can be added by hand.
  Every message is generated against these classes.
- **Re-export version** (`reexport: true`: `v2.3.1`, `v2.4`, `v2.5`): the messages it lists are
  generated (against its own segment modules); every other segment, structure, parser and builder
  of the base version is mirrored as `export * from "../<base>/X.ts"`. Segments first introduced
  in the version are hand-written and listed in `ownSegments`.

Events that share a structure (ADT^A02 … reuse ADT^A01) set `baseMessage`; codegen then emits
thin wrappers (a parser subclass, a builder subclass and a structure alias) around the base
message of the same version. The `wrappers()` helper builds such a family from an event list.

## Directory structure

```
codegen/
  schemas/
    helpers.ts         # req/opt/reqList/optList/group/choice, withSft, wrappers, reversion
    v2.3/              # one file per message family + version.ts + index.ts
    v2.3.1/            # re-export version: version.ts only
    v2.4/              # messages that changed in 2.4 (ADT A01 family, BAR, DFT, ORM, VXU)
    v2.5/              # messages that changed in 2.5 (+ SFT, TQ1/TQ2, SPM, ORU^R30 ...)
    v2.5.1/            # re-versions the v2.5 list (nothing changed between 2.5 and 2.5.1)
  generators/
    message.ts         # structure, parser and builder modules (+ baseMessage wrappers)
    segment.ts         # derived-version segment wrapper classes
    reexport.ts        # re-export modules
    fieldPositionTest.ts
  generate.ts          # entry point — registers VERSIONS and runs them
  generate-barrels.ts, generate-package-exports.mjs
  generate-segments.ts, generate-field-position-tests.ts   # segment tooling (see docs/ROADMAP-SEGMENTS.md)
  spec/, validate/     # per-version segment field tables (<version>-segments.json) and their checks
```

## Adding a message

1. Write the schema in `schemas/<version>/<MSG>.ts` with the helpers, citing the source page
   (hl7.org, hl7.eu or hl7-definition.caristix.com) in the doc comment:

   ```ts
   export const ADT_A31_SCHEMA: MessageSchema = {
     messageType: "ADT",
     triggerEvent: "A31",
     version: "2.3",
     structure: [
       req("MSH"), req("EVN"), req("PID"), opt("PD1"), optList("NK1"), req("PV1"),
       group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")]),
     ],
   };
   ```

   Every segment the structure names must have a class in `src/segments/<base version>/`.

2. Add it to that version's `messages` in `version.ts` (and re-version it in the later versions
   whose structure is the same; a version that differs gets its own schema file).

3. `pnpm codegen && pnpm barrels && pnpm exports`, then write tests against the generated
   `create<MSG>` / `parse<MSG>`.

## Adding a version

Create `schemas/vX.Y/version.ts`:

```ts
export const V2_6: VersionSchema = {
  version: "v2.6",
  baseVersion: "v2.5.1",
  reexport: true,            // omit (and list `segments`) for a version with its own segment classes
  ownSegments: [],           // segments first introduced in 2.6, hand-written in src/segments/v2.6/
  segments: [],
  messages: [...],           // only the messages whose structure changed
};
```

Register it in `generate.ts` after its base version and run codegen. Everything the version does
not define is mirrored from its base, so a new version starts complete and is refined message by
message.
