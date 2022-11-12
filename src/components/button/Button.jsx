import React, { useState } from "react";

export default function Button() {
  const [color, setColor] = useState("red");
  const newColor = color === "red" ? "blue" : "red";

  return (
    <button data-testid="colorButton" style={{ backgroundColor: color }} onClick={() => setColor(newColor)}>
      Change to {newColor}
    </button>
  );
}
