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

export const useStyles = () => {
  const theme = useTheme();
  return {
    BoardStyles: {
      boardContainer: {
        background: colors[`${theme}`].secondary,
      },
      header: {
        background: colors[`${theme}`].contrast,
      },
      headerItem: {
        background: colors[`${theme}`].primary,
        color: colors[`${theme}`].contrast,
      },
      container: {
        background: colors[`${theme}`].primary,
      },
    },
    FormStyles: {
      formContainer: {
        background: colors[`${theme}`].secondary,
      },
      formSubmit: {
        background: colors[`${theme}`].contrast,
        color: colors[`${theme}`].primary,
      },
    },
    FormInputStyles: {
      formInputContainer: {
        color: colors[`${theme}`].contrast,
      },
      updateButtons: {
        background: colors[`${theme}`].contrast,
      },
    },
    ModalStyles: {
      modalForm: {
        background: "#1A1A2E",
        color: "white",
      },
      modal: {
        background: "rgba(15,52,96,0.9)",
      },
    },
    Sidebar: {
      sidebarContainer: {
        background: colors[`${theme}`].primary,
      },
      toggleButton: {
        background: "skyblue",
      },
      wallButton: {
        background: colors[`${theme}`].contrast,
      },
    },
    TileStyles: {
      tileButton: {
        background: colors[`${theme}`].tertiary,
      },
      tile: {
        border: "0.5px solid gray",
      },
    },
  };
};

const colors = {
  dark: {
    primary: "rgb(66, 63, 62)",
    secondary: "rgb(43, 43, 43)",
    tertiary: "rgb(23, 16, 16)",
    contrast: "#E7F6F2",
    modalBackground: "rgba(15,52,96,0.9)",
  },
  light: {
    primary: "#E7F6F2",
    secondary: "#A5C9CA",
    tertiary: "",
    contrast: "",
  },
};
