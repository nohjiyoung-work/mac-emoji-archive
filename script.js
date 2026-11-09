// Apple PNG 이미지 기반 Emoji Archive. 운영체제의 이모티콘 글꼴을 사용하지 않습니다.
// 외부 Apple PNG 제공 서버: https://fonts.grida.co (서비스의 가용성/CORS 설정에 의존)
// img/ 폴더에 파일이 있는 두 이미지는 원본 로컬 파일을 우선 사용합니다.
const source = 'https://fonts.grida.co/apple/emoji/160/';
const local = {
  '1f600': 'img/grinning-face.png',
  '1f603': 'img/grinning-face-eyes.png'
};
const archive = document.querySelector('#archive');
const categories = document.querySelector('#categories');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
const toast = document.querySelector('#toast');
let toastTimer;
const blobCache = new Map();

// 그리드용 통일된 코드포인트 파일명: 😀 → 1f600.png
function idOf(symbol) {
  return Array.from(symbol)
    .map(char => char.codePointAt(0))
    .filter(code => code !== 0xfe0f && code !== 0xfe0e)
    .map(code => code.toString(16).padStart(4, '0'))
    .join('-');
}
function srcOf(symbol) {
  const key = idOf(symbol);
  return local[key] || `${source}${key}.png`;
}
function notify(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}

async function loadPNG(url) {
  if (!blobCache.has(url)) {
    blobCache.set(url, (async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`이미지 주소 오류 (${response.status})`);
      const blob = await response.blob();
      if (blob.type === 'image/png') return blob;
      // 제공 서버가 PNG 대신 SVG/WebP를 응답하는 경우 투명 PNG로 변환합니다.
      const image = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      const png = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      image.close();
      if (!png) throw new Error('PNG 변환 실패');
      return png;
    })().catch(error => { blobCache.delete(url); throw error; }));
  }
  return blobCache.get(url);
}

function makeButton(symbol, name) {
  const button = document.createElement('button');
  button.className = 'emoji';
  button.type = 'button';
  button.title = name;
  button.setAttribute('aria-label', name);
  const img = document.createElement('img');
  img.src = srcOf(symbol);
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('error', () => {
    button.classList.add('unavailable');
    button.title = `${name} — 이미지 제공 서버에서 불러오지 못함`;
  });
  button.append(img);
  button.addEventListener('click', async () => {
    if (button.classList.contains('unavailable')) {
      notify('Apple PNG 이미지를 불러오지 못했습니다.');
      return;
    }
    try {
      if (!window.isSecureContext || !navigator.clipboard?.write || !window.ClipboardItem) {
        throw new Error('Live Server의 localhost 또는 HTTPS에서 열어주세요.');
      }
      // 사용자 클릭 직후 Clipboard API를 호출해 클립보드 권한을 유지합니다.
      const pngPromise = loadPNG(img.src);
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': pngPromise })
      ]);
      notify('복사되었습니다!');
    } catch (error) {
      console.error('PNG 복사 실패:', error);
      notify('복사 실패: 이미지 서버 접근 또는 클립보드 권한을 확인해주세요.');
    }
  });
  return button;
}
function render(query = '') {
  const q = query.trim().toLowerCase();
  archive.replaceChildren();
  categories.replaceChildren();
  let total = 0;
  emojiData.forEach((group, index) => {
    const items = group.items.filter(([symbol, name]) =>
      !q || symbol.includes(q) || name.toLowerCase().includes(q) || group.name.toLowerCase().includes(q)
    );
    if (!items.length) return;
    total += items.length;
    const section = document.createElement('section');
    section.id = `category-${index}`;
    const h2 = document.createElement('h2');
    h2.textContent = group.name;
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.append(...items.map(([symbol, name]) => makeButton(symbol, name)));
    section.append(h2, grid);
    archive.append(section);
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = group.name;
    categories.append(link);
  });
  count.textContent = `${total.toLocaleString()} emoji`;
  empty.hidden = total > 0;
}
search.addEventListener('input', () => render(search.value));
render();
