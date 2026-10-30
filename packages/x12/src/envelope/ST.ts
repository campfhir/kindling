import { BaseSegment, type Element } from "../types/segment.ts";

/** ST: Transaction Set Header. */
export class ST extends BaseSegment {
  /** The segment identifier. */
  id = "ST";

  constructor(elements?: Element[]) {
    super();
    if (elements) this.elements = elements;
  }

  /** ST01 Transaction Set Identifier Code (`270`, `837`, …). */
  transactionSetIdentifierCode(value: string): this {
    return this.set(1, value);
  }

  /** ST02 Transaction Set Control Number, 4 to 9 characters. SE02 repeats it. */
  transactionSetControlNumber(value: string): this {
    return this.set(2, value);
  }

  /** ST03 Implementation Convention Reference: the GS08 of the group (`005010X279A1`). */
  implementationConventionReference(value: string): this {
    return this.set(3, value);
  }

  /** ST01. */
  getTransactionSetIdentifierCode(): string {
    return this.get(1);
  }

  /** ST02. */
  getControlNumber(): string {
    return this.get(2);
  }

  /** ST03, or "" when absent. */
  getImplementationConventionReference(): string {
    return this.get(3);
  }
}
