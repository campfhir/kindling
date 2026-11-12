/**
 * The message dispatcher behind the root parser: reads MSH-9 (message type) and MSH-12 (version)
 * of one HL7 v2 message, loads the message registry of that version, picks the generated parser of
 * that message and runs it. Each version's registry is imported the first time a message of that
 * version is dispatched, and stays loaded after that. `parse()` of `./parse.ts` adds the batch protocol.
 *
 * The results are typed without any version's message types (`structure` is a string, `parsed` a
 * `ParsedMessageBase`), so importing the parser does not load fifteen versions of declarations into
 * the type checker. One version's types are brought in where they are wanted:
 *
 * ```ts
 * import type { DispatchedMessage } from "@campfhir/hl7/v2.3";
 *
 * const result = await parseMessage(raw);
 * if (result.ok && isVersion<DispatchedMessage>(result.val, "2.3") && result.val.structure === "ADT_A01") {
 *   result.val.parsed.patient; // PID, typed as ParsedADT_A01 of v2.3
 * }
 * ```
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import type { ParsedMessageBase } from "./types/structure.ts";
import { Err } from "./utils/err.ts";
import { identifyMessage, eventTypeCode, SUPPORTED_VERSIONS, type HL7Version, type MessageType, type ParseOptions } from "./identify.ts";
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

/**
 * The parser picked for a message: its version, structure name, and the function to run. `P` is the
 * parsed form; it is `ParsedMessageBase` unless one version's types are brought in, as
 * `DispatchedParser` of `@campfhir/hl7/<version>` does.
 */
export interface SelectedMessageParserOf<V extends HL7Version, S extends string, P = ParsedMessageBase> {
  /** Tells a message parser from a batch parser in `selectParser()`'s result. */
  kind: "message";
  /** The version the message is parsed as. */
  version: V;
  /** The message structure name the message resolved to (`ADT_A01`). */
  structure: S;
  /** What MSH-9 and MSH-12 said. */
  messageType: MessageType;
  /** The generated parser of that message (`parseADT_A01` of `@campfhir/hl7/v2.3`). Synchronous: the registry is loaded already. */
  parse: (messageString: string) => Result<P>;
}

/**
 * The parser picked for a message, in any version. Typed without any version's message types, so
 * importing the parser costs the type checker nothing per version; `isVersion()` narrows it to one
 * version's `DispatchedParser`.
 */
export type SelectedMessageParser = SelectedMessageParserOf<HL7Version, string>;

/**
 * A message parsed by the root parser: the discriminants and the structured message. `P` is the
 * parsed form; it is `ParsedMessageBase` unless one version's types are brought in, as
 * `DispatchedMessage` of `@campfhir/hl7/<version>` does.
 */
export interface ParsedHL7MessageOf<V extends HL7Version, S extends string, P = ParsedMessageBase> {
  /** Tells a message from a batch file in `parse()`'s result. */
  kind: "message";
  /** The version the message was parsed as. */
  version: V;
  /** The message structure name (`ADT_A01`): once the version is narrowed, switch on it to narrow `parsed`. */
  structure: S;
  /** What MSH-9 and MSH-12 said. */
  messageType: MessageType;
  /** The structured message, the same object the message's own `parse<MSG>()` returns. */
  parsed: P;
}

/**
 * A message parsed by the root parser, in any version: `version` is the union of the dispatched
 * versions, `structure` a string and `parsed` a `ParsedMessageBase` (`parsed.message` and its
 * segments). Typed without any version's message types, so importing the parser does not make the
 * type checker load all fifteen versions. Narrow it to one version's message types with
 * `isVersion<DispatchedMessage>(message, "2.5.1")`, `DispatchedMessage` being the type of
 * `@campfhir/hl7/v2.5.1`; then a `switch` on `structure` narrows `parsed`.
 */
export type ParsedHL7Message = ParsedHL7MessageOf<HL7Version, string>;

/**
 * Whether a parsed message (or a selected parser) is of the version `M` describes, narrowing it to
 * `M`. `M` is one version's `DispatchedMessage` (or `DispatchedParser`) type, and `version` must be
 * that version, which the compiler checks:
 *
 * ```ts
 * import { parse, isVersion } from "@campfhir/hl7/parse";
 * import type { DispatchedMessage } from "@campfhir/hl7/v2.5.1";
 *
 * const result = await parse(raw);
 * if (result.ok && result.val.kind === "message" && isVersion<DispatchedMessage>(result.val, "2.5.1")) {
 *   if (result.val.structure === "ADT_A01") result.val.parsed.patient; // ParsedADT_A01 of v2.5.1
 * }
 * ```
 *
 * The structure needs no check of its own: the dispatcher only returns structures of the version's
 * registry, which is what `M` is generated from.
 */
export function isVersion<M extends { version: HL7Version }>(message: { kind: "message"; version: HL7Version }, version: M["version"]): message is M & typeof message {
  return message.version === version;
}

/**
 * `isVersion()` as an assertion: narrows `message` to `M`, or throws when the message is of another
 * version.
 */
export function assertVersion<M extends { version: HL7Version }>(message: { kind: "message"; version: HL7Version }, version: M["version"]): asserts message is M & typeof message {
  if (message.version !== version) throw new Err(`Expected an HL7 v${version} message, got v${message.version}`);
}

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
  return { ok: true, val: { kind: "message", version, structure, messageType, parse: registry[structure] } };
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
  const { version, structure, messageType, parse } = selected.val;
  const result = parse(messageString);
  if (!result.ok || !result.val) return result as Result<never>;
  return { ok: true, val: { kind: "message", version, structure, messageType, parsed: result.val } };
}
