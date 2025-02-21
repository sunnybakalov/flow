import React, { useEffect, useReducer } from 'react'

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

const initialState = {
  timeLeft: WORK_DURATION,
  isRunning: false,
  isBreak: false,
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'tick':
      return {
        ...state,
        timeLeft: state.timeLeft <= 1 ? 
          (state.isBreak ? WORK_DURATION : BREAK_DURATION) : state.timeLeft - 1
      }
    case 'toggle_running':
      return {
        ...state,
        isRunning: !state.isRunning
      }
    case 'reset':
      return initialState;
    case 'toggle_break':
      return {
        ...state,
        isBreak: !state.isBreak
      }
    default:
      return state;
  }
}

const App = () => {
  const [{ timeLeft, isRunning, isBreak }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isRunning) return;
  
    const interval = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const toggleTimer = () => dispatch({ type: 'toggle_running' });
  const resetTimer = () => dispatch({ type: 'reset' });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  }

  return (
    <div>
      <h1>{isBreak ? 'Break Time!' : 'Work Time'}</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}

export default App
