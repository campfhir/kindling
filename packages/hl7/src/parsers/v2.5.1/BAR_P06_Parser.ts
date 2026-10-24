import { Result } from "../../types/result.ts";
import { EncodingCharacters } from "../../types/encoding.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import {
  BAR_P06_Parser as BAR_P06_Parser_base,
  ParsedBAR_P06,
  ParsedBAREndPatient,
} from "../v2.5/BAR_P06_Parser.ts";

export type { ParsedBAR_P06, ParsedBAREndPatient };

/** Parser for HL7 BAR^P06 (v2.5.1) messages. */
export class BAR_P06_Parser extends BAR_P06_Parser_base {
  protected override parseMSH(s: string): Result<MSH> {
    return MSH.parse(s);
  }

  protected override parseEVN(s: string, e: EncodingCharacters): Result<EVN> {
    return EVN.parse(s, e);
  }

  protected override parsePID(s: string, e: EncodingCharacters): Result<PID> {
    return PID.parse(s, e);
  }

  protected override parsePV1(s: string, e: EncodingCharacters): Result<PV1> {
    return PV1.parse(s, e);
  }
}

/** Parses an HL7 BAR^P06 (v2.5.1) message string into a structured result. */
export function parseBAR_P06(messageString: string): Result<ParsedBAR_P06> {
  return new BAR_P06_Parser().parse(messageString);
}
