/** Segment Definition. */
export interface SegmentDefinition {
  /** The HL7 segment identifier. */
  name: string;
  /** The required value. */
  required: boolean;
  /** The repeating value. */
  repeating: boolean;
  /** The max occurrences value (repeating items). */
  maxOccurrences?: number;
  /** The minimum number of occurrences of a repeating item (defaults to 1 when required). */
  minOccurrences?: number;
  /**
   * Property name in the parsed result and the builder input. Defaults to the lower-cased
   * segment name, with a `List` suffix when the segment repeats (`pv1`, `nteList`). Set it when
   * the same segment appears twice at one level (`visitRolList`).
   */
  as?: string;
}

/**
 * One of several alternative segments at one position (`<OBR|RQD|RQ1|RXO|ODS|ODT>`). The parsed
 * result and the builder input carry whichever segment was present under `as`.
 */
export interface SegmentChoice {
  /** The alternative segment identifiers. */
  oneOf: string[];
  /** The required value. */
  required: boolean;
  /** Property name in the parsed result and the builder input (defaults to `segment`). */
  as?: string;
}

/** Segment Group. */
export interface SegmentGroup {
  /** The HL7 segment identifier. */
  name: string;
  /** The required value. */
  required: boolean;
  /** The repeating value. */
  repeating: boolean;
  /** The max occurrences value (repeating groups). */
  maxOccurrences?: number;
  /** The minimum number of occurrences of a repeating group (defaults to 1 when required). */
  minOccurrences?: number;
  /** The segments value. */
  segments: StructureItem[];
  /**
   * Merge the fields of this (non-repeating) group into the enclosing object instead of nesting
   * them under their own property, so `PATIENT: PID [PD1] [VISIT: PV1 [PV2]]` reads as
   * `pid`, `pd1`, `pv1`, `pv2`. The group still parses and verifies as a unit.
   */
  inline?: boolean;
  /** Override the generated Parsed* type name (defaults to Parsed + PascalCase of name) */
  exportTypeName?: string;
  /**
   * Override the generated builder input type name (defaults to the Parsed* name without
   * `Parsed`, with a `Group` suffix: `ParsedInsuranceGroup` -> `InsuranceGroup`).
   */
  builderTypeName?: string;
  /**
   * Property name in the parsed result and the builder input. Defaults to the camel-cased group
   * name, pluralised with `s` when the group repeats (`patientResults`, `visit`).
   */
  as?: string;
}

/** An item of a message structure: a segment, a choice of segments, or a group. */
export type StructureItem = SegmentDefinition | SegmentChoice | SegmentGroup;

/** Message Schema. */
export interface MessageSchema {
  /** The message type value. */
  messageType: string;
  /** The trigger event value. Omitted for messages without one, such as the general ACK. */
  triggerEvent?: string;
  /** The version value. */
  version: string;
  /** The structure value. */
  structure: StructureItem[];
  /**
   * When set, codegen generates a thin wrapper (parser subclass + builder re-export)
   * instead of a full stub. Value is the base message name, e.g. "ADT_A01".
   */
  baseMessage?: string;
}

/**
 * Version-level schema used to drive code generation.
 * `segments` is the full set of segment wrappers to generate for this version.
 * `messages` are the message schemas whose parsers and builders should be generated.
 * `baseVersion` is omitted for base versions (e.g. v2.3) that have hand-written segments.
 */
export interface VersionSchema {
  version: string;
  baseVersion?: string;
  /**
   * Re-export version: every segment, parser and builder of `baseVersion` is
   * re-exported unchanged (`export * from "../<baseVersion>/X.ts"`). Use for
   * intermediate releases (e.g. v2.3.1) that are structurally identical to the
   * version before them. `segments` and `messages` are ignored.
   */
  reexport?: boolean;
  /**
   * Segments first introduced in this version. They are hand-written classes
   * (like a base version's segments) that codegen never overwrites; later
   * re-export versions pick them up automatically.
   */
  ownSegments?: string[];
  segments: string[];
  messages: MessageSchema[];
}

/** Is Segment Group. */
export function isSegmentGroup(item: StructureItem): item is SegmentGroup {
  return "segments" in item;
}

/** Is Segment Choice. */
export function isSegmentChoice(item: StructureItem): item is SegmentChoice {
  return "oneOf" in item;
}

/** Lower-camel-cases an upper-snake-case group name (`PATIENT_RESULT` -> `patientResult`). */
export function camelCase(name: string): string {
  return name
    .toLowerCase()
    .split("_")
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join("");
}

/** Upper-camel-cases an upper-snake-case group name (`PATIENT_RESULT` -> `PatientResult`). */
export function pascalCase(name: string): string {
  const c = camelCase(name);
  return c.charAt(0).toUpperCase() + c.slice(1);
}

/** Property name of a structure item in parsed results and builder inputs. */
export function itemField(item: StructureItem): string {
  if (item.as) return item.as;
  if (isSegmentChoice(item)) return "segment";
  if (isSegmentGroup(item)) {
    const base = camelCase(item.name);
    return item.repeating && !base.endsWith("s") ? `${base}s` : base;
  }
  const base = item.name.toLowerCase();
  return item.repeating ? `${base}List` : base;
}

/** Name of the generated `Parsed*` type of a group. */
export function parsedTypeName(group: SegmentGroup): string {
  return group.exportTypeName ?? `Parsed${pascalCase(group.name)}`;
}

/** Name of the generated builder input type of a group. */
export function builderTypeName(group: SegmentGroup): string {
  if (group.builderTypeName) return group.builderTypeName;
  const base = parsedTypeName(group).replace(/^Parsed/, "");
  return base.endsWith("Group") ? base : `${base}Group`;
}

/** Segment names that can start an instance of the item (the leading items up to the first required one). */
export function firstSegments(item: StructureItem): string[] {
  if (isSegmentChoice(item)) return [...item.oneOf];
  if (!isSegmentGroup(item)) return [item.name];
  const out: string[] = [];
  for (const child of item.segments) {
    out.push(...firstSegments(child));
    if (isRequired(child)) break;
  }
  return out;
}

/** Does the item require at least one segment to be present? (A group of only optional items does not.) */
export function isRequired(item: StructureItem): boolean {
  if (!item.required) return false;
  if (!isSegmentGroup(item)) return true;
  return item.segments.some(isRequired);
}

/** Every segment name used anywhere in the items. */
export function segmentNames(items: StructureItem[]): string[] {
  const seen = new Set<string>();
  const walk = (list: StructureItem[]) => {
    for (const item of list) {
      if (isSegmentChoice(item)) item.oneOf.forEach((n) => seen.add(n));
      else if (isSegmentGroup(item)) walk(item.segments);
      else seen.add(item.name);
    }
  };
  walk(items);
  return [...seen];
}
