import "./checkbox.css";

interface CheckboxProps {
  label: string;
  title: string;
  color?: string;
  labelbg?: string;
  checked?: boolean;
}

export const Checkbox = ({ label, title, labelbg, color, checked }: CheckboxProps) => {
  return (
    <div className="checkboxwrapper">
      <input
        type="checkbox"
        name={title}
        checked={checked}
        className="checkboxtype"
        aria-label={title}
        id={title}
      />
      <label htmlFor={title} style={{ color: color, backgroundColor: labelbg }}>
        {label}
      </label>
    </div>
  );
};
