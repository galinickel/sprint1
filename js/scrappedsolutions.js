// function cellClicked(positionI, poisitionJ) {
//     if (!gGame.gameOn) firstUserClickHanlder(positionI, poisitionJ)
//     var currCell = gBoard[positionI][poisitionJ]
//     if (!currCell.isShown && !currCell.minesAroundCount && !currCell.isMine) expandNegsAround0(currCell.position.i, currCell.position.j)
    // if (currCell.isShown && !currCell.minesAroundCount) {
    //     for (var i = currCell.position.i - 1; i <= currCell.position.i + 1; i++) {
    //         if (i < 0 || i >= gBoard.length) continue;
    //         for (var j = currCell.position.j - 1; j <= currCell.position.j + 1; j++) {
    //             if (j < 0 || j >= gBoard[0].length) continue;
    //             var currNeg = gBoard[i][j]
    //             if (!currNeg.minesAroundCount) findNegsWhenMineCountZero(currNeg)
    //         }
    //     }
    // }
//     if (currCell.isMine) {
//         lifeDecrease()
//         if (!gGame.gameOn)emojiRender('dead')
//         else {emojiRender('mine')
//         setTimeout(function () {
//             currCell.isShown = false
//             renderBoard(gBoard)
//             return
//         }, 400);
//     }
//     }
//     if (currCell.isMarked) return
//     if (gGame.hintMode) hintUsed(currCell)
//     currCell.isShown = true
//     renderBoard(gBoard)
//     // gGame.lastClicked = currCell
//     if (checkIfVictory()) gameWon();
// }

// function undo() { 
//     gGame.lastClicked.isShown=false
//     renderBoard(gBoard)

// }


// function findNegsWhenMineCountZero(currCell) {
//     if (currCell.isMine) return
//     else {
//         var negsWith0Mines = []
//         for (var i = currCell.position.i - 1; i <= currCell.position.i + 1; i++) {
//             if (i < 0 || i >= gBoard.length) continue;
//             for (var j = currCell.position.j - 1; j <= currCell.position.j + 1; j++) {
//                 if (j < 0 || j >= gBoard[0].length) continue;
//                 var currNeg = gBoard[i][j]
//                 if (!currNeg.isShown && !currNeg.minesAroundCount) {
//                     negsWith0Mines.push(currNeg)
//                 } else {
//                     currNeg.isShown = true
//                     renderBoard(gBoard)
//                 }
//             }
//         }
//     }
//     for (var i = 0; i < negsWith0Mines.length; i++) {
//         var currNegInLoop = negsWith0Mines[i]
//         currNegInLoop.isShown = true
//         cellClicked(currNegInLoop.position.i, currNegInLoop.position.j)
//     }
// }