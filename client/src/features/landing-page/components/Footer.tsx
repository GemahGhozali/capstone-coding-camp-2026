import { useNavigate } from "react-router-dom";
import ArrowRightUpIcon from "@/assets/icons/ArrowRightUpIcon";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Navlinks from "./Navlinks";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-neutral-300">
      <div className="flex justify-center px-4 pt-6 pb-0 min-[920px]:p-6">
        <div className="w-full max-w-300 flex justify-between items-center max-[920px]:flex-col max-[920px]:gap-4 mx-auto">
          <Logo className="max-[920px]:flex-col max-[920px]:text-center" />
          <Button size="large" color="black" icon={<ArrowRightUpIcon className="text-white size-5" />} iconPosition="right" onClick={() => navigate("/correction")}>
            Coba Sekarang
          </Button>
          <Navlinks className="gap-4 py-4 min-[920px]:hidden" />
        </div>
      </div>
      <hr className="border-neutral-300" />
      <div className="p-4 min-[920px]:p-6">
        <div className="w-full max-w-300 flex justify-center min-[920px]:justify-between items-center mx-auto">
          <Navlinks className="gap-10 max-[920px]:hidden" />
          <p className="text-body text-neutral-500 text-center">&copy; Copyright 2026 EssayGrader - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
