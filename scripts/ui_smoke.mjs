const endpoint = "http://127.0.0.1:9222/json/list";
const pages = await fetch(endpoint).then((response) => response.json());
const page = pages.find((item) => item.type === "page");
if (!page) throw new Error("No debuggable page found");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let messageId = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "http://127.0.0.1:5173/?smoke=desktop" });
await wait(1800);

const desktop = await evaluate(`(() => ({
  viewport: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  title: document.querySelector('h1')?.innerText,
  heroImageLoaded: (document.querySelector('.historical-photo img')?.naturalWidth || 0) > 0,
  headerVisible: Boolean(document.querySelector('.site-header')),
  contentCharacters: [...document.querySelectorAll('.segment-entry__content')].reduce((total, element) => total + (element.textContent?.length || 0), 0),
  highlightedKeywords: document.querySelectorAll('.inline-keyword').length,
  discussionQuestions: document.querySelectorAll('.discussion-prompt').length
}))()`);

const themeBefore = await evaluate(`document.documentElement.dataset.theme`);
await evaluate(`document.querySelector('.theme-toggle')?.click()`);
await wait(300);
const darkMode = await evaluate(`({
  before: ${JSON.stringify("__THEME_BEFORE__")},
  after: document.documentElement.dataset.theme,
  persisted: localStorage.getItem('hcm202-theme'),
  background: getComputedStyle(document.body).backgroundColor,
  toggleLabel: document.querySelector('.theme-toggle')?.textContent?.trim()
})`);
darkMode.before = themeBefore;

await send("Emulation.setDeviceMetricsOverride", { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false });
await evaluate(`window.scrollTo({ top: document.getElementById('dong-thoi-gian')?.offsetTop || 0, behavior: 'instant' })`);
await wait(500);
const timeline = await evaluate(`(() => {
  const events = [...document.querySelectorAll('.timeline-event')];
  const gaps = events.map(event => {
    const year = event.querySelector('.timeline-event__year')?.getBoundingClientRect();
    const body = event.querySelector('.timeline-event__body')?.getBoundingClientRect();
    return year && body ? body.left - year.right : -1;
  });
  return {
    eventCount: events.length,
    minimumColumnGap: Math.min(...gaps),
    noOverlap: gaps.every(gap => gap >= 24),
    withinViewport: events.every(event => event.getBoundingClientRect().right <= window.innerWidth)
  };
})()`);

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.navigate", { url: "http://127.0.0.1:5173/?smoke=mobile" });
await wait(1800);
const mobile = await evaluate(`(() => {
  const photo = document.querySelector('.historical-photo')?.getBoundingClientRect();
  const launcher = document.querySelector('.chat-launcher')?.getBoundingClientRect();
  return {
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    menuVisible: getComputedStyle(document.querySelector('.mobile-menu-button')).display !== 'none',
    photoWithinViewport: Boolean(photo && photo.left >= 0 && photo.right <= window.innerWidth + 1),
    launcherWithinViewport: Boolean(launcher && launcher.left >= 0 && launcher.right <= window.innerWidth)
  };
})()`);

const chatBefore = await evaluate(`document.querySelector('.chat-launcher')?.getAttribute('aria-expanded')`);
await evaluate(`window.__smokeErrors = []; window.addEventListener('error', event => window.__smokeErrors.push(event.message)); window.addEventListener('unhandledrejection', event => window.__smokeErrors.push(String(event.reason)))`);
await evaluate(`document.querySelector('.chat-launcher')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))`);
await wait(700);
const chat = await evaluate(`(() => {
  const panel = document.querySelector('.chat-panel')?.getBoundingClientRect();
  return {
    before: ${JSON.stringify("__CHAT_BEFORE__")},
    expanded: document.querySelector('.chat-launcher')?.getAttribute('aria-expanded'),
    opened: Boolean(panel),
    withinViewport: Boolean(panel && panel.left >= 0 && panel.right <= window.innerWidth && panel.bottom <= window.innerHeight),
    rootLength: document.querySelector('#root')?.innerHTML.length,
    errors: window.__smokeErrors
  };
})()`);

chat.before = chatBefore;

await evaluate(`document.querySelector('.chat-launcher')?.click(); window.scrollTo({ top: document.getElementById('cua-nhan-dan')?.offsetTop || 0, behavior: 'instant' })`);
await wait(800);
const scrollNavigation = await evaluate(`({
  activeHeader: document.querySelector('.site-nav a.is-active')?.textContent?.trim(),
  activeSide: document.querySelector('.side-indicator a.is-active')?.getAttribute('href')
})`);

await evaluate(`window.scrollTo({ top: document.getElementById('van-dung')?.offsetTop || 0, behavior: 'instant' })`);
await wait(700);
await evaluate(`document.querySelectorAll('.application-choice')[0]?.click()`);
await wait(150);
const application = await evaluate(`(() => {
  const section = document.querySelector('.application-section')?.getBoundingClientRect();
  const sourceButton = document.querySelector('.application-principle .source-link');
  sourceButton?.click();
  return {
    activeHeader: document.querySelector('.site-nav a.is-active')?.textContent?.trim(),
    choiceCount: document.querySelectorAll('.application-choice').length,
    imageCount: document.querySelectorAll('.application-image img').length,
    imagesLoaded: [...document.querySelectorAll('.application-image img')].every(image => image.naturalWidth > 0),
    feedback: document.querySelector('.application-feedback strong')?.textContent?.trim(),
    withinViewport: Boolean(section && section.left >= 0 && section.right <= window.innerWidth),
    sourcePage: sourceButton?.textContent?.trim()
  };
})()`);
await wait(150);
application.sourceModalOpened = await evaluate(`Boolean(document.querySelector('.source-modal'))`);
await evaluate(`document.querySelector('.source-modal__header button')?.click()`);

await evaluate(`window.scrollTo({ top: document.getElementById('on-tap')?.offsetTop || 0, behavior: 'instant' })`);
await wait(700);
await evaluate(`document.querySelectorAll('.quiz-option')[0]?.click()`);
await wait(150);
const wrongFeedback = await evaluate(`document.querySelector('.quiz-feedback strong')?.textContent?.trim()`);
const wrongOptionState = await evaluate(`(() => {
  const option = document.querySelector('.quiz-option.is-wrong');
  return option ? {
    status: option.querySelector('.quiz-option__status')?.textContent?.trim(),
    background: getComputedStyle(option).backgroundColor,
    border: getComputedStyle(option).borderLeftColor
  } : null;
})()`);
await evaluate(`document.querySelectorAll('.quiz-option')[1]?.click()`);
await wait(150);
const correctFeedback = await evaluate(`document.querySelector('.quiz-feedback strong')?.textContent?.trim()`);
const correctOptionState = await evaluate(`(() => {
  const option = document.querySelector('.quiz-option.is-correct');
  return option ? {
    status: option.querySelector('.quiz-option__status')?.textContent?.trim(),
    background: getComputedStyle(option).backgroundColor,
    border: getComputedStyle(option).borderLeftColor,
    answerRepeated: document.querySelector('.quiz-feedback h4')?.textContent?.trim()
  } : null;
})()`);

socket.close();
console.log(JSON.stringify({ desktop, darkMode, timeline, mobile, chat, scrollNavigation, application, wrongFeedback, wrongOptionState, correctFeedback, correctOptionState }, null, 2));
