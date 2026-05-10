import type { RefObject } from "react";
import { Modal, type ModalHandle } from "@/components/Modal";
import Button from "@/components/ui/Button";
import WarningIcon from "@/assets/icons/WarningIcon";

interface DeleteCorrectionModalProps {
  ref: RefObject<ModalHandle | null>;
  onDelete: () => void;
}

export default function DeleteCorrectionModal({ ref, onDelete }: DeleteCorrectionModalProps) {
  return (
    <Modal ref={ref} className="bg-white p-4 md:p-6 max-w-140 rounded-2xl text-center">
      {/* Warning Icon */}
      <div className="grid place-content-center bg-red-100 rounded-full size-18.75 mx-auto mb-6">
        <WarningIcon className="size-10 fill-red-600" />
      </div>

      {/* Confirmation Messages */}
      <h4 className="text-h4 font-semibold mb-1">Hapus Hasil Koreksi</h4>
      <p className="text-body text-neutral-500">Apakah anda yakin ingin menghapus hasil koreksi?</p>

      {/* Action Buttons */}
      <div className="flex max-sm:flex-col gap-4 mt-4 sm:mt-6">
        <Button size="large" color="white" onClick={() => ref.current?.closeModal()} className="grow max-sm:order-2">
          Batalkan
        </Button>
        <Button size="large" color="red" onClick={onDelete} className="grow max-sm:order-1">
          Hapus
        </Button>
      </div>
    </Modal>
  );
}
