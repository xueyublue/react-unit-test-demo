import React, { useState } from "react";
import styles from "./SimpleButtonApp.module.css";

export default function SimpleButtonApp() {
  const [color, setColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newColor = color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div className={styles.container}>
      <button
        data-testid="colorButton"
        className={styles.button}
        style={{
          backgroundColor: disabled ? "gray" : color,
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
