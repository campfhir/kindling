/**
 * `@campfhir/x12/005010X221A1`: the 835 Health Care Claim Payment/Advice and the segment classes it
 * uses.
 *
 * @module
 */
export { X835, X835_STRUCTURE, type Parsed835, type X835Input } from "./835.ts";
export { BPR, N1, LX, CLP, CAS, SVC, PLB, type Adjustment, type ProviderAdjustment } from "../segments/remittance.ts";
export { TRN } from "../segments/hierarchy.ts";
export { NM1, type PersonName } from "../segments/NM1.ts";
export { type MedicalProcedure } from "../segments/eligibility.ts";
