import React from "react";

interface TabProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Tab({ isActive = false, className = "", onClick, children }: TabProps) {
  const tabClassStyle = `rounded-4xl cursor-pointer text-caption px-4 py-2 border ${isActive ? "border-blue-600 bg-blue-100 text-blue-600 font-semibold" : "border-neutral-300 bg-white text-black"} ${className}`;

  return (
    <button type="button" onClick={onClick} className={tabClassStyle}>
      {children}
    </button>
  );
}
