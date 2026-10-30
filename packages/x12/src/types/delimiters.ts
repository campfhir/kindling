/**
 * The delimiters of an X12 interchange. They are not fixed by the standard: the sender picks them
 * and announces them in the ISA segment, which is fixed length so a receiver can read them before
 * it knows anything else (see `readDelimiters()` in `../tokenize.ts`).
 */
export interface Delimiters {
  /** Data element separator: the character right after `ISA`. */
  element: string;
  /** Repetition separator: ISA11 (from version 00402; `U` in ISA11 of 00401 means none). */
  repetition: string;
  /** Component element separator: ISA16. */
  component: string;
  /** Segment terminator: the character right after ISA16. */
  segment: string;
}

/** The delimiters most healthcare senders use, and the default when encoding. */
export const DEFAULT_DELIMITERS: Delimiters = {
  element: "*",
  repetition: "^",
  component: ":",
  segment: "~",
};
