// Apple PNG 이미지 — 데이터 목록은 emoji-datasource-apple 16.0.0 기반.
// Python 다운로드 도구를 한 번 실행하면 Windows/Mac 공통 PNG를 로컬에서 사용합니다.
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

function makeGroups(data) {
  const map = new Map(groupNames.map(([source, display]) => [source, {name:display, items:[]} ]));
  for (const emoji of data.sort((a,b) => (a.sort_order ?? 99999) - (b.sort_order ?? 99999))) {
    if (!emoji.image || emoji.has_img_apple === false) continue;
    const group = map.get(emoji.category);
    if (!group) continue;
    const name = emoji.name || emoji.short_name || emoji.unified;
    const base = {
      symbol: fromUnified(emoji.unified), name,
      image: emoji.image.toLowerCase()
    };
    group.items.push(base);
    // 피부색 변형도 누락 없이 동일한 위치에 이어 붙입니다.
    for (const skin of Object.values(emoji.skin_variations || {})) {
      if (!skin.image || skin.has_img_apple === false) continue;
      group.items.push({
        symbol: fromUnified(skin.unified),
        name: `${name} (${skin.unified})`,
        image: skin.image.toLowerCase()
      });
    }
  }
  return [...map.values()].filter(g => g.items.length);
}

function fallbackGroups() {
  // 외부 데이터 접근이 차단됐을 때만 사용: 이전 1,135개 기본 목록
  return emojiData.map(g => ({name:g.name, items:g.items.map(([symbol,name]) => ({
    symbol, name,
    image: [...symbol].map(ch => ch.codePointAt(0).toString(16)).join('-') + '.png'
  }))}));
}

// PNG는 로컬 파일을 먼저 시도하고, 없을 때만 CDN으로 요청합니다.
function candidates(item) {
  if (item.symbol === '😀') return ['img/grinning-face.png', `img/apple/${item.image}`, CDN + 'img/apple/64/' + item.image, CDN_ALT + 'img/apple/64/' + item.image];
  if (item.symbol === '😃') return ['img/grinning-face-eyes.png', `img/apple/${item.image}`, CDN + 'img/apple/64/' + item.image, CDN_ALT + 'img/apple/64/' + item.image];
  return [`img/apple/${item.image}`, CDN + 'img/apple/64/' + item.image, CDN_ALT + 'img/apple/64/' + item.image];
}

async function fetchPNG(url) {
  if (!imageCache.has(url)) {
    imageCache.set(url, fetch(url).then(async r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const blob = await r.blob();
      if (!blob.type.includes('png')) throw new Error('PNG 응답이 아닙니다');
      return blob;
    }).catch(e => {imageCache.delete(url); throw e;}));
  }
  return imageCache.get(url);
}

function createEmoji(item) {
  const button = document.createElement('button');
  button.className = 'emoji';
  button.type = 'button';
  button.title = item.name;
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
      button.title = `${item.name} — Apple PNG를 불러오지 못했습니다`;
      img.removeAttribute('src');
    }
  };
  img.src = urls[0];
  button.append(img);
  button.addEventListener('click', async () => {
    if (failed || button.disabled) return;
    if (!window.isSecureContext || !navigator.clipboard?.write || !window.ClipboardItem) {
      return notify('Live Server(localhost) 또는 HTTPS에서 열어주세요.');
    }
    try {
      // 복사 권한을 유지하기 위해 클릭 이벤트 내에서 즉시 Clipboard API를 호출
      const pngPromise = fetchPNG(img.currentSrc || img.src);
      await navigator.clipboard.write([new ClipboardItem({'image/png':pngPromise})]);
      notify('복사되었습니다!');
    } catch (e) {
      console.error('PNG 복사 오류:', item.name, urls[current], e);
      notify('복사 실패 — 서버 접근 또는 클립보드 권한 확인');
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
    section.append(title,grid);
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
    } catch (e) { console.info('데이터 소스 사용 불가:',url,e.message); }
  }
  if (data) {
    groups = makeGroups(data);
    status.textContent = `${origin}: ${groups.reduce((n,g) => n+g.items.length,0).toLocaleString()}개 항목. CDN이 차단되면 download_emojis.py로 PNG를 일괄 저장하세요.`;
  } else {
    groups = fallbackGroups();
    status.textContent = '전체 데이터 연결 실패: 기본 목록 1,135개만 표시 중입니다. download_emojis.py를 실행하면 전체 목록으로 전환됩니다.';
  }
  render();
}
search.addEventListener('input', render);
init();
