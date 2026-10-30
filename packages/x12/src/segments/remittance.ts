/**
 * The segments of the 835 remittance: BPR, N1, LX, CLP, CAS, SVC and PLB. Element names are the
 * guide's where a public source prints them, otherwise the CMS 835 4010A1 → 5010A1 crosswalk's,
 * which uses Medicare's wording (`docs/validation/005010X221A1-ledger.md`, section 3).
 *
 * @module
 */
import { BaseSegment, type Element } from "../types/segment.ts";
import { formatDate8 } from "../utils/dates.ts";
import type { MedicalProcedure } from "./eligibility.ts";

/** BPR: Financial Information, the payment the remittance accounts for. */
export class BPR extends BaseSegment {
  /** The segment identifier. */
  id = "BPR";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** BPR01 Transaction Handling Code (`I` remittance information only, `H` notification only, `C`, `D`, `P`, `U`, `X`). */
  transactionHandlingCode(value: string): this {
    return this.set(1, value);
  }

  /** BPR02 Total Actual Provider Payment Amount. */
  totalActualProviderPaymentAmount(value: string | number): this {
    return this.set(2, String(value));
  }

  /** BPR03 Credit or Debit Flag Code (`C` credit, `D`). */
  creditOrDebitFlagCode(value: string): this {
    return this.set(3, value);
  }

  /** BPR04 Payment Method Code (`ACH` automated clearing house, `CHK` check, `NON` non-payment data, `BOP`, `FWT`). */
  paymentMethodCode(value: string): this {
    return this.set(4, value);
  }

  /** BPR05 Payment Format Code (`CCP`, `CTX`). */
  paymentFormatCode(value: string): this {
    return this.set(5, value);
  }

  /** BPR06 to BPR09: the sender's (DFI) identification number qualifier, DFI identifier, account number qualifier and account number. */
  sender(dfiQualifier: string, dfiIdentifier: string, accountQualifier: string, accountNumber: string): this {
    return this.set(6, dfiQualifier).set(7, dfiIdentifier).set(8, accountQualifier).set(9, accountNumber);
  }

  /** BPR10 Originating Company Identifier. */
  originatingCompanyIdentifier(value: string): this {
    return this.set(10, value);
  }

  /** BPR11 Originating Company Supplemental Code (TRN04). */
  originatingCompanySupplementalCode(value: string): this {
    return this.set(11, value);
  }

  /** BPR12 to BPR15: the receiver's (DFI) identification number qualifier, DFI identifier, account number qualifier and account number. */
  receiver(dfiQualifier: string, dfiIdentifier: string, accountQualifier: string, accountNumber: string): this {
    return this.set(12, dfiQualifier).set(13, dfiIdentifier).set(14, accountQualifier).set(15, accountNumber);
  }

  /** BPR16 Check Issue or EFT Effective Date, `CCYYMMDD`. */
  checkIssueOrEftEffectiveDate(value: Date | string): this {
    return this.set(16, formatDate8(value));
  }

  /** BPR01. */
  getTransactionHandlingCode(): string {
    return this.get(1);
  }

  /** BPR02. */
  getPaymentAmount(): string {
    return this.get(2);
  }
}

/** N1: Party Identification, the payer (N101 `PR`) or the payee (N101 `PE`). */
export class N1 extends BaseSegment {
  /** The segment identifier. */
  id = "N1";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** N101 Entity Identifier Code. */
  entityIdentifierCode(value: string): this {
    return this.set(1, value);
  }

  /** N102 Name. */
  name(value: string): this {
    return this.set(2, value);
  }

  /** N103 Identification Code Qualifier (`XV` CMS PlanID, `XX` NPI, `FI` federal taxpayer ID). */
  identificationCodeQualifier(value: string): this {
    return this.set(3, value);
  }

  /** N104 Identification Code. */
  identificationCode(value: string): this {
    return this.set(4, value);
  }

  /** N103 and N104 together. */
  identification(qualifier: string, code: string): this {
    return this.identificationCodeQualifier(qualifier).identificationCode(code);
  }

  /** N102. */
  getName(): string {
    return this.get(2);
  }

  /** N104. */
  getIdentificationCode(): string {
    return this.get(4);
  }
}

/** LX: Header Number, which opens a group of claims. */
export class LX extends BaseSegment {
  /** The segment identifier. */
  id = "LX";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** LX01 Assigned Number. */
  assignedNumber(value: string | number): this {
    return this.set(1, String(value));
  }
}

/** CLP: Claim Payment Information. */
export class CLP extends BaseSegment {
  /** The segment identifier. */
  id = "CLP";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** CLP01 Claim Submitter's Identifier: the patient control number of the claim. */
  claimSubmitterIdentifier(value: string): this {
    return this.set(1, value);
  }

  /** CLP02 Claim Status Code (`22` reversal of previous payment, `25` predetermination pricing only, …). */
  claimStatusCode(value: string): this {
    return this.set(2, value);
  }

  /** CLP03 Total Claim Charge Amount. */
  totalClaimChargeAmount(value: string | number): this {
    return this.set(3, String(value));
  }

  /** CLP04 Claim Payment Amount. */
  claimPaymentAmount(value: string | number): this {
    return this.set(4, String(value));
  }

  /** CLP05 Patient Responsibility Amount. */
  patientResponsibilityAmount(value: string | number): this {
    return this.set(5, String(value));
  }

  /** CLP06 Claim Filing Indicator Code. */
  claimFilingIndicatorCode(value: string): this {
    return this.set(6, value);
  }

  /** CLP07 Payer Claim Control Number. */
  payerClaimControlNumber(value: string): this {
    return this.set(7, value);
  }

  /** CLP08 Facility Type Code. */
  facilityTypeCode(value: string): this {
    return this.set(8, value);
  }

  /** CLP09 Claim Frequency Code. */
  claimFrequencyCode(value: string): this {
    return this.set(9, value);
  }

  /** CLP11 DRG Code. */
  drgCode(value: string): this {
    return this.set(11, value);
  }

  /** CLP12 DRG Weight. */
  drgWeight(value: string | number): this {
    return this.set(12, String(value));
  }

  /** CLP13 Discharge Fraction. */
  dischargeFraction(value: string | number): this {
    return this.set(13, String(value));
  }

  /** CLP01. */
  getClaimSubmitterIdentifier(): string {
    return this.get(1);
  }

  /** CLP02. */
  getClaimStatusCode(): string {
    return this.get(2);
  }

  /** CLP04. */
  getPaymentAmount(): string {
    return this.get(4);
  }
}

/** One adjustment of a CAS segment: a reason code, its amount and its quantity. */
export interface Adjustment {
  /** Adjustment Reason Code (from the external CARC list). */
  reason: string;
  /** Adjustment Amount. */
  amount: string | number;
  /** Adjustment Quantity. */
  quantity?: string | number;
}

/** CAS: Claim Adjustment (2100) or Service Adjustment (2110). */
export class CAS extends BaseSegment {
  /** The segment identifier. */
  id = "CAS";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** CAS01 Claim Adjustment Group Code (`CO` contractual obligations, `OA` other adjustment, `PR` patient responsibility, `PI`). */
  claimAdjustmentGroupCode(value: string): this {
    return this.set(1, value);
  }

  /** CAS02 to CAS19: up to six adjustments, each a reason code, an amount and a quantity. */
  adjustments(...adjustments: Adjustment[]): this {
    adjustments.slice(0, 6).forEach((a, i) => {
      this.set(2 + i * 3, a.reason).set(3 + i * 3, String(a.amount));
      if (a.quantity !== undefined) this.set(4 + i * 3, String(a.quantity));
    });
    return this;
  }

  /** CAS01. */
  getGroupCode(): string {
    return this.get(1);
  }

  /** The adjustments CAS02 to CAS19 hold. */
  getAdjustments(): Adjustment[] {
    const out: Adjustment[] = [];
    for (let i = 0; i < 6; i++) {
      const reason = this.get(2 + i * 3);
      if (!reason) continue;
      const quantity = this.get(4 + i * 3);
      out.push({ reason, amount: this.get(3 + i * 3), ...(quantity ? { quantity } : {}) });
    }
    return out;
  }
}

const procedure = (p: MedicalProcedure) => [p.qualifier, p.code, ...(p.modifiers ?? [])];

/** SVC: Service Payment Information, one adjudicated service line. */
export class SVC extends BaseSegment {
  /** The segment identifier. */
  id = "SVC";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** SVC01 Composite Medical Procedure Identifier: the adjudicated procedure. */
  adjudicatedProcedure(value: MedicalProcedure): this {
    return this.set(1, procedure(value));
  }

  /** SVC02 Line Item Charge Amount. */
  lineItemChargeAmount(value: string | number): this {
    return this.set(2, String(value));
  }

  /** SVC03 Line Item Provider Payment Amount. */
  lineItemProviderPaymentAmount(value: string | number): this {
    return this.set(3, String(value));
  }

  /** SVC04 NUBC Revenue Code. */
  revenueCode(value: string): this {
    return this.set(4, value);
  }

  /** SVC05 Units of Service Paid Count. */
  unitsOfServicePaidCount(value: string | number): this {
    return this.set(5, String(value));
  }

  /** SVC06 Composite Medical Procedure Identifier: the procedure as submitted, when it differs. */
  submittedProcedure(value: MedicalProcedure): this {
    return this.set(6, procedure(value));
  }

  /** SVC07 Original Units of Service Count. */
  originalUnitsOfServiceCount(value: string | number): this {
    return this.set(7, String(value));
  }

  /** SVC01-1 and SVC01-2. */
  getProcedure(): { qualifier: string; code: string } {
    return { qualifier: this.getComponent(1, 1), code: this.getComponent(1, 2) };
  }

  /** SVC03. */
  getPaymentAmount(): string {
    return this.get(3);
  }
}

/** One adjustment of a PLB segment: the reason code with its identifier, and the amount. */
export interface ProviderAdjustment {
  /** Adjustment Reason Code (`WO` overpayment recovery, `FB` forwarding balance, `L6`, …). */
  reason: string;
  /** Provider Adjustment Identifier. */
  identifier?: string;
  /** Provider Adjustment Amount. */
  amount: string | number;
}

/** PLB: Provider Adjustment, adjustments not tied to one claim. */
export class PLB extends BaseSegment {
  /** The segment identifier. */
  id = "PLB";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** PLB01 Provider Identifier. */
  providerIdentifier(value: string): this {
    return this.set(1, value);
  }

  /** PLB02 Fiscal Period Date, `CCYYMMDD`. */
  fiscalPeriodDate(value: Date | string): this {
    return this.set(2, formatDate8(value));
  }

  /** PLB03 to PLB14: up to six adjustments, each an adjustment identifier and an amount. */
  adjustments(...adjustments: ProviderAdjustment[]): this {
    adjustments.slice(0, 6).forEach((a, i) => this.set(3 + i * 2, [a.reason, a.identifier]).set(4 + i * 2, String(a.amount)));
    return this;
  }

  /** The adjustments PLB03 to PLB14 hold. */
  getAdjustments(): ProviderAdjustment[] {
    const out: ProviderAdjustment[] = [];
    for (let i = 0; i < 6; i++) {
      const reason = this.getComponent(3 + i * 2, 1);
      if (!reason) continue;
      const identifier = this.getComponent(3 + i * 2, 2);
      out.push({ reason, ...(identifier ? { identifier } : {}), amount: this.get(4 + i * 2) });
    }
    return out;
  }
}
