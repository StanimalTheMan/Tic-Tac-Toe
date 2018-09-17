// scrabble.js

//some code was used from hw1 prompt from Mr. Versoza
const readline = require('readline');
const fs = require('fs');
let wordsList;
const letterValues = { 
    "E": 1, "A": 1, "I": 1, "O": 1, "N": 1, "R": 1, "T": 1, "L": 1, "S": 1, "U": 1, 
    "D": 2, "G": 2, "B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4, 
    "Y": 4, "K": 5, "J": 8, "X": 8, "Q": 10, "Z": 10 
};

function main() {
    fs.readFile('../data/enable1.txt', 'utf8', fileReader);

    const userPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //array of word/score objects 
    let wordScoreArray = [];
    //ask user for some letters
    userPrompt.question("Please enter some letters: ", (response) => {handleUserInput(userPrompt, wordScoreArray, response); });


    
}

function fileReader(err, data) {
    if (err) {
        console.log('uh oh', err);
    } else {
        wordsList = data.split('\n');
    }
    //console.log(wordsList);
}

//potential algorithm for finding all words that can be formed from a series of letters
function handleUserInput(userPrompt, wordScoreArray, response) {
    //make a copy of the user input
    //represent each word as an object...with actual word as one property and the word's score as a second property
    let wordScoreObj = {};
    let wordScore = 0;
    let userInputCopy = response;
    let userInputCopyArray = userInputCopy.split();
    //go through every word in the word list
    for (let word of wordsList) {
        while (userInputCopyArray.length > 0) {
            if (userInputCopyArray.includes(word.charAt(0))) {
                if (letterValues.hasOwnProperty(word.charAt(0).toUpperCase())) {
                    wordScore += letterValues[word.charAt(0).toUpperCase()];
                }
                userInputCopyArray.splice(0, 1);            
            } else { //if the letter does not exist, then you know the word from the word
                //list cannot be formed by the letters in the user input
                wordScoreObj[word] = 0;
                wordScoreArray.push(wordScoreObj);
                //reset for next word
                wordScoreObj = {};
                break;
            }
        }
        //if all of the letters in the word list have been iterated over, then you know the word can be formed
        //by the letters in the user input!
        wordScoreObj[word] = wordScore;
        wordScoreArray.push(wordScoreObj);
        //reset for next word
        wordScoreObj = {};
        wordScore = 0;
    }
    //sort
    wordScoreArray.sort(function(a, b) {
        if (a.wordScore < b.wordScore) {
            return 1;
        } else if (a.wordScore > b.wordScore) {
            return -1;
        } else {
            return 0;
        }
    });
    //Output 5 highest scoring words in Scrabble that can be formed from the letters 
    //entered (not all of the letters have to be used to form a word)
    console.log(wordScoreArray);
    console.log("The top scoring words are:");
    /*
    for (let i = 0; i < 5; i++) {
        let word = wordScoreArray.keys()[i];
        console.log(wordScoreArray[i][wordScore] + " " + wordScore[i][word]);
    }
    userPrompt.close();
    */
}


main();