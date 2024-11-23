import Image, { StaticImageData } from "next/image";
import { SunBurstIcon } from "@/public/svgIcons/sunIcon";
import "../cards/cards.css";

interface CardProps {
  image?: StaticImageData;
  title?: string;
  subtitle?: string;
  content?: string;
  icon?: () => JSX.Element;
  width?: number;
  alt?: string;
  height?: number;
  cardType: "justImage" | "titleContent" | "IconText" | "imageText";
}

export function Cards({
  image,
  title,
  width,
  height,
  subtitle,
  content,
  alt,
  icon,
  cardType,
  ...props
}: CardProps) {
  return (
    <article className="cards" {...props}>
      {cardType === "justImage" && (
        <div className="CardsWithImage">
          <Image src={image || ""} width={width} height={height} alt={alt || ""} />
        </div>
      )}

      {cardType === "IconText" && (
        <div className="CardsWithIcon">
          <span>
            <SunBurstIcon />
          </span>
          <div>
            <h4>{subtitle}</h4>
            <p>{content}</p>
          </div>
        </div>
      )}

      {cardType === "titleContent" && (
        <div className="CardsWithTitle">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      )}

      {cardType === "imageText" && (
        <div className="CardsWithImageAndContent">
          <Image src={image || ""} width={width} height={height} alt={alt || ""} />
          <h2>{subtitle}</h2>

          <p>{content}</p>
        </div>
      )}
    </article>
  );
}
