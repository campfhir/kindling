/**
 * `@campfhir/x12/005010X231A1`: the 999 Implementation Acknowledgment, its segment classes and code
 * lists, and `acknowledge()`, which writes the 999 for a parsed interchange.
 *
 * @module
 */
export { X999, X999_STRUCTURE, BUSINESS_UNIT_IDENTIFIERS, type Parsed999, type X999Input } from "./999.ts";
export * from "./segments.ts";
export { acknowledge, type AcknowledgeOptions } from "./acknowledge.ts";
