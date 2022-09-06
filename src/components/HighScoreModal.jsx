import React from "react";
import { useTheme, useClickOutside } from "../customHooks";
import { styles } from "../styles/themeStyles";

export const HighScoreModal = ({ updateModalStatus, scoreList }) => {
  const theme = useTheme();
  const modalRef = useClickOutside(() =>
    updateModalStatus("highScoreModal", false)
  );
  return (
    <div className="modal" style={styles[`${theme}`].ModalStyles.modal}>
      <div
        className="modal-form"
        style={styles[`${theme}`].ModalStyles.modalForm}
        ref={modalRef}
      >
        <h2>Wall of Fame</h2>
        <table
          style={{
            width: "90%",
            textAlign: "center",
            height: "100px",
            background: "blue",
            overflow: "auto",
          }}
        >
          <tr style={{ height: "50px" }}>
            <th></th>
            <th>Name</th>
            <th>Board Size</th>
            <th>Mines</th>
            <th>Score</th>
          </tr>
          {scoreList.map((score, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>
                {score.boardDetails.rows} x {score.boardDetails.columns}
              </td>
              <td>{score.boardDetails.mines}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
