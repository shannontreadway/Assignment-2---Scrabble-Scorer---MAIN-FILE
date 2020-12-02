// These objects were created before I thought through the fact that there are easier ways to do the scoring for methods.

let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let consonants = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let vowels = ["a","e","i","o","u"];

let simpleScore = {};
let bonusVowels = {};


function createSimpleScore(alphabet) {
  for (let i = 0; i < alphabet.length; i++){
    {simpleScore[alphabet[i]] = 1};
  };
  return simpleScore;
}
console.log(createSimpleScore(alphabet));



function createBonusVowels(consonants, vowels) {
  for (let i = 0; i < consonants.length; i++){
    {bonusVowels[consonants[i]] = 1};
  };
  for (let i = 0; i < vowels.length; i++){
  {bonusVowels[vowels[i]] = 3};
  };
  return bonusVowels;
};
console.log(createBonusVowels(consonants, vowels));
