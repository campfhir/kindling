/**
 * What an ASAP input says about itself, read from its TH and IS without grouping it. The root entry
 * exports it, so a caller can route a report before parsing it.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import type { Delimiters } from "./types/delimiters.ts";
import { stripLeader, tokenize } from "./tokenize.ts";
import { TH } from "./envelope/TH.ts";

/** What a report's TH and IS say about it. */
export interface ReportType {
  /** The delimiters announced in the TH. */
  delimiters: Delimiters;
  /** TH01 Version/Release Number (`4.2B`). */
  version: string;
  /** TH02 Transaction Control Number. */
  controlNumber: string;
  /** TH03 Transaction Type (`01` send, `04` void, …). */
  transactionType: string;
  /** TH07 File Type (`P` production, `T` test). */
  fileType: string;
  /** IS01 Unique Information Source ID, when the report has an IS. */
  informationSourceId?: string;
  /** IS02 Information Source Entity Name, when the report has an IS. */
  informationSourceName?: string;
}

/** Whether an input is an ASAP report: it starts with `TH` and a separator (after any whitespace). */
export function isAsapInput(input: string): boolean {
  return /^TH[^A-Za-z0-9 ]/.test(stripLeader(input));
}

/** Reads a report's TH and IS. */
export function identifyReport(input: string): Result<ReportType> {
  const tokens = tokenize(input);
  if (!tokens.ok) return tokens;
  const { delimiters, segments } = tokens.val;
  const th = new TH(segments[0].elements);
  const is = segments[1]?.id === "IS" ? segments[1] : undefined;
  return {
    ok: true,
    val: {
      delimiters,
      version: th.getVersion(),
      controlNumber: th.getControlNumber(),
      transactionType: th.getTransactionType(),
      fileType: th.getFileType(),
      ...(is ? { informationSourceId: is.get(1), informationSourceName: is.get(2) } : {}),
    },
  };
}
