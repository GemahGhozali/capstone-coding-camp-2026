import { Link } from "react-router-dom";
import BotIcon from "@/assets/icons/BotIcon";

type LogoVariant = "icon" | "name" | "full";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export default function Logo({ variant = "full", className }: LogoProps) {
  return (
    <div className={`cursor-pointer flex gap-3 items-center ${className}`}>
      <Link to="/" className="grid place-content-center bg-gradient-primary rounded-full inset-ring-2 inset-ring-white/25 size-10.5 md:size-13">
        <BotIcon className="size-5 md:size-6 text-white" />
      </Link>

      {variant !== "icon" && (
        <div>
          <h5 className="text-h5 font-semibold">EssayGrader</h5>
          {variant === "full" && <p className="text-caption text-neutral-500">Solusi Cerdas Untuk Koreksi Essay</p>}
        </div>
      )}
    </div>
  );
}
