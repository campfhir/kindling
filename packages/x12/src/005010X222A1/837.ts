/**
 * 837 Health Care Claim: Professional, 005010X222A1: its structure, parser and builder.
 *
 * ```
 * ST BHT
 * NM1(41) PER…                                  1000A submitter
 * NM1(40)                                       1000B receiver
 * { HL(20) [PRV] [CUR]                          2000A billing provider
 *     NM1(85) … | [NM1(87) …] | [NM1(PE) …]     2010AA / 2010AB / 2010AC
 *   { HL(22) SBR [PAT]                          2000B subscriber
 *       NM1(IL) … | NM1(PR) …                   2010BA / 2010BB
 *       { CLM … }                               2300 claims, when the subscriber is the patient
 *     { HL(23) PAT NM1(QC) … { CLM … } }        2000C patient, 2010CA, 2300 claims
 * } }
 * SE
 *
 * 2300  CLM [DTP…] [PWK…] [CN1] [AMT] [REF…] [K3…] [NTE] [CR1] [CR2] [CRC…] HI [HI…] [HCP]
 *       { 2310A–2310F providers and locations } { 2320 SBR … { 2330A–2330G } } { 2400 }
 * 2400  LX SV1 [SV5] [PWK…] [CR1] [CR3] [CRC…] DTP… [QTY…] [MEA…] [CN1] [REF…] [AMT…] [K3…] [NTE…]
 *       [PS1] [HCP] [2410 LIN CTP [REF]] { 2420A–2420H } { 2430 SVD … } { 2440 LQ FRM… }
 * ```
 *
 * Order, usage, maximum uses and loop repeats from the CMS 837P edits spreadsheet of Transmittal
 * 1145 (5010A1), with the CMS 4010A1 → 5010 side-by-side for what the spreadsheet does not tabulate,
 * checked against Medicare contractor and state Medicaid guides and X12's 005010X222 examples
 * (`docs/validation/005010X222A1-ledger.md`). The claim loop sits under the subscriber when the
 * subscriber is the patient (2000B HL04 `0`), under the patient level otherwise. The uses of one
 * position the guide names separately (REF, DTP, AMT, CRC, HI, QTY, NTE and PWK uses; the 2310, 2330
 * and 2420 loops) are taken in any order.
 *
 * Where the sources disagree on usage, the less strict reading is kept so that a claim either
 * source accepts parses: the 2010AC Pay-to Plan Secondary Identification REF (R in the spreadsheet,
 * S in the side-by-side) is situational, and so is the 2310C PER (the later spreadsheet). The 2440
 * FRM is required and the 2330B prior authorization REF repeats twice, as in the later spreadsheets.
 *
 * @module
 */
import { loop, segment, unordered, type InputOf, type ParsedOf, type SegmentItem } from "../types/schema.ts";
import { defineTransactionSet } from "../types/transaction.ts";
import { BHT, HL } from "../segments/hierarchy.ts";
import { NM1 } from "../segments/NM1.ts";
import { LX, CAS } from "../segments/remittance.ts";
import { CLM, CTP, LIN, PAT, SBR, SV1, SVD } from "../segments/claim.ts";

interface Options<R extends boolean, M extends number> {
  required?: R;
  max?: M;
}

/**
 * A use of a segment told apart by its first element (REF01, DTP01, AMT01, CRC01, QTY01, NTE01,
 * PWK01, HI01-1). It repeats when its maximum use is more than 1.
 */
function qualified<const A extends string, const R extends boolean = false, const M extends number = 1>(
  id: string,
  as: A,
  name: string,
  codes: string[],
  options: Options<R, M> = {},
): SegmentItem<A, R, M extends 1 ? false : true> {
  const repeating = (options.max ?? 1) > 1;
  return segment(id, as, name, {
    qualifier: [1, ...codes],
    required: (options.required ?? false) as R,
    repeating: repeating as M extends 1 ? false : true,
    ...(repeating ? { max: options.max } : {}),
  });
}

const ref = <const A extends string, const R extends boolean = false, const M extends number = 1>(as: A, name: string, codes: string[], options: Options<R, M> = {}) =>
  qualified("REF", as, name, codes, options);
const dtp = <const A extends string, const R extends boolean = false, const M extends number = 1>(as: A, name: string, codes: string[], options: Options<R, M> = {}) =>
  qualified("DTP", as, name, codes, options);

const nm1 = <const A extends string>(as: A, name: string, codes: string[]) => segment("NM1", as, name, { required: true, qualifier: [1, ...codes], segmentClass: NM1 });
const n3 = <const R extends boolean = true>(name: string, required: R = true as R) => segment("N3", "address", name, { required });
const n4 = <const R extends boolean = true>(name: string, required: R = true as R) => segment("N4", "cityStateZip", name, { required });

/** The REF list of a provider loop: secondary identification by REF01, up to `max`. */
const secondaryIds = <const R extends boolean = false>(name: string, codes: string[], max: number, required: R = false as R) =>
  segment("REF", "secondaryIdentifications", name, { repeating: true, max, qualifier: [1, ...codes], required });

const LINE = loop(
  "2400",
  "serviceLines",
  "Service Line Number",
  [
    segment("LX", "lineNumber", "Service Line Number", { required: true, segmentClass: LX }),
    segment("SV1", "professionalService", "Professional Service", { required: true, segmentClass: SV1 }),
    segment("SV5", "durableMedicalEquipmentService", "Durable Medical Equipment Service"),
    unordered(
      qualified("PWK", "durableMedicalEquipmentCertificateIndicator", "Durable Medical Equipment Certificate of Medical Necessity Indicator", ["CT"]),
      segment("PWK", "supplementalInformation", "Line Supplemental Information", { repeating: true, max: 10 }),
    ),
    segment("CR1", "ambulanceTransport", "Ambulance Transport Information"),
    segment("CR3", "durableMedicalEquipmentCertification", "Durable Medical Equipment Certification"),
    unordered(
      qualified("CRC", "ambulanceCertifications", "Ambulance Certification", ["07"], { max: 3 }),
      qualified("CRC", "hospiceEmployeeIndicator", "Hospice Employee Indicator", ["70"]),
      qualified("CRC", "durableMedicalEquipmentCondition", "Condition Indicator/Durable Medical Equipment", ["09"]),
    ),
    unordered(
      dtp("serviceDate", "Date - Service Date", ["472"], { required: true }),
      dtp("prescriptionDate", "Date - Prescription Date", ["471"]),
      dtp("certificationRevisionDate", "Date - Certification Revision/Recertification Date", ["607"]),
      dtp("beginTherapyDate", "Date - Begin Therapy Date", ["463"]),
      dtp("lastCertificationDate", "Date - Last Certification Date", ["461"]),
      dtp("lastSeenDate", "Date - Last Seen Date", ["304"]),
      dtp("testDates", "Date - Test Date", ["738", "739"], { max: 2 }),
      dtp("shippedDate", "Date - Shipped Date", ["011"]),
      dtp("lastXrayDate", "Date - Last X-ray Date", ["455"]),
      dtp("initialTreatmentDate", "Date - Initial Treatment Date", ["454"]),
    ),
    unordered(
      qualified("QTY", "ambulancePatientCount", "Ambulance Patient Count", ["PT"]),
      qualified("QTY", "obstetricAnesthesiaAdditionalUnits", "Obstetric Anesthesia Additional Units", ["FL"]),
    ),
    segment("MEA", "testResults", "Test Results", { repeating: true, max: 5 }),
    segment("CN1", "contractInformation", "Contract Information"),
    unordered(
      ref("repricedLineItemReferenceNumber", "Repriced Line Item Reference Number", ["9B"]),
      ref("adjustedRepricedLineItemReferenceNumber", "Adjusted Repriced Line Item Reference Number", ["9D"]),
      ref("priorAuthorizations", "Prior Authorization", ["G1"], { max: 5 }),
      ref("lineItemControlNumber", "Line Item Control Number", ["6R"]),
      ref("mammographyCertificationNumber", "Mammography Certification Number", ["EW"]),
      ref("cliaNumber", "Clinical Laboratory Improvement Amendment (CLIA) Number", ["X4"]),
      ref("referringCliaFacilityIdentification", "Referring Clinical Laboratory Improvement Amendment (CLIA) Facility Identification", ["F4"]),
      ref("immunizationBatchNumber", "Immunization Batch Number", ["BT"]),
      ref("referralNumbers", "Referral Number", ["9F"], { max: 5 }),
    ),
    unordered(
      qualified("AMT", "salesTaxAmount", "Sales Tax Amount", ["T"]),
      qualified("AMT", "postageClaimedAmount", "Postage Claimed Amount", ["F4"]),
    ),
    segment("K3", "fileInformation", "File Information", { repeating: true, max: 10 }),
    unordered(
      qualified("NTE", "lineNote", "Line Note", ["ADD", "DCP"]),
      qualified("NTE", "thirdPartyOrganizationNotes", "Third Party Organization Notes", ["TPO"]),
    ),
    segment("PS1", "purchasedServiceInformation", "Purchased Service Information"),
    segment("HCP", "linePricing", "Line Pricing/Repricing Information"),
    loop(
      "2410",
      "drugIdentification",
      "Drug Identification",
      [
        segment("LIN", "drug", "Drug Identification", { required: true, segmentClass: LIN }),
        segment("CTP", "drugQuantity", "Drug Quantity", { required: true, segmentClass: CTP }),
        ref("prescriptionNumber", "Prescription or Compound Drug Association Number", ["VY", "XZ"]),
      ],
    ),
    unordered(
      loop("2420A", "renderingProvider", "Rendering Provider Name", [
        nm1("name", "Rendering Provider Name", ["82"]),
        segment("PRV", "specialty", "Rendering Provider Specialty Information"),
        secondaryIds("Rendering Provider Secondary Identification", ["0B", "1G", "G2", "LU"], 20),
      ]),
      loop("2420B", "purchasedServiceProvider", "Purchased Service Provider Name", [
        nm1("name", "Purchased Service Provider Name", ["QB"]),
        secondaryIds("Purchased Service Provider Secondary Identification", ["0B", "1G", "G2"], 20),
      ]),
      loop("2420C", "serviceFacilityLocation", "Service Facility Location Name", [
        nm1("name", "Service Facility Location Name", ["77"]),
        n3("Service Facility Location Address"),
        n4("Service Facility Location City/State/ZIP Code"),
        secondaryIds("Service Facility Location Secondary Identification", ["G2", "LU"], 3),
      ]),
      loop("2420D", "supervisingProvider", "Supervising Provider Name", [
        nm1("name", "Supervising Provider Name", ["DQ"]),
        secondaryIds("Supervising Provider Secondary Identification", ["0B", "1G", "G2", "LU"], 20),
      ]),
      loop("2420E", "orderingProvider", "Ordering Provider Name", [
        nm1("name", "Ordering Provider Name", ["DK"]),
        n3("Ordering Provider Address", false),
        n4("Ordering Provider City/State/ZIP Code", false),
        secondaryIds("Ordering Provider Secondary Identification", ["0B", "1G", "G2"], 20),
        segment("PER", "contact", "Ordering Provider Contact Information"),
      ]),
      loop(
        "2420F",
        "referringProviders",
        "Referring Provider Name",
        [nm1("name", "Referring Provider Name", ["DN", "P3"]), secondaryIds("Referring Provider Secondary Identification", ["0B", "1G", "G2"], 20)],
        { repeating: true, max: 2 },
      ),
      loop("2420G", "ambulancePickUpLocation", "Ambulance Pick-up Location", [
        nm1("name", "Ambulance Pick-up Location", ["PW"]),
        n3("Ambulance Pick-up Location Address"),
        n4("Ambulance Pick-up Location City/State/ZIP Code"),
      ]),
      loop("2420H", "ambulanceDropOffLocation", "Ambulance Drop-off Location", [
        nm1("name", "Ambulance Drop-off Location", ["45"]),
        n3("Ambulance Drop-off Location Address"),
        n4("Ambulance Drop-off Location City/State/ZIP Code"),
      ]),
    ),
    loop(
      "2430",
      "lineAdjudications",
      "Line Adjudication Information",
      [
        segment("SVD", "adjudication", "Line Adjudication Information", { required: true, segmentClass: SVD }),
        segment("CAS", "adjustments", "Line Adjustment", { repeating: true, max: 5, segmentClass: CAS }),
        dtp("checkOrRemittanceDate", "Line Check or Remittance Date", ["573"], { required: true }),
        qualified("AMT", "remainingPatientLiability", "Remaining Patient Liability", ["EAF"]),
      ],
      { repeating: true, max: 15 },
    ),
    loop(
      "2440",
      "formIdentifications",
      "Form Identification Code",
      [
        segment("LQ", "form", "Form Identification Code", { required: true }),
        segment("FRM", "supportingDocumentation", "Supporting Documentation", { required: true, repeating: true, max: 99 }),
      ],
      { repeating: true },
    ),
  ],
  { required: true, repeating: true, max: 50 },
);

const OTHER_SUBSCRIBER = loop(
  "2320",
  "otherSubscribers",
  "Other Subscriber Information",
  [
    segment("SBR", "subscriber", "Other Subscriber Information", { required: true, segmentClass: SBR }),
    segment("CAS", "adjustments", "Claim Level Adjustments", { repeating: true, max: 5, segmentClass: CAS }),
    unordered(
      qualified("AMT", "payerPaidAmount", "Coordination of Benefits (COB) Payer Paid Amount", ["D"]),
      qualified("AMT", "totalNonCoveredAmount", "Coordination of Benefits (COB) Total Non-covered Amount", ["A8"]),
      qualified("AMT", "remainingPatientLiability", "Remaining Patient Liability", ["EAF"]),
    ),
    segment("OI", "otherInsuranceCoverage", "Other Insurance Coverage Information", { required: true }),
    segment("MOA", "outpatientAdjudication", "Outpatient Adjudication Information"),
    unordered(
      loop(
        "2330A",
        "otherSubscriberName",
        "Other Subscriber Name",
        [
          nm1("name", "Other Subscriber Name", ["IL"]),
          n3("Other Subscriber Address", false),
          n4("Other Subscriber City/State/ZIP Code", false),
          ref("secondaryIdentification", "Other Subscriber Secondary Identification", ["SY"]),
        ],
        { required: true },
      ),
      loop(
        "2330B",
        "otherPayerName",
        "Other Payer Name",
        [
          nm1("name", "Other Payer Name", ["PR"]),
          n3("Other Payer Address", false),
          n4("Other Payer City/State/ZIP Code", false),
          dtp("checkOrRemittanceDate", "Claim Check or Remittance Date", ["573"]),
          unordered(
            ref("secondaryIdentifiers", "Other Payer Secondary Identifier", ["2U", "EI", "FY", "NF"], { max: 2 }),
            ref("priorAuthorizationNumbers", "Other Payer Prior Authorization Number", ["G1"], { max: 2 }),
            ref("referralNumber", "Other Payer Referral Number", ["9F"]),
            ref("claimAdjustmentIndicator", "Other Payer Claim Adjustment Indicator", ["T4"]),
            ref("claimControlNumber", "Other Payer Claim Control Number", ["F8"]),
          ),
        ],
        { required: true },
      ),
      loop(
        "2330C",
        "otherPayerReferringProviders",
        "Other Payer Referring Provider",
        [nm1("name", "Other Payer Referring Provider", ["DN", "P3"]), secondaryIds("Other Payer Referring Provider Secondary Identification", ["0B", "1G", "G2"], 3, true)],
        { repeating: true, max: 2 },
      ),
      loop("2330D", "otherPayerRenderingProvider", "Other Payer Rendering Provider", [
        nm1("name", "Other Payer Rendering Provider", ["82"]),
        secondaryIds("Other Payer Rendering Provider Secondary Identification", ["0B", "1G", "G2", "LU"], 3, true),
      ]),
      loop("2330E", "otherPayerServiceFacilityLocation", "Other Payer Service Facility Location", [
        nm1("name", "Other Payer Service Facility Location", ["77"]),
        secondaryIds("Other Payer Service Facility Location Secondary Identification", ["0B", "G2", "LU"], 3, true),
      ]),
      loop("2330F", "otherPayerSupervisingProvider", "Other Payer Supervising Provider", [
        nm1("name", "Other Payer Supervising Provider", ["DQ"]),
        secondaryIds("Other Payer Supervising Provider Secondary Identification", ["0B", "1G", "G2", "LU"], 3, true),
      ]),
      loop("2330G", "otherPayerBillingProvider", "Other Payer Billing Provider", [
        nm1("name", "Other Payer Billing Provider", ["85"]),
        secondaryIds("Other Payer Billing Provider Secondary Identification", ["G2", "LU"], 2, true),
      ]),
    ),
  ],
  { repeating: true, max: 10 },
);

const CLAIM = loop(
  "2300",
  "claims",
  "Claim Information",
  [
    segment("CLM", "claim", "Claim Information", { required: true, segmentClass: CLM }),
    unordered(
      dtp("onsetOfCurrentIllness", "Date - Onset of Current Illness or Symptom", ["431"]),
      dtp("initialTreatment", "Date - Initial Treatment", ["454"]),
      dtp("lastSeen", "Date - Last Seen", ["304"]),
      dtp("acuteManifestation", "Date - Acute Manifestation", ["453"]),
      dtp("accident", "Date - Accident", ["439"]),
      dtp("lastMenstrualPeriod", "Date - Last Menstrual Period", ["484"]),
      dtp("lastXray", "Date - Last X-ray", ["455"]),
      dtp("hearingAndVisionPrescription", "Date - Hearing and Vision Prescription Date", ["471"]),
      dtp("disabilityDates", "Date - Disability Dates", ["314", "360", "361"]),
      dtp("lastWorked", "Date - Last Worked", ["297"]),
      dtp("authorizedReturnToWork", "Date - Authorized Return to Work", ["296"]),
      dtp("admission", "Date - Admission", ["435"]),
      dtp("discharge", "Date - Discharge", ["096"]),
      dtp("assumedAndRelinquishedCare", "Date - Assumed and Relinquished Care Dates", ["090", "091"], { max: 2 }),
      dtp("propertyAndCasualtyFirstContact", "Date - Property and Casualty Date of First Contact", ["444"]),
      dtp("repricerReceived", "Date - Repricer Received Date", ["050"]),
    ),
    segment("PWK", "supplementalInformation", "Claim Supplemental Information", { repeating: true, max: 10 }),
    segment("CN1", "contractInformation", "Contract Information"),
    qualified("AMT", "patientAmountPaid", "Patient Amount Paid", ["F5"]),
    unordered(
      ref("serviceAuthorizationExceptionCode", "Service Authorization Exception Code", ["4N"]),
      ref("mandatoryMedicareCrossoverIndicator", "Mandatory Medicare (Section 4081) Crossover Indicator", ["F5"]),
      ref("mammographyCertificationNumber", "Mammography Certification Number", ["EW"]),
      ref("referralNumber", "Referral Number", ["9F"]),
      ref("priorAuthorization", "Prior Authorization", ["G1"]),
      ref("payerClaimControlNumber", "Payer Claim Control Number", ["F8"]),
      ref("cliaNumber", "Clinical Laboratory Improvement Amendment (CLIA) Number", ["X4"]),
      ref("repricedClaimNumber", "Repriced Claim Number", ["9A"]),
      ref("adjustedRepricedClaimNumber", "Adjusted Repriced Claim Number", ["9C"]),
      ref("investigationalDeviceExemptionNumber", "Investigational Device Exemption Number", ["LX"]),
      ref("claimIdentifierForTransmissionIntermediaries", "Claim Identifier for Transmission Intermediaries", ["D9"]),
      ref("medicalRecordNumber", "Medical Record Number", ["EA"]),
      ref("demonstrationProjectIdentifier", "Demonstration Project Identifier", ["P4"]),
      ref("carePlanOversight", "Care Plan Oversight", ["1J"]),
    ),
    segment("K3", "fileInformation", "File Information", { repeating: true, max: 10 }),
    qualified("NTE", "note", "Claim Note", ["ADD", "CER", "DCP", "DGN", "TPO"]),
    segment("CR1", "ambulanceTransport", "Ambulance Transport Information"),
    segment("CR2", "spinalManipulation", "Spinal Manipulation Service Information"),
    unordered(
      qualified("CRC", "ambulanceCertifications", "Ambulance Certification", ["07"], { max: 3 }),
      qualified("CRC", "visionConditions", "Patient Condition Information: Vision", ["E1", "E2", "E3"], { max: 3 }),
      qualified("CRC", "homeboundIndicator", "Homebound Indicator", ["75"]),
      qualified("CRC", "epsdtReferral", "EPSDT Referral", ["ZZ"]),
    ),
    unordered(
      qualified("HI", "diagnosisCodes", "Health Care Diagnosis Code", ["ABK", "BK"], { required: true }),
      qualified("HI", "anesthesiaRelatedProcedure", "Anesthesia Related Procedure", ["BP"]),
      qualified("HI", "conditionInformation", "Condition Information", ["BG"], { max: 2 }),
    ),
    segment("HCP", "claimPricing", "Claim Pricing/Repricing Information"),
    unordered(
      loop(
        "2310A",
        "referringProviders",
        "Referring Provider Name",
        [nm1("name", "Referring Provider Name", ["DN", "P3"]), secondaryIds("Referring Provider Secondary Identification", ["0B", "1G", "G2"], 3)],
        { repeating: true, max: 2 },
      ),
      loop("2310B", "renderingProvider", "Rendering Provider Name", [
        nm1("name", "Rendering Provider Name", ["82"]),
        segment("PRV", "specialty", "Rendering Provider Specialty Information"),
        secondaryIds("Rendering Provider Secondary Identification", ["0B", "1G", "G2", "LU"], 4),
      ]),
      loop("2310C", "serviceFacilityLocation", "Service Facility Location Name", [
        nm1("name", "Service Facility Location Name", ["77"]),
        n3("Service Facility Location Address"),
        n4("Service Facility Location City/State/ZIP Code"),
        secondaryIds("Service Facility Location Secondary Identification", ["0B", "G2", "LU"], 3),
        segment("PER", "contact", "Service Facility Contact Information"),
      ]),
      loop("2310D", "supervisingProvider", "Supervising Provider Name", [
        nm1("name", "Supervising Provider Name", ["DQ"]),
        secondaryIds("Supervising Provider Secondary Identification", ["0B", "1G", "G2", "LU"], 4),
      ]),
      loop("2310E", "ambulancePickUpLocation", "Ambulance Pick-up Location", [
        nm1("name", "Ambulance Pick-up Location", ["PW"]),
        n3("Ambulance Pick-up Location Address"),
        n4("Ambulance Pick-up Location City/State/ZIP Code"),
      ]),
      loop("2310F", "ambulanceDropOffLocation", "Ambulance Drop-off Location", [
        nm1("name", "Ambulance Drop-off Location", ["45"]),
        n3("Ambulance Drop-off Location Address"),
        n4("Ambulance Drop-off Location City/State/ZIP Code"),
      ]),
    ),
    OTHER_SUBSCRIBER,
    LINE,
  ],
  { repeating: true, max: 100 },
);

const PATIENT = loop(
  "2000C",
  "patients",
  "Patient Hierarchical Level",
  [
    segment("HL", "hierarchicalLevel", "Patient Hierarchical Level", { required: true, qualifier: [3, "23"], segmentClass: HL }),
    segment("PAT", "patient", "Patient Information", { required: true, segmentClass: PAT }),
    loop(
      "2010CA",
      "patientName",
      "Patient Name",
      [
        nm1("name", "Patient Name", ["QC"]),
        n3("Patient Address"),
        n4("Patient City/State/ZIP Code"),
        segment("DMG", "demographicInformation", "Patient Demographic Information", { required: true }),
        unordered(
          ref("propertyAndCasualtyClaimNumber", "Property and Casualty Claim Number", ["Y4"]),
          // The A1 errata's new segment; its REF01 values are not in any public source, so it takes any other REF.
          segment("REF", "propertyAndCasualtyPatientIdentifier", "Property and Casualty Patient Identifier"),
        ),
        segment("PER", "propertyAndCasualtyContact", "Property and Casualty Patient Contact Information"),
      ],
      { required: true },
    ),
    { ...CLAIM, required: true as const },
  ],
  { repeating: true },
);

const SUBSCRIBER = loop(
  "2000B",
  "subscribers",
  "Subscriber Hierarchical Level",
  [
    segment("HL", "hierarchicalLevel", "Subscriber Hierarchical Level", { required: true, qualifier: [3, "22"], segmentClass: HL }),
    segment("SBR", "subscriber", "Subscriber Information", { required: true, segmentClass: SBR }),
    segment("PAT", "patient", "Patient Information", { segmentClass: PAT }),
    unordered(
      loop(
        "2010BA",
        "subscriberName",
        "Subscriber Name",
        [
          nm1("name", "Subscriber Name", ["IL"]),
          n3("Subscriber Address", false),
          n4("Subscriber City/State/ZIP Code", false),
          segment("DMG", "demographicInformation", "Subscriber Demographic Information"),
          unordered(
            ref("secondaryIdentification", "Subscriber Secondary Identification", ["SY"]),
            ref("propertyAndCasualtyClaimNumber", "Property and Casualty Claim Number", ["Y4"]),
          ),
          segment("PER", "propertyAndCasualtyContact", "Property and Casualty Subscriber Contact Information"),
        ],
        { required: true },
      ),
      loop(
        "2010BB",
        "payerName",
        "Payer Name",
        [
          nm1("name", "Payer Name", ["PR"]),
          n3("Payer Address", false),
          n4("Payer City/State/ZIP Code", false),
          unordered(
            ref("secondaryIdentifications", "Payer Secondary Identification", ["2U", "EI", "FY", "NF"], { max: 3 }),
            ref("billingProviderSecondaryIdentifications", "Billing Provider Secondary Identification", ["G2", "LU"], { max: 2 }),
          ),
        ],
        { required: true },
      ),
    ),
    CLAIM,
    PATIENT,
  ],
  { required: true, repeating: true },
);

/** The 837P's body, between ST and SE. */
export const X837P_STRUCTURE = [
  segment("BHT", "beginningOfHierarchicalTransaction", "Beginning of Hierarchical Transaction", { required: true, segmentClass: BHT }),
  loop(
    "1000A",
    "submitter",
    "Submitter Name",
    [nm1("name", "Submitter Name", ["41"]), segment("PER", "contacts", "Submitter EDI Contact Information", { required: true, repeating: true, max: 2 })],
    { required: true },
  ),
  loop("1000B", "receiver", "Receiver Name", [nm1("name", "Receiver Name", ["40"])], { required: true }),
  loop(
    "2000A",
    "billingProviders",
    "Billing Provider Hierarchical Level",
    [
      segment("HL", "hierarchicalLevel", "Billing Provider Hierarchical Level", { required: true, qualifier: [3, "20"], segmentClass: HL }),
      segment("PRV", "specialty", "Billing Provider Specialty Information"),
      segment("CUR", "foreignCurrency", "Foreign Currency Information"),
      unordered(
        loop(
          "2010AA",
          "billingProviderName",
          "Billing Provider Name",
          [
            nm1("name", "Billing Provider Name", ["85"]),
            n3("Billing Provider Address"),
            n4("Billing Provider City/State/ZIP Code"),
            unordered(
              ref("taxIdentification", "Billing Provider Tax Identification", ["EI", "SY"], { required: true }),
              ref("upinLicenseInformation", "Billing Provider UPIN/License Information", ["0B", "1G"], { max: 2 }),
            ),
            segment("PER", "contacts", "Billing Provider Contact Information", { repeating: true, max: 2 }),
          ],
          { required: true },
        ),
        loop("2010AB", "payToAddress", "Pay-to Address Name", [nm1("name", "Pay-to Address Name", ["87"]), n3("Pay-to Address - Address"), n4("Pay-to Address City/State/ZIP Code")]),
        loop("2010AC", "payToPlan", "Pay-to Plan Name", [
          nm1("name", "Pay-to Plan Name", ["PE"]),
          n3("Pay-to Plan Address"),
          n4("Pay-to Plan City/State/ZIP Code"),
          unordered(
            ref("secondaryIdentification", "Pay-to Plan Secondary Identification", ["2U", "FY", "NF"]),
            ref("taxIdentificationNumber", "Pay-to Plan Tax Identification Number", ["EI"], { required: true }),
          ),
        ]),
      ),
      SUBSCRIBER,
    ],
    { required: true, repeating: true },
  ),
] as const;

/** The 837 Health Care Claim: Professional of 005010X222A1. */
export const X837P = defineTransactionSet({
  transactionSet: "837",
  version: "005010X222A1",
  name: "Health Care Claim: Professional",
  structure: X837P_STRUCTURE,
});

/** A parsed 837P body. */
export type Parsed837P = ParsedOf<typeof X837P_STRUCTURE>;

/** The input of `X837P.create()`. */
export type X837PInput = InputOf<typeof X837P_STRUCTURE>;
