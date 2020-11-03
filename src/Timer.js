import React, { useEffect, useState } from "react";
import "./styles.scss";
import Break from "./Break";
import Session from "./Session";

const Timer = () => {
  const [sessionlength, setSessionLength] = useState(25);
  const [breaklength, setBreakLength] = useState(5);
  const [mode, setMode] = useState("Session");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const decreament = (e) => {
    if (e.target.id === "break-decrement") {
      if (!isRunning && breaklength > 1) {
        setBreakLength((prevState) => prevState - 1);
      }
    }
    if (e.target.id === "session-decrement") {
      if (!isRunning && sessionlength > 1) {
        setSessionLength((prevState) => prevState - 1);
        setSecondsLeft((sessionlength - 1) * 60);
      }
    }
  };

  const increment = (e) => {
    if (e.target.id === "break-increment") {
      if (!isRunning && breaklength < 10) {
        setBreakLength((prevState) => prevState + 1);
      }
    }
    if (e.target.id === "session-increment") {
      if (!isRunning && sessionlength < 25) {
        setSessionLength((prevState) => prevState + 1);
        setSecondsLeft((sessionlength + 1) * 60);
      }
    }
  };

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  useEffect(() => {
    const handleSwitch = () => {
      if (mode === "Session") {
        setMode("break");
        setSecondsLeft(breaklength * 60);
      } else if (mode === "Break") {
        setMode("session");
        setSecondsLeft(sessionlength * 60);
      }
    };

    let countdown = null;
    if (isRunning && secondsLeft > 0) {
      countdown = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      countdown = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      handleSwitch();
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isRunning, secondsLeft, mode, breaklength, sessionlength]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setSecondsLeft(25 * 60);
    setMode("Session");
    setIsRunning(false);
  };
  return (
    <>
      <div className="controller">
        <Break
          decreament={decreament}
          increment={increment}
          breaklength={breaklength}
        />
        <Session
          decreament={decreament}
          increment={increment}
          sessionlength={sessionlength}
        />
      </div>
      <div className="display">
        <h5 className="small" id="timer-label">
          {mode}
        </h5>
        <div id="time-left" className={mode === "break" ? "break" : ""}>
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </div>
        <div className="action">
          <button
            id="start_stop"
            onClick={isRunning ? handleStop : handleStart}
            className={isRunning ? "red small" : "green small"}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button id="reset" onClick={handleReset} className="small">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
