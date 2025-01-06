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
let successfulMatches = {
  Scared: [], //initialised as an array so that it can accept as many words anytime with .push, instead of being replaced, but successfulMatches itself is still an object
  Joyful: [],
};
let targetWordCount = 2;

// Hide start button and initiate new game
document
  .getElementById("start-button-2")
  .addEventListener("click", function () {
    targetWordCount = 2;
    document.getElementById("start-content").style.display = "none";
    document.getElementById("game-content").style.display = "flex";
    startNewGame();
  });

document
  .getElementById("start-button-4")
  .addEventListener("click", function () {
    targetWordCount = 4;
    document.getElementById("start-content").style.display = "none";
    document.getElementById("game-content").style.display = "flex";
    startNewGame();
  });

document
  .getElementById("start-button-6")
  .addEventListener("click", function () {
    targetWordCount = 6;
    document.getElementById("start-content").style.display = "none";
    document.getElementById("game-content").style.display = "flex";
    startNewGame();
  });

// Randomly shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //e.g. if i = 2, returns a number between 0 and 2 because math.floor turns 2.9 into 2
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupRound(resetTries = false) {
  document.querySelector(
    ".instructions"
  ).textContent = `Find ${targetWordCount} words that match this emotion!`;

  if (resetTries) {
    triesLeft = 3;
    document.getElementById("tries").textContent = triesLeft;
    timeLeft = 60;
    document.getElementById("timer").textContent = timeLeft;
  }
  // Get random categoryName
  const categoryNames = Object.keys(categories);
  currentCategory =
    categoryNames[Math.floor(Math.random() * categoryNames.length)];
  document.getElementById("category").textContent = currentCategory;

  // Get random words belonging to the categoryName
  let words = shuffle([...categories[currentCategory]]).slice(
    0,
    targetWordCount
  );

  // Get up to 9 random words from other categories
  const otherWords = shuffle(
    Object.entries(categories) //creates entries of [key,value] pair, in this case ['scared',['confused','rejected']]
      .filter((category) => category[0] !== currentCategory) //filter goes through every category (entry) and filters out category[0] (or the key) that is currentCategory
      .flatMap(([, words]) => words) //ignores the key in the [key,value] and just takes the value
  ).slice(0, 9); //takes 9 words or less after shuffling

  words = shuffle([...words, ...otherWords]);

  const grid = document.getElementById("word-grid");
  grid.innerHTML = ""; //clears the grid before adding word-buttons
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

function startTimer() {
  clearInterval(timer); // Clear any existing timer
  timeLeft = 60;
  document.getElementById("timer").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showFinalResults();
    }
  }, 1000);
}

function selectWord(button, word) {
  if (timeLeft <= 0) return;
  // if button is already selected, deselect it
  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
    selectedWords = selectedWords.filter((w) => w !== word);
  }
  // if button is not selected and selectedWords < 3, then select it
  else if (selectedWords.length < targetWordCount) {
    button.classList.add("selected");
    selectedWords.push(word);
    // then immediately check if there are already 3 selected words
    if (selectedWords.length === targetWordCount) {
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
    successfulMatches[currentCategory].push([...selectedWords]); //retrieves the initial empty array of the currentCategory and pushes words into it
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

//replaces word-grid with a summary grid
function showFinalResults() {
  clearInterval(timer);
  const grid = document.getElementById("word-grid");
  let summaryHTML = '<div class = "summary">';
  summaryHTML += '<div class="results-container">';

  const categoriesWithMatches = Object.entries(successfulMatches).filter(
    ([, matches]) => matches.length > 0
  );

  if (categoriesWithMatches === 0) {
    summaryHTML += "<h3>No successful match</h3>";
  } else {
    summaryHTML += "<h3>Successful Matches</h3>";
    categoriesWithMatches.forEach(([category, matches]) => {
      summaryHTML += `
        <div class="summary-category">
            <strong>${category}:</strong> ${matches
        .map((match) => match.join(", "))
        .join(" | ")}  
        </div>`; //creates a new array transforming each match into a string joined by "," and matches into a string joined by "|"
    });
  }
  summaryHTML += "</div>";

  // Add play again button
  summaryHTML += `
    <button onclick="showStartButton()" class="play-again-button">
        Play Again
    </button>
</div>`;

  console.log("Successful Matches", successfulMatches);
  grid.innerHTML = summaryHTML;
}

// Reset game to start screen
function showStartButton() {
  document.getElementById("game-content").style.display = "none";
  document.getElementById("start-content").style.display = "flex";
  clearInterval(timer); //Reset timer
  successfulMatches = Object.keys(categories).reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {}); //Reset successfulMatches to initial state using reduce, which takes the callback function(acc) that accumulates/adds new category as an [] array
}

function startNewGame() {
  setupRound(true);
  startTimer();
}
