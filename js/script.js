const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

const startCells = ['', '', '', '', '', '', '', '', ''];

let turn = 'x'
infoDisplay.textContent = "X goes first."


function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addTurn, {once: true});
        gameBoard.append(cellElement);
    })
}
createBoard()


function addTurn(e) {
    // adds X or O
    // show the element I click when e is called in the function:
    // console.log(e.target);
    const turnDisplay = document.createElement('div');
    turnDisplay.classList.add(turn);
    e.target.append(turnDisplay);
    turn = turn === 'x' ? 'o' : 'x';
    infoDisplay.textContent = "It's " + turn + "'s turn.";
    e.target.removeEventListener('click', addTurn);
    whoWon()
}

function whoWon() {
    const allSquares = document.querySelectorAll('.square');
    // see that console.log picks up all squares; must be .square!
    // console.log(allSquares);
    const winCombos = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7], [2, 5, 8], [2, 4, 6],
        [3, 4, 5], [6, 7, 8]
    ];

    winCombos.forEach(array => {
        const xWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('x'));

        if (xWins) {
            infoDisplay.textContent = 'X WINS!';
            // Do not remove eventListener() for squares. Do this instead!
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }

        const oWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('o'));

        if (oWins) {
            infoDisplay.textContent = 'O WINS!';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }   
        });  
        
        // Create a DRAW
        // every square is full && neither x's nor o's win
        const catWins = [...allSquares].every(cell =>             cell.classList.contains('x') || cell.classList.contains('o'));
       
        if (catWins) {
            infoDisplay.textContent = "It's a Tie!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }

       
        // const catWins =  [...allSquares].contains('x') || [...allSquares].contains('o') && winCombos != xWins || winCombos != circleWins
        
    }





