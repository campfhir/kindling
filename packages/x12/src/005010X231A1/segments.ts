/**
 * The segments of the 999 Implementation Acknowledgment (005010X231A1). Element names, usage and
 * code values are those the public companion guides reprint (Indiana and Wisconsin Medicaid, X12's
 * 999 example and requests for interpretation); see `docs/validation/005010X231A1-ledger.md`.
 * No public source gives most of their types and lengths, so the setters take strings as given.
 *
 * @module
 */
import { BaseSegment, type Element, type ElementValue } from "../types/segment.ts";

/** A position in a segment: element, component in a composite, repetition (IK401, CTX05). */
export interface PositionInSegment {
  /** Element Position in Segment (counting from 1 after the segment ID). */
  element: number | string;
  /** Component Data Element Position in Composite. */
  component?: number | string;
  /** Repeating Data Element Position. */
  repetition?: number | string;
}

const position = (p: PositionInSegment): ElementValue =>
  [String(p.element), p.component === undefined ? undefined : String(p.component), p.repetition === undefined ? undefined : String(p.repetition)];

/** AK1: Functional Group Response Header. */
export class AK1 extends BaseSegment {
  /** The segment identifier. */
  id = "AK1";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** AK101 Functional Identifier Code: GS01 of the acknowledged group. */
  functionalIdentifierCode(value: string): this {
    return this.set(1, value);
  }

  /** AK102 Group Control Number: GS06 of the acknowledged group. */
  groupControlNumber(value: string): this {
    return this.set(2, value);
  }

  /** AK103 Version / Release / Industry Identifier Code: GS08 of the acknowledged group. */
  versionReleaseIndustryIdentifierCode(value: string): this {
    return this.set(3, value);
  }
}

/** AK2: Transaction Set Response Header (loop 2000). */
export class AK2 extends BaseSegment {
  /** The segment identifier. */
  id = "AK2";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** AK201 Transaction Set Identifier Code: ST01 of the acknowledged transaction set. */
  transactionSetIdentifierCode(value: string): this {
    return this.set(1, value);
  }

  /** AK202 Transaction Set Control Number: ST02 of the acknowledged transaction set. */
  transactionSetControlNumber(value: string): this {
    return this.set(2, value);
  }

  /** AK203 Implementation Convention Reference: ST03 of the acknowledged transaction set, when it has one. */
  implementationConventionReference(value: string): this {
    return this.set(3, value);
  }
}

/** IK3: Error Identification (loop 2100), the segment in error. */
export class IK3 extends BaseSegment {
  /** The segment identifier. */
  id = "IK3";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** IK301 Segment ID Code of the segment in error. */
  segmentIdCode(value: string): this {
    return this.set(1, value);
  }

  /** IK302 Segment Position in Transaction Set, counting ST as 1. */
  segmentPositionInTransactionSet(value: number | string): this {
    return this.set(2, String(value));
  }

  /** IK303 Loop Identifier Code of the segment in error (`2100C`). */
  loopIdentifierCode(value: string): this {
    return this.set(3, value);
  }

  /** IK304 Implementation Segment Syntax Error Code (see {@link SEGMENT_SYNTAX_ERRORS}). */
  segmentSyntaxErrorCode(value: SegmentSyntaxErrorCode | (string & {})): this {
    return this.set(4, value);
  }
}

/**
 * CTX: Context. In loop 2100 it is either the Segment Context (CTX01-1 `SITUATIONAL TRIGGER`) or the
 * Business Unit Identifier (CTX01-1 the identifier's name, such as `CLM01` or `TRN02`, and CTX01-2
 * its value); in loop 2110 it is the Element Context (`SITUATIONAL TRIGGER`).
 */
export class CTX extends BaseSegment {
  /** The segment identifier. */
  id = "CTX";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** CTX01 Context Identification: Context Name, and Context Reference for a business unit. */
  contextIdentification(name: string, reference?: string): this {
    return this.set(1, [name, reference]);
  }

  /** CTX02 Segment ID Code of the segment that set up the situation. */
  segmentIdCode(value: string): this {
    return this.set(2, value);
  }

  /** CTX03 Segment Position in Transaction Set. */
  segmentPositionInTransactionSet(value: number | string): this {
    return this.set(3, String(value));
  }

  /** CTX04 Loop Identifier Code. */
  loopIdentifierCode(value: string): this {
    return this.set(4, value);
  }

  /** CTX05 Position in Segment. */
  positionInSegment(value: PositionInSegment): this {
    return this.set(5, position(value));
  }

  /** CTX06 Reference in Segment: Data Element Reference Number (CTX06-2 is not used in X231A1). */
  referenceInSegment(value: string): this {
    return this.set(6, value);
  }
}

/** IK4: Implementation Data Element Note (loop 2110), the element in error. */
export class IK4 extends BaseSegment {
  /** The segment identifier. */
  id = "IK4";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** IK401 Position in Segment. */
  positionInSegment(value: PositionInSegment): this {
    return this.set(1, position(value));
  }

  /** IK402 Data Element Reference Number (numeric; not sent for a composite). */
  dataElementReferenceNumber(value: number | string): this {
    return this.set(2, String(value));
  }

  /** IK403 Implementation Data Element Syntax Error Code (see {@link ELEMENT_SYNTAX_ERRORS}). */
  dataElementSyntaxErrorCode(value: ElementSyntaxErrorCode | (string & {})): this {
    return this.set(3, value);
  }

  /** IK404 Copy of Bad Data Element. */
  copyOfBadDataElement(value: string): this {
    return this.set(4, value);
  }
}

/** IK5: Transaction Set Response Trailer (loop 2000), the verdict on one transaction set. */
export class IK5 extends BaseSegment {
  /** The segment identifier. */
  id = "IK5";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** IK501 Transaction Set Acknowledgment Code (see {@link TRANSACTION_SET_ACKNOWLEDGMENTS}). */
  transactionSetAcknowledgmentCode(value: TransactionSetAcknowledgmentCode | (string & {})): this {
    return this.set(1, value);
  }

  /** IK502 to IK506 Implementation Transaction Set Syntax Error Codes, up to five. */
  syntaxErrorCodes(...codes: string[]): this {
    codes.slice(0, 5).forEach((code, i) => this.set(2 + i, code));
    return this;
  }

  /** IK501. */
  getAcknowledgmentCode(): string {
    return this.get(1);
  }
}

/** AK9: Functional Group Response Trailer, the verdict on the group. */
export class AK9 extends BaseSegment {
  /** The segment identifier. */
  id = "AK9";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** AK901 Functional Group Acknowledge Code (see {@link FUNCTIONAL_GROUP_ACKNOWLEDGMENTS}). */
  functionalGroupAcknowledgeCode(value: FunctionalGroupAcknowledgeCode | (string & {})): this {
    return this.set(1, value);
  }

  /** AK902 Number of Transaction Sets Included: GE01 of the acknowledged group. */
  numberOfTransactionSetsIncluded(value: number | string): this {
    return this.set(2, String(value));
  }

  /** AK903 Number of Received Transaction Sets. */
  numberOfReceivedTransactionSets(value: number | string): this {
    return this.set(3, String(value));
  }

  /** AK904 Number of Accepted Transaction Sets. */
  numberOfAcceptedTransactionSets(value: number | string): this {
    return this.set(4, String(value));
  }

  /** AK905 to AK909 Functional Group Syntax Error Codes, up to five (see {@link FUNCTIONAL_GROUP_SYNTAX_ERRORS}). */
  syntaxErrorCodes(...codes: string[]): this {
    codes.slice(0, 5).forEach((code, i) => this.set(5 + i, code));
    return this;
  }

  /** AK901. */
  getAcknowledgeCode(): string {
    return this.get(1);
  }
}

/** IK304 codes (Indiana, Wisconsin, Illinois and Nevada guides agree). */
export const SEGMENT_SYNTAX_ERRORS = {
  "1": "Unrecognized segment ID",
  "2": "Unexpected segment",
  "3": "Required segment missing",
  "4": "Loop occurs over maximum times",
  "5": "Segment exceeds maximum use",
  "6": "Segment not in defined transaction set",
  "7": "Segment not in proper sequence",
  "8": "Segment has data element errors",
  I4: 'Implementation "Not Used" segment present',
  I6: "Implementation dependent segment missing",
  I7: "Implementation loop occurs under minimum times",
  I8: "Implementation segment below minimum use",
  I9: 'Implementation dependent "Not Used" segment present',
} as const;

/** An IK304 code. */
export type SegmentSyntaxErrorCode = keyof typeof SEGMENT_SYNTAX_ERRORS;

/** IK403 codes (Indiana, Wisconsin and Illinois agree; there is no code 11). */
export const ELEMENT_SYNTAX_ERRORS = {
  "1": "Required data element missing",
  "2": "Conditional required data element missing",
  "3": "Too many data elements",
  "4": "Data element too short",
  "5": "Data element too long",
  "6": "Invalid character in data element",
  "7": "Invalid code value",
  "8": "Invalid date",
  "9": "Invalid time",
  "10": "Exclusion condition violated",
  "12": "Too many repetitions",
  "13": "Too many components",
  I6: "Code value not used in implementation",
  I9: "Implementation dependent data element missing",
  I10: 'Implementation "Not Used" data element present',
  I11: "Implementation too few repetitions",
  I12: "Implementation pattern match failure",
  I13: 'Implementation dependent "Not Used" data element present',
} as const;

/** An IK403 code. */
export type ElementSyntaxErrorCode = keyof typeof ELEMENT_SYNTAX_ERRORS;

/** IK501 codes (Wisconsin, Illinois). IK5 has no `P`. */
export const TRANSACTION_SET_ACKNOWLEDGMENTS = {
  A: "Accepted",
  E: "Accepted But Errors Were Noted",
  M: "Rejected, Message Authentication Code (MAC) Failed",
  R: "Rejected",
  W: "Rejected, Assurance Failed Validity Tests",
  X: "Rejected, Content After Decryption Could Not Be Analyzed",
} as const;

/** An IK501 code. */
export type TransactionSetAcknowledgmentCode = keyof typeof TRANSACTION_SET_ACKNOWLEDGMENTS;

/**
 * The IK502–IK506 codes whose descriptions the public guides confirm (Indiana; X12 RFI 1612 for 16).
 * Wisconsin lists further codes (8–13, 15, 17, 23–27) without descriptions.
 */
export const TRANSACTION_SET_SYNTAX_ERRORS = {
  "1": "Transaction Set Not Supported",
  "2": "Transaction Set Trailer Missing",
  "3": "Transaction Set Control Number in Header and Trailer Do Not Match",
  "4": "Number of Included Segments Does Not Match Actual Count",
  "5": "One or More Segments in Error",
  "6": "Missing or Invalid Transaction Set Identifier",
  "7": "Missing or Invalid Transaction Set Control Number",
  "16": "Syntax Error in Decrypted Text",
  "18": "Transaction Set Not in Functional Group",
  "19": "Invalid Transaction Set Implementation Convention Reference",
  I5: "Implementation One or More Segments in Error",
  I6: "Implementation Convention Not Supported",
} as const;

/** AK901 codes (Wisconsin). */
export const FUNCTIONAL_GROUP_ACKNOWLEDGMENTS = {
  A: "Accepted",
  E: "Accepted But Errors Were Noted",
  M: "Rejected, Message Authentication Code (MAC) Failed",
  P: "Partially Accepted, At Least One Transaction Set Was Rejected",
  R: "Rejected",
  W: "Rejected, Assurance Failed Validity Tests",
  X: "Rejected, Content After Decryption Could Not Be Analyzed",
} as const;

/** An AK901 code. */
export type FunctionalGroupAcknowledgeCode = keyof typeof FUNCTIONAL_GROUP_ACKNOWLEDGMENTS;

/** AK905–AK909 codes (Wisconsin). */
export const FUNCTIONAL_GROUP_SYNTAX_ERRORS = {
  "1": "Functional Group Not Supported",
  "2": "Functional Group Version Not Supported",
  "3": "Functional Group Trailer Missing",
  "4": "Group Control Number in the Functional Group Header and Trailer Do Not Agree",
  "5": "Number of Included Transaction Sets Does Not Match Actual Count",
  "6": "Group Control Number Violates Syntax",
  "10": "Authentication Key Name Unknown",
  "11": "Encryption Key Name Unknown",
  "12": "Requested Service (Authentication or Encryption) Not Available",
  "13": "Unknown Security Recipient",
  "14": "Unknown Security Originator",
  "15": "Syntax Error in Decrypted Text",
  "16": "Security Not Supported",
  "17": "Incorrect Message Length (Encryption Only)",
  "18": "Message Authentication Code Failed",
  "19": "Functional Group Control Number not Unique within Interchange",
  "23": "S3E Security End Segment Missing for S3S Security Start Segment",
  "24": "S3S Security Start Segment Missing for S3E End Segment",
  "25": "S4E Security End Segment Missing for S4S Security",
  "26": "S4S Security Start Segment Missing for S4E Security End Segment",
} as const;
