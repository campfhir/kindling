/**
 * Builder for OSM^R26 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { SHIPMENT: SHP {PRT} [{ SHIPPING_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{PRT}] [{ SPECIMEN: SPM [{PRT}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] [ SUBJECT_PERSON_ANIMAL_IDENTIFICATION: PID [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [{NK1}] ] [ SUBJECT_POPULATION_LOCATION_IDENTIFICATION: PV1 [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{PRT}] }] [PID] [{PRT}] [{NK1}] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OSM_R26_STRUCTURE } from "../../structures/v2.7/OSM_R26.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { SHP } from "../../segments/v2.7/SHP.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { PAC } from "../../segments/v2.7/PAC.ts";
import type { SPM } from "../../segments/v2.7/SPM.ts";
import type { SAC } from "../../segments/v2.7/SAC.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { NK1 } from "../../segments/v2.7/NK1.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";

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
