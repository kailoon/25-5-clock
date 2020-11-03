import React from "react";

const Break = ({ decreament, increment, breaklength }) => {
  return (
    <div className="box">
      <h3 id="break-label">Break Length</h3>
      <button id="break-decrement" onClick={decreament}>
        <i className="fas fa-minus"></i>
      </button>
      <button id="break-increment" onClick={increment}>
        <i className="fas fa-plus"></i>
      </button>
      <div id="break-length">{breaklength}</div>
    </div>
  );
};

export default Break;
