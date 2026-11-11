
"""
Apple Emoji Archive
Download original Apple PNG files.

Source:
https://em-content.zobj.net/source/apple/453/

No resizing or upscaling.
Python 3.8+
"""

import concurrent.futures
import json
import pathlib
import re
import struct
import urllib.request


# SETTINGS

ROOT = pathlib.Path(__file__).resolve().parent
OUTPUT = ROOT / "img" / "apple"

OUTPUT.mkdir(parents=True, exist_ok=True)

APPLE_SOURCE = (
    "https://em-content.zobj.net/source/apple/453/"
)

DATA_SOURCES = [
    "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/emoji.json",
    "https://unpkg.com/emoji-datasource-apple@16.0.0/emoji.json"
]

MIN_SIZE = 160
MAX_WORKERS = 3

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


# KNOWN FILENAMES

OVERRIDES = {
    "1f600": "grinning-face_1f600.png",
    "1f603": "grinning-face-with-big-eyes_1f603.png",
    "1f604": "grinning-face-with-smiling-eyes_1f604.png"
}


# DOWNLOAD DATA

def fetch(url):
    request = urllib.request.Request(
        url,
        headers=HEADERS
    )

    with urllib.request.urlopen(
        request,
        timeout=25
    ) as response:
        return response.read()


def load_metadata():
    for url in DATA_SOURCES:
        try:
            data = json.loads(fetch(url))

            if isinstance(data, list) and data:
                return data

        except Exception as error:
            print("Metadata error:", error)

    raise RuntimeError(
        "이모티콘 목록을 가져오지 못했습니다."
    )


# FILENAMES

def slugify(name):
    name = name.lower()

    name = name.replace("&", " and ")
    name = name.replace("'", "")
    name = name.replace("’", "")
    name = name.replace(":", " ")
    name = name.replace("+", " plus ")
    name = name.replace("#", " number ")

    name = re.sub(r"[^a-z0-9]+", "-", name)

    return name.strip("-")


def filename(name, code):
    code = code.lower()

    if code in OVERRIDES:
        return OVERRIDES[code]

    return f"{slugify(name)}_{code}.png"


# PNG VALIDATION

def png_size(data):
    signature = b"\x89PNG\r\n\x1a\n"

    if len(data) < 24:
        raise ValueError("PNG 데이터가 너무 작습니다.")

    if not data.startswith(signature):
        raise ValueError("PNG 형식이 아닙니다.")

    width, height = struct.unpack(
        ">II",
        data[16:24]
    )

    return width, height


def is_original(data):
    width, height = png_size(data)

    return width >= MIN_SIZE and height >= MIN_SIZE


# CREATE EMOJI RECORDS

def make_records(data):
    records = {}

    for emoji in data:
        if (
            emoji.get("image")
            and emoji.get("has_img_apple") is not False
        ):
            code = emoji["unified"].lower()

            name = (
                emoji.get("name")
                or emoji.get("short_name")
                or code
            )

            records[code] = {
                "name": name,
                "code": code,
                "filename": filename(name, code)
            }

        for variation in (
            emoji.get("skin_variations") or {}
        ).values():

            if (
                not variation.get("image")
                or variation.get("has_img_apple") is False
            ):
                continue

            code = variation["unified"].lower()

            name = (
                variation.get("name")
                or (
                    f"{emoji.get('name') or emoji.get('short_name')}"
                    f" {variation['unified']}"
                )
            )

            records[code] = {
                "name": name,
                "code": code,
                "filename": filename(name, code)
            }

    return list(records.values())


# DOWNLOAD ORIGINAL PNG

def download_one(item):
    name = item["filename"]
    code = item["code"]

    destination = OUTPUT / name

    # Skip already saved original PNGs.
    if destination.exists():
        try:
            existing = destination.read_bytes()

            if is_original(existing):
                return "skip", code, name

        except Exception:
            pass

    url = APPLE_SOURCE + name

    try:
        data = fetch(url)

        if not is_original(data):
            width, height = png_size(data)

            raise ValueError(
                f"원본 크기 부족: {width}x{height}"
            )

        # Save the original bytes without resizing.
        destination.write_bytes(data)

        return "success", code, name

    except Exception as error:
        return (
            "failed",
            code,
            f"{name}: {error}"
        )


# MAIN

def main():
    print("Loading emoji metadata...")

    data = load_metadata()

    # Save metadata for the website.
    metadata_path = ROOT / "emoji-data.json"

    metadata_path.write_text(
        json.dumps(data, ensure_ascii=False),
        encoding="utf-8"
    )

    records = make_records(data)

    print(f"Total: {len(records)} emojis")
    print("Downloading original Apple PNG files...")

    successful = {}
    failed = []

    completed = 0

    with concurrent.futures.ThreadPoolExecutor(
        max_workers=MAX_WORKERS
    ) as executor:

        for result, code, detail in executor.map(
            download_one,
            records
        ):
            completed += 1

            if result in ("success", "skip"):
                successful[code] = detail

            else:
                failed.append(detail)

            if completed % 100 == 0:
                print(
                    f"{completed}/{len(records)} completed"
                )

    # Save verified image filenames.
    manifest = {
        "source": APPLE_SOURCE,
        "minimum_size": MIN_SIZE,
        "files": successful
    }

    (ROOT / "emoji-manifest.json").write_text(
        json.dumps(
            manifest,
            ensure_ascii=False,
            indent=2
        ),
        encoding="utf-8"
    )

    # Record missing images.
    (ROOT / "download-errors.txt").write_text(
        "\n".join(failed),
        encoding="utf-8"
    )

    print()
    print("Download finished.")
    print("Original PNGs:", len(successful))
    print("Failed:", len(failed))

    print(
        "Original files saved in img/apple/"
    )

    print(
        "Upload images, emoji-data.json and "
        "emoji-manifest.json to GitHub."
    )


if __name__ == "__main__":
    main()
