import { useLogout } from "@/features/auth";
import useAuthStore from "@/stores/auth.store";
import MenuIcon from "@/assets/icons/MenuIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import UserProfile from "@/components/ui/UserProfile";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();

  return (
    <div className="p-4 md:p-6 flex items-center justify-between gap-3 w-full bg-white border-b border-neutral-300">
      <Logo />
      <div className="max-xl:hidden flex gap-3">
        {user && <UserProfile username={user.username} email={user.email} />}
        <Button size="large" icon={<LogoutIcon className="size-5 text-white" />} iconPosition="only" color="black" onClick={() => logout()} />
      </div>
      <Button icon={<MenuIcon className="size-7 md:size-8 fill-neutral-500" />} iconPosition="only" color="white" onClick={onToggleSidebar} className="xl:hidden bg-transparent" />
    </div>
  );
}
