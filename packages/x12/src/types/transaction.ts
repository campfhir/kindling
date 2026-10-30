/**
 * One transaction set's parser, verifier and builder, made from its schema. Each implementation
 * guide's module (`@campfhir/x12/005010X279A1/270`) exports one, and `parse()` dispatches to it on
 * ST01 and GS08.
 *
 * @module
 */
import type { Result } from "./result.ts";
import { Err } from "../utils/err.ts";
import type { GenericSegment } from "./segment.ts";
import type { InputOf, ParsedOf, TransactionSetSchema } from "./schema.ts";
import { encodeStructure, parseStructure, verifyStructure } from "./structure.ts";
import { ST } from "../envelope/ST.ts";
import type { ParsedTransactionSet, TransactionSetInput } from "../interchange.ts";

/** A transaction set parsed against its implementation guide. */
export interface TypedTransactionSet<T extends TransactionSetSchema = TransactionSetSchema> {
  /** ST01 (`270`). */
  transactionSet: T["transactionSet"];
  /** The implementation guide (`005010X279A1`). */
  version: T["version"];
  /** The body, one property per segment and loop of the guide. */
  value: ParsedOf<T["structure"]>;
  /** Repeats past the guide's maximum. */
  warnings: string[];
}

/** What `defineTransactionSet()` makes of a schema. */
export interface TransactionSetDefinition<T extends TransactionSetSchema> {
  /** The schema. */
  schema: T;
  /** Parses the segments between ST and SE, or a whole parsed transaction set. */
  parse(input: readonly GenericSegment[] | ParsedTransactionSet): Result<TypedTransactionSet<T>>;
  /** Lists every required segment and loop the input misses; empty when it is complete. */
  verify(input: InputOf<T["structure"]>): string[];
  /**
   * Builds the transaction set for `encodeInterchange()`: ST (ST01, ST02 `controlNumber`, ST03 the
   * guide) and the body in the guide's order. Throws when `verify()` finds anything missing.
   */
  create(controlNumber: string, input: InputOf<T["structure"]>): TransactionSetInput;
}

/** Makes a transaction set's parser, verifier and builder from its schema. */
export function defineTransactionSet<const T extends TransactionSetSchema>(schema: T): TransactionSetDefinition<T> {
  const label = schema.transactionSet;
  return {
    schema,
    parse(input) {
      const segments = Array.isArray(input) ? (input as readonly GenericSegment[]) : (input as ParsedTransactionSet).segments;
      const r = parseStructure<ParsedOf<T["structure"]>>(label, schema.structure, segments);
      if (!r.ok) return r;
      return { ok: true, val: { transactionSet: schema.transactionSet, version: schema.version, value: r.val.value, warnings: r.val.warnings } };
    },
    verify(input) {
      return verifyStructure(label, schema.structure, input);
    },
    create(controlNumber, input) {
      const problems = verifyStructure(label, schema.structure, input);
      if (problems.length > 0) throw new Err(`Invalid ${label} transaction set: ${problems.join("; ")}`);
      return {
        header: new ST().transactionSetIdentifierCode(schema.transactionSet).transactionSetControlNumber(controlNumber).implementationConventionReference(schema.version),
        segments: encodeStructure(schema.structure, input),
      };
    },
  };
}
