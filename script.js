
/* ========================================
   APPLE EMOJI ARCHIVE
   Original PNG only — no upscaling
======================================== */

// IMAGE SOURCE

const APPLE_SOURCE =
  "https://em-content.zobj.net/source/apple/453/";

const DATA_SOURCE =
  "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/emoji.json";

const DATA_SOURCE_ALT =
  "https://unpkg.com/emoji-datasource-apple@16.0.0/emoji.json";

const MIN_SIZE = 160;


// ELEMENTS

const archive = document.querySelector("#archive");
const categories = document.querySelector("#categories");
const search = document.querySelector("#search");
const count = document.querySelector("#count");
const status = document.querySelector("#status");
const empty = document.querySelector("#empty");
const toast = document.querySelector("#toast");

let groups = [];
let manifest = {};
let toastTimer;


// CATEGORY NAMES

const groupNames = new Map([
  ["Smileys & Emotion", "Smileys"],
  ["People & Body", "People"],
  ["Animals & Nature", "Animals & Nature"],
  ["Food & Drink", "Food & Drink"],
  ["Activities", "Activity"],
  ["Travel & Places", "Travel & Places"],
  ["Objects", "Objects"],
  ["Symbols", "Symbols"],
  ["Flags", "Flags"]
]);


// KNOWN EMOJIPEDIA FILENAMES

const filenameOverrides = {
  "1f600": "grinning-face_1f600.png",
  "1f603": "grinning-face-with-big-eyes_1f603.png",
  "1f604": "grinning-face-with-smiling-eyes_1f604.png"
};


// NOTIFICATION

function notify(text) {
  toast.textContent = text;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


// UNICODE UTILITIES

function fromUnified(code) {
  return code.split("-")
    .map(part => String.fromCodePoint(
      parseInt(part, 16)
    ))
    .join("");
}

function toUnified(symbol) {
  return [...symbol]
    .map(char => char.codePointAt(0).toString(16))
    .join("-");
}


// EMOJI FILENAME

function slugify(name = "") {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/:/g, " ")
    .replace(/\+/g, " plus ")
    .replace(/#/g, " number ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFilename(item) {
  if (filenameOverrides[item.code]) {
    return filenameOverrides[item.code];
  }

  return `${slugify(item.name)}_${item.code}.png`;
}


// DATA ORGANIZATION

function makeGroups(data) {
  const map = new Map(
    [...groupNames.values()].map(name => [
      name,
      { name, items: [] }
    ])
  );

  const sorted = [...data].sort(
    (a, b) =>
      (a.sort_order ?? 99999) -
      (b.sort_order ?? 99999)
  );

  sorted.forEach(emoji => {
    const category = groupNames.get(emoji.category);
    const group = map.get(category);

    if (!group) return;
    if (!emoji.image || emoji.has_img_apple === false) {
      return;
    }

    const name =
      emoji.name ||
      emoji.short_name ||
      emoji.unified;

    group.items.push({
      name,
      symbol: fromUnified(emoji.unified),
      code: emoji.unified.toLowerCase()
    });

    Object.values(emoji.skin_variations || {})
      .forEach(skin => {
        if (!skin.image || skin.has_img_apple === false) {
          return;
        }

        group.items.push({
          name: skin.name || `${name} ${skin.unified}`,
          symbol: fromUnified(skin.unified),
          code: skin.unified.toLowerCase()
        });
      });
  });

  return [...map.values()].filter(
    group => group.items.length > 0
  );
}


// OFFLINE DATA FALLBACK

function fallbackGroups() {
  if (typeof emojiData === "undefined") {
    return [];
  }

  return emojiData.map(group => ({
    name: group.name,

    items: group.items.map(([symbol, name]) => ({
      symbol,
      name,
      code: toUnified(symbol)
    }))
  }));
}


// IMAGE SOURCES

function imageSources(item) {
  const filename = getFilename(item);
  const sources = [];

  // Local original PNG downloaded by Python.
  if (manifest[item.code]) {
    sources.push(`img/apple/${manifest[item.code]}`);
  }

  // Two original images supplied earlier.
  if (item.code === "1f600") {
    sources.push("img/grinning-face.png");
  }

  if (item.code === "1f603") {
    sources.push("img/grinning-face-eyes.png");
  }

  // Original Emojipedia PNG.
  sources.push(`${APPLE_SOURCE}${filename}`);

  return [...new Set(sources)];
}


// FETCH ORIGINAL PNG

async function getOriginalPNG(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const blob = await response.blob();

  // Verify PNG format.
  const signature = new Uint8Array(
    await blob.slice(0, 8).arrayBuffer()
  );

  const validPNG = [
    137, 80, 78, 71, 13, 10, 26, 10
  ].every((byte, i) => signature[i] === byte);

  if (!validPNG) {
    throw new Error("PNG 파일이 아닙니다.");
  }

  // Verify original dimensions.
  const bitmap = await createImageBitmap(blob);

  const width = bitmap.width;
  const height = bitmap.height;

  bitmap.close();

  if (width < MIN_SIZE || height < MIN_SIZE) {
    throw new Error(
      `원본 해상도가 부족합니다: ${width}x${height}px`
    );
  }

  // Return the original file. No resizing.
  return blob;
}


// DOWNLOAD ORIGINAL PNG

function downloadPNG(blob, filename) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 5000);
}


// CREATE EMOJI BUTTON

function createEmoji(item) {
  const button = document.createElement("button");
  const img = document.createElement("img");

  button.className = "emoji";
  button.type = "button";

  button.title =
    `${item.name} — Click: Copy / Shift+Click: Download`;

  button.setAttribute("aria-label", item.name);

  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";

  const sources = imageSources(item);

  let sourceIndex = 0;
  let ready = false;

  button.disabled = true;

  // Load next original image if current source fails.
  function tryNextSource() {
    sourceIndex++;

    if (sourceIndex < sources.length) {
      img.src = sources[sourceIndex];
    } else {
      button.disabled = true;
      button.classList.add("unavailable");
      button.title =
        `${item.name} — Apple PNG 원본을 찾지 못했습니다.`;

      img.removeAttribute("src");
    }
  }

  img.onload = () => {
    // Do not accept 64px images.
    if (
      img.naturalWidth < MIN_SIZE ||
      img.naturalHeight < MIN_SIZE
    ) {
      tryNextSource();
      return;
    }

    ready = true;
    button.disabled = false;
    button.classList.remove("unavailable");
  };

  img.onerror = () => {
    ready = false;
    tryNextSource();
  };

  img.src = sources[sourceIndex];

  button.appendChild(img);


  // COPY / DOWNLOAD

  button.addEventListener("click", async event => {
    if (!ready || button.disabled) return;

    const isDownload = event.shiftKey;

    if (
      !isDownload &&
      (
        !window.isSecureContext ||
        !navigator.clipboard?.write ||
        !window.ClipboardItem
      )
    ) {
      notify("HTTPS 또는 Live Server에서 실행해주세요.");
      return;
    }

    try {
      const url = img.currentSrc || img.src;

      // Original PNG only.
      const pngPromise = getOriginalPNG(url);

      if (isDownload) {
        const png = await pngPromise;

        downloadPNG(png, getFilename(item));

        notify("원본 PNG 다운로드 완료!");
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": pngPromise
          })
        ]);

        notify("복사되었습니다!");
      }

    } catch (error) {
      console.error(
        "Apple PNG 처리 실패:",
        item.name,
        error
      );

      if (
        error instanceof TypeError ||
        error.name === "SecurityError"
      ) {
        notify("외부 이미지 접근 제한입니다. 원본 PNG를 로컬에 저장해주세요.");
      } else {
        notify(`복사 실패: ${error.message}`);
      }
    }
  });

  return button;
}


// RENDER GRID

function render() {
  const keyword = search.value.toLowerCase().trim();

  archive.replaceChildren();
  categories.replaceChildren();

  let total = 0;

  groups.forEach((group, index) => {
    const items = group.items.filter(item =>
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.symbol.includes(keyword) ||
      group.name.toLowerCase().includes(keyword)
    );

    if (!items.length) return;

    total += items.length;

    const section = document.createElement("section");
    section.id = `category-${index}`;

    const title = document.createElement("h2");
    title.textContent = group.name;

    const grid = document.createElement("div");
    grid.className = "grid";

    items.forEach(item => {
      grid.appendChild(createEmoji(item));
    });

    section.append(title, grid);
    archive.appendChild(section);

    const link = document.createElement("a");

    link.href = `#${section.id}`;
    link.textContent = group.name;

    categories.appendChild(link);
  });

  count.textContent = `${total.toLocaleString()} emoji`;
  empty.hidden = total !== 0;
}


// LOAD JSON

async function loadJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}


// INITIALIZE

async function init() {
  // Load verified local original filenames.
  try {
    const saved = await loadJSON("emoji-manifest.json");
    manifest = saved.files || {};
  } catch (error) {
    console.info("로컬 이미지 목록 없음. 온라인 원본을 사용합니다.");
  }

  const dataSources = [
    "emoji-data.json",
    DATA_SOURCE,
    DATA_SOURCE_ALT
  ];

  for (const url of dataSources) {
    try {
      const data = await loadJSON(url);

      if (!Array.isArray(data) || !data.length) {
        continue;
      }

      groups = makeGroups(data);

      status.textContent =
        "Apple original PNG — 160px or higher";

      render();
      return;

    } catch (error) {
      console.warn("목록 로딩 실패:", url, error);
    }
  }

  groups = fallbackGroups();

  status.textContent =
    "Apple original PNG — fallback emoji list";

  render();
}


// SEARCH

search.addEventListener("input", render);


// BACK TO TOP

document.querySelectorAll(".back-to-top")
  .forEach(button => {
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });


// START

init();
