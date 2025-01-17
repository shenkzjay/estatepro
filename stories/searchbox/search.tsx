import { SearchBoxIcon } from "@/public/svgIcons/searchIcon";
import "./search.css";

interface SearchProps {
  name: string;
  placeholder: string;
  value?: string;
  color: string;
  bgColor: string;
  onKeyDown?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox = ({
  name,
  placeholder,
  value,
  color,
  bgColor,
  onKeyDown,
  onChange,
}: SearchProps) => {
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
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </div>
  );
};
