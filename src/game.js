// game.js
//I assume person will input the correct arguments to arr so I don't have to check if arr is undefined when I assign to computerMoves and userMoves
const arr = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;
let computerMoves;
let userMoves;

if (arr !== undefined) {
    computerMoves = arr[0];
    userMoves = arr[1];
    //unable to match [[0,0],[0,1], [0,2]] output because new line is generated idk i tried to fix it but the format would print on next line
    console.log("Computer will make the following moves: " + arr[0]);
    //similar case here
    console.log("Player will make the following moves: " + arr[1]);
}


const tic = require('./tic-tac-toe.js');
const readlinesync = require('readline-sync');

const answer = readlinesync.question("Shall we play a game? ");
console.log("");

console.log("How wide should the board be? (1 - 26)");
let gameboardWidth = readlinesync.question("> ");

while (gameboardWidth === "" || isNaN(gameboardWidth)) {
    console.log("How wide should the board be? (1 - 26)");
    gameboardWidth = readlinesync.question("> ");
}

const acceptedLetters = ["X", "O"];//stupid way but === "X" or charCodeAt both don't work for me
console.log("Pick your letter: X or O");
let userLetter = readlinesync.question("> ");

while (!acceptedLetters.includes(userLetter)) {
    console.log("Pick your letter: X or O");
    userLetter = readlinesync.question("> ");
}

console.log("Player is " + userLetter);

let board = tic.board(gameboardWidth, gameboardWidth);
console.log(tic.boardToString(board));

//actual interactive game
//scripted parts use example code from hw1 instructions
let userMove;
let computerMove;
let priorUserMove;
let priorComputerMove;
if (userLetter === "O") {
    //computer makes first move because it picks X in this scenario
    //looks bad because both if and else have similar code?
    let compLetter = "X";
    while (!tic.isBoardFull(board) && tic.getWinnerCols(board) === undefined && tic.getWinnerDiagonals(board) === undefined && tic.getWinnerRows(board) === undefined) {
        console.log("Press <ENTER> to show computer's move...");
        if (computerMoves && computerMoves.length > 0) {
            const arr = computerMoves.splice(0, 1)[0];
            //make sure  it's a valid move!
            if (tic.isValidMove(board, arr[0], arr[1])) {
                computerMove = {'row':arr[0], 'col':arr[1]};
                board = tic.placeLetters(board, compLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, computerMove["row"], computerMove["col"])));
                priorComputerMove = computerMove;
            }
            //if it's not valid, computerMove remains undefined
            //if we still don't have a valid move, just get a random empty square
            else if (computerMove === priorComputerMove || computerMove === undefined) {
                computerMove = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board));
                board = tic.placeLetters(board, compLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, computerMove["row"], computerMove["col"])));
                priorComputerMove = computerMove;
            }
            console.log(tic.boardToString(board));
        }
        else {
            //console.log("Press <ENTER> to show computer's move...");
            board = tic.placeLetters(board, compLetter, tic.cellIndexAlgebraicNot(board, tic.getRandomEmptyCellIndex(board)));
            console.log(tic.boardToString(board));
        }    

        if (tic.isBoardFull(board)) {
            console.log("It's a draw!");
            break;
        } else {
            if (tic.getWinnerCols(board) !== undefined || tic.getWinnerDiagonals(board) !== undefined || tic.getWinnerRows(board) !== undefined) {
                console.log("Computer won!");
                break;
            } 
        }

        //user goes second
        if (userMoves && userMoves.length > 0) {
            readlinesync.question("Press <ENTER> to confirm player's scripted move...")
            const arr = userMoves.splice(0, 1)[0];
            //make sure it's a valid move
            if (tic.isValidMove(board, arr[0], arr[1])) {
                userMove = {'row':arr[0], 'col':arr[1]};
                board = tic.placeLetters(board, userLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, userMove["row"], userMove["col"])));
                priorUserMove = userMove;
            }
            //if it's not valid, userMove remains undefined
            //still no valid move means you just get a random empty square
            else if (userMove === priorUserMove || userMove === undefined) {
                userMove = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board));
                tic.placeLetters(board, userLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, userMove["row"], userMove["col"])));
                priorUserMove = userMove;
            }
            console.log(tic.boardToString(board));
        }
        else {
            console.log("What's your move?");
            let userMoveAlgebraic = readlinesync.question("> ");
            let userMoveRowCol = tic.algebraicToRowCol(userMoveAlgebraic);
            while (userMoveAlgebraic === "" || !tic.isValidMoveAlgebraicNotation(board, userMoveAlgebraic) || userMoveRowCol === undefined) {
                console.log("Your move must be in a format, and it must specify an existing cell!\nWhat's your move?");
                userMoveAlgebraic = readlinesync.question("> ");
                userMoveRowCol = tic.algebraicToRowCol(userMoveAlgebraic);
            }
            board = tic.placeLetters(board, userLetter,userMoveAlgebraic);
            console.log(tic.boardToString(board));
        }
        if (tic.isBoardFull(board)) {
            console.log("It's a draw!");
            break;
        } else {
            if (tic.getWinnerCols(board) !== undefined || tic.getWinnerDiagonals(board) !== undefined || tic.getWinnerRows(board) !== undefined) {
                console.log("Player won!");
                break;
            } 
        }
    }    
} else {//user picked "X" and makes first move
    let compLetter = "O";
    while (!tic.isBoardFull(board) && tic.getWinnerCols(board) === undefined && tic.getWinnerDiagonals(board) === undefined && tic.getWinnerRows(board) === undefined) {
        if (userMoves && userMoves.length > 0) {
            readlinesync.question("Press <ENTER> to confirm player's scripted move...");
            const arr = userMoves.splice(0,1)[0];
            //make sure it's a valid move!
            if (tic.isValidMove(board, arr[0], arr[1])) {
                userMove = {'row':arr[0], 'col':arr[1]};
                board = tic.placeLetters(board, userLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, userMove.row, userMove.col)));
                priorUserMove = userMove;
            }
            // if it's not valid, userMove remains undefined
            // if we still don't have a valid move, just get a random empty square
            else if (userMove === priorUserMove || userMove === undefined) {
                userMove = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board));
                board = tic.placeLetters(board, userLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, userMove.row, userMove.col)));
                priorUserMove = userMove;
            }
            console.log(tic.boardToString(board));
        } 
        else {
            console.log("What's your move?");
            let userMoveAlgebraic = readlinesync.question("> ");
            let userMoveRowCol = tic.algebraicToRowCol(userMoveAlgebraic);
            while (userMoveAlgebraic === "" || !tic.isValidMoveAlgebraicNotation(board, userMoveAlgebraic) || userMoveRowCol === undefined) {
                console.log("Your move must be in a format, and it must specify an existing cell!\nWhat's your move?");
                userMoveAlgebraic = readlinesync.question("> ");
                userMoveRowCol = tic.algebraicToRowCol(userMoveAlgebraic);
            }
            board = tic.placeLetters(board, userLetter, userMoveAlgebraic);
            console.log(tic.boardToString(board));
        }


        if (tic.isBoardFull(board)) {
            console.log("It's a draw!");
            break;
        } else {
            if (tic.getWinnerCols(board) !== undefined || tic.getWinnerRows(board) !== undefined || tic.getWinnerDiagonals(board) !== undefined) {
                console.log("Player won!");
                break;
            }
        }
        /*
        if (tic.isBoardFull(board) || tic.getWinnerCols(board) !== undefined || tic.getWinnerDiagonals(board) !== undefined || tic.getWinnerRows(board) !== undefined) {
            break;
        }
        */

        //computer makes move after player always
        //do we have an Array of scripted moves and are there moves left?
        console.log("Press <ENTER> to show computer's move...");
        if (computerMoves && computerMoves.length > 0) {
            const arr = computerMoves.splice(0, 1)[0];
            //console.log(arr);
            //make sure it's a valid move!
            //console.log(computerMove);
            if (tic.isValidMove(board, arr[0], arr[1])) {
                computerMove = {'row':arr[0], 'col':arr[1]};
                board = tic.placeLetters(board, compLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, computerMove.row, computerMove.col)));
                priorComputerMove = computerMove;
            }
            //if we still don't have a valid move, just get a random empty square
            else if (computerMove === priorComputerMove || computerMove === undefined) {
                computerMove = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board));
                board = tic.placeLetters(board, compLetter, tic.cellIndexAlgebraicNot(board, tic.toIndex(board, computerMove.row, computerMove.col)));
                priorComputerMove = computerMove;
            }
            console.log(tic.boardToString(board));
        } 
        else {
            //console.log("Press <ENTER> to show computer's move...");
            board = tic.placeLetters(board, compLetter, tic.cellIndexAlgebraicNot(board, tic.getRandomEmptyCellIndex(board)));
            console.log(tic.boardToString(board));
        }
        if (tic.isBoardFull(board)) {
            console.log("It's a draw!");
            break;
        } else {
            if (tic.getWinnerCols(board) !== undefined || tic.getWinnerDiagonals(board) !== undefined || tic.getWinnerRows(board) !== undefined) {
                console.log("Computer won!");
                break;
            } 
        }
    }
}