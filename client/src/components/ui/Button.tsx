// Button Options
type ButtonSize = "regular" | "large";
type ButtonColor = "primary" | "black" | "white" | "red";
type ButtonRadius = "default" | "full";
type WithIcon = { icon: React.ReactElement; iconPosition: "left" | "right" | "only" };
type WithoutIcon = { icon?: never; iconPosition?: never };
type IconProps = WithIcon | WithoutIcon;

// Base Button Props
interface BaseButtonProps {
  children?: React.ReactNode;
  size?: ButtonSize;
  radius?: ButtonRadius;
  color?: ButtonColor;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

// Button Props (Base + Icon)
type ButtonProps = BaseButtonProps & IconProps;

// Constant Styles
const COLOR_STYLES: Record<ButtonColor, string> = {
  primary: "bg-gradient-primary hover:brightness-95 text-white inset-ring-2 inset-ring-white/25 focus:ring-blue-200",
  black: "bg-neutral-800 hover:bg-neutral-900 text-white focus:ring-neutral-500",
  white: "bg-neutral-100 hover:bg-neutral-200 text-black focus:ring-neutral-200",
  red: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
};

const RADIUS_STYLES: Record<ButtonRadius, string> = {
  default: "rounded-[8px]",
  full: "rounded-[32px]",
};

export default function Button(props: ButtonProps) {
  const { children, icon, onClick, type = "button", disabled, iconPosition } = props;

  const isIconOnly = iconPosition === "only";
  const isIconLeft = iconPosition === "left";
  const isIconRight = iconPosition === "right";

  const buttonStyle = generateButtonClassStyle(props);

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonStyle}>
      {isIconLeft && icon}
      {!isIconOnly && children}
      {isIconRight && icon}
      {isIconOnly && icon}
    </button>
  );
}

function generateButtonClassStyle(props: ButtonProps): string {
  const { size = "regular", iconPosition, radius = "default", color = "primary", className = "" } = props;

  const isRegular = size === "regular";
  const isLarge = size === "large";
  const isIconOnly = iconPosition === "only";
  const isIconLeft = iconPosition === "left";
  const isIconRight = iconPosition === "right";

  const iconOnlyStyles = isRegular ? "w-[40px] h-[40px]" : "w-[48px] h-[48px]";
  const basePaddingY = isRegular ? "py-[8px]" : "py-[10px]";
  const paddingLeft = isIconLeft ? (isRegular ? "pl-[12px]" : "pl-[16px]") : isLarge ? "pl-[20px]" : "pl-[16px]";
  const paddingRight = isIconRight ? (isRegular ? "pr-[12px]" : "pr-[16px]") : isLarge ? "pr-[20px]" : "pr-[16px]";

  const paddingStyles = isIconOnly ? iconOnlyStyles : `${basePaddingY} ${paddingLeft} ${paddingRight}`;

  const textStyles = isRegular ? "text-btn" : "text-btn-lg";

  return `transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 ${textStyles} ${COLOR_STYLES[color]} ${RADIUS_STYLES[radius]} ${paddingStyles} ${className}`;
}
