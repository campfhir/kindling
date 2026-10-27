/**
 * Builder for OSM^R26 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { SHIPMENT: SHP {PRT} [{ SHIPPING_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{PRT}] [{ SPECIMEN: SPM [{PRT}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] [ SUBJECT_PERSON_OR_ANIMAL_IDENTIFICATION: PID [{PRT}] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] ] [ SUBJECT_POPULATION_OR_LOCATION_IDENTIFICATION: PV1 [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{PRT}] }] [PID] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OSM_R26_STRUCTURE } from "../../structures/v2.9.1/OSM_R26.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { SHP } from "../../segments/v2.9.1/SHP.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { PAC } from "../../segments/v2.9.1/PAC.ts";
import type { SPM } from "../../segments/v2.9.1/SPM.ts";
import type { SAC } from "../../segments/v2.9.1/SAC.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";

/** The SHIPMENT group of an OSM^R26 (HL7 v2.9.1) message being built. */
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

/** The SHIPPING OBSERVATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface ShippingObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PACKAGE group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface PackageGroup {
  /** The PAC segment. */
  pac: PAC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The SPECIMEN group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
  /** The SUBJECT PERSON OR ANIMAL IDENTIFICATION group. */
  subjectPersonOrAnimalIdentification?: SubjectPersonOrAnimalIdentificationGroup;
  /** The SUBJECT POPULATION OR LOCATION IDENTIFICATION group. */
  subjectPopulationOrLocationIdentification?: SubjectPopulationOrLocationIdentificationGroup;
}

/** The SPECIMEN OBSERVATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ContainerObservationGroup[];
}

/** The CONTAINER OBSERVATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface ContainerObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SUBJECT PERSON OR ANIMAL IDENTIFICATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface SubjectPersonOrAnimalIdentificationGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKin1Group[];
}

/** The PATIENT OBSERVATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The NEXT OF KIN group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface NextOfKin1Group {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The SUBJECT POPULATION OR LOCATION IDENTIFICATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface SubjectPopulationOrLocationIdentificationGroup {
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
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKin2Group[];
}

/** The PATIENT VISIT OBSERVATION group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface PatientVisitObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The NEXT OF KIN group of an OSM^R26 (HL7 v2.9.1) message being built. */
export interface NextOfKin2Group {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The optional segments and groups of an OSM^R26 (HL7 v2.9.1) message. */
export interface OSM_R26Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 OSM^R26 (HL7 v2.9.1) messages. */
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

/** Builds an HL7 OSM^R26 (HL7 v2.9.1) message. */
export function createOSM_R26<TMSH extends MSH = MSH>(
  header: TMSH,
  shipments: ShipmentGroup[],
  options: OSM_R26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSM_R26<TMSH> {
  return new OSM_R26(header, shipments, options, encoding);
}
