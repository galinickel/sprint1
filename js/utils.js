'use strict'

function init() {
    gGame.gameOn = false
    gGame.safeClickCount = 0
    emojiRender('normal')
    gBoard = (buildBoard(gLevel.size, gLevel.mines))
    renderBoard(gBoard)
    var stopwatchEl = document.querySelector('.stopwatch-container');
    varReset()
    stopwatchEl.innerText = `Score: 0:000`
    var hintUsedEl = document.querySelector('.hint-span')
    hintUsedEl.innerText = gLevel.hintCount - gGame.hintUsed
}
function varReset() {
    var safeClickEl = document.querySelector('.safe-span')
    safeClickEl.innerHTML = `${gLevel.safeClicks} Left`
    clearInterval(gGame.stopwatchInt)
    gGame.hintMode = false
    gGame.flagCount = 0
    gGame.gameOn = false;
    gGame.stopwatchInt = null;
    gGame.livesCount = gLevel.lives;
    gGame.hintUsed = 0
    var elLives = document.querySelector('.life-container')
    elLives.innerText = ''
    for (var i = 0; i < gLevel.lives; i++) {
        elLives.innerText += `🎈`
    }
}
function difficultyLevelPicker(difficultyLevel) {
    switch (difficultyLevel) {
        case 'easy':
            gLevel.size = 4
            gLevel.mines = 2
            gLevel.lives = 0
            gLevel.safeClicks = 0
            gLevel.hintCount = 1
            break;
        case 'medium':
            gLevel.size = 8
            gLevel.mines = 12
            gLevel.lives = 2
            gLevel.safeClicks = 3
            gLevel.hintCount = 2
            break;
        case 'hard':
            gLevel.size = 12
            gLevel.mines = 30
            gLevel.lives = 3
            gLevel.safeClicks = 4
            gLevel.hintCount = 3
            break;
    }
    init()
}

function startStopwatch() {
    gGame.stopwatchStartTime = new Date();
    runStopwatch()
    gGame.stopwatchInt = setInterval(runStopwatch, 30);
}

function runStopwatch() {
    if (!gGame.gameOn) {
        var finalTime = (new Date() - gGame.stopwatchStartTime) / 1000
        localStorage.setItem("highscore", finalTime);
        clearInterval(gGame.stopwatchInt);
    }
    var currTime = (new Date() - gGame.stopwatchStartTime) / 1000
    var stopwatchEl = document.querySelector('.stopwatch-container');
    stopwatchEl.innerText = `Score: ${currTime}`
    // if (gHighScore > time) gHighScore = time
    // localStorage.setItem("highscore", time);

}

function firstUserClickHanlder(cellToAvoidI, cellToAvoidJ) {
    gGame.gameOn = true;
    gBoard = (buildBoard(gLevel.size, gLevel.mines, cellToAvoidI, cellToAvoidJ))
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    startStopwatch()
}

function emojiRender(state) {
    var elEmoji = document.querySelector('.emoji-container')
    switch (state) {
        case 'normal':
            elEmoji.innerText = `😊`
            break;
        case 'winner':
            elEmoji.innerText = `🤠`
            break;
        case 'dead':
            elEmoji.innerText = `😞`
            break;
        case 'mine':
            elEmoji.innerText = `🤕`
            if (gGame.gameOn) {}
            setTimeout(function () {
                emojiRender('normal')
            }, 400);
            break;
    }
}

function hintModeToggle() {
    var elHintBox = document.querySelector('.hint-btn span')
    if (gGame.hintMode) {
        elHintBox.style["textShadow"] = "none";
        gGame.hintMode = false
    } else {
        gGame.hintMode = true
        elHintBox.style["textShadow"] = "0 0 5px yellow";
    }

}
function hintMode() {
    if (gGame.hintUsed <= 0) return

    var hintUsedEl = document.querySelector('.hint-span')
    hintUsedEl.innerText = gLevel.hintCount - gGame.hintUsed
}
function hintUsed(currCell) {
    if (gGame.hintUsed === gLevel.hintCount) return
    var cellsShown = []
    //gather all neighbors
    for (var i = currCell.position.i - 1; i <= currCell.position.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = currCell.position.j - 1; j <= currCell.position.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            var currNeg = gBoard[i][j];
            currNeg.isShown = true;
            cellsShown.push(currNeg)
            renderBoard(gBoard)

        }
    }
    setTimeout(() => {
        for (var i = 0; i < cellsShown.length; i++) {
            cellsShown[i].isShown = false
        }
        currCell.isShown=false
        renderBoard(gBoard)
    }, 400);

    gGame.hintUsed++
    var hintUsedEl = document.querySelector('.hint-span')
    hintUsedEl.innerText = gLevel.hintCount - gGame.hintUsed
    hintModeToggle()
}
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}