interface StepCardProps {
  imageUrl: string;
  title: string;
  caption: string;
}

export default function StepCard({ imageUrl, title, caption }: StepCardProps) {
  return (
    <div className="p-2 rounded-3xl border border-neutral-300 bg-white">
      <img src={imageUrl} alt="Masukkan Soal dan Jawaban" className="rounded-t-2xl" />
      <div className="p-3">
        <p className="text-body font-semibold mb-2">{title}</p>
        <p className="text-caption text-neutral-500">{caption}</p>
      </div>
    </div>
  );
}
