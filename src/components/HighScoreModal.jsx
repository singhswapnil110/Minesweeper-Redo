import React from "react";
import { useTheme, useClickOutside } from "../customHooks";
import { styles } from "../styles/themeStyles";

export const HighScoreModal = ({ updateModalStatus, scoreList, visible }) => {
  const theme = useTheme();
  const modalRef = useClickOutside(() =>
    updateModalStatus("highScoreModal", false)
  );
  return (
    <div
      className="modal"
      style={styles[`${theme}`].ModalStyles.modal}
      visible={visible.toString()}
    >
      <div
        className="modal-form"
        style={styles[`${theme}`].ModalStyles.modalForm}
        ref={modalRef}
        visible={visible.toString()}
      >
        <h1 style={{ marginBottom: "40px" }}>Wall of Fame</h1>
        <div
          style={{
            width: "90%",
            fontSize: "1.2rem",
            display: "grid",
            gridTemplateColumns: "0.2fr repeat(4,1fr)",
            height: "30px",
            textAlign: "center",
          }}
        >
          <span></span>
          <span>Name</span>
          <span>Board Size</span>
          <span>Mines</span>
          <span>Score</span>
        </div>
        <div
          style={{
            width: "90%",
            textAlign: "center",
            overflow: "auto",
            boxSizing: "border-box",
            height: "200px",
          }}
        >
          {scoreList.map((score, index) => (
            <div
              id={index}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "0.2fr repeat(4,1fr)",
                textAlign: "center",
                margin: "10px 0",
              }}
            >
              <span>{index + 1}</span>
              <span>{score.name}</span>
              <span>
                {score.boardDetails.rows} x {score.boardDetails.columns}
              </span>
              <span>{score.boardDetails.mines}</span>
              <span>{score.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
