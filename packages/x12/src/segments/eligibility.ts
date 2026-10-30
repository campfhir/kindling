/**
 * The eligibility segments: EQ (the 270's inquiry), EB (the 271's answer), AAA (a rejected request)
 * and the LS/LE pair around the 271's benefit related entities. Element names, types and values
 * from the CMS 270/271 4010A1 → 5010A1 crosswalk (`docs/validation/005010X279A1-ledger.md`, section 4).
 *
 * @module
 */
import { BaseSegment, type Element } from "../types/segment.ts";

/** A procedure: EQ02 and EB13, Composite Medical Procedure Identifier. */
export interface MedicalProcedure {
  /** Product/Service ID Qualifier (`HC` HCPCS, `AD`, `CJ`, `ID`, `IV`, `N4`, `ZZ`). */
  qualifier: string;
  /** Product/Service ID: the code. */
  code: string;
  /** Procedure Modifiers. */
  modifiers?: readonly string[];
}

const procedure = (p: MedicalProcedure) => [p.qualifier, p.code, ...(p.modifiers ?? [])];

/** EQ: Eligibility or Benefit Inquiry (270 loop 2110C/2110D). */
export class EQ extends BaseSegment {
  /** The segment identifier. */
  id = "EQ";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** EQ01 Service Type Code, one or more repetitions. */
  serviceTypeCode(...codes: string[]): this {
    return this.setRepeating(1, codes);
  }

  /** EQ02 Composite Medical Procedure Identifier. */
  medicalProcedure(value: MedicalProcedure): this {
    return this.set(2, procedure(value));
  }

  /** EQ03 Coverage Level Code (`FAM`; 2110C only). */
  coverageLevelCode(value: string): this {
    return this.set(3, value);
  }

  /** EQ05 Composite Diagnosis Code Pointer: up to four HI positions. */
  diagnosisCodePointer(...pointers: (string | number)[]): this {
    return this.set(5, pointers.map(String));
  }

  /** Every EQ01 repetition. */
  getServiceTypeCodes(): string[] {
    return this.getRepetitions(1).map((e) => e.components[0]);
  }
}

/** EB: Eligibility or Benefit Information (271 loop 2110C/2110D). */
export class EB extends BaseSegment {
  /** The segment identifier. */
  id = "EB";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** EB01 Eligibility or Benefit Information Code (`R` other or additional payer, …). */
  eligibilityOrBenefitInformationCode(value: string): this {
    return this.set(1, value);
  }

  /** EB02 Coverage Level Code (`IND`, `FAM`, …). */
  coverageLevelCode(value: string): this {
    return this.set(2, value);
  }

  /** EB03 Service Type Code, one or more repetitions. */
  serviceTypeCode(...codes: string[]): this {
    return this.setRepeating(3, codes);
  }

  /** EB04 Insurance Type Code. */
  insuranceTypeCode(value: string): this {
    return this.set(4, value);
  }

  /** EB05 Plan Coverage Description. */
  planCoverageDescription(value: string): this {
    return this.set(5, value);
  }

  /** EB06 Time Period Qualifier. */
  timePeriodQualifier(value: string): this {
    return this.set(6, value);
  }

  /** EB07 Monetary Amount. */
  monetaryAmount(value: string | number): this {
    return this.set(7, String(value));
  }

  /** EB08 Percentage as Decimal (`0.2` is 20%). */
  percentageAsDecimal(value: string | number): this {
    return this.set(8, String(value));
  }

  /** EB09 Quantity Qualifier. */
  quantityQualifier(value: string): this {
    return this.set(9, value);
  }

  /** EB10 Quantity. */
  quantity(value: string | number): this {
    return this.set(10, String(value));
  }

  /** EB11 Yes/No Condition or Response Code (the CMS HETS guide: prior authorization indicator). */
  priorAuthorizationIndicator(value: string): this {
    return this.set(11, value);
  }

  /** EB12 Yes/No Condition or Response Code (`N`, `U`, `W`, `Y`). */
  secondYesNoConditionOrResponseCode(value: string): this {
    return this.set(12, value);
  }

  /** EB13 Composite Medical Procedure Identifier. */
  medicalProcedure(value: MedicalProcedure): this {
    return this.set(13, procedure(value));
  }

  /** EB14 Composite Diagnosis Code Pointer. */
  diagnosisCodePointer(...pointers: (string | number)[]): this {
    return this.set(14, pointers.map(String));
  }

  /** EB01. */
  getInformationCode(): string {
    return this.get(1);
  }

  /** Every EB03 repetition. */
  getServiceTypeCodes(): string[] {
    return this.getRepetitions(3).map((e) => e.components[0]);
  }
}

/** AAA: Request Validation, why (part of) a 270 could not be answered (271 only). */
export class AAA extends BaseSegment {
  /** The segment identifier. */
  id = "AAA";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** AAA01 Yes/No Condition or Response Code: whether the request was valid. */
  validRequestIndicator(value: string): this {
    return this.set(1, value);
  }

  /** AAA03 Reject Reason Code (the allowed codes differ by loop). */
  rejectReasonCode(value: string): this {
    return this.set(3, value);
  }

  /** AAA04 Follow-up Action Code. */
  followUpActionCode(value: string): this {
    return this.set(4, value);
  }

  /** AAA03. */
  getRejectReasonCode(): string {
    return this.get(3);
  }
}

/** LS: Loop Header, before the 271's benefit related entities (LS01 `2120`). */
export class LS extends BaseSegment {
  /** The segment identifier. */
  id = "LS";

  constructor(elements: Element[] = [{ components: ["2120"] }]) {
    super();
    this.elements = elements;
  }

  /** LS01 Loop Identifier Code. */
  loopIdentifierCode(value: string): this {
    return this.set(1, value);
  }
}

/** LE: Loop Trailer, after the 271's benefit related entities (LE01 `2120`). */
export class LE extends BaseSegment {
  /** The segment identifier. */
  id = "LE";

  constructor(elements: Element[] = [{ components: ["2120"] }]) {
    super();
    this.elements = elements;
  }

  /** LE01 Loop Identifier Code. */
  loopIdentifierCode(value: string): this {
    return this.set(1, value);
  }
}
