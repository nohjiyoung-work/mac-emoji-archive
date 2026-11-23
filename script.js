
/* ==========================================
   APPLE EMOJI ARCHIVE
   Hover Skin Tone Picker
========================================== */

// IMAGE SOURCES

const EMOJIPEDIA =
  "https://em-content.zobj.net/source/apple/453/";

const APPLE_160 =
  "https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/";

const CDN =
  "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/";

const CDN_ALT =
  "https://unpkg.com/emoji-datasource-apple@16.0.0/";

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

let activePicker = null;
let activeCell = null;
let closeTimer = null;


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


// EMOJIPEDIA FILENAMES

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
    .map(part =>
      String.fromCodePoint(parseInt(part, 16))
    )
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


// EMOJI DATA

function makeItem(entry, fallbackName = "") {
  const code = entry.unified.toLowerCase();

  return {
    name:
      entry.name ||
      fallbackName ||
      entry.short_name ||
      code,

    symbol: fromUnified(code),
    code,
    image: (entry.image || "").toLowerCase(),
    variations: []
  };
}


// GROUPS

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

    const item = makeItem(emoji);

    // Variations only appear in the hover picker.
    const variations = Object.entries(
      emoji.skin_variations || {}
    );

    for (const [tone, skin] of variations) {
      if (!skin.unified || !skin.image) continue;
      if (skin.has_img_apple === false) continue;

      const variant = makeItem(
        skin,
        `${item.name} (${tone})`
      );

      item.variations.push(variant);
    }

    const unique = new Map();

    for (const variant of item.variations) {
      if (variant.code !== item.code) {
        unique.set(variant.code, variant);
      }
    }

    item.variations = [...unique.values()];
    group.items.push(item);
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
      image: `${toUnified(symbol)}.png`,
      variations: []
    }))
  }));
}


// IMAGE SOURCES

function imageSources(item) {
  const sources = [];

  if (manifest[item.code]) {
    sources.push(
      `img/apple/${manifest[item.code]}`
    );
  }

  if (item.code === "1f600") {
    sources.push("img/grinning-face.png");
  }

  if (item.code === "1f603") {
    sources.push("img/grinning-face-eyes.png");
  }

  if (item.image) {
    sources.push(APPLE_160 + item.image);
  }

  sources.push(
    EMOJIPEDIA + getFilename(item)
  );

  return [...new Set(sources)];
}


// PREVIEW IMAGE

function loadPreview(img, item, onFail) {
  const sources = imageSources(item);
  let index = 0;

  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";

  function next() {
    index++;

    if (index < sources.length) {
      img.src = sources[index];
    } else {
      img.removeAttribute("src");
      onFail?.();
    }
  }

  img.onload = () => {
    if (
      img.naturalWidth < MIN_SIZE ||
      img.naturalHeight < MIN_SIZE
    ) {
      next();
    }
  };

  img.onerror = next;

  if (sources.length) {
    img.src = sources[0];
  } else {
    onFail?.();
  }
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
    throw new Error("PNG 파일이 아닙니다.");
  }

  const view = new DataView(
    header.buffer,
    header.byteOffset,
    header.byteLength
  );

  const width = view.getUint32(16);
  const height = view.getUint32(20);

  if (width < MIN_SIZE || height < MIN_SIZE) {
    throw new Error("160px 미만 이미지입니다.");
  }

  return { blob, width, height };
}


// FIND COPYABLE PNG

async function getOriginalPNG(item, currentURL) {
  const sources = [
    currentURL,
    ...imageSources(item)
  ].filter(Boolean);

  for (const url of new Set(sources)) {
    try {
      return await readPNG(url);
    } catch (error) {
      console.info(
        "PNG source unavailable:",
        url,
        error.message
      );
    }
  }

  throw new Error(
    "복사 가능한 Apple PNG 원본이 없습니다."
  );
}


// DOWNLOAD

function downloadPNG(data, item) {
  const url = URL.createObjectURL(data.blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = getFilename(item);

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 5000);
}


// COPY OR DOWNLOAD

async function handleEmojiAction(item, currentURL, event) {
  const isDownload = event.shiftKey;

  if (
    !isDownload &&
    (
      !window.isSecureContext ||
      !navigator.clipboard?.write ||
      !window.ClipboardItem
    )
  ) {
    notify("HTTPS 또는 Live Server에서 열어주세요.");
    return false;
  }

  try {
    const pngPromise = getOriginalPNG(
      item,
      currentURL
    );

    if (isDownload) {
      const data = await pngPromise;

      downloadPNG(data, item);

      notify(
        `원본 다운로드 완료!`
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
        `복사되었습니다!`
      );
    }

    return true;

  } catch (error) {
    console.error(
      "PNG copy failed:",
      item.name,
      error
    );

    notify(
      "복사 실패 — 이미지 서버 또는 클립보드 접근 제한"
    );

    return false;
  }
}


// HOVER PICKER CONTROL

function cancelClose() {
  clearTimeout(closeTimer);
  closeTimer = null;
}

function closePicker() {
  cancelClose();

  activePicker?.remove();
  activePicker = null;

  if (activeCell) {
    activeCell.classList.remove("picker-open");
  }

  activeCell = null;
}

function scheduleClose() {
  cancelClose();

  // Short delay allows the pointer to cross
  // the space between the emoji and the picker.
  closeTimer = setTimeout(() => {
    closePicker();
  }, 180);
}


// PICKER POSITION

function positionPicker(cell, picker) {
  const rect = cell.getBoundingClientRect();

  const pickerWidth = picker.offsetWidth;
  const pickerHeight = picker.offsetHeight;

  const margin = 6;

  let left =
    rect.left + rect.width / 2 - pickerWidth / 2;

  let top = rect.bottom + margin;

  left = Math.max(
    margin,
    Math.min(
      left,
      window.innerWidth - pickerWidth - margin
    )
  );

  // Move above the emoji if space is limited.
  if (
    top + pickerHeight >
    window.innerHeight - margin
  ) {
    top = rect.top - pickerHeight - margin;
  }

  picker.style.left = `${left}px`;
  picker.style.top = `${Math.max(margin, top)}px`;
}


// OPEN PICKER ON HOVER

function openPicker(item, cell) {
  if (!item.variations.length) return;

  cancelClose();

  if (activeCell === cell && activePicker) {
    return;
  }

  closePicker();

  const picker = document.createElement("div");

  picker.className = "skin-picker";
  picker.setAttribute("role", "group");

  picker.setAttribute(
    "aria-label",
    `${item.name} 피부색 선택`
  );

  // Default emoji is also available in picker.
  const options = [
    item,
    ...item.variations
  ];

  for (const option of options) {
    const button = document.createElement("button");
    const img = document.createElement("img");

    button.className = "skin-option";
    button.type = "button";
    button.title = option.name;

    button.setAttribute(
      "aria-label",
      option.name
    );

    if (option.code === item.code) {
      button.classList.add("default-option");
    }

    button.disabled = true;

    loadPreview(img, option, () => {
      button.disabled = true;
      button.classList.add("unavailable");
    });

    img.addEventListener("load", () => {
      if (
        img.naturalWidth >= MIN_SIZE &&
        img.naturalHeight >= MIN_SIZE
      ) {
        button.disabled = false;
      }
    });

    button.appendChild(img);

    button.addEventListener("click", async event => {
      event.stopPropagation();

      const success = await handleEmojiAction(
        option,
        img.currentSrc || img.src,
        event
      );

      if (success) {
        closePicker();
      }
    });

    picker.appendChild(button);
  }

  picker.addEventListener("pointerenter", cancelClose);
  picker.addEventListener("pointerleave", scheduleClose);

  document.body.appendChild(picker);

  activePicker = picker;
  activeCell = cell;

  cell.classList.add("picker-open");

  positionPicker(cell, picker);
}


// MAIN EMOJI BUTTON

function createEmoji(item) {
  const cell = document.createElement("div");
  cell.className = "emoji-cell";

  const button = document.createElement("button");
  const img = document.createElement("img");

  button.className = "emoji";
  button.type = "button";

  button.title =
    `${item.name} — Click: Copy / Shift+Click: Download`;

  button.setAttribute(
    "aria-label",
    `${item.name} 이미지 복사`
  );

  button.disabled = true;

  loadPreview(img, item, () => {
    button.disabled = true;
    button.classList.add("unavailable");
  });

  img.addEventListener("load", () => {
    if (
      img.naturalWidth >= MIN_SIZE &&
      img.naturalHeight >= MIN_SIZE
    ) {
      button.disabled = false;
    }
  });

  button.appendChild(img);

  // Clicking the main emoji always copies.
  button.addEventListener("click", event => {
    if (button.disabled) return;

    handleEmojiAction(
      item,
      img.currentSrc || img.src,
      event
    );
  });

  cell.appendChild(button);

  // No arrow button is created.
  // Only emojis with variants open a picker.
  if (item.variations.length > 0) {
    cell.classList.add("has-variations");

    cell.addEventListener("pointerenter", event => {
      if (event.pointerType === "mouse" ||
          event.pointerType === "pen") {
        openPicker(item, cell);
      }
    });

    cell.addEventListener("pointerleave", scheduleClose);

    // Keyboard focus also opens the picker.
    cell.addEventListener("focusin", () => {
      openPicker(item, cell);
    });
  }

  return cell;
}


// RENDER

function render() {
  closePicker();

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
  try {
    const saved = await loadJSON(
      "emoji-manifest.json"
    );

    manifest = saved.files || {};
  } catch (error) {
    console.info("No local PNG manifest.");
  }

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
        "Apple PNG · Hover for skin tones · Click to copy";

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

  groups = fallbackGroups();

  status.textContent =
    "Apple PNG · Default emoji catalogue";

  render();
}


// EVENTS

search.addEventListener("input", render);

document.addEventListener("pointerdown", event => {
  if (!activePicker) return;

  if (
    activePicker.contains(event.target) ||
    activeCell?.contains(event.target)
  ) {
    return;
  }

  closePicker();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePicker();
  }
});

window.addEventListener("scroll", closePicker, {
  passive: true
});

window.addEventListener("resize", closePicker);

document.querySelectorAll(".back-to-top")
  .forEach(button => {
    button.addEventListener("click", () => {
      closePicker();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });


// START

init();
