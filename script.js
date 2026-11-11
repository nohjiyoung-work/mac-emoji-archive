
/* ========================================
   APPLE EMOJI ARCHIVE
   Original PNG / Default Variations Only
======================================== */

// IMAGE SOURCES

const APPLE_160 =
  "https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/";

const EMOJIPEDIA =
  "https://em-content.zobj.net/source/apple/453/";

const CDN =
  "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/";

const CDN_ALT =
  "https://unpkg.com/emoji-datasource-apple@16.0.0/";


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


// CATEGORIES

const categoryNames = new Map([
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


// KNOWN FILENAMES

const filenameOverrides = {
  "1f600": "grinning-face_1f600.png",
  "1f603": "grinning-face-with-big-eyes_1f603.png",
  "1f604": "grinning-face-with-smiling-eyes_1f604.png"
};


// NOTIFICATION

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


// UNICODE

function fromUnified(code) {
  return code
    .split("-")
    .map(part => String.fromCodePoint(parseInt(part, 16)))
    .join("");
}

function toUnified(symbol) {
  return [...symbol]
    .map(char => char.codePointAt(0).toString(16))
    .join("-");
}


// FILE NAMES

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


// GROUPS
// Only default emoji, no skin-tone variations.

function makeGroups(data) {
  const map = new Map();

  for (const name of categoryNames.values()) {
    map.set(name, {
      name,
      items: []
    });
  }

  const sorted = [...data].sort(
    (a, b) =>
      (a.sort_order ?? 99999) -
      (b.sort_order ?? 99999)
  );

  const seen = new Set();

  for (const emoji of sorted) {
    if (!emoji.unified || !emoji.image) continue;
    if (emoji.has_img_apple === false) continue;

    const category = categoryNames.get(emoji.category);
    const group = map.get(category);

    if (!group) continue;

    const code = emoji.unified.toLowerCase();

    if (seen.has(code)) continue;
    seen.add(code);

    group.items.push({
      name: emoji.name || emoji.short_name || code,
      symbol: fromUnified(code),
      code,
      image: emoji.image.toLowerCase()
    });

    // Skin variations are intentionally excluded.
  }

  return [...map.values()].filter(
    group => group.items.length > 0
  );
}


// FALLBACK DATA

function fallbackGroups() {
  if (typeof emojiData === "undefined") {
    return [];
  }

  return emojiData.map(group => ({
    name: group.name,

    items: group.items.map(([symbol, name]) => ({
      symbol,
      name,
      code: toUnified(symbol),
      image: `${toUnified(symbol)}.png`
    }))
  }));
}


// IMAGE URLS

function imageSources(item) {
  const sources = [];

  // Downloaded local original PNG.
  if (manifest[item.code]) {
    sources.push(
      `img/apple/${manifest[item.code]}`
    );
  }

  // User-provided original PNGs.
  if (item.code === "1f600") {
    sources.push("img/grinning-face.png");
  }

  if (item.code === "1f603") {
    sources.push("img/grinning-face-eyes.png");
  }

  // Apple 160px image source.
  if (item.image) {
    sources.push(APPLE_160 + item.image);
  }

  // Emojipedia original Apple image.
  sources.push(
    EMOJIPEDIA + getFilename(item)
  );

  return [...new Set(sources)];
}


// READ ORIGINAL PNG

async function readPNG(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const blob = await response.blob();

  const header = new Uint8Array(
    await blob.slice(0, 24).arrayBuffer()
  );

  const signature = [
    137, 80, 78, 71, 13, 10, 26, 10
  ];

  if (
    header.length < 24 ||
    !signature.every((byte, i) => header[i] === byte)
  ) {
    throw new Error("Invalid PNG");
  }

  const view = new DataView(header.buffer);

  const width = view.getUint32(16);
  const height = view.getUint32(20);

  return {
    blob,
    width,
    height
  };
}


// FIND ORIGINAL PNG
// No image resizing or upscaling.

async function getOriginalPNG(item, currentURL) {
  const sources = [
    currentURL,
    ...imageSources(item)
  ].filter(Boolean);

  const unique = [...new Set(sources)];

  for (const url of unique) {
    try {
      const result = await readPNG(url);

      // Original PNG must be at least 160px.
      if (
        result.width >= 160 &&
        result.height >= 160
      ) {
        return result;
      }

    } catch (error) {
      console.info(
        "Image unavailable:",
        url,
        error.message
      );
    }
  }

  throw new Error(
    "160px 이상 Apple PNG를 찾지 못했습니다."
  );
}


// DOWNLOAD ORIGINAL PNG

function downloadPNG(data, filename) {
  const url = URL.createObjectURL(data.blob);

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

  // Try the next Apple source if the first fails.
  function nextImage() {
    ready = false;
    sourceIndex++;

    if (sourceIndex < sources.length) {
      img.src = sources[sourceIndex];
    } else {
      button.disabled = true;
      button.classList.add("unavailable");
      button.title = `${item.name} — Apple PNG unavailable`;
      img.removeAttribute("src");
    }
  }

  img.onload = () => {
    if (
      img.naturalWidth < 160 ||
      img.naturalHeight < 160
    ) {
      nextImage();
      return;
    }

    ready = true;
    button.disabled = false;
    button.classList.remove("unavailable");
  };

  img.onerror = nextImage;

  if (sources.length) {
    img.src = sources[0];
  } else {
    button.classList.add("unavailable");
  }

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
      const currentURL = img.currentSrc || img.src;

      const pngPromise = getOriginalPNG(
        item,
        currentURL
      );

      if (isDownload) {
        const data = await pngPromise;

        downloadPNG(
          data,
          getFilename(item)
        );

        notify(
          `원본 다운로드 완료! (${data.width}×${data.height}px)`
        );

      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": pngPromise.then(
              result => result.blob
            )
          })
        ]);

        const data = await pngPromise;

        notify(
          `복사되었습니다! (${data.width}×${data.height}px)`
        );
      }

    } catch (error) {
      console.error(
        "PNG processing failed:",
        item.name,
        error
      );

      notify(
        "복사 실패 — Apple PNG 접근 제한 또는 이미지 누락"
      );
    }
  });

  return button;
}


// RENDER ALL DEFAULT EMOJIS

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
      item.code.includes(keyword) ||
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

    // One button per default emoji.
    for (const item of items) {
      grid.appendChild(createEmoji(item));
    }

    section.append(title, grid);
    archive.appendChild(section);

    const link = document.createElement("a");

    link.href = `#${section.id}`;
    link.textContent = group.name;

    categories.appendChild(link);
  });

  count.textContent =
    `${total.toLocaleString()} emoji`;

  empty.hidden = total !== 0;
}


// JSON LOADER

async function loadJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}


// INITIALIZE

async function init() {
  // Load verified local PNG file list.
  try {
    const saved = await loadJSON(
      "emoji-manifest.json"
    );

    manifest = saved.files || {};

  } catch (error) {
    console.info(
      "Local PNG manifest unavailable."
    );
  }

  // Full emoji catalogue.
  const dataSources = [
    "emoji-data.json",
    CDN + "emoji.json",
    CDN_ALT + "emoji.json"
  ];

  for (const url of dataSources) {
    try {
      const data = await loadJSON(url);

      if (!Array.isArray(data) || !data.length) {
        continue;
      }

      groups = makeGroups(data);

      status.textContent =
        "Apple PNG · Default emoji only";

      render();
      return;

    } catch (error) {
      console.warn(
        "Emoji data unavailable:",
        url,
        error
      );
    }
  }

  // Offline fallback.
  groups = fallbackGroups();

  status.textContent =
    "Apple PNG · Default emoji catalogue";

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
