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
    userPrompt.question("Please enter some letters:\n", (response) => {handleUserInput(userPrompt, wordScoreArray, response); });
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
    let userInputCopyArray = [...userInputCopy]; //use of spread operator to convert string to character array
    //go through every word in the word list
    for (let word of wordsList) {
        for (let i = 0; i < word.length; i++) {

            if (userInputCopyArray.indexOf(word[i]) !== -1) {
                const property = word[i].toUpperCase();
                wordScore += letterValues[property];
                userInputCopyArray.splice(userInputCopyArray.indexOf(word[i]), 1);
                if (i === word.length - 1) {
                    //wordScoreObj[word] = wordScore;
                    wordScoreObj["word"] = word;
                    wordScoreObj["score"] = wordScore;
                    wordScoreArray.push(wordScoreObj);
                    //reset for next word
                    userInputCopyArray = [...userInputCopy];
                    wordScore = 0;
                    wordScoreObj = {};
                }
            }
            else {
                wordScore = 0;
                //wordScoreObj[word] = wordScore;
                wordScoreObj["word"] = word;
                wordScoreObj["score"] = wordScore;
                wordScoreArray.push(wordScoreObj);
                //reset for next word
                userInputCopyArray = [...userInputCopy];
                wordScoreObj = {};
                break;
            }
        }
    }
    sortWordScoreArray(wordScoreArray);
    //sort
    /*
    wordScoreArray.sort(function(a, b) {
        if (a.score < b.score) {
            return 1;
        } else if (a.score > b.score) {
            return -1;
        } else {
            return 0;
        }
    }); 
    */

    //Output 5 highest scoring words in Scrabble that can be formed from the letters 
    //entered (not all of the letters have to be used to form a word)
    console.log("The top scoring words are:");
    for(let i = 0; i < wordScoreArray.length && i < 5; i++){//if there are less than 5 words in input? case covered in conditional part
        console.log(wordScoreArray[i].score + " - " + wordScoreArray[i].word);
    }
    /*
    for (let i = 0; i < 5; i++) {
        let word = wordScoreArray.keys()[i];
        console.log(wordScoreArray[i][wordScore] + " " + wordScore[i][word]);
    }
    userPrompt.close();
    */
}
 
function sortWordScoreArray(wordScoreArray) {
    wordScoreArray.sort(function(a, b) {
        if (a.score < b.score) {
            return 1;
        } else if (a.score > b.score) {
            return -1;
        } else {
            return 0;
        }
    }); 
}


main();