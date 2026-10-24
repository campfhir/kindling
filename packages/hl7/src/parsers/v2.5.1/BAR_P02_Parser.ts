import { Result } from "../../types/result.ts";
import { EncodingCharacters } from "../../types/encoding.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { DB1 } from "../../segments/v2.5.1/DB1.ts";
import {
  BAR_P02_Parser as BAR_P02_Parser_base,
  ParsedBAR_P02,
  ParsedBARPurgePatient,
} from "../v2.5/BAR_P02_Parser.ts";

export type { ParsedBAR_P02, ParsedBARPurgePatient };

/** Parser for HL7 BAR^P02 (v2.5.1) messages. */
export class BAR_P02_Parser extends BAR_P02_Parser_base {
  protected override parseMSH(s: string): Result<MSH> {
    return MSH.parse(s);
  }

  protected override parseEVN(s: string, e: EncodingCharacters): Result<EVN> {
    return EVN.parse(s, e);
  }

  protected override parsePID(s: string, e: EncodingCharacters): Result<PID> {
    return PID.parse(s, e);
  }

  protected override parsePD1(s: string, e: EncodingCharacters): Result<PD1> {
    return PD1.parse(s, e);
  }

  protected override parsePV1(s: string, e: EncodingCharacters): Result<PV1> {
    return PV1.parse(s, e);
  }

  protected override parseDB1(s: string, e: EncodingCharacters): Result<DB1> {
    return DB1.parse(s, e);
  }
}

/** Parses an HL7 BAR^P02 (v2.5.1) message string into a structured result. */
export function parseBAR_P02(messageString: string): Result<ParsedBAR_P02> {
  return new BAR_P02_Parser().parse(messageString);
}
