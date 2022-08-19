function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const generateBoard = (boardHeight, boardWidth, mineCount) => {
  var board = [];
  for (var i = 0; i < boardHeight; i++) {
    board[i] = [];
    for (var j = 0; j < boardWidth; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isFlagged: false,
        isMine: false,
        isRevealed: false,
        value: 0,
      };
    }
  }

  for (let i = 0; i < mineCount; ) {
    const randomY = getRandomInt(boardWidth);
    const randomX = getRandomInt(boardHeight);
    if (!board[randomX][randomY].isMine) {
      i++;
      board[randomX][randomY].isMine = true;
    }
  }

  for (let i = 0; i < boardHeight; i++)
    for (let j = 0; j < boardWidth; j++) {
      const neighborArray = getNeighbors(i, j, boardHeight, boardWidth);
      //console.log(neighborArray);
      neighborArray.forEach(([x, y]) => {
        //console.log(x,y);
        if (board[x][y].isMine) board[i][j].value++;
      });
    }
  return board;
};

function getNeighbors(i, j, boardHeight, boardWidth) {
  const neighbors = [];
  const neighborArray = [
    [i - 1, j - 1],
    [i, j - 1],
    [i + 1, j - 1],
    [i - 1, j],
    [i + 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
  ];
  //console.log(neighborArray);
  neighborArray.forEach(([x, y]) => {
    if (x > -1 && y > -1 && x < boardHeight && y < boardWidth) {
      neighbors.push([x, y]);
    }
  });
  return neighbors;
}

export const revealAllTiles = (board) => {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[0].length; j++) board[i][j].isRevealed = true;
  return board;
};

export const revealTiles = (x, y, board) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  board[x][y].isRevealed = true;
  if (board[x][y].value == 0) {
    let neighborArray = getNeighbors(x, y, boardHeight, boardWidth);
    neighborArray.forEach(([x, y]) => {
      if (
        (!board[x][y].isFlagged || !board[x][y].isMine) &&
        !board[x][y].isRevealed
      )
        board = revealTiles(x, y, board);
    });
  }
  return board;
};
