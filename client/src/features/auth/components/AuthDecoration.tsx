import Mockup from "@/assets/images/mockup-2.png";
import SunshineEffect from "@/assets/images/sunshine-effect.png";
import DotsPattern from "@/assets/images/dots-pattern.svg";
import BotIcon from "@/assets/icons/BotIcon";
import StarsIcon from "@/assets/icons/StarsIcon";

export default function AuthDecoration() {
  return (
    <div className="max-xl:hidden min-h-230 min-[920px]:h-dvh bg-gradient-primary relative flex flex-col">
      {/* Sunshine Effect & Stars */}
      <img src={SunshineEffect} alt="Sunshine Effect" className="mix-blend-screen w-full absolute top-0" />
      <StarsIcon className="absolute top-9.25 right-12.75" />
      <StarsIcon className="absolute top-26.75 left-12.75" />

      <div className="pt-30 px-7.25 flex flex-col gap-6 items-center">
        {/* Badge */}
        <div className="py-1.5 pl-1.5 pr-3 bg-white w-max rounded-4xl flex items-center gap-3">
          <div className="grid place-content-center size-7 bg-gradient-primary rounded-full">
            <BotIcon className="text-white size-4" />
          </div>
          <p className="font-medium text-body text-blue-500">EssayGrader</p>
        </div>

        {/* Text */}
        <div className="text-center space-y-3">
          <h3 className="text-h3 text-white font-bold">EssayGrader hadir sebagai solusi penilaian berbasis AI yang memberikan penilaian instan dan akurat.</h3>
          <p className="text-body text-neutral-100">
            Tingkatkan produktivitas anda dalam mengevaluasi ribuan esai <br className="max-[1220px]:hidden" /> hanya dengan satu klik!
          </p>
        </div>
      </div>

      {/* Mockup */}
      <div className="pt-13.5 grow flex items-end px-5 overflow-hidden relative">
        <img src={Mockup} alt="Mockup Image 1" className="w-full max-h-full object-contain relative z-10" />
        <img src={DotsPattern} alt="Mockup Image 1" className="absolute w-full top-0" />
      </div>
    </div>
  );
}
