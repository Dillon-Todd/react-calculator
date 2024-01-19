import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
  CLEAR: "clear",
};

const addDigit = (state, payload) => {
  if (state.overwrite) {
    return { currentOperand: payload.digit, overwrite: false };
  }
  if (payload.digit === "0" && state.currentOperand === "0") {
    return state;
  }

  if (payload.digit === "." && state.currentOperand.includes(".")) {
    return state;
  }

  return {
    ...state,
    currentOperand: `${state.currentOperand || ""}${payload.digit}`,
  };
};

const chooseOperation = (state, payload) => {
  if (state.currentOperand === 0) {
    return { ...state, operation: payload.operation };
  }
  if (state.previousOperand === undefined) {
    return {
      previousOperand: state.currentOperand,
      operation: payload.operation,
      currentOperand: 0,
    };
  }

  return {
    previousOperand: evaluate(state),
    operation: payload.operation,
    currentOperand: 0,
  };
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
    case "%":
      computation = prev % curr;
      break;
    case "±":
      computation = prev * -1;
      break;
  }

  return computation.toString();
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return addDigit(state, payload);
    case ACTIONS.CHOOSE_OPERATION:
      return chooseOperation(state, payload);
    case ACTIONS.EVALUATE:
      return { currentOperand: evaluate(state), overwrite: true };
    case ACTIONS.CLEAR:
      return { currentOperand: 0 };
  }
};

const App = () => {
  const [{ currentOperand, previousOperand, operation, overwrite }, dispatch] =
    useReducer(reducer, { currentOperand: 0 });

  return (
    <div className="calculator-grid">
      <div className="screen">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <OperationButton operation={"±"} dispatch={dispatch} />
      <OperationButton operation={"%"} dispatch={dispatch} />
      <OperationButton operation={"÷"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
};

export default App;
