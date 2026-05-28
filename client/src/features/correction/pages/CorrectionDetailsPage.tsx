import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useDeleteCorrection, useUpdateCorrection } from "../api/correction.mutations";
import useCorrectionForm from "../hooks/useCorrectionForm";

import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import EditIcon from "@/assets/icons/EditIcon";
import SparklesIcon from "@/assets/icons/SparklesIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import AnalysisResult from "../components/AnalysisResult";
import AnswerReferencesInput from "../components/AnswerReferencesInput";
import AnalysisResultSkeleton from "../components/AnalysisResultSkeleton";
import DeleteCorrectionModal from "../components/DeleteCorrectionModal";

import type { ModalHandle } from "@/components/Modal";
import type { CorrectionDetail } from "../types/correction.type";
import type { CorrectionFormValues } from "../schemas/correction.schema";

export function CorrectionDetailsPage() {
  // Delete Modal Refs
  const deleteModalRef = useRef<ModalHandle>(null);
  const handleOpenModal = () => deleteModalRef.current?.openModal();

  // Correction Loader & Mutations
  const correction = useLoaderData<CorrectionDetail>();
  const { mutate: deleteCorrection } = useDeleteCorrection();
  const { mutate: updateCorrection, isPending } = useUpdateCorrection(correction.id);
  const handleDeleteCorrection = () => deleteCorrection(correction.id);

  // React Hook Form
  const { register, errors, fields, append, remove, onSubmit } = useCorrectionForm({
    submitFn: (data: CorrectionFormValues) => updateCorrection({ ...data }),
    defaultValues: {
      question: correction.question,
      answerReferences: correction.answerReferences.map((ref) => ({ value: ref.answer })),
      gradedAnswer: correction.gradedAnswer,
    },
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

      <AnswerReferencesInput fields={fields} register={register} errors={errors} onAdd={() => append({ value: "" })} onRemove={remove} disabled={isPending} />

      <TextArea
        label="Jawaban Yang Ingin Dikoreksi"
        placeholder="Tulis jawaban yang ingin dikoreksi disini..."
        error={errors.gradedAnswer?.message}
        disabled={isPending}
        {...register("gradedAnswer")}
      />

      {isPending ? <AnalysisResultSkeleton /> : <AnalysisResult finalScore={correction.finalScore} feedback={correction.feedback} />}

      {!isPending && (
        <div className="flex max-sm:flex-col gap-4">
          <Button type="button" size="large" className="w-full max-sm:order-2" color="red" icon={<DeleteIcon className="size-5 fill-white" />} iconPosition="right" onClick={handleOpenModal}>
            Hapus Hasil Koreksi
          </Button>
          <Button type="submit" size="large" className="w-full max-sm:order-1" icon={<SparklesIcon className="size-6 fill-white" />} iconPosition="right">
            Koreksi Ulang Essay
          </Button>
        </div>
      )}

      <DeleteCorrectionModal ref={deleteModalRef} onDelete={handleDeleteCorrection} />
    </form>
  );
}
