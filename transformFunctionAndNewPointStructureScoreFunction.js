const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function transform (object) {
//  some sort of for..in loop
  let newObject = {};
  for (item in object){
//    newObject = object['item'][0]=item;
    for (let i=0; i<object[item].length; i++){
      newObject[object[item][i].toLowerCase()] = Number(item);
    }
  }
  return newObject;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore (word, newPointStructure) {
  let score = 0;
  let newWord = word.toLowerCase();
  let newWordArray = newWord.split("");
  for (let i = 0; i < newWordArray.length; i++){
    score += Number(newPointStructure[newWordArray[i]]);
  }
  return score;
}
