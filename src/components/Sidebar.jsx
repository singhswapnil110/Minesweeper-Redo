import React, { useContext } from "react";
import { ThemeContext } from "../App";
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";
import { Form } from "./Form";
import { styles } from "../styles/themeStyles";
import Github from "../assets/github.png";

export const Sidebar = ({ createBoard, updateModalStatus }) => {
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <div
      className="sidebar"
      style={styles[`${theme}`].Sidebar.sidebarContainer}
    >
      <div
        className="toggle-button"
        onClick={toggleTheme}
        style={styles[`${theme}`].Sidebar.toggleButton}
      >
        {theme == "light" ? (
          <img src={Moon} alt="Moon" className="moon" />
        ) : (
          <img src={Sun} alt="Sun" className="sun" />
        )}
      </div>
      <Form handleSubmit={createBoard} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className="wall-button"
          style={styles[`${theme}`].Sidebar.wallButton}
          onClick={(e) => {
            updateModalStatus("highScoreModal", true);
            e.stopPropagation();
          }}
        >
          Wall of Fame
        </button>
        <a
          href="https://github.com/singhswapnil110/Minesweeper-Redo"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            width: "100%",
          }}
        >
          <button
            className="wall-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "10px auto",
              background: "whitesmoke",
              color: "purple",
              border: "1px solid purple",
            }}
          >
            View Code
            <img src={Github} style={{ width: "40px" }} />
          </button>
        </a>
      </div>
    </div>
  );
};
