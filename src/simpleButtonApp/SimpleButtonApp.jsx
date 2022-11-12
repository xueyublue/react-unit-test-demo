import React, { useState } from "react";

export default function SimpleButtonApp() {
  const [color, setColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newColor = color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button
        data-testid="colorButton"
        style={{
          backgroundColor: disabled ? "gray" : color,
          color: "white",
          width: "25%",
          padding: "10px 10px",
          transition: "0.25s ease-in-out",
          border: "none",
          textTransform: "uppercase",
        }}
        onClick={() => setColor(newColor)}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(newColor)}
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

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}
