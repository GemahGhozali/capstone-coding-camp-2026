interface LineProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

function getColor(value: number): string {
  if (value >= 76) return "bg-green-500";
  if (value >= 41) return "bg-yellow-500";
  return "bg-red-500";
}

function getTextColor(value: number): string {
  if (value >= 76) return "text-green-500";
  if (value >= 41) return "text-yellow-500";
  return "text-red-500";
}

export default function LineProgressBar({ value, label, className = "" }: LineProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-2">
          <p className="text-caption font-semibold text-neutral-500">{label}</p>
          <p className={`text-caption font-semibold ${getTextColor(clampedValue)}`}>{clampedValue}%</p>
        </div>
      )}
      <div className="w-full bg-neutral-200 rounded-full h-1.5">
        <div className={`h-full rounded-full transition-all duration-300 ${getColor(clampedValue)}`} style={{ width: `${clampedValue}%` }} />
      </div>
    </div>
  );
}
