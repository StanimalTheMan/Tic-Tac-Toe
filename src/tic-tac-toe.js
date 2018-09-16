// tic-tac-toe.js
const tic = {
    board: function(rows, columns, initialCellValue = "") {
        const board = new Array(rows * columns);
        board.fill(initialCellValue);
        return board;
    },
    toIndex: function(board, row, col) {
        return row * (Math.sqrt(board.length)) + col;
    },
    toRowCol: function(board, i) {
        const row = Math.floor(i / Math.sqrt(board.length));
        const col = i - row * Math.sqrt(board.length);
        const rowCol = {
            "row": row,
            "col": col
        };
        return rowCol;
    },
    setBoardCell: function(board, letter, row, col) {
        const boardShallowCopy = board.slice();
        const cellIndex = tic.toIndex(board, row, col);
        //const cellIndex = row * (Math.sqrt(board.length)) + col;
        boardShallowCopy[cellIndex] = letter;
        return boardShallowCopy;
    },
    algebraicToRowCol: function(algebraicNotation) {
        //shows that I am a JS noob
        //lol there is definitely a more efficient way than making an object of the alphabet and each letter's value
        const alphabetDictionary = {
            'A': 0,
            'B': 1,
            'C': 2,
            'D': 3,
            'E': 4,
            'F': 5,
            'G': 6,
            'H': 7,
            'I': 8,
            'J': 9,
            'K': 10,
            'L': 11,
            'M': 12,
            'N': 13,
            'O': 14,
            'P': 15,
            'Q': 16,
            'R': 17,
            'S': 18,
            'T': 19,
            'U': 20,
            'V': 21,
            'W': 22,
            'X': 23,
            'Y': 24,
            'Z': 25
        };
        if (algebraicNotation.length >= 3 || algebraicNotation.length <= 1) {
            return undefined;
        }
        if (algebraicNotation.charAt(0) < 'A' || algebraicNotation.charAt(0) > 'Z') {
            return undefined;
        }
        const rowCol = {};
        for (let i = 0; i < algebraicNotation.length; i++) {
            if (isNaN(algebraicNotation.charAt(i))) {
                if (alphabetDictionary.hasOwnProperty(algebraicNotation.charAt(i))) {
                    rowCol.row = alphabetDictionary[algebraicNotation.charAt(i)];
                }
            } else {
                rowCol.col = parseInt(algebraicNotation.charAt(i))  - 1;
            }
        }
        return rowCol;
    },
    placeLetters: function(board, ...letterOrAlgebraicNotation) {
        if (letterOrAlgebraicNotation.length % 2 === 1) {
            for (let i = 0; i < letterOrAlgebraicNotation.length - 1; i += 2) {
                const rowCol = tic.algebraicToRowCol(letterOrAlgebraicNotation[i + 1]);
                if (rowCol === undefined || board[tic.toIndex(board, rowCol.row, rowCol.col)] !== "") {
                    continue;
                } 
                board = tic.setBoardCell(board, letterOrAlgebraicNotation[i], rowCol.row, rowCol.col);
            }
        }
        else {//even number of arguments after board, probably bad I am using a very similar for loop
            for (let i = 0; i < letterOrAlgebraicNotation.length; i += 2) {
                const rowCol = tic.algebraicToRowCol(letterOrAlgebraicNotation[i + 1]);
                if (rowCol === undefined || board[tic.toIndex(board, rowCol.row, rowCol.col)] !== "") {
                    continue;
                } 
                board = tic.setBoardCell(board, letterOrAlgebraicNotation[i], rowCol.row, rowCol.col);
            }
        }
        return board;
    },
    boardToString: function(board) {
        let boardString = "     ";
        //column label
        for (let i = 1; i <= Math.sqrt(board.length); i++) {
            if (i === Math.sqrt(board.length)) {
                boardString += i;
                boardString += "  \n   ";
            } else {
                boardString += i;
                boardString += "   ";
            }
        }
        let rowStartIndex = 0;
        let rowLabel = 65;
        //final row border in first if scenario
        for (let i = 1; i <= Math.sqrt(board.length) + 1; i++) {
            if (i === Math.sqrt(board.length) + 1) {
                for (let j = 1; j <= Math.sqrt(board.length) + 1; j++) {
                    if (j === Math.sqrt(board.length) + 1) {
                        boardString += "+\n";
                    } else {
                        boardString += "+---";
                    }
                }
            } else {//row border and corresponding row
                for (let j = 1; j <= Math.sqrt(board.length) + 1; j++) {
                    if (j === Math.sqrt(board.length) + 1) {
                        boardString += "+\n ";
                        boardString += String.fromCodePoint(rowLabel);
                        boardString += " ";
                        for (let k = rowStartIndex; k <= rowStartIndex + Math.sqrt(board.length) - 1; k++) {
                            if(board[k] !== "") {
                                boardString += "| ";
                                boardString += board[k];
                                boardString += " ";
                            } else {
                                boardString += "|   ";
                            }
                        }
                        boardString += "|\n   ";
                        rowStartIndex += Math.sqrt(board.length);
                        rowLabel++;
                    } else {
                        boardString += "+---";
                    }
                }
            }
        }
        return boardString;
    }, 
    getWinnerRows: function(board) {
        let rowStartIndex = 0;
        const numRows = Math.sqrt(board.length);
        let winnerRowDetermined = true;//initially assumes that a winner can be found in a row
        for (let i = 0; i < numRows; i++) {
            let firstElementOfRow = board[rowStartIndex];
            if (firstElementOfRow !== "") {            
                for (let j = rowStartIndex + 1; j <= rowStartIndex + Math.sqrt(board.length) - 1; j++) {
                    if (board[j] !== firstElementOfRow) {
                        winnerRowDetermined = false;
                        break;
                    } else if (winnerRowDetermined && j === rowStartIndex + Math.sqrt(board.length) - 1 && board[j] === firstElementOfRow) {
                        return board[j];
                    } else {
                        continue;
                    }
                }
            }
            winnerRowDetermined = true;
            rowStartIndex += Math.sqrt(board.length);
        }
        return undefined;
    },
    getWinnerCols: function(board) {
        let colStartIndex = 0;
        const numColumns = Math.sqrt(board.length);
        let winnerColDetermined = true;//initially assumes that a winner can be found in a column
        for (let i = 0; i < numColumns; i++) {
            let firstElementOfColumn = board[colStartIndex];
            if (firstElementOfColumn !== "") {
                for (let j = colStartIndex + Math.sqrt(board.length); j < board.length; j += Math.sqrt(board.length)) {
                    if (board[j] !== firstElementOfColumn) {
                        winnerColDetermined = false;
                        break;
                    } else if (winnerColDetermined && j >= board.length - Math.sqrt(board.length) && board[j] === firstElementOfColumn) {
                        return board[j];
                    } else {
                        continue;
                    }
                }
            }
            winnerColDetermine = true;
            colStartIndex++;
        }
        return undefined;
    },
    getWinnerDiagonals: function(board) {
        let winnerDiagonalDetermined = true;// initially assumes that a winner can be found via  diagonal
        //examine board upper right to lower left
        let upperRightStartIndex = Math.sqrt(board.length) - 1;
        let firstElementOfUpperRight = board[upperRightStartIndex];
        if (firstElementOfUpperRight !== "") {
            for (let j = upperRightStartIndex + upperRightStartIndex; j < board.length; j += upperRightStartIndex) {
                if (board[j] !== firstElementOfUpperRight) {
                    winnerDiagonalDetermined = false;
                    break;
                } else if (winnerDiagonalDetermined && j === board.length - Math.sqrt(board.length) && board[j] === firstElementOfUpperRight) {
                    return board[j];
                } else {
                    continue;
                }
            }
        }
        
        //reset flag
        winnerDiagonalDetermined = true;

        //examine board upper left to lower irght
        let upperLeftStartIndex = 0;
        let firstElementOfUpperLeft = board[upperLeftStartIndex];
        if (firstElementOfUpperLeft !== "") {
            for (let i = upperLeftStartIndex + Math.sqrt(board.length) + 1; i < board.length; i += Math.sqrt(board.length) + 1) {
                if (board[i] !== firstElementOfUpperLeft) {
                    winnerDiagonalDetermined = false;
                    break;
                } else if (winnerDiagonalDetermined &&  i === board.length - 1 && board[i] === firstElementOfUpperLeft) {
                    return board[i];
                }
            }
        }
        return undefined;
    },
    //helper function that enables use of Array method, some
    isNotFull: function(element) {
        return element === "";
    },
    isBoardFull: function(board) {
        return !board.some(tic.isNotFull);
    },
    isValidMove: function(board, row, col) {
        const boardIndex = tic.toIndex(board, row, col);
        if (boardIndex <= board.length - 1) {
           return board[boardIndex] === "";
        }
        return false;
    },
    isValidMoveAlgebraicNotation(board, algebraicNotation) {
        const rowCol = tic.algebraicToRowCol(algebraicNotation);
        if (rowCol !== undefined) {
            return tic.isValidMove(board, rowCol.row, rowCol.col);
        }
        return false;
    },
    getRandomEmptyCellIndex(board) {
        const emptyCellIndicesArray = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                emptyCellIndicesArray.push(i);
            }
        }
        const randomIndex = Math.floor(Math.random() * emptyCellIndicesArray.length);
        return emptyCellIndicesArray[randomIndex];
    },
    //helper function to convert array index into algebraic notation
    cellIndexAlgebraicNot: function(board, cellIndex) {
        let algebraicNot = "";
        let letterAsciiValue = 65;//66 is 'A'
        let lastCellOfRowIndex = Math.sqrt(board.length) - 1;
        for (let i = 1; i <= Math.sqrt(board.length); i++) {
            if (cellIndex <= lastCellOfRowIndex) {
                algebraicNot += String.fromCodePoint(letterAsciiValue);
                algebraicNot += Math.floor(cellIndex % Math.sqrt(board.length)) + 1; 
                break;
            } else {
                letterAsciiValue++;
                lastCellOfRowIndex += Math.sqrt(board.length);
            }
        }
        return algebraicNot;
    }
}

module.exports = tic;
