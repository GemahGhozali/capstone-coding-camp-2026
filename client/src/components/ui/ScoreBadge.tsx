type BadgeColor = "green" | "yellow" | "red";
type BadgeVariant = "score" | "relevance";

const COLOR_STYLES: Record<BadgeColor, string> = {
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
};

function getColor(score: number): BadgeColor {
  if (score >= 76) return "green";
  if (score >= 41) return "yellow";
  return "red";
}

function getLabel(score: number, variant: BadgeVariant): string {
  if (variant === "score") return `${score}/100`;
  if (score >= 76) return "Sangat Relevan";
  if (score >= 41) return "Cukup Relevan";
  return "Kurang Relevan";
}

interface BadgeProps {
  score: number;
  variant?: BadgeVariant;
  className?: string;
}

export default function ScoreBadge({ score, variant = "score", className = "" }: BadgeProps) {
  return (
    <span className={`rounded-4xl px-2.5 py-1.5 text-badge font-semibold ${COLOR_STYLES[getColor(score)]} ${className}`}>
      {getLabel(score, variant)}
    </span>
  );
}
