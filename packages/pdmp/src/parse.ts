/**
 * The ASAP parser, in its own entry point `@campfhir/pdmp/parse`.
 *
 * `parse()` reads the delimiters from the TH segment, splits the report into segments and groups
 * them into pharmacies, patients and dispensations. It is asynchronous, like `@campfhir/hl7/parse`,
 * so that typed segment classes per ASAP version, dispatched on TH01, can load the first time a
 * report of that version is parsed without changing the signature:
 *
 * ```ts
 * import { parse } from "@campfhir/pdmp/parse";
 *
 * const result = await parse(raw);
 * if (!result.ok) throw new Error(result.err.message);
 * result.val.header.getVersion(); // "4.2B"
 * for (const { patients } of result.val.pharmacies) {
 *   for (const { dispensations } of patients) dispensations[0].dispensation.get(7); // DSP07
 * }
 * ```
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { Err } from "./utils/err.ts";
import { tokenize } from "./tokenize.ts";
import { TH } from "./envelope/TH.ts";
import { IS, TP, TT } from "./envelope/segments.ts";
import type { ParsedDispensation, ParsedPatient, ParsedPharmacy, ParsedReport } from "./report.ts";

export type { ParsedDispensation, ParsedPatient, ParsedPharmacy, ParsedReport } from "./report.ts";

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });

/** The order of the segments that may follow DSP. */
const DETAIL_ORDER: Record<string, number> = { PRE: 1, CDI: 2, AIR: 3 };

/** TH03 of a void: the report is TH and TT alone. */
const VOID = "04";

/**
 * Parses an ASAP report into its pharmacies, patients and dispensations.
 *
 * Fails for an input that does not start with a readable TH, a missing IS (other than in a void),
 * a segment outside the loop that holds it (PAT outside a pharmacy, DSP outside a patient, PRE, CDI
 * or AIR without a DSP), a second PRE or a PRE, CDI or AIR out of order, a pharmacy without TP, a
 * report that ends before TT, a segment after TT, and a segment ASAP does not define. Trailer counts
 * (TP01, TT02), a TT01 other than TH02 and a dispensation without PRE are reported in `warnings`:
 * whether PRE is required is the state's rule, though every guide read labels it so.
 */
export function parseReport(input: string): Result<ParsedReport> {
  const tokens = tokenize(input);
  if (!tokens.ok) return tokens;
  const { delimiters, segments } = tokens.val;

  const header = new TH(segments[0].elements);
  const warnings: string[] = [];
  const pharmacies: ParsedPharmacy[] = [];
  let informationSource: IS | undefined;
  let pharmacy: (Omit<ParsedPharmacy, "trailer"> & { start: number }) | undefined;
  let patient: ParsedPatient | undefined;
  let dispensation: (ParsedDispensation & { at: number; stage: number }) | undefined;
  let trailer: TT | undefined;

  const at = (i: number) => `at segment ${i + 1}`;
  const closeDispensation = () => {
    if (dispensation && !dispensation.prescriber) warnings.push(`DSP ${at(dispensation.at)} has no PRE segment`);
    dispensation = undefined;
  };

  let i = 1;
  if (segments[1]?.id === "IS") {
    informationSource = new IS(segments[1].elements);
    i = 2;
  } else if (header.getTransactionType() !== VOID) {
    return fail(`The TH segment must be followed by an IS segment (found ${segments[1]?.id ?? "nothing"})`);
  }

  for (; i < segments.length; i++) {
    const segment = segments[i];
    if (trailer) return fail(`${segment.id} segment ${at(i)} follows the TT segment`);

    switch (segment.id) {
      case "PHA":
        if (pharmacy) return fail(`PHA segment ${at(i)}: the pharmacy at segment ${pharmacy.start + 1} has no TP segment`);
        pharmacy = { pharmacy: segment, patients: [], start: i };
        break;
      case "PAT":
        if (!pharmacy) return fail(`PAT segment ${at(i)} is outside of any pharmacy (expected PHA first)`);
        closeDispensation();
        patient = { patient: segment, dispensations: [] };
        pharmacy.patients.push(patient);
        break;
      case "DSP":
        if (!patient) return fail(`DSP segment ${at(i)} is outside of any patient (expected PAT first)`);
        closeDispensation();
        dispensation = { dispensation: segment, compoundIngredients: [], additionalInformation: [], at: i, stage: 0 };
        patient.dispensations.push(dispensation);
        break;
      case "PRE":
      case "CDI":
      case "AIR": {
        if (!dispensation) return fail(`${segment.id} segment ${at(i)} has no DSP segment`);
        const stage = DETAIL_ORDER[segment.id];
        if (stage < dispensation.stage || (segment.id === "PRE" && dispensation.prescriber)) {
          return fail(`${segment.id} segment ${at(i)} is out of order: the segments after DSP are PRE, then CDI, then AIR`);
        }
        dispensation.stage = stage;
        if (segment.id === "PRE") dispensation.prescriber = segment;
        else if (segment.id === "CDI") dispensation.compoundIngredients.push(segment);
        else dispensation.additionalInformation.push(segment);
        break;
      }
      case "TP": {
        if (!pharmacy) return fail(`TP segment ${at(i)} has no PHA segment`);
        closeDispensation();
        const tp = new TP(segment.elements);
        const count = tp.getSegmentCount();
        if (count !== "" && Number(count) !== i - pharmacy.start + 1) {
          warnings.push(`TP01 ${at(i)} counts ${count} segments, the pharmacy holds ${i - pharmacy.start + 1}`);
        }
        const { start: _start, ...closed } = pharmacy;
        pharmacies.push({ ...closed, trailer: tp });
        pharmacy = undefined;
        patient = undefined;
        break;
      }
      case "TT": {
        if (pharmacy) return fail(`TT segment ${at(i)}: the pharmacy at segment ${pharmacy.start + 1} has no TP segment`);
        trailer = new TT(segment.elements);
        const count = trailer.getSegmentCount();
        if (count !== "" && Number(count) !== i + 1) warnings.push(`TT02 ${at(i)} counts ${count} segments, the report holds ${i + 1}`);
        if (trailer.getControlNumber() !== header.getControlNumber()) {
          warnings.push(`TT01 ${at(i)} is '${trailer.getControlNumber()}', TH02 is '${header.getControlNumber()}'`);
        }
        break;
      }
      default:
        return fail(`${segment.id} segment ${at(i)} is not an ASAP segment (expected PHA, PAT, DSP, PRE, CDI, AIR, TP or TT)`);
    }
  }

  if (pharmacy) return fail(`The report ends before the TP segment of the pharmacy at segment ${pharmacy.start + 1}`);
  if (!trailer) return fail("The report ends before its TT segment");
  return {
    ok: true,
    val: {
      delimiters,
      header,
      ...(informationSource ? { informationSource } : {}),
      pharmacies: pharmacies.map((p) => ({
        ...p,
        patients: p.patients.map((pat) => ({
          ...pat,
          dispensations: pat.dispensations.map(({ dispensation, prescriber, compoundIngredients, additionalInformation }) => ({
            dispensation,
            ...(prescriber ? { prescriber } : {}),
            compoundIngredients,
            additionalInformation,
          })),
        })),
      })),
      trailer,
      warnings,
    },
  };
}

/** Parses an ASAP report (see {@link parseReport}). */
export async function parse(input: string): Promise<Result<ParsedReport>> {
  return parseReport(input);
}
