import SectionBadge from "./SectionBadge";
import MockupV1 from "@/assets/images/mockup-1.png";
import MockupV2 from "@/assets/images/mockup-2.png";

export default function CTASection() {
  return (
    <section className="w-full mx-auto pt-16 md:pt-32">
      <div className="flex flex-col items-center max-sm:mb-4">
        <SectionBadge>Tertarik Dengan EssayGrader?</SectionBadge>
        <h3 className="text-center text-h3 font-bold mt-4 mb-2">Gunakan EssayGrader Sekarang Juga!</h3>
        <p className="text-center text-body text-neutral-500">Rasakan kemudahan mengoreksi essay dengan bantuan AI</p>
      </div>
      <img src={MockupV1} alt="EssayGrader Application Mockup V1" className="max-md:hidden mx-auto w-full max-w-284.75" />
      <img src={MockupV2} alt="EssayGrader Application Mockup V1" className="md:hidden" />
    </section>
  );
}
