import React, { useRef } from "react";
import { useClickOutside, useTheme } from "../customHooks";
import { styles } from "../styles/themeStyles";

export const WinLossModal = ({
  gameStatus,
  updateModalStatus,
  resetBoard,
  saveSuccess,
}) => {
  const theme = useTheme();
  const modalRef = useClickOutside(() =>
    updateModalStatus("winLossModal", false)
  );
  const inputRef = useRef();

  return (
    <div className="modal" style={styles[`${theme}`].ModalStyles.modal}>
      {gameStatus == 2 ? (
        <div
          className="modal-form win"
          ref={modalRef}
          style={styles[`${theme}`].ModalStyles.modalForm}
        >
          <h2>Congratulations, You Won</h2>
          <p>Kindly enter your name to feature on the wall of fame</p>
          <input type="text" name="Name" ref={inputRef} />
          <div className="modal-button-group">
            <button
              className="modal-buttons cancel"
              onClick={() => updateModalStatus("winLossModal", false)}
            >
              Cancel
            </button>
            <button
              className="modal-buttons save"
              onClick={() => {
                saveSuccess(inputRef.current.value);
                resetBoard();
              }}
            >
              Save and Reset
            </button>
          </div>
        </div>
      ) : (
        <div
          className="modal-form lose"
          ref={modalRef}
          style={styles[`${theme}`].ModalStyles.modalForm}
        >
          <h2>Alas, You Lost</h2>
          <p>Better luck next time !!</p>
          <div className="modal-button-group">
            <button
              className="modal-buttons cancel"
              onClick={() => updateModalStatus("winLossModal", false)}
            >
              Cancel
            </button>
            <button className="modal-buttons save" onClick={resetBoard}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
