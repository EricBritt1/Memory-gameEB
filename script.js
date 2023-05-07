// Code taken from script.js simple solution springboard chapter 4 memory game challenge. This was an extremely difficult challenge for me at the moment but, I'll continue to come back to work on it to develop my own version. 

const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  // Variable counter is being set equal to the length of array being passed in it. Colors is the array being passed in. Let's use max length 10 for example.
  let counter = array.length;

  // While there are elements in the array
  //This will only continue to run while counter is greater than 0
  while (counter > 0) {
    // Pick a random index
    //Math.random() selects a number equal to 0 and always less than 1. In our case, 10 * 0.999 will be 9.999 by then Math.floor() will bring it to 9. So index is 9.
    let index = Math.floor(Math.random() * counter);

    
    // Decrease counter by 1
    //counter is now 9
    counter--;

    // And swap the last element with it
    //You can think of temp as the number at the end of the array that we want to swap.
    // The array[index] is the number that we randomly generated to take the next in line last index.
    
    let temp = array[counter];

    //At this part we're just swapping the last index in the array with our newly generated index.
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//We are saving the whole shuffling process function to the variable name shuffledColors.
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    //For each color a new div will be created
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    //Each individual div will have it's own event listener! Which is the handleCardClick function that we'll be implementing.

    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    //Just appending each individual card to the div on html page so everything is visible
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
if (noClicking) return;
if (event.target.classList.contains('flipped')) return;

let currentCard = event.target;
currentCard.style.backgroundColor = currentCard.classList[0]

if (!card1 || !card2) {
currentCard.classList.add('flipped');
card1 = card1 || currentCard;
card2 = currentCard === card1 ? null : currentCard;
}

if (card1 && card2) {
  noClicking = true;
  let gif1 = card1.className;
  let gif2 = card2.className;
  if (gif1 === gif2) {
    cardsFlipped += 2;
    card1.removeEventListener('click', handleCardClick());
    card2.removeEventListener('click', handleCardClick());
    card1 = null;
    card2 = null;
    noClicking = false;
  } else {
    setTimeout(function() {
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClicking = false;
    }, 1000);

}
}

if(cardsFlipped === COLORS.length) alert ('game over!');

  
};

// when the DOM loads
createDivsForColors(shuffledColors);
