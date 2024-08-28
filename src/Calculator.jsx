import React, { useState } from 'react';
import { CALC_BUTTON_LIST, CALC_OPERATOR_LIST } from './constants/calculator.constant';
import './Calculator.css';

function Calculator() {

  const [dispalyInput, setDisplayInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "AC") {
      setDisplayInput("");
    } else if (value === "DEL") {
      setDisplayInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const formattedDisplayInput = dispalyInput.replace(/\^/g, "**");
        const result = eval(formattedDisplayInput);
        setDisplayInput(result.toString());
      } catch (error) {
        setDisplayInput("Error");
      }
    } else {
      setDisplayInput((prev) => {
        const lastChar = prev.slice(-1);
        const isLastCharOperator = CALC_OPERATOR_LIST.includes(lastChar);
        const isCurrentCharOperator = CALC_OPERATOR_LIST.includes(value);

        if (isLastCharOperator && isCurrentCharOperator) {
          return prev;
        } else if (prev.slice(-1) === "-" && value === "-") {
          return prev + "(-";
        } else {
          return prev + value;
        }
      });
    }
  };

  return (
    <div className='calculator-container'>
      <div className='calculator-display'>
        <div className='display-input'>{dispalyInput}</div>
      </div>
      <div className='calculator-buttons'>
        <div className='grid-container'>
          {CALC_BUTTON_LIST.map((item, index) => {
            const buttonClass =
              item === "AC" || item === "="
                ? "button-ac-equals"
                : item === "DEL"
                  ? "button-del"
                  : "button-default";
            return (
              <button
                key={index}
                onClick={() => handleButtonClick(item.toString())}
                className={`button ${buttonClass}`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Calculator;
