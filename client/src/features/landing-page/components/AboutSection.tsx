import SectionBadge from "./SectionBadge";
import SolutionList from "./SolutionList";
import AboutIllustration from "@/assets/images/about-illustration.png";

const SOLUTON_LIST = [
  "Otomatisasi proses koreksi menggunakan teknologi AI",
  "Hasil koreksi lengkap dengan skor, tingkat kemiripan, dan feedback detail",
  "Riwayat koreksi tersimpan otomatis sehingga mudah diakses kapan saja",
  "Antarmuka pengguna yang simpel dan mudah digunakan",
];

export default function AboutSection() {
  return (
    <section id="tentang-aplikasi" className="w-full max-w-300 mx-auto flex items-center max-[1440px]:flex-col relative gap-4 min-[1440px]:gap-16 pt-16 md:pt-32">
      <div className="max-[1440px]:size-auto w-104 h-129 shrink-0 max-[1440px]:order-2">
        <img src={AboutIllustration} alt="About Illustration" className="max-[1440px]:w-170 w-133.75 relative -left-4 min-[1440px]:absolute min-[1440px]:-left-21 min-[1440px]:-bottom-7" />
      </div>
      <div className="max-[1440px]:order-1">
        <SectionBadge>Tentang EssayGrader</SectionBadge>
        <h3 className="text-h3 font-bold max-md:mb-2 my-4">Apa Yang Melatarbelakangi Pembuatan EssayGrader?</h3>
        <p className="text-body text-neutral-500 mb-6 md:mb-8">
          Proses koreksi essay sering kali memakan waktu karena setiap jawaban memiliki gaya, struktur, serta pilihan kata yang berbeda meskipun memiliki makna yang serupa. Kondisi ini meningkatkan
          beban pengajar serta menurunkan efisiensi dan konsistensi penilaian. Untuk menjawab tantangan tersebut, EssayGrader menghadirkan solusi melalui:
        </p>
        <ul className="space-y-4 md:space-y-5">
          {SOLUTON_LIST.map((solution, index) => (
            <SolutionList key={index}>{solution}</SolutionList>
          ))}
        </ul>
      </div>
    </section>
  );
}
