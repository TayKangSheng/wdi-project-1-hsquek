
var board = []
var numClicks = 0
var cellsInPlay = []
var stage = 0

var gameLevels = [
  // [rows, cols, colorArr, color, unfilledArr, valueArr],
  [2, 4, [ [0, 1], [0, 2], [0, 3] ], 'brown', [], [0, 2, 3, 0, 0, 2, 5, 0] ],
  [2, 3, [ [0, 1], [0, 2], [1, 1], [1, 2] ], 'brown', [], [0, 4, 4, 0, 0, 0] ],
  [2, 2, [ [0, 1], [1, 0], [1, 1] ], 'brown', [], [0, 0, 9, 0] ],
  [2, 3, [ [0, 0], [0, 1], [1, 1] ], 'green', [], [3, 8, 0, 0, 0, 4] ],
  [3, 4, [ [0, 0], [0, 1], [0, 2], [1, 2] ], 'green', [[2, 0], [2, 3]], [4, 3, 3, 2, 0, 0, 0, 0, 0, 0]],
  [4, 2, [ [0, 0], [1, 0], [2, 0], [3, 0] ], 'green', [], [0, 7, 3, 0, 3, 0, 3, 0]],
  [4, 4, [ [0, 3], [1, 2], [2, 1] ], 'brown', [[0, 0], [3, 0], [3, 3]], [0, 1, 2, 0, 4, 4, 0, 0, 3, 4, 0, 0, 0] ],
  [4, 2, [ [1, 0], [1, 1], [3, 1] ], 'brown', [], [0, 6, 0, 5, 0, 0, 6, 4] ],
  [4, 3, [ [0, 1], [1, 0], [1, 2], [2, 0], [2, 2], [3, 1] ], 'brown', [], [0, 0, 0, 4, 0, 7, 4, 6, 3, 0, 0, 0] ],
  [2, 3, [ [0, 0], [0, 1], [1, 1], [1, 2] ], 'maroon', [], [0, 4, 8, 9, 0, 7] ],
  [4, 3, [ [0, 1], [0, 2], [1, 0], [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] ], 'maroon', [[0, 0], [3, 2]], [5, 2, 3, 1, 0, 6, 1, 5, 0, 9] ],
  [3, 3, [ [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2] ], 'maroon', [], [1, 1, 2, 4, 5, 2, 4, 3, 2] ]
  [3, 4, [ [0, 2], [1, 0], [1, 1], [1, 2], [2, 2] ], 'blue', [[0, 0], [0, 3]], [0, 2, 7, 4, 5, 0, 3, 0, 5, 4] ],
  [4, 4, [ [1, 1], [1, 2], [2, 1], [2, 2] ], 'blue', [ [0, 0], [0, 1], [1, 3], [2, 0], [3, 2], [3, 3] ], [4, 2, 6, 7, 0, 0, 7, 3, 4, 3] ],
  [3, 3, [ [1, 1], [2, 1], [2, 2] ], 'blue', [[0, 0], [0, 1], [1, 0]], [6, 0, 0, 9, 5, 4] ],
  [4, 3, [ [0, 1], [1, 1], [2, 0], [2, 1], [2, 2], [3, 1] ], 'gold', [[0, 0], [3, 0]], [7, 0, 0, 0, 6, 7, 7, 4, 5, 0] ],
  [3, 3, [ [0, 1], [0, 2], [1, 1], [2, 0], [2, 1] ], 'gold', [], [7, 7, 5, 0, 2, 0, 0, 9, 0] ],
  [3, 4, [ [0, 2], [0, 3], [1, 0], [1, 1], [1, 3], [2, 2], [2, 3] ], 'gold', [ [0, 0], [2, 0] ] ]
]

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
  if (startCell.filled && endCell.filled) {
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
  // if (legalMove(startCell, endCell)) {
  endCell.value += startCell.value
  startCell.value = 0
  return endCell.value
    // startCell.value = 0
  // }
}

function split (startCell, endCell) {
  // if (legalMove(startCell, endCell)) {
  if (startCell.value % 2 === 0) {
    endCell.value = startCell.value / 2
    startCell.value = startCell.value / 2
    return endCell.value
      // startCell.value = startCell.value / 2
  } else {
    endCell.value = (startCell.value - 1) / 2
    startCell.value = (startCell.value + 1) / 2
    return endCell.value
      // startCell.value = (startCell.value + 1) / 2
  }
  // }
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

function setGame (arr) {
  makeGrid(arr[0], arr[1])
  setColors(arr[2], arr[3])
  setEmptyCell(arr[4])
  setValues(arr[5])
  phyGrid(board, arr[0], arr[1])
}

function restart (level) {
  board = []
  numClicks = 0
  setGame(gameLevels[level])
}

var mainBoard = document.querySelector('.container')



function phyGrid (gameboard, rows, columns) {
  var allSquares = document.querySelectorAll('.container > div')
  // console.log(allSquares.length)

  while (mainBoard.hasChildNodes()) {
    mainBoard.removeChild(mainBoard.lastChild)
  }

  var width = columns * 90
  var height = rows * 90
  mainBoard.style.width = width + 'px'
  mainBoard.style.height = height + 'px'

  for (var i = 0; i < gameboard.length; i++) {
    var square = document.createElement('div')
    // console.log(square)
    square.setAttribute('data-num', i)
    square.textContent = board[i].value
    square.style.borderRadius = '50%'
    square.style.background = board[i].color
    square.style.boxShadow = '2px 2px' + board[i].color
    // console.log(board[i].filled)
    if (!board[i].filled) {
      square.style.visibility = 'hidden'
    }
    if (!board[i].value) {
      square.textContent = ''
    }
    mainBoard.appendChild(square)
  }
  var newChild = document.querySelectorAll('.container > div')
  // console.log(newChild)
  addListener(newChild)
}

restart(stage)

// function listener() {
//
// }

// console.log(nodes)
// console.log(board[(nodes[1].getAttribute('data-num'))])
var nodes = document.querySelectorAll('.container > div')

// function listener() {
function addListener (arr) {
  arr.forEach(function (item) {
    item.addEventListener('click', function () {
    // console.log(board)
      console.log(arr)
      console.log(board)
      console.log(this)
      if (board[item.getAttribute('data-num')].filled) {
        if (numClicks === 0) {
          var cellOne = board[item.getAttribute('data-num')]
        // console.log(cellOne)
          cellsInPlay.push(cellOne)
          numClicks++
        } else if (numClicks === 1) {
          var cellTwo = board[item.getAttribute('data-num')]
          if (cellTwo !== cellOne) {
            cellsInPlay.push(cellTwo)
            numClicks++
          }
        }
        if (numClicks === 2) {
          if (legalMove(cellsInPlay[0], cellsInPlay[1])) {
            if (cellsInPlay[1].value === 0) {
            // console.log(cellsInPlay[0])
              // console.log(arr[cellsInPlay[0].idNum])
              // console.log(arr[cellsInPlay[1].idNum])
              split(cellsInPlay[0], cellsInPlay[1])
            // console.log(cellsInPlay[1])

              arr[cellsInPlay[0].idNum].textContent = cellsInPlay[0].value
              arr[cellsInPlay[1].idNum].textContent = cellsInPlay[1].value
            } else {
              // console.log(arr[cellsInPlay[0].idNum])
              // console.log(arr[cellsInPlay[1].idNum])
              merge(cellsInPlay[0], cellsInPlay[1])
              arr[cellsInPlay[0].idNum].textContent = cellsInPlay[0].value
              arr[cellsInPlay[1].idNum].textContent = cellsInPlay[1].value
            }
          }

          if (checkWin(board)) {
            alert('game won')
            stage++
            restart(stage)
          }

          numClicks = 0
          cellsInPlay = []
        }
      }
    })
  })
}
