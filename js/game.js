var gLevel = {
    size: 4,
    mines: 2,
    lives: 0,
    safeClicks:0,
    hintCount: 1

}

var gGame = {
    gameOn: false,
    flagCount: 0,
    stopwatchStartTime: 0,
    stopwatchInt: null,
    livesCount: null,
    safeClickCount:0,
    hintMode: false,
    hintUsed: 0
}
var gBoard;


function cellClicked(positionI, poisitionJ) {
    if (!gGame.gameOn) firstUserClickHanlder(positionI, poisitionJ)
    var currCell = gBoard[positionI][poisitionJ]
    if (gGame.hintMode){hintUsed(currCell)
    return} 
    if (!currCell.isShown && !currCell.minesAroundCount && !currCell.isMine) expandNegsAround0(currCell.position.i, currCell.position.j)

    if (currCell.isMine) {
        lifeDecrease()
        if (!gGame.gameOn)emojiRender('dead')
        else {emojiRender('mine')
        setTimeout(function () {
            currCell.isShown = false
            renderBoard(gBoard)
            return
        }, 400);
    }
    }
    if (currCell.isMarked) return
    currCell.isShown = true
    renderBoard(gBoard)
    if (checkIfVictory()) gameWon();
}


function expandNegsAround0(posI, posJ) {
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === posI && j === posJ) continue;
            var currCell = gBoard[i][j];
            if (!currCell.isMine && !currCell.isShown) {
                gBoard[i][j].isShown = true;
                if (!currCell.minesAroundCount) expandNegsAround0( i, j);
            }
        }
    }
}


function cellRightClicked(positionI, poisitionJ) {
    if (!gGame.gameOn) firstUserClickHanlder()
    document.addEventListener('contextmenu', event => event.preventDefault());
    var currCell = gBoard[positionI][poisitionJ]
    if (!currCell.isMarked) currCell.isMarked = true;
    else {
        currCell.isMarked = false
    }
    renderBoard(gBoard)
    if (checkIfVictory()) {
        gameWon();
        return
    }
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
function gameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isShown = true
        }
    }
    emojiRender('dead')
    varReset()
}

function gameWon() {
    emojiRender('winner')
    clearInterval(gGame.stopwatchInt);
    gGame.gameOn = false;
}
function lifeDecrease() {
    if (gGame.hintMode) return
    gGame.livesCount--
    if (gGame.livesCount <= 0) gameOver()
    var elLives = document.querySelector('.life-container')
    elLives.innerText = ''
    for (var i = 0; i < gGame.livesCount; i++) {
        elLives.innerText += `🎈`
    }
}