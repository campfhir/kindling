/**
 * An ASAP dispensation report as data: what `parse()` returns and what `encodeReport()` writes.
 *
 * ```
 * TH IS
 * { PHA                                    pharmacy
 *     { PAT                                patient
 *         { DSP [PRE] [CDI…] [AIR…] }      dispensation
 *     }
 *   TP
 * }
 * TT
 * ```
 *
 * The state dispenser guides give the segment order and these loops (Michigan MAPS, Nebraska); ASAP's
 * own grammar is not public. The detail segments (PHA, PAT, DSP, PRE, CDI, AIR) are generic segments
 * for now; typed classes for ASAP 4.2A and 4.2B will take their place. See
 * `docs/validation/asap-ledger.md`, section 1.
 *
 * @module
 */
import { DEFAULT_DELIMITERS, type Delimiters } from "./types/delimiters.ts";
import type { GenericSegment, Segment } from "./types/segment.ts";
import type { TH } from "./envelope/TH.ts";
import { type IS, TP, TT } from "./envelope/segments.ts";

/** One prescription dispensed: DSP and the segments that describe it. */
export interface ParsedDispensation {
  /** DSP Dispensing Record. */
  dispensation: GenericSegment;
  /** PRE Prescriber Information. */
  prescriber?: GenericSegment;
  /** CDI Compound Drug Ingredient Detail, one per ingredient of a compound. */
  compoundIngredients: GenericSegment[];
  /** AIR Additional Information Reporting. */
  additionalInformation: GenericSegment[];
}

/** One patient: PAT and the prescriptions dispensed to them. */
export interface ParsedPatient {
  /** PAT Patient Information. */
  patient: GenericSegment;
  /** The dispensations under this PAT. */
  dispensations: ParsedDispensation[];
}

/** One pharmacy: PHA, its patients, and TP. */
export interface ParsedPharmacy {
  /** PHA Pharmacy Header. */
  pharmacy: GenericSegment;
  /** The patients under this PHA. */
  patients: ParsedPatient[];
  /** TP Pharmacy Trailer. */
  trailer: TP;
}

/** A parsed report. */
export interface ParsedReport {
  /** The delimiters the report announced in its TH. */
  delimiters: Delimiters;
  /** TH Transaction Header. */
  header: TH;
  /** IS Information Source; absent only from a void (TH03 `04`), which is TH and TT alone. */
  informationSource?: IS;
  /** The pharmacies, in order. */
  pharmacies: ParsedPharmacy[];
  /** TT Transaction Trailer. */
  trailer: TT;
  /** Counts and control numbers that disagree with the report, and dispensations without PRE. */
  warnings: string[];
}

/** A dispensation to encode. */
export interface DispensationInput {
  /** DSP. */
  dispensation: Segment;
  /** PRE. */
  prescriber?: Segment;
  /** CDI, one per ingredient. */
  compoundIngredients?: readonly Segment[];
  /** AIR. */
  additionalInformation?: readonly Segment[];
}

/** A patient to encode. */
export interface PatientInput {
  /** PAT. */
  patient: Segment;
  /** The dispensations under this PAT. */
  dispensations: readonly DispensationInput[];
}

/** A pharmacy to encode. TP is computed when left out. */
export interface PharmacyInput {
  /** PHA. */
  pharmacy: Segment;
  /** The patients under this PHA. */
  patients: readonly PatientInput[];
  /** TP; computed when left out. */
  trailer?: TP;
}

/** A report to encode. TT is computed when left out. */
export interface ReportInput {
  /** TH. */
  header: TH;
  /** IS. */
  informationSource?: IS;
  /** The pharmacies. */
  pharmacies: readonly PharmacyInput[];
  /** TT; computed when left out. */
  trailer?: TT;
}

/** Options of `encodeReport()`. */
export interface EncodeReportOptions {
  /** The delimiters to write with, and announce in TH09. Default `*` and `~`. */
  delimiters?: Delimiters;
  /** A line break written after each segment terminator, for readability. Default none. */
  lineBreak?: "" | "\n" | "\r\n";
}

/** The segments of a pharmacy, PHA to TP, in order. */
function pharmacySegments(pharmacy: PharmacyInput): Segment[] {
  const segments: Segment[] = [pharmacy.pharmacy];
  for (const { patient, dispensations } of pharmacy.patients) {
    segments.push(patient);
    for (const d of dispensations) {
      segments.push(d.dispensation, ...(d.prescriber ? [d.prescriber] : []), ...(d.compoundIngredients ?? []), ...(d.additionalInformation ?? []));
    }
  }
  segments.push(pharmacy.trailer ?? pharmacyTrailer(pharmacy));
  return segments;
}

/** TP for a pharmacy: TP01 counts its segments, PHA and TP included. */
export function pharmacyTrailer(pharmacy: PharmacyInput): TP {
  return new TP().detailSegmentCount(pharmacySegments({ ...pharmacy, trailer: new TP() }).length);
}

/** The segments of a report, TH to TT, in order. */
function reportSegments(report: ReportInput): Segment[] {
  const segments: Segment[] = [report.header, ...(report.informationSource ? [report.informationSource] : [])];
  for (const pharmacy of report.pharmacies) segments.push(...pharmacySegments(pharmacy));
  segments.push(report.trailer ?? new TT());
  return segments;
}

/** TT for a report: TT01 is TH02, TT02 counts every segment, TH and TT included. */
export function reportTrailer(report: ReportInput): TT {
  return new TT().transactionControlNumber(report.header.getControlNumber()).segmentCount(reportSegments(report).length);
}

/**
 * Writes a report out, every segment in order. A trailer left out is computed (counts and TH02); a
 * trailer given is written as it is. TH09 is the segment terminator of `options.delimiters`.
 */
export function encodeReport(report: ReportInput, options: EncodeReportOptions = {}): string {
  const delimiters = options.delimiters ?? DEFAULT_DELIMITERS;
  const segments = reportSegments(report);
  segments[segments.length - 1] = report.trailer ?? reportTrailer(report);
  const end = delimiters.segment + (options.lineBreak ?? "");
  return segments.map((s) => s.encode(delimiters) + end).join("");
}
