import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateBoard, revealTiles, revealAllTiles } from "../gameLogic";
import { Tile } from "./Tile";
export const Board = () => {
  const [board, setBoard] = useState(generateBoard(8, 8, 2));
  const [mineCount, setMineCount] = useState(20);
  const [timer, setTimer] = useState(0);
  const [isLive, setLive] = useState(false);

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

  function setFlag(x, y) {
    if (!isLive) setLive(true);
    const newBoard = [...board];
    newBoard[x][y].isFlagged = !board[x][y].isFlagged;
    console.log(board[x][y].isFlagged);
    setBoard(newBoard);
    setMineCount((mineCount) => mineCount - 1);
  }

  function showTiles(x, y) {
    if (!isLive) setLive(true);
    let newBoard = [...board];
    if (!board[x][y].isFlagged) {
      if (board[x][y].isMine) {
        newBoard[x][y].value = -1;
        newBoard = revealAllTiles(newBoard);
        setLive(false);
      } else if (board[x][y].value) newBoard[x][y].isRevealed = true;
      else {
        newBoard = revealTiles(x, y, newBoard);
      }
    }
    setBoard(newBoard);
  }

  return (
    <div className="Container">
      <div className="Header">
        <div className="Header-item">{timer}</div>
        <div className="Header-item">{mineCount}</div>
      </div>
      <div className="Board">
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
  );
};
