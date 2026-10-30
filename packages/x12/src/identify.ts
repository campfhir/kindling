/**
 * What an X12 input says about itself, read from its envelope headers without grouping it: the
 * interchange's ISA and the GS08, ST01 and ST03 of every transaction set. The root entry exports it,
 * so a caller can route an interchange before parsing it.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import type { Delimiters } from "./types/delimiters.ts";
import { stripLeader, tokenize } from "./tokenize.ts";
import { ISA } from "./envelope/ISA.ts";

/** One transaction set, as its ST and its group's GS name it. */
export interface TransactionSetType {
  /** GS01 Functional Identifier Code of its group (`HS`). */
  functionalIdentifierCode: string;
  /** GS08 of its group (`005010X279A1`). */
  version: string;
  /** ST01 Transaction Set Identifier Code (`270`). */
  transactionSet: string;
  /** ST02 Transaction Set Control Number. */
  controlNumber: string;
  /** ST03 Implementation Convention Reference, when sent. */
  implementationConventionReference?: string;
}

/** What an interchange's envelope says about it. */
export interface InterchangeType {
  /** The delimiters announced in the ISA. */
  delimiters: Delimiters;
  /** ISA12 Interchange Control Version Number (`00501`). */
  version: string;
  /** ISA06, without its padding. */
  senderId: string;
  /** ISA08, without its padding. */
  receiverId: string;
  /** ISA13. */
  controlNumber: string;
  /** ISA15 (`P` production, `T` test). */
  usageIndicator: string;
  /** Every transaction set, in order. */
  transactionSets: TransactionSetType[];
}

/** Whether an input is an X12 interchange: it starts with `ISA` (after any whitespace). */
export function isX12Input(input: string): boolean {
  return stripLeader(input).startsWith("ISA");
}

/** Reads an interchange's ISA, and the GS and ST of every transaction set. */
export function identifyInterchange(input: string): Result<InterchangeType> {
  const tokens = tokenize(input);
  if (!tokens.ok) return tokens;
  const { delimiters, segments } = tokens.val;
  const isa = new ISA(segments[0].elements);
  const transactionSets: TransactionSetType[] = [];
  let functionalIdentifierCode = "";
  let version = "";
  for (const segment of segments) {
    if (segment.id === "GS") {
      functionalIdentifierCode = segment.get(1);
      version = segment.get(8);
    } else if (segment.id === "ST") {
      const reference = segment.get(3);
      transactionSets.push({
        functionalIdentifierCode,
        version,
        transactionSet: segment.get(1),
        controlNumber: segment.get(2),
        ...(reference ? { implementationConventionReference: reference } : {}),
      });
    }
  }
  return {
    ok: true,
    val: {
      delimiters,
      version: isa.getVersion(),
      senderId: isa.getSenderId(),
      receiverId: isa.getReceiverId(),
      controlNumber: isa.getControlNumber(),
      usageIndicator: isa.getUsageIndicator(),
      transactionSets,
    },
  };
}
