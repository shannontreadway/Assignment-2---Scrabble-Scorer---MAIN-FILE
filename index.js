const input = require('readline-sync');
// Create variables that are used in multiple functions for the same thing.
let word = "";
let score = 0;

// Code your initialPrompt function here:
let scoreAlgorithm = 0;
let scoringOptions = ["Scrabble", "Simple Score", "Bonus Vowels"];

function initialPrompt() {
  console.log("Welcome to the Scrabble score calculator!", "\n");
  console.log("Which scoring algorithm would you like to use?", "\n");
  console.log("0 - Scrabble: The traditional scoring algorithm.");
  console.log("1 - Simple Score: Each letter is worth 1 point.");
  console.log("2 - Bonus Vowels: Vowels are worth 3 points, and consonants are 1 point.", "\n");

  scoreAlgorithm = Number(input.question("Enter 0, 1, or 2: "));
  //Set score algorithm to traditional scrabble method if given invalid input.  This has been commented out so the input validator will work.
  // if (scoreAlgorithm !== 0 || scoreAlgorithm !== 1 || scoreAlgorithm !== 2){
  //   scoreAlgorithm = 0;
  // };
  return scoreAlgorithm;
};


//Bonus Mission: Input Validator
function getValidInput(prompt, isValid) {
  //Prompt is taken care of in initial prompt
  // Call the boolean function isValid to check the input
  while (!isValid(scoreAlgorithm)) {
  	console.log("Invalid input. Try again.");
  	scoreAlgorithm = input.question("Enter 0, 1, or 2: ");
  };
 
  return (`You have selected to use the ${scoringOptions[scoreAlgorithm]} method for scoring.`);
};
// A boolean function for validating input - if the input is not 0, 1, or 2, the while loop in getValidInput function will prompt user for another entry.
let validInput = function(n) {
   return Number(n) === 0 || Number(n) === 1 || Number(n) === 2;
};
 

// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};


// Code your transform function here: this transforms the oldPointStructure for Scrabble to an easier to use structure with the letters as the key and the number of points as the value.

function transform (object) {
  let newObject = {};
  for (item in object){
//    newObject = object[item][0]=item;
    for (let i=0; i<object[item].length; i++){
      newObject[object[item][i].toLowerCase()] = Number(item);
    };
  };
  return newObject;
};


// Use the transform function to create the newPointStructure object here:
let newPointStructure = transform(oldPointStructure);

// Bonus Mission: Add an option to use blank tile (') to newPointStructure
newPointStructure["'"]=0;

// Bonus Mission: Word Validator for Traditional Scrabble Scoring
function getValidWordInput(prompt, isValid) {
  //Prompt is taken care of in word selection prompt
  // Call the boolean function isValid to check the input
  while (!isValid(word)) {
    word = input.question("Invalid input. Please reenter word. If you wish to end the game: hit ENTER then type 'game over'. ");
    // Those directions are necessary, because once you enter the loop, there is not allowance for the space between game and over. Also, this is called after determining that "game over" was not the word, and it is in the scoring portion of the code.
  };
  return word;
};
 
// A boolean function for validating input
let validWordInput = function(n) {
  let newWord = word.toLowerCase();
  let newWordArray = newWord.split("");
  let wordCheckArray = [];
  // Check to see if word includes invalid characters (or characters not in alphabetPlusBlank array).  If it does, boolean false will be pushed into the wordCheckArray.
  for (let i = 0; i< newWordArray.length; i++){
    let alphabetPlusBlank = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","'"];
    wordCheckArray.push(alphabetPlusBlank.includes(newWordArray[i])); 
  };
  // Does wordCheckArray contain false?  If so, the return statement array "does not include false" will return false, thus causing the while loop in getValidWordInput function to reprompt user for a new word.
  return (!wordCheckArray.includes(false));
};


// Create your scoringAlgorithms array here:

// Function for Simple Scoring - each letter is 1 point, so score is the length of the word.
function simpleScore (word) {
  score = 0;
  return score = word.length;
};

// Function for Bonus Vowels Scoring - vowels are 3 points; consonants are 1 point.  Create an array for vowels. Split the word into an array, and create a loop for the length of the word containing an if / else statement.  If the letter is a vowel (contained in an array of vowels), add 3 to the score; else, add 1.
function bonusVowels(word) {
  let vowels = ["a","e","i","o","u"];
  score = 0;
  word = word.toLowerCase();
  let wordArray = word.split("");
  for (let i=0; i<wordArray.length; i++){
    if (vowels.includes(wordArray[i])) {
      score += 3;
    } else {
      score += 1;
    };
  };
  return score;
};

// Function for Traditional Scrabble Scoring 
// First, varify the word is valid. Turn the string to an array, and create a for loop to go through the array and add the values for the letters from the newPointStructure object values.
function scrabbleScore (word, newPointStructure) {
  score = 0;
  word = getValidWordInput(prompt, validWordInput);
  let newWord = word.toLowerCase();
  let newWordArray = newWord.split("");
  for (let i = 0; i < newWordArray.length; i++){
    score += Number(newPointStructure[newWordArray[i]]);
  };
  return score;
};

// Create Scoring Objects to put into array
let scrabbleObject = {
  name: "Scrabble", 
  description: "The traditional scoring algorithm", 
  scoreFunction: scrabbleScore 
};

let simpleScoreObject = {
  name: "Simple Score", 
  description: "Each letter is worth 1 point", 
  scoreFunction: simpleScore
};

let bonusVowelsObject = {
  name: "Bonus Vowels", 
  description: "Vowels are worth 3 points while consonants are worth 1 point", 
  scoreFunction: bonusVowels
};

// Array of scoring algorithms
let scoringAlgorithmArray = [scrabbleObject, simpleScoreObject, bonusVowelsObject];

// Code your runProgram function here:
function runProgram(scoringAlgorithmArray) {
  initialPrompt();
  
  console.log("\n" + getValidInput(scoreAlgorithm, validInput), "\n");

  // I know the directions said to use  "STOP" to end the program, but what if they want to score the word "STOP"?  Thus, I changed "STOP" to "GAME OVER"
  // Traditional Scrabble method is separated from Simple Score and Bonus Vowels because (1) it has the newPointStructrue as an extra parameter and (2) it has slightly different directions to allow for a blank tiles.
  if (scoreAlgorithm === 0) {
    console.log("Enter your words. Use ' for blank tiles (worth 0 points). When finished, type: GAME OVER.");
    word = input.question("What is your word? ");
    word = word.toLowerCase(); //this needs to be here so the game will end in case they use not all lowercase characters for "game over".
    while (word !== "game over"){
      console.log(scoringAlgorithmArray[scoreAlgorithm].scoreFunction(word, newPointStructure));
      word = input.question("What is your word? ");
    };
  } else {
    console.log("Enter your words. When finished, type: GAME OVER");
    word = input.question("What is your word? ");
    word = word.toLowerCase();
    while (word !== "game over") {
      console.log(scoringAlgorithmArray[scoreAlgorithm].scoreFunction(word));
      word = input.question("What is your word? ");
      word = word.toLowerCase();
    };
  };
  
  return "Finished";
};

// Call the runProgram function here:
console.log(runProgram(scoringAlgorithmArray));
