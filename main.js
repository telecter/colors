const lR = document.getElementById("color-red");
const lG = document.getElementById("color-green");
const lB = document.getElementById("color-blue");
const lH = document.getElementById("color-hex");

let playBtnClicks = 0;
let playListener;
const playBtn = document.getElementById("play-btn");



function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function hexToRgb(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
}

function generate() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  lR.textContent = r;
  lG.textContent = g;
  lB.textContent = b;

  lH.textContent = rgbToHex(r, g, b);
}

for (const elem of document.getElementsByClassName("box")) {
  elem.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

[lR, lG, lB].forEach((elem) => {
  elem.addEventListener("input", () => {
    if (elem.textContent === "") return;

    const num = parseInt(elem.textContent, 10);

    if (num > 255) {
      elem.textContent = "255";
    }

    document.body.style.backgroundColor = `rgb(${lR.textContent}, ${lG.textContent}, ${lB.textContent})`;
    lH.textContent = rgbToHex(lR.textContent, lG.textContent, lB.textContent);
  });
  elem.addEventListener("beforeinput", (e) => {
    if (
      (e.inputType === "insertText" && !/\d/.test(e.data)) ||
      e.inputType === "insertLineBreak"
    ) {
      e.preventDefault();
    }
  });
  elem.addEventListener("click", () => {
    window.getSelection().selectAllChildren(elem);
  });
});

lH.addEventListener("click", () => {
  window.getSelection().selectAllChildren(lH);
});

lH.addEventListener("input", () => {
  if (lH.textContent[0] != "#") {
    lH.textContent = "#" + lH.textContent;
  }

  if (lH.textContent.length < 7) return;

  let int = Number(lH.textContent.replaceAll("#", "0x"));

  if (Number.isNaN(int) || int > 0xffffff || int < 0) {
    lH.textContent = "#ffffff";
  }

  document.body.style.backgroundColor = lH.textContent;

  let rgb = hexToRgb(lH.textContent);

  lR.textContent = rgb[0];
  lG.textContent = rgb[1];
  lB.textContent = rgb[2];
});

lH.addEventListener("beforeinput", (e) => {
  if (
    (e.inputType === "insertText" &&
      Number.isNaN(parseInt(e.data, 16)) &&
      e.data != "#") ||
    e.inputType === "insertLineBreak"
  )
    e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if (e.key === " ") generate();
});
document.addEventListener("click", generate);

playBtn.addEventListener("click", () => {
  if (playBtnClicks < 1) {
    playListener = setInterval(() => {
      generate();
    }, 2000);
    playBtn.textContent = "⏸";
    playBtnClicks++;
  } else {
    clearInterval(playListener);
    playBtn.textContent = "⏵";
    playBtnClicks = 0;
  }
})


generate();
