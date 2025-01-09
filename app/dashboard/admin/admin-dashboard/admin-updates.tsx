"use client";

import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { SearchBox } from "@/stories/searchbox/search";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { PlusIcon } from "@/public/svgIcons/plusIcon";
import { DeleteIcon } from "@/public/svgIcons/deleteIcon";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { EditIcon } from "@/public/svgIcons/editIcon";
import { useAdminContext } from "../../provider";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState } from "react";
import { Inputs } from "@/stories/input/input";
import { Textarea } from "@/stories/textarea/textarea";
import { CreateEstateUpdates } from "../actions/create-updates";
import { Updates } from "../manage-updates/page";

interface UpdateProps {
  updates: Updates[];
}

export const ManagedUpdates = ({ updates }: UpdateProps) => {
  const { isCollapse, user } = useAdminContext();

  const tags = ["entertainment", "health", "news", "sports", "environment", "security"];

  const updatesRef = useRef<HTMLDialogElement | null>(null);
  const updateFormRef = useRef<HTMLFormElement | null>(null);

  const [isTags, setIsTags] = useState<string[]>(tags);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  console.log(selectedTags);

  const OpenEstataUpdateModal = () => {
    updatesRef.current?.showModal();
  };

  const handleSelectTags = (tag: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // setCurrentIndex(index);

    if (selectedTags.includes(tag)) {
      setSelectedTags((prevSelected) => prevSelected.filter((t) => t !== tag));
      setIsTags((prevTags) => [...prevTags, tag]);
    } else {
      setSelectedTags((prevSelected) => [...prevSelected, tag]);
      setIsTags((prevTags) => prevTags.filter((t) => t !== tag));
    }
  };

  const handleCreateEstateUpdates = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (updateFormRef.current && user) {
      const formData = new FormData(updateFormRef.current);

      formData.append("selectedTags", JSON.stringify(selectedTags));
      formData.append("userId", user?.id);
      formData.append("email", user.email);

      await CreateEstateUpdates(formData);
    }

    updateFormRef.current?.reset();

    updatesRef.current?.close();
  };
  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Estate updates" />
      <DashBreadcrumbs title="Estate updates" />

      {/* create update modal */}
      <Modal title="Create Estate Updates" handleOpenModal={OpenEstataUpdateModal} ref={updatesRef}>
        <form className="md:w-[25rem]  grid mt-12" ref={updateFormRef}>
          <Inputs
            label="Title"
            title="title"
            placeholder=""
            arialabel="title"
            BorderRadius="10px"
            inputtype="text"
            required={false}
            Border="1px solid #E3E5E5"
          />
          {/* <Inputs
            label="Description"
            title="description"
            placeholder=""
            arialabel="description"
            BorderRadius="10px"
            inputtype="text"
            required={false}
            Border="1px solid #E3E5E5"
          /> */}
          <Textarea
            name="description"
            title="Description"
            onChange={() => "hi"}
            placeholder="description"
          />
          <div>
            <div className="flex flex-wrap gap-2 mt-6 mb-2">
              {selectedTags.map((tag, index) => (
                <div key={`selected-${index}`}>
                  <button
                    onClick={(e) => handleSelectTags(tag, e)}
                    className="text-sm relative w-full h-full py-1 px-6 bg-green-200 rounded-xl"
                  >
                    {tag}
                  </button>
                </div>
              ))}
            </div>
            <p>Select tags</p>
            <div className="flex flex-wrap gap-2 mt-2 mb-8">
              {isTags.map((tag, index) => (
                <div key={`available-${index}`}>
                  <button
                    onClick={(e) => handleSelectTags(tag, e)}
                    className={`text-sm relative w-full h-full py-1 px-6 bg-purple-200 rounded-xl before:absolute before:content-['✓']
                    '✓') before:top-1 before:left-1 ${currentIndex === index ? "before:flex" : "before:hidden"}`}
                  >
                    {tag}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              label="Create Estate updates"
              onClick={handleCreateEstateUpdates}
              iconAlign="after"
              variant="Primary"
              color="#139D8F"
            />
          </div>
        </form>
      </Modal>

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
            onClick={OpenEstataUpdateModal}
            bgColor=""
            btnbgColor="#139D8F"
            color="#c3f8f2"
          />
        </div>
      </div>

      <section className="pb-6 px-6 space-y-6">
        {updates && updates.length > 0
          ? updates.map((update, index) => (
              <article
                key={update.id}
                className="grid grid-cols-[1fr,1fr,1fr] justify-between md:items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-[15px]">{update.title}</h4>
                  <p className="text-[13px] text-buttongray text-balance">{update.description}</p>
                  <p className="text-[14px] text-buttongray">
                    {new Date(update.createdAt).toDateString()}
                  </p>
                </div>
                <div>
                  {" "}
                  <span className="hidden md:flex gap-2 md:justify-center">
                    {update.tags.map((tag, index) => (
                      <div key={index} className="">
                        <StatusPill title={tag} status="default" />
                      </div>
                    ))}
                  </span>
                </div>
                <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto flex-wrap md:justify-center">
                  {/* <span className="outline outline-primary rounded-full flex text-[14px]">
                    <Button
                      variant="Tertiary"
                      label="Mark as read"
                      onClick={() => "hello"}
                      iconAlign="none"
                      btnbgColor="#F0FDFC"
                      color="#139D8F"
                      size="Medium"
                    />
                  </span> */}
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
            ))
          : ""}
      </section>
    </section>
  );
};
