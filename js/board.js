function createMat(num) {
    var board = [];
    for (var i = 0; i < num; i++) {
        board.push([]);
        for (var j = 0; j < num; j++) {
            board[i][j] = {
                position: {
                    i: i,
                    j: j
                },
                isMarked: false,
                isMine: false,
                isShown: false,
                minesAroundCount: 0,
            }
        }
    }
    return board;

}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) continue
            currCell.minesAroundCount = countNegs(i, j, gBoard);
        }
    }
}

function countNegs(cellI, cellJ, board) {
    var mineNegs = 0
    for (var i = cellI-1; i <= cellI+1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ-1; j <= cellJ+1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            var currCell = board[i][j]
            if (currCell === board[cellI][cellJ]) continue
            if (currCell.isMine === true) {
                mineNegs++
            }
        }
    }
    return mineNegs
}


function buildBoard(level, mines) {
    var board = createMat(level)
    var i = 0
    while (i < mines) {
        var currCell = board[getRandomInt(0, level - 1)][getRandomInt(0, level - 1)]
        if (currCell.isMine) continue
        else currCell.isMine = true;
    
        i++
    }
    return board
}

function renderBoard(board) {
    
    var strHtml = `<table class="board">`;
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (cell.isMarked)  strHtml +=` <td class="cell cell${cell.position.i},${cell.position.j}"  onclick="cellClicked(${i},${j},this)" oncontextmenu="cellRightClicked(${i},${j})">🚩</td>`
            else if (cell.isShown && cell.isMine) strHtml += ` <td class="cell cell${cell.position.i},${cell.position.j}, mine"  onclick="cellClicked(${i},${j},this)">💣</td>`
            else if (!cell.isShown) strHtml += ` <td class="cell cell${cell.position.i},${cell.position.j}"  onclick="cellClicked(${i},${j},this)" oncontextmenu="cellRightClicked(${i},${j})"> </td>`
            else if (!cell.isMine && cell.isShown) strHtml += ` <td class="cell cell${cell.position.i},${cell.position.j}, picked" onclick="cellClicked(${i},${j},this)">${cell.minesAroundCount}</td>`
        
        }
        strHtml += '</tr>'
    }
    strHtml += '</table>'
    var elBoard = document.querySelector('.game-container');
    elBoard.innerHTML = strHtml;
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}