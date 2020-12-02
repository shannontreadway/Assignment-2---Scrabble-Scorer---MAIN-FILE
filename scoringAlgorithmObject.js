let scrabbleObject = {
  "Name": "Scrabble", 
  "Description": "The traditional scoring algorithm", 
  "Score Function": scrabbleScore
};

let simpleScoreObject = {
  "Name": "Simple Score", 
  "Description": "Each letter is worth 1 point", 
  "Score Function": simpleScore
};

let bonusVowelsObject = {
  "Name": "Bonus Vowels", 
  "Description": "Vowels are worth 3 points while consonants are worth 1 point", 
  "Score Function": bonusVowels
};

let scoringAlgorithms = [scrabbleObject, simpleScoreObject, bonusVowelsObject];

console.log(scoringAlgorithms);