import "./input.css";
import { useState } from "react";

interface Input {
  label: string;
  title: string;
  inputtype: "text" | "email" | "tel" | "date" | "password" | "number";
  color?: string;
  value?: string;
  labelbg?: string;
  placeholder: string;
  inputBg?: string;
  Border?: string;
  BorderRadius?: string;
  arialabel: string;
  required: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Inputs = ({
  label,
  title,
  inputtype,
  placeholder,
  value,
  defaultValue,
  labelbg,
  color,
  inputBg,
  Border = "none",
  BorderRadius = "16px",
  arialabel,
  required,
  readOnly,
  error = false,
  errorMessage = "",
}: Input) => {
  return (
    <div className="inputwrapper">
      <div style={{ backgroundColor: inputBg, border: Border, borderRadius: BorderRadius }}>
        <input
          type={inputtype}
          name={title}
          value={value}
          className={`inputbox ${error ? "error" : ""}`}
          placeholder={placeholder}
          aria-label={arialabel}
          id={title}
          required={required}
          readOnly={readOnly}
          defaultValue={defaultValue}
        />
        <label htmlFor={title} style={{ color: color, backgroundColor: labelbg }}>
          {label}
        </label>
      </div>
      {error && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
