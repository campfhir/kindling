#!/usr/bin/env python3
"""
Generates HL7 v2 fixture messages for every message structure of a version from the structure
definitions of hl7apy (https://github.com/crs4/hl7apy, MIT), the library that
https://github.com/mwaseem75/iris-HL7v2Gen (MIT) builds its test-message generator on. This script
does outside InterSystems IRIS what that tool's GenMessage does inside it: walk the message
structure, emit every segment the structure asks for and fill the required fields with
plausible values by datatype. Two variants are written per message structure:

  min   only the required segments and groups, the required fields filled (the iris-HL7v2Gen shape)
  full  every segment and group once (a repeating group twice at the top level), every field filled

The values are deterministic (seeded per message), so the output is stable across runs.

  pip install hl7apy
  python3 fixtures/generate.py            # writes fixtures/generated/v<version>.<variant>.hl7 for every version
  python3 fixtures/generate.py 2.5 2.5.1  # only these versions

Output: one file per version and variant, the messages separated by a blank line, each segment
ended by a carriage return (the HL7 segment terminator).
"""
import importlib
import random
import re
import sys
from pathlib import Path

import hl7apy
from hl7apy import load_reference

VERSIONS = ["2.1", "2.2", "2.3", "2.3.1", "2.4", "2.5", "2.5.1", "2.6", "2.7", "2.8", "2.8.1", "2.8.2"]  # hl7apy has no 2.7.1, 2.9 or 2.9.1
OUT = Path(__file__).parent / "generated"

# A 2.3 / 2.3.1 message type is named after its event, not its structure, in hl7apy's lists.
def message_structures(version):
    """The message structures of the version, without the generic placeholders (ADT_AXX, QBP_Qnn, …)."""
    lib = importlib.import_module(hl7apy.SUPPORTED_LIBRARIES[version])
    return sorted(name for name in lib.MESSAGES if re.fullmatch(r"ACK|[A-Z]{3}_[A-Z][A-Z0-9]{2}", name) and not re.search(r"nn|XX", name))


class Values:
    """Deterministic sample values by datatype (the iris-HL7v2Gen GetTestVal shapes, without Faker)."""

    FIRST = ["Ava", "Liam", "Noor", "Kenji", "Zoe", "Omar"]
    LAST = ["Nguyen", "Okafor", "Silva", "Haddad", "Kowalski", "Reyes"]
    STREETS = ["12 Elm St", "7 Harbour Rd", "301 Pine Ave", "9 Mill Lane"]
    CITIES = ["Springfield", "Riverton", "Lakeside", "Hillcrest"]

    def __init__(self, seed, tables):
        self.rng = random.Random(seed)
        self.tables = tables
        self.n = 0

    def next(self):
        self.n += 1
        return self.n

    def table(self, table):
        values = self.tables.get(table)
        if values and values[1]:
            return self.rng.choice(sorted(values[1]))
        return None

    def leaf(self, datatype, table, long_name):
        if long_name == "FIELD_SEPARATOR":
            return "|"
        if long_name == "ENCODING_CHARACTERS":
            return "^~\\&"
        if table and datatype in ("ID", "IS"):
            v = self.table(table)
            if v is not None:
                return v
        if datatype == "ST":
            return f"S{self.next():03d}"
        if datatype in ("TX", "FT"):
            return f"text {self.next()}"
        if datatype == "SI":
            return "1"
        if datatype == "NM":
            return str(self.rng.randint(1, 999))
        if datatype in ("TS", "DTM"):
            return "20250115103000"
        if datatype == "DT":
            return "20250115"
        if datatype == "TM":
            return "103000"
        if datatype in ("ID", "IS"):
            return "A"
        if datatype == "PT":
            return "P"
        if datatype == "VID":
            return "2.5"
        return f"V{self.next():03d}"

    def composite(self, datatype, components, table, full):
        """A composite as its components joined by ^ (first component only in the min variant, named composites filled)."""
        if datatype in ("XPN", "XCN", "PPN"):
            offset = 1 if datatype in ("XCN", "PPN") else 0
            parts = [""] * (3 + offset)
            if offset:
                parts[0] = str(self.rng.randint(1000, 9999))
            parts[offset] = self.rng.choice(self.LAST)
            parts[offset + 1] = self.rng.choice(self.FIRST)
            return "^".join(parts).rstrip("^")
        if datatype == "XAD":
            return f"{self.rng.choice(self.STREETS)}^^{self.rng.choice(self.CITIES)}"
        if datatype in ("CE", "CWE", "CNE"):
            code = self.rng.randint(100, 999)
            return f"{code}^Code {code}^L"
        if datatype in ("CX", "EI"):
            return f"{self.rng.randint(100000, 999999)}^^^HOSP"
        if datatype in ("HD",):
            return "HOSP"
        if datatype == "TS":
            return "20250115103000"
        if datatype == "MSG":
            return ""  # set by the caller
        if datatype == "PT":
            return "P"
        if datatype == "VID":
            return ""  # set by the caller
        if not full:
            first = components[0]
            return self.element(first[1], full=False)
        return "^".join(self.element(c[1], full=False) for c in components[:3])

    def element(self, definition, full):
        kind, children, datatype, long_name, table = definition[0], definition[1], definition[2], definition[3], definition[4]
        if kind == "leaf":
            return self.leaf(datatype, table, long_name)
        return self.composite(datatype, children, table, full)


class Generator:
    def __init__(self, version):
        self.version = version
        lib = importlib.import_module(hl7apy.SUPPORTED_LIBRARIES[version])
        try:
            self.tables = lib.tables.TABLES
        except AttributeError:
            self.tables = {}

    def segment(self, name, definition, values, full, structure, event):
        _, fields = definition
        out = [name]
        last = 0
        for index, (field_name, field_def, cardinality, _kind) in enumerate(fields, start=1):
            long_name = field_def[3]
            required = cardinality[0] >= 1
            if name == "MSH" and index == 1:
                continue  # the field separator is the one after "MSH"
            if name == "MSH" and index == 2:
                value = "^~\\&"
            elif name == "MSH" and long_name == "MESSAGE_TYPE" and self.version in ("2.1", "2.2"):
                # v2.1 and v2.2 define no message structure IDs: MSH-9 is the type and event alone
                value = event.replace("_", "^") if event else structure
            elif name == "MSH" and long_name == "MESSAGE_TYPE":
                value = f"{event.replace('_', '^')}^{structure}" if event else structure
            elif name == "MSH" and long_name == "VERSION_ID":
                value = self.version
            elif name == "MSH" and long_name == "MESSAGE_CONTROL_ID":
                value = f"MSG{values.next():04d}"
            elif name == "MSH" and long_name == "PROCESSING_ID":
                value = "P"
            elif name == "MSH" and long_name in ("SENDING_APPLICATION", "RECEIVING_APPLICATION"):
                value = "APP"
            elif name == "MSH" and long_name in ("SENDING_FACILITY", "RECEIVING_FACILITY"):
                value = "HOSP"
            elif name == "EVN" and long_name == "EVENT_TYPE_CODE":
                value = event.split("_")[1] if event and "_" in event else "A01"
            elif name == "MSH" and index > 12 and not full:
                value = ""
            elif required or full:
                value = values.element(field_def, full)
            else:
                value = ""
            if value != "":
                last = index
            out.append(value)
        # Trailing empty fields are dropped; MSH keeps at least MSH-12 (out[k] is MSH-(k+1): MSH-1 is the separator).
        keep = max(last, 12 if name == "MSH" else 1) - (1 if name == "MSH" else 0)
        return "|".join(out[: keep + 1])

    def items(self, children, values, full, structure, event, depth, out):
        for child_name, definition, cardinality, kind in children:
            required = cardinality[0] >= 1
            repeating = cardinality[1] != 1
            if not required and not full:
                continue
            times = 2 if (full and repeating and depth == 0 and kind == "GRP") else 1
            for _ in range(times):
                if kind == "SEG":
                    out.append(self.segment(child_name, definition, values, full, structure, event))
                elif kind == "GRP":
                    self.items(definition[1], values, full, structure, event, depth + 1, out)

    def message(self, structure, full):
        reference = load_reference(structure, "Message", self.version)
        values = Values(f"{self.version}:{structure}:{'full' if full else 'min'}", self.tables)
        # The event: ADT_A04 is an event of structure ADT_A01 in hl7apy's lists (the structure is what
        # we generate); the message type keeps the event when the name is one.
        event = structure if "_" in structure else None
        out = []
        self.items(reference[1], values, full, structure, event, 0, out)
        return "\r".join(out) + "\r"


def main(versions):
    OUT.mkdir(parents=True, exist_ok=True)
    for version in versions:
        gen = Generator(version)
        names = message_structures(version)
        for full in (False, True):
            messages = []
            for name in names:
                try:
                    messages.append(gen.message(name, full))
                except Exception as e:  # a structure hl7apy cannot load is reported and skipped
                    print(f"{version} {name}: skipped ({e})", file=sys.stderr)
            path = OUT / f"v{version}.{'full' if full else 'min'}.hl7"
            path.write_text("\r".join(messages), encoding="utf-8", newline="")
            print(f"{path.relative_to(Path(__file__).parent.parent)}: {len(messages)} messages")


if __name__ == "__main__":
    main(sys.argv[1:] or VERSIONS)
