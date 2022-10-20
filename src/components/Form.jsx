import React, { useState, useEffect } from "react";
import { useTheme } from "../customHooks";
import { FormInput } from "./FormInput";
import { styles } from "../styles/themeStyles";

export const Form = ({ handleSubmit }) => {
  const theme = useTheme();
  const [boardValues, setBoardValues] = useState({
    rows: 10,
    columns: 10,
    mines: 10,
  });

  const [errorMessages, setErrorMessages] = useState({
    rows: "",
    columns: "",
    mines: "",
  });

  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    validateFun();
  }, [boardValues]);

  const validateFun = () => {
    let rowMessage, columnMessage, mineMessage;
    const { rows, columns, mines } = boardValues;
    if (rows > inputArray[0].max || rows < inputArray[0].min || rows == "")
      rowMessage = `Rows should be between ${inputArray[0].min} - ${inputArray[0].max}`;

    if (
      columns > inputArray[1].max ||
      columns < inputArray[1].min ||
      columns == ""
    )
      columnMessage = `Columns should be between ${inputArray[1].min} - ${inputArray[1].max}`;

    if (mines < inputArray[2].min || mines == "")
      mineMessage = `Mines should be greater than ${inputArray[2].min}`;

    if (mines >= rows * columns)
      mineMessage = `Mines cannot be greater than the number of cells`;

    rowMessage || columnMessage || mineMessage
      ? setDisableSubmit(true)
      : setDisableSubmit(false);

    setErrorMessages({
      rows: rowMessage,
      columns: columnMessage,
      mines: mineMessage,
    });
  };

  function updateValue(name, value, addon) {
    if (addon == 0) setBoardValues({ ...boardValues, [name]: Number(value) });
    else
      setBoardValues({
        ...boardValues,
        [name]: boardValues[name] + addon,
      });
  }

  const inputArray = [
    {
      id: 1,
      name: "rows",
      label: "Rows",
      type: "number",
      min: 8,
      max: 25,
      step: 1,
      required: true,
    },
    {
      id: 2,
      name: "columns",
      label: "Columns",
      type: "number",
      min: 8,
      max: 35,
      step: 1,
      required: true,
    },
    {
      id: 3,
      name: "mines",
      label: "Mines",
      type: "number",
      min: 5,
      step: 1,
      required: true,
    },
  ];

  return (
    <div
      className="form-container"
      style={styles[`${theme}`].FormStyles.formContainer}
    >
      {inputArray.map((inputField) => (
        <FormInput
          key={inputField.id}
          value={boardValues[inputField.name]}
          errorMessage={errorMessages[inputField.name]}
          updateValue={updateValue}
          {...inputField}
        />
      ))}
      <button
        type="submit"
        className="form-submit"
        disabled={disableSubmit}
        onClick={() =>
          handleSubmit(boardValues.rows, boardValues.columns, boardValues.mines)
        }
        style={styles[`${theme}`].FormStyles.formSubmit}
      >
        Create
      </button>
    </div>
  );
};
