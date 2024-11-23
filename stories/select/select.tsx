import "./select.css";
import { Dispatch, SetStateAction, useState } from "react";

interface SelectProps {
  // onChange?: (value: string) => void;
  title: string;
  selectData: string[];
  selectedItem: string;
  setSelectedItem: React.Dispatch<SetStateAction<string>>;
  setIndex?: React.Dispatch<SetStateAction<number | null>>;
}

export const Select = ({
  title,
  selectData,
  selectedItem,
  setSelectedItem,
  setIndex,
}: SelectProps) => {
  const [toggle, setIsToggle] = useState(false);

  const handleChange = (_selectedItem: string, index: number) => {
    setSelectedItem(_selectedItem);

    if (setIndex) setIndex(index);

    setIsToggle(!toggle);
  };

  return (
    <section className="select-wrap">
      <h4> {title}</h4>
      <label
        tabIndex={0}
        htmlFor="select-services"
        className="select-label"
        onClick={() => setIsToggle(!toggle)}
      >
        {selectedItem ? selectedItem : "Select Item"}
      </label>

      <ul
        className={`select-wrapper ${toggle ? "active" : ""}`}
        id="select-services"
        role="list"
        aria-live="polite"
      >
        {selectData &&
          selectData.map((item, index) => (
            <li key={index} className="opt" tabIndex={0} onClick={() => handleChange(item, index)}>
              {item}
            </li>
          ))}
      </ul>
    </section>
  );
};
