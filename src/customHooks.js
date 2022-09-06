import { useRef, useEffect, useContext } from "react";
import { ThemeContext } from "./App";

export const useClickOutside = (handler) => {
  const mainRef = useRef();
  const clickOutsideCheck = (e) => {
    if (mainRef.current && !mainRef.current.contains(e.target)) handler();
  };

  useEffect(() => {
    document.addEventListener("click", clickOutsideCheck);
    return () => {
      document.removeEventListener("click", clickOutsideCheck);
    };
  }, []);

  return mainRef;
};

export const useTheme = () => {
  return useContext(ThemeContext)[0];
};
