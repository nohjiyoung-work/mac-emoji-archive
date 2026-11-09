// Emoji Archive — PNG 클립보드 복사 (macOS에서 Apple Color Emoji 렌더링)
const archive = document.querySelector('#archive');
const categories = document.querySelector('#categories');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
const toast = document.querySelector('#toast');
let toastTimer;

function notify(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}

// 사용자의 Mac 화면에 보이는 컬러 이모티콘을 투명 PNG로 그립니다.
// Emoji 글꼴 렌더링은 운영체제와 브라우저에 따라 다를 수 있습니다.
function drawEmojiPNG(symbol) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas를 사용할 수 없습니다.');
  ctx.clearRect(0, 0, size, size);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let fontSize = 188;
  const family = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.font = `${fontSize}px ${family}`;
  const measured = ctx.measureText(symbol).width;
  if (measured > size - 24) fontSize *= (size - 24) / measured;
  ctx.font = `${Math.floor(fontSize)}px ${family}`;
  ctx.fillText(symbol, size / 2, size / 2 + 6);
  return canvas;
}

async function copyEmoji(symbol) {
  if (!window.isSecureContext || !navigator.clipboard?.write || !window.ClipboardItem) {
    throw new Error('Chrome 또는 Safari에서 localhost/HTTPS로 열어주세요.');
  }
  const canvas = drawEmojiPNG(symbol);
  // 복사 권한이 사라지지 않도록 클릭 직후 clipboard.write를 호출합니다.
  const png = new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG 변환 실패')), 'image/png');
  });
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
}

function makeButton(symbol, name) {
  const button = document.createElement('button');
  button.className = 'emoji';
  button.type = 'button';
  button.textContent = symbol;
  button.title = name || symbol;
  button.setAttribute('aria-label', name || symbol);
  button.addEventListener('click', async () => {
    try {
      await copyEmoji(symbol);
      notify('복사되었습니다!');
    } catch (error) {
      console.error('PNG 복사 실패:', error);
      notify(`복사 실패: ${error.message}`);
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
      !q || symbol.includes(q) || name.includes(q) || group.name.toLowerCase().includes(q)
    );
    if (!items.length) return;
    total += items.length;
    const section = document.createElement('section');
    section.id = `category-${index}`;
    const heading = document.createElement('h2');
    heading.textContent = group.name;
    const grid = document.createElement('div');
    grid.className = 'grid';
    const nodes = items.map(([symbol, name]) => makeButton(symbol, name));
    grid.append(...nodes);
    section.append(heading, grid);
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
