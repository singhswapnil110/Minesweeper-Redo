const colors = {
  dark: {
    primary: "rgb(66, 63, 62)",
    secondary: "rgb(43, 43, 43)",
    tertiary: "rgb(23, 16, 16)",
    contrast: "#E7F6F2",
  },
  light: {
    primary: "#E7F6F2",
    secondary: "#A5C9CA",
    tertiary: "",
    contrast: "",
  },
};

export const styles = {
  dark: {
    BoardStyles: {
      boardContainer: {
        background: colors.dark.secondary,
      },
      header: {
        background: "whitesmoke",
      },
      headerItem: {
        background: "black",
        color: "whitesmoke",
      },
      container: {
        background: colors.dark.primary,
        color: "black",
      },
    },
    FormStyles: {
      formContainer: {
        background: colors.dark.secondary,
      },
      formSubmit: {
        background: colors.dark.contrast,
        color: "purple",
      },
    },
    FormInputStyles: {
      formInputContainer: {
        color: "whitesmoke",
      },
      updateButtons: {
        color: "purple",
        background: "whitesmoke",
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
        background: colors.dark.primary,
      },
      toggleButton: {
        background: "skyblue",
      },
      wallButton: {
        background: colors.dark.contrast,
      },
    },
    TileStyles: {
      tileButton: {
        background: colors.dark.tertiary,
      },
      tile: {
        border: "0.5px solid gray",
      },
    },
  },
  light: {
    BoardStyles: {
      boardContainer: {
        background: "skyblue",
      },
      header: {
        background: "black",
      },
      headerItem: {
        background: "whitesmoke",
        color: "black",
      },
      container: {
        background: "whitesmoke",
      },
    },
    FormStyles: {
      formContainer: {
        background: "skyblue",
      },
      formSubmit: {
        background: "grey",
        color: "whitesmoke",
      },
    },
    FormInputStyles: {
      formInputContainer: {
        color: "black",
      },
      updateButtons: {
        background: "rgb(22, 0, 59)",
      },
    },
    ModalStyles: {
      modalForm: {
        background: "rgb(249,243,238)",
        color: "black",
      },
      modal: {
        background: "rgba(249,206,238,0.9)",
      },
    },
    Sidebar: {
      sidebarContainer: {
        background: "#E5E5E5",
      },
      toggleButton: {
        background: "#0F3460",
      },
      wallButton: {
        background: "blue",
      },
    },
    TileStyles: {
      tileButton: {
        background: "snow",
      },
      tile: {
        border: "0.5px solid silver",
      },
    },
  },
};
