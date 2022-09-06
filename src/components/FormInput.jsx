import React from "react";
import { useTheme } from "../customHooks";
import { styles } from "../styles/themeStyles";

export const FormInput = ({
  label,
  value,
  errorMessage,
  setBoardValues,
  updateValue,
  ...inputProps
}) => {
  const theme = useTheme();
  return (
    <div className="form-input-container">
      <div
        className="input-elements"
        style={styles[`${theme}`].FormInputStyles.formInputContainer}
      >
        <label>{label}</label>
        <div className="counter-group">
          <button
            onClick={(e) => updateValue(inputProps.name, 0, -1)}
            className="counter-steps"
            disabled={value <= inputProps.min}
            style={styles[`${theme}`].FormInputStyles.updateButtons}
          >
            -
          </button>
          <input
            {...inputProps}
            value={value}
            onChange={(e) => {
              updateValue(inputProps.name, e.target.value, 0);
            }}
            className="inputBox"
          />
          <button
            onClick={(e) => updateValue(inputProps.name, 0, 1)}
            className="counter-steps"
            id={inputProps.name}
            disabled={value >= inputProps.max}
            style={styles[`${theme}`].FormInputStyles.updateButtons}
          >
            +
          </button>
        </div>
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};
