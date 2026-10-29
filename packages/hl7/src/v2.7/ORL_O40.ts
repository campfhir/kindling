/**
 * Builder, parser and structure for ORL^O40 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{PRT}] [{ SPECIMEN_SHIPMENT: SHP { PACKAGE: PAC [{ SPECIMEN_IN_PACKAGE: SPM [{ SPECIMEN_CONTAINER_IN_PACKAGE: SAC }] }] } }] ] }] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { SHP } from "./SHP.ts";
import { PAC } from "./PAC.ts";
import { SPM } from "./SPM.ts";
import { SAC } from "./SAC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORL^O40 (HL7 v2.7), in order. */
export const ORL_O40_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "ORDER",
            required: false,
            repeating: true,
            segments: [
              { name: "ORC", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "TIMING",
                required: false,
                repeating: true,
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
              {
                name: "OBSERVATION_REQUEST",
                required: false,
                repeating: false,
                segments: [
                  { name: "OBR", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "SPECIMEN_SHIPMENT",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "SHP", required: true, repeating: false },
                      {
                        name: "PACKAGE",
                        required: true,
                        repeating: true,
                        segments: [
                          { name: "PAC", required: true, repeating: false },
                          {
                            name: "SPECIMEN_IN_PACKAGE",
                            required: false,
                            repeating: true,
                            segments: [
                              { name: "SPM", required: true, repeating: false },
                              {
                                name: "SPECIMEN_CONTAINER_IN_PACKAGE",
                                required: false,
                                repeating: true,
                                segments: [
                                  { name: "SAC", required: true, repeating: false },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
}

/** The PATIENT group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The ORDER group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
}

/** The TIMING group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN SHIPMENT groups. */
  specimenShipments?: ParsedSpecimenShipment[];
}

/** The SPECIMEN SHIPMENT group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedSpecimenShipment {
  /** The SHP segment. */
  shp: SHP;
  /** The PACKAGE groups. */
  packages: ParsedPackage[];
}

/** The PACKAGE group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedPackage {
  /** The PAC segment. */
  pac: PAC;
  /** The SPECIMEN IN PACKAGE groups. */
  specimenInPackages?: ParsedSpecimenInPackage[];
}

/** The SPECIMEN IN PACKAGE group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedSpecimenInPackage {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN CONTAINER IN PACKAGE groups. */
  specimenContainerInPackages?: ParsedSpecimenContainerInPackage[];
}

/** The SPECIMEN CONTAINER IN PACKAGE group of a parsed ORL^O40 (HL7 v2.7) message. */
export interface ParsedSpecimenContainerInPackage {
  /** The SAC segment. */
  specimenContainer: SAC;
}

/** Structured result of parsing an HL7 ORL^O40 (HL7 v2.7) message. */
export interface ParsedORL_O40 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORL^O40 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  SHP: (s, e) => SHP.parse(s, e),
  PAC: (s, e) => PAC.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
};

/** Parser for HL7 ORL^O40 (HL7 v2.7) messages. */
export class ORL_O40_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O40";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORL_O40_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORL_O40> {
    return parseStructure<ParsedORL_O40>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORL^O40 (HL7 v2.7) message string into a structured result. */
export function parseORL_O40(messageString: string): Result<ParsedORL_O40> {
  return new ORL_O40_Parser().parse(messageString);
}

/** The RESPONSE group of an ORL^O40 (HL7 v2.7) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** The PATIENT group of an ORL^O40 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The ORDER group of an ORL^O40 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ObservationRequestGroup;
}

/** The TIMING group of an ORL^O40 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of an ORL^O40 (HL7 v2.7) message being built. */
export interface ObservationRequestGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN SHIPMENT groups. */
  specimenShipments?: SpecimenShipmentGroup[];
}

/** The SPECIMEN SHIPMENT group of an ORL^O40 (HL7 v2.7) message being built. */
export interface SpecimenShipmentGroup {
  /** The SHP segment. */
  shp: SHP;
  /** The PACKAGE groups. */
  packages: PackageGroup[];
}

/** The PACKAGE group of an ORL^O40 (HL7 v2.7) message being built. */
export interface PackageGroup {
  /** The PAC segment. */
  pac: PAC;
  /** The SPECIMEN IN PACKAGE groups. */
  specimenInPackages?: SpecimenInPackageGroup[];
}

/** The SPECIMEN IN PACKAGE group of an ORL^O40 (HL7 v2.7) message being built. */
export interface SpecimenInPackageGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN CONTAINER IN PACKAGE groups. */
  specimenContainerInPackages?: SpecimenContainerInPackageGroup[];
}

/** The SPECIMEN CONTAINER IN PACKAGE group of an ORL^O40 (HL7 v2.7) message being built. */
export interface SpecimenContainerInPackageGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
}

/** The optional segments and groups of an ORL^O40 (HL7 v2.7) message. */
export interface ORL_O40Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORL^O40 (HL7 v2.7) messages. */
export class ORL_O40<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O40";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORL_O40_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORL_O40Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 ORL^O40 (HL7 v2.7) message. */
export function createORL_O40<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORL_O40Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORL_O40<TMSH, TMSA> {
  return new ORL_O40(header, acknowledgment, options, encoding);
}
