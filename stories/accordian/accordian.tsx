import "./accordian.css";

interface AccordianProps {
  title: string;
  content: string;
}

export const Accordian = ({ title, content }: AccordianProps) => {
  return (
    <details className="">
      <summary>{title}</summary>
      <p className="">{content}</p>
    </details>
  );
};