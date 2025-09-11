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






/* document.querySelectorAll(".kana").forEach(el => {
    const dakuten = el.querySelector(".dakuten[data-han]");
    const p = el.querySelector("p[data-han]");
  
    if(dakuten) {
      dakuten.textContent = dakuten.dataset.han; // replace text
      dakuten.style.color = "lightskyblue";              // change color
    }
  
    if(p) {
      p.textContent = p.dataset.han;             // replace text
    }
  });
  */


  const phrases = [
"hat TSU",
"hat shortTSU",
"hori crossTSU",
"vertTSU bend",
"caneTSU short \\ ",

"horiC",
"short c",
"hori ku c",
"hori \\c",
"hori x2 \\c",

"NO",
"\\ NO",
"\\ NOfish ",
"hori cross NO",
"hori crossLoopTSU flick ",
];

const phraseBox = document.getElementById("phraseBox");
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  phraseBox.textContent = phrases[randomIndex];
});
