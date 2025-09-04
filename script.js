document.querySelectorAll(".kana").forEach(el => {
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
  