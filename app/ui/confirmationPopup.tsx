import { createPortal } from "react-dom";
import { useRef } from "react";
import { useOutsideClick } from "../lib/hooks/useOutsideClick";

export default function ConfirmationPopup({
  isOpen,
  resourceName,
  onConfirm,
  onCancel,
  isDeleting,
  setIsOpen,
}: {
  isOpen: boolean;
  resourceName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef(null);
  useOutsideClick(ref, () => setIsOpen(false), isOpen);

  return (
    typeof document !== "undefined" &&
    createPortal(
      isOpen && (
        <div className="fixed top-0 w-full h-full grid place-content-center bg-white/10 backdrop-blur-sm z-20">
          <div
            ref={ref}
            className="bg-background-500 w-fit px-2 py-4 flex flex-col items-center justify-center gap-4 rounded-md"
          >
            <h1 className="font-bold text-xl capitalize">
              delete {resourceName}
            </h1>
            <p className="text-center">
              Are you sure you want to delete this {resourceName} permanently?
              <br />
              <span className="font-bold text-red-800">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex w-fit gap-4">
              <button
                className="primary-link w-full py-2 disabled:bg-slate-500 disabled:cursor-wait disabled:brightness-100 disabled:border-0"
                onClick={onConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "deleting..." : "delete"}
              </button>
              <button
                className="primary-link disabled:cursor-not-allowed"
                onClick={onCancel}
                disabled={isDeleting}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      ),
      document.body
    )
  );
}
