import { useNavigate } from "react-router-dom";
import ArrowRightUpIcon from "@/assets/icons/ArrowRightUpIcon";
import PlayIcon from "@/assets/icons/PlayIcon";
import GridPattern from "@/assets/images/grid-pattern.svg";
import Button from "@/components/ui/Button";
import Navbar from "./Navbar";
import SectionBadge from "./SectionBadge";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="beranda" className="w-full relative overflow-x-hidden">
      <Navbar />
      <div className="w-full max-w-300 mx-auto flex flex-col items-center px-4 md:px-6 py-42 md:py-51 relative z-20">
        <SectionBadge>Solusi Cerdas Untuk Koreksi Essay</SectionBadge>
        <h1 className="text-h1 font-bold text-center mt-6 md:mt-8 mb-4 md:mb-6">
          Koreksi Essay <span className="text-blue-600">Lebih Cepat dan Akurat</span> dengan <span className="text-blue-600">Teknologi AI</span>
        </h1>
        <p className="text-neutral-500 md:text-xl md:leading-7.5 text-body text-center max-w-273.5">
          <strong>EssayGrader</strong> hadir sebagai solusi penilaian berbasis AI yang memberikan penilaian instan dan akurat. Tingkatkan produktivitas anda dalam mengevaluasi ribuan esai hanya dengan
          satu klik!
        </p>
        <div className="w-full flex justify-center items-stretch gap-4 mt-8 max-[460px]:flex-col max-[460px]:*:grow">
          <Button size="large" icon={<ArrowRightUpIcon className="size-5 text-white" />} iconPosition="right" onClick={() => navigate("/correction")}>
            Coba Sekarang
          </Button>
          <Button size="large" icon={<PlayIcon className="size-5 text-white" />} iconPosition="right" color="black">
            Lihat Demo
          </Button>
        </div>
      </div>

      {/* Grid Pattern */}
      <img src={GridPattern} alt="Grid Pattern" className=" absolute left-1/2 -translate-x-1/2 bottom-0 w-full min-w-360 max-w-none" />

      {/* Glow Left */}
      <div className="absolute top-0 bottom-0 -translate-x-1/2 w-53.5 bg-blue-400/30 blur-[150px] rounded-[50%/50%] max-md:hidden"></div>

      {/* Glow Right */}
      <div className="absolute top-0 bottom-0 right-0 translate-x-1/2 w-53.5 bg-blue-400/30 blur-[150px] rounded-[50%/50%] max-md:hidden"></div>

      {/* Fadeout Effect */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-neutral-50 from-0% to-white/0 to-14%"></div>
    </section>
  );
}
