/**
 * The date and time forms of the envelope: DT is `YYMMDD` (ISA09) or `CCYYMMDD` (GS04), TM is
 * `HHMM` (ISA10, GS05). A `Date` is formatted in local time; a string is written as given.
 *
 * @module
 */

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

/** `CCYYMMDD` of a date, or the string unchanged. */
export function formatDate8(value: Date | string): string {
  if (typeof value === "string") return value;
  return `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}`;
}

/** `YYMMDD` of a date, or the string unchanged. */
export function formatDate6(value: Date | string): string {
  return typeof value === "string" ? value : formatDate8(value).substring(2);
}

/** `HHMM` of a date, or the string unchanged. */
export function formatTime(value: Date | string): string {
  if (typeof value === "string") return value;
  return `${pad(value.getHours())}${pad(value.getMinutes())}`;
}
