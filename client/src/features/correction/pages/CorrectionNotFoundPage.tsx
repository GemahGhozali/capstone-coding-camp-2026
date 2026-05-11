import { useNavigate } from "react-router-dom";
import CorrectionIcon from "@/assets/icons/CorrectionIcon";
import ErrorIcon from "@/assets/icons/ErrorIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import Button from "@/components/ui/Button";

export function CorrectionNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="grow flex justify-center items-center flex-col">
      <div className="grid place-content-center size-20 rounded-full bg-blue-50 relative mb-4">
        <ErrorIcon className="size-8 absolute -top-2 -right-2 fill-red-400" />
        <CorrectionIcon className="fill-blue-500 size-10" />
      </div>
      <h4 className="text-h4 font-semibold mb-1">404 Not Found</h4>
      <p className="text-body text-neutral-500 mb-4">Data koreksi tidak ditemukan!</p>
      <Button color="black" icon={<PlusIcon className="size-5 fill-white" />} iconPosition="right" onClick={() => navigate("/correction")}>
        Buat Koreksi Baru
      </Button>
    </div>
  );
}
