import { useNavigate } from "react-router-dom";
import PlusIcon from "@/assets/icons/PlusIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface SidebarHeaderProps {
  searchQuery: string;
  onSearch: (value: string) => void;
  onCloseSidebar: () => void;
}

export default function SidebarHeader({ searchQuery, onSearch, onCloseSidebar }: SidebarHeaderProps) {
  const navigate = useNavigate();

  const handleCreateNewCorrection = () => {
    onCloseSidebar();
    navigate("/correction");
  };

  return (
    <div className="p-4 md:p-6 border-b border-neutral-300">
      <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
        <div className="space-y-1">
          <h5 className="text-h5 font-semibold">Riwayat Koreksi</h5>
          <p className="text-body text-neutral-500">Daftar koreksi essay terakhir</p>
        </div>
        <Button onClick={handleCreateNewCorrection} radius="full" icon={<PlusIcon className="size-5 fill-white" />} iconPosition="right" className="max-[450px]:hidden">
          Buat Baru
        </Button>
        <Button onClick={handleCreateNewCorrection} radius="full" icon={<PlusIcon className="size-5 fill-white" />} iconPosition="only" className="min-[450px]:hidden" />
      </div>
      <Input placeholder="Cari soal essay disini..." icon={<SearchIcon className="size-5 fill-neutral-500" />} value={searchQuery} onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
}
