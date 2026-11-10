// Apple PNG 이미지 아카이브
// 우선순위: Emojipedia(160px Apple PNG) → 로컬 저장 PNG → 64px CDN fallback
const EMOJIPEDIA_BASE = 'https://em-content.zobj.net/source/apple/453/';
const CDN = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/';
const CDN_ALT = 'https://unpkg.com/emoji-datasource-apple@16.0.0/';
const archive = document.querySelector('#archive');
const categories = document.querySelector('#categories');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const status = document.querySelector('#status');
const empty = document.querySelector('#empty');
const toast = document.querySelector('#toast');
const imageCache = new Map();
const OUTPUT_SIZE = 160;
let groups = [];
let toastTimer;

const groupNames = [
  ['Smileys & Emotion', 'Smileys'],
  ['People & Body', 'People'],
  ['Animals & Nature', 'Animals & Nature'],
  ['Food & Drink', 'Food & Drink'],
  ['Activities', 'Activity'],
  ['Travel & Places', 'Travel & Places'],
  ['Objects', 'Objects'],
  ['Symbols', 'Symbols'],
  ['Flags', 'Flags']
];

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

function fromUnified(code) {
  return code.split('-').map(part => String.fromCodePoint(parseInt(part, 16))).join('');
}

function toUnifiedFromSymbol(symbol) {
  return [...symbol].map(ch => ch.codePointAt(0).toString(16)).join('-').toLowerCase();
}

function slugifyName(name = '') {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/:/g, ' ')
    .replace(/\+/g, ' plus ')
    .replace(/#/g, ' number ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function makeFileStem(item) {
  return `${item.slug}_${item.unified}`;
}

function makeGroups(data) {
  const map = new Map(groupNames.map(([source, display]) => [source, {name: display, items: []}]));
  for (const emoji of data.sort((a, b) => (a.sort_order ?? 99999) - (b.sort_order ?? 99999))) {
    if (!emoji.image || emoji.has_img_apple === false) continue;
    const group = map.get(emoji.category);
    if (!group) continue;
    const name = emoji.name || emoji.short_name || emoji.unified;
    const shortName = emoji.short_name || (emoji.short_names && emoji.short_names[0]) || name;
    const base = {
      symbol: fromUnified(emoji.unified),
      name,
      image: emoji.image.toLowerCase(),
      unified: (emoji.unified || toUnifiedFromSymbol(fromUnified(emoji.unified))).toLowerCase(),
      slug: slugifyName(name || shortName)
    };
    group.items.push(base);
    for (const skin of Object.values(emoji.skin_variations || {})) {
      if (!skin.image || skin.has_img_apple === false) continue;
      const skinName = skin.name || `${name} ${skin.unified}`;
      group.items.push({
        symbol: fromUnified(skin.unified),
        name: skinName,
        image: skin.image.toLowerCase(),
        unified: skin.unified.toLowerCase(),
        slug: slugifyName(skinName)
      });
    }
  }
  return [...map.values()].filter(g => g.items.length);
}

function fallbackGroups() {
  return emojiData.map(g => ({
    name: g.name,
    items: g.items.map(([symbol, name]) => ({
      symbol,
      name,
      image: [...symbol].map(ch => ch.codePointAt(0).toString(16)).join('-') + '.png',
      unified: toUnifiedFromSymbol(symbol),
      slug: slugifyName(name)
    }))
  }));
}

function emojipediaURL(item) {
  return `${EMOJIPEDIA_BASE}${makeFileStem(item)}.png`;
}

function localAppleURL(item) {
  return `img/apple/${makeFileStem(item)}.png`;
}

function legacyLocalURL(item) {
  return `img/apple/${item.image}`;
}

function candidates(item) {
  const urls = [];
  // user-provided exact local images
  if (item.symbol === '😀') urls.push('img/grinning-face.png');
  if (item.symbol === '😃') urls.push('img/grinning-face-eyes.png');
  // Prefer Emojipedia 160px URL first for display quality, then local/legacy, then 64px fallback.
  urls.push(emojipediaURL(item));
  urls.push(localAppleURL(item));
  urls.push(legacyLocalURL(item));
  urls.push(CDN + 'img/apple/64/' + item.image);
  urls.push(CDN_ALT + 'img/apple/64/' + item.image);
  return [...new Set(urls)];
}

async function fetchPNG(url) {
  if (!imageCache.has(url)) {
    imageCache.set(url, fetch(url).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const blob = await r.blob();
      if (!blob.type.includes('png')) throw new Error('PNG 응답이 아닙니다');
      return blob;
    }).catch(e => {
      imageCache.delete(url);
      throw e;
    }));
  }
  return imageCache.get(url);
}

async function make160PNG(blob) {
  const bitmap = await createImageBitmap(blob);
  try {
    if (bitmap.width === OUTPUT_SIZE && bitmap.height === OUTPUT_SIZE) return blob;
    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const scale = Math.min(OUTPUT_SIZE / bitmap.width, OUTPUT_SIZE / bitmap.height);
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;
    ctx.drawImage(bitmap, (OUTPUT_SIZE - width) / 2, (OUTPUT_SIZE - height) / 2, width, height);
    return await new Promise((resolve, reject) => {
      canvas.toBlob(png => png ? resolve(png) : reject(new Error('PNG 변환 실패')), 'image/png');
    });
  } finally {
    bitmap.close();
  }
}

function createEmoji(item) {
  const button = document.createElement('button');
  button.className = 'emoji';
  button.type = 'button';
  button.title = `${item.name} — 클릭: PNG 복사 / Shift+클릭: PNG 다운로드`;
  button.setAttribute('aria-label', item.name);
  const img = document.createElement('img');
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  const urls = candidates(item);
  let current = 0;
  let failed = false;
  img.onerror = () => {
    current++;
    if (current < urls.length) img.src = urls[current];
    else {
      failed = true;
      button.classList.add('unavailable');
      button.disabled = true;
      button.title = `${item.name} — emoji를 불러오지 못했습니다`;
      img.removeAttribute('src');
    }
  };
  img.src = urls[0];
  button.append(img);
  button.addEventListener('click', async event => {
    if (failed || button.disabled) return;
    const isDownload = event.shiftKey;
    if (!isDownload && (!window.isSecureContext || !navigator.clipboard?.write || !window.ClipboardItem)) {
      return notify('Live Server(localhost) 또는 HTTPS에서 열어주세요.');
    }
    try {
      const outputPromise = fetchPNG(img.currentSrc || img.src).then(make160PNG);
      if (isDownload) {
        const png = await outputPromise;
        const href = URL.createObjectURL(png);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${makeFileStem(item)}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(href), 5000);
        notify('복사 완료!');
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({'image/png': outputPromise})
        ]);
        notify('복사 완료!');
      }
    } catch (e) {
      console.error('PNG 처리 오류:', item.name, urls[current], e);
      notify('실패 — 이미지 서버 또는 클립보드 권한을 확인해주세요.');
    }
  });
  return button;
}

function render() {
  const q = search.value.toLowerCase().trim();
  archive.replaceChildren();
  categories.replaceChildren();
  let total = 0;
  groups.forEach((group, i) => {
    const items = group.items.filter(item => !q || item.name.toLowerCase().includes(q) || item.symbol.includes(q) || group.name.toLowerCase().includes(q));
    if (!items.length) return;
    total += items.length;
    const section = document.createElement('section');
    section.id = 'category-' + i;
    const title = document.createElement('h2');
    title.textContent = group.name;
    const grid = document.createElement('div');
    grid.className = 'grid';
    for (const item of items) grid.appendChild(createEmoji(item));
    section.append(title, grid);
    archive.appendChild(section);
    const link = document.createElement('a');
    link.href = '#' + section.id;
    link.textContent = group.name;
    categories.append(link);
  });
  count.textContent = `${total.toLocaleString()} emoji`;
  empty.hidden = total !== 0;
}

async function fetchList(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function init() {
  let data;
  let origin = '';
  for (const [url, label] of [
    ['emoji-data.json', '로컬 데이터'],
    [CDN + 'emoji.json', '온라인 전체 데이터'],
    [CDN_ALT + 'emoji.json', '온라인 보조 데이터']
  ]) {
    try {
      data = await fetchList(url);
      if (!Array.isArray(data) || !data.length) throw Error('빈 데이터');
      origin = label;
      break;
    } catch (e) { console.info('데이터 소스 사용 불가:', url, e.message); }
  }
  if (data) {
    groups = makeGroups(data);
    status.textContent = `${origin}: ${groups.reduce((n, g) => n + g.items.length, 0).toLocaleString()}개 항목. 표시 이미지는 Emojipedia의 160px Apple PNG를 우선 사용합니다.`;
  } else {
    groups = fallbackGroups();
    status.textContent = '전체 데이터 연결 실패: 기본 목록 1,135개만 표시 중입니다. 표시 이미지는 Emojipedia 160px URL을 우선 시도합니다.';
  }
  render();
}
search.addEventListener('input', render);
init();

document.querySelectorAll('.back-to-top').forEach(button => {
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
