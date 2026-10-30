/**
 * The delimiters of an ASAP report. ASAP does not fix them: the data element separator is the
 * character right after `TH`, and TH09 holds the segment terminator, which then also ends the TH
 * segment (so TH ends with it twice). ASAP defines no component or repetition separator. See
 * `docs/validation/asap-ledger.md`, section 3.
 */
export interface Delimiters {
  /** Data element separator: the third character of the report. */
  element: string;
  /** Segment terminator: TH09. */
  segment: string;
}

/** The delimiters the state guides' examples use, and the default when encoding. */
export const DEFAULT_DELIMITERS: Delimiters = {
  element: "*",
  segment: "~",
};
