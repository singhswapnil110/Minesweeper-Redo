import "./styles/main.css";
import { createContext, useContext, useState } from "react";
import { Board } from "./components/Board";

export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    theme == "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className="App">
        <Board />
      </div>
    </ThemeContext.Provider>
  );
}
