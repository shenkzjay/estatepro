import { SearchBoxIcon } from "@/public/svgIcons/searchIcon";
import "./search.css";

interface SearchProps {
  name: string;
  placeholder: string;
  value?: string;
  color: string;
  bgColor: string;
}

export const SearchBox = ({ name, placeholder, value, color, bgColor }: SearchProps) => {
  return (
    <div className="searchbox">
      <span>
        <SearchBoxIcon IconColor={color} />
      </span>
      <input
        type="search"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        style={{ backgroundColor: bgColor }}
      />
    </div>
  );
};
