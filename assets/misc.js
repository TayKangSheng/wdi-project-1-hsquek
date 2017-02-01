// canvas = document.getElementById('canvas')
// ctx = canvas.getContext('2d')
//
// function drawNode (x, y, radius, color, value, coords) {
//   ctx.fillStyle = color
//   ctx.strokeStyle = 'black'
//   ctx.beginPath()
//   ctx.arc(x, y, radius, 0, Math.PI * 2, true)
//   ctx.fill()
//   ctx.stroke()
//
//   ctx.fillStyle = 'black'
//   ctx.font = '20px Arial'
//   ctx.textAlign = 'center'
//   ctx.textBaseline = 'center'
//   ctx.fillText(value + ' ' + coords, x, y + 10)
// }
//
// function drawBoard (rows, columns, gameboard) {
//   var n = 0
//   for (var i = 0; i < rows; i++) {
//     for (var j = 0; j < columns; j++) {
//       // console.log("row: " + i + "col: " + j + " " + gameboard[n].radius + " " + gameboard[n].color)
//       if (gameboard[n].filled) {
//         drawNode(j * 80 + 50, i * 80 + 50, gameboard[n].radius, gameboard[n].color, gameboard[n].value, gameboard[n].coords)
//       }
//
//       n++
//     }
//   }
// }

// var $mainBoard = $('.container')
//
// function phyGrid (gameboard, rows, columns) {
//   $mainBoard.width(columns * 90).height(rows * 90)
//   for (var i = 0; i < gameboard.length; i++) {
//     var newSquare = ('<div>' + gameboard[i].value + '</div>')
//     $mainBoard.append(newSquare)
//   }
//
//   var $nodes = $('.container > div')
//   for (var i = 0; i < gameboard.length; i++) {
//     $nodes[i-1] = gameboard[i]
//     $nodes.css('background', gameboard[i].color)
//     $nodes.css('border-radius', '100%')
//     $nodes.css('font-size', '20px')
//     $nodes.attr('id', i)
//   }
// }
//
// phyGrid(board, 4, 5)
//
// var $nodes = $('.container > div')
// console.log($nodes)
//
// var numClicks = 0
//
// $nodes.on('click', function () {
//   // console.log('This is ' + board[$nodes.index($(this))].filled)
//   // console.log($(this).filled)
//   // console.log(numClicks)
//
//
//
//
//   })

//     if (numClicks === 2) {
//       // console.log('that is ' + that.filled)
//       // console.log('this is ' + recent.filled)
//       if (legalMove(cellsInPlay[0], cellsInPlay[1])) {
//
//
//         // var one = $('#' + board.indexOf(cellsInPlay[0]))
//         // var two = $('#' + board.indexOf(cellsInPlay[1]))
//         // if (cellsInPlay[1].value === 0) {
//           // $nodes[board.indexOf(cellsInPlay[1])].text(split(cellsInPlay[0], cellsInPlay[1]))
//           // $nodes[board.indexOf(cellsInPlay[0])].text(cellsInPlay[0].value - split(cellsInPlay[0], cellsInPlay[1]))
//           // $nodes[1].text('hello')
//         // } else {
//           // $nodes[board.indexOf(cellsInPlay[1])].text(merge(cellsInPlay[0], cellsInPlay[1]))
//           // $nodes[board.indexOf(cellsInPlay[0])].text(0)
//           // $nodes[2].text('hello')
//         }
//         numClicks = 0
//         cellsInPlay = []
//       }
//     }
//   // }
// })

  // var n = 0
  // $nodes.forEach(function (node) {
  //   node.text('board[n].value')
  //   n++
  // })

// drawNode(100, 100, 70, 'green', 8)
// drawBoard(4, 5, board)
