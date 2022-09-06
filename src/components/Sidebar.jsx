import React, { useContext } from "react";
import { ThemeContext } from "../App";
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";
import { Form } from "./Form";
import { styles } from "../styles/themeStyles";

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
    </div>
  );
};
