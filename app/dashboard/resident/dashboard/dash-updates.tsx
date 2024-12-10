import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { SearchBox } from "@/stories/searchbox/search";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { DeleteIcon } from "@/public/svgIcons/deleteIcon";
import { Cards } from "@/stories/cards/cards";
import Building from "@/public/img/09ad6699a5 1.png";
import AnnoucementImage from "@/public/img/annoucement.jpeg";
import Image from "next/image";
import { XIcon } from "@/public/svgIcons/xIcon";
import { EditIcon } from "@/public/svgIcons/editIcon";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/stories/modal/modal";
import { title } from "process";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";

interface DashBoardNavProp {
  isCollapse: boolean;
}

interface updateDataProps {
  title: string;
  description: string;
  date: string;
  annoucementPill: JSX.Element;
  id: number;
}

interface commentProps {
  // [key: number]: string[];
  timestamp: Date;
  text: string[];
}

export const DashboardEstateUpdate = ({ isCollapse }: DashBoardNavProp) => {
  const commentModalRef = useRef<HTMLDialogElement>(null);
  const [currentItem, setCurrentItem] = useState<updateDataProps | null>(null);
  const [activeCard, setActiveCard] = useState<updateDataProps>();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [allComments, setAllComments] = useState<Record<number, commentProps[]>>({});

  const handleAddComment = () => {
    const newComment: commentProps = {
      text: [textAreaValue],
      timestamp: new Date(),
    };
    if (currentItem) {
      setAllComments((prevComment) => ({
        ...prevComment,
        [currentItem?.id]: [...(prevComment[currentItem?.id] ?? []), newComment],
      }));
    }

    setTextAreaValue("");
  };

  const handleOpenModal = () => {
    if (commentModalRef) {
      console.log(commentModalRef);

      commentModalRef.current?.showModal();
    }
  };

  const handleCommentButton = (item: updateDataProps, ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    setCurrentItem(item);
    setTextAreaValue("");

    handleOpenModal();
  };

  const handleCommentDelete = (itemId: number, index: number) => {
    setAllComments((prevComment) => {
      const updatedComments = { ...prevComment };
      if (updatedComments[itemId]) {
        updatedComments[itemId] = updatedComments[itemId].filter((_, id) => id !== index);
      }

      return updatedComments;
    });
  };

  const estateUpdateData: updateDataProps[] = [
    {
      id: 1,
      title: "Swimmingee pool closed for maintenance",
      description: `We apologize for any inconvenience this may cause, and we appreciate your understanding as we work to maintain the pool in optimal condition for your enjoyment. Thank you, Estate Management`,
      date: "10 Apr 2024",
      annoucementPill: <StatusPill title="Announcement" status="default" />,
    },

    {
      id: 2,
      title: "Please we're currently fixing a bomb detector at the estate gate",
      description: "We would be closing the community pool for...",
      date: "10 Apr 2024",
      annoucementPill: <StatusPill title="Announcement" status="default" />,
    },

    {
      id: 3,
      title: "Swimmins poosl closed for maintenance",
      description: "We would be closing the community pool for...",
      date: "10 Apr 2024",
      annoucementPill: <StatusPill title="Announcement" status="default" />,
    },
  ];

  const [estateUpdates, setEstateUpdates] = useState<updateDataProps[]>(estateUpdateData);

  const handleAnnoucementCard = (index: number, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (estateUpdates) {
      setActiveCard(estateUpdates[index]);
    }
  };

  const handleAnnoucementCardDeleteButton = (itemId: number, index: number) => {
    console.log("hello");

    setAllComments((prevComment) => ({ ...prevComment }));

    // setEstateUpdates((prevUpdates) => prevUpdates.filter((_, id) => id !== itemId));
    setEstateUpdates((prevUpdates) => prevUpdates.filter((update) => update.id !== itemId));

    console.log(estateUpdates);

    if (activeCard?.id === itemId) {
      setActiveCard(undefined);
    }

    console.log(activeCard, "act");
  };

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <header>
        <DashBoardHeader title="Estate Updates" />
        <DashBreadcrumbs title="Estate updates" />
      </header>

      <div className="flex md:flex-row flex-col">
        <section className="md:w-[60%]   p-6 flex flex-col gap-6">
          <h3 className="font-semibold text-buttongray">Updates</h3>
          <div className="flex gap-20 text-primary">
            <SearchBox
              name="update-search"
              placeholder="Search.."
              color="#b4b4b4"
              bgColor="#f1f1f3"
            />
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

          <section className="flex flex-col gap-6">
            {estateUpdates && estateUpdates.length > 0 ? (
              estateUpdates?.map((item, index) => {
                return (
                  <article
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0 hover:border"
                    role="button"
                    onClick={(event) => handleAnnoucementCard(index, event)}
                  >
                    <Modal title="Comments" handleOpenModal={handleOpenModal} ref={commentModalRef}>
                      <div className="z-50 flex flex-col gap-6 mt-6">
                        <h3 className="font-bold">{currentItem?.title}</h3>
                        <p className="">{currentItem?.description}</p>
                        <textarea
                          cols={20}
                          rows={4}
                          className="border rounded-[10px] p-4"
                          placeholder="Write comment here please"
                          value={textAreaValue}
                          onChange={(event) => setTextAreaValue(event.target.value)}
                        ></textarea>
                        <div className="flex justify-center">
                          <Button
                            variant="Primary"
                            iconAlign="after"
                            label="Add comments"
                            color="#139D8F"
                            onClick={handleAddComment}
                          />
                        </div>

                        {currentItem &&
                        allComments[currentItem?.id] &&
                        allComments[currentItem.id].length > 0 ? (
                          <ul className="mt-12 flex flex-col gap-4 bg-[#f1f1f3] p-2 rounded-[10px]">
                            {allComments[currentItem.id].map((comment, index) => (
                              <li
                                key={index}
                                className="bg-white m-2 p-4 rounded-[8px] flex flex-row justify-between gap-6 text-balance text-sm"
                              >
                                <div className="flex flex-col gap-1 w-full">
                                  <p>{comment.text}</p>
                                  <p className="text-xs text-[#7b7b7b]">
                                    {comment.timestamp.toDateString()}
                                  </p>
                                  <div className="mt-2 flex flex-col bg-[#f1f1f3] w-full p-4 rounded-[10px]">
                                    <span className="font-bold">Admin:</span>
                                    <span className="text-[#7b7b7b]">
                                      <i>no response yet</i>
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCommentDelete(currentItem?.id, index)}
                                >
                                  <span className=" flex text-black bg-red-500 p-1 rounded-[8px]">
                                    <DeleteIcon />
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </Modal>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-semibold text-[15px]">{item.title}</h4>
                      <p className="text-[12px] text-buttongray flex w-[200px] whitespace-nowrap overflow-hidden">
                        {item.description}
                      </p>
                      <p className="text-[14px]">{item.date}</p>
                    </div>
                    <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto ml-0 md:ml-6">
                      <span className="hidden md:flex">{item.annoucementPill}</span>
                      <span className="outline outline-primary rounded-full flex text-[14px]">
                        <Button
                          variant="Tertiary"
                          label="Comments"
                          onClick={(ev) => handleCommentButton(item, ev)}
                          iconAlign="none"
                          btnbgColor="#F0FDFC"
                          color="#139D8F"
                          size="Medium"
                        />
                      </span>
                      <Button
                        variant="Tertiary"
                        label="Delete"
                        onClick={() => handleAnnoucementCardDeleteButton(item.id, index)}
                        iconAlign="before"
                        btnbgColor="#DA1919"
                        color="white"
                        bgColor=""
                        icon={DeleteIcon}
                        size="Medium"
                      />
                    </div>
                  </article>
                );
              })
            ) : (
              <div>No updates</div>
            )}

            {/* <article className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
                <p className="text-[12px] text-buttongray">
                  We would be closing the community pool for
                </p>
                <p className="text-[14px]">10 Apr 2024</p>
              </div>
              <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto">
                <span className="hidden md:flex">
                  <StatusPill title="Announcement" status="default" />
                </span>
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
            <article className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
                <p className="text-[12px] text-buttongray">
                  We would be closing the community pool for
                </p>
                <p className="text-[14px]">10 Apr 2024</p>
              </div>
              <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto">
                <span className="hidden md:flex">
                  <StatusPill title="Announcement" status="default" />
                </span>
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
            <article className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
                <p className="text-[12px] text-buttongray">
                  We would be closing the community pool for
                </p>
                <p className="text-[14px]">10 Apr 2024</p>
              </div>
              <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto">
                <span className="hidden md:flex">
                  <StatusPill title="Announcement" status="default" />
                </span>
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
            <article className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white rounded-[8px] gap-6 md:gap-0">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-[15px]">Swimming pool closed for maintenance</h4>
                <p className="text-[12px] text-buttongray">
                  We would be closing the community pool for
                </p>
                <p className="text-[14px]">10 Apr 2024</p>
              </div>
              <div className="flex flex-row h-fit text-[14px] gap-6 w-full md:w-auto">
                <span className="hidden md:flex">
                  <StatusPill title="Announcement" status="default" />
                </span>
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
            </article> */}
          </section>
        </section>
        <section className="md:w-[40%] m-6 bg-white rounded-[20px] border p-6 h-full">
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold">
              {activeCard && estateUpdates.length > 0 ? activeCard.title : estateUpdates[0]?.title}
            </h3>
            <div className="flex flex-row gap-6 text-[14px]">
              <StatusPill title="Annoucement" status="default" />
              <p>
                {activeCard && estateUpdates.length > 0 ? activeCard?.date : estateUpdates[0]?.date}
              </p>
            </div>
            <div className="flex h-[40vh]  w-full">
              {/* <Cards cardType="justImage" image={Building} width={500} height={400} /> */}
              <Image
                src={AnnoucementImage}
                width={400}
                height={300}
                alt="an image of a building"
                className="rounded-[10px] object-contain w-full h-[40vh]"
              />
            </div>

            <div>
              {/* <p> Dear Residents,</p>
              <p>
                {" "}
                Please be advised that the community pool will be closed for routine maintenance on
                Wednesday, June 14th, from 8:00 AM to 4:00 PM. During this time, the pool area will
                be inaccessible to ensure the safety of our residents.
              </p>
              <p>
                {" "}
                We apologize for any inconvenience this may cause, and we appreciate your
                understanding as we work to maintain the pool in optimal condition for your
                enjoyment. Thank you, Estate Management
              </p> */}
              <p>
                {activeCard && estateUpdates.length > 0
                  ? activeCard?.description
                  : estateUpdates[0]?.description}
              </p>
            </div>
            {/* <div className="flex items-center justify-center w-full ">
              <Button
                label="Close"
                onClick={() => "close"}
                variant="Primary"
                iconAlign="after"
                icon={XIcon}
                color="white"
                bgColor="#1AD9C5"
              />
            </div> */}
          </div>
        </section>
      </div>
    </section>
  );
};
