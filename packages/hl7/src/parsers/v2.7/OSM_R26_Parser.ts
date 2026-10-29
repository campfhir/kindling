/**
 * Parser for OSM^R26 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { SHIPMENT: SHP {PRT} [{ SHIPPING_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{PRT}] [{ SPECIMEN: SPM [{PRT}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] [ SUBJECT_PERSON_ANIMAL_IDENTIFICATION: PID [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [{NK1}] ] [ SUBJECT_POPULATION_LOCATION_IDENTIFICATION: PV1 [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{PRT}] }] [PID] [{PRT}] [{NK1}] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OSM_R26_STRUCTURE } from "../../structures/v2.7/OSM_R26.ts";
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
