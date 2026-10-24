import { Result } from "../../types/result.ts";
import { EncodingCharacters } from "../../types/encoding.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { DB1 } from "../../segments/v2.5.1/DB1.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { FT1 } from "../../segments/v2.5.1/FT1.ts";
import { PR1 } from "../../segments/v2.5.1/PR1.ts";
import { DG1 } from "../../segments/v2.5.1/DG1.ts";
import { DRG } from "../../segments/v2.5.1/DRG.ts";
import { GT1 } from "../../segments/v2.5.1/GT1.ts";
import { IN1 } from "../../segments/v2.5.1/IN1.ts";
import { IN2 } from "../../segments/v2.5.1/IN2.ts";
import { IN3 } from "../../segments/v2.5.1/IN3.ts";
import { ACC } from "../../segments/v2.5.1/ACC.ts";
import {
  DFT_P03_Parser as DFT_P03_Parser_base,
  ParsedDFT_P03,
  ParsedDFTOrder,
  ParsedDFTTiming,
  ParsedDFTObservation,
  ParsedDFTFinancial,
  ParsedDFTProcedure,
  ParsedDFTFinancialOrder,
  ParsedDFTFinancialTiming,
  ParsedDFTFinancialObservation,
  ParsedDFTInsurance,
} from "../v2.5/DFT_P03_Parser.ts";

export type { ParsedDFT_P03, ParsedDFTOrder, ParsedDFTTiming, ParsedDFTObservation, ParsedDFTFinancial, ParsedDFTProcedure, ParsedDFTFinancialOrder, ParsedDFTFinancialTiming, ParsedDFTFinancialObservation, ParsedDFTInsurance };

/** Parser for HL7 DFT^P03 (v2.5.1) messages. */
export class DFT_P03_Parser extends DFT_P03_Parser_base {
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

  protected override parsePD1(s: string, e: EncodingCharacters): Result<PD1> {
    return PD1.parse(s, e);
  }

  protected override parseROL(s: string, e: EncodingCharacters): Result<ROL> {
    return ROL.parse(s, e);
  }

  protected override parsePV1(s: string, e: EncodingCharacters): Result<PV1> {
    return PV1.parse(s, e);
  }

  protected override parsePV2(s: string, e: EncodingCharacters): Result<PV2> {
    return PV2.parse(s, e);
  }

  protected override parseDB1(s: string, e: EncodingCharacters): Result<DB1> {
    return DB1.parse(s, e);
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

  protected override parseOBX(s: string, e: EncodingCharacters): Result<OBX> {
    return OBX.parse(s, e);
  }

  protected override parseFT1(s: string, e: EncodingCharacters): Result<FT1> {
    return FT1.parse(s, e);
  }

  protected override parsePR1(s: string, e: EncodingCharacters): Result<PR1> {
    return PR1.parse(s, e);
  }

  protected override parseDG1(s: string, e: EncodingCharacters): Result<DG1> {
    return DG1.parse(s, e);
  }

  protected override parseDRG(s: string, e: EncodingCharacters): Result<DRG> {
    return DRG.parse(s, e);
  }

  protected override parseGT1(s: string, e: EncodingCharacters): Result<GT1> {
    return GT1.parse(s, e);
  }

  protected override parseIN1(s: string, e: EncodingCharacters): Result<IN1> {
    return IN1.parse(s, e);
  }

  protected override parseIN2(s: string, e: EncodingCharacters): Result<IN2> {
    return IN2.parse(s, e);
  }

  protected override parseIN3(s: string, e: EncodingCharacters): Result<IN3> {
    return IN3.parse(s, e);
  }

  protected override parseACC(s: string, e: EncodingCharacters): Result<ACC> {
    return ACC.parse(s, e);
  }
}

/** Parses an HL7 DFT^P03 (v2.5.1) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}
