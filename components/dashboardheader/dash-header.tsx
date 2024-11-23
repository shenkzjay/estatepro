import { SearchBox } from "@/stories/searchbox/search";
import { NotificationBell } from "@/public/svgIcons/notification";

interface DashBoardHeaderProps {
  title: string;
}

export const DashBoardHeader = ({ title }: DashBoardHeaderProps) => {
  return (
    <header className="w-full grid md:grid-cols-3 grid-cols-1 items-center border-b bg-white p-6 gap-6 md:gap-0">
      <div className="flex flex-row md:flex-col justify-between md:justify-normal">
        <h2 className="text-2xl text-buttongray font-semibold">{title}</h2>
        <div className="md:hidden justify-end flex">
          <NotificationBell />
        </div>
      </div>
      <div className="order-1 md:order-0">
        <SearchBox
          placeholder="Search for keywords"
          name="searchbox"
          color="#b4b4b4"
          bgColor="#F8F8F8"
        />
      </div>
      <div className="md:flex justify-end hidden md:flex-row md:order-1">
        {" "}
        <NotificationBell />
      </div>
    </header>
  );
};
