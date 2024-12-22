const categories = {
  scared: [
    "confused",
    "rejected",
    "helpless",
    "submissive",
    "insecure",
    "anxious",
  ],
  joyful: [
    "excited",
    "sensuous",
    "energetic",
    "cheerful",
    "creative",
    "hopeful",
  ],
};

let selectedWords = [];
let currentCategory = "";
let triesLeft = 3;
let timeLeft = 60;
let timer;
let succesfulMatches = {};

// Hide start button and initiate new game
document.getElementById("start-button").addEventListener("click", function () {
  this.style.display = "none";
  document.getElementById("game-content").style.display = "block";
  startNewGame();
});

function setupRound() {
  triesLeft = 3;
  document.getElementById("tries").textContent = triesLeft;

  const categoryNames = Object.keys(categories);
  currentCategory =
    categoryNames[Math.floor(Math.random() * categoryNames.length)];
  document.getElementById("category").textContent = currentCategory;

  let words = [...categories[currentCategory]];

  const grid = document.getElementById("word-grid");
  grid.innnerHTML = "";
  words.forEach((word) => {
    const button = document.createElement("button");
    button.className = "word-button";
    button.textContent = word;
    button.addEventListener("click", () => {
      return selectWord(button, word);
      grid.appendChild(button);
    });
  });
  selectedWords = [];
  document.getElementById("feedback").textContent = "";
}

function startNewGame() {
  setupRound();
}
