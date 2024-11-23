import { forwardRef, useEffect } from "react";
import "./modal.css";
import { XIcon } from "@/public/svgIcons/xIcon";

interface DialogProp {
  title: string;
  handleOpenModal: () => void;
  children: React.ReactNode;
}

interface DialogRefProp {
  current: HTMLDialogElement | null;
}

export const Modal = forwardRef<HTMLDialogElement | null, DialogProp>(
  ({ title, children }, ref) => {
    const handleCloseModal = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
    };

    return (
      <dialog ref={ref} className="dialog-wrapper">
        <div className="dialog_header">
          <h3>{title}</h3>
          <button onClick={handleCloseModal} autoFocus aria-label="close-button" type="button">
            <span>
              <XIcon />
            </span>
          </button>
        </div>
        {children}
        {/* <button onClick={handleCloseModal} autoFocus>
          Close
        </button> */}
      </dialog>
    );
  }
);
