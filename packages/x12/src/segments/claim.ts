/**
 * The segments of the 837 professional claim: SBR, PAT, CLM, SV1, SVD, LIN and CTP. Element names
 * and values from the CMS 837P edits spreadsheet (Transmittal 1145) and the CMS 4010A1 → 5010
 * side-by-side (`docs/validation/005010X222A1-ledger.md`, section 3).
 *
 * @module
 */
import { BaseSegment, type Element } from "../types/segment.ts";
import type { MedicalProcedure } from "./eligibility.ts";

const procedure = (p: MedicalProcedure & { description?: string }) => {
  const modifiers = [...(p.modifiers ?? [])];
  while (p.description !== undefined && modifiers.length < 4) modifiers.push("");
  return [p.qualifier, p.code, ...modifiers, ...(p.description !== undefined ? [p.description] : [])];
};

/** SBR: Subscriber Information (2000B) or Other Subscriber Information (2320). */
export class SBR extends BaseSegment {
  /** The segment identifier. */
  id = "SBR";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** SBR01 Payer Responsibility Sequence Number Code (`P`, `S`, `T`, `A`–`H`, `U`). */
  payerResponsibilitySequenceNumberCode(value: string): this {
    return this.set(1, value);
  }

  /** SBR02 Individual Relationship Code (2000B: `18` when the subscriber is the patient). */
  individualRelationshipCode(value: string): this {
    return this.set(2, value);
  }

  /** SBR03 Group or Policy Number. */
  groupOrPolicyNumber(value: string): this {
    return this.set(3, value);
  }

  /** SBR04 Group Name. */
  groupName(value: string): this {
    return this.set(4, value);
  }

  /** SBR05 Insurance Type Code. */
  insuranceTypeCode(value: string): this {
    return this.set(5, value);
  }

  /** SBR09 Claim Filing Indicator Code. */
  claimFilingIndicatorCode(value: string): this {
    return this.set(9, value);
  }

  /** SBR01. */
  getPayerResponsibility(): string {
    return this.get(1);
  }
}

/** PAT: Patient Information. */
export class PAT extends BaseSegment {
  /** The segment identifier. */
  id = "PAT";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** PAT01 Individual Relationship Code: the patient's relationship to the subscriber (2000C). */
  individualRelationshipCode(value: string): this {
    return this.set(1, value);
  }

  /** PAT05 and PAT06: the death date and its format qualifier (`D8`). */
  deathDate(qualifier: string, date: string): this {
    return this.set(5, qualifier).set(6, date);
  }

  /** PAT07 and PAT08: the patient's weight and its unit (`01`). */
  weight(unit: string, value: string | number): this {
    return this.set(7, unit).set(8, String(value));
  }

  /** PAT09 Pregnancy Indicator (`Y`). */
  pregnancyIndicator(value: string): this {
    return this.set(9, value);
  }
}

/** CLM05, Health Care Service Location Information. */
export interface ServiceLocation {
  /** Facility Type Code: the place of service. */
  facilityTypeCode: string;
  /** Facility Code Qualifier (`B`). */
  facilityCodeQualifier?: string;
  /** Claim Frequency Code. */
  claimFrequencyCode: string;
}

/** CLM: Claim Information. */
export class CLM extends BaseSegment {
  /** The segment identifier. */
  id = "CLM";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** CLM01 Patient Control Number. */
  patientControlNumber(value: string): this {
    return this.set(1, value);
  }

  /** CLM02 Total Claim Charge Amount. */
  totalClaimChargeAmount(value: string | number): this {
    return this.set(2, String(value));
  }

  /** CLM05 Health Care Service Location Information; CLM05-2 defaults to `B`. */
  serviceLocation(value: ServiceLocation): this {
    return this.set(5, [value.facilityTypeCode, value.facilityCodeQualifier ?? "B", value.claimFrequencyCode]);
  }

  /** CLM06 Provider or Supplier Signature Indicator (`Y`, `N`). */
  providerSignatureIndicator(value: string): this {
    return this.set(6, value);
  }

  /** CLM07 Medicare Assignment Code (`A`, `B`, `C`). */
  assignmentCode(value: string): this {
    return this.set(7, value);
  }

  /** CLM08 Benefits Assignment Certification Indicator (`Y`, `N`, `W`). */
  benefitsAssignmentCertificationIndicator(value: string): this {
    return this.set(8, value);
  }

  /** CLM09 Release of Information Code (`Y`, `I`). */
  releaseOfInformationCode(value: string): this {
    return this.set(9, value);
  }

  /** CLM10 Patient Signature Source Code (`P`). */
  patientSignatureSourceCode(value: string): this {
    return this.set(10, value);
  }

  /** CLM11 Related Causes Information: up to two causes (`AA`, `EM`, `OA`), the auto accident state and country. */
  relatedCauses(causes: readonly string[], state?: string, country?: string): this {
    return this.set(11, [causes[0], causes[1], undefined, state, country]);
  }

  /** CLM12 Special Program Indicator. */
  specialProgramIndicator(value: string): this {
    return this.set(12, value);
  }

  /** CLM20 Delay Reason Code. */
  delayReasonCode(value: string): this {
    return this.set(20, value);
  }

  /** CLM01. */
  getPatientControlNumber(): string {
    return this.get(1);
  }

  /** CLM02. */
  getTotalChargeAmount(): string {
    return this.get(2);
  }
}

/** SV1: Professional Service, one service line's procedure, charge and units. */
export class SV1 extends BaseSegment {
  /** The segment identifier. */
  id = "SV1";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** SV101 Composite Medical Procedure Identifier (`HC`, `ER`, `IV`, `WK`), with an optional description. */
  procedure(value: MedicalProcedure & { description?: string }): this {
    return this.set(1, procedure(value));
  }

  /** SV102 Line Item Charge Amount. */
  lineItemChargeAmount(value: string | number): this {
    return this.set(2, String(value));
  }

  /** SV103 and SV104: the unit (`UN` unit, `MJ` minutes) and the service unit count. */
  units(unit: string, count: string | number): this {
    return this.set(3, unit).set(4, String(count));
  }

  /** SV105 Place of Service Code. */
  placeOfServiceCode(value: string): this {
    return this.set(5, value);
  }

  /** SV107 Composite Diagnosis Code Pointer: up to four positions of the 2300 diagnosis HI. */
  diagnosisCodePointer(...pointers: (string | number)[]): this {
    return this.set(7, pointers.map(String));
  }

  /** SV109 Emergency Indicator (`Y`). */
  emergencyIndicator(value: string): this {
    return this.set(9, value);
  }

  /** SV111 EPSDT Indicator (`Y`). */
  epsdtIndicator(value: string): this {
    return this.set(11, value);
  }

  /** SV112 Family Planning Indicator (`Y`). */
  familyPlanningIndicator(value: string): this {
    return this.set(12, value);
  }

  /** SV115 Co-Pay Status Code (`0`). */
  copayStatusCode(value: string): this {
    return this.set(15, value);
  }

  /** SV101-1 and SV101-2. */
  getProcedure(): { qualifier: string; code: string } {
    return { qualifier: this.getComponent(1, 1), code: this.getComponent(1, 2) };
  }

  /** SV102. */
  getChargeAmount(): string {
    return this.get(2);
  }
}

/** SVD: Line Adjudication Information, what another payer paid on a service line. */
export class SVD extends BaseSegment {
  /** The segment identifier. */
  id = "SVD";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** SVD01 Other Payer Primary Identifier. */
  otherPayerPrimaryIdentifier(value: string): this {
    return this.set(1, value);
  }

  /** SVD02 Service Line Paid Amount. */
  serviceLinePaidAmount(value: string | number): this {
    return this.set(2, String(value));
  }

  /** SVD03 Composite Medical Procedure Identifier. */
  procedure(value: MedicalProcedure & { description?: string }): this {
    return this.set(3, procedure(value));
  }

  /** SVD05 Paid Service Unit Count. */
  paidServiceUnitCount(value: string | number): this {
    return this.set(5, String(value));
  }

  /** SVD06 Bundled or Unbundled Line Number. */
  bundledOrUnbundledLineNumber(value: string | number): this {
    return this.set(6, String(value));
  }
}

/** LIN: Drug Identification. */
export class LIN extends BaseSegment {
  /** The segment identifier. */
  id = "LIN";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** LIN02 and LIN03: the product or service ID qualifier (`N4`, …) and the drug code. */
  drug(qualifier: string, code: string): this {
    return this.set(2, qualifier).set(3, code);
  }
}

/** CTP: Drug Quantity. */
export class CTP extends BaseSegment {
  /** The segment identifier. */
  id = "CTP";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** CTP04 and CTP05-1: the national drug unit count and its unit (`UN`, `ML`, `GR`, `ME`, `F2`). */
  quantity(count: string | number, unit: string): this {
    return this.set(4, String(count)).set(5, [unit]);
  }
}
