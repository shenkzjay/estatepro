"use client";

import { SearchBox } from "@/stories/searchbox/search";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";

import { Button } from "@/stories/Button/Button";

import { FilterIcon } from "@/public/svgIcons/filter";

interface DashBoardNavProp {
  isCollapse: boolean;
}

export interface formdataProp {
  visitorname: string;
  visitoremail: string;
  Date_of_visit: string;
  phone_number: number;
  code: string;
}

export const StaffHome = ({ isCollapse }: DashBoardNavProp) => {
  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out]`}
    >
      <DashBoardHeader title="Home" />
      <section className="bg-[#F8F8F8] p-6 flex md:flex-row flex-col gap-6 w-full">
        <div className="md:w-[60%] mt-20 md:mt-0">
          <div className="flex md:flex-row flex-col justify-between text-buttongray gap-6">
            <div className="flex md:w-1/2">
              <SearchBox
                name="Searchinvite"
                placeholder="Search invite code or name"
                color="#b4b4b4"
                bgColor="#f1f1f3"
              />
            </div>
            <div className="flex flex-row gap-0  justify-between md:justify-normal">
              <div className="flex text-primary">
                <Button
                  bgColor=""
                  variant="Tertiary"
                  iconAlign="before"
                  icon={FilterIcon}
                  label="Filter"
                  color="#139D8F"
                  onClick={() => "click"}
                />
              </div>

              <div className=" flex flex-row text-white">
                {/* <Button
                  btnbgColor="#139D8F"
                  bgColor=""
                  variant="Tertiary"
                  iconAlign="before"
                  icon={DownoadIcon}
                  label="Export PDF"
                  onClick={() => "click"}
                /> */}
              </div>
            </div>
          </div>

          <section className="mt-6">
            <h3 className="mb-4 text-buttongray font-bold text-xl">Invites</h3>
            <div className="flex flex-col overflow-auto relative  h-[50vh] rounded-t-[20px]">
              {/**Table */}
              <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)] text-left border-collapse">
                <thead className="sticky top-0">
                  <tr className="bg-[#F0F2F5] text-buttongray">
                    <th colSpan={2} className="text-start">
                      Name
                    </th>
                    <th className="text-start">Visit date</th>
                    <th className="text-start text-nowrap">Phone number</th>
                    <th className="text-start">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white w-full"></tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
