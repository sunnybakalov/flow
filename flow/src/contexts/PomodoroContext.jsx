import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";

const PomodoroContext = createContext();

const DEFAULT_DURATION = 25 * 60;

const initialState = {
  timeLeft: DEFAULT_DURATION,
  workDuration: DEFAULT_DURATION,
  breakDuration: 5 * 60,
  isRunning: false,
  isBreak: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "tick":
      return {
        ...state,
        timeLeft:
          state.timeLeft <= 1
            ? state.isBreak
              ? state.workDuration
              : state.breakDuration
            : state.timeLeft - 1,
      };
    case "toggle_running":
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case "reset":
      return initialState;
    case "toggle_break":
      return {
        ...state,
        isBreak: !state.isBreak,
      };
    case "set_work_duration":
      return {
        ...state,
        workDuration: action.payload,
      };
    case "set_break_duration":
      return {
        ...state,
        breakDuration: action.payload,
      };
    default:
      return state;
  }
};

function PomodoroProvider({ children }) {
  const [
    { timeLeft, isRunning, isBreak, workDuration, breakDuration },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const toggleTimer = () => dispatch({ type: "toggle_running" });
  const resetTimer = () => dispatch({ type: "reset" });

  const handleWorkChange = (e) => {
    const newDuration = Math.max(1, Number(e.target.value)) * 60;
    dispatch({ type: "set_work_duration", payload: newDuration });
  };

  const handleBreakChange = (e) => {
    const newDuration = Math.max(1, Number(e.target.value)) * 60;
    dispatch({ type: "set_break_duration", payload: newDuration });
  };

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft,
        isRunning,
        isBreak,
        workDuration,
        breakDuration,
        toggleTimer,
        resetTimer,
        handleWorkChange,
        handleBreakChange,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

PomodoroProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("PomodoroContext was used outside the PomodoroProvider!");
  }
  return context;
}

export { PomodoroProvider, usePomodoro };
