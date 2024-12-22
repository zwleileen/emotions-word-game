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
  document.getElementById("game-content").style.display = "block"; // Show game
  startNewGame();
});

const startNewGame = () => {
  setupRound();
  startTimer();
};
