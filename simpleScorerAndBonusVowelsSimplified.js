function simpleScore (word) {
  let score = 0;
  return score = word.length;
};


function bonusVowels(word) {
  let vowels = ["a","e","i","o","u"];
  let score = 0;
  word = word.toLowerCase();
  let wordArray = word.split("");
  for (let i=0; i<wordArray.length; i++){
    if (vowels.includes(wordArray[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};