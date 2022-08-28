import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateBoard, revealTiles, revealAllTiles } from "../gameLogic";
import { Tile } from "./Tile";
export const Board = () => {
  const [mines, setMines] = useState(10);
  const [board, setBoard] = useState(generateBoard(8, 8, mines));
  const [mineCount, setMineCount] = useState(mines);
  const [timer, setTimer] = useState(0);
  const [isLive, setLive] = useState(false);
  const [gameStatus, setGameStatus] = useState(0); // 0 - No Result, 1 - Game Lost, 2 - Game Won

  useEffect(() => {
    if (isLive)
      var timerID = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    else if (timerID && !isLive) clearInterval(timerID);
    return () => {
      clearInterval(timerID);
    };
  }, [isLive]);

  function handleSubmit(e) {
    const rows = e.target.Rows.value;
    const columns = e.target.Columns.value;
    const mines = e.target.Mines.value;
    setBoard(generateBoard(rows, columns, mines));
    setMines(mines);
    setMineCount(mines);
    setLive(false);
    setTimer(0);
    setGameStatus(0);
    e.preventDefault();
  }

  function checkSuccess() {
    let mineCheck = 0;
    let revealedCheck = 0;
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j].isMine) {
          if (board[i][j].isFlagged) mineCheck++;
          else if (board[i][j].isRevealed) revealedCheck++;
        }
      }

    if (
      mineCheck == mines ||
      revealedCheck == board.length * board[0].length - mines
    ) {
      setGameStatus(2);
      setLive(false);
    }
  }

  function setFlag(x, y) {
    if (!isLive) setLive(true);
    const newBoard = [...board];
    newBoard[x][y].isFlagged = !board[x][y].isFlagged;
    console.log(board[x][y].isFlagged);
    setBoard(newBoard);
    setMineCount((mineCount) => mineCount - 1);
    checkSuccess();
  }

  function showTiles(x, y) {
    if (!isLive) setLive(true);
    let newBoard = [...board];
    if (!board[x][y].isFlagged) {
      if (board[x][y].isMine) {
        newBoard[x][y].value = -1;
        newBoard = revealAllTiles(newBoard);
        setLive(false);
        setGameStatus(1);
      } else if (board[x][y].value) newBoard[x][y].isRevealed = true;
      else {
        newBoard = revealTiles(x, y, newBoard);
      }
    }
    setBoard(newBoard);
    checkSuccess();
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Rows</label>
          <input name="Rows" type="number" required defaultValue={8} />
          <label>Columns</label>
          <input placeholder="Columns" name="Columns" type="number" required />
          <label>Mines</label>
          <input name="Mines" type="number" required />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="Container">
        <div className="Header">
          <div className="Header-item">{timer}</div>
          <div className="Header-item">
            {gameStatus == 2 ? "You Win" : gameStatus == 1 ? "You Lose" : ""}
          </div>
          <div className="Header-item">{mineCount}</div>
        </div>
        <div
          className="Board"
          style={{
            gridTemplateRows: `repeat(${board.length}, 1fr)`,
            gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
          }}
        >
          {board.map((tileRow) =>
            tileRow.map((tile) => (
              <Tile
                {...tile}
                setFlag={setFlag}
                showTiles={showTiles}
                key={uuidv4()}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
