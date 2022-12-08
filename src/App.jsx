import "./styles/main.css";
import { createContext, useContext, useState } from "react";
import { Board } from "./components/Board";

export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  function toggleTheme() {
    const newTheme = theme == "light" ? "dark" : "light";
    console.log(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className="App">
        <Board />
      </div>
    </ThemeContext.Provider>
  );
}
