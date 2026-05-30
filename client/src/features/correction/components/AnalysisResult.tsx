import CircularProgressBar from "@/components/ui/CircularProgressBar";
import LineProgressBar from "@/components/ui/LineProgressBar";
import ScoreBadge from "@/components/ui/ScoreBadge";

interface AnalysisResultProps {
  finalScore: number;
  similarityScore: number;
  feedback: string;
}

export default function AnalysisResult({ finalScore, similarityScore, feedback }: AnalysisResultProps) {
  return (
    <div className="space-y-3">
      <p className="text-body font-semibold">Skor Akhir Penilaian</p>
      <div className="max-sm:px-4 max-sm:pb-4 p-6 bg-white border border-neutral-300 rounded-2xl">
        <div className="flex max-sm:flex-col items-center gap-6 mb-6">
          <CircularProgressBar value={finalScore} className="shrink-0" />
          <div className="w-full space-y-3">
            <div className="flex max-sm:flex-col max-sm:gap-2 items-center justify-between">
              <p className="text-body font-semibold">Hasil Analisis</p>
              <ScoreBadge score={finalScore} variant="relevance" />
            </div>
            <p className="text-caption text-neutral-500 max-sm:text-center">{feedback}</p>
          </div>
        </div>
        <LineProgressBar value={similarityScore} label="Kemiripan Dengan Referensi Jawaban" />
      </div>
    </div>
  );
}
