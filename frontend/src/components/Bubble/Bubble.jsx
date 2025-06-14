import React from "react";
import "./bubble.css";

const Bubble = ({ name, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bubble ${selected && "selected-bubble"}`}
    >
      <h4 className="m0">{name}</h4>
    </div>
  );
};

export default Bubble;
