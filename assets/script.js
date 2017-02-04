var board = []
var numClicks = 0
var cellsInPlay = []
var stage = 0
var moves = 0
var cellsPlayed = []

var gameLevels = [
  // [rows, cols, colorArr, color, unfilledArr, valueArr, moves],
  [2, 4, [ [0, 1], [0, 2], [0, 3] ], '#DBD56E', [], [0, 2, 3, 0, 0, 2, 5, 0], 3 ],
  [2, 3, [ [0, 1], [0, 2], [1, 1], [1, 2] ], '#DBD56E', [], [0, 4, 4, 0, 0, 0], 2 ],
  [2, 2, [ [0, 1], [1, 0], [1, 1] ], '#DBD56E', [], [0, 0, 9, 0], 6 ],
  [2, 3, [ [0, 0], [0, 1], [1, 1] ], '#FE5F55', [], [3, 8, 0, 0, 0, 4], 6 ],
  [3, 4, [ [0, 0], [0, 1], [0, 2], [1, 2] ], '#FE5F55', [[2, 0], [2, 3]], [4, 3, 3, 2, 0, 0, 0, 0, 0, 0], 6 ],
  [4, 2, [ [0, 0], [1, 0], [2, 0], [3, 0] ], '#FE5F55', [], [0, 7, 3, 0, 3, 0, 3, 0], 6 ],
  [4, 4, [ [0, 3], [1, 2], [2, 1] ], '#345995', [[0, 0], [3, 0], [3, 3]], [0, 1, 2, 0, 4, 4, 0, 0, 3, 4, 0, 0, 0], 7 ],
  [4, 2, [ [1, 0], [1, 1], [3, 1] ], '#345995', [], [0, 6, 0, 5, 0, 0, 6, 4], 7 ],
  [4, 3, [ [0, 1], [1, 0], [1, 2], [2, 0], [2, 2], [3, 1] ], '#345995', [], [0, 0, 0, 4, 0, 7, 4, 6, 3, 0, 0, 0], 7 ],
  [2, 3, [ [0, 0], [0, 1], [1, 1], [1, 2] ], '#DBD56E', [], [0, 4, 8, 9, 0, 7], 10 ],
  [4, 3, [ [0, 1], [0, 2], [1, 0], [1, 1], [2, 1], [2, 2], [3, 0], [3, 1], [3, 2] ], '#DBD56E', [[0, 0], [3, 2]], [5, 2, 3, 1, 0, 6, 1, 5, 0, 9], 12 ],
  [3, 3, [ [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2] ], '#DBD56E', [], [1, 1, 2, 4, 5, 2, 4, 3, 2], 9 ],
  [3, 4, [ [0, 2], [1, 0], [1, 1], [1, 2], [2, 2] ], '#FE5F55', [[0, 0], [0, 3]], [0, 2, 7, 4, 5, 0, 3, 0, 5, 4], 12 ],
  [4, 4, [ [1, 1], [1, 2], [2, 1], [2, 2] ], '#FE5F55', [ [0, 0], [0, 1], [1, 3], [2, 0], [3, 2], [3, 3] ], [4, 2, 6, 7, 0, 0, 7, 3, 4, 3], 12 ],
  [3, 3, [ [1, 1], [2, 1], [2, 2] ], '#FE5F55', [[0, 0], [0, 1], [1, 0]], [6, 0, 0, 9, 5, 4], 11 ],
  [4, 3, [ [0, 1], [1, 1], [2, 0], [2, 1], [2, 2], [3, 1] ], '#345995', [[0, 0], [3, 0]], [7, 0, 0, 0, 6, 7, 7, 4, 5, 0], 16 ],
  [3, 3, [ [0, 1], [0, 2], [1, 1], [2, 0], [2, 1] ], '#345995', [], [7, 7, 5, 0, 2, 0, 0, 9, 0], 12 ],
  [4, 3, [ [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 1], [3, 0], [3, 1], [3, 2] ], '#345995', [ [2, 0], [2, 2] ], [0, 0, 0, 3, 5, 5, 7, 0, 0, 0], 12 ]
]

// var movesPerLevel = [3, 2, 6, 6, 6, 6, 7, 7, 7, 10, 12, 9, 12, 12, 11, 16, 12, 12]

function Node (value, coords, color, idNum, filled = true) {
  this.value = value
  this.coords = coords
  this.color = color
  this.filled = filled
  this.idNum = idNum
  this.radius = 30
}

function sum (arr) {
  return arr.reduce(function (a, b) { return a + b })
}

function legalMove (startCell, endCell) {
  if ((startCell.filled && endCell.filled) && moves && startCell.value > 0) {
    if (Math.abs(sum(startCell.coords) - sum(endCell.coords)) === 1) {
      if (startCell.value + endCell.value <= 9 && startCell.value + endCell.value > 1) {
        return true
      }
    }
  } else {
    return false
  }
}

function merge (startCell, endCell) {
  endCell.value += startCell.value
  startCell.value = 0
  return endCell.value
}

function split (startCell, endCell) {
  if (startCell.value % 2 === 0) {
    endCell.value = startCell.value / 2
    startCell.value = startCell.value / 2
    return endCell.value
  } else {
    endCell.value = (startCell.value - 1) / 2
    startCell.value = (startCell.value + 1) / 2
    return endCell.value
  }
}

function objective (gameBoard) {
  var gameValues = gameBoard.map(function (gridCell) {
    if (gridCell.value === undefined) {
      return 0
    } else {
      return gridCell.value
    }
  })

  var avg = sum(gameValues) / solnCells(gameBoard).length
  return avg
}

function solnCells (gameBoard) {
  var solutionCells = gameBoard.filter(function (gridCell) {
    if (gridCell.color !== 'white' && gridCell.filled) {
      return gridCell
    }
  })
  return solutionCells
}

function checkWin (gameBoard) {
  var solutionCells = solnCells(gameBoard)

  var target = objective(gameBoard)

  for (var i = 0; i < solutionCells.length; i++) {
    if (solutionCells[i].value !== target) {
      return false
    }
  }

  return true
}

function gameOver (movesLeft) {
  if (!movesLeft) {
    setTimeout(function () { alert('Out of moves!') }, 500)
    return true
  } else {
    return false
  }
}

function makeGrid (rows, columns) {
  var count = 0
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var newNode = new Node(undefined, [i, j], 'white', count)
      board.push(newNode)
      count++
    }
  }
}

function setColors (colorArr, color) {
  // check if each set of coords in colorArr corresponds to each set of coords in the nodes
  for (var i = 0; i < colorArr.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (colorArr[i][0] === board[j].coords[0] && colorArr[i][1] === board[j].coords[1]) {
        board[j].color = color
      }
    }
  }
}

function setEmptyCell (unfilledArr) {
  // check if each set of coords in colorArr corresponds to each set of coords in the nodes
  for (var i = 0; i < unfilledArr.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (unfilledArr[i][0] === board[j].coords[0] && unfilledArr[i][1] === board[j].coords[1]) {
        board[j].filled = false
      }
    }
  }
}

function setValues (valueArr) {
  var removeUnfilled = []
  for (var i = 0; i < board.length; i++) {
    if (board[i].filled === true) {
      removeUnfilled.push(board[i])
    }
  }

  for (var j = 0; j < valueArr.length; j++) {
    removeUnfilled[j].value = valueArr[j]
  }
}

function setMoveLimit (maxMoves) {
  moves = maxMoves
}

function setGame (arr) {
  makeGrid(arr[0], arr[1])
  setColors(arr[2], arr[3])
  setEmptyCell(arr[4])
  setValues(arr[5])
  setMoveLimit(arr[6])
  phyGrid(board, arr[0], arr[1])
}

function restart (level) {
  board = []
  numClicks = 0
  cellsPlayed = []
  setGame(gameLevels[level])
}

var mainBoard = document.querySelector('.grid')

function drawPhyGrid (rows, columns) {
  var width = columns * 90
  var height = rows * 90
  mainBoard.style.width = width + 'px'
  mainBoard.style.height = height + 'px'
}

function removeAllChildren () {
  while (mainBoard.hasChildNodes()) {
    mainBoard.removeChild(mainBoard.lastChild)
  }
}

function makeNewChildren (gameBoard) {
  for (var i = 0; i < gameBoard.length; i++) {
    var square = document.createElement('div')
    // console.log(square)
    square.setAttribute('data-num', i)
    square.textContent = gameBoard[i].value
    square.style.borderRadius = '50%'
    square.style.background = gameBoard[i].color
    square.style.boxShadow = '2px 2px' // + gameBoard[i].color
    // console.log(board[i].filled)
    if (!gameBoard[i].filled) {
      square.style.visibility = 'hidden'
    }
    if (!gameBoard[i].value) {
      square.textContent = ''
    }
    mainBoard.appendChild(square)
  }
}

function phyGrid (gameBoard, rows, columns) {
  removeAllChildren()

  drawPhyGrid(rows, columns)

  makeNewChildren(gameBoard)

  var newChildren = document.querySelectorAll('.grid > div')
  // console.log(newChild)
  addListener(newChildren)
  updateAnnouncer()
}

function updateAnnouncer () {
  var announcer = document.querySelector('.goal')
  announcer.textContent = 'Obtain ' + objective(board) + ' in each colored node. Moves remaining: ' + moves
  // gameOver(moves)
}

function resetPlayingCells() {
  numClicks = 0
  cellsInPlay = []
}

function updatePlayingCells (item) {
  if (numClicks === 0) {
    var cellOne = board[item.getAttribute('data-num')]
    cellsInPlay.push(cellOne)
    numClicks++
  } else if (numClicks === 1) {
    var cellTwo = board[item.getAttribute('data-num')]
    if (cellTwo !== cellOne) {
      cellsInPlay.push(cellTwo)
      cellsPlayed.push(cellsInPlay)
      numClicks++
    } else {
      resetPlayingCells()
    }
  }
}

function evaluatePlayingCells (childArr, cellsArr) {
  if (legalMove(cellsArr[0], cellsArr[1])) {
    moves--
    updateAnnouncer()
    // if (cellsInPlay[1].value === 0) {
    //   split(cellsInPlay[0], cellsInPlay[1])
    //
    //   arr[cellsInPlay[0].idNum].textContent = cellsInPlay[0].value
    //   arr[cellsInPlay[1].idNum].textContent = cellsInPlay[1].value
    // } else {
    //   merge(cellsInPlay[0], cellsInPlay[1])
    //   arr[cellsInPlay[0].idNum].textContent = ''
    //   arr[cellsInPlay[1].idNum].textContent = cellsInPlay[1].value
    // }
    computePlayingCells (childArr, cellsInPlay)
  }
}

function computePlayingCells (childArr, cellsArr) {
  if (cellsArr[1].value === 0) {
    split(cellsArr[0], cellsArr[1])

    childArr[cellsArr[0].idNum].textContent = cellsArr[0].value
    childArr[cellsArr[1].idNum].textContent = cellsArr[1].value
  } else {
    merge(cellsArr[0], cellsArr[1])
    childArr[cellsArr[0].idNum].textContent = ''
    childArr[cellsArr[1].idNum].textContent = cellsArr[1].value
  }
}

function undoLastMove (arr) {
  if (arr.length) {
    var lastMove = arr.pop()
    lastMove.reverse()
    var newChildren = document.querySelectorAll('.grid > div')
    computePlayingCells(newChildren, lastMove)
    moves++
    resetPlayingCells()
    updateAnnouncer()
  }
}

function announceWin () {
    setTimeout(function () { alert('Congratulations, you move on to the next level!') }, 500)
    stage++
    setTimeout(function () {restart(stage)}, 500)
}

restart(stage)

// var nodes = document.querySelectorAll('.container > div')

function addListener (arr) {
  arr.forEach(function (item) {
    item.addEventListener('click', function () {
      if (board[item.getAttribute('data-num')].filled) {
        updatePlayingCells(item)

        if (numClicks === 2) {
          evaluatePlayingCells(arr, cellsInPlay)

          if (checkWin(board)) {
            announceWin()
          } else if (!checkWin(board) && !moves) {
            gameOver(moves)
          }

          resetPlayingCells()
        }
      }
    })
  })
}

var restartBtn = document.querySelector('.restart')

restartBtn.addEventListener('click', function () {
  restart(stage)
})

var undoBtn = document.querySelector('.undo')

undoBtn.addEventListener('click', function () {
  undoLastMove(cellsPlayed)
})
