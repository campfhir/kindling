/**
 * The HL7 v2.2 messages, keyed by message structure name, each mapped to its parser.
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
import { parseADT_A25 } from "./ADT_A25.ts";
import { parseADT_A26 } from "./ADT_A26.ts";
import { parseADT_A27 } from "./ADT_A27.ts";
import { parseADT_A28 } from "./ADT_A28.ts";
import { parseADT_A29 } from "./ADT_A29.ts";
import { parseADT_A30 } from "./ADT_A30.ts";
import { parseADT_A31 } from "./ADT_A31.ts";
import { parseADT_A32 } from "./ADT_A32.ts";
import { parseADT_A33 } from "./ADT_A33.ts";
import { parseADT_A34 } from "./ADT_A34.ts";
import { parseADT_A35 } from "./ADT_A35.ts";
import { parseADT_A36 } from "./ADT_A36.ts";
import { parseADT_A37 } from "./ADT_A37.ts";
import { parseBAR_P01 } from "./BAR_P01.ts";
import { parseBAR_P02 } from "./BAR_P02.ts";
import { parseDFT_P03 } from "./DFT_P03.ts";
import { parseDSR_P04 } from "./DSR_P04.ts";
import { parseDSR_Q01 } from "./DSR_Q01.ts";
import { parseDSR_Q03 } from "./DSR_Q03.ts";
import { parseDSR_R03 } from "./DSR_R03.ts";
import { parseMFD_M01 } from "./MFD_M01.ts";
import { parseMFD_M02 } from "./MFD_M02.ts";
import { parseMFD_M03 } from "./MFD_M03.ts";
import { parseMFK_M01 } from "./MFK_M01.ts";
import { parseMFK_M02 } from "./MFK_M02.ts";
import { parseMFK_M03 } from "./MFK_M03.ts";
import { parseMFN_M01 } from "./MFN_M01.ts";
import { parseMFN_M02 } from "./MFN_M02.ts";
import { parseMFN_M03 } from "./MFN_M03.ts";
import { parseMFQ_M01 } from "./MFQ_M01.ts";
import { parseMFQ_M02 } from "./MFQ_M02.ts";
import { parseMFQ_M03 } from "./MFQ_M03.ts";
import { parseMFR_M01 } from "./MFR_M01.ts";
import { parseMFR_M02 } from "./MFR_M02.ts";
import { parseMFR_M03 } from "./MFR_M03.ts";
import { parseNMD_N01 } from "./NMD_N01.ts";
import { parseNMQ_N02 } from "./NMQ_N02.ts";
import { parseNMR_N02 } from "./NMR_N02.ts";
import { parseORF_R04 } from "./ORF_R04.ts";
import { parseORM_O01 } from "./ORM_O01.ts";
import { parseORR_O02 } from "./ORR_O02.ts";
import { parseORU_R01 } from "./ORU_R01.ts";
import { parseQRY_A19 } from "./QRY_A19.ts";
import { parseQRY_P04 } from "./QRY_P04.ts";
import { parseQRY_Q01 } from "./QRY_Q01.ts";
import { parseQRY_Q02 } from "./QRY_Q02.ts";
import { parseQRY_R02 } from "./QRY_R02.ts";
import { parseUDM_Q05 } from "./UDM_Q05.ts";

/** Parses one message string into its structured form. */
type MessageParser = (messageString: string) => Result<ParsedMessageBase>;

/** The parsers of the HL7 v2.2 messages, keyed by message structure name (`ADT_A01`, `ACK`). */
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
  ADT_A25: parseADT_A25,
  ADT_A26: parseADT_A26,
  ADT_A27: parseADT_A27,
  ADT_A28: parseADT_A28,
  ADT_A29: parseADT_A29,
  ADT_A30: parseADT_A30,
  ADT_A31: parseADT_A31,
  ADT_A32: parseADT_A32,
  ADT_A33: parseADT_A33,
  ADT_A34: parseADT_A34,
  ADT_A35: parseADT_A35,
  ADT_A36: parseADT_A36,
  ADT_A37: parseADT_A37,
  BAR_P01: parseBAR_P01,
  BAR_P02: parseBAR_P02,
  DFT_P03: parseDFT_P03,
  DSR_P04: parseDSR_P04,
  DSR_Q01: parseDSR_Q01,
  DSR_Q03: parseDSR_Q03,
  DSR_R03: parseDSR_R03,
  MFD_M01: parseMFD_M01,
  MFD_M02: parseMFD_M02,
  MFD_M03: parseMFD_M03,
  MFK_M01: parseMFK_M01,
  MFK_M02: parseMFK_M02,
  MFK_M03: parseMFK_M03,
  MFN_M01: parseMFN_M01,
  MFN_M02: parseMFN_M02,
  MFN_M03: parseMFN_M03,
  MFQ_M01: parseMFQ_M01,
  MFQ_M02: parseMFQ_M02,
  MFQ_M03: parseMFQ_M03,
  MFR_M01: parseMFR_M01,
  MFR_M02: parseMFR_M02,
  MFR_M03: parseMFR_M03,
  NMD_N01: parseNMD_N01,
  NMQ_N02: parseNMQ_N02,
  NMR_N02: parseNMR_N02,
  ORF_R04: parseORF_R04,
  ORM_O01: parseORM_O01,
  ORR_O02: parseORR_O02,
  ORU_R01: parseORU_R01,
  QRY_A19: parseQRY_A19,
  QRY_P04: parseQRY_P04,
  QRY_Q01: parseQRY_Q01,
  QRY_Q02: parseQRY_Q02,
  QRY_R02: parseQRY_R02,
  UDM_Q05: parseUDM_Q05,
} as const satisfies Record<string, MessageParser>;

/** The name of an HL7 v2.2 message structure (`"ADT_A01" | "ACK" | ...`). */
export type MessageStructure = keyof typeof MESSAGES;

/** The parsed form of an HL7 v2.2 message structure (a union of all of them by default). */
export type ParsedMessage<S extends MessageStructure = MessageStructure> =
  (typeof MESSAGES)[S] extends (messageString: string) => Result<infer T> ? T : never;
