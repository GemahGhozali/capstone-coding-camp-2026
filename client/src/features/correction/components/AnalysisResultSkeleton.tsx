export default function AnalysisResultSkeleton() {
  return (
    <div>
      <p className="text-body font-semibold mb-0.5">Skor Akhir Penilaian</p>
      <p className="text-caption italic mb-3 text-neutral-500">AI sedang dalam proses mengoreksi jawaban essay, mohon ditunggu...</p>

      <div className="p-6 bg-white border border-neutral-300 rounded-2xl">
        <div className="flex max-sm:flex-col items-center gap-6 mb-6">
          {/* Circular Progress Bar Skeleton */}
          <div className="size-30 rounded-full border-14 border-neutral-200 animate-pulse shrink-0" />

          <div className="w-full space-y-3">
            <div className="flex max-sm:flex-col max-sm:gap-2 items-center justify-between">
              {/* Title Skeleton */}
              <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
              {/* Badge Skeleton */}
              <div className="h-6 w-24 bg-neutral-200 rounded-full animate-pulse" />
            </div>

            {/* Feedback Text Skeleton */}
            <div className="space-y-2 max-sm:*:mx-auto">
              <div className="h-3 w-4/5 bg-neutral-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-neutral-200 rounded animate-pulse" />
              <div className="h-3 w-11/12 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Line Progress Bar Skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-48 bg-neutral-200 rounded animate-pulse" />
            <div className="h-3 w-8 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div className="h-2 w-full bg-neutral-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
