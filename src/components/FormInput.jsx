import React from "react";

export const FormInput = ({
  label,
  value,
  errorMessage,
  setBoardValues,
  updateValue,
  ...inputProps
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px 0",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="input-elements">
        <label>{label}</label>
        <div className="counter-group">
          <button
            onClick={(e) => updateValue(e.target.id, 0, -1)}
            className="counter-steps"
            id={inputProps.name}
            disabled={value <= inputProps.min}
          >
            -
          </button>
          <input
            {...inputProps}
            value={value}
            onChange={(e) => {
              updateValue(inputProps.name, e.target.value, 0);
            }}
          />
          <button
            onClick={(e) => updateValue(e.target.id, 0, 1)}
            className="counter-steps"
            id={inputProps.name}
            disabled={value >= inputProps.max}
          >
            +
          </button>
        </div>
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};
