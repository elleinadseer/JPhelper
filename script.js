
function switchTo(type) {
  document.querySelectorAll("div[data-daku]").forEach(div => {
    // Update the div’s text node only if that data-* exists
    if (div.dataset[type] && div.firstChild.nodeType === Node.TEXT_NODE) {
      div.firstChild.nodeValue = div.dataset[type];
    }

    // Update the <p> only if that data-* exists
    const p = div.querySelector("p[data-daku]");
    if (p && p.dataset[type]) {
      p.textContent = p.dataset[type];
    }
  });
}

document.getElementById("dakuSwitch").addEventListener("click", () => {
  switchTo("daku");
});

document.getElementById("hanSwitch").addEventListener("click", () => {
  switchTo("han");
});





/*
// store base values from <p> before any toggling happens
document.querySelectorAll(".kana p").forEach(p => {
  p.dataset.base = p.textContent.trim();
});

// handle dakuten
document.getElementById("dakutenShow").addEventListener("click", () => {
  document.querySelectorAll(".dakuten").forEach(el => el.style.display = "inline");
  document.querySelectorAll(".handaku").forEach(el => el.style.display = "none");

  document.querySelectorAll(".kana p").forEach(p => {
    if (p.dataset.daku) p.textContent = p.dataset.daku;
  });
});

// handle handakuten
document.getElementById("hanDakutenShow").addEventListener("click", () => {
  document.querySelectorAll(".dakuten").forEach(el => el.style.display = "none");
  document.querySelectorAll(".handaku").forEach(el => el.style.display = "inline");

document.querySelectorAll(".kana p").forEach(p => {
  if (p.dataset.handaku) {
    p.textContent = p.dataset.handaku;
  } else {
    p.textContent = p.dataset.base; // fallback to original base if no handaku
  }
});
});




/*

  const phrases = [
"hat TSU",
"hat shortTSU",
"hori crossTSU",
"vertTSU bend",
"caneTSU short \\ ",

"horiC",
"short c",
"hori ku c",
"hori crossC",
"hori x2 crossC",

"NO",
"\\ NO",
"\\ NOfish ",
"hori cross NO",
"hori crossLoopTSU flick ",

  "Zc",
  "Ztsu",
  "ZtsuLoop",
  "loopedZ bend",

  "hat 7leftCorner",
  "vert 7tsu",
  "vert 7tsuFish",
  "vert 7nn",

  "hori loopedBend",
  "hori loopedCorner flick",
  "hori reverseHook leftCorner",

  "hori fellHook",
  "kook hori fellHook",
  "cross hori fellHook",
  "cross flick fish",
  "// rightCorner flick",

  "hook",
  "hook tick",
  "hook bend",
  "vert x2 hook",

  "hook crossBend",
  "hook crossFish",
  "hook TcrossFish",
  "hori x2 vertFish",
  "hori x2 hook"
];


const phrases = [
  { phrase: "TSU", outline: "つ", answer: "TSU" },
  { phrase: "hat TSU", outline: "う", answer: "U" },
  { phrase: "hat vertTSU", outline: "ら", answer: "RA" },
  { phrase: "hori crossTSU", outline: "ち", answer: "CHI" },
  { phrase: "vertTSU )", outline: "ゆ", answer: "YU" },
  { phrase: "caneTSU short \\", outline: "や", answer: "YA" },

  { phrase: "horiC", outline: "て", answer: "TE" },
  { phrase: "short c", outline: "と", answer: "TO" },
  { phrase: "hori /ku c", outline: "を", answer: "WO" },
  { phrase: "hori crossC", outline: "さ", answer: "SA" },
  { phrase: "hori x2 \\C", outline: "き", answer: "KI" },

  { phrase: "NO", outline: "の", answer: "NO" },
  { phrase: "\\ NO", outline: "め", answer: "ME" },
  { phrase: "\\ NOfish", outline: "ぬ", answer: "NU" },
  { phrase: "hori cross NO", outline: "あ", answer: "A" },
  { phrase: "hori crossLoopTSU flick", outline: "お", answer: "O" },

  { phrase: "Zc", outline: "そ", answer: "SO" },
  { phrase: "Ztsu", outline: "ろ", answer: "RO" },
  { phrase: "ZtsuLoop", outline: "る", answer: "RU" },
  { phrase: "Zlooped )", outline: "み", answer: "MI" },

  { phrase: "hat 7rest", outline: "え", answer: "E" },
  { phrase: "vert 7tsu", outline: "わ", answer: "WA" },
  { phrase: "vert 7tsuFish", outline: "ね", answer: "NE" },
  { phrase: "vert 7nn", outline: "れ", answer: "RE" },

  { phrase: "cross loopedBend", outline: "す", answer: "SU" },
  { phrase: "cross loopedCorner flick", outline: "む", answer: "MU" },
  { phrase: "cross reverseHook leftCorner", outline: "せ", answer: "SE" },

  { phrase: "hori fellHook", outline: "こ", answer: "KO" },
  { phrase: "hook hori fellHook", outline: "に", answer: "NI" },
  { phrase: "cross hori fellHook", outline: "た", answer: "TA" },
  { phrase: "cross flick fish", outline: "な", answer: "NA" },
  { phrase: "cross cliff flick", outline: "か", answer: "KA" },

  { phrase: "hook", outline: "し", answer: "SHI" },
  { phrase: "hook flick", outline: "い", answer: "I" },
  { phrase: "hook bend", outline: "り", answer: "RI" },
  { phrase: "vert x2 hook", outline: "も", answer: "MO" },

  { phrase: "hook crossBend", outline: "け", answer: "KE" },
  { phrase: "hook crossFish", outline: "は", answer: "HA" },
  { phrase: "hook TcrossFish", outline: "ほ", answer: "HO" },
  { phrase: "hori x2 crossFish", outline: "ま", answer: "MA" },
  { phrase: "hori vertFish", outline: "よ", answer: "YO" }
];

const phraseBox = document.getElementById("phraseBox");
const answerBox = document.getElementById("answerBox");
const getAnswerBtn = document.getElementById("getAnswerBtn");
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");
const nextBtn = document.getElementById("nextBtn");
const hiraganaTest = document.getElementById("hiraganaTest");

let pool = [];
let currentItem = null;
let hiraganaMode = false; // default is hint mode

// Toggle game mode when clicking the Hiragana Test div
hiraganaTest.addEventListener("click", () => {
  hiraganaMode = !hiraganaMode;
  hiraganaTest.style.fontWeight = hiraganaMode ? "bold" : "normal"; // optional visual feedback
  if (currentItem) showPhrase(currentItem); // refresh display
});

// Shuffle helper
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function refillPool() { pool = shuffle([...phrases]); }
function nextPhrase() { if (pool.length === 0) refillPool(); return pool.pop(); }

// Draw faint character shadow
function drawOutline(char) {
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "black";
  ctx.font = "200px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

// User drawing layer
let drawing = false;
canvas.addEventListener("pointerdown", e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("pointermove", e => {
  if (!drawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});
canvas.addEventListener("pointerup", () => { drawing = false; ctx.closePath(); });
canvas.addEventListener("pointerleave", () => { drawing = false; ctx.closePath(); });

// Clear button: redraw shadow if it’s visible
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (currentItem && answerBox.style.display === "block") {
    drawOutline(currentItem.outline); // only redraw shadow if answer shown
  }
});


// Modified showPhrase depending on mode
function showPhrase(item) {
  currentItem = item;
  answerBox.style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hiraganaMode) {
    phraseBox.textContent = item.answer; // show romaji straight away
  } else {
    phraseBox.textContent = item.phrase; // show hint
  }
}

// Next phrase
nextBtn.addEventListener("click", () => {
  showPhrase(nextPhrase());
});

// Modified Get Answer button
getAnswerBtn.addEventListener("click", () => {
  if (currentItem) {
    if (hiraganaMode) {
      // In hiragana mode: keep showing answer text, just draw outline
      drawOutline(currentItem.outline);
    } else {
      // In normal mode: switch to answer + draw outline
      phraseBox.textContent = currentItem.answer;
      drawOutline(currentItem.outline);
    }
  }
});

// Init
refillPool();
showPhrase(nextPhrase());

*/