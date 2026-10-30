/**
 * The HL7 v2.1 messages, keyed by message structure name, each mapped to its parser.
 * The root `parse()` dispatches on this map once it has read MSH-9 and MSH-12.
 *
 * @module
 */
import type { Result } from "../types/result.ts";
import type { ParsedMessageBase } from "../types/structure.ts";
import { parseACK } from "./ACK.ts";
import { parseADR_A19 } from "./ADR_A19.ts";
import { parseADT_A01 } from "./ADT_A01.ts";
import { parseADT_A02 } from "./ADT_A02.ts";
import { parseADT_A03 } from "./ADT_A03.ts";
import { parseADT_A04 } from "./ADT_A04.ts";
import { parseADT_A05 } from "./ADT_A05.ts";
import { parseADT_A06 } from "./ADT_A06.ts";
import { parseADT_A07 } from "./ADT_A07.ts";
import { parseADT_A08 } from "./ADT_A08.ts";
import { parseADT_A09 } from "./ADT_A09.ts";
import { parseADT_A10 } from "./ADT_A10.ts";
import { parseADT_A11 } from "./ADT_A11.ts";
import { parseADT_A12 } from "./ADT_A12.ts";
import { parseADT_A13 } from "./ADT_A13.ts";
import { parseADT_A14 } from "./ADT_A14.ts";
import { parseADT_A15 } from "./ADT_A15.ts";
import { parseADT_A16 } from "./ADT_A16.ts";
import { parseADT_A17 } from "./ADT_A17.ts";
import { parseADT_A18 } from "./ADT_A18.ts";
import { parseADT_A20 } from "./ADT_A20.ts";
import { parseADT_A21 } from "./ADT_A21.ts";
import { parseADT_A22 } from "./ADT_A22.ts";
import { parseADT_A23 } from "./ADT_A23.ts";
import { parseADT_A24 } from "./ADT_A24.ts";
import { parseBAR_P01 } from "./BAR_P01.ts";
import { parseBAR_P02 } from "./BAR_P02.ts";
import { parseDFT_P03 } from "./DFT_P03.ts";
import { parseDSR_Q01 } from "./DSR_Q01.ts";
import { parseDSR_Q03 } from "./DSR_Q03.ts";
import { parseMCF_Q02 } from "./MCF_Q02.ts";
import { parseORM_O01 } from "./ORM_O01.ts";
import { parseORR_O02 } from "./ORR_O02.ts";
import { parseORU_R01 } from "./ORU_R01.ts";
import { parseORU_R03 } from "./ORU_R03.ts";
import { parseQRY_A19 } from "./QRY_A19.ts";
import { parseQRY_Q01 } from "./QRY_Q01.ts";
import { parseQRY_Q02 } from "./QRY_Q02.ts";
import { parseUDM_Q05 } from "./UDM_Q05.ts";

/** Parses one message string into its structured form. */
type MessageParser = (messageString: string) => Result<ParsedMessageBase>;

/** The parsers of the HL7 v2.1 messages, keyed by message structure name (`ADT_A01`, `ACK`). */
export const MESSAGES = {
  ACK: parseACK,
  ADR_A19: parseADR_A19,
  ADT_A01: parseADT_A01,
  ADT_A02: parseADT_A02,
  ADT_A03: parseADT_A03,
  ADT_A04: parseADT_A04,
  ADT_A05: parseADT_A05,
  ADT_A06: parseADT_A06,
  ADT_A07: parseADT_A07,
  ADT_A08: parseADT_A08,
  ADT_A09: parseADT_A09,
  ADT_A10: parseADT_A10,
  ADT_A11: parseADT_A11,
  ADT_A12: parseADT_A12,
  ADT_A13: parseADT_A13,
  ADT_A14: parseADT_A14,
  ADT_A15: parseADT_A15,
  ADT_A16: parseADT_A16,
  ADT_A17: parseADT_A17,
  ADT_A18: parseADT_A18,
  ADT_A20: parseADT_A20,
  ADT_A21: parseADT_A21,
  ADT_A22: parseADT_A22,
  ADT_A23: parseADT_A23,
  ADT_A24: parseADT_A24,
  BAR_P01: parseBAR_P01,
  BAR_P02: parseBAR_P02,
  DFT_P03: parseDFT_P03,
  DSR_Q01: parseDSR_Q01,
  DSR_Q03: parseDSR_Q03,
  MCF_Q02: parseMCF_Q02,
  ORM_O01: parseORM_O01,
  ORR_O02: parseORR_O02,
  ORU_R01: parseORU_R01,
  ORU_R03: parseORU_R03,
  QRY_A19: parseQRY_A19,
  QRY_Q01: parseQRY_Q01,
  QRY_Q02: parseQRY_Q02,
  UDM_Q05: parseUDM_Q05,
} as const satisfies Record<string, MessageParser>;

/** The name of an HL7 v2.1 message structure (`"ADT_A01" | "ACK" | ...`). */
export type MessageStructure = keyof typeof MESSAGES;

/** The parsed form of an HL7 v2.1 message structure (a union of all of them by default). */
export type ParsedMessage<S extends MessageStructure = MessageStructure> =
  (typeof MESSAGES)[S] extends (messageString: string) => Result<infer T> ? T : never;
