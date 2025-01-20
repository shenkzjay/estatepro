import { LinkArrow } from "../../public/svgIcons/linkarrow";
import "./button.css";

interface ButtonProps {
  label: string;
  variant: "Primary" | "Secondary" | "Tertiary";
  iconAlign?: "before" | "after" | "none";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  bgColor?: string;
  color?: string;
  icon?: () => JSX.Element;
  textcolor?: string;
  btnbgColor?: string;
  size?: "Large" | "Medium" | "Small";
  diasbled?: boolean;
  type?: "button" | "submit";
}

export function Button({
  variant = "Primary",
  onClick,
  label,
  iconAlign,
  bgColor = "#c3f8f2",
  color = "white",
  icon = LinkArrow,
  textcolor,
  diasbled = false,
  type,
  btnbgColor,
  size = "Large",
  ...props
}: ButtonProps) {
  const buttonSize = size === "Large" ? "18px" : size === "Medium" ? "14px" : "12px";

  const disabledStyles = diasbled
    ? {
        cursor: "not-allowed",
      }
    : {};

  return (
    <div style={{ fontSize: buttonSize }}>
      {iconAlign === "after" && (
        <button
          style={{ backgroundColor: btnbgColor, color: color, ...disabledStyles }}
          className={`button ${variant}`}
          {...props}
          onClick={onClick}
          disabled={diasbled}
          type={type}
        >
          <p
            className="slide-up"
            style={{ color: textcolor, fontSize: buttonSize, ...disabledStyles }}
          >
            {label}
          </p>

          <div style={{ backgroundColor: bgColor, color: color }}>{icon && icon()}</div>
        </button>
      )}

      {iconAlign === "before" && (
        <button
          style={{ backgroundColor: btnbgColor, color: color, ...disabledStyles }}
          className={`button ${variant}`}
          {...props}
          onClick={onClick}
          disabled={diasbled}
          type={type}
        >
          <div style={{ backgroundColor: bgColor }}>{icon && icon()}</div>
          <p style={{ color: textcolor, fontSize: buttonSize }}>{label}</p>
        </button>
      )}

      {iconAlign === "none" && (
        <button
          style={{ backgroundColor: btnbgColor, color: color, ...disabledStyles }}
          className={`button ${variant}`}
          {...props}
          onClick={onClick}
          disabled={diasbled}
          type={type}
        >
          <p className="" style={{ color: textcolor, fontSize: buttonSize }}>
            {label}
          </p>
        </button>
      )}
    </div>
  );
}
