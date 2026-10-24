import { Result } from "../../types/result.ts";
import { EncodingCharacters } from "../../types/encoding.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { SCH } from "../../segments/v2.5.1/SCH.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { DG1 } from "../../segments/v2.5.1/DG1.ts";
import { RGS } from "../../segments/v2.5.1/RGS.ts";
import { AIS } from "../../segments/v2.5.1/AIS.ts";
import { AIG } from "../../segments/v2.5.1/AIG.ts";
import { AIL } from "../../segments/v2.5.1/AIL.ts";
import { AIP } from "../../segments/v2.5.1/AIP.ts";
import {
  SRR_S01_Parser as SRR_S01_Parser_base,
  ParsedSRR_S01,
  ParsedSRRSchedule,
  ParsedSRRPatient,
  ParsedSRRResources,
  ParsedSRRService,
  ParsedSRRGeneralResource,
  ParsedSRRLocationResource,
  ParsedSRRPersonnelResource,
} from "../v2.5/SRR_S01_Parser.ts";

export type { ParsedSRR_S01, ParsedSRRSchedule, ParsedSRRPatient, ParsedSRRResources, ParsedSRRService, ParsedSRRGeneralResource, ParsedSRRLocationResource, ParsedSRRPersonnelResource };

/** Parser for HL7 SRR^S01 (v2.5.1) messages. */
export class SRR_S01_Parser extends SRR_S01_Parser_base {
  protected override parseMSH(s: string): Result<MSH> {
    return MSH.parse(s);
  }

  protected override parseMSA(s: string, e: EncodingCharacters): Result<MSA> {
    return MSA.parse(s, e);
  }

  protected override parseERR(s: string, e: EncodingCharacters): Result<ERR> {
    return ERR.parse(s, e);
  }

  protected override parseSCH(s: string, e: EncodingCharacters): Result<SCH> {
    return SCH.parse(s, e);
  }

  protected override parseTQ1(s: string, e: EncodingCharacters): Result<TQ1> {
    return TQ1.parse(s, e);
  }

  protected override parseNTE(s: string, e: EncodingCharacters): Result<NTE> {
    return NTE.parse(s, e);
  }

  protected override parsePID(s: string, e: EncodingCharacters): Result<PID> {
    return PID.parse(s, e);
  }

  protected override parsePV1(s: string, e: EncodingCharacters): Result<PV1> {
    return PV1.parse(s, e);
  }

  protected override parsePV2(s: string, e: EncodingCharacters): Result<PV2> {
    return PV2.parse(s, e);
  }

  protected override parseDG1(s: string, e: EncodingCharacters): Result<DG1> {
    return DG1.parse(s, e);
  }

  protected override parseRGS(s: string, e: EncodingCharacters): Result<RGS> {
    return RGS.parse(s, e);
  }

  protected override parseAIS(s: string, e: EncodingCharacters): Result<AIS> {
    return AIS.parse(s, e);
  }

  protected override parseAIG(s: string, e: EncodingCharacters): Result<AIG> {
    return AIG.parse(s, e);
  }

  protected override parseAIL(s: string, e: EncodingCharacters): Result<AIL> {
    return AIL.parse(s, e);
  }

  protected override parseAIP(s: string, e: EncodingCharacters): Result<AIP> {
    return AIP.parse(s, e);
  }
}

/** Parses an HL7 SRR^S01 (v2.5.1) message string into a structured result. */
export function parseSRR_S01(messageString: string): Result<ParsedSRR_S01> {
  return new SRR_S01_Parser().parse(messageString);
}
