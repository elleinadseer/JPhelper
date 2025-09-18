
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
