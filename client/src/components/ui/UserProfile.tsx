interface UserProfileProps {
  username: string;
  email: string;
  direction?: "left" | "right";
  variant?: "full" | "icon";
  className?: string;
}

export default function UserProfile({ username, email, direction = "left", variant = "full", className = "" }: UserProfileProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {variant === "full" && (
        <div className={`*:shrink ${direction === "left" ? "text-right order-1" : "text-left order-2"}`}>
          <p className="text-body font-semibold line-clamp-1">{username}</p>
          <p className="text-caption text-neutral-500 line-clamp-1">{email}</p>
        </div>
      )}
      <div className={`size-12.5 bg-neutral-200 grid place-content-center text-body font-semibold rounded-full ${direction === "left" ? "order-2" : "order-1"}`}>{getInitials(username)}</div>
    </div>
  );
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  // prettier-ignore
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");
}
