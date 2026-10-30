/**
 * Which transaction sets `parse()` reads typed: each implementation guide's module, keyed by the
 * guide (ST03, or GS08 when ST03 is absent) and ST01. A guide's module loads the first time a
 * transaction set of that guide is parsed, as `@campfhir/hl7/parse` loads a version.
 *
 * @module
 */
import type { TransactionSetDefinition, TypedTransactionSet } from "./types/transaction.ts";
import type { TransactionSetSchema } from "./types/schema.ts";
import type { X270 } from "./005010X279A1/270.ts";
import type { X271 } from "./005010X279A1/271.ts";
import type { X999 } from "./005010X231A1/999.ts";
import type { X835 } from "./005010X221A1/835.ts";
import type { X837P } from "./005010X222A1/837.ts";

/** A transaction set parsed against its implementation guide: `transactionSet` narrows `value`. */
export type TypedX12TransactionSet =
  | TypedTransactionSet<(typeof X270)["schema"]>
  | TypedTransactionSet<(typeof X271)["schema"]>
  | TypedTransactionSet<(typeof X999)["schema"]>
  | TypedTransactionSet<(typeof X835)["schema"]>
  | TypedTransactionSet<(typeof X837P)["schema"]>;

type Guide = Record<string, TransactionSetDefinition<TransactionSetSchema>>;

const x279 = async (): Promise<Guide> => {
  const [{ X270 }, { X271 }] = await Promise.all([import("./005010X279A1/270.ts"), import("./005010X279A1/271.ts")]);
  return { "270": X270 as unknown as Guide[string], "271": X271 as unknown as Guide[string] };
};

// 005010X231 and its errata 005010X231A1 have the same structure (CMS acknowledgements
// presentation; docs/validation/005010X231A1-ledger.md, section 4), and senders use both.
const x231 = async (): Promise<Guide> => ({ "999": (await import("./005010X231A1/999.ts")).X999 as unknown as Guide[string] });

const x221 = async (): Promise<Guide> => ({ "835": (await import("./005010X221A1/835.ts")).X835 as unknown as Guide[string] });

// 005010X222, the guide before the A1 errata, is read with the 005010X222A1 structure: the CMS 837P
// edits spreadsheet and the CMS errata presentation list the A1 changes, and they only relax usage
// (N4 and NM108/NM109 from required to situational) or add (the 2010CA patient identifier REF, LIN02
// codes), so every structure valid under 005010X222 is valid under A1. Most of X12's 837P examples
// carry 005010X222 (docs/validation/005010X222A1-ledger.md).
const x222 = async (): Promise<Guide> => ({ "837": (await import("./005010X222A1/837.ts")).X837P as unknown as Guide[string] });

const GUIDES: Record<string, () => Promise<Guide>> = {
  "005010X279A1": x279,
  "005010X231A1": x231,
  "005010X231": x231,
  "005010X221A1": x221,
  "005010X222A1": x222,
  "005010X222": x222,
};

/** The implementation guides `parse()` reads typed. */
export const SUPPORTED_GUIDES = Object.keys(GUIDES) as readonly string[];

/**
 * The definition of a transaction set (ST01) of an implementation guide (`005010X279A1`), loading
 * the guide's module on first use; undefined for one this release does not type.
 */
export async function selectTransactionSet(transactionSet: string, guide: string): Promise<TransactionSetDefinition<TransactionSetSchema> | undefined> {
  const load = GUIDES[guide.trim()];
  return load ? (await load())[transactionSet.trim()] : undefined;
}
