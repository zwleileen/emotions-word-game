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
5. The player only has 3 tries for wrong matches. 

# User story (includes wireframe)
- As a user, I want to see a landing page with the name of the game so that I know I'm in the right place.
- As a user, I want to see the instructions on how to play the game and the start button so that I know what to expect and how to proceed. 

![Landing page](https://i.imgur.com/XvTuQAg.png)

- As a user, I want to be able to click the start button and see the initial game state (the category and set of words I can select from). 
- As a user, I want to see the timer counting down so that I know the game has started. 

![Game state](https://i.imgur.com/iWIWnXz.png)

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

![Results - with no match](https://i.imgur.com/rC0b62N.png)

# Final game and deviations from initial wireframe
I have included options for the user to choose how many words to match. The higher the number of words, the more challenging the game. 

![Final landing page](https://i.imgur.com/eAUGyNN.png)

For the results page, instead of showing correct matches belonging to the same category separately, I have decided to list them together, but separated by " | " between each match.  

![Final results page](https://i.imgur.com/jRGoKOS.png)
  
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
let triesLeft = 3;
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
  - Replace the landing page with initial game state and
    SET triesLeft = 3
    SET timeLeft = 60 seconds
    
  - While timeLeft > 0 AND triesLeft > 0, display a random category and a number of random words = targetWordCount belonging to that category
  - Retrieve random words from other categories so that total words displayed is 12
  - Each word appears as a HTML button, appended to the parent HTML "word-grid", with event listener linked to selectWord()
  - Start timer countdown

When a button is clicked, it activates the selectWord():
  - If button is already selected, deselect it
  - If not, select it and immediately proceed to checkSelection()

The checkSelection() provides feedback on whether a match is correct or wrong:
  - If match is correct, proceed to display the next game set with triesLeft and timeLeft continuing
  - If not, reduce triesLeft by 1 and immediately check if triesLeft is still > 0, then proceed to deselect all buttons
  - If triesLeft <= 0 or timeLeft <= 0, proceed to showFinalResults()

# Key learnings

## Grid versus Flex
Initially, I had used grid for placing the buttons, but realised its restriction when I wanted to replace the buttons with final results. Using grid, the final results would be displayed at 

## Displaying multiple results for the same category
```
let successfulMatches = {
  Scared: [], // Initialised as an array so that it can accept as many words anytime with .push, instead of being replaced, but successfulMatches itself is still an object
  Joyful: [],
  Powerful: [],
  Peaceful: [],
  Sad: [],
  Mad: [],
};
```

## Adding options for user to choose number of words to match

## When the check has to be immediate

# Why this game
In the book titled "How Emotions are Made: The Secret Life of the Brain" by Dr. Lisa Feldman Barrett, she shared about the importance of emotional granularity in developing emotional intelligence. Being able to accurately label our emotions can help us to better understand, regulate and communicate them. Studies have shown that people with more vocabulary describing their emotions i.e. emotional granularity are better equipped to handle adversity. This game aims to make it easier for everyone to remember more granular emotions and hopefully use them in our day to day.



