/**
 * Builder, parser and structure for OSM^R26 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { SHIPMENT: SHP {PRT} [{ SHIPPING_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{PRT}] [{ SPECIMEN: SPM [{PRT}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] [ SUBJECT_PERSON_ANIMAL_IDENTIFICATION: PID [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [{NK1}] ] [ SUBJECT_POPULATION_LOCATION_IDENTIFICATION: PV1 [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{PRT}] }] [PID] [{PRT}] [{NK1}] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { SHP } from "../../segments/v2.7/SHP.ts";
import { PRT } from "../../segments/v2.7/PRT.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { PAC } from "../../segments/v2.7/PAC.ts";
import { SPM } from "../../segments/v2.7/SPM.ts";
import { SAC } from "../../segments/v2.7/SAC.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of OSM^R26 (HL7 v2.7), in order. */
export const OSM_R26_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "SHIPMENT",
    required: true,
    repeating: true,
    segments: [
      { name: "SHP", required: true, repeating: false },
      { name: "PRT", required: true, repeating: true },
      {
        name: "SHIPPING_OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      {
        name: "PACKAGE",
        required: true,
        repeating: true,
        segments: [
          { name: "PAC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "SPECIMEN_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              {
                name: "CONTAINER",
                required: false,
                repeating: true,
                segments: [
                  { name: "SAC", required: true, repeating: false },
                  {
                    name: "CONTAINER_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                ],
              },
              {
                name: "SUBJECT_PERSON_ANIMAL_IDENTIFICATION",
                required: false,
                repeating: false,
                segments: [
                  { name: "PID", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "PATIENT_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "NK1", required: false, repeating: true },
                ],
              },
              {
                name: "SUBJECT_POPULATION_LOCATION_IDENTIFICATION",
                required: false,
                repeating: false,
                segments: [
                  { name: "PV1", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "PATIENT_VISIT_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "PID", required: false, repeating: false },
                  { name: "PRT", required: false, repeating: true, as: "prt2" },
                  { name: "NK1", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The SHIPMENT group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedShipment {
  /** The SHP segment. */
  shp: SHP;
  /** The PRT segments. */
  prtList: PRT[];
  /** The SHIPPING OBSERVATION groups. */
  shippingObservations?: ParsedShippingObservation[];
  /** The PACKAGE groups. */
  packages: ParsedPackage[];
}

/** The SHIPPING OBSERVATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedShippingObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PACKAGE group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedPackage {
  /** The PAC segment. */
  pac: PAC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The SPECIMEN group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The CONTAINER groups. */
  containers?: ParsedContainer[];
  /** The SUBJECT PERSON ANIMAL IDENTIFICATION group. */
  subjectPersonAnimalIdentification?: ParsedSubjectPersonAnimalIdentification;
  /** The SUBJECT POPULATION LOCATION IDENTIFICATION group. */
  subjectPopulationLocationIdentification?: ParsedSubjectPopulationLocationIdentification;
}

/** The SPECIMEN OBSERVATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ParsedContainerObservation[];
}

/** The CONTAINER OBSERVATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedContainerObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SUBJECT PERSON ANIMAL IDENTIFICATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedSubjectPersonAnimalIdentification {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: ParsedPatientObservation[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** The PATIENT OBSERVATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedPatientObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SUBJECT POPULATION LOCATION IDENTIFICATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedSubjectPopulationLocationIdentification {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT VISIT OBSERVATION groups. */
  patientVisitObservations?: ParsedPatientVisitObservation[];
  /** The PID segment. */
  patient?: PID;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** The PATIENT VISIT OBSERVATION group of a parsed OSM^R26 (HL7 v2.7) message. */
export interface ParsedPatientVisitObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 OSM^R26 (HL7 v2.7) message. */
export interface ParsedOSM_R26 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SHIPMENT groups. */
  shipments: ParsedShipment[];
}

/** The segment parsers of OSM^R26 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SHP: (s, e) => SHP.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PAC: (s, e) => PAC.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 OSM^R26 (HL7 v2.7) messages. */
export class OSM_R26_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSM_R26";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSM_R26_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSM_R26> {
    return parseStructure<ParsedOSM_R26>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSM^R26 (HL7 v2.7) message string into a structured result. */
export function parseOSM_R26(messageString: string): Result<ParsedOSM_R26> {
  return new OSM_R26_Parser().parse(messageString);
}

/** The SHIPMENT group of an OSM^R26 (HL7 v2.7) message being built. */
export interface ShipmentGroup {
  /** The SHP segment. */
  shp: SHP;
  /** The PRT segments. */
  prtList: PRT[];
  /** The SHIPPING OBSERVATION groups. */
  shippingObservations?: ShippingObservationGroup[];
  /** The PACKAGE groups. */
  packages: PackageGroup[];
}

/** The SHIPPING OBSERVATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface ShippingObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PACKAGE group of an OSM^R26 (HL7 v2.7) message being built. */
export interface PackageGroup {
  /** The PAC segment. */
  pac: PAC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The SPECIMEN group of an OSM^R26 (HL7 v2.7) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
  /** The SUBJECT PERSON ANIMAL IDENTIFICATION group. */
  subjectPersonAnimalIdentification?: SubjectPersonAnimalIdentificationGroup;
  /** The SUBJECT POPULATION LOCATION IDENTIFICATION group. */
  subjectPopulationLocationIdentification?: SubjectPopulationLocationIdentificationGroup;
}

/** The SPECIMEN OBSERVATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of an OSM^R26 (HL7 v2.7) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ContainerObservationGroup[];
}

/** The CONTAINER OBSERVATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface ContainerObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SUBJECT PERSON ANIMAL IDENTIFICATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface SubjectPersonAnimalIdentificationGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** The PATIENT OBSERVATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SUBJECT POPULATION LOCATION IDENTIFICATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface SubjectPopulationLocationIdentificationGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT VISIT OBSERVATION groups. */
  patientVisitObservations?: PatientVisitObservationGroup[];
  /** The PID segment. */
  patient?: PID;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** The PATIENT VISIT OBSERVATION group of an OSM^R26 (HL7 v2.7) message being built. */
export interface PatientVisitObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an OSM^R26 (HL7 v2.7) message. */
export interface OSM_R26Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 OSM^R26 (HL7 v2.7) messages. */
export class OSM_R26<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSM_R26";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSM_R26_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public shipments: ShipmentGroup[],
    public options: OSM_R26Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, shipments: this.shipments };
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

/** Builds an HL7 OSM^R26 (HL7 v2.7) message. */
export function createOSM_R26<TMSH extends MSH = MSH>(
  header: TMSH,
  shipments: ShipmentGroup[],
  options: OSM_R26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSM_R26<TMSH> {
  return new OSM_R26(header, shipments, options, encoding);
}
