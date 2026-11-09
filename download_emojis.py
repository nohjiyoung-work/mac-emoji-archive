"""Download Apple PNG files listed in emoji-datasource-apple, without manual editing.
Run once: Windows `py download_emojis.py` or macOS `python3 download_emojis.py`.
Requires an internet connection and Python 3.8+. No third-party modules.
Apple emoji images are owned by Apple: check usage rights before sharing.
"""
import concurrent.futures
import json
import pathlib
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'img' / 'apple'
OUT.mkdir(parents=True, exist_ok=True)
BASES = [
    'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/',
    'https://unpkg.com/emoji-datasource-apple@16.0.0/',
]
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; EmojiArchive/1.0)'}


def get_bytes(path):
    last = None
    for base in BASES:
        try:
            req = urllib.request.Request(base + path, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=25) as res:
                return res.read()
        except Exception as exc:
            last = exc
    raise RuntimeError(f'Cannot download {path}: {last}')


def fetch_one(name):
    dest = OUT / name
    if dest.is_file() and dest.stat().st_size > 100:
        return 'skip', name
    try:
        data = get_bytes('img/apple/64/' + name)
        if not data.startswith(b'\x89PNG\r\n\x1a\n'):
            raise ValueError('Not a PNG')
        dest.write_bytes(data)
        return 'ok', name
    except Exception as exc:
        return 'fail', f'{name}: {exc}'


def main():
    print('Downloading emoji metadata...')
    try:
        data = json.loads(get_bytes('emoji.json'))
    except Exception as exc:
        print('Could not obtain metadata. Check internet/proxy:', exc)
        return
    (ROOT / 'emoji-data.json').write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')
    names = set()
    for item in data:
        if item.get('image') and item.get('has_img_apple') is not False:
            names.add(item['image'].lower())
        for variation in (item.get('skin_variations') or {}).values():
            if variation.get('image') and variation.get('has_img_apple') is not False:
                names.add(variation['image'].lower())
    print(f'{len(names)} unique Apple PNG files found. Downloading (this may take a while).')
    failures = []
    completed = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        for state, detail in pool.map(fetch_one, sorted(names)):
            completed += 1
            if state == 'fail':
                failures.append(detail)
            if completed % 250 == 0 or completed == len(names):
                print(f'{completed}/{len(names)} processed; failures: {len(failures)}')
    (ROOT / 'download-errors.txt').write_text('\n'.join(failures), encoding='utf-8')
    print(f'Done. Failed: {len(failures)}. Re-run this script to retry failures.')
    print('Open index.html with VS Code Live Server.')


if __name__ == '__main__':
    main()
