import { ArrowIcon } from "@/public/svgIcons/arrowIcon";

interface BreadcrumbProps {
  title: string;
}

export const DashBreadcrumbs = ({ title }: BreadcrumbProps) => {
  return (
    <div className="flex flex-row items-center text-buttongray gap-1 py-2 px-6 text-[12px] bg-white">
      <span className="[transform:_scale(-1,1)]">
        <ArrowIcon color="#c4c4c4" />
      </span>
      <p>Home</p>
      <span>／</span>
      <p>{title}</p>
    </div>
  );
};
