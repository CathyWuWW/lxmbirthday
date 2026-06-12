const scene = document.querySelector(".card-scene");
const sparkLayer = document.querySelector(".spark-layer");

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");

  if (actionButton) {
    const action = actionButton.dataset.action;

    if (action === "mood") {
      scene.classList.toggle("dream");
      createStickerBurst(window.innerWidth - 54, 54, 18);
      return;
    }

    createStickerBurst(event.clientX, event.clientY, 24);
    return;
  }

  if (event.target.closest(".letter-paper") || event.target.closest(".card-scene")) {
    createStickerBurst(event.clientX, event.clientY, 10);
  }
});

function createStickerBurst(originX, originY, count) {
  const symbols = ["♡", "✦", "✧", "❤"];
  const colors = ["#d7668e", "#edc461", "#9278ce", "#6fab8a", "#e99b75"];

  for (let index = 0; index < count; index += 1) {
    const sticker = document.createElement("span");
    const color = colors[index % colors.length];
    const size = randomBetween(14, 26);

    sticker.className = "spark";
    sticker.style.setProperty("--x", `${originX + randomBetween(-16, 16)}px`);
    sticker.style.setProperty("--y", `${originY + randomBetween(-10, 10)}px`);
    sticker.style.setProperty("--dx", `${randomBetween(-120, 120)}px`);
    sticker.style.setProperty("--dy", `${randomBetween(84, 190)}px`);
    sticker.style.setProperty("--rotate", `${randomBetween(-90, 90)}deg`);
    sticker.style.setProperty("--size", `${size}px`);
    sticker.style.setProperty("--spark-color", color);

    if (index % 5 === 0) {
      sticker.classList.add("mini-bow-spark");
    } else {
      sticker.textContent = symbols[index % symbols.length];
    }

    sparkLayer.appendChild(sticker);
    sticker.addEventListener("animationend", () => sticker.remove(), { once: true });
  }
}

function randomBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
