/**
 * The parser's results typed over every HL7 version at once, in its own entry point
 * `@campfhir/hl7/all-versions`.
 *
 * `@campfhir/hl7/parse` types a parsed message without any version's message types, and
 * `isVersion()` narrows it to one version's `DispatchedMessage`. This entry is for code that
 * handles messages of many versions and wants the union of them all, in which a `switch` on
 * `structure` narrows `parsed` to that message across the versions. It brings in the declarations of
 * every version (about 6,700 files), so the type checker of a program that imports it is that much
 * slower; it adds nothing at runtime.
 *
 * ```ts
 * import { parse } from "@campfhir/hl7/parse";
 * import type { AnyParsedHL7Message } from "@campfhir/hl7/all-versions";
 *
 * const result = await parse(raw);
 * if (result.ok && result.val.kind === "message") {
 *   const message = result.val as AnyParsedHL7Message;
 *   if (message.structure === "ADT_A01") message.parsed.patient; // ParsedADT_A01 of any version
 * }
 * ```
 *
 * @module
 */
import type { HL7Version } from "./identify.ts";
import type { Result } from "./types/result.ts";
import type * as V2_1 from "./v2.1/registry.ts";
import type * as V2_2 from "./v2.2/registry.ts";
import type * as V2_3 from "./v2.3/registry.ts";
import type * as V2_3_1 from "./v2.3.1/registry.ts";
import type * as V2_4 from "./v2.4/registry.ts";
import type * as V2_5 from "./v2.5/registry.ts";
import type * as V2_5_1 from "./v2.5.1/registry.ts";
import type * as V2_6 from "./v2.6/registry.ts";
import type * as V2_7 from "./v2.7/registry.ts";
import type * as V2_7_1 from "./v2.7.1/registry.ts";
import type * as V2_8 from "./v2.8/registry.ts";
import type * as V2_8_1 from "./v2.8.1/registry.ts";
import type * as V2_8_2 from "./v2.8.2/registry.ts";
import type * as V2_9 from "./v2.9/registry.ts";
import type * as V2_9_1 from "./v2.9.1/registry.ts";

/** Each version's registry module, by version (`Registries[V]` below fails to compile for a version missing here). */
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
export type MessageStructureOf<V extends HL7Version> = keyof Registries[V]["MESSAGES"] & string;

/** The parsed form of one message structure of one version. */
export type ParsedMessageOf<V extends HL7Version, S extends MessageStructureOf<V>> =
  Registries[V]["MESSAGES"][S] extends (messageString: string) => Result<infer T> ? T : never;

/** A message parsed by the root parser, as a union over every version and structure. */
export type AnyParsedHL7Message =
  | V2_1.DispatchedMessage
  | V2_2.DispatchedMessage
  | V2_3.DispatchedMessage
  | V2_3_1.DispatchedMessage
  | V2_4.DispatchedMessage
  | V2_5.DispatchedMessage
  | V2_5_1.DispatchedMessage
  | V2_6.DispatchedMessage
  | V2_7.DispatchedMessage
  | V2_7_1.DispatchedMessage
  | V2_8.DispatchedMessage
  | V2_8_1.DispatchedMessage
  | V2_8_2.DispatchedMessage
  | V2_9.DispatchedMessage
  | V2_9_1.DispatchedMessage;

/** The parser picked for a message, as a union over every version and structure. */
export type AnySelectedMessageParser =
  | V2_1.DispatchedParser
  | V2_2.DispatchedParser
  | V2_3.DispatchedParser
  | V2_3_1.DispatchedParser
  | V2_4.DispatchedParser
  | V2_5.DispatchedParser
  | V2_5_1.DispatchedParser
  | V2_6.DispatchedParser
  | V2_7.DispatchedParser
  | V2_7_1.DispatchedParser
  | V2_8.DispatchedParser
  | V2_8_1.DispatchedParser
  | V2_8_2.DispatchedParser
  | V2_9.DispatchedParser
  | V2_9_1.DispatchedParser;
