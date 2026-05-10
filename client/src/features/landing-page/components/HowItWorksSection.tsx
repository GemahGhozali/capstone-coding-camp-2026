import SectionBadge from "./SectionBadge";
import StepCard from "./StepCard";
import StepOneIllustration from "@/assets/images/card-illustration-1.jpg";
import StepTwoIllustration from "@/assets/images/card-illustration-2.jpg";
import StepThreeIllustration from "@/assets/images/card-illustration-3.jpg";

const STEP_BY_STEP = [
  {
    imageUrl: StepOneIllustration,
    title: "Masukkan Soal dan Jawaban",
    caption: "Tulis soal essay, tambahkan referensi jawaban sebagai acuan, lalu masukkan jawaban yang ingin dikoreksi",
  },
  {
    imageUrl: StepTwoIllustration,
    title: "Biarkan AI Bekerja dan Menilai",
    caption: "AI akan menganalisis, membandingkan, dan mengukur tingkat kemiripan jawaban secara otomatis",
  },
  {
    imageUrl: StepThreeIllustration,
    title: "Dapatkan Hasil Penilaian",
    caption: "Lihat skor akhir, tingkat kemiripan dengan referensi, dan feedback detail dari jawaban yang telah dikoreksi",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="w-full max-w-300 mx-auto pt-16">
      <div className="flex flex-col items-center mb-6 md:mb-8">
        <SectionBadge>Cara Kerja EssayGrader</SectionBadge>
        <h3 className="text-center text-h3 font-bold mt-4 mb-2">Bagaimana Cara EssayGrader Bekerja?</h3>
        <p className="text-center text-body text-neutral-500">Tiga langkah sederhana untuk mendapatkan hasil koreksi yang instan, lengkap, dan objektif.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6">
        {STEP_BY_STEP.map((content, index) => (
          <StepCard key={index} {...content} />
        ))}
      </div>
    </section>
  );
}
