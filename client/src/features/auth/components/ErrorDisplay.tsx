import { useState, useEffect } from "react";
import CloseIcon from "@/assets/icons/CloseIcon";
import ErrorIcon from "@/assets/icons/ErrorIcon";

interface ErrorDisplayProps {
  error: Error;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  const [showDisplay, setShowDisplay] = useState(false);

  useEffect(() => {
    if (error) setShowDisplay(true);
  }, [error]);

  const displayPosition = showDisplay && error ? "translate-y-0 opacity-100" : "-translate-y-48 opacity-0";

  return (
    <div className={`w-full sm:w-max absolute top-0 p-4 sm:p-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out transform ${displayPosition}`}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
        <ErrorIcon className="size-6 fill-red-500 shrink-0 text-white" />
        <p className="grow">{error.message}</p>
        <button type="button" onClick={() => setShowDisplay(false)}>
          <CloseIcon className="size-6 text-neutral-500" />
        </button>
      </div>
    </div>
  );
}
