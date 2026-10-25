import { parse, selectParser } from "../src/index.ts";

/**
 * Example: parse messages of unknown type with the root parser.
 *
 * `parse()` reads MSH-9 and MSH-12, picks the generated parser of that message in that version
 * and runs it; `structure` narrows `parsed` to the message's own shape. A batch file comes back
 * with `kind: "batch"` instead.
 */
const messages = [
  `MSH|^~\\&|ADT|Hospital|EMR|Clinic|20231115140500||ADT^A01|MSG001|P|2.3
EVN|A01|20231115140500
PID|1||123456789^^^MRN||DOE^JOHN^A||19750225|M
PV1|1|I|ICU^101^A`,
  `MSH|^~\\&|LAB|Hospital|EMR|Clinic|20231115140500||ORU^R01|MSG002|P|2.3
PID|1||123456789^^^MRN||DOE^JOHN^A
OBR|1|ORD123|LAB456|CBC^Complete Blood Count^L
OBX|1|NM|6690-2^WBC^LN|1|7.5|10*3/uL|4.0-11.0|N|||F`,
  `MSH|^~\\&|EMR|Clinic|ADT|Hospital|20231115140501||ACK^A01|MSG003|P|2.3
MSA|AA|MSG001`,
  `MSH|^~\\&|EMR|Clinic|ADT|Hospital|20231115140501||ZZZ^Z01|MSG004|P|2.3`,
  `MSH|^~\\&|EMR|Clinic|ADT|Hospital|20231115140501||ADT^A01|MSG005|P|2.5.1`,
];

for (const raw of messages) {
  const selected = selectParser(raw);
  if (!selected.ok) {
    console.log(`✗ ${selected.err.message}`);
    continue;
  }
  if (selected.val.kind === "batch") continue;
  console.log(`→ ${selected.val.messageType.messageCode}^${selected.val.messageType.triggerEvent} is ${selected.val.structure} (HL7 v${selected.val.version})`);

  const result = parse(raw);
  if (!result.ok) {
    console.log(`✗ ${result.err.message}`);
    continue;
  }
  if (result.val.kind === "batch") continue;
  switch (result.val.structure) {
    case "ADT_A01":
      console.log(`  admitted ${result.val.parsed.patient.encode()} to ${result.val.parsed.visit.encode()}`);
      break;
    case "ORU_R01":
      for (const { orderObservations } of result.val.parsed.patientResults) {
        for (const { observations } of orderObservations) observations?.forEach(({ observation }) => console.log(`  ${observation.encode()}`));
      }
      break;
    case "ACK":
      console.log(`  ${result.val.parsed.acknowledgment.encode()}`);
      break;
    default:
      console.log(`  ${result.val.parsed.message.encode().split("\r").length} segments`);
  }
}

// A batch file: parse() hands it to parseBatch(); every message is dispatched, a bad one does not fail the batch.
const batch = parse(
  [
    "FHS|^~\\&|ADT|Hospital|EMR|Clinic|20231115140500||nightly",
    "BHS|^~\\&|ADT|Hospital|EMR|Clinic|20231115140500||adt",
    ...messages.slice(0, 3),
    "BTS|3",
    "FTS|1",
  ].join("\r"),
);
if (batch.ok && batch.val.kind === "batch") {
  for (const [i, b] of batch.val.batches.entries()) {
    console.log(`batch ${i + 1}: ${b.messages.filter((m) => m.ok).length} of ${b.messages.length} messages parsed, trailer ${b.trailer?.encode()}`);
    b.messages.forEach((m) => (m.ok ? console.log(`  ${m.val.structure}`) : console.log(`  ✗ ${m.err.message}`, m.err.meta)));
  }
  console.log(batch.val.warnings.length ? batch.val.warnings : "  counts agree");
}
