// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
const newPointStructure = transform(oldPointStructure);
function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word:");
  console.log(`You Entered:`, word);
};

function simpleScorer(word) {
   word = word.toLowerCase();
   return word.length
};

function vowelBonusScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   const vowels = [`a`, `e`, `i`, `o`, `u`];

   for(let i = 0; i < word.length; i++) {
      if(vowels.includes(word[i])) {
         score += 3;
      } else {
         score += 1;
   }
}
return score;
}
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let totalScore = 0;
   for (const char of word) {
      if (newPointStructure[char]) {
         totalScore += newPointStructure[char];
      }
   }
   return totalScore;
};

let scoringAlgorithms = [
   {
      name: `Simple Score`,
      description: `Each letter is worth 1 point.`,
      scoringFunction: simpleScorer
   },
   {
      name: `Bonus Vowels`,
      description: `Vowels are 3 points and constanants are 1 point.`,
      scoringFunction: vowelBonusScorer
   },
   {
      name: `Scrabble` ,
      description: `The traditional scrabble scoring system.`,
      scoringFunction: scrabbleScorer
   } 
];

function scorerPrompt() {
   console.log(`Which scoring algorithm do you want to use?`);

   for (let i = 0; i <scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let selection = Number(input.question(`Enter 0, 1, or 2: `));
      while(![0, 1, 2].includes(selection)) {
         console.log(`choice invalid. Enter 0, 1, or 2: `);  
         selection = Number(input.question(`Enter 0, 1, or 2: `));   
   }
   return scoringAlgorithms[selection];

}

function transform(oldStructure) {
let newStructure = {};
   for (const score in oldStructure) {
      for (const letter of oldStructure[score]) {
         newStructure[letter.toLowerCase()] = Number(score);
      }
   }
   return newStructure;
}


function runProgram() {
   initialPrompt();
   let word = input.question("Let's play some scrabble! Enter a word:");
   const selectedScorer = scorerPrompt();
   console.log(`Score for ${word} : ${selectedScorer.scoringFunction(word)}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
