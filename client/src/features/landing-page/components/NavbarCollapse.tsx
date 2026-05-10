import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import UserProfile from "@/components/ui/UserProfile";
import CloseIcon from "@/assets/icons/CloseIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import useAuthStore from "@/stores/auth.store";
import { useLogout } from "@/features/auth/";
import { useActiveSection } from "../hooks/useActiveSection";

interface NavbarCollapseProps {
  isClosed: boolean;
  onClose: () => void;
}

const NAVLINKS = [
  { href: "beranda", text: "Beranda" },
  { href: "cara-kerja", text: "Cara Kerja" },
  { href: "tentang-aplikasi", text: "Tentang Aplikasi" },
];

export default function NavbarCollapse({ isClosed, onClose }: NavbarCollapseProps) {
  const activeSection = useActiveSection(NAVLINKS.map((link) => link.href));
  const navbarCollppaseStyle = `z-50 grow flex lg:items-center max-lg:h-dvh max-lg:w-full max-lg:max-w-107.5 max-lg:bg-white max-lg:flex-col max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:border-l max-lg:border-neutral-300 duration-300 ease-in-out transition-transform ${isClosed ? "max-lg:translate-x-full" : "max-lg:translate-x-0"}`;

  return (
    <>
      <div className={navbarCollppaseStyle}>
        <NavbarCollapseHeader onClose={onClose} />
        <ul className="flex text-body gap-10 max-lg:gap-0 lg:mx-auto max-lg:flex-col max-lg:*:p-4 max-lg:grow overflow-y-auto">
          {NAVLINKS.map((link) => (
            <li key={link.href}>
              <a href={`#${link.href}`} className={`transition-all duration-300 capitalize ${activeSection === link.href ? "text-blue-500 font-semibold" : "text-neutral-500"}`} onClick={onClose}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <NavbarCollapseFooter />
      </div>

      {/* Backdrop */}
      <NavbarCollapseBackdrop isClosed={isClosed} onClose={onClose} />
    </>
  );
}

function NavbarCollapseHeader({ onClose }: Omit<NavbarCollapseProps, "isClosed">) {
  return (
    <div className="p-4 border-b flex justify-between items-center border-neutral-300 lg:hidden">
      <Logo variant="name" />
      <Button icon={<CloseIcon className="size-7 md:size-8 text-neutral-500" />} iconPosition="only" color="white" className="lg:hidden bg-transparent" onClick={onClose} />
    </div>
  );
}

function NavbarCollapseFooter() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();

  if (user) {
    return (
      <div className="max-lg:p-4 max-lg:border-t max-lg:border-t-neutral-300 flex gap-3 max-lg:flex-col max-lg:gap-4">
        <Button size="large" icon={<LogoutIcon className="size-5 text-white" />} iconPosition="right" color="black" radius="full" onClick={() => logout()} className="max-lg:order-2">
          Logout
        </Button>

        {/* Desktop Breakpoint */}
        <UserProfile username={user.username} email={user.email} className="max-lg:hidden" variant="icon" />

        {/* Mobile Breakpoint */}
        <UserProfile username={user.username} email={user.email} className="order-1 lg:hidden" direction="right" />
      </div>
    );
  }

  return (
    <div className="flex gap-4 lg:gap-3 max-lg:flex-col max-lg:*:grow max-lg:p-4 max-lg:border-t max-lg:border-neutral-300">
      <Button size="large" radius="full" color="white" className="max-lg:order-2" onClick={() => navigate("/auth/register")}>
        Register
      </Button>
      <Button size="large" radius="full" color="black" className="max-lg:order-1" onClick={() => navigate("/auth/login")}>
        Login
      </Button>
    </div>
  );
}

function NavbarCollapseBackdrop({ isClosed, onClose }: NavbarCollapseProps) {
  return (
    <div
      className={`lg:hidden fixed backdrop-blur-sm duration-300 transition-opacity p-4 bg-black/20 inset-0 z-10 ${isClosed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
      onClick={onClose}
    ></div>
  );
}
