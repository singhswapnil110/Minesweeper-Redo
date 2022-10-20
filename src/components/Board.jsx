import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../customHooks";
import { generateBoard, revealTiles, revealAllTiles } from "../gameLogic";
import { Tile } from "./Tile";
import { WinLossModal } from "./WinLossModal";
import { HighScoreModal } from "./HighScoreModal";
import { Sidebar } from "./Sidebar";
import { styles } from "../styles/themeStyles";
import { dummyScoreData } from "../dummyScoreData";

export const Board = () => {
  const theme = useTheme();
  const [mines, setMines] = useState(10);
  const [board, setBoard] = useState([[]]);
  const [mineCount, setMineCount] = useState(mines);
  const [timer, setTimer] = useState(0);
  const [isLive, setLive] = useState(false);
  const [modalStatus, setModalStatus] = useState({
    winLossModal: false,
    highScoreModal: false,
  });
  const [gameStatus, setGameStatus] = useState(0); // 0 - No Result, 1 - Game Lost, 2 - Game Won
  const [scoreList, setScoreList] = useState(
    JSON.parse(localStorage.getItem("scoreList")) || dummyScoreData
  );

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

  useEffect(() => {
    setBoard(generateBoard(10, 10, mines));
  }, []);

  function updateModalStatus(name, value) {
    setModalStatus({ ...modalStatus, [name]: value });
  }

  function createBoard(rows, columns, mines) {
    setBoard(generateBoard(rows, columns, mines));
    setMines(mines);
    setMineCount(mines);
    setLive(false);
    setTimer(0);
    setGameStatus(0);
    updateModalStatus("winLossModal", false);
  }

  function resetBoard() {
    const rows = board ? board.length : 10;
    const columns = board[0] ? board[0].length : 10;
    const Mines = mines ? mines : 10;
    createBoard(rows, columns, Mines);
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
      updateModalStatus("winLossModal", true);
      setLive(false);
    }
  }

  function saveSuccess(name) {
    const newScoreList = [...scoreList];
    const score = Math.floor(
      (mines * mines * mines * 1000) / (timer * board.length * board[0].length)
    );
    const scoreObj = {
      name: name,
      score: score,
      boardDetails: {
        rows: board.length,
        columns: board[0].length,
        mines: mines,
      },
    };
    newScoreList.push(scoreObj);
    newScoreList.sort((a, b) => (a.score < b.score ? 1 : -1));
    setScoreList(newScoreList);
    localStorage.setItem("scoreList", JSON.stringify(newScoreList));
  }

  function setFlag(x, y) {
    if (!isLive && !gameStatus) setLive(true);
    const newBoard = [...board];
    if ((mineCount > 0 || board[x][y].isFlagged) && gameStatus == 0) {
      newBoard[x][y].isFlagged = !board[x][y].isFlagged;
      setBoard(newBoard);
      if (newBoard[x][y].isFlagged) setMineCount((mineCount) => mineCount - 1);
      else setMineCount((mineCount) => mineCount + 1);
    }
    if (!gameStatus) checkSuccess();
  }

  function showTiles(x, y) {
    if (!isLive && !gameStatus) setLive(true);
    let newBoard = [...board];
    if (!board[x][y].isFlagged && gameStatus == 0) {
      if (board[x][y].isMine) {
        newBoard[x][y].value = -1;
        newBoard = revealAllTiles(newBoard);
        setLive(false);
        setGameStatus(1);
        updateModalStatus("winLossModal", true);
      } else if (board[x][y].value) newBoard[x][y].isRevealed = true;
      else {
        newBoard = revealTiles(x, y, newBoard);
      }
    }
    setBoard(newBoard);
    if (!gameStatus) checkSuccess();
  }

  return (
    <div className="Parent">
      <WinLossModal
        gameStatus={gameStatus}
        updateModalStatus={updateModalStatus}
        resetBoard={resetBoard}
        saveSuccess={saveSuccess}
        visible={modalStatus.winLossModal}
      />
      <HighScoreModal
        updateModalStatus={updateModalStatus}
        scoreList={scoreList}
        visible={modalStatus.highScoreModal}
      />
      <div
        className="container"
        style={styles[`${theme}`].BoardStyles.container}
      >
        <div
          className="board-container"
          style={styles[`${theme}`].BoardStyles.boardContainer}
        >
          <div className="Header" style={styles[`${theme}`].BoardStyles.header}>
            <div
              className="Header-item"
              style={styles[`${theme}`].BoardStyles.headerItem}
            >
              {timer}
            </div>
            <div
              className="Header-item"
              style={styles[`${theme}`].BoardStyles.headerItem}
            >
              {mineCount}
            </div>
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
      </div>
      <Sidebar
        createBoard={createBoard}
        updateModalStatus={updateModalStatus}
      />
    </div>
  );
};
