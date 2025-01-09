# Project: Emotions Word Game
This project is about developing a simple game with win or lose feature using JavaScript, HTML and CSS. The game chosen is called "Emotions Word Game". You can play it here: [Link Text](https://zwleileen.github.io/emotions-word-game/).

# Description 
1. The theme of this game is "emotions" and uses words describing various emotions from The Feeling Wheel developed by Dr. Gloria Willcox. 
2. Words that describe emotions can vary from broad level e.g. anger, sadness, to very specific ones e.g. disrespected, isolated. 
3. As such, they could be used in words matching games that involve categories (broad level) and elements belonging to the categories (specific level).

# How to play 
1. The player will be shown random words and a category. 
2. The player has to select all the words that match the category.
3. Once a match is successful, the player will be shown another category and has to select all the words that belong to the category. 
4. The player will aim for as many correct matches as possible within the time given. 

# User story (includes wireframe)
- As a user, I want to see a landing page with the name of the game so that I know I'm in the right place.
- As a user, I want to see the instructions on how to play the game and the start button so that I know what to expect and how to proceed. 

![Landing page](https://i.imgur.com/XvTuQAg.png)

- As a user, I want to be able to click the start button and see the initial game state (the category and set of words I can select from). 
- As a user, I want to see the timer counting down so that I know the game has started. 
- As a user, I want to see visual feedback of the word I have selected so that I know my selection has been registered. 
- As a user, I want to see feedback on whether the match is correct or wrong, so that I know whether to change my selection. 

![Correct match](https://i.imgur.com/ej7ngOH.png)

- As a user, I want to see the existing game set replaced by a different category and set of words automatically when my match is correct, so that I know I have moved on to the next set.

![New set](https://i.imgur.com/kcQgBAm.png)

- As a user, I want to see that my selection is cleared when the match is wrong, so that I can reselect some of them in my next try. 
- As a user, I want to see how many tries I have left so that I know how many more wrong matches I can afford to make to not lose the game. 

![Wrong match](https://i.imgur.com/owAgqEB.png)

![Same set](https://i.imgur.com/Cck9fMv.png)

- As a user, I want to see when the time is up so that I know the game has ended.
- As a user, I want to see a summary of my results, including all the correct matches I have made, as well as when there is no match, so that I can reflect on the game I have played. 
- As a user, I want to see a restart button so that I know I can play again. 

![Results - with matches](https://i.imgur.com/rTV04K7.png)

# Final game and deviations from initial wireframe
I have included options for the user to choose how many words to match. The higher the number of words, the more challenging the game. 

![Final landing page](https://i.imgur.com/g5MCcUw.pngg)

For the results page, instead of showing correct matches belonging to the same category separately, I have decided to list them together, but separated by " | " between each match.  

![Final results page](https://i.imgur.com/4BtP1FQ.png)
  
# Pseudocode

These are the variables for the initial game state:
```
const categories = {
  Scared: [
    "Bewildered",
    "Rejected",
    "Helpless",
    "Submissive",
    "Insecure",
    "Anxious",
  ],
  Joyful: [
    "Excited",
    "Fascinating",
    "Energetic",
    "Cheerful",
    "Playful",
    "Hopeful",
  ],
  // and 4 more categories
}

let selectedWords = [];
let currentCategory = "";
let timeLeft = 60;
let timer;
let successfulMatches = {
  Scared: [],
  Joyful: [],
  Powerful: [],
  Peaceful: [],
  Sad: [],
  Mad: [],
};
let targetWordCount = 2 // or 4 or 6;
```
The general logic of the game is as follows:

When any of the buttons on the landing page is clicked, proceed to setupRound():
  - Replace the landing page with initial game state and start timer countdown
  - While timeLeft > 0, display a random category and a number of random words = targetWordCount belonging to that category
  - Retrieve random words from other categories so that total words displayed is 12
  - Each word appears as a HTML button, appended to the parent HTML "word-grid", with event listener linked to selectWord()

When a button is clicked, it activates the selectWord():
  - If button is already selected, deselect it
  - If not, select it and immediately proceed to checkSelection()

The checkSelection() provides feedback on whether a match is correct or wrong:
  - If match is correct, proceed to display the next game set with timer continuing to count down
  - If not, deselect buttons that do not fall into the correct category while keeping the correct ones selected
  - When timeLeft <= 0, proceed to showFinalResults()

# Key learnings

## Grid versus Flex
Initially, I had used grid for placing the buttons, but realised its restriction when I wanted to replace the buttons with final results. Using grid, the final results would be displayed at the left most column, though I want the results to be displayed in the middle. A possible workaround would be to populate the left most column with empty arrays so that the final results would be pushed to the middle column. 

I decided to change to flex for all because it is much more flexible than grid. I could justify-content and align the items however I wanted. It is also responsive to the expansion/reduction of screen size. 
```
.word-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    justify-content: space-between;
    width: 80%;
    margin: 1em;
}
```
To keep the number of buttons per row to 4 while accounting for the 2em gap, I used the following:
```
.word-button {
    flex-basis: calc(25% - 2em); 
}
```

## Displaying multiple results for the same category
To show all the correct matches in the final results page, I learnt that I had to initialise successfulMatches in the following way:
```
let successfulMatches = {
  Scared: [], 
  Joyful: [],
  Powerful: [],
  Peaceful: [],
  Sad: [],
  Mad: [],
};
```
I had to initialise each category as an array so that it can accept any number of successful matches. For example, if a first successful match is {Scared: [rejected, confused]}, and there is a second successful match {Scared: [helpless, submissive]}, then the final results would show {Scared: [rejected, confused, helpless, submissive]}.

If I did the following instead:
```
let successfulMatches = {}
```
The second successful match would replace the first and final results would show {Scared: helpless, submissive}.

## Adding options for user to choose number of words to match
I built in options for user to choose number of words to match by introducing the targetWordCount and otherWordCount = 12 - targetWordCount as shown in the setupRound() below:
```
function setupRound(resetTries = false) {
  document.getElementById(
    "instructions"
  ).textContent = `Find ${targetWordCount} words that match this emotion!`;

  if (resetTries) {
    timeLeft = 60;
    document.getElementById("timer").textContent = timeLeft;
  }
  
  const categoryNames = Object.keys(categories);
  currentCategory =
    categoryNames[Math.floor(Math.random() * categoryNames.length)];
  document.getElementById("category").textContent = currentCategory;

  let words = shuffle([...categories[currentCategory]]).slice(0,targetWordCount);

  let otherWordCount = 12 - targetWordCount;
  const otherWords = shuffle(
    Object.entries(categories) 
      .filter((category) => category[0] !== currentCategory) 
      .flatMap(([, words]) => words) 
  ).slice(0, otherWordCount); 

  words = shuffle([...words, ...otherWords]);
  ...
}
  ```

## Deselecting only words that are incorrect
When there is a wrong match, the user will have to try again and select the correct words. To improve user experience, the game will only deselect words that are incorrect and keep those that are correct, instead of deselecting all. 
```
setTimeout(() => {
      feedback.textContent = "";
      const selectedButtons = document.querySelectorAll(
        ".word-button.selected"
      );
      selectedButtons.forEach((button) => {
        if (!categories[currentCategory].includes(button.textContent)) {
          button.classList.remove("selected");
          selectedWords = selectedWords.filter(
            (word) => word != button.textContent
          );
        }
      });
    }, 1000);
```
When the user selects new word, it will activate the selectWord() and the word will be added to the selectedWords array:
```
function selectWord(button, word) {
  console.log({ button, word });
  if (timeLeft <= 0) return;

  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
    selectedWords = selectedWords.filter((w) => w !== word); 
  } else if (selectedWords.length < targetWordCount) {
    button.classList.add("selected");
    selectedWords.push(word);
    if (selectedWords.length === targetWordCount) {
      checkSelection();
    }
  }
}
```

# Planned future enhancements
To make the game more engaging, the following features may be added:
1. Allow user to quit the game halfway and return to main page
2. Attribute points to every successful match, more points to more number of words matched e.g. 2 points for 2 words matched versus 6 points for 6 words matched, then keep track of the points on a scoreboard

# Why this game
In the book titled "How Emotions are Made: The Secret Life of the Brain" by Dr. Lisa Feldman Barrett, she shared about the importance of emotional granularity in developing emotional intelligence. Being able to accurately label our emotions can help us to better understand, regulate and communicate them. Studies have shown that people with more vocabulary describing their emotions i.e. emotional granularity are better equipped to handle adversity. This game aims to make it easier for everyone to remember more granular emotions and hopefully use them in our day to day.

