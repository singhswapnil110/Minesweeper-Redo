import React from "react";

export const Modal = ({ gameStatus, setShowModal, resetBoard }) => {
  return (
    <div className="modal" tabIndex={0}>
      {gameStatus == 2 ? (
        <div
          className="modal-form win"
          onBlur={() => {
            setShowModal(false);
            console.log("Hi");
          }}
        >
          <h2>Congratulations, You Won</h2>
          <p>Kindly enter your name to feature on the wall of fame</p>
          <input type="text" name="Name" id="username" />
          <div>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button
              onClick={() =>
                console.log(document.getElementById("username").value)
              }
            >
              Save and Reset
            </button>
          </div>
        </div>
      ) : (
        <div
          className="modal-form lose"
          onBlur={() => setShowModal(false)}
          tabIndex={0}
        >
          <h2>Alas, You Lost</h2>
          <p>Better luck next time !!</p>
          <div>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={resetBoard}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};
