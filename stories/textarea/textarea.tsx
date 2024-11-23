import "./textarea.css";

interface TextareaProps {
  placeholder: string;
  value?: string;
  name: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({ placeholder, value, name, title, onChange }: TextareaProps) => {
  return (
    <div className="text-wrap">
      <label htmlFor={name}>{title}</label>
      <textarea
        rows={6}
        cols={5}
        placeholder={placeholder}
        value={value}
        name={name}
        id={name}
        onChange={(e) => onChange(e)}
      ></textarea>
    </div>
  );
};
