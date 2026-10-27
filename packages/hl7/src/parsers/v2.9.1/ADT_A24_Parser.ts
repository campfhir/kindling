/**
 * Parser for ADT^A24 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [PV1] [{DB1}] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [PV1] [{DB1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A24_STRUCTURE } from "../../structures/v2.9.1/ADT_A24.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EVN } from "../../segments/v2.9.1/EVN.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { DB1 } from "../../segments/v2.9.1/DB1.ts";

/** Structured result of parsing an HL7 ADT^A24 (HL7 v2.9.1) message. */
export interface ParsedADT_A24 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The PID segment. */
  pid2: PID;
  /** The PD1 segment. */
  pd12?: PD1;
  /** The GSP segments. */
  gsp2?: GSP[];
  /** The GSR segments. */
  gsr2?: GSR[];
  /** The GSC segments. */
  gsc2?: GSC[];
  /** The PV1 segment. */
  pv12?: PV1;
  /** The DB1 segments. */
  db12?: DB1[];
}

/** The segment parsers of ADT^A24 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
};

/** Parser for HL7 ADT^A24 (HL7 v2.9.1) messages. */
export class ADT_A24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A24> {
    return parseStructure<ParsedADT_A24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A24 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A24(messageString: string): Result<ParsedADT_A24> {
  return new ADT_A24_Parser().parse(messageString);
}
