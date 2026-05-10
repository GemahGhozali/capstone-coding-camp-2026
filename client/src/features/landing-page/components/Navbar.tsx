import { useState } from "react";
import MenuIcon from "@/assets/icons/MenuIcon";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import NavbarCollapse from "./NavbarCollapse";
import { useScroll } from "../hooks/useScroll";

export default function Navbar() {
  const [navbarCollapse, setNavbarCollapse] = useState(true);

  const handleOpenNavbar = () => setNavbarCollapse(false);
  const handleCloseNavbar = () => setNavbarCollapse(true);

  const isScrolled = useScroll();

  return (
    <nav className={`duration-300 w-full p-4 md:p-6 fixed z-50 max-lg:border-b ${isScrolled ? `max-lg:bg-white max-lg:border-b-neutral-300` : "max-lg:bg-transparent max-lg:border-b-transparent"}`}>
      <div
        className={`duration-300 w-full max-w-300 mx-auto flex items-center justify-between lg:border ${isScrolled ? `lg:p-3 lg:rounded-full lg:bg-white lg:border-neutral-300` : "bg-transparent lg:border-transparent"}`}
      >
        <Logo variant="name" />
        <Button icon={<MenuIcon className="size-7 md:size-8 fill-neutral-500" />} iconPosition="only" color="white" className="lg:hidden bg-transparent" onClick={handleOpenNavbar} />
        <NavbarCollapse isClosed={navbarCollapse} onClose={handleCloseNavbar} />
      </div>
    </nav>
  );
}
