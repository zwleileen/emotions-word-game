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
  grid.innerHTML = "";
  words.forEach((word) => {
    const button = document.createElement("button");
    button.className = "word-button";
    button.textContent = word;
    button.addEventListener("click", () => selectWord(button, word)); //cannot insert return here because the function would exit before appendChild
    grid.appendChild(button);
  });
  selectedWords = [];
  document.getElementById("feedback").textContent = "";
}

function selectWord(button, word) {
  if (timeLeft <= 0) return;
  if (button.classList.contains("selected")) {
    //if button is already selected, click would deselect it
    button.classList.remove("selected");
    selectedWords = selectedWords.filter((w) => w !== word);
  } else if (selectedWords.length < 3) {
    button.classList.add("selected");
    selectedWords.push(word);
    if (selectedWords.length === 3) {
      //if is inside the elseif because this check needs to happen immediately after adding a word
      checkSelection();
    }
  }
}

function checkSelection() {
  const correct = selectedWords.every((word) =>
    categories[currentCategory].includes(word)
  );
}

function startNewGame() {
  setupRound();
}
