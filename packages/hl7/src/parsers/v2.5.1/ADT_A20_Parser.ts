import { Result } from "../../types/result.ts";
import { EncodingCharacters } from "../../types/encoding.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { NPU } from "../../segments/v2.5.1/NPU.ts";
import {
  ADT_A20_Parser as ADT_A20_Parser_base,
  ParsedADT_A20,
} from "../v2.5/ADT_A20_Parser.ts";

export type { ParsedADT_A20 };

/** Parser for HL7 ADT^A20 (v2.5.1) messages. */
export class ADT_A20_Parser extends ADT_A20_Parser_base {
  protected override parseMSH(s: string): Result<MSH> {
    return MSH.parse(s);
  }

  protected override parseEVN(s: string, e: EncodingCharacters): Result<EVN> {
    return EVN.parse(s, e);
  }

  protected override parseNPU(s: string, e: EncodingCharacters): Result<NPU> {
    return NPU.parse(s, e);
  }
}

/** Parses an HL7 ADT^A20 (v2.5.1) message string into a structured result. */
export function parseADT_A20(messageString: string): Result<ParsedADT_A20> {
  return new ADT_A20_Parser().parse(messageString);
}
