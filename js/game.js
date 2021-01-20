var gBoard;
var gLevel = {
    size: 4,
    mines: 2,

}

var gGame = {
    gameOn: false,
    flagCount: 0,
    stopwatchStartTime: 0,
    stopwatchInt: null
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
    clearInterval(gGame.stopwatchInt);
    gGame.stopwatchInt = null;
    var stopwatchEl = document.querySelector('.stopwatch-container');
    stopwatchEl.innerText = `Score: 0:000`
    gBoard = (buildBoard(gLevel.size, gLevel.mines))
    gGame.flagCount = 0
    renderBoard(gBoard)
    gGame.gameOn = false

}

function init() {
    gBoard = (buildBoard(gLevel.size, gLevel.mines))
    renderBoard(gBoard)
    gGame.flagCount = 0
}

function gameOver() {
    gGame.gameOn = false;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isShown = true
        }
    }
    clearInterval(gGame.stopwatchInt);

}

function cellClicked(positionI, poisitionJ) {
    if (!gGame.gameOn) firstUserClickHanlder()
    var currCell = gBoard[positionI][poisitionJ]
    if (currCell.isMine) gameOver()
    if (currCell.isMarked) return
    currCell.isShown = true
    renderBoard(gBoard)
    if (checkIfVictory()) {
        gameWon();
        return
    }
}

function cellRightClicked(positionI, poisitionJ) {
    if (!gGame.gameOn) firstUserClickHanlder()
    document.addEventListener('contextmenu', event => event.preventDefault());
    var currCell = gBoard[positionI][poisitionJ]
    if (checkIfVictory()) {
        gameWon();
        return
    } else if (!currCell.isMarked) currCell.isMarked = true;
    else {
        currCell.isMarked = false
    }
    renderBoard(gBoard)
}

function checkIfVictory() {
    //check if all mines are flagged
    var flaggedMines = []
    var ShownCellsCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isShown) ShownCellsCount++
            if (currCell.isMine && currCell.isMarked) flaggedMines.push(currCell)
        }
    }
    if (flaggedMines.length === gLevel.mines && ShownCellsCount === gLevel.size ** 2 - gLevel.mines) {
        return true
    }
    return false
}

function gameWon() {
    clearInterval(gGame.stopwatchInt);

    alert('congrats youve won!')
}