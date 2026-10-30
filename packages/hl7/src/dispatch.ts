/**
 * The message dispatcher behind the root parser: reads MSH-9 (message type) and MSH-12 (version)
 * of one HL7 v2 message, loads the message registry of that version, picks the generated parser of
 * that message and runs it. Each version's registry is imported the first time a message of that
 * version is dispatched, and stays loaded after that. `parse()` of `./parse.ts` adds the batch protocol.
 *
 * ```ts
 * const result = await parseMessage(raw);
 * if (result.ok && result.val.structure === "ADT_A01") {
 *   result.val.parsed.patient; // PID, typed as ParsedADT_A01
 * }
 * ```
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import type { ParsedMessageBase } from "./types/structure.ts";
import { Err } from "./utils/err.ts";
import { identifyMessage, eventTypeCode, SUPPORTED_VERSIONS, type HL7Version, type MessageType, type ParseOptions } from "./identify.ts";
import type { MESSAGES as V2_1 } from "./v2.1/registry.ts";
import type { MESSAGES as V2_2 } from "./v2.2/registry.ts";
import type { MESSAGES as V2_3 } from "./v2.3/registry.ts";
import type { MESSAGES as V2_3_1 } from "./v2.3.1/registry.ts";
import type { MESSAGES as V2_4 } from "./v2.4/registry.ts";
import type { MESSAGES as V2_5 } from "./v2.5/registry.ts";
import type { MESSAGES as V2_5_1 } from "./v2.5.1/registry.ts";
import type { MESSAGES as V2_6 } from "./v2.6/registry.ts";
import type { MESSAGES as V2_7 } from "./v2.7/registry.ts";
import type { MESSAGES as V2_7_1 } from "./v2.7.1/registry.ts";
import type { MESSAGES as V2_8 } from "./v2.8/registry.ts";
import type { MESSAGES as V2_8_1 } from "./v2.8.1/registry.ts";
import type { MESSAGES as V2_8_2 } from "./v2.8.2/registry.ts";
import type { MESSAGES as V2_9 } from "./v2.9/registry.ts";
import type { MESSAGES as V2_9_1 } from "./v2.9.1/registry.ts";

/** The message registry of one version: message structure name → generated parser. */
type Messages = Record<string, (messageString: string) => Result<ParsedMessageBase>>;

/**
 * Each version's registry, imported on first use: a version that no input names is never loaded.
 * The `satisfies` keeps this list in step with {@link SUPPORTED_VERSIONS}.
 */
const LOADERS = {
  "2.1": () => import("./v2.1/registry.ts").then((m) => m.MESSAGES),
  "2.2": () => import("./v2.2/registry.ts").then((m) => m.MESSAGES),
  "2.3": () => import("./v2.3/registry.ts").then((m) => m.MESSAGES),
  "2.3.1": () => import("./v2.3.1/registry.ts").then((m) => m.MESSAGES),
  "2.4": () => import("./v2.4/registry.ts").then((m) => m.MESSAGES),
  "2.5": () => import("./v2.5/registry.ts").then((m) => m.MESSAGES),
  "2.5.1": () => import("./v2.5.1/registry.ts").then((m) => m.MESSAGES),
  "2.6": () => import("./v2.6/registry.ts").then((m) => m.MESSAGES),
  "2.7": () => import("./v2.7/registry.ts").then((m) => m.MESSAGES),
  "2.7.1": () => import("./v2.7.1/registry.ts").then((m) => m.MESSAGES),
  "2.8": () => import("./v2.8/registry.ts").then((m) => m.MESSAGES),
  "2.8.1": () => import("./v2.8.1/registry.ts").then((m) => m.MESSAGES),
  "2.8.2": () => import("./v2.8.2/registry.ts").then((m) => m.MESSAGES),
  "2.9": () => import("./v2.9/registry.ts").then((m) => m.MESSAGES),
  "2.9.1": () => import("./v2.9.1/registry.ts").then((m) => m.MESSAGES),
} satisfies Record<HL7Version, () => Promise<Messages>>;

const loaded = new Map<HL7Version, Promise<Messages>>();

/** The registry of a version, loading it on the first call and reusing the same load after that. */
function loadRegistry(version: HL7Version): Promise<Messages> {
  let registry = loaded.get(version);
  if (!registry) {
    registry = LOADERS[version]();
    loaded.set(version, registry);
  }
  return registry;
}

/** The message registries by version, typed (type-only imports: they add nothing at runtime). */
type Registries = {
  "2.1": typeof V2_1;
  "2.2": typeof V2_2;
  "2.3": typeof V2_3;
  "2.3.1": typeof V2_3_1;
  "2.4": typeof V2_4;
  "2.5": typeof V2_5;
  "2.5.1": typeof V2_5_1;
  "2.6": typeof V2_6;
  "2.7": typeof V2_7;
  "2.7.1": typeof V2_7_1;
  "2.8": typeof V2_8;
  "2.8.1": typeof V2_8_1;
  "2.8.2": typeof V2_8_2;
  "2.9": typeof V2_9;
  "2.9.1": typeof V2_9_1;
};

/** The message structure names of one version (`"ADT_A01" | "ACK" | ...`). */
export type MessageStructureOf<V extends HL7Version> = keyof Registries[V] & string;

/** The parsed form of one message structure of one version. */
export type ParsedMessageOf<V extends HL7Version, S extends MessageStructureOf<V>> =
  Registries[V][S] extends (messageString: string) => Result<infer T> ? T : never;

/** The parser picked for a message: its version, structure name, and the function to run. */
export interface SelectedMessageParserOf<V extends HL7Version, S extends MessageStructureOf<V>> {
  /** Tells a message parser from a batch parser in `selectParser()`'s result. */
  kind: "message";
  /** The version the message is parsed as. */
  version: V;
  /** The message structure name the message resolved to (`ADT_A01`). */
  structure: S;
  /** What MSH-9 and MSH-12 said. */
  messageType: MessageType;
  /** The generated parser of that message (`parseADT_A01` of `@campfhir/hl7/v2.3`). Synchronous: the registry is loaded already. */
  parse: (messageString: string) => Result<ParsedMessageOf<V, S>>;
}

/** The parser picked for a message, as a union over every version and structure. */
export type SelectedMessageParser = {
  [V in HL7Version]: { [S in MessageStructureOf<V>]: SelectedMessageParserOf<V, S> }[MessageStructureOf<V>];
}[HL7Version];

/** A message parsed by the root parser: the discriminants and the structured message. */
export interface ParsedHL7MessageOf<V extends HL7Version, S extends MessageStructureOf<V>> {
  /** Tells a message from a batch file in `parse()`'s result. */
  kind: "message";
  /** The version the message was parsed as. */
  version: V;
  /** The message structure name (`ADT_A01`): switch on it to narrow `parsed`. */
  structure: S;
  /** What MSH-9 and MSH-12 said. */
  messageType: MessageType;
  /** The structured message, the same object the message's own `parse<MSG>()` returns. */
  parsed: ParsedMessageOf<V, S>;
}

/** A message parsed by the root parser, as a union over every version and structure. */
export type ParsedHL7Message = {
  [V in HL7Version]: { [S in MessageStructureOf<V>]: ParsedHL7MessageOf<V, S> }[MessageStructureOf<V>];
}[HL7Version];

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });
const has = (object: object, key: string) => Object.prototype.hasOwnProperty.call(object, key);
const isSupported = (version: string): version is HL7Version => (SUPPORTED_VERSIONS as readonly string[]).includes(version);

/**
 * `ADT^A01` → `ADT_A01`; `ACK^A01` → `ACK`; `ADT^^ADT_A01` → `ADT_A01`. With no trigger event in MSH-9 (v2.1):
 * `ADT` and EVN-1 `A01` → `ADT_A01`, and `ORM` → `ORM_O01`, the only ORM event of the version.
 */
function resolveStructure(registry: Messages, type: MessageType, messageString: string): string | undefined {
  const candidates = [
    type.triggerEvent ? `${type.messageCode}_${type.triggerEvent}` : undefined,
    type.messageCode,
    type.messageStructure,
  ];
  const found = candidates.find((name) => name && has(registry, name));
  if (found || type.triggerEvent || type.messageStructure) return found;
  const event = eventTypeCode(messageString);
  if (event && has(registry, `${type.messageCode}_${event}`)) return `${type.messageCode}_${event}`;
  const ofType = Object.keys(registry).filter((name) => name.startsWith(`${type.messageCode}_`));
  return ofType.length === 1 ? ofType[0] : undefined;
}

/**
 * Picks the parser for one message from its MSH-9 and MSH-12 (or `options.version`), loading the
 * registry of that version if it is not loaded yet. Fails when the MSH cannot be read, the version
 * is not dispatched by this release, the message type is not one of that version's, or the input
 * is a batch.
 */
export async function selectMessageParser(messageString: string, options: ParseOptions = {}): Promise<Result<SelectedMessageParser>> {
  const identity = identifyMessage(messageString);
  if (!identity.ok || !identity.val) return identity as Result<never>;
  const messageType = identity.val;

  const version = options.version ?? messageType.version;
  if (!version) {
    return fail(`MSH-12 Version ID is empty; pass { version: "${SUPPORTED_VERSIONS.at(-1)}" } to choose the version to parse as`);
  }
  if (!isSupported(version)) {
    return fail(
      `HL7 version '${version}' (MSH-12) is not supported by this release, which parses ${SUPPORTED_VERSIONS.join(", ")}; ` +
        `pass { version: "${SUPPORTED_VERSIONS.at(-1)}" } to parse the message as that version`,
    );
  }

  const registry = await loadRegistry(version);
  const structure = resolveStructure(registry, messageType, messageString);
  if (!structure) {
    const shown = [messageType.messageCode, messageType.triggerEvent, messageType.messageStructure].filter(Boolean).join("^");
    return fail(`Unknown HL7 v${version} message type '${shown}' (MSH-9)`);
  }
  return {
    ok: true,
    val: { kind: "message", version, structure, messageType, parse: registry[structure] },
  } as unknown as Result<SelectedMessageParser>;
}

/**
 * Parses one HL7 v2 message: reads MSH-9 and MSH-12, loads the registry of its version if needed,
 * picks the generated parser of that message and runs it. The result carries `version` and
 * `structure` to narrow `parsed`, which is exactly what the message's own `parse<MSG>()` returns.
 * A batch is an error here; the root `parse()` handles both.
 */
export async function parseMessage(messageString: string, options: ParseOptions = {}): Promise<Result<ParsedHL7Message>> {
  const selected = await selectMessageParser(messageString, options);
  if (!selected.ok || !selected.val) return selected as Result<never>;
  // One plain shape for the call: the union over every version and structure is too large to call through.
  const { version, structure, messageType, parse } = selected.val as unknown as {
    version: HL7Version;
    structure: string;
    messageType: MessageType;
    parse: (messageString: string) => Result<ParsedMessageBase>;
  };
  const result = parse(messageString);
  if (!result.ok || !result.val) return result as Result<never>;
  return { ok: true, val: { kind: "message", version, structure, messageType, parsed: result.val } } as unknown as Result<ParsedHL7Message>;
}
