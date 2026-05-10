import CheckIcon from "@/assets/icons/CheckIcon";

interface SolutionListProps {
  children: React.ReactNode;
}

export default function SolutionList({ children }: SolutionListProps) {
  return (
    <li className="flex gap-3">
      <CheckIcon className="size-6 fill-blue-500 shrink-0" />
      <p className="text-body font-medium">{children}</p>
    </li>
  );
}
