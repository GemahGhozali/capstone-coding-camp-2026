import formattedDate from "@/utils/formattedDate";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import LineProgressBar from "@/components/ui/LineProgressBar";
import ScoreBadge from "@/components/ui/ScoreBadge";

interface CorrectionHistoryItemProps {
  question: string;
  finalScore: number;
  createdAt: Date | string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function CorrectionHistoryItem({ question, finalScore, createdAt, isActive = false, onClick, className = "" }: CorrectionHistoryItemProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-5 md:p-6 relative ${isActive ? "inset-ring-2 inset-ring-black bg-neutral-50" : "bg-white inset-ring inset-ring-neutral-300"} ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <CalendarIcon className="size-4 fill-blue-600" />
        <p className="text-badge font-semibold text-neutral-500">{formattedDate(createdAt)}</p>
      </div>
      <p className="font-semibold text-body line-clamp-1">{question}</p>
      <LineProgressBar value={finalScore} className="my-4" />
      <div className="flex items-end justify-between">
        <p className="text-caption font-medium text-neutral-500">Skor Akhir Penilaian:</p>
        <ScoreBadge score={finalScore} />
      </div>
    </div>
  );
}
