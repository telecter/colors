const lR = document.getElementById("color-red");
const lG = document.getElementById("color-green");
const lB = document.getElementById("color-blue");
const lH = document.getElementById("color-hex");

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

const hexToRgb = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

function generate() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  lR.innerText = r;
  lG.innerText = g;
  lB.innerText = b;

  lH.innerText = rgbToHex(r, g, b);
}

function setFromRGB() {
  let invalid = false;
  [lR.innerText, lG.innerText, lB.innerText].forEach((value) => {
    if (value.length < 1) {
      invalid = true;
      return;
    }
    let int = Number(value);
    if (Number.isNaN(int) || int > 255) invalid = true;
  });

  if (invalid) console.log("setFromRGB denying this value!");
  if (invalid) return;

  document.body.style.backgroundColor = `rgb(${lR.innerText}, ${lG.innerText}, ${lB.innerText})`;
  lH.innerText = rgbToHex(lR.innerText, lG.innerText, lB.innerText);
}

function setFromHex() {
  if (lH.innerText.length < 7) return;

  let int = Number(lH.innerText.replaceAll("#", "0x"));

  if (Number.isNaN(int) || int > 0xffffff) {
    console.log("setFromHex denying this value!");
    return;
  }

  document.body.style.backgroundColor = lH.innerText;

  let rgb = hexToRgb(lH.innerText);

  lR.innerText = rgb[0];
  lG.innerText = rgb[1];
  lB.innerText = rgb[2];
}

for (const elem of document.getElementsByClassName("box")) {
  elem.onclick = (e) => {
    e.stopPropagation();
  };
}

[lR, lG, lB].forEach((elem) => {
  elem.oninput = setFromRGB;
});

lH.oninput = setFromHex;

document.onkeydown = (e) => {
  if (e.key === " ") generate();
};
document.onclick = generate;

generate();
