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
    placeLetters: function(board, ...lengthOrAlgebraicNotation) {
        if (lengthOrAlgebraicNotation.length % 2 === 1) {
            for (let i = 0; i < lengthOrAlgebraicNotation.length - 1; i += 2) {
                const rowCol = tic.algebraicToRowCol(lengthOrAlgebraicNotation[i + 1]);
                if (rowCol === undefined || board[tic.toIndex(board, rowCol.row, rowCol.col)] !== "") {
                    continue;
                } 
                board = tic.setBoardCell(board, lengthOrAlgebraicNotation[i], rowCol.row, rowCol.col);
            }
        }
        else {//even number of arguments after board, probably bad I am using a very similar for loop
            for (let i = 0; i < lengthOrAlgebraicNotation.length; i += 2) {
                const rowCol = tic.algebraicToRowCol(lengthOrAlgebraicNotation[i + 1]);
                if (rowCol === undefined || board[tic.toIndex(board, rowCol.row, rowCol.col)] !== "") {
                    continue;
                } 
                board = tic.setBoardCell(board, lengthOrAlgebraicNotation[i], rowCol.row, rowCol.col);
            }
        }
        return board;
    },
}

module.exports = tic;
