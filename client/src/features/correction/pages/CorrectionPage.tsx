import { useCreateCorrection } from "../api/correction.mutations";
import useCorrectionForm from "../hooks/useCorrectionForm";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import EditIcon from "@/assets/icons/EditIcon";
import SparklesIcon from "@/assets/icons/SparklesIcon";
import AnswerReferencesInput from "../components/AnswerReferencesInput";
import AnalysisResultSkeleton from "../components/AnalysisResultSkeleton";
import type { CorrectionFormValues } from "../schemas/correction.schema";

export function CorrectionPage() {
  const { mutate: createCorrection, isPending } = useCreateCorrection();

  const { register, errors, fields, append, remove, onSubmit } = useCorrectionForm({
    submitFn: (data: CorrectionFormValues) => createCorrection({ ...data }),
  });

  return (
    <form onSubmit={onSubmit} className="grow p-4 md:p-6 xl:p-16 overflow-y-auto space-y-6 md:space-y-10 bg-neutral-50 scrollbar-hide">
      <div className="space-y-0.5">
        <h4 className="text-h4 font-semibold">Koreksi Essay</h4>
        <p className="text-body text-neutral-500">Silahkan input soal, referensi jawaban dan jawaban yang ingin dikoreksi</p>
      </div>

      <Input
        type="text"
        label="Soal Essay"
        icon={<EditIcon className="size-5 fill-neutral-500" />}
        placeholder="Tuliskan soal essay disini..."
        error={errors.question?.message}
        disabled={isPending}
        {...register("question")}
      />

      <AnswerReferencesInput fields={fields} register={register} errors={errors} onAdd={() => append({ value: "" })} onRemove={remove} />

      <TextArea
        label="Jawaban Yang Ingin Dikoreksi"
        placeholder="Tulis jawaban yang ingin dikoreksi disini..."
        error={errors.gradedAnswer?.message}
        disabled={isPending}
        {...register("gradedAnswer")}
      />

      {isPending && <AnalysisResultSkeleton />}

      {!isPending && (
        <Button type="submit" size="large" className="w-full" icon={<SparklesIcon className="size-6 fill-white" />} iconPosition="right">
          Koreksi Jawaban Dengan AI
        </Button>
      )}
    </form>
  );
}
