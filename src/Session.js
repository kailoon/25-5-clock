import React from "react";

const Session = ({ decreament, increment, sessionlength }) => {
  return (
    <div className="box">
      <h3 id="session-label">Session Length</h3>
      <button id="session-decrement" onClick={decreament}>
        <i className="fas fa-minus"></i>
      </button>
      <button id="session-increment" onClick={increment}>
        <i className="fas fa-plus"></i>
      </button>
      <div id="session-length">{sessionlength}</div>
    </div>
  );
};

export default Session;
