## [6 Jan should show the game almost done e.g. display 4 cards and could match 3 cards]

# Project: Emotions Word Game
This project is about developing a simple game with win or lose feature using Javascript. The game chosen is called "Emotions Word Game". 

# Description 
1. The theme of this game is "emotions" and uses words describing various emotions from The Feeling Wheel developed by Dr. Gloria Willcox. She adapted the wheel from the original version developed by Dr. Robert Plutchik.
2. Words that describe emotions can vary from broad level e.g. anger, sadness, to very specific ones e.g. disrespected, isolated. 
3. As such, they could be used in words matching games that involve categories (broad level) and elements belonging to the categories (specific level).

# How to play 
1. The player will be shown random words and a category. 
2. The player has to select all the words that match the category.
3. Once a match is successful, the player will be shown another category and has to select all the words that belong to the category. 
4. The player will aim to match as many as possible within the time given. 
5. The player only has 3 tries for wrong matches. 

# User story (includes wireframe)
- As a user, I want to see a landing page with the name of the game so that I know I'm in the right place.
- As a user, I want to see the instructions on how to play the game and the start button so that I know what to expect and how to proceed. 
- As a user, I want to be able to click the start button and see the initial game state (the category and set of words I can select from) so that I can begin playing the game. 

![Landing page](https://i.imgur.com/XvTuQAg.png)

- As a user, I want to see the timer counting down so that I know the game has started. 
- As a user, I want to see visual feedback of the word I have selected so that I know my selection has been registered. [think about whether to add a submit button]
- As a user, I want to see feedback on whether the match is correct or wrong, so that I know whether to change my selection. 
- As a user, I want to see that my selection is cleared when the match is wrong, so that I can reselect some of them in my next try. 
- As a user, I want to see how many tries I have left so that I know how many more wrong matches I can afford to make to not lose the game. 
- As a user, I want to see the existing game set replaced by a different category and set of words automatically when my match is correct, so that I know I have moved on to the next set.
- As a user, I want to see when the time is up so that I know the game has ended.

![Game state](https://i.imgur.com/iWIWnXz.png)

- As a user, I want to see a summary of my results, including all the correct matches I have made, as well as when there is no match, so that I can reflect on the game I have played. [think about what happened if the list gets too long]
- As a user, I want to see a restart button so that I know I can play again. 

![Results - with matches](https://i.imgur.com/rTV04K7.png)
![Results - with no match](https://i.imgur.com/FjO5C2o.png)

# Pseudocode
1. Define and initialise game state
``` 
const categories = {
    scared: [...],
    joyful: [...]
}

let selectedWords
let currentCategory
let triesLeft
let timeLeft
let successfulMatches
```
2. Add event listeners
```
startButton -> click
- replace landing page with gameState

gameState
- display triesLeft
- display timeLeft, countdown from 60s
- display a random category as header
- displayWords

displayWords 
- display 12 cards with words in them
- 3 words must be drawn from the category and are "correct"
- fill the rest of the cards with randomly drawn words that are "wrong"

selectedWords -> click
- word changes color to indicate selection is registered
- checkSelection

checkSelection
- check if selected words are "correct", if 3 "correct" words are chosen, store them in resultsMatch, display "correct", start newRound 
- if not, revert the words to original color and reduce triesLeft by 1, display "wrong"

newRound
- display a new category randomly
- displayWords

endGame
- when timeLeft is 0, replace gameState with results

results
- if there are successful matches, display the list from resultsMatch
- if not, display tryAgain message
- display resetButton

resetButton -> click, display gameState

```
3. Invoke the init()

4. Invoke render()

# Why this game
In the book titled "How Emotions are Made: The Secret Life of the Brain" by Dr. Lisa Feldman Barrett, she shared about the importance of emotional granularity in developing emotional intelligence. Being able to accurately label our emotions can help us to better understand, regulate and communicate them. Studies have shown that people with more vocabulary describing their emotions i.e. emotional granularity are better equipped to handle adversity. This game aims to make it easier for everyone to remember more granular emotions and hopefully use them in our day to day.



