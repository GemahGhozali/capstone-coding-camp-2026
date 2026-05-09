import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

export interface ModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalProps {
  ref: React.Ref<ModalHandle>;
  children: ReactNode;
  className?: string;
}

export function Modal({ ref, className = "", children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      closeModal: () => {
        if (modalRef.current) {
          modalRef.current.close();
        }
      },
      openModal: () => {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      },
    };
  }, []);

  const handleCloseModal = (e: MouseEvent<HTMLDialogElement>) => {
    if (!modalRef.current) return;
    if (e.target === modalRef.current) modalRef.current.close();
  };

  const modalRoot = document.getElementById("modal");

  if (!modalRoot) return null;

  return createPortal(
    <dialog ref={modalRef} className="backdrop:bg-black/30 top-1/2 left-1/2 -translate-1/2 z-50 bg-transparent w-full max-w-none px-4" onClick={handleCloseModal}>
      <div className={`mx-auto ${className}`}>{children}</div>
    </dialog>,
    modalRoot,
  );
}
