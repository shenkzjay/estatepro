import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState } from "react";

interface AdminDashBoardProp {
  isCollapse: boolean;
}

interface updatesProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const AdminHome = ({ isCollapse }: AdminDashBoardProp) => {
  console.log("admin-home", isCollapse);

  const updates: updatesProps[] = [
    {
      id: 1,
      title: "Renovate fitness center and tennis court",
      description:
        "We are commencing the renovation of the tennis court and fitness center from friday to sunday, please be informed that visitors won't be allowed in the premises during the renovation work, thank you",
      date: "10th Apr 2024",
    },

    {
      id: 2,
      title: "Changing of estate security personnels and increase in security charges",
      description:
        "Due to the recent happenings in the estate, we have decided to make changes to some of our security personnel. This is aimed at bolstering our security and creating a safer environmment for our families. We are commencing the renovation of the tennis court and fitness center from friday to sunday, please be informed that visitors won't be allowed in the premises during the renovation work, thank you",
      date: "10th Apr 2024",
    },

    {
      id: 3,
      title:
        "Shops within the estate should comply with the sanitation regulations, it's all about a cleaner and safer environment",
      description:
        "We are commencing the renovation of the tennis court and fitness center from friday to sunday, please be informed that visitors won't be allowed in the premises during the renovation work, thank you",
      date: "10th Apr 2024",
    },
  ];

  const [currentUpdate, setCurrentUpdate] = useState<updatesProps>();

  const viewUpdateRef = useRef<HTMLDialogElement | null>(null);

  const handleModalOpen = () => {
    viewUpdateRef.current?.showModal();
  };

  const handleViewUpdate = (index: number) => {
    setCurrentUpdate(updates[index]);
    handleModalOpen();
  };

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Home" />
      <Modal title="View today's updates" handleOpenModal={handleModalOpen} ref={viewUpdateRef}>
        <div className="flex flex-col gap-6 mt-6">
          <h3 className="font-bold">{currentUpdate?.title}</h3>
          <p className="text-[#7b7b7b]">{currentUpdate?.description}</p>
          <p className="text-[#7b7b7b] text-sm text-right">{currentUpdate?.date}</p>
        </div>
      </Modal>

      <main className="pb-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] gap-10  p-6 ">
          <div className="bg-white p-6 rounded-[12px] space-y-4">
            <h4 className="text-sm">Residents</h4>
            <p className="font-bold text-3xl flex text-left">103</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] space-y-4">
            <h4 className="text-sm">Vendors</h4>
            <p className="font-bold text-3xl flex text-left">48</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] space-y-4">
            <h4 className="text-sm">Staff</h4>
            <p className="font-bold text-3xl flex text-left">26</p>
          </div>
        </div>

        <section className="bg-white m-6 p-6 rounded-[12px]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <h3 className="font-semibold">Today&apos;s updates</h3>
              <span className="text-buttongray">{`(${updates ? updates.length : ""})`}</span>
            </div>
            {/* <div>
              <p className="text-sm">See all</p>
            </div> */}
          </div>

          <section className="mt-3 flex flex-col gap-6 text-buttongray">
            {updates && updates.length > 0 ? (
              updates.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row justify-between bg-[#f8f8f8] p-6 rounded-[12px]"
                >
                  <p className="w-[30rem]">{item.title}</p>
                  <p>{item.date}</p>
                  <button
                    type="button"
                    className="font-bold text-sm text-primary"
                    onClick={() => handleViewUpdate(index)}
                  >
                    View →
                  </button>
                </div>
              ))
            ) : (
              <div>No updates at the moment</div>
            )}
            {/* <div className="flex flex-row justify-between  p-6 bg-[#f8f8f8] rounded-[12px]">
              <p>Renovate fitness center and tennis court</p>
              <p>May 25, 2024</p>
              <a href="#">View</a>
            </div>
            <div className="flex flex-row justify-between p-6 bg-[#f8f8f8] rounded-[12px]">
              <p>Renovate fitness center and tennis court</p>
              <p>May 25, 2024</p>
              <a href="#">View</a>
            </div>
            <div className="flex flex-row justify-between bg-[#f8f8f8] p-6 rounded-[12px]">
              <p>Renovate fitness center and tennis court</p>
              <p>May 25, 2024</p>
              <a href="#">View</a>
            </div>
            <div className="flex flex-row justify-between bg-[#f8f8f8] p-6 rounded-[12px]">
              <p>Renovate fitness center and tennis court</p>
              <p>May 25, 2024</p>
              <a href="#">View</a>
            </div> */}
          </section>
        </section>
      </main>
    </section>
  );
};
