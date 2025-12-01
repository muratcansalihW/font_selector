// ===========================================================
// Font Fountain Projesi - script.js (Sadeleştirilmiş Nihai Sürüm)
// ===========================================================

// ----------------------------
// SABİTLER VE BAŞLANGIÇ VERİLERİ
// ----------------------------
const FONT_COLLECTION = [
  "AbrilFatface",
  "Alegreya",
  "AmaticSC",
  "ArchitectsDaughter",
  "Arvo",
  "BebasNeue",
  "Bitter",
  "Chivo",
  "Comfortaa",
  "CormorantGaramond",
  "CourierPrime",
  "CrimsonText",
  "DancingScript",
  "Exo2",
  "FiraCode",
  "Hind",
  "IBMPlexMono",
  "Inconsolata",
  "IndieFlower",
  "Inter",
  "JetBrainsMono",
  "Karla",
  "Lato",
  "LibreBaskerville",
  "Lobster",
  "Lora",
  "MajorMonoDisplay",
  "Merriweather",
  "Montserrat",
  "NotoSans",
  "Nunito",
  "OpenSans",
  "Oswald",
  "Pacifico",
  "PermanentMarker",
  "PlayfairDisplay",
  "Poppins",
  "PressStart2P",
  "PTSerif",
  "Quicksand",
  "Rajdhani",
  "Raleway",
  "Recursive",
  "RedHatDisplay",
  "Roboto",
  "Rokkitt",
  "Rubik",
  "Sacramento",
  "ShadowsIntoLight",
  "Slabo",
  "SourceSansPro",
  "SpaceMono",
  "SyneMono",
  "Tangerine",
  "Teko",
  "Ubuntu",
  "Vollkorn",
  "VT323",
  "WorkSans",
  "Zeyada",
];

const DEFAULT_PLACEHOLDER = "Quick brown fox jumps over the lazy dog.";
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontList = document.getElementById("font-list");
const historyList = document.getElementById("history-list");
const preview = document.getElementById("preview-text");
const fontNameEl = document.getElementById("current-font-name");

let currentFont = FONT_COLLECTION[0];
let fontHistory = [];

// ----------------------------
// FONT RENDER VE GÜNCELLEME
// ----------------------------
function renderList(target, fonts, isHistory = false) {
  target.innerHTML = "";
  fonts.forEach((font) => {
    const li = document.createElement("li");
    li.textContent = font;
    li.style.fontFamily = font;
    li.dataset.font = font;
    li.onclick = () => (isHistory ? selectFromHistory(font) : selectFont(font));
    target.appendChild(li);
  });
  updateActiveFont();
}

function selectFont(font, fromHistory = false) {
  if (font === currentFont) return;
  preview.style.fontFamily = font;
  fontNameEl.textContent = font;
  if (!fromHistory) addToHistory(font);
  currentFont = font;
  updateActiveFont();
}

function updateActiveFont() {
  document.querySelectorAll("#font-list li, #history-list li").forEach((li) => {
    li.classList.toggle("active", li.dataset.font === currentFont);
  });
}

// ----------------------------
// GEÇMİŞ YÖNETİMİ
// ----------------------------
function addToHistory(font) {
  if (fontHistory.at(-1) !== font) fontHistory.push(font);
  renderList(historyList, [...fontHistory].reverse(), true);
}

function selectFromHistory(font) {
  selectFont(font, true);
}

// ----------------------------
// GLYPH ROUNDING (HARF KAYDIRMA)
// ----------------------------
function handleGlyphRounding(e) {
  e.preventDefault();
  const sel = window.getSelection();
  if (!sel.rangeCount || !sel.isCollapsed) return;

  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== 3 || !node.textContent) return;

  const i = range.endOffset;
  if (i === 0) return;

  const text = node.textContent;
  const char = text[i - 1];
  const idx = ALPHABET.indexOf(char);
  if (idx === -1) return;

  const newChar =
    ALPHABET[
      (idx + (e.deltaY < 0 ? 1 : -1) + ALPHABET.length) % ALPHABET.length
    ];
  node.textContent = text.slice(0, i - 1) + newChar + text.slice(i);
  range.setStart(node, i);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

// ----------------------------
// BAŞLATMA
// ----------------------------
function init() {
  renderList(fontList, FONT_COLLECTION);
  preview.textContent = DEFAULT_PLACEHOLDER;
  selectFont(currentFont);
  preview.addEventListener("wheel", handleGlyphRounding);
}

document.addEventListener("DOMContentLoaded", init);
