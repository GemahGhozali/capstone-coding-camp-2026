import BotIcon from "@/assets/icons/BotIcon";

interface SectionBadgeProps {
  children: React.ReactNode;
}

export default function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <div className="py-1.5 pl-1.5 pr-3 bg-blue-50 w-max rounded-4xl flex items-center gap-3">
      <div className="grid place-content-center size-7 bg-gradient-primary rounded-full">
        <BotIcon className="text-white size-4" />
      </div>
      <p className="font-medium text-body text-blue-500">{children}</p>
    </div>
  );
}
