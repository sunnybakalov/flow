import React, { use } from "react";
import { usePomodoro } from "./contexts/PomodoroContext.jsx";
import EditTimer from "./components/EditTimer";
import Button from "./components/Button";
import SessionTracker from "./components/SessionTracker";
import { formatTime } from "./utils/helpers";

const App = () => {
  const {
    isBreak,
    timeLeft,
    isRunning,
    toggleTimer,
    resetTimer,
    workDuration,
    breakDuration,
    handleBreakChange,
    handleWorkChange,
  } = usePomodoro();

  return (
    <div>
      <h1>{isBreak ? "Break Time!" : "Work Time"}</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <Button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</Button>
      <Button onClick={resetTimer}>Reset</Button>
      <EditTimer
        workDuration={workDuration}
        breakDuration={breakDuration}
        onWorkTimeChange={handleWorkChange}
        onBreakTimeChange={handleBreakChange}
      />
      <SessionTracker />
    </div>
  );
};

export default App;
