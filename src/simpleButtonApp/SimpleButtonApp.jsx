import React, { useState } from "react";

export default function SimpleButtonApp() {
  const [color, setColor] = useState("red");
  const [disabled, setDisabled] = useState(false);
  const newColor = color === "red" ? "blue" : "red";

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button
        data-testid="colorButton"
        style={{
          backgroundColor: disabled ? "gray" : color,
          color: "white",
          width: "25%",
          padding: "10px 10px",
          transition: "0.5s ease-in-out",
          border: "none",
          textTransform: "uppercase",
        }}
        onClick={() => setColor(newColor)}
        disabled={disabled}
      >
        Change to {newColor}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
}
