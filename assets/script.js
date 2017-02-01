
var board = []

function Node (value, coords, color, filled = true) {
  this.value = value
  this.coords = coords
  this.color = color
  this.filled = filled
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
  if (legalMove(startCell, endCell)) {
    endCell.value += startCell.value
    startCell.value = 0
    return endCell.value
    // startCell.value = 0
  }
}

function split (startCell, endCell) {
  if (legalMove(startCell, endCell)) {
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
  }
}

function checkWin (gameBoard) {
  var solutionCells = gameBoard.filter(function (gridCell) {
    if (gridCell.color !== 'white' && gridCell.filled) {
      return gridCell
    }
  })

  var gameValues = gameBoard.map(function (gridCell) {
    if (gridCell.value === undefined) {
      return 0
    } else {
      return gridCell.value
    }
  })

  var average = sum(gameValues) / solutionCells.length
  for (var i = 0; i < solutionCells.length; i++) {
    // console.log(i + 'th cell value: ' + solutionCells[i].value)
    if (solutionCells[i].value !== average) {
      return false
    }
  }

  return true
}


function makeGrid (rows, columns) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var newNode = new Node(undefined, [i, j], 'white')
      board.push(newNode)
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

function makeGame (rows, columns, colorArr, color, unfilledArr, valueArr) {
  makeGrid(rows, columns)
  setColors(colorArr, color)
  setEmptyCell(unfilledArr)
  setValues(valueArr)
  phyGrid(board, rows, columns)
}

function restart () {
  board = []
  numClicks = 0
  makeGrid(3, 3)
  setColors([[1, 1], [2, 2]], 'green')
  setEmptyCell([[0, 1], [0, 2]])
  setValues([0, 3, 3, 3, 0, 0, 3])
  phyGrid(board, 3, 3)
}
// createBoard(3, 3, [[0, 0], [1, 1], [2, 2]], [[0, 1], [0, 2]])
// console.log(board)
// console.log(board)

// console.log(checkWin(board))
// console.log(board)
// console.log(sum(board[4].coords))

// board[5].value = 0
// console.log(legalMove(board[8], board[5]))
// split(board[8], board[5])
// console.log(board[5].value)
// console.log(board)

var mainBoard = document.querySelector('.container')

function phyGrid (gameboard, rows, columns) {
  var allSquares = document.querySelectorAll('.container > div')
  console.log(allSquares.length)

  while (mainBoard.hasChildNodes()) {
    mainBoard.removeChild(mainBoard.lastChild)
  }

  var width = columns * 90
  var height = rows * 90
  mainBoard.style.width = width + 'px'
  mainBoard.style.height = height + 'px'

  for (var i = 0; i < board.length; i++) {
    var square = document.createElement('div')
    console.log('adding square ' + i)
    square.setAttribute('data-num', i)
    square.textContent = board[i].value
    square.style.borderRadius = '50%'
    square.style.background = board[i].color
    mainBoard.appendChild(square)
  }
}

restart()

var nodes = document.querySelectorAll('.container > div')
var numClicks = 0
var cellsInPlay = []

// console.log(nodes)
// console.log(board[(nodes[1].getAttribute('data-num'))])

nodes.forEach(function (node) {
  node.addEventListener('click', function () {
    console.log(board)
    if (board[node.getAttribute('data-num')].filled) {
      if (numClicks === 0) {
        var cellOne = board[node.getAttribute('data-num')]
        // console.log(cellOne)
        cellsInPlay.push(cellOne)
        numClicks++
      } else if (numClicks === 1) {
        var cellTwo = board[node.getAttribute('data-num')]
        cellsInPlay.push(cellTwo)
        numClicks++
      }
      if (numClicks === 2) {
        if (legalMove(cellsInPlay[0], cellsInPlay[1])) {
          if (cellsInPlay[1].value === 0) {
            console.log(cellsInPlay[0])
            split(cellsInPlay[0], cellsInPlay[1])
            console.log(cellsInPlay[1])
            nodes[board.indexOf(cellsInPlay[0])].textContent = cellsInPlay[0].value
            nodes[board.indexOf(cellsInPlay[1])].textContent = cellsInPlay[1].value
          } else {
            merge(cellsInPlay[0], cellsInPlay[1])
            nodes[board.indexOf(cellsInPlay[0])].textContent = cellsInPlay[0].value
            nodes[board.indexOf(cellsInPlay[1])].textContent = cellsInPlay[1].value
            // alert(checkWin(board))
          }
        }
        // console.log('Checkwin: ' + checkWin(board));
        if (checkWin(board)) {
          alert('game won')
          restart()
        } else {
          numClicks = 0
          cellsInPlay = []
        }
      }
    }
  })
})
