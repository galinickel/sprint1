/*
creating the board:
allow for different size boards through the parameter passed in.

setting the mines in random locations: will be fixed for testing

count the mines' neighbors 

return the board.

*/

var gBoard;
var gLevel = {
    size: 4,
    mines: 2,
    gameOn: true,
    flagCount: 0
}

var gBoard;

function difficultyLevelPicker(difficultyLevel) {
    switch (difficultyLevel) {
        case 'easy':
            gLevel.size = 4
            gLevel.mines = 2
            break;
        case 'medium':
            gLevel.size = 8
            gLevel.mines = 12
            break;
        case 'hard':
            gLevel.size = 12
            gLevel.mines = 30
            break;
    }
    gBoard = (buildBoard(gLevel.size, gLevel.mines))
    gLevel.flagCount = 0
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    gLevel.gameOn = true

}

function init() {
    gBoard = (buildBoard(gLevel.size, gLevel.mines))
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    console.log(gBoard);
    gLevel.gameOn = true
    gLevel.flagCount = 0
}

function gameOver() {
    gLevel.gameOn = false;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isShown = true
        }
    }
}

function cellClicked(positionI, poisitionJ, elCell) {
    var currCell = gBoard[positionI][poisitionJ]
    if (currCell.isMarked) return
    currCell.isShown = true
    var checkVictory = checkIfVictory()
    if (checkVictory) {gameWon();
        return}
    if (gBoard[positionI][poisitionJ].isMine) gameOver()
    renderBoard(gBoard)
}

function cellRightClicked(positionI, poisitionJ) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    var currCell = gBoard[positionI][poisitionJ]
    var checkVictory = checkIfVictory()
    if (checkVictory) {gameWon();
        return}
    else if (!currCell.isMarked) currCell.isMarked = true;
    else {
        currCell.isMarked = false
    }
    renderBoard(gBoard)
}

function checkIfVictory() {
    //check if all mines are flagged
var flaggedMines = []
var ShownCellsCount = 0
for (var i = 0 ; i <gBoard.length; i++) { 
    for (var j = 0 ; j < gBoard[0].length; j++) { 
        var currCell = gBoard[i][j]
        if (currCell.isShown) ShownCellsCount++
        if(currCell.isMine && currCell.isMarked)  flaggedMines.push(currCell)
    }
}
if (flaggedMines.length === gLevel.mines && ShownCellsCount === gLevel.size**2-gLevel.mines) {console.log('victory');
return true
}
return false
}

function gameWon() { 
    alert('congrats youve won!')
}