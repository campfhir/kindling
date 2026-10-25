#!/bin/bash
# Downloads the three v2.3 segment tables that codegen/validate/ledger-v23.mjs compares:
# hl7.eu segment pages, Caristix segment JSON and HAPI's generated v2.3 segment classes
# (field definitions only; HAPI is MPL 1.1 / GPL and is read, not copied).
#
# Usage: codegen/validate/fetch-v23-sources.sh <target-dir>
# Files already present are kept, so a rerun only fetches what is missing.
set -u
OUT=${1:?target directory}
HL7=$(cd "$(dirname "$0")/../.." && pwd)
mkdir -p "$OUT/hl7eu" "$OUT/caristix" "$OUT/hapi"
for f in "$HL7"/src/segments/v2.3/*.ts; do
  seg=$(basename "$f" .ts)
  case "$seg" in index|*.test) continue ;; esac
  [ -s "$OUT/hl7eu/$seg.htm" ] || curl -sf --max-time 40 "https://www.hl7.eu/HL7v2x/v23/hl7v23segm$seg.htm" -o "$OUT/hl7eu/$seg.htm"
  [ -s "$OUT/caristix/$seg.json" ] || curl -sf --max-time 40 "https://hl7-definition.caristix.com/v2-api/1/HL7v2.3/Segments/$seg" -o "$OUT/caristix/$seg.json"
  [ -s "$OUT/hapi/$seg.java" ] || curl -sf --max-time 40 "https://raw.githubusercontent.com/hapifhir/hapi-hl7v2/master/hapi-structures-v23/src/main/java/ca/uhn/hl7v2/model/v23/segment/$seg.java" -o "$OUT/hapi/$seg.java"
done
date -u +%Y-%m-%d > "$OUT/fetched.txt"
for d in hl7eu caristix hapi; do echo "$d: $(ls "$OUT/$d" | wc -l) file(s)"; done
