import "./statuspill.css";

interface StatusPillProps {
  title: string;
  status?: "success" | "warning" | "danger" | "default";
}

export const StatusPill = ({ title, status }: StatusPillProps) => {
  return (
    <div className={`statusPill ${status}`}>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};
