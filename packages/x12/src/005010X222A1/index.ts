/**
 * `@campfhir/x12/005010X222A1`: the 837 Health Care Claim: Professional and the segment classes it
 * uses.
 *
 * @module
 */
export { X837P, X837P_STRUCTURE, type Parsed837P, type X837PInput } from "./837.ts";
export { SBR, PAT, CLM, SV1, SVD, LIN, CTP, type ServiceLocation } from "../segments/claim.ts";
export { BHT, HL } from "../segments/hierarchy.ts";
export { NM1, type PersonName } from "../segments/NM1.ts";
export { LX, CAS, type Adjustment } from "../segments/remittance.ts";
export { type MedicalProcedure } from "../segments/eligibility.ts";
