import CorrectionIcon from "@/assets/icons/CorrectionIcon";

interface CorrectionHistoryEmptyStateProps {
  message: string;
}

export default function CorrectionHistoryEmptyState({ message }: CorrectionHistoryEmptyStateProps) {
  return (
    <div className="grow flex justify-center items-center flex-col gap-4">
      <div className="size-20 grid place-content-center bg-blue-50 rounded-full">
        <CorrectionIcon className="size-10 fill-blue-500" />
      </div>
      <p className="text-body font-medium text-neutral-500">{message}</p>
    </div>
  );
}
