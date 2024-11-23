import { LinkArrow } from "@/public/svgIcons/linkarrow";
import { StarsIcon } from "@/public/svgIcons/starsIcon";
import "./Pills.css";

interface PillsProps {
  iconbg?: boolean;
  icon?: () => JSX.Element;
  iconAlign?: "before" | "after" | "noIcon";
  pillText?: string;
  bgColor: string;
  bgIcon?: string;
  color?: string;
  tooltip?: string;
}

export const Pills = ({
  iconbg,
  icon,
  iconAlign,
  pillText,
  bgColor,
  bgIcon,
  color,
  tooltip,
  ...props
}: PillsProps) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`${iconAlign === "before" ? "pillstylebefore" : "pillstyleafter"} pillstyle`}
      {...props}
      id="tooltip"
    >
      {iconAlign === "before" && (
        <span
          className={`${iconbg ? "pillbackgroundcolor" : ""}`}
          style={{ backgroundColor: bgIcon }}
        >
          {icon && icon()}
        </span>
      )}
      <p style={{ color: color }}>{pillText}</p>
      {iconAlign === "after" && <span className="afterIcon">{icon && icon()}</span>}
      {iconAlign === "before" && <span className="tooltip">{tooltip}</span>}
    </div>
  );
};
