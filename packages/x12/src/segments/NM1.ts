import { BaseSegment, type Element } from "../types/segment.ts";

/** A person's name, NM103 to NM107. */
export interface PersonName {
  /** NM103 Name Last. */
  last: string;
  /** NM104 Name First. */
  first?: string;
  /** NM105 Name Middle. */
  middle?: string;
  /** NM106 Name Prefix. */
  prefix?: string;
  /** NM107 Name Suffix. */
  suffix?: string;
}

/**
 * NM1: Individual or Organizational Name. NM101 says whose name it is (`PR` payer, `1P` provider;
 * the 270/271 use `IL` in the Subscriber Name and `03` in the Dependent Name). Element names and types from the CMS 270/271 crosswalk
 * (`docs/validation/005010X279A1-ledger.md`, section 4).
 */
export class NM1 extends BaseSegment {
  /** The segment identifier. */
  id = "NM1";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** NM101 Entity Identifier Code. */
  entityIdentifierCode(value: string): this {
    return this.set(1, value);
  }

  /** NM102 Entity Type Qualifier (`1` person, `2` non-person entity). */
  entityTypeQualifier(value: string): this {
    return this.set(2, value);
  }

  /** NM103 Name Last or Organization Name. */
  nameLastOrOrganizationName(value: string): this {
    return this.set(3, value);
  }

  /** NM104 Name First. */
  nameFirst(value: string): this {
    return this.set(4, value);
  }

  /** NM105 Name Middle. */
  nameMiddle(value: string): this {
    return this.set(5, value);
  }

  /** NM106 Name Prefix. */
  namePrefix(value: string): this {
    return this.set(6, value);
  }

  /** NM107 Name Suffix. */
  nameSuffix(value: string): this {
    return this.set(7, value);
  }

  /** NM102 `1` and NM103 to NM107. */
  person(name: PersonName): this {
    this.entityTypeQualifier("1").nameLastOrOrganizationName(name.last);
    if (name.first !== undefined) this.nameFirst(name.first);
    if (name.middle !== undefined) this.nameMiddle(name.middle);
    if (name.prefix !== undefined) this.namePrefix(name.prefix);
    if (name.suffix !== undefined) this.nameSuffix(name.suffix);
    return this;
  }

  /** NM102 `2` and NM103. */
  organization(name: string): this {
    return this.entityTypeQualifier("2").nameLastOrOrganizationName(name);
  }

  /** NM108 Identification Code Qualifier (`PI` payer ID, `XX` NPI, `MI` member ID, …). */
  identificationCodeQualifier(value: string): this {
    return this.set(8, value);
  }

  /** NM109 Identification Code. */
  identificationCode(value: string): this {
    return this.set(9, value);
  }

  /** NM108 and NM109 together. */
  identification(qualifier: string, code: string): this {
    return this.identificationCodeQualifier(qualifier).identificationCode(code);
  }

  /** NM110 Entity Relationship Code. */
  entityRelationshipCode(value: string): this {
    return this.set(10, value);
  }

  /** NM101. */
  getEntityIdentifierCode(): string {
    return this.get(1);
  }

  /** NM103. */
  getLastOrOrganizationName(): string {
    return this.get(3);
  }

  /** NM104. */
  getFirstName(): string {
    return this.get(4);
  }

  /** NM109. */
  getIdentificationCode(): string {
    return this.get(9);
  }
}
