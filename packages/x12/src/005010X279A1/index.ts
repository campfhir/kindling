/**
 * `@campfhir/x12/005010X279A1`: the 270 and 271 eligibility transaction sets, and the segment
 * classes they use.
 *
 * @module
 */
export { X270, X270_STRUCTURE, type Parsed270, type X270Input } from "./270.ts";
export { X271, X271_STRUCTURE, type Parsed271, type X271Input } from "./271.ts";
export { BHT, HL, TRN } from "../segments/hierarchy.ts";
export { NM1, type PersonName } from "../segments/NM1.ts";
export { EQ, EB, AAA, LS, LE, type MedicalProcedure } from "../segments/eligibility.ts";
