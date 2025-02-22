import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

function EditTimer({
  workDuration,
  breakDuration,
  onWorkTimeChange,
  onBreakTimeChange,
}) {
  return (
    <div>
      <label>
        Work Duration (min):
        <input
          type="number"
          defaultValue={workDuration / 60}
          onChange={onWorkTimeChange}
        />
      </label>

      <label>
        Break Duration (min):
        <input
          type="number"
          defaultValue={breakDuration / 60}
          onChange={onBreakTimeChange}
        />
      </label>
    </div>
  );
}

EditTimer.propTypes = {
  workDuration: PropTypes.number.isRequired,
  breakDuration: PropTypes.number.isRequired,
  onWorkTimeChange: PropTypes.func.isRequired,
  onBreakTimeChange: PropTypes.func.isRequired,
};

export default EditTimer;
