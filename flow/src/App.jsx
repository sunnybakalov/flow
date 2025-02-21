import React, { useEffect, useState } from 'react'

const App = () => {
  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsBreak(!isBreak);
          setTimeLeft(isBreak ? workDuration : breakDuration);
          return isBreak ? workDuration : breakDuration;
        }
        return prevTime - 1;
      })
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isBreak, workDuration, breakDuration]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration);
  };

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
