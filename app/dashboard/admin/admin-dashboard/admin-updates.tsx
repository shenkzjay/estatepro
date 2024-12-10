import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { SearchBox } from "@/stories/searchbox/search";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { PlusIcon } from "@/public/svgIcons/plusIcon";
import { DeleteIcon } from "@/public/svgIcons/deleteIcon";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { EditIcon } from "@/public/svgIcons/editIcon";

interface AdminDashBoardProp {
  isCollapse: boolean;
}

export const ManagedUpdates = ({ isCollapse }: AdminDashBoardProp) => {
  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Estate updates" />
      <DashBreadcrumbs title="Estate updates" />

      {/**Searchbox header */}
      <div className="flex md:flex-row flex-col justify-between p-6 gap-6 md:gap-0 ">
        <div className="md:w-[30vw]">
          <SearchBox
            bgColor="#EFF0F1"
            placeholder="Search staff name"
            name="SearchResidents"
            color="#b4b4b4"
          />
        </div>
        <div className="flex flex-row justify-between gap-6 flex-wrap">
          <Button
            variant="Tertiary"
            iconAlign="before"
            label="filter"
            icon={FilterIcon}
            onClick={() => "hell"}
            color="#139D8F"
          />
          <Button
            variant="Tertiary"
            iconAlign="before"
            label="Create new updates"
            icon={PlusIcon}
            onClick={() => "hi"}
            bgColor=""
            btnbgColor="#139D8F"
            color="#c3f8f2"
          />
        </div>
      </div>

      <section className="pb-6 px-6 space-y-6">
        <article className="flex flex-col md:flex-row justify-between md:items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
            <p className="text-[12px] text-buttongray">
              We would be closing the community pool for
            </p>
            <p className="text-[14px]">10 Apr 2024</p>
          </div>
          <div>
            {" "}
            <span className="hidden md:flex">
              <StatusPill title="Announcement" status="default" />
            </span>
          </div>
          <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto flex-wrap">
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Mark as read"
                onClick={() => "hello"}
                iconAlign="none"
                btnbgColor="#F0FDFC"
                color="#139D8F"
                size="Medium"
              />
            </span>
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Preview"
                onClick={() => "hello"}
                iconAlign="before"
                btnbgColor="#F0FDFC"
                icon={EditIcon}
                bgColor=""
                color="#139D8F"
                size="Medium"
              />
            </span>
            <Button
              variant="Tertiary"
              label="Delete"
              onClick={() => "hello"}
              iconAlign="before"
              btnbgColor="#DA1919"
              color="white"
              bgColor=""
              icon={DeleteIcon}
              size="Medium"
            />
          </div>
        </article>

        <article className="flex flex-col md:flex-row justify-between md:items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
            <p className="text-[12px] text-buttongray">
              We would be closing the community pool for
            </p>
            <p className="text-[14px]">10 Apr 2024</p>
          </div>
          <div>
            {" "}
            <span className="hidden md:flex">
              <StatusPill title="Announcement" status="default" />
            </span>
          </div>
          <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto flex-wrap">
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Mark as read"
                onClick={() => "hello"}
                iconAlign="none"
                btnbgColor="#F0FDFC"
                color="#139D8F"
                size="Medium"
              />
            </span>
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Preview"
                onClick={() => "hello"}
                iconAlign="before"
                btnbgColor="#F0FDFC"
                icon={EditIcon}
                bgColor=""
                color="#139D8F"
                size="Medium"
              />
            </span>
            <Button
              variant="Tertiary"
              label="Delete"
              onClick={() => "hello"}
              iconAlign="before"
              btnbgColor="#DA1919"
              color="white"
              bgColor=""
              icon={DeleteIcon}
              size="Medium"
            />
          </div>
        </article>

        <article className="flex flex-col md:flex-row justify-between md:items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
            <p className="text-[12px] text-buttongray">
              We would be closing the community pool for
            </p>
            <p className="text-[14px]">10 Apr 2024</p>
          </div>
          <div>
            {" "}
            <span className="hidden md:flex">
              <StatusPill title="Announcement" status="default" />
            </span>
          </div>
          <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto flex-wrap">
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Mark as read"
                onClick={() => "hello"}
                iconAlign="none"
                btnbgColor="#F0FDFC"
                color="#139D8F"
                size="Medium"
              />
            </span>
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Preview"
                onClick={() => "hello"}
                iconAlign="before"
                btnbgColor="#F0FDFC"
                icon={EditIcon}
                bgColor=""
                color="#139D8F"
                size="Medium"
              />
            </span>
            <Button
              variant="Tertiary"
              label="Delete"
              onClick={() => "hello"}
              iconAlign="before"
              btnbgColor="#DA1919"
              color="white"
              bgColor=""
              icon={DeleteIcon}
              size="Medium"
            />
          </div>
        </article>

        <article className="flex flex-col md:flex-row justify-between md:items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
            <p className="text-[12px] text-buttongray">
              We would be closing the community pool for
            </p>
            <p className="text-[14px]">10 Apr 2024</p>
          </div>
          <div>
            {" "}
            <span className="hidden md:flex">
              <StatusPill title="Announcement" status="default" />
            </span>
          </div>
          <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto flex-wrap">
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Mark as read"
                onClick={() => "hello"}
                iconAlign="none"
                btnbgColor="#F0FDFC"
                color="#139D8F"
                size="Medium"
              />
            </span>
            <span className="outline outline-primary rounded-full flex text-[14px]">
              <Button
                variant="Tertiary"
                label="Preview"
                onClick={() => "hello"}
                iconAlign="before"
                btnbgColor="#F0FDFC"
                icon={EditIcon}
                bgColor=""
                color="#139D8F"
                size="Medium"
              />
            </span>
            <Button
              variant="Tertiary"
              label="Delete"
              onClick={() => "hello"}
              iconAlign="before"
              btnbgColor="#DA1919"
              color="white"
              bgColor=""
              icon={DeleteIcon}
              size="Medium"
            />
          </div>
        </article>
      </section>
    </section>
  );
};
