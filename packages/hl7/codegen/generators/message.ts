/**
 * Structure-driven message generators.
 *
 * A `MessageSchema` describes a message as the standard's message table does: an ordered list of
 * segments, choices and groups. From it, three modules are generated per version:
 *
 * - `src/structures/<v>/<MSG>.ts` — the structure as data (`<MSG>_STRUCTURE`)
 * - `src/parsers/<v>/<MSG>_Parser.ts` — typed `Parsed*` interfaces and a parser class that hands
 *   the structure and this version's segment classes to the engine in `src/types/structure.ts`
 * - `src/builders/<v>/<MSG>.ts` — typed group interfaces, an options interface and a builder
 *   class whose `verify()` and `encode()` walk the same structure
 *
 * A schema with `baseMessage` (ADT^A02 reusing ADT^A01, ...) generates thin wrappers around the
 * base message's modules of the same version instead.
 */
import {
  type MessageSchema,
  type SegmentGroup,
  type StructureItem,
  builderTypeName,
  isSegmentChoice,
  isSegmentGroup,
  itemField,
  parsedTypeName,
  segmentNames,
} from "../../src/types/schema.ts";

/** Marker line identifying a generated message module; codegen regenerates (and never skips) files carrying it. */
export const MESSAGE_MARKER = "// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`";

/** "ADT_A01" for ADT^A01, or just "ACK" for messages with no trigger event. */
export function messageName(schema: Pick<MessageSchema, "messageType" | "triggerEvent">): string {
  return schema.triggerEvent ? `${schema.messageType}_${schema.triggerEvent}` : schema.messageType;
}

/** "ADT^A01" for display. */
function messageLabel(schema: MessageSchema): string {
  return schema.triggerEvent ? `${schema.messageType}^${schema.triggerEvent}` : schema.messageType;
}

/** "HL7 v2.3" from a directory name "v2.3". */
const versionLabel = (version: string) => `HL7 ${version}`;

/** Wraps a structure item's name in the standard's optionality/repetition brackets. */
function bracket(item: StructureItem, inner: string): string {
  const rep = item.repeating ? `{${inner}}` : inner;
  return item.required ? rep : `[${rep}]`;
}

/** Renders a structure the way the standard's message tables do: `MSH EVN PID [PD1] [{NK1}] ...`. */
export function describeStructure(items: StructureItem[]): string {
  return items
    .map((item) => {
      if (isSegmentChoice(item)) return bracket(item, `<${item.oneOf.join("|")}>`);
      if (isSegmentGroup(item)) return bracket(item, ` ${item.name}: ${describeStructure(item.segments)} `);
      return bracket(item, item.name);
    })
    .join(" ");
}

/** Module doc comment shared by the generated files. */
function moduleDoc(what: string, schema: MessageSchema, version: string, extra: string[] = []): string {
  const lines = [
    `/**`,
    ` * ${what} for ${messageLabel(schema)} messages (${versionLabel(version)}).`,
    ` *`,
    ` * Structure: ${describeStructure(schema.structure)}`,
    ...extra.map((l) => ` * ${l}`),
    ` *`,
    ` * @module`,
    ` */`,
    MESSAGE_MARKER,
  ];
  return lines.join("\n") + "\n";
}

// ── Structure analysis ────────────────────────────────────────────────────────

/** A property of a generated interface. */
interface Field {
  name: string;
  tsType: string;
  optional: boolean;
  doc: string;
}

/** The group interfaces a message needs (non-inline groups, in order of appearance). */
export function collectGroups(items: StructureItem[], out: SegmentGroup[] = []): SegmentGroup[] {
  for (const item of items) {
    if (!isSegmentGroup(item)) continue;
    if (!item.inline) out.push(item);
    collectGroups(item.segments, out);
  }
  return out;
}

/**
 * Checks the structure is generatable: unique property names at every level (inline groups
 * contribute their fields to the enclosing level), unique group type names, inline groups that
 * do not repeat, and a leading MSH.
 */
export function validateStructure(schema: MessageSchema): void {
  const msg = messageName(schema);
  const first = schema.structure[0];
  if (!first || isSegmentChoice(first) || isSegmentGroup(first) || first.name !== "MSH") {
    throw new Error(`${msg}: the structure must start with MSH`);
  }
  const typeNames = new Set<string>();
  for (const group of collectGroups(schema.structure)) {
    for (const name of [parsedTypeName(group), builderTypeName(group)]) {
      if (typeNames.has(name)) throw new Error(`${msg}: two groups generate the type ${name}; set exportTypeName/builderTypeName`);
      typeNames.add(name);
    }
  }
  const checkLevel = (items: StructureItem[], where: string, seen = new Set<string>()) => {
    for (const item of items) {
      if (isSegmentGroup(item) && item.inline) {
        if (item.repeating) throw new Error(`${msg}: inline group ${item.name} must not repeat`);
        checkLevel(item.segments, `${where}/${item.name}`, seen);
        continue;
      }
      const field = itemField(item);
      if (seen.has(field)) throw new Error(`${msg}: property "${field}" is used twice in ${where}; set \`as\` on one of the items`);
      seen.add(field);
      if (isSegmentGroup(item)) checkLevel(item.segments, `${where}/${item.name}`);
    }
  };
  checkLevel(schema.structure, msg);
}

/** Human description of a field for its doc comment. */
function fieldDoc(item: StructureItem): string {
  if (isSegmentChoice(item)) return `One of ${item.oneOf.join(", ")}.`;
  if (isSegmentGroup(item)) return `The ${item.name.replace(/_/g, " ")} group${item.repeating ? "s" : ""}.`;
  return `The ${item.name} segment${item.repeating ? "s" : ""}.`;
}

/**
 * The properties of one structure level. Optional items are optional properties, in parsed
 * results as well as builder inputs, so a parsed message (or any part of it) is a valid builder
 * input and can be edited freely. The parser still fills every repeating item with an array.
 */
function levelFields(
  items: StructureItem[],
  groupType: (g: SegmentGroup) => string,
  forceOptional = false,
  out: Field[] = [],
): Field[] {
  for (const item of items) {
    if (isSegmentGroup(item) && item.inline) {
      levelFields(item.segments, groupType, forceOptional || !item.required, out);
      continue;
    }
    const optionalItem = forceOptional || !item.required;
    let base: string;
    if (isSegmentChoice(item)) base = item.oneOf.join(" | ");
    else if (isSegmentGroup(item)) base = groupType(item);
    else base = item.name;
    const repeating = !isSegmentChoice(item) && item.repeating;
    out.push({
      name: itemField(item),
      tsType: repeating ? `${base}[]` : base,
      optional: optionalItem,
      doc: fieldDoc(item),
    });
  }
  return out;
}

function renderInterface(name: string, doc: string, fields: Field[], extendsClause = ""): string {
  const body = fields.map((f) => `  /** ${f.doc} */\n  ${f.name}${f.optional ? "?" : ""}: ${f.tsType};`).join("\n");
  return `/** ${doc} */\nexport interface ${name}${extendsClause} {\n${body}\n}\n`;
}

/** Segment names used by the structure, MSH first, in order of first appearance. */
function orderedSegments(items: StructureItem[]): string[] {
  const names = segmentNames(items).filter((n) => n !== "MSH");
  return ["MSH", ...names];
}

/** The top-level items a builder takes positionally (required ones, MSH first), and the optional rest. */
function splitTopLevel(schema: MessageSchema): { positional: StructureItem[]; optional: StructureItem[] } {
  const positional: StructureItem[] = [];
  const optional: StructureItem[] = [];
  for (const item of schema.structure) {
    if (item.required) positional.push(item);
    else optional.push(item);
  }
  return { positional, optional };
}

/** One constructor parameter of a generated builder. */
interface Param {
  name: string;
  tsType: string;
  /** Generic type parameter declared for this param (single positional segments only). */
  generic?: { name: string; bound: string };
}

function builderParams(schema: MessageSchema): Param[] {
  const params: Param[] = [];
  const generics = new Set<string>();
  for (const item of splitTopLevel(schema).positional) {
    const name = itemField(item);
    if (isSegmentChoice(item)) {
      params.push({ name, tsType: item.oneOf.join(" | ") });
    } else if (isSegmentGroup(item)) {
      if (item.inline) throw new Error(`${messageName(schema)}: a required inline group (${item.name}) is not supported at the top level`);
      params.push({ name, tsType: item.repeating ? `${builderTypeName(item)}[]` : builderTypeName(item) });
    } else if (item.repeating) {
      params.push({ name, tsType: `${item.name}[]` });
    } else {
      const generic = `T${item.name}`;
      if (generics.has(generic)) params.push({ name, tsType: item.name });
      else {
        generics.add(generic);
        params.push({ name, tsType: generic, generic: { name: generic, bound: item.name } });
      }
    }
  }
  return params;
}

const genericDecl = (params: Param[]) => {
  const g = params.filter((p) => p.generic).map((p) => `${p.generic!.name} extends ${p.generic!.bound} = ${p.generic!.bound}`);
  return g.length ? `<${g.join(", ")}>` : "";
};
const genericArgs = (params: Param[]) => {
  const g = params.filter((p) => p.generic).map((p) => p.generic!.name);
  return g.length ? `<${g.join(", ")}>` : "";
};

// ── Structure module ──────────────────────────────────────────────────────────

const INDENT = "  ";

function renderItem(item: StructureItem, depth: number): string {
  const pad = INDENT.repeat(depth);
  const inner = INDENT.repeat(depth + 1);
  const parts: string[] = [];
  if (isSegmentChoice(item)) {
    parts.push(`oneOf: [${item.oneOf.map((n) => `"${n}"`).join(", ")}]`);
    parts.push(`required: ${item.required}`);
    if (item.as) parts.push(`as: "${item.as}"`);
    return `${pad}{ ${parts.join(", ")} }`;
  }
  parts.push(`name: "${item.name}"`, `required: ${item.required}`, `repeating: ${item.repeating}`);
  if (item.minOccurrences !== undefined) parts.push(`minOccurrences: ${item.minOccurrences}`);
  if (item.maxOccurrences !== undefined) parts.push(`maxOccurrences: ${item.maxOccurrences}`);
  if (isSegmentGroup(item) && item.inline) parts.push("inline: true");
  if (item.as) parts.push(`as: "${item.as}"`);
  if (!isSegmentGroup(item)) return `${pad}{ ${parts.join(", ")} }`;
  const children = item.segments.map((c) => renderItem(c, depth + 2)).join(",\n");
  return [
    `${pad}{`,
    ...parts.map((p) => `${inner}${p},`),
    `${inner}segments: [`,
    `${children},`,
    `${inner}],`,
    `${pad}}`,
  ].join("\n");
}

/** Generates `src/structures/<version>/<MSG>.ts`. */
export function generateStructureModule(schema: MessageSchema, version: string): string {
  const name = messageName(schema);
  const items = schema.structure.map((item) => renderItem(item, 1)).join(",\n");
  return `${moduleDoc("Message structure", schema, version)}import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ${messageLabel(schema)} (${versionLabel(version)}), in order. */
export const ${name}_STRUCTURE: StructureItem[] = [
${items},
];
`;
}

/** Generates a structure module that aliases the base message's structure. */
export function generateStructureWrapper(schema: MessageSchema, version: string): string {
  const name = messageName(schema);
  return `${moduleDoc("Message structure", schema, version, [`Shares the ${schema.baseMessage!.replace("_", "^")} structure.`])}export { ${schema.baseMessage}_STRUCTURE as ${name}_STRUCTURE } from "./${schema.baseMessage}.ts";
`;
}

// ── Parser module ─────────────────────────────────────────────────────────────

/** Generates `src/parsers/<version>/<MSG>_Parser.ts`. */
export function generateMessageParser(schema: MessageSchema, version: string): string {
  validateStructure(schema);
  const name = messageName(schema);
  const label = messageLabel(schema);
  const segments = orderedSegments(schema.structure);
  const groups = collectGroups(schema.structure);

  const imports = [
    `import type { Result } from "../../types/result.ts";`,
    `import type { StructureItem } from "../../types/schema.ts";`,
    `import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";`,
    `import { ${name}_STRUCTURE } from "../../structures/${version}/${name}.ts";`,
    ...segments.map((s) => `import { ${s} } from "../../segments/${version}/${s}.ts";`),
  ].join("\n");

  const groupInterfaces = groups
    .map((g) =>
      renderInterface(
        parsedTypeName(g),
        `The ${g.name.replace(/_/g, " ")} group of a parsed ${label} (${versionLabel(version)}) message.`,
        levelFields(g.segments, parsedTypeName),
      ),
    )
    .join("\n");

  const topFields = levelFields(schema.structure.slice(1), parsedTypeName);
  const parsedInterface = renderInterface(
    `Parsed${name}`,
    `Structured result of parsing an HL7 ${label} (${versionLabel(version)}) message.`,
    [{ name: itemField(schema.structure[0]), tsType: "MSH", optional: false, doc: "The MSH segment." }, ...topFields],
    " extends ParsedMessageBase",
  );

  const parsers = segments
    .map((s) => (s === "MSH" ? `  MSH: (s) => MSH.parse(s),` : `  ${s}: (s, e) => ${s}.parse(s, e),`))
    .join("\n");

  return `${moduleDoc("Parser", schema, version)}${imports}

${groupInterfaces}${groupInterfaces ? "\n" : ""}${parsedInterface}
/** The segment parsers of ${label} (${versionLabel(version)}). */
const PARSERS: SegmentParsers = {
${parsers}
};

/** Parser for HL7 ${label} (${versionLabel(version)}) messages. */
export class ${name}_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "${name}";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ${name}_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<Parsed${name}> {
    return parseStructure<Parsed${name}>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ${label} (${versionLabel(version)}) message string into a structured result. */
export function parse${name}(messageString: string): Result<Parsed${name}> {
  return new ${name}_Parser().parse(messageString);
}
`;
}

/** Generates a parser module that wraps the base message's parser under this event's name. */
export function generateParserWrapper(schema: MessageSchema, version: string): string {
  const name = messageName(schema);
  const base = schema.baseMessage!;
  const label = messageLabel(schema);
  const groupTypes = collectGroups(schema.structure).map(parsedTypeName);
  const reexport = groupTypes.length ? `export type { ${groupTypes.join(", ")} } from "./${base}_Parser.ts";\n` : "";
  return `${moduleDoc("Parser", schema, version, [`Shares the ${base.replace("_", "^")} structure.`])}import type { Result } from "../../types/result.ts";
import { ${base}_Parser, type Parsed${base} } from "./${base}_Parser.ts";

${reexport}/** Structured result of parsing an HL7 ${label} (${versionLabel(version)}) message. */
export type Parsed${name} = Parsed${base};

/** Parser for HL7 ${label} (${versionLabel(version)}) messages. */
export class ${name}_Parser extends ${base}_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "${name}";
}

/** Parses an HL7 ${label} (${versionLabel(version)}) message string into a structured result. */
export function parse${name}(messageString: string): Result<Parsed${name}> {
  return new ${name}_Parser().parse(messageString);
}
`;
}

// ── Builder module ────────────────────────────────────────────────────────────

/** Generates `src/builders/<version>/<MSG>.ts`. */
export function generateMessageBuilder(schema: MessageSchema, version: string): string {
  validateStructure(schema);
  const name = messageName(schema);
  const label = messageLabel(schema);
  const segments = orderedSegments(schema.structure);
  const groups = collectGroups(schema.structure);
  const params = builderParams(schema);
  const { optional } = splitTopLevel(schema);

  const imports = [
    `import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";`,
    `import type { StructureItem } from "../../types/schema.ts";`,
    `import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";`,
    `import { ${name}_STRUCTURE } from "../../structures/${version}/${name}.ts";`,
    ...segments.map((s) => `import type { ${s} } from "../../segments/${version}/${s}.ts";`),
  ].join("\n");

  const groupInterfaces = groups
    .map((g) =>
      renderInterface(
        builderTypeName(g),
        `The ${g.name.replace(/_/g, " ")} group of an ${label} (${versionLabel(version)}) message being built.`,
        levelFields(g.segments, builderTypeName),
      ),
    )
    .join("\n");

  const optionalFields = levelFields(optional, builderTypeName);
  const optionsDoc = `The optional segments and groups of an ${label} (${versionLabel(version)}) message.`;
  const options = optionalFields.length
    ? renderInterface(`${name}Options`, optionsDoc, optionalFields)
    : `/** ${optionsDoc} The message has none. */\nexport type ${name}Options = Record<string, never>;\n`;

  const ctorParams = [
    ...params.map((p) => `    public ${p.name}: ${p.tsType},`),
    `    public options: ${name}Options = {},`,
    `    protected encoding: EncodingCharacters = DEFAULT_ENCODING,`,
  ].join("\n");
  const fnParams = [
    ...params.map((p) => `  ${p.name}: ${p.tsType},`),
    `  options: ${name}Options = {},`,
    `  encoding: EncodingCharacters = DEFAULT_ENCODING,`,
  ].join("\n");
  const args = [...params.map((p) => p.name), "options", "encoding"].join(", ");
  const inputFields = params.map((p) => `${p.name}: this.${p.name}`).join(", ");

  return `${moduleDoc("Builder", schema, version)}${imports}

${groupInterfaces}${groupInterfaces ? "\n" : ""}${options}
/** Builder for HL7 ${label} (${versionLabel(version)}) messages. */
export class ${name}${genericDecl(params)} {
  /** The message name used in error messages. */
  protected readonly messageName: string = "${name}";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ${name}_STRUCTURE;

  /** Constructor. */
  constructor(
${ctorParams}
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, ${inputFields} };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(\`Cannot encode invalid \${this.messageName} message:\\n\${verification.errors.join("\\n")}\`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 ${label} (${versionLabel(version)}) message. */
export function create${name}${genericDecl(params)}(
${fnParams}
): ${name}${genericArgs(params)} {
  return new ${name}(${args});
}
`;
}

/** Generates a builder module that subclasses the base message's builder under this event's name. */
export function generateBuilderWrapper(schema: MessageSchema, version: string): string {
  const name = messageName(schema);
  const base = schema.baseMessage!;
  const label = messageLabel(schema);
  const params = builderParams(schema);
  const groupTypes = collectGroups(schema.structure).map(builderTypeName);
  // Segment classes the positional parameters mention (generic bounds, repeating segments, choices).
  const positional = splitTopLevel(schema).positional;
  const paramSegments = [...new Set(positional.flatMap((item) => (isSegmentGroup(item) ? [] : isSegmentChoice(item) ? item.oneOf : [item.name])))];
  const segImports = paramSegments.map((s) => `import type { ${s} } from "../../segments/${version}/${s}.ts";`);
  const baseImports = [base, `type ${base}Options`, ...groupTypes.map((t) => `type ${t}`)].join(", ");
  const reexport = groupTypes.length ? `export type { ${groupTypes.join(", ")} };\n` : "";
  const fnParams = [
    ...params.map((p) => `  ${p.name}: ${p.tsType},`),
    `  options: ${name}Options = {},`,
    `  encoding: EncodingCharacters = DEFAULT_ENCODING,`,
  ].join("\n");
  const args = [...params.map((p) => p.name), "options", "encoding"].join(", ");
  return `${moduleDoc("Builder", schema, version, [`Shares the ${base.replace("_", "^")} structure.`])}import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
${segImports.join("\n")}${segImports.length ? "\n" : ""}import { ${baseImports} } from "./${base}.ts";

${reexport}/** The optional segments and groups of an ${label} (${versionLabel(version)}) message. */
export type ${name}Options = ${base}Options;

/** Builder for HL7 ${label} (${versionLabel(version)}) messages. */
export class ${name}${genericDecl(params)} extends ${base}${genericArgs(params)} {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "${name}";
}

/** Builds an HL7 ${label} (${versionLabel(version)}) message. */
export function create${name}${genericDecl(params)}(
${fnParams}
): ${name}${genericArgs(params)} {
  return new ${name}(${args});
}
`;
}
