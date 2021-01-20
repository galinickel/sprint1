

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

function firstUserClickHanlder() { 
    gGame.gameOn = true;
    gBoard = (buildBoard(gLevel.size, gLevel.mines))
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    startStopwatch()
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}