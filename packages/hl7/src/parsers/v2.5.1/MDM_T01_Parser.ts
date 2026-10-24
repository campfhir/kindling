import { Result } from "../../types/result.ts";
import { EncodingCharacters } from "../../types/encoding.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { TXA } from "../../segments/v2.5.1/TXA.ts";
import {
  MDM_T01_Parser as MDM_T01_Parser_base,
  ParsedMDM_T01,
  ParsedMDMOrder,
  ParsedMDMTiming,
} from "../v2.5/MDM_T01_Parser.ts";

export type { ParsedMDM_T01, ParsedMDMOrder, ParsedMDMTiming };

/** Parser for HL7 MDM^T01 (v2.5.1) messages. */
export class MDM_T01_Parser extends MDM_T01_Parser_base {
  protected override parseMSH(s: string): Result<MSH> {
    return MSH.parse(s);
  }

  protected override parseSFT(s: string, e: EncodingCharacters): Result<SFT> {
    return SFT.parse(s, e);
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

  protected override parseORC(s: string, e: EncodingCharacters): Result<ORC> {
    return ORC.parse(s, e);
  }

  protected override parseTQ1(s: string, e: EncodingCharacters): Result<TQ1> {
    return TQ1.parse(s, e);
  }

  protected override parseTQ2(s: string, e: EncodingCharacters): Result<TQ2> {
    return TQ2.parse(s, e);
  }

  protected override parseOBR(s: string, e: EncodingCharacters): Result<OBR> {
    return OBR.parse(s, e);
  }

  protected override parseNTE(s: string, e: EncodingCharacters): Result<NTE> {
    return NTE.parse(s, e);
  }

  protected override parseTXA(s: string, e: EncodingCharacters): Result<TXA> {
    return TXA.parse(s, e);
  }
}

/** Parses an HL7 MDM^T01 (v2.5.1) message string into a structured result. */
export function parseMDM_T01(messageString: string): Result<ParsedMDM_T01> {
  return new MDM_T01_Parser().parse(messageString);
}
