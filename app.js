const categories = {
  Scared: [
    "confused",
    "rejected",
    "helpless",
    "submissive",
    "insecure",
    "anxious",
  ],
  Joyful: [
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
let successfulMatches = {};

// Hide start button and initiate new game
document.getElementById("start-button").addEventListener("click", function () {
  this.style.display = "none";
  document.getElementById("game-content").style.display = "block";
  startNewGame();
});

// Randomly shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupRound(resetTries = false) {
  if (resetTries) {
    triesLeft = 3;
    document.getElementById("tries").textContent = triesLeft;
  }

  const categoryNames = Object.keys(categories);
  currentCategory =
    categoryNames[Math.floor(Math.random() * categoryNames.length)];
  document.getElementById("category").textContent = currentCategory;

  // Get randomly 3 words belonging to the category
  let words = shuffle([...categories[currentCategory]]).slice(0, 3);

  // Get up to 9 random words from other categories
  const otherWords = shuffle(
    Object.entries(categories) //creates entries of [key,value] pair, in this case ['scared',['confused','rejected']]
      .filter((category) => category[0] !== currentCategory) //filter goes through every category and filters out category[0] that is currentCategory
      .flatMap(([, words]) => words) //ignores the key in the [key,value] and just takes the value
  ).slice(0, 9); //takes 9 words or less after shuffling

  words = shuffle([...words, ...otherWords]);

  const grid = document.getElementById("word-grid");
  grid.innerHTML = "";
  words.forEach((word) => {
    //add a CSS class word-button to style it
    const button = document.createElement("button");
    button.className = "word-button";
    button.textContent = word;
    button.addEventListener("click", () => selectWord(button, word)); //cannot insert return here because the function would exit before appendChild
    //add the button to the grid
    grid.appendChild(button);
  });
  selectedWords = [];
  document.getElementById("feedback").textContent = "";
}

function selectWord(button, word) {
  if (timeLeft <= 0) return;
  // if button is already selected, deselect it
  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
    selectedWords = selectedWords.filter((w) => w !== word);
  }
  // if button is not selected and selectedWords < 3, then select it
  else if (selectedWords.length < 3) {
    button.classList.add("selected");
    selectedWords.push(word);
    // then immediately check if there are already 3 selected words
    if (selectedWords.length === 3) {
      checkSelection();
    }
  }
}

function checkSelection() {
  const correct = selectedWords.every((word) =>
    categories[currentCategory].includes(word)
  );

  const feedback = document.getElementById("feedback");
  if (correct) {
    successfulMatches[currentCategory] = selectedWords; // don't use .push() because successfulMatches is an object, not an array
    feedback.textContent = "Correct!";

    // sets 1.5s delay after correct match to reset the round
    setTimeout(() => {
      setupRound(false);
    }, 1500);
  }
  // handle incorrect match
  else {
    triesLeft--;
    document.getElementById("tries").textContent = triesLeft;
    feedback.textContent = "Wrong!";
    //immediately check if triesLeft is 0 then start new round
    if (triesLeft <= 0) {
      setupRound(true);
      showFinalResults();
    }
    //sets 1s delay after incorrect match to deselect all buttons
    else {
      setTimeout(() => {
        feedback.textContent = "";
        const buttons = document.querySelectorAll(".word-button");
        buttons.forEach((button) => button.classList.remove("selected"));
        selectedWords = [];
      }, 1000);
    }
  }
}

function showFinalResults() {
  const grid = document.getElementById("word-grid");
  grid.innerHTML = '<div class = "summary">';

  if (Object.keys(successfulMatches).length === 0) {
    grid.innerHTML += "<h3>No successful match</h3>";
  } else {
    grid.innerHTML += "<h3>Successful Matches:</h3>";
    Object.entries(successfulMatches).forEach(([category, words]) => {
      grid.innerHTML += `
        <div class="summary-category">
            <strong>${category}:</strong> ${words.join(", ")}  
        </div>`; //join() converts arry to string with comma+space between words
    });
  }
  // Add play again button
  grid.innerHTML += `
    <button onclick="showStartButton()" style="padding: 10px 20px; margin-top: 20px;">
        Play Again
    </button>
</div>`;
}

// Reset game to start screen
function showStartButton() {
  document.getElementById("game-content").style.display = "none";
  document.getElementById("start-button").style.display = "block";
  successfulMatches = {}; // Reset score
}

function startNewGame() {
  setupRound(true);
}
